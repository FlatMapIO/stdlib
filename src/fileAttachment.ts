import {autoType, csvParse, csvParseRows, tsvParse, tsvParseRows} from "d3-dsv";
import {arrow4, arrow9, exceljs, jszip} from "./dependencies";
import {cdn, requireDefault} from "./require";
import {SQLiteDatabaseClient} from "./sqlite";
import {Workbook} from "./xlsx";

async function remote_fetch(file) {
  const response = await fetch(await file.url());
  if (!response.ok) throw new Error(`Unable to load file: ${file.name}`);
  return response;
}

type DsvOptions = {
  array?: boolean;
  typed?: boolean;
};
async function dsv(
  file: AbstractFile,
  delimiter: "," | "\t",
  {array = false, typed = false}: DsvOptions = {},
) {
  const text = await file.text();
  const parse =
    delimiter === "\t"
      ? array
        ? tsvParseRows
        : tsvParse
      : array
      ? csvParseRows
      : csvParse;
  // @ts-ignore
  return parse(text, typed && autoType);
}

export abstract class AbstractFile {
  constructor(
    private readonly name?: string,
    private readonly mimeType: string = "",
  ) {}

  async blob(): Promise<Blob> {
    return (await remote_fetch(this)).blob();
  }
  async arrayBuffer(): Promise<ArrayBuffer> {
    return (await remote_fetch(this)).arrayBuffer();
  }
  async text(): Promise<string> {
    return (await remote_fetch(this)).text();
  }
  async json<T = any>(): Promise<T> {
    return (await remote_fetch(this)).json();
  }
  async stream(): Promise<ReadableStream<Uint8Array>> {
    return (await remote_fetch(this)).body;
  }
  async csv(options?: DsvOptions) {
    return dsv(this, ",", options);
  }
  async tsv(options?: DsvOptions) {
    return dsv(this, "\t", options);
  }
  abstract url(): Promise<string>;

  async image(props) {
    const url = await this.url();
    return new Promise((resolve, reject) => {
      const i = new Image();
      if (
        new URL(url, document.baseURI).origin !==
        new URL(
          // @ts-ignore
          location,
        ).origin
      ) {
        i.crossOrigin = "anonymous";
      }
      Object.assign(i, props);
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error(`Unable to load file: ${this.name}`));
      i.src = url;
    });
  }
  async arrow({version = 4} = {}) {
    switch (version) {
      case 4: {
        const [Arrow, response] = await Promise.all([
          requireDefault(arrow4.resolve()),
          remote_fetch(this),
        ]);
        return Arrow.Table.from(response);
      }
      case 9: {
        const [Arrow, response] = await Promise.all([
          import(`${cdn}${arrow9.resolve()}`),
          remote_fetch(this),
        ]);
        return Arrow.tableFromIPC(response);
      }
      default:
        throw new Error(`unsupported arrow version: ${version}`);
    }
  }
  async sqlite() {
    return SQLiteDatabaseClient.open(remote_fetch(this));
  }
  async zip() {
    const [JSZip, buffer] = await Promise.all([
      requireDefault(jszip.resolve()),
      this.arrayBuffer(),
    ]);
    return new ZipArchive(await JSZip.loadAsync(buffer));
  }
  async xml(mimeType = "application/xml") {
    return new DOMParser().parseFromString(await this.text(), mimeType);
  }
  async html() {
    return this.xml("text/html");
  }
  async xlsx() {
    const [ExcelJS, buffer] = await Promise.all([
      requireDefault(exceljs.resolve()),
      this.arrayBuffer(),
    ]);
    return new Workbook(await new ExcelJS.Workbook().xlsx.load(buffer));
  }
}

export class FileAttachment extends AbstractFile {
  private readonly _url: Promise<string>;

  constructor(url: string, name?: string, mimeType?: string) {
    super(name, mimeType);
  }
  async url(): Promise<string> {
    return (await this._url) + "";
  }
}

export function NoFileAttachments(name) {
  throw new Error(`File not found: ${name}`);
}

export function FileAttachments(resolve) {
  return Object.assign(
    (name) => {
      const result = resolve((name += ""));
      if (result == null) throw new Error(`File not found: ${name}`);
      if (typeof result === "object" && "url" in result) {
        const {url, mimeType} = result;
        return new FileAttachment(url, name, mimeType);
      }
      return new FileAttachment(result, name);
    },
    {prototype: FileAttachment.prototype}, // instanceof
  );
}

export class ZipArchive {
  public readonly filenames: string[];
  private readonly _: {
    file(path: string): FileAttachment;
  };
  constructor(archive) {
    this._ = archive;
    this.filenames = Object.keys(archive.files).filter(
      (name) => !archive.files[name].dir,
    );
  }
  file(path: string) {
    const object = this._.file((path += ""));
    if (!object || object.dir) throw new Error(`file not found: ${path}`);
    return new ZipArchiveEntry(object);
  }
}

class ZipArchiveEntry extends AbstractFile {
  private readonly _: unknown;
  private _url?: URL | Promise<URL>;
  constructor(object: {name: string}) {
    super(object.name);
    this._ = object;
  }
  async url() {
    return this._url || (this._url = this.blob().then(URL.createObjectURL));
  }
  async blob() {
    return this._.async("blob");
  }
  async arrayBuffer() {
    return this._.async("arraybuffer");
  }
  async text() {
    return this._.async("text");
  }
  async json() {
    return JSON.parse(await this.text());
  }
}

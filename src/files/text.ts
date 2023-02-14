export function text(file: File): Promise<string | ArrayBuffer> {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

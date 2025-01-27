import {highlight, marked} from "./dependencies";
import {template} from "./template";
import {type require} from "d3-require";
import {mdBlockClassName} from "./constants";
export function md(require: require) {
  return require(marked.resolve()).then(function (marked) {
    return template(
      function (string) {
        var root = document.createElement("div");
        root.innerHTML = marked(string, {langPrefix: ""}).trim();
        var code = root.querySelectorAll("pre code[class]");
        if (code.length > 0) {
          require(highlight.resolve()).then(function (hl) {
            code.forEach(function (block) {
              function done() {
                hl.highlightBlock(block);
                (block.parentNode as Element).classList.add(mdBlockClassName);
              }
              if (hl.getLanguage(block.className)) {
                done();
              } else {
                require(highlight.resolve("async-languages/index.js"))
                  .then((index) => {
                    if (index.has(block.className)) {
                      return require(highlight.resolve(
                        "async-languages/" + index.get(block.className),
                      )).then((language) => {
                        hl.registerLanguage(block.className, language);
                      });
                    }
                  })
                  .then(done, done);
              }
            });
          });
        }
        return root;
      },
      function () {
        return document.createElement("div");
      },
    );
  });
}

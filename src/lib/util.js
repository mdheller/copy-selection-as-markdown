import TurndownService from "turndown";

const url = require("url");

const turndownService = TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-"
})
  .remove(node => {
    // remove display formula
    return node.nodeName === "DIV" && node.className === "MathJax_Display";
  })
  .remove(node => {
    // remove inline formula
    return node.nodeName === "SPAN" && node.className === "MathJax";
  });

// extract script tag as content
turndownService.addRule("mathjax-extract-raw", {
  filter: node => {
    return node.nodeName === "SCRIPT" && node.type.startsWith("math/tex");
  },
  replacement: (content, node) => {
    if (node.type === "math/tex; mode=display") {
      return `$$${node.innerText}$$`;
    } else if (node.type === "math/tex") {
      return `$${node.innerText}$`;
    }
    return "(ERROR while copying MathJax formula)";
  }
});

const getSelectionAsMarkdown = () => {
  let html = "";
  const sel = document.getSelection();

  if (sel.rangeCount) {
    const container = document.createElement("div");

    for (let i = 0; i < sel.rangeCount; ++i) {
      container.appendChild(sel.getRangeAt(i).cloneContents());
    }

    for (let a of container.getElementsByTagName("a")) {
      if (!a.getAttribute("href").startsWith("http")) {
        a.setAttribute("href", url.resolve(document.URL, a.getAttribute("href")));
      }
    }

    for (let img of container.getElementsByTagName("img")) {
      if (!img.getAttribute("src").startsWith("http")) {
        img.setAttribute("src", url.resolve(document.URL, img.getAttribute("src")));
      }
    }

    html = container.innerHTML;
  }

  return turndownService.turndown(html);
};

const doCopy = text => {
  let copyFrom = document.createElement("textarea");
  copyFrom.style.left = "-300px";
  copyFrom.style.position = "absolute";
  copyFrom.value = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  copyFrom.parentNode.removeChild(copyFrom);
};

export { getSelectionAsMarkdown, doCopy };

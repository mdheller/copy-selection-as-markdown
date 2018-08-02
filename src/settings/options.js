document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get().then(
    result => {
      document.querySelector("#quote").checked =
        typeof result["use-quote"] === "undefined" ? true : result["use-quote"];
      document.querySelector("#link").checked =
        typeof result["link-to-source"] === "undefined" ? true : result["link-to-source"];
      document.querySelector("form").headingStyle.value =
        typeof result.headingStyle === "undefined" ? "atx" : result.headingStyle;
      document.querySelector("form").bulletListMarker.value =
        typeof result.bulletListMarker === "undefined" ? "-" : result.bulletListMarker;
      document.querySelector("form").codeBlockStyle.value =
        typeof result.codeBlockStyle === "undefined" ? "indented" : result.codeBlockStyle;
      document.querySelector("form").fence.value = typeof result.fence === "undefined" ? "`" : result.fence;
      document.querySelector("form").emDelimiter.value =
        typeof result.emDelimiter === "undefined" ? "_" : result.emDelimiter;
      document.querySelector("form").strongDelimiter.value =
        typeof result.strongDelimiter === "undefined" ? "**" : result.strongDelimiter;
      document.querySelector("form").linkStyle.value =
        typeof result.linkStyle === "undefined" ? "inlined" : result.linkStyle;
      document.querySelector("form").linkReferenceStyle.value =
        typeof result.linkReferenceStyle === "undefined" ? "full" : result.linkReferenceStyle;
      document.querySelector("#debug").checked = 
        typeof result.debug === "undefined" ? true : result.debug;
    },
    error => console.log(`Error: ${error}`)
  );
});

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  browser.storage.local.set({
    "use-quote": document.querySelector("#quote").checked,
    "link-to-source": document.querySelector("#link").checked,
    headingStyle: document.querySelector("form").headingStyle.value,
    bulletListMarker: document.querySelector("form").bulletListMarker.value,
    codeBlockStyle: document.querySelector("form").codeBlockStyle.value,
    fence: document.querySelector("form").fence.value,
    emDelimiter: document.querySelector("form").emDelimiter.value,
    strongDelimiter: document.querySelector("form").strongDelimiter.value,
    linkStyle: document.querySelector("form").linkStyle.value,
    linkReferenceStyle: document.querySelector("form").linkReferenceStyle.value,
    debug: document.querySelector("#debug").checked
  });
});

const query = document.getElementById("query");
const article = document.querySelector("article");

const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
let currentNode = treeWalker.nextNode();

while (currentNode) {
  allTextNodes.push(currentNode);
  currentNode = treeWalker.nextNode();
}

query.addEventListener("input", () => {
  // check support
  if (!CSS.highlights) {
    article.textContent = "CSS Custom Highlight API not supported.";
    return;
  }

  //   remove previous highlight if any
  CSS.highlights.clear();

  //   check if query is empty
  const str = query.value.trim().toLowerCase();
  if (!str) {
    return;
  }

  const ranges = allTextNodes
    .map((el) => {
      // console.log(el);
      return { el: el, text: el.textContent.toLowerCase() };
    })
    .map(({ el, text }) => {
      const indices = [];
      let startPos = 0;

      console.log(text);

      while (startPos < text.length) {
        const index = text.indexOf(str, startPos);
        console.log(text.indexOf(str, startPos));
        if (index === -1) break;
        indices.push(index);
        startPos = index + str.length;
      }

      //   create range object
      return indices.map((index) => {
        const range = new Range();
        range.setStart(el, index);
        range.setEnd(el, index + str.length);
        return range;
      });
    });

  const searchResultsHighlight = new Highlight(...ranges.flat());
  CSS.highlights.set("search-results", searchResultsHighlight);
});

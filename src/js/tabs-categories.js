export class TabsCategories {
  constructor(categories, blocks) {
    this.categories =
      typeof categories === "string"
        ? document.querySelectorAll(categories)
        : categories;
    this.blocks =
      typeof blocks === "string" ? document.querySelectorAll(blocks) : blocks;
    this.activeIdx = 0;
    this.init();
  }
  selectCategory(index) {
    this.activeIdx = index;
  }
  init() {
    this.categories.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        let idx = e.target.getAttribute("data-index");
        idx = parseInt(idx);
        this.selectItem(idx);
      });
    });
  }
}

export class Tags {
  constructor(el) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.tags = this.el.querySelectorAll(".tags-item");
    this.moreBtn = this.el.querySelector(".tags-more");
    this.moreTextEl = this.moreBtn.querySelector("span");
    this.moreText = this.moreTextEl.innerHTML;
    this.lessText = this.moreBtn.getAttribute("data-less");
    this.isOpen = false;
    this.init();
  }
  showMore() {
    this.isOpen = true;

    this.el.classList.add("open");
    this.moreTextEl.innerHTML = this.lessText;
  }
  hideMore() {
    this.isOpen = false;
    this.el.classList.remove("open");
    this.moreTextEl.innerHTML = this.moreText;
  }
  toggle() {
    if (this.isOpen) {
      this.hideMore();
    } else {
      this.showMore();
    }
  }
  init() {
    this.moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });
  }
}

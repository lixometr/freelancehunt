import { hide, show, toggle } from "slidetoggle";

export class Accordion {
  constructor(el, defaultValue = false) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.header = this.el.querySelector(".accordion-header");
    this.content = this.el.querySelector(".accordion-content");
    this.isOpen = defaultValue;
    this.init();
  }
  open() {
    this.isOpen = true;
    this.el.classList.add("open");
    show(this.content, {
      miliseconds: 300,
    });
  }
  close() {
    this.isOpen = false;
    this.el.classList.remove("open");
    hide(this.content, {
      miliseconds: 300,
    });
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  init() {
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
    this.header.addEventListener("click", () => {
      this.toggle();
    });
  }
}

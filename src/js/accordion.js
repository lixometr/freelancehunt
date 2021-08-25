import { hide, show, toggle } from "slidetoggle";
import { eventMixin } from "./event";
export class Accordion {
  constructor(el, defaultValue = false) {
    Object.assign(this, eventMixin);
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.header = this.el.querySelector(".accordion-header");
    this.content = this.el.querySelector(".accordion-content");
    this.isOpen = defaultValue;
    this.headerListener = this._headerListener.bind(this);
    this.init();
  }
  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.el.classList.add("opened");
    this.el.classList.add("open");
    show(this.content, {
      miliseconds: 300,
    });
    this.emit("open");
    // const listener = () => {
    //   this.content.removeEventListener("transitionend", listener);
    // };
    // this.content.addEventListener("transitionend", listener);
  }
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.classList.remove("open");
    hide(this.content, {
      miliseconds: 300,
    });
    const listener = () => {
      this.el.classList.remove("opened");
      this.content.removeEventListener("transitionend", listener);
    };
    this.content.addEventListener("transitionend", listener);
    this.emit("close");
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  _headerListener() {
    this.toggle();
  }
  init() {
    if (this.isOpen) {
      this.el.classList.add("opened");
    } else {
      this.el.classList.remove("opened");
    }
    this.header.addEventListener("click", this.headerListener);
  }
  destroy() {
    this.header.removeEventListener("click", this.headerListener);
    this.el.classList.remove("accordion");
    this.el.classList.remove("open");
    this.el.classList.remove("opened");
    this.content.style = "";
  }
}

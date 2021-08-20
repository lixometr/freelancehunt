import { Accordion } from "./accordion";
import { onReady } from "./helpers";
class Menu {
  constructor() {
    this.el = document.querySelector(".menu-mob");
    this.burger = document.querySelector(".burger");
    this.isOpen = false;
    this.init();
  }
  open() {
    this.isOpen = true;
    this.el.classList.add("open");
    this.burger.classList.add("open");
  }
  close() {
    this.isOpen = false;
    this.el.classList.remove("open");
    this.burger.classList.remove("open");
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  init() {
    this.burger.addEventListener("click", () => {
      this.toggle();
    });
  }
}

onReady(() => {
  new Menu();
  document.querySelectorAll(".menu-mob__item").forEach((item) => {
    new Accordion(item, false);
  });
});

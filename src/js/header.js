import { eventMixin } from "./event";
import { onReady } from "./helpers";
import { Menu } from "./menu";
class HeaderMenu {
  constructor() {
    Object.assign(this, eventMixin);

    this.el = document.querySelector(".header-menus");
    this.menus = this.el.querySelectorAll(".header-menu");
    this.overlay = document.querySelector(".header-menu-overlay");
    this.triggers = document.querySelectorAll(".header__menu-item");
    this.headerMenu = document.querySelector(".header__menu-wrapper");
    this.activeMenu = "";
    this.activeIdx = 0;
    this.isOpen = false;
    this.closeHandler = this._closeHandler.bind(this);
    this.init();
  }
  getActiveTrigger() {
    return this.triggers[this.activeIdx];
  }
  getActiveMenu() {
    return this.menus[this.activeIdx];
  }
  open() {
    if (this.isOpen) return;
    this.el.classList.add("open");
    this.el.classList.add("opened");
    this.overlay.classList.add("open");
    this.isOpen = true;
    this.emit("open");

    this.addCloseEvent();
  }
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.classList.remove("opened");
    const listener = () => {
      if (!this.isOpen) {
        this.el.classList.remove("open");
      }
      this.el.removeEventListener("transitionend", listener);
    };
    this.el.addEventListener("transitionend", listener);
    this.overlay.classList.remove("open");
    this.triggers.forEach((trigger) => trigger.classList.remove("open"));

    this.emit("close");
    this.removeCloseEvent();
  }
  _closeHandler() {
    this.close();
    this.removeCloseEvent();
  }
  removeCloseEvent() {
    this.headerMenu.removeEventListener("mouseleave", this.closeHandler);
  }
  addCloseEvent() {
    this.headerMenu.addEventListener("mouseleave", this.closeHandler);
  }
  updateIndex(idx) {
    this.activeIdx = idx;
    this.triggers.forEach((trigger) => trigger.classList.remove("open"));
    const trigger = this.getActiveTrigger();
    trigger.classList.add("open");
    this.menus.forEach((m) => m.classList.remove("open"));
    const menu = this.getActiveMenu();
    menu.classList.add("open");
  }
  init() {
    this.triggers.forEach((trigger, idx) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
      });
      trigger.addEventListener("mouseenter", () => {
        this.updateIndex(idx);
        if (!this.isOpen) {
          this.open();
        }
      });
    });
  }
}
onReady(() => {
  const menu = new HeaderMenu();
  const header = document.querySelector(".header");

  const menus = [
    // new Menu(
    //   ".header-menu-orders",
    //   ".header-menu-overlay",
    //   ".header__menu-item[data-popup='orders']"
    // ),
    // new Menu(
    //   ".header-menu-freelancers",
    //   ".header-menu-overlay",
    //   ".header__menu-item[data-popup='freelancers']"
    // ),
    // new Menu(
    //   ".header-menu-vacancies",
    //   ".header-menu-overlay",
    //   ".header__menu-item[data-popup='vacancies']"
    // ),
  ];
  let menuOpen = false;
  let scrollMore = false;
  // menus.forEach((menu) => {
  menu.on("open", () => {
    header.classList.add("fix");
    menuOpen = true;
  });
  menu.on("close", () => {
    menuOpen = false;

    if (scrollMore) return;
    header.classList.remove("fix");
  });
  // });
  const checkScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 20) {
      header.classList.add("fix");
      scrollMore = true;
    } else {
      scrollMore = false;
      if (menuOpen) return;
      header.classList.remove("fix");
    }
  };
  checkScroll();
  window.addEventListener("scroll", checkScroll);
});

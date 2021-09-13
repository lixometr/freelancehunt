import { eventMixin } from "./event";
import { onReady } from "./helpers";
import { Menu } from "./menu";
import useStopScroll from "./useStopScroll";
class HeaderMenu {
  constructor() {
    Object.assign(this, eventMixin);

    this.el = document.querySelector(".header-menus");
    this.menus = this.el.querySelectorAll(".header-menu");
    this.overlay = document.querySelector(".header-menu-overlay");
    this.triggers = document.querySelectorAll(".header__menu-item");
    this.headerMenu = document.querySelector(".header__menu-wrapper");
    this.activeMenu = "";
    this.activeIdx = null;
    this.isOpen = false;
    this.gonnaClose = false;
    this.closeHandler = this._closeHandler.bind(this);
    this.closeHandlerDelay = this._closeHandlerDelay.bind(this);
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
    const onEnd = () => {
      if (this.isOpen) {
        this.overlay.classList.add("open");
      }

      this.el.removeEventListener("transitionend", onEnd);
    };
    this.el.addEventListener("transitionend", onEnd);
    this.isOpen = true;
    this.emit("open");

    setTimeout(() => this.addCloseEvent(), 0);
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
  _closeHandlerDelay() {
    this.gonnaClose = true;
    setTimeout(() => {
      if (!this.gonnaClose) return;
      this.close();
      this.removeCloseEvent();
    }, 200);
  }
  removeCloseEvent() {
    if (this.isTouchDevice()) {
      this.triggers.forEach((trigger) => {
        trigger.removeEventListener("click", this.closeHandler);
      });
    } else {
      this.headerMenu.removeEventListener("mouseleave", this.closeHandlerDelay);
    }
  }
  addCloseEvent() {
    if (this.isTouchDevice()) {
      this.triggers.forEach((trigger, idx) => {
        if (this.activeIdx !== idx) return;
        trigger.addEventListener("click", this.closeHandler);
      });
    } else {
      this.headerMenu.addEventListener("mouseleave", this.closeHandlerDelay);
    }
  }
  updateIndex(idx) {
    if (this.activeIdx === idx) return;
    this.activeIdx = idx;
    this.triggers.forEach((trigger) => trigger.classList.remove("open"));
    const trigger = this.getActiveTrigger();
    trigger.classList.add("open");
    this.menus.forEach((m) => m.classList.remove("open"));
    const menu = this.getActiveMenu();
    menu.classList.add("open");
    if (this.isTouchDevice()) {
      this.removeCloseEvent();
      this.addCloseEvent();
    }
  }
  isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  init() {
    this.triggers.forEach((trigger, idx) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
      });
      if (this.isTouchDevice()) {
        trigger.addEventListener("click", () => {
          this.updateIndex(idx);
          if (!this.isOpen) {
            this.open();
          }
        });
      } else {
        trigger.addEventListener("mouseenter", () => {
          this.updateIndex(idx);
          if (!this.isOpen) {
            this.open();
          }
        });
        this.headerMenu.addEventListener("mouseenter", () => {
          this.gonnaClose = false;
          // if (!this.isOpen) {
          //   this.open();
          // }
        });
      }
    });
    if (this.isTouchDevice()) {
      this.overlay.addEventListener("click", () => {
        this.close();
      });
    }
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
  const { stop: stopScroll, reset: resetScroll } = useStopScroll();
  // menus.forEach((menu) => {
  menu.on("open", () => {
    header.classList.add("fix");
    menuOpen = true;
    stopScroll();
  });
  menu.on("close", () => {
    menuOpen = false;
    resetScroll();

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

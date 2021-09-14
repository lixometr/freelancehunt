import { eventMixin } from "./event";
import { onReady } from "./helpers";
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
    this.overlay.classList.add("open");

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
  const { stop: stopScroll, reset: resetScroll } = useStopScroll();
  menu.on("open", () => {
    stopScroll();
  });
  menu.on("close", () => {
    resetScroll();
  });
});

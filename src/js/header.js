import { onReady } from "./helpers";
import { Menu } from "./menu";
class HeaderMenu {
  constructor() {
    this.menu = new Menu(".header-menu", ".header-menu-overlay", "");
  }
}
onReady(() => {
  const header = document.querySelector(".header");

  const menus = [
    new Menu(
      ".header-menu-orders",
      ".header-menu-overlay",
      ".header__menu-item[data-popup='orders']"
    ),
    new Menu(
      ".header-menu-freelancers",
      ".header-menu-overlay",
      ".header__menu-item[data-popup='freelancers']"
    ),
    new Menu(
      ".header-menu-vacancies",
      ".header-menu-overlay",
      ".header__menu-item[data-popup='vacancies']"
    ),
  ];
  let menuOpen = false;
  let scrollMore = false;
  menus.forEach((menu) => {
    menu.on("open", () => {
      header.classList.add("fix");
      menuOpen = true;
    });
    menu.on("close", () => {
      menuOpen = false;

      if (scrollMore) return;
      header.classList.remove("fix");
    });
  });
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

import "./sliders";
import "./header";
import "./menu";
import { Accordion } from "./accordion";
import { TabsCategories } from "./tabs-categories";
import { bpLess, onReady } from "./helpers.js";
import { Tags } from "./tags";
import { Menu } from "./menu";
onReady(() => {
  (function () {
    let accordions = [];
    let isInited = false;
    const checkResize = () => {
      if (bpLess("lg")) {
        if (isInited) return;
        document.querySelectorAll(".footer-col").forEach((item) => {
          item.classList.add("accordion");
          const acc = new Accordion(item, false);
          accordions.push(acc);
        });
        isInited = true;
      } else {
        if (!isInited) return;
        accordions.forEach((acc) => {
          acc.destroy();
        });
        accordions = [];
        isInited = false;
      }
    };
    window.addEventListener("resize", checkResize);
    checkResize();
  })();
  (function () {
    const tagsItems = document.querySelectorAll(".tags");
    tagsItems.forEach((tags) => {
      new Tags(tags);
    });
  })();
  (function () {
    new TabsCategories(".freelancers-tabs");
    new TabsCategories(".projects-tabs");
  })();
  (function () {
    new Menu(".menu-mob", ".menu-mob-overlay", ".burger");
    const accordions = [];
    document.querySelectorAll(".menu-mob__item").forEach((item) => {
      const acc = new Accordion(item, false);
      accordions.push(acc);
      acc.on("open", () => {
        accordions.forEach((accordion) => {
          if (accordion !== acc) {
            accordion.close();
          }
        });
      });
    });
  })();
  (function () {
    new Menu(".menu-auth", ".menu-auth-overlay", ".header-account");
  })();
});

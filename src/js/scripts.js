import "./sliders";
import "./header";
import "./menu";
import { Accordion } from "./accordion";
import { TabsCategories } from "./tabs-categories";
import { bpLess, onReady } from "./helpers.js";
import { Tags } from "./tags";
onReady(() => {
  (function () {
    const accordions = [];
    const checkResize = () => {
      if (bpLess("lg")) {
        document.querySelectorAll(".footer-col").forEach((item) => {
          item.classList.add("accordion");
          const acc = new Accordion(item, false);
          accordions.push(acc);
        });
      } else {
        accordions.forEach((acc) => acc.open());
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
  })();
});

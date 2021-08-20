import Swiper from "swiper";
import breakpoints from "./breakpoints";
import { bpLess } from "./helpers";
import { Tags } from "./tags";
import { useResize } from "./useResize";

export class TabsCategories {
  constructor(el) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;

    this.categoryBlock = this.el.querySelector(".categories-tabs-categories");
    this.contentBlock = this.el.querySelector(".categories-tabs-content");
    this.categories = [...this.categoryBlock.querySelectorAll("a")];
    this.contents = [
      ...this.contentBlock.querySelectorAll(".categories-tabs-content-block"),
    ];
    this.activeIdx = 0;
    this.init();
  }
  getActiveContent() {
    return this.contents.find(
      (block) => block.getAttribute("data-index") === String(this.activeIdx)
    );
  }
  async selectItem(index) {
    const prevIdx = this.activeIdx;
    if (index === prevIdx) return;
    this.activeIdx = index;
    this.updateContent(prevIdx);
    this.updateCategories();
  }
  // initTags() {
  //   this.contents.forEach((block) => {
  //     const tags = block.querySelector(".tags");
  //     new Tags(tags);
  //   });
  // }
  updateCategories() {
    this.categories.forEach((cat) => cat.classList.remove("active"));
    const newCategory = this.categories.find(
      (cat) => cat.getAttribute("data-index") === String(this.activeIdx)
    );
    newCategory.classList.add("active");
  }
  async updateContent(prevIdx) {
    const prevBlock = this.contents.find(
      (block) => block.getAttribute("data-index") === String(prevIdx)
    );
    const newBlock = this.getActiveContent();
    if (!newBlock) return;
    if (prevBlock) {
      await this.hideBlock(prevBlock);
    }
    if (newBlock) {
      this.showBlock(newBlock);
    }
  }
  hideBlock(block) {
    return new Promise((resolve) => {
      block.classList.add("t-fadeOut");
      const listener = () => {
        block.classList.remove("active");
        block.classList.remove("t-fadeOut");
        block.removeEventListener("animationend", listener);
        resolve();
      };
      block.addEventListener("animationend", listener);
    });
  }
  showBlock(block) {
    return new Promise((resolve) => {
      block.classList.add("active");
      block.classList.add("t-fadeIn");
      const listener = () => {
        block.classList.remove("t-fadeIn");
        block.removeEventListener("animationend", listener);
        resolve();
      };
      block.addEventListener("animationend", listener);
    });
  }
  checkSlider() {
    if (bpLess("lg")) {
      if (this.categorySliderInited) return;
      const swiperContainer =
        this.categoryBlock.querySelector(".swiper-container");
      const arrowRight = this.categoryBlock.querySelector(
        ".categories-tabs-categories__arrow"
      );
      this.categoriesSlider = new Swiper(swiperContainer, {
        slidesPerView: "auto",
        navigation: {
          nextEl: arrowRight,
        },
        threshold: 5,
        spaceBetween: 20,
      });
      this.categoriesSlider.on('reachEnd', () => {
        console.log('end')
      })
      this.categoriesSlider.on("snapIndexChange", (e) => {
        const total = e.slides.length - 2;
        const active = e.snapIndex;
        
        if (total <= active) {
          swiperContainer.classList.add("last");
        } else {
          swiperContainer.classList.remove("last");
        }
        // console.log(active, total, e);
      });
      this.categorySliderInited = true;
    } else {
      if (this.categorySliderInited) {
        this.categoriesSlider.destroy();
      }
      this.categorySliderInited = false;
    }
  }
  init() {
    // this.initTags();
    this.categories.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        let idx = e.target.getAttribute("data-index");
        idx = parseInt(idx);
        this.selectItem(idx);
      });
    });
    window.addEventListener("resize", () => {
      this.checkSlider();
    });
    this.checkSlider();
  }
}

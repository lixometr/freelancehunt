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
    this.isAnimating = false;
    this.init();
  }
  getActiveContent() {
    return this.contents.find(
      (block) => block.getAttribute("data-index") === String(this.activeIdx)
    );
  }
  selectItem(index) {
    if (this.isAnimating) return;
    const prevIdx = this.activeIdx;
    if (index === prevIdx) return;
    this.activeIdx = index;
    this.updateContent(prevIdx);
    this.updateCategories();
    this.updateSlider();
  }
  updateSlider() {
    if (!this.categoriesSlider) return;
    this.categoriesSlider.slideTo(this.activeIdx);
  }
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
    const dir = prevIdx > this.activeIdx ? "right" : "left";
    const promises = [];
    this.isAnimating = true;
    if (prevBlock) {
      const hidePromise = this.hideBlock(prevBlock, dir);
      if (!this.isMob) {
        await hidePromise;
      }
      promises.push(hidePromise);
    }
    if (newBlock) {
      const showPromise = this.showBlock(newBlock, dir);
      if (!this.isMob) {
        await showPromise;
      }
      promises.push(showPromise);
    }
    if (this.isMob) {
      await Promise.all(promises);
    }
    this.isAnimating = false;
  }
  hideBlock(block, dir) {
    const animations = {
      left: "t-slideLeftLeave",
      right: "t-slideRightLeave",
    };
    const animation = animations[dir];
    return new Promise((resolve) => {
      block.classList.add(animation);
      const listener = () => {
        block.classList.remove("active");
        block.classList.remove(animation);
        block.removeEventListener("animationend", listener);
        resolve();
      };
      block.addEventListener("animationend", listener);
    });
  }
  showBlock(block, dir) {
    const animations = {
      left: "t-slideLeftEnter",
      right: "t-slideRightEnter",
    };
    const animation = animations[dir];

    return new Promise((resolve) => {
      block.classList.add("active");
      block.classList.add(animation);
      const listener = () => {
        block.classList.remove(animation);
        block.removeEventListener("animationend", listener);
        resolve();
      };
      block.addEventListener("animationend", listener);
    });
  }
  checkSlider() {
    if (bpLess("md")) {
      if (this.categoriesSlider) return;
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
        slidesOffsetAfter: 10
      });
      // this.categoriesSlider.on('reachEnd', () => {
      //   console.log('end')
      // })
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
    } else {
      if (this.categoriesSlider) {
        this.categoriesSlider.destroy();
        this.categoriesSlider = null;
      }
    }
  }
  checkMob() {
    const isMob = bpLess("md");
    this.isMob = isMob;
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
      this.checkMob();
      this.checkSlider();
    });
    this.checkMob();
    this.checkSlider();
  }
}

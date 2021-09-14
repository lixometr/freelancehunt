import SwiperCore, { Navigation, Pagination } from "swiper/core";
import Swiper from "swiper";
import { bpLess } from "./helpers";
SwiperCore.use([Navigation, Pagination]);
import breakpoints from "./breakpoints";
(function () {
  let slider = null;
  const checkSlider = () => {
    if (bpLess("md")) {
      if (slider) return;
      slider = new Swiper(".clients-slider", {
        slidesPerView: "auto",
        spaceBetween: 27,
        breakpoints: {
          [breakpoints.xs]: {
            slidesPerView: "auto",
            spaceBetween: 0,
          },
          [breakpoints.sm]: {
            slidesPerView: "auto",
            spaceBetween: 0,
          },
        },
      });
    } else {
      if (!slider) return;
      slider.destroy();
      slider = null;
    }
  };
  checkSlider();
  window.addEventListener("resize", checkSlider);
})();
new Swiper(".for-orders-slider", {
  threshold: 5,
  slidesPerView: 1.3,
  spaceBetween: 20,
  pagination: {
    el: ".for-orders-slider__pagination",
    clickable: true,
  },
  slidesOffsetAfter: 20,
  slidesOffsetBefore: 20,
  breakpoints: {
    [breakpoints.sm]: {
      resistanceRatio: 0,
      slidesPerView: 2,
      spaceBetween: 24,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
    },
  },
});
new Swiper(".numbers-slider", {
  slidesPerView: "auto",
  spaceBetween: 24,
  pagination: {
    el: ".numbers-slider__pagination",
    clickable: true,
  },
  slidesOffsetAfter: 20,
  slidesOffsetBefore: 20,
  breakpoints: {
    [breakpoints.lg]: {
      resistanceRatio: 0,
      slidesPerView: 4,
      spaceBetween: 24,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
    },
  },
});

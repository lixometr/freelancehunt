import SwiperCore, { Navigation, Pagination } from "swiper/core";
import Swiper from "swiper";
SwiperCore.use([Navigation, Pagination]);
import breakpoints from "./breakpoints";

new Swiper(".clients-slider", {
  slidesPerView: 'auto',
  spaceBetween: 27,
  breakpoints: {
    // [breakpoints.sm]: {
    //   slidesPerView: 'auto',
    //   spaceBetween: 77
    // },
    [breakpoints.sm]: {
      slidesPerView: 6,
      spaceBetween: 77,
    },
  },
});

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
    [breakpoints.lg]: {
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
      slidesPerView: 4,
      spaceBetween: 24,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
    },
  },
});

import { onReady } from "./helpers";
onReady(() => {
  const header = document.querySelector(".header");
  const checkScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 20) {
      header.classList.add("fix");
    } else {
      header.classList.remove("fix");
    }
  };
  checkScroll()
  window.addEventListener("scroll", checkScroll);
});

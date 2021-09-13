export default () => {
  const body = document.body;
  const header = document.querySelector(".header");
  const headerMenus = document.querySelector(".header-menus");
  const stopers = [body, header, headerMenus];
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  const stop = () => {
    body.classList.add("no-scroll");
    stopers.forEach((item) => {
      item.style.paddingRight = `${scrollBarWidth}px`;
    });
  };
  const reset = () => {
    body.classList.remove("no-scroll");

    stopers.forEach((item) => {
      item.style.paddingRight = "";
    });
  };
  return { stop, reset };
};

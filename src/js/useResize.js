const listeners = [];
const exec = () => listeners.forEach((func) => func());
export const useResize = (bp, func) => {
  const f = () => {
    if (window.matchMedia(`(max-width: ${bp}px)`).matches) {
      func();
    }
  };
  listeners.push(f);
};
window.addEventListener("DOMContentLoaded", () => {
  exec();
});
window.addEventListener("resize", () => {
  exec();
});

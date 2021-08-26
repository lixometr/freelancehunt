import breakpoints from "./breakpoints";
export const bpLess = (bp) => {
  return window.matchMedia(`(max-width: ${breakpoints[bp] - 1}px)`).matches;
};
export const bpMore = (bp) => {
  return window.matchMedia(`(min-width: ${breakpoints[bp]}px)`).matches;
};

export const onReady = (func) => {
  document.addEventListener('DOMContentLoaded', () => {
    func()
  })
}
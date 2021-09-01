export default () => {
  const body = document.querySelector("body");
  const stop = () => {
    body.classList.add("no-scroll");
  };
  const reset = () => {
    body.classList.remove("no-scroll");
  };
  return { stop, reset };
};

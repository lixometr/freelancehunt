import screens from "../../tailwind-plugins/screens";
const breakpoints = {};
Object.keys(screens).map((key) => {
  breakpoints[key] = parseInt(screens[key]);
});
export default breakpoints;

// Theme toggle — adapted from al-folio's theme.js (MIT, Maruan Al-Shedivat)
let toggleThemeSetting = () => {
  let s = determineThemeSetting();
  if (s == "system") setThemeSetting("light");
  else if (s == "light") setThemeSetting("dark");
  else setThemeSetting("system");
};
let setThemeSetting = (s) => {
  localStorage.setItem("theme", s);
  document.documentElement.setAttribute("data-theme-setting", s);
  applyTheme();
};
let applyTheme = () => {
  let t = determineComputedTheme();
  transTheme();
  document.documentElement.setAttribute("data-theme", t);
};
let transTheme = () => {
  document.documentElement.classList.add("transition");
  setTimeout(() => document.documentElement.classList.remove("transition"), 500);
};
let determineThemeSetting = () => {
  let s = localStorage.getItem("theme");
  if (s != "dark" && s != "light" && s != "system") s = "system";
  return s;
};
let determineComputedTheme = () => {
  let s = determineThemeSetting();
  if (s == "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return s;
};
setThemeSetting(determineThemeSetting());
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("light-toggle");
  if (btn) btn.addEventListener("click", toggleThemeSetting);
});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme());

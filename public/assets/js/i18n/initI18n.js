/*


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
*/
import { setLanguage } from "./translator.js";

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "en";
  setLanguage(lang);

  document.getElementById("enBtn").addEventListener("click", () => {
    setLanguage("en");
  });

  document.getElementById("srBtn").addEventListener("click", () => {
    setLanguage("sr");
  });
});
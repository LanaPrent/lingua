

/*
import { translations } from "./translations.js";
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem("language", lang);
}
  */
import { translations } from "./translations.js";
import {translations_general} from "./translations_general.js";
export function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n; //instead of const key = el.getAttribute("data-i18n");
    const parts = key.split(".");
    const value = translations[lang]?.[parts[0]]?.[parts[1]];
    if (value) {
     el.textContent=value; 
    }
    const value1=translations_general[lang]?.[parts[0]]?.[parts[1]];
    if (value1) {
     el.textContent=value; 
    }
  });
// placeholders
document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
  const key = el.getAttribute("data-i18n-placeholder");
  const parts = key.split(".");
  const value = translations[lang]?.[parts[0]]?.[parts[1]];

  if (value) {
    el.placeholder = value;
  }
   const value1 = translations_general[lang]?.[parts[0]]?.[parts[1]];

  if (value1) {
    el.placeholder = value;
  }
});
  localStorage.setItem("language", lang);
};
  export function translate(key) {
  const lang = localStorage.getItem("language") || "en";

  const parts = key.split(".");

  return translations[lang]?.[parts[0]]?.[parts[1]] || key;
}



/**/
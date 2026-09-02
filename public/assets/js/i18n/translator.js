import { translations } from "./translations.js";
export function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n; //instead of const key = el.getAttribute("data-i18n");
    
    const parts = key.split(".");
    const value = translations[lang]?.[parts[0]]?.[parts[1]];
    
    if (value == null) return;
           if(typeof value === "string" && value.includes("<")) {
el.innerHTML = value;
}
else{
el.textContent = value;
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
});
  // Show/hide the Serbian exercises link or English exercises link
  const serbianExercisesLink = document.getElementById("exercises-sr");
  if (serbianExercisesLink) {
    serbianExercisesLink.style.display = lang === "en" ? "none" : "";
  }

  const englishExercisesLink=document.getElementById("exercises-en");
  if(englishExercisesLink){
    englishExercisesLink.style.display = lang ==="sr" ? "none" : "";
  }

  localStorage.setItem("language", lang);
};

  export function translate(key) {
  const lang = localStorage.getItem("language") || "en";

  const parts = key.split(".");

  return translations[lang]?.[parts[0]]?.[parts[1]] || key;
}
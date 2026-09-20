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

// Show/hide the Serbian About page or English About page
  const aboutSrLink = document.getElementById("about-sr");
  if (aboutSrLink) {
    aboutSrLink.style.display = lang === "en" ? "none" : "";
  }

  const aboutEnLink=document.getElementById("about-en");
  if(aboutEnLink){
    aboutEnLink.style.display = lang ==="sr" ? "none" : "";
  }

  // Show/hide the Serbian About page or English About page
  const contactSrLink = document.getElementById("contact-sr");
  if (contactSrLink) {
    contactSrLink.style.display = lang === "en" ? "none" : "";
  }

  const contactEnLink=document.getElementById("contact-en");
  if(contactEnLink){
    contactEnLink.style.display = lang ==="sr" ? "none" : "";
  }

  // Show/hide the Serbian exercises link or English exercises link
  const serbianExercisesLink = document.getElementById("exercises-sr");
  if (serbianExercisesLink) {
    serbianExercisesLink.style.display = lang === "en" ? "none" : "";
  }

  const englishExercisesLink=document.getElementById("exercises-en");
  if(englishExercisesLink){
    englishExercisesLink.style.display = lang ==="sr" ? "none" : "";
  }

  // Show/hide the Serbian idioms link or English idioms link in footer
  const serbianIdiomsLink = document.getElementById("idioms-sr");
  if (serbianIdiomsLink) {
    serbianIdiomsLink.style.display = lang === "en" ? "none" : "";
  }

  const englishIdiomsLink=document.getElementById("idioms-en");
  if(englishIdiomsLink){
    englishIdiomsLink.style.display = lang ==="sr" ? "none" : "";
  }

// Show/hide the Serbian idioms link or English idioms link for Friends in aside
  const friendsSrLink = document.getElementById("friends-sr");
  if (friendsSrLink) {
    friendsSrLink.style.display = lang === "en" ? "none" : "";
  }

  const friendsEnLink=document.getElementById("friends-en");
  if(friendsEnLink){
    friendsEnLink.style.display = lang ==="sr" ? "none" : "";
  }

// Show/hide the Serbian idioms link or English idioms link for Big Bang Theory in aside
  const bigBangSrLink = document.getElementById("bigbangtheory-sr");
  if (bigBangSrLink) {
    bigBangSrLink.style.display = lang === "en" ? "none" : "";
  }

  const bigBangEnLink=document.getElementById("bigbangtheory-en");
  if(bigBangEnLink){
    bigBangEnLink.style.display = lang ==="sr" ? "none" : "";
  }

// Show/hide the Serbian idioms link or English idioms link for Two and a Half Men in aside
  const twoAndAHalfMenSrLink = document.getElementById("twoandahalfmen-sr");
  if (twoAndAHalfMenSrLink) {
    twoAndAHalfMenSrLink.style.display = lang === "en" ? "none" : "";
  }

  const twoAndAHalfMenEnLink=document.getElementById("twoandahalfmen-en");
  if(twoAndAHalfMenEnLink){
    twoAndAHalfMenEnLink.style.display = lang ==="sr" ? "none" : "";
  }

// Show/hide the Serbian idioms link or English idioms link for Two and a Half Men in aside
  const onlyFoolsAndHorsesSrLink = document.getElementById("onlyfoolsandhorses-sr");
  if (onlyFoolsAndHorsesSrLink) {
    onlyFoolsAndHorsesSrLink.style.display = lang === "en" ? "none" : "";
  }

  const onlyFoolsAndHorsesEnLink=document.getElementById("onlyfoolsandhorses-en");
  if(onlyFoolsAndHorsesEnLink){
    onlyFoolsAndHorsesEnLink.style.display = lang ==="sr" ? "none" : "";
  }


  localStorage.setItem("language", lang);
};

  export function translate(key) {
  const lang = localStorage.getItem("language") || "en";

  const parts = key.split(".");

  return translations[lang]?.[parts[0]]?.[parts[1]] || key;
}
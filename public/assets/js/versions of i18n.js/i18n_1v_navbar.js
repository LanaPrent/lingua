const translations = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    submit: "Submit",
    logout: "Logout"
  },

  sr: {
    home: "Početna",
    about: "O nama",
    contact: "Kontakt",
    login: "Prijava",
    register: "Registracija",
    submit: "Pošalji",
    logout: "Odjava"
  }
};
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

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});

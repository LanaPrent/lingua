/* 
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
  },
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
*/

const translations = {
  en: {
//add home title and contact title 
  home: {
    title: "Home"
  },
  about: {
    title: "About"
  },
  contact: {
    title: "Contact Info"
  },
  login:{
    message: "Log in"
  }, 
  register:{
    message: "Register"
  },
  submit:{
    message: "Submit"
  },
  logout:{
    message: "Log out"
  }, 
   headline:{
    title: "Welcome to the Dark Chocolate Benefits and Harms App"
  }, 
},
 
  sr: {
    //add home title and contact title 
  
  home: {
    title: "Početna"
  },
  about: {
    title: "O nama"
  },
  contact: {
    title: "Kontakt info"
  },
  login:{
    message: "Uloguj se"
  },
  register:{
    message: "Registruj se"
  },
 submit:{
  message: "Pošalji"
 },
logout:{
  message:"Odjavi se"
},
  headline:{
    title: "Dobro došli na vebsajt o prednostima i manama crne čokolade"
  }
}
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    const parts = key.split(".");
    const value =
      translations[lang]?.[parts[0]]?.[parts[1]];

    if (value) {
      el.textContent = value;
    }
  });

  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
 /* */
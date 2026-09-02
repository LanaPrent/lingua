//embedded version
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
  name:{
    placeholder: "Name"
  },
  comments:{
    placeholder: "Comments"
  },
  send:{
    text: "Send"
  },
  changePsw: "Change password"
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
  name:{
    placeholder:"Ime"
  },
  comments:{
    placeholder:"Komentari"
  },
  send:{
    text:"Pošalji"
  },
  changePsw:"Promeni lozinku"
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

// Show/hide the Serbian exercises link
  const serbianExercisesLink = document.getElementById("exercises-sr");

  console.log("Current language:", lang);
  console.log("Serbian exercises link:", serbianExercisesLink)

  if (serbianExercisesLink) {
    serbianExercisesLink.style.display = lang === "en" ? "none" : "";
  }

  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
 /* */
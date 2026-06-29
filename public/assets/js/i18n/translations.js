/*
export const translations = {
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
*/
export const translations = {
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
    message: "Log in",
    title:"Login",
    button: "Log in",
    email: "Email",
    password: "Password",
    emailRequired:"Email is required",
    passwordRequired:"Password is required",

    success: "Login successful",
    invalidCredentials: "Invalid email or password"
  }, 
  register:{
    message: "Register",
    title:"Register",
    button: "Register",
    username: "Username",
    email: "Email",
    password: "Password",
    emailRequired:"Email is required",
    usernameRequired:"Username is required",
    passwordRequired:"Password is required",

    success: "You registered successfully",
    userExists: "A user with this email already exists"
  },
  submit:{
    message: "Submit"
  },
  logout:{
    message: "Log out",
    success: "Logged out successfully",
    failed: "Logout failed"
  }, 
  common:{
    submit:"Submit",
    submitting:"Submitting...",
    databaseError: "Database error",
    serverError: "Server error",
    requiredFields: "All fields are required"
  },
   headline:{
    title: "Welcome to the Dark Chocolate Benefits and Harms App"
  },
  name: {
  placeholder: "Name"
},
comments: {
  placeholder: "Comments"
},
send: {
  text: "Send"
},
welcome: {
  text: "Welcome,"
},
profile: {
  title: "..."
},
settings: {
  title: "..."
}
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
    message: "Prijavi se",
    title:"Prijava",
    button: "Uloguj se",
    email: "Email",
    password: "Lozinka",
    emailRequired:"Unesite email adresu",
    passwordRequired:"Unesite lozinku",


    success: "Uspešno ste se prijavili",
    invalidCredentials: "Pogrešan email ili lozinka"
  },
  register:{
    message: "Registruj se",
    title:"Registracija",
    button:"Registruj se",
    username:"Korisničko ime",
    email:"Email",
    password:"Lozinka",
    emailRequired:"Unesite email adresu",
    usernameRequired:"Unesite korisničko ime",
    passwordRequired:"Unesite lozinku",

    success: "Uspešno ste se registrovali",
    userExists: "Korisnik već postoji"
  },
 submit:{
  message: "Pošalji"
 },
logout:{
  message:"Odjavi se",
  success:"Uspešno ste se odjavili", 
  failed: "Odjava nije uspela"
},
common:{
  submit:"Pošalji",
  submitting: "Slanje...",
  databaseError: "Greška u bazi podataka",
    serverError: "Greška na serveru",
    requiredFields: "Sva polja su obavezna"
},
  headline:{
    title: "Dobro došli na vebsajt o prednostima i manama crne čokolade"
  },
  name: { 
    placeholder: "Ime" 
  },
comments: { 
  placeholder: "Komentari" 
},
send: { 
  text: "Pošalji" 
}, 
welcome: {
  text: "Dobrodošli,"
},
profile: {
  title: "..."
},
settings: {
  title: "..."
}
}
};
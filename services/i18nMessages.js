const messages = {
  BOT_DETECTED: {
    en: "Bot detected",
    sr: "Detektovan bot",
  },

  REQUIRED_FIELDS: {
    en: "All fields are required",
    sr: "Sva polja su obavezna",
  },

  TOO_LONG: {
    en: "Input too long",
    sr: "Predugačak unos",
  },

  INVALID_EMAIL: {
    en: "Invalid email address",
    sr: "Neispravna email adresa",
  },

  DB_ERROR: {
    en: "Database error",
    sr: "Greška baze podataka",
  },

  EMAIL_SENT: {
    en: "Your message has been sent",
    sr: "Vaša poruka je poslata",
  },

  EMAIL_SAVED: {
    en: "Your message has been saved",
    sr: "Vaša poruka je sačuvana",
  },

  GENERAL_ERROR: {
    en: "Something went wrong",
    sr: "Došlo je do greške",
  },

  SUBMITTING: {    //
    en:"Submitting....",
    sr:"Slanje...."
  }
};

// helper function
function t(key, lang = "en") {
  return messages[key]?.[lang] || messages[key]?.en || key;
}

module.exports = { t };

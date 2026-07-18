//the original file name: messages.js

const messages = {
  en: {
    validation: {
      required: "All fields are required",
      invalidEmail: "Invalid email address",
      botDetected: "Bot detected"
    },
    contact: {
      success: "Your message has been sent",
      saved: "Your message has been saved",
      sending: "Sending...",
      tooLong: "Input too long",
      //noConnection: "Failed to fetch"
    },
    general: {
      error: "Something went wrong"
    }
  },

  sr: {
    validation: {
      required: "Sva polja su obavezna",
      invalidEmail: "Neispravan email",
      botDetected: "Detektovan bot"
    },
    contact: {
      success: "Poruka je poslata",
      saved: "Poruka je sačuvana",
      sending: "Slanje...",
      tooLong: "Predugačak unos",
     // noConnection: "Nije uspelo povezivanje"
    },
    general: {
      error: "Došlo je do greške"
    }
  }
};
function t(lang, key) {
  const parts = key.split(".");
  return parts.reduce((obj, k) => obj?.[k], messages[lang]) || key;
}

module.exports = { messages, t };

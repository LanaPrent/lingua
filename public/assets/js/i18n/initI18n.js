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
    clearRuntimeMessages();
  });

  document.getElementById("srBtn").addEventListener("click", () => {
    setLanguage("sr");
    clearRuntimeMessages();
  });
});

function clearRuntimeMessages() {
    const responseMsg = document.getElementById("responseMsg");
    if (responseMsg) {
        responseMsg.innerText = "";
    }

    const loginMsg = document.getElementById("loginMsg");
    if (loginMsg) {
        loginMsg.innerText = "";
    }

    const registerMsg = document.getElementById("registerMsg");
    if (registerMsg) {
        registerMsg.innerText = "";
    }
}

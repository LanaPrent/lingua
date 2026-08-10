//login, register buttons  and sr, eng buttons

import { setLanguage } from "./translator.js";
import { updateAuthButtons } from "../auth.js"; //added to enable Welcome message language change when logged in

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("language") || "en";
  setLanguage(lang);

  document.getElementById("enBtn").addEventListener("click", async () => {
    setLanguage("en");
    await updateAuthButtons();//added for Welcome message
    clearRuntimeMessages();
  });

  document.getElementById("srBtn").addEventListener("click", async () => {
    setLanguage("sr");
    await updateAuthButtons();//added for Welcome message
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

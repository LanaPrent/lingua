//import {translations} from "../js/i18n/translations.js";
import {translations} from "./i18n/translations.js";
import {translate} from "./i18n/translator.js";
console.log("auth.js loaded");


// ===== Elements =====
const userInfo = document.getElementById("userInfo");

const loginModal = document.getElementById("loginModal");

const registerModal = document.getElementById("registerModal");

const loginBtn = document.getElementById("loginBtn");

const registerBtn = document.getElementById("registerBtn");

const logoutBtn = document.getElementById("logoutBtn");

const closeLogin = document.getElementById("closeLogin");

const closeRegister = document.getElementById("closeRegister");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const loginMsg = document.getElementById("loginMsg");

const registerMsg = document.getElementById("registerMsg");

const loginCsrfInput =
    document.getElementById("csrfLogin");

const registerCsrfInput =
    document.getElementById("csrfRegister");

// ===== Load CSRF =====

async function loadCsrfToken() {

    try {

        const data = await apiFetch("/csrf-token");

        loginCsrfInput.value = data.csrfToken;

        registerCsrfInput.value = data.csrfToken;

    } catch (err) {

        console.error("CSRF load failed:", err);
    }
}

loadCsrfToken();

// ===== Modal logic =====

loginBtn.addEventListener("click", () => {

    loginModal.style.display = "block";

    document.getElementById("loginEmail").focus();
});

registerBtn.addEventListener("click", () => {

    registerModal.style.display = "block";

    document.getElementById("regUsername").focus();
});

closeLogin.addEventListener("click", () => {

    loginModal.style.display = "none";
});

closeRegister.addEventListener("click", () => {

    registerModal.style.display = "none";
});

window.addEventListener("click", (e) => {

    if (e.target === loginModal) {

        loginModal.style.display = "none";
    }

    if (e.target === registerModal) {

        registerModal.style.display = "none";
    }
});

// ===== Navbar auth state =====

async function updateAuthButtons() {

    try {
        //import {translations} from "./translations.js";

        const data = await apiFetch("/api/status");

        if (data.loggedIn) {

            loginBtn.style.display = "none";

            registerBtn.style.display = "none";

            logoutBtn.style.display = "inline-block";

            //userInfo.textContent = `Welcome, ${data.username}`
            /*
            const lng = localStorage.getItem("language") || "en";
            const welcome = translations[lng].welcome.text;
            userInfo.textContent = `${welcome} ${data.username}`;
            */
            const lng = localStorage.getItem("language") || "en";
            const welcomeText = translations?.[lng]?.welcome?.text ||"Welcome,";
            const username=data.username||"";
            userInfo.textContent = `${welcomeText} ${username}`;

        } else {

            loginBtn.style.display = "inline-block";

            registerBtn.style.display = "inline-block";

            logoutBtn.style.display = "none";

            userInfo.textContent=""; 
        }

    } catch (err) {

        console.error(err);
    }
}

updateAuthButtons();

// ===== Login =====

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginMsg.innerText = "";

    const data = {

        email:
            document.getElementById("loginEmail").value,

        password:
            document.getElementById("loginPassword").value,

        _csrf: loginCsrfInput.value
    };
    /**/
    //for separate error messages
    if (!data.email) {
    loginMsg.innerText =
        translate("login.emailRequired");
    loginMsg.style.color = "red";
    return;
}

if (!data.password) {
    loginMsg.innerText =
        translate("login.passwordRequired");
    loginMsg.style.color = "red";
    return;
}
    

    try {

        const result = await apiFetch("/api/login", {

            method: "POST",

            body: JSON.stringify(data)
        });

        //loginMsg.innerText = result.message;
   /* 
   //this function block is not necessary after adding import { translate } from "./i18n/translator.js";
        function translate(key) {
            const lang=localStorage.getItem("language") || "en";
            const parts = key.split(".");
            return translations[lang]?.[parts[0]]?.[parts[1]] || key;
        }
    */
        loginMsg.innerText=translate(result.message);

        loginMsg.style.color =
            result.success ? "green" : "red";

        if (result.success) {

            updateAuthButtons();

            setTimeout(() => {

                loginModal.style.display = "none";

                loginForm.reset();

                loginMsg.innerText = "";

            }, 1500);
        }

    } catch (err) {

        console.error(err);

        loginMsg.innerText = translate(err.message);

        loginMsg.style.color = "red";
    }
});

// ===== Register =====

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    registerMsg.innerText = "";

    const data = {

        username:
            document.getElementById("regUsername").value,

        email:
            document.getElementById("regEmail").value,

        password:
            document.getElementById("regPassword").value,

        _csrf: registerCsrfInput.value
    };
    /**/
//check added before calling API
    if (!data.username) {
    registerMsg.innerText =
        translate("register.usernameRequired");
    registerMsg.style.color = "red";
    return;
}

if (!data.email) {
    registerMsg.innerText =
        translate("register.emailRequired");
    registerMsg.style.color = "red";
    return;
}

if (!data.password) {
    registerMsg.innerText =
        translate("register.passwordRequired");
    registerMsg.style.color = "red";
    return;
}



    try {

        const result = await apiFetch("/api/register", {

            method: "POST",

            body: JSON.stringify(data)
        });
        console.log(result);

        registerMsg.innerText = translate(result.message);

        registerMsg.style.color =
            result.success ? "green" : "red";

        if (result.success) {

            setTimeout(() => {

                registerModal.style.display = "none";

                registerForm.reset();

                registerMsg.innerText = "";

            }, 1500);
        }

    } catch (err) {

        console.error(err);

        registerMsg.innerText = translate(err.message);

        registerMsg.style.color = "red";
    }
});

// ===== Logout =====

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    try {

        await apiFetch("/api/logout", {

            method: "POST"
        });

        updateAuthButtons();

        //alert("Logged out");

        const msg = document.getElementById("authMsg");

//msg.textContent = "Logged out successfully";
const lng=localStorage.getItem("language") || "en";
//msg.textContent = translations[lng].logout.success;
msg.textContent = translate("logout.success");
msg.classList.add("show");

setTimeout(() => {
    msg.classList.remove("show");
}, 2500);

    } catch (err) {
    console.error(err);

    const msg = document.getElementById("authMsg");

    //msg.textContent = "Logout failed";
    const lng=localStorage.getItem("language") || "en";
    //msg.textContent=translations[lng].logout.failed;
    msg.textContent = translate("logout.failed");

    msg.classList.add("show", "error"); // optional "error" class for red color

    setTimeout(() => {
        msg.classList.remove("show");
        msg.classList.remove("error"); // remove error styling too
    }, 2500);
}
});

window.openLoginModal = function () {
    document.getElementById("loginModal").style.display = "block";
};

async function handleProtected(url) {
    const res = await apiFetch("/api/status");

    if (res.loggedIn) {
        window.location.href = url;
    } else {
        window.openLoginModal();
    }
}

document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-protected]");
    if (!el) return;

    e.preventDefault();
    handleProtected(el.dataset.protected);
});

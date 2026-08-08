//import {translations} from "../js/i18n/translations.js";
import {translations} from "./i18n/translations.js";
import {translate} from "./i18n/translator.js";
//console.log("auth.js loaded");


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

// ===== Change Password =====

const changePasswordBtn =
    document.getElementById("changePsw");

const changePasswordModal =
    document.getElementById("changePasswordModal");

const closeChangePassword =
    document.getElementById("closeChangePassword");

const changePasswordForm =
    document.getElementById("changePasswordForm");

const changePasswordMsg =
    document.getElementById("changePasswordMsg");

const changePasswordCsrfInput =
    document.getElementById("csrfChangePassword");



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
        changePasswordCsrfInput.value = data.csrfToken;
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

changePasswordBtn.addEventListener("click", () => {

    changePasswordModal.style.display = "block";

    document.getElementById("currentPassword").focus();

});


registerBtn.addEventListener("click", () => {

    registerModal.style.display = "block";

    document.getElementById("regUsername").focus();
});

closeLogin.addEventListener("click", () => {

    loginModal.style.display = "none";
});

closeChangePassword.addEventListener("click", () => {

    changePasswordModal.style.display = "none";

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

    if (e.target === changePasswordModal) {

    changePasswordModal.style.display = "none";
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

            changePasswordBtn.style.display = "inline-block";

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

            changePasswordBtn.style.display="none";

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
        //console.log(result);

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

 // ===== Change Password =====

changePasswordForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    changePasswordMsg.innerText = "";

    const data = {

        currentPassword:
            document.getElementById("currentPassword").value,

        newPassword:
            document.getElementById("newPassword").value,

        confirmPassword:
            document.getElementById("confirmPassword").value,

        _csrf:
            changePasswordCsrfInput.value
    };


    // ===== Basic validation =====

    if (!data.currentPassword) {

        changePasswordMsg.innerText =
            "Please enter your current password.";

        changePasswordMsg.style.color = "red";

        return;
    }

    if (!data.newPassword) {

        changePasswordMsg.innerText =
            "Please enter a new password.";

        changePasswordMsg.style.color = "red";

        return;
    }

    if (!data.confirmPassword) {

        changePasswordMsg.innerText =
            "Please confirm your new password.";

        changePasswordMsg.style.color = "red";

        return;
    }

    if (data.newPassword !== data.confirmPassword) {

        changePasswordMsg.innerText =
            "New passwords do not match.";

        changePasswordMsg.style.color = "red";

        return;
    }


    // ===== Send request to server =====

    try {

        const result = await apiFetch(
            "/api/change-password",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );


        changePasswordMsg.innerText =
            result.message;

        changePasswordMsg.style.color =
            result.success ? "green" : "red";


        // ===== Password changed successfully =====

        if (result.success) {

            setTimeout(() => {

                changePasswordModal.style.display = "none";

                changePasswordForm.reset();

                changePasswordMsg.innerText = "";

            }, 1500);
        }

    } catch (err) {

        console.error(err);

        changePasswordMsg.innerText =
            err.message;

        changePasswordMsg.style.color = "red";
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

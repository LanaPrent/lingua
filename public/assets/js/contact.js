//console.log("contact.js loaded");


// ===== Elements =====

const contactForm = document.getElementById("contactForm");

const submitBtn = document.getElementById("submitBtn");

const csrfInput = document.getElementById("csrfToken");

const responseMsg = document.getElementById("responseMsg");

const loadingSpinner = document.getElementById("loadingSpinner");

// ===== Load CSRF =====

async function loadCsrfToken() {

    try {

        const data = await apiFetch("/csrf-token");

        csrfInput.value = data.csrfToken;

        submitBtn.disabled = false;

    } catch (err) {

        console.error(err);

        responseMsg.innerText = "Security error";

        responseMsg.style.color = "red";
    }
}

loadCsrfToken();

// ===== Prefill user info =====

async function loadUserInfo() {

    try {

        const user = await apiFetch("/api/status");

        if (user.loggedIn) {

            document.getElementById("name").value = user.username;

            document.getElementById("email").value = user.email;
        }

    } catch (err) {

        console.error(err);
    }
}

loadUserInfo();

document.addEventListener("DOMContentLoaded", () => {
    const startField = document.getElementById("formStartTime");

    if (startField) {
        startField.value = Date.now();
    }
});
/**/
//Auto-grow as the user types
const textarea=document.getElementById("comments");
              textarea.addEventListener("input", () =>{
                textarea.style.height="auto";
                textarea.style.height=textarea.scrollHeight+"px";
              });

// ===== Submit Contact Form =====

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    responseMsg.innerText = "";

    const data = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        comments: document.getElementById("comments").value,
        formStartTime: document.getElementById("formStartTime").value,

        _csrf: csrfInput.value
    };

    loadingSpinner.style.display = "block";

    try {

        const result = await apiFetch("/submit", {

            method: "POST",

            body: JSON.stringify(data)
        });

        loadingSpinner.style.display = "none";

        responseMsg.innerText = result.message;

        responseMsg.style.color =
            result.success ? "green" : "red";

        contactForm.reset();

        setTimeout(() => {

            responseMsg.innerText = "";

        }, 3000);

    } catch (err) {

        console.error(err);

        loadingSpinner.style.display = "none";

        //responseMsg.innerText = err.message; //instead of this, write the code until responseMsg.Style.color
        if(err.message ==="Failed to fetch"){
            responseMsg.innerText = localStorage.getItem("language")==="sr"?
            "Povezivanje trenutno nije uspelo.Pokušajte kasnije": "Unable to connect right now. Please try later.";

}else{
    responseMsg.innerText = err.message;
}
        responseMsg.style.color = "green";
    }
});

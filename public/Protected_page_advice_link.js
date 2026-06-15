function protectedLink(elementId, url) {
    document.getElementById(elementId).addEventListener("click", async (e) => {
        e.preventDefault();

        const res = await fetch("/api/status");
        const user = await res.json();

        if (user.loggedIn) {
            window.location.href = url;
        } else {
           window.openLoginModal(); 
        }
    });
}

protectedLink("loginChocolateEatingAdvice", "/members/chocolate-eating-advice");
protectedLink("loginWhyIsCocoaDangerous", "/members/harmful-metals-in-chocolate");




/*
document.getElementById("loginChocolateEatingAdvice").addEventListener("click", async (e) =>{
    e.preventDefault();

    const res = await fetch("/api/status");
    const user = await res.json();

    if(user.loggedIn){
        window.location.href = "/members/chocolate-eating-advice";
    } else {
        window.openLoginModal(); 
    }
});


document.getElementById("loginWhyIsCocoaDangerous").addEventListener("click", async (e) =>{
    e.preventDefault();

    const res = await fetch("/api/status");
    const user = await res.json();

    if(user.loggedIn){
        window.location.href = "/members/harmful-metals-in-chocolate";
    } else {
       window.openLoginModal(); 
    }
});
*/

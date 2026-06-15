document.getElementById("loginChocolateEatingAdvice").addEventListener("click", async (e) =>{
    e.preventDefault();
    const res = await fetch("/api/status");
    const user = await res.json();
    if(user.loggedIn){
        window.location.href= "/members/chocolate-eating-advice";
    }
    else{
        loginModal.style.display = "block";
    }
});

document.getElementById("loginWhyIsCocoaDangerous").addEventListener("click", async (e) =>{
    e.preventDefault();
    const res = await fetch("/api/status");
    const user = await res.json();
    if(user.loggedIn){
        window.location.href= "/members/chocolate-eating-advice";
    }
    else{
        loginModal.style.display = "block";
    }
});
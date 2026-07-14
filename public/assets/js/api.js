//console.log("api.js loaded");
async function apiFetch(url, options = {}) {

    const defaultOptions = {
        credentials:"include",//previously: "same-origin"
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage.getItem("language") || "en"
            //"Accept-Language":getLang()
        }
    };

    const finalOptions = {
        ...defaultOptions,
        ...options,

        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    const response = await fetch(url, finalOptions);



    let data;

    try {
        data = await response.json();
    } catch {
        data = {
            success: false,
            message: "Invalid server response"
        };
    }

        // ✅ NEW: handle unauthorized globally
    if (response.status === 401) {
        if (window.openLoginModal) {
            window.openLoginModal();
        }
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

document.addEventListener("DOMContentLoaded", () => {
    // NAV
    const logoToggle = document.getElementById("logo-toggle");
    const navOverlay = document.getElementById("nav-overlay");
    const navClose = document.getElementById("nav-close");

    logoToggle.addEventListener("click", () => {
        navOverlay.classList.toggle("is-open");
    });

    navClose.addEventListener("click", () => {
        navOverlay.classList.remove("is-open");
    });
});
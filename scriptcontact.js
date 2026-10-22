document.addEventListener("DOMContentLoaded", () => {

    // NAVEGAÇÃO
    const logoToggle = document.getElementById("logo-toggle");
    const navOverlay = document.getElementById("nav-overlay");
    const navClose = document.getElementById("nav-close");

    // Botão da logo: abre/fecha o menu
    logoToggle.addEventListener("click", () => {
        navOverlay.classList.toggle("is-open");
    });

    // Botão X: fecha o menu
    navClose.addEventListener("click", () => {
        navOverlay.classList.remove("is-open");
    });

    // ESC também fecha
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            navOverlay.classList.remove("is-open");
        }
    });

});
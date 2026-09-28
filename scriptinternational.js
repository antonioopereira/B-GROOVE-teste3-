document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // DETEÇÃO DE MOBILE
    // ==========================================
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================
    const logoToggle = document.getElementById("logo-toggle");
    const navOverlay = document.getElementById("nav-overlay");
    const navClose = document.getElementById("nav-close");

    logoToggle.addEventListener("click", () => {
        if (navOverlay.classList.contains("is-open")) {
            window.location.href = "index.html";
        } else {
            navOverlay.classList.add("is-open");
        }
    });

    navClose.addEventListener("click", () => {
        navOverlay.classList.remove("is-open");
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            navOverlay.classList.remove("is-open");
        }
    });

    // ==========================================
    // DADOS DOS VÍDEOS
    // ==========================================
    const videoData = [
        {
            id: "1208286427",
            brand: "International",
            title: "01",
            Thumb: "images/international/imagem-01.webp"
        },
        {
            id: "1208286424",
            brand: "International",
            title: "02",
            Thumb: "images/international/imagem-02.webp"
        }
    ];

    const gallery = document.getElementById("gallery");
    const items = [];

    // ==========================================
    // CRIAÇÃO DOS ITENS
    // ==========================================
    videoData.forEach((data) => {
        const item = document.createElement("div");
        item.classList.add("gallery-item");

        // Miniatura
        const thumbnailUrl = data.Thumb || `https://vumbnail.com/${data.id}.jpg`;
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = `${data.brand} — ${data.title}`;
        img.classList.add("poster-preview");
        img.onerror = () => {
            console.error("❌ Falhou miniatura:", thumbnailUrl);
            img.style.background = "#222";
        };
        item.appendChild(img);

        // Wrapper do iframe
        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");

        const iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${data.id}?background=1&autoplay=0&loop=1&muted=1&api=1&title=0&byline=0&portrait=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("loading", "lazy");

        wrapper.appendChild(iframe);
        item.appendChild(wrapper);

        // Título
        const titleEl = document.createElement("div");
        titleEl.classList.add("video-title");
        titleEl.innerHTML = `
            <span class="title-brand">${data.brand}</span>
            <span class="title-sep">—</span>
            <span class="title-work">${data.title}</span>
        `;
        item.appendChild(titleEl);

        // Hover → fade in + play
        item.addEventListener("mouseenter", () => {
            gsap.to(wrapper, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
            iframe.contentWindow.postMessage(
                JSON.stringify({ method: "play" }),
                "*"
            );
        });

        // Mouse leave → pause + fade out
        item.addEventListener("mouseleave", () => {
            gsap.to(wrapper, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
            iframe.contentWindow.postMessage(
                JSON.stringify({ method: "pause" }),
                "*"
            );
        });

        gallery.appendChild(item);
        items.push({ element: item });
    });

    // ==========================================
    // LAYOUT — dois vídeos centrados
    // ==========================================
    const RATIO = 16 / 9;

    function layout() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // ---------- MOBILE ----------
        if (isMobile) {
            const mobileW = vw * 0.9;
            const mobileH = mobileW / RATIO;
            const gapY = 60;
            const padTop = 180;
            const totalH = padTop + items.length * mobileH + (items.length - 1) * gapY + 120;

            gallery.style.width = vw + "px";
            gallery.style.height = totalH + "px";

            items.forEach((it, i) => {
                const x = (vw - mobileW) / 2;
                const y = padTop + i * (mobileH + gapY);
                it.element.style.left = x + "px";
                it.element.style.top = y + "px";
                it.element.style.width = mobileW + "px";
                it.element.style.height = mobileH + "px";
            });
        }

        // ---------- DESKTOP ----------
        else {
            const gapX = vw * 0.04;
            const totalGap = gapX * (items.length - 1);

            // largura limitada por viewport width E por viewport height
            const maxWByWidth = (vw * 0.88 - totalGap) / items.length;
            const maxWByHeight = vh * 0.75 * RATIO;
            const itemW = Math.min(maxWByWidth, maxWByHeight);
            const itemH = itemW / RATIO;

            const totalW = items.length * itemW + totalGap;
            const startX = (vw - totalW) / 2;
            const startY = (vh - itemH) / 2;

            gallery.style.width = vw + "px";
            gallery.style.height = vh + "px";

            items.forEach((it, i) => {
                it.element.style.left = (startX + i * (itemW + gapX)) + "px";
                it.element.style.top = startY + "px";
                it.element.style.width = itemW + "px";
                it.element.style.height = itemH + "px";
            });
        }
    }

    layout();

    // Relayout ao redimensionar
    window.addEventListener("resize", layout);

    console.log(`🌍 International: ${items.length} vídeos | modo: ${isMobile ? "mobile" : "desktop"}`);
});
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

    // DADOS
    const videoData = [
        { id: "1208286427", brand: "American Eagle.", Thumb: "images/international/imagem-01.webp" },
        { id: "1208286424", brand: "American Eagle.", Thumb: "images/international/imagem-02.webp" }
    ];

    const gallery = document.getElementById("gallery");
    const items = [];

    // CRIAÇÃO DOS ITENS
    videoData.forEach((data) => {
        const item = document.createElement("div");
        item.classList.add("gallery-item");

        const thumbnailUrl = data.Thumb || `https://vumbnail.com/${data.id}.jpg`;
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = data.brand;
        img.classList.add("poster-preview");
        img.onerror = () => {
            console.error("❌ Falhou miniatura:", thumbnailUrl);
            img.style.background = "#222";
        };
        item.appendChild(img);

        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");

        const iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${data.id}?background=1&autoplay=1&loop=1&muted=1&api=1&controls=0&autopause=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("loading", "lazy");

        wrapper.appendChild(iframe);
        item.appendChild(wrapper);

        // Título (Apenas a marca)
        const titleEl = document.createElement("div");
        titleEl.classList.add("video-title");
        titleEl.innerHTML = `<span class="title-brand">${data.brand}</span>`;
        item.appendChild(titleEl);

        // Hover
        item.addEventListener("mouseenter", () => {
            gsap.to(wrapper, { opacity: 1, duration: 0.4, ease: "power2.out" });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(wrapper, { opacity: 0, duration: 0.3, ease: "power2.in" });
        });

        gallery.appendChild(item);
        items.push({ element: item });
    });

    // LAYOUT
    const RATIO = 16 / 9;

    function layout() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // ---------- MOBILE ----------
        if (vw <= 768) {
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
    window.addEventListener("resize", layout);

});
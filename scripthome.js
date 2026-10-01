document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================
    const logoToggle = document.getElementById("logo-toggle");
    const navOverlay = document.getElementById("nav-overlay");
    const navClose = document.getElementById("nav-close");

    logoToggle.addEventListener("click", () => {
        if (navOverlay.classList.contains("is-open")) {
            navOverlay.classList.remove("is-open");
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
    // TÚNEL 3D — CONFIGURAÇÕES
    // ==========================================
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const config = {
        totalImages: isMobile ? 10 : 15,
        gap: isMobile ? 500 : 800,
        speed: isMobile ? 1.2 : 1.5,
        lerp: 0.08,
        exitPoint: isMobile ? 400 : 600,
        curveFactor: 0.18,
        lazyLoadZ: -2500   // distância a que se começa a carregar o iframe
    };

    // ==========================================
    // DADOS + SHUFFLE
    // ==========================================
    const rawData = [
        { id: "1226708222", brand: "McDonald's", title: "Reviews", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-01.webp" },
        { id: "1228562721", brand: "BIS", title: "Projeto 02", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-02.webp" },
        { id: "951206599",  brand: "Marca C", title: "Projeto 03", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-03.webp" },
        { id: "1228563134", brand: "Marca D", title: "Projeto 04", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-11.webp" },
        { id: "1229244984", brand: "Marca E", title: "Projeto 05", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-13.webp" },
        { id: "951206509",  brand: "Marca F", title: "Projeto 06", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-04.webp" },
        { id: "953718810",  brand: "Marca G", title: "Projeto 07", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-05.webp" },
        { id: "955961149",  brand: "Marca H", title: "Projeto 08", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-06.webp" },
        { id: "951206647",  brand: "Marca I", title: "Projeto 09", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-09.webp" },
        { id: "1064109149", brand: "Marca J", title: "Projeto 10", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-08.webp" },
        { id: "951206473",  brand: "Marca K", title: "Projeto 11", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-10.webp" },
        { id: "1075350120", brand: "Marca L", title: "Projeto 12", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-07.webp" },
        { id: "951206549",  brand: "Marca Y", title: "Projeto 25", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-12.webp" },
        { id: "1229250084", brand: "Marca Z", title: "Projeto 26", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-14.webp" },

        { id: "1220816532", brand: "Marca M", title: "Projeto 13", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-13.webp" },
        { id: "1220821289", brand: "Marca N", title: "Projeto 14", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-14.webp" },
        { id: "1220828316", brand: "Marca O", title: "Projeto 15", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-17.webp" },
        { id: "1229158772", brand: "Marca P", title: "Projeto 16", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-15.webp" },
        { id: "1220835706", brand: "Marca Q", title: "Projeto 17", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-18.webp" },
        { id: "1220831743", brand: "Marca R", title: "Projeto 18", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-16.webp" },
        { id: "1231972605", brand: "Realm", title: "Opo", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-a.webp" },
        { id: "1231970301", brand: "SlowJ feat. GSon & Mizzy Miles", title: "Champions-League", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-b.webp" },
        { id: "1231970990", brand: "Raissa", title: "Pensas em Mim", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-c.webp" },

        { id: "1228567548", brand: "Marca S", title: "Projeto 19", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-24.webp" },
        { id: "1229123992", brand: "Marca T", title: "Projeto 20", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-20.webp" },
        { id: "1229125856", brand: "Marca U", title: "Projeto 21", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-22.webp" },
        { id: "1229127014", brand: "Marca V", title: "Projeto 22", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-21.webp" },
        { id: "1229127593", brand: "Marca W", title: "Projeto 23", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-23.webp" },
        { id: "1229129641", brand: "Marca X", title: "Projeto 24", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-19.webp" }
    ];

    const mediaData = [...rawData];
    for (let i = mediaData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mediaData[i], mediaData[j]] = [mediaData[j], mediaData[i]];
    }

    // ==========================================
    // CRIAÇÃO DOS CARTÕES
    // ==========================================
    const tunnelScene = document.getElementById("tunnel-scene");
    const cards = [];
    const tunnelDepth = config.totalImages * config.gap;
    const visibleDepth = 4 * config.gap;

    for (let i = 0; i < config.totalImages; i++) {
        const data = mediaData[i];
        const videoId = data.id;

        const card = document.createElement("div");
        card.classList.add("video-card");

        // Miniatura
        const thumbnailUrl = data.Thumb || `https://vumbnail.com/${videoId}.jpg`;
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = `Vídeo ${i + 1}`;
        img.classList.add("poster-preview");
        img.loading = "lazy";

        img.onerror = () => {
            console.error("❌ Falhou miniatura:", thumbnailUrl);
            img.style.background = "#222";
        };

        card.appendChild(img);

        // Wrapper do iframe
        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");
        card.appendChild(wrapper);

        tunnelScene.appendChild(card);

        cards.push({
            element: card,
            wrapper: wrapper,
            videoId: videoId,
            baseZ: -i * config.gap,
            currentZ: -i * config.gap,
            iframeLoaded: false,
            iframe: null
        });
    }

    // ==========================================
    // LAZY LOAD DO IFRAME
    // ==========================================
    function loadIframe(cardObj) {
        if (cardObj.iframeLoaded) return;

        const iframe = document.createElement("iframe");
        // ✅ background=1 → autoplay muted em loop (removido autoplay=0)
        iframe.src = `https://player.vimeo.com/video/${cardObj.videoId}?background=1&loop=1&muted=1&api=1`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");

        cardObj.wrapper.appendChild(iframe);
        cardObj.iframe = iframe;
        cardObj.iframeLoaded = true;

        console.log("📥 Iframe carregado:", cardObj.videoId);
    }

    // ==========================================
    // SCROLL
    // ==========================================
    let targetScroll = 0;
    let currentScroll = 0;

    window.addEventListener("wheel", (e) => {
        if (e.target.closest(".nav-overlay")) return;
        e.preventDefault();
        targetScroll += e.deltaY * config.speed;
    }, { passive: false });

    let touchStartY = 0;
    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        targetScroll += deltaY * config.speed * 2;
        touchStartY = touchY;
    }, { passive: true });

    // ==========================================
    // OPACIDADE
    // ==========================================
    function calculateOpacity(z) {
        if (z > config.exitPoint) return 0;
        if (z > 0) {
            const fadeOutStart = config.exitPoint * 0.4;
            if (z < fadeOutStart) return 1;
            return 1 - ((z - fadeOutStart) / (config.exitPoint - fadeOutStart));
        }
        if (z > -visibleDepth) {
            const fadeInEnd = -visibleDepth + 400;
            if (z > fadeInEnd) return 1;
            return 1 - ((fadeInEnd - z) / 400);
        }
        return 0;
    }

    // ==========================================
    // LOOP
    // ==========================================
    gsap.ticker.add(() => {
        currentScroll += (targetScroll - currentScroll) * config.lerp;

        cards.forEach((cardObj) => {
            let z = cardObj.baseZ + currentScroll;

            if (z > config.exitPoint) {
                const offset = Math.ceil((z - config.exitPoint) / tunnelDepth) * tunnelDepth;
                cardObj.baseZ -= offset;
                z = cardObj.baseZ + currentScroll;
            }

            // Lazy load
            if (!cardObj.iframeLoaded && z > config.lazyLoadZ) {
                loadIframe(cardObj);
            }

            const opacity = calculateOpacity(z);
            const yOffset = z * config.curveFactor;
            const rotX = -(z / tunnelDepth) * 25;

            gsap.set(cardObj.element, {
                z: z,
                y: yOffset,
                rotationX: rotX,
                opacity: opacity,
                force3D: true,
                visibility: (opacity <= 0.01) ? "hidden" : "visible"
            });
        });
    });

    // ==========================================
    // HOVER — play / pause
    // ==========================================
    cards.forEach((cardObj) => {
        cardObj.element.addEventListener("mouseenter", () => {
            loadIframe(cardObj);

            gsap.to(cardObj.wrapper, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });

            if (cardObj.iframe) {
                cardObj.iframe.contentWindow.postMessage(
                    JSON.stringify({ method: "play" }),
                    "*"
                );
            }
        });

        cardObj.element.addEventListener("mouseleave", () => {
            gsap.to(cardObj.wrapper, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            if (cardObj.iframe) {
                cardObj.iframe.contentWindow.postMessage(
                    JSON.stringify({ method: "pause" }),
                    "*"
                );
            }
        });
    });

});
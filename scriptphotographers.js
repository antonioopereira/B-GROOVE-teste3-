document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // DETEÇÃO DE TELEMÓVEL
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
    // DADOS DAS FOTOGRAFIAS (20 imagens)
    // ==========================================
    const photoData = [
        { src: "images/thais-vandanezi/imagem-01.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-02.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-03.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-04.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-05.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-06.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-07.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-08.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-09.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-10.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-11.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-12.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-13.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-14.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-15.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-16.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-17.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-18.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-19.webp", photographer: "thais-vandanezi" },
        { src: "images/thais-vandanezi/imagem-20.webp", photographer: "thais-vandanezi" }
    ];

    const gallery = document.getElementById("gallery");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // ==========================================
    // ÁREA VIRTUAL — mais compacta (fotos mais próximas)
    // ==========================================
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 👇 VIRTUAL_W reduzido de 5.5 → 3.2 (colunas mais próximas)
    // 👇 VIRTUAL_H reduzido de 2.0 → 1.6 (linhas mais próximas)
    const VIRTUAL_W = isMobile ? vw * 4.5 : vw * 3.2;
    const VIRTUAL_H = isMobile ? vh * 7.5 : vh * 1.6;

    gallery.style.width = VIRTUAL_W + "px";
    gallery.style.height = VIRTUAL_H + "px";

    // ==========================================
    // GRELHA — 8 colunas × 4 linhas
    // ==========================================
    const COLS = isMobile ? 2 : 8;
    const ROWS = isMobile ? 10 : 4;
    const CELL_W = VIRTUAL_W / COLS;
    const CELL_H = VIRTUAL_H / ROWS;

    // 👇 Fotos maiores
    const IMG_WIDTH = isMobile ? 260 : 440;

    // Células em ordem sequencial
    const cells = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            cells.push({ r, c });
        }
    }

    // ==========================================
    // Pseudo-random determinístico
    // ==========================================
    function seededRandom(seed) {
        const x = Math.sin(seed * 12.9898) * 43758.5453;
        return x - Math.floor(x);
    }

    const items = [];

    // ==========================================
    // CRIAÇÃO DOS ITENS — sem sobreposição
    // ==========================================
    photoData.forEach((data, i) => {
        const cell = cells[i % cells.length];
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.dataset.photographer = data.photographer;

        const slackX = CELL_W - IMG_WIDTH;
        const slackY = CELL_H * 0.5;

        // Jitter determinístico
        const seedX = i * 1.37 + 0.5;
        const seedY = i * 2.71 + 1.3;

        const jitterX = (seededRandom(seedX) - 0.5) * slackX * 0.8;
        const jitterY = (seededRandom(seedY) - 0.5) * slackY;

        const baseX = cell.c * CELL_W + slackX / 2 + jitterX;
        const baseY = cell.r * CELL_H + (CELL_H * 0.1) + jitterY;

        item.style.left = baseX + "px";
        item.style.top = baseY + "px";
        item.style.width = IMG_WIDTH + "px";

        const img = document.createElement("img");
        img.src = data.src;
        img.alt = `Fotografia de ${data.photographer}`;
        img.loading = "lazy";

        img.style.maxHeight = (CELL_H * 0.85) + "px";
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "contain";

        img.onerror = () => {
            console.error("❌ Falhou fotografia:", data.src);
            img.style.background = "#222";
            img.style.height = "150px";
        };
        item.appendChild(img);

        gallery.appendChild(item);
        items.push({ element: item, baseX, baseY });
    });

    console.log(`📸 ${items.length} fotografias em grid ${COLS}×${ROWS} | img ${IMG_WIDTH}px`);

    // ==========================================
    // LIMITES DO SCROLL
    // ==========================================
    const MIN_PAN_X = -(VIRTUAL_W - vw);
    const MAX_PAN_X = 0;
    const MIN_PAN_Y = -(VIRTUAL_H - vh);
    const MAX_PAN_Y = 0;

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================
    let targetPanX = 0, targetPanY = 0;
    let currentPanX = 0, currentPanY = 0;

    const WHEEL_SENSITIVITY = 1.0;
    const TOUCH_SENSITIVITY = 1.5;

    window.addEventListener("wheel", (e) => {
        if (e.target.closest(".nav-overlay")) return;
        e.preventDefault();

        targetPanX = clamp(
            targetPanX - e.deltaX * WHEEL_SENSITIVITY,
            MIN_PAN_X, MAX_PAN_X
        );
        targetPanY = clamp(
            targetPanY - e.deltaY * WHEEL_SENSITIVITY,
            MIN_PAN_Y, MAX_PAN_Y
        );

        if (e.shiftKey) {
            targetPanX = clamp(
                targetPanX - e.deltaY * WHEEL_SENSITIVITY,
                MIN_PAN_X, MAX_PAN_X
            );
            targetPanY = clamp(
                targetPanY + e.deltaY * WHEEL_SENSITIVITY,
                MIN_PAN_Y, MAX_PAN_Y
            );
        }
    }, { passive: false });

    // ==========================================
    // TOUCH
    // ==========================================
    let touchStartX = 0, touchStartY = 0;
    let touchStartPanX = 0, touchStartPanY = 0;
    let isTouching = false;

    window.addEventListener("touchstart", (e) => {
        if (e.target.closest(".logo-container, .nav-overlay, .filters, .site-footer")) return;

        const t = e.touches[0];
        isTouching = true;
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartPanX = targetPanX;
        touchStartPanY = targetPanY;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (!isTouching) return;
        e.preventDefault();

        const t = e.touches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;

        targetPanX = clamp(
            touchStartPanX + dx * TOUCH_SENSITIVITY,
            MIN_PAN_X, MAX_PAN_X
        );
        targetPanY = clamp(
            touchStartPanY + dy * TOUCH_SENSITIVITY,
            MIN_PAN_Y, MAX_PAN_Y
        );
    }, { passive: false });

    window.addEventListener("touchend", () => {
        isTouching = false;
    });

    // ==========================================
    // LOOP DE ANIMAÇÃO
    // ==========================================
    function loop() {
        const smooth = isMobile ? 0.12 : 0.08;

        currentPanX += (targetPanX - currentPanX) * smooth;
        currentPanY += (targetPanY - currentPanY) * smooth;

        items.forEach((item) => {
            gsap.set(item.element, {
                x: currentPanX,
                y: currentPanY,
                force3D: true
            });
        });

        requestAnimationFrame(loop);
    }
    loop();

    // ==========================================
    // FILTROS
    // ==========================================
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            items.forEach((item) => {
                const photographer = item.element.dataset.photographer;
                if (filter === "all" || photographer === filter) {
                    item.element.classList.remove("hidden");
                } else {
                    item.element.classList.add("hidden");
                }
            });
        });
    });

});
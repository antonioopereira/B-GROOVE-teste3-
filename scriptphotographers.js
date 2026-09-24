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
    // ÁREA VIRTUAL — MUITO maior para dar espaço
    // ==========================================
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Desktop: 4.5× largura × 6× altura
    // Mobile: 4.5× largura × 10× altura
    const VIRTUAL_W = vw * 3.6;
    const VIRTUAL_H = isMobile ? vh * 7.5 : vh * 4.5;

    gallery.style.width = VIRTUAL_W + "px";
    gallery.style.height = VIRTUAL_H + "px";

    // ==========================================
    // GRELHA — menos colunas e linhas para mais espaço
    // ==========================================
    const COLS = isMobile ? 2 : 4;
    const ROWS = isMobile ? 10 : 6;
    const CELL_W = VIRTUAL_W / COLS;
    const CELL_H = VIRTUAL_H / ROWS;

    // 👇 Imagens maiores
    const IMG_WIDTH = isMobile ? 220 : 340;

    const cells = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            cells.push({ r, c });
        }
    }
    cells.sort(() => Math.random() - 0.5);

    const items = [];

    // ==========================================
    // CRIAÇÃO DOS ITENS — sem sobreposição
    // ==========================================
    photoData.forEach((data, i) => {
        const cell = cells[i % cells.length];
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.dataset.photographer = data.photographer;

        // Jitter MUITO reduzido para não invadir a célula vizinha
        const jitterX = (Math.random() - 0.5) * (CELL_W * 0.15);
        const jitterY = (Math.random() - 0.5) * (CELL_H * 0.1);

        const baseX = cell.c * CELL_W + (CELL_W - IMG_WIDTH) / 2 + jitterX;
        const baseY = cell.r * CELL_H + (CELL_H * 0.15) + jitterY;

        item.style.left = baseX + "px";
        item.style.top = baseY + "px";
        item.style.width = IMG_WIDTH + "px";
        // height NÃO é definida — a imagem define-a naturalmente

        const img = document.createElement("img");
        img.src = data.src;
        img.alt = `Fotografia de ${data.photographer}`;
        img.loading = "lazy";
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
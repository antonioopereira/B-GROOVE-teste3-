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

    const filterCallout = document.getElementById("filter-callout");

    // ==========================================
    // DADOS DAS FOTOGRAFIAS
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
    // ÁREA VIRTUAL — 2 fileiras visíveis
    // ==========================================
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const ROWS = 2;
    const VIRTUAL_H = vh;
    const ROW_HEIGHT = VIRTUAL_H / ROWS;

    // ---- Aumentei o BASE_FILL para imagens maiores ----
    const BASE_FILL = 0.92;

    const MARGIN_X = vw * 0.2;
    const MIN_GAP = 60;

    const TIERS = [0.5, 0.65, 0.82];
    const TIER_PATTERN = [2, 0, 1, 0, 2, 1, 0, 2, 1, 0];

    const assignedWidths = photoData.map((_, i) => {
        const tierIndex = TIER_PATTERN[i % TIER_PATTERN.length];
        const tier = TIERS[tierIndex];
        return ROW_HEIGHT * BASE_FILL * tier;
    });

    const rowAssignments = Array.from({ length: ROWS }, () => []);
    photoData.forEach((_, i) => {
        rowAssignments[i % ROWS].push(i);
    });

    let maxRowContentWidth = 0;
    rowAssignments.forEach(indices => {
        const contentW = indices.reduce((s, i) => s + assignedWidths[i], 0)
            + (indices.length - 1) * MIN_GAP;
        maxRowContentWidth = Math.max(maxRowContentWidth, contentW);
    });

    const VIRTUAL_W = Math.max(maxRowContentWidth + 2 * MARGIN_X, vw * 1.5);

    gallery.style.width = VIRTUAL_W + "px";
    gallery.style.height = VIRTUAL_H + "px";

    function seededRandom(seed) {
        const x = Math.sin(seed * 12.9898) * 43758.5453;
        return x - Math.floor(x);
    }

    const items = [];

    // ==========================================
    // Posições X
    // ==========================================
    const xPositions = new Array(photoData.length);

    rowAssignments.forEach((indices) => {
        const contentW = indices.reduce((s, i) => s + assignedWidths[i], 0);
        const availableSpace = VIRTUAL_W - contentW - 2 * MARGIN_X;
        const gap = indices.length > 1
            ? availableSpace / (indices.length - 1)
            : 0;

        let x = MARGIN_X;
        indices.forEach((dataIndex) => {
            xPositions[dataIndex] = x;
            x += assignedWidths[dataIndex] + gap;
        });
    });

    // ==========================================
    // LIGHTBOX
    // ==========================================
    function openLightbox(src) {
        const lb = document.createElement("div");
        lb.className = "lightbox";

        const closeBtn = document.createElement("button");
        closeBtn.className = "lightbox-close";
        closeBtn.setAttribute("aria-label", "Fechar");
        closeBtn.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="18" y1="6" x2="6" y2="18"></line>
            </svg>
        `;

        const img = document.createElement("img");
        img.src = src;
        img.alt = "";

        lb.appendChild(closeBtn);
        lb.appendChild(img);

        lb.addEventListener("click", (e) => {
            if (e.target === lb) closeLightbox();
        });

        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        function closeLightbox() {
            lb.classList.add("is-closing");
            setTimeout(() => lb.remove(), 220);
            window.removeEventListener("keydown", onKey);
        }

        function onKey(e) {
            if (e.key === "Escape") closeLightbox();
        }
        window.addEventListener("keydown", onKey);

        document.body.appendChild(lb);
    }

    // ==========================================
    // CRIAÇÃO DOS ITENS
    // ==========================================
    photoData.forEach((data, i) => {
        const row = i % ROWS;
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.dataset.photographer = data.photographer;

        const imgW = assignedWidths[i];
        const baseX = xPositions[i];

        item.style.left = baseX + "px";
        item.style.width = imgW + "px";

        const img = document.createElement("img");
        img.src = data.src;
        img.alt = `Fotografia de ${data.photographer}`;
        img.loading = "lazy";

        img.onerror = () => {
            console.error("❌ Falhou fotografia:", data.src);
            img.style.background = "#222";
            img.style.height = "150px";
        };

        img.onload = () => {
            const imgH = img.getBoundingClientRect().height;

            const jitterYMax = Math.max(0, ROW_HEIGHT - imgH);
            const seedY = i * 2.71 + 1.3;
            const jitterY = (seededRandom(seedY) - 0.5) * jitterYMax * 0.6;

            const baseY = row * ROW_HEIGHT + (ROW_HEIGHT - imgH) / 2 + jitterY;

            item.style.top = baseY + "px";

            items.push({
                element: item,
                baseX: baseX,
                baseY: baseY,
                originalLeft: baseX,
                originalTop: baseY,
                originalW: imgW,
                originalH: imgH
            });
        };

        item.addEventListener("click", () => {
            openLightbox(data.src);
        });

        item.appendChild(img);
        gallery.appendChild(item);
    });

    // ==========================================
    // LIMITES DO SCROLL — só horizontal
    // ==========================================
    const MIN_PAN_X = -(VIRTUAL_W - vw);
    const MAX_PAN_X = 0;
    const MIN_PAN_Y = 0;
    const MAX_PAN_Y = 0;

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    let targetPanX = 0, targetPanY = 0;
    let currentPanX = 0, currentPanY = 0;

    const WHEEL_SENSITIVITY = 1.0;
    const TOUCH_SENSITIVITY = 1.5;

    window.addEventListener("wheel", (e) => {
        if (e.target.closest(".nav-overlay")) return;
        e.preventDefault();

        targetPanX = clamp(targetPanX - e.deltaX * WHEEL_SENSITIVITY, MIN_PAN_X, MAX_PAN_X);
        targetPanY = clamp(targetPanY - e.deltaY * WHEEL_SENSITIVITY, MIN_PAN_Y, MAX_PAN_Y);

        if (e.shiftKey) {
            targetPanX = clamp(targetPanX - e.deltaY * WHEEL_SENSITIVITY, MIN_PAN_X, MAX_PAN_X);
            targetPanY = clamp(targetPanY + e.deltaY * WHEEL_SENSITIVITY, MIN_PAN_Y, MAX_PAN_Y);
        }
    }, { passive: false });

    let touchStartX = 0, touchStartY = 0;
    let touchStartPanX = 0, touchStartPanY = 0;
    let isTouching = false;
    let touchMoved = false;

    window.addEventListener("touchstart", (e) => {
        if (e.target.closest(".logo-container, .nav-overlay, .filters, .site-footer")) return;

        const t = e.touches[0];
        isTouching = true;
        touchMoved = false;
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

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) touchMoved = true;

        targetPanX = clamp(touchStartPanX + dx * TOUCH_SENSITIVITY, MIN_PAN_X, MAX_PAN_X);
        targetPanY = clamp(touchStartPanY + dy * TOUCH_SENSITIVITY, MIN_PAN_Y, MAX_PAN_Y);
    }, { passive: false });

    window.addEventListener("touchend", () => {
        isTouching = false;
    });

    // ==========================================
    // LOOP
    // ==========================================
    function loop() {
        const smooth = isMobile ? 0.12 : 0.08;

        currentPanX += (targetPanX - currentPanX) * smooth;
        currentPanY += (targetPanY - currentPanY) * smooth;

        items.forEach((item) => {
            gsap.set(item.element, { x: currentPanX, y: currentPanY, force3D: true });
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

            if (filterCallout) {
                gsap.killTweensOf(filterCallout);

                if (filter === "all") {
                    gsap.to(filterCallout, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => { filterCallout.textContent = ""; }
                    });
                } else {
                    filterCallout.textContent = "Call a Friend";
                    gsap.fromTo(filterCallout,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.7, delay: 0.3, ease: "power2.out" }
                    );
                }
            }
        });
    });

});
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
    // CALLOUT + SUBMENU
    // ==========================================
    const filterCallout = document.getElementById("filter-callout");
    const submenu = document.getElementById("directors-submenu");

    // ==========================================
    // DADOS DOS VÍDEOS
    // ==========================================
    const videoData = [
        { id: "1226708222", brand: "McDonald's", title: "Reviews", director: "andre-chitas", order: 0, Thumb: "images/andre-chitas/imagem-01.webp" },
        { id: "1228562721", brand: "BIS", title: "Rh", director: "andre-chitas", order: 1, Thumb: "images/andre-chitas/imagem-02.webp" },
        { id: "951206599",  brand: "KitKat", title: "The Town", director: "andre-chitas", order: 2, Thumb: "images/andre-chitas/imagem-03.webp" },
        { id: "1228563134", brand: "BIS", title: "Interceptação", director: "andre-chitas", order: 3, Thumb: "images/andre-chitas/imagem-11.webp" },
        { id: "1229244984", brand: "Guaraná", title: "Mãozinha", director: "andre-chitas", order: 4, Thumb: "images/andre-chitas/imagem-13.webp" },
        { id: "951206509",  brand: "Cobasi", title: "Pets", director: "andre-chitas", order: 5, Thumb: "images/andre-chitas/imagem-04.webp" },
        { id: "953718810",  brand: "Toyota", title: "Design", director: "andre-chitas", order: 6, Thumb: "images/andre-chitas/imagem-05.webp" },
        { id: "955961149",  brand: "Toyota", title: "Music", director: "andre-chitas", order: 7, Thumb: "images/andre-chitas/imagem-06.webp" },
        { id: "951206549",  brand: "Havaianas", title: "Pegada", director: "andre-chitas", order: 8, Thumb: "images/andre-chitas/imagem-12.webp" },
        { id: "951206647",  brand: "Ampara Animal", title: "Life Print", director: "andre-chitas", order: 9, Thumb: "images/andre-chitas/imagem-09.webp" },
        { id: "1229250084", brand: "Disney", title: "Disney+", director: "andre-chitas", order: 10, Thumb: "images/andre-chitas/imagem-14.webp" },
        { id: "1064109149", brand: "GRANADA", title: "From the Heart", director: "andre-chitas", order: 11, Thumb: "images/andre-chitas/imagem-08.webp" },
        { id: "951206473",  brand: "CCXP", title: "Worlds", director: "andre-chitas", order: 12, Thumb: "images/andre-chitas/imagem-10.webp" },
        { id: "1075350120", brand: "GRANADA", title: "My Girl", director: "andre-chitas", order: 13, Thumb: "images/andre-chitas/imagem-07.webp" },

        { id: "1220816532", brand: "Profjam", title: "Dakar", director: "goncalo-xz", order: 0, Thumb: "images/goncalo-xz/imagem-13.webp" },
        { id: "1220821289", brand: "Profjam", title: "Dakar", director: "goncalo-xz", order: 1, Thumb: "images/goncalo-xz/imagem-14.webp" },
        { id: "1231972605", brand: "Realm", title: "Opo", director: "goncalo-xz", order: 2, Thumb: "images/goncalo-xz/imagem-a.webp" },
        { id: "1220828316", brand: "Conan Osíris", title: "Moleirinha", director: "goncalo-xz", order: 3, Thumb: "images/goncalo-xz/imagem-17.webp" },
        { id: "1231970301", brand: "SlowJ feat. GSon & Mizzy Miles", title: "Champions-League", director: "goncalo-xz", order: 4, Thumb: "images/goncalo-xz/imagem-b.webp" },
        { id: "1229158772", brand: "Mizzy Miles feat. T Rex & Zara G", title: "Fim do Nada", director: "goncalo-xz", order: 5, Thumb: "images/goncalo-xz/imagem-15.webp" },
        { id: "1220835706", brand: "SlowJ", title: "Where u @", director: "goncalo-xz", order: 6, Thumb: "images/goncalo-xz/imagem-18.webp" },
        { id: "1220831743", brand: "Project x", title: "Ghuettop", director: "goncalo-xz", order: 7, Thumb: "images/goncalo-xz/imagem-16.webp" },
        { id: "1231970990", brand: "Raissa", title: "Pensas em Mim", director: "goncalo-xz", order: 8, Thumb: "images/goncalo-xz/imagem-c.webp" },

        { id: "1228567548", brand: "Mar", title: "Sem Carta", director: "ines-monteiro", order: 0, Thumb: "images/ines-monteiro/imagem-24.webp" },
        { id: "1229123992", brand: "Mar", title: "Old Money", director: "ines-monteiro", order: 1, Thumb: "images/ines-monteiro/imagem-20.webp" },
        { id: "1229125856", brand: "Kasha feat. Mar", title: "Livro Aberto", director: "ines-monteiro", order: 2, Thumb: "images/ines-monteiro/imagem-22.webp" },
        { id: "1229127014", brand: "Mar", title: "Graduada", director: "ines-monteiro", order: 3, Thumb: "images/ines-monteiro/imagem-21.webp" },
        { id: "1229127593", brand: "Mar", title: "Old Money", director: "ines-monteiro", order: 4, Thumb: "images/ines-monteiro/imagem-23.webp" },
        { id: "1229129641", brand: "Mar", title: "Atira-te a Mim", director: "ines-monteiro", order: 5, Thumb: "images/ines-monteiro/imagem-19.webp" }
    ];

    // Shuffle só para o "all"
    for (let i = videoData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [videoData[i], videoData[j]] = [videoData[j], videoData[i]];
    }

    const gallery = document.getElementById("gallery");

    // ==========================================
    // ÁREA VIRTUAL — 2 fileiras
    // ==========================================
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const VIRTUAL_H = vh * 1.5;
    const ROWS = 2;
    const ROW_HEIGHT = VIRTUAL_H / ROWS;
    const BASE_FILL = 0.95;
    const GAP_X = 90;
    const RATIO = 16 / 9;

    // ---- TIERS com mais contraste, mas sem extremos ----
    // pequeno: 0.42 | médio: 0.58 | grande: 0.75
    const TIERS = [0.42, 0.58, 0.75];
    const TIER_PATTERN = [2, 0, 1, 0, 2, 1, 0, 2, 1, 0];

    const rowCursors = new Array(ROWS).fill(vw * 0.35);
    let maxX = 0;

    function seededRandom(seed) {
        const x = Math.sin(seed * 12.9898) * 43758.5453;
        return x - Math.floor(x);
    }

    const items = [];

    // ==========================================
    // CRIAÇÃO DOS ITENS
    // ==========================================
    videoData.forEach((data, i) => {
        const row = i % ROWS;
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.dataset.director = data.director;
        item.dataset.order = data.order;

        const tierIndex = TIER_PATTERN[i % TIER_PATTERN.length];
        const tier = TIERS[tierIndex];

        let imgH = ROW_HEIGHT * BASE_FILL * tier;
        let imgW = imgH * RATIO;

        const jitterYMax = Math.max(0, ROW_HEIGHT - imgH);
        const seedY = i * 2.71 + 1.3;
        const jitterY = (seededRandom(seedY) - 0.5) * jitterYMax * 0.6;

        const baseX = rowCursors[row];
        const baseY = row * ROW_HEIGHT + (ROW_HEIGHT - imgH) / 2 + jitterY;

        item.style.left = baseX + "px";
        item.style.top = baseY + "px";
        item.style.width = imgW + "px";
        item.style.height = imgH + "px";

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

        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");

        const iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${data.id}?background=1&autoplay=1&loop=1&muted=1&api=1&controls=0&autopause=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");

        iframe.addEventListener("load", () => {
            setTimeout(() => {
                iframe.contentWindow.postMessage(
                    JSON.stringify({ method: "play" }),
                    "*"
                );
            }, 500);
        });

        wrapper.appendChild(iframe);
        item.appendChild(wrapper);

        const titleEl = document.createElement("div");
        titleEl.classList.add("video-title");
        titleEl.innerHTML = `
            <span class="title-brand">${data.brand}</span>
            <span class="title-sep">—</span>
            <span class="title-work">${data.title}</span>
        `;
        item.appendChild(titleEl);

        item.addEventListener("mouseenter", () => {
            gsap.to(wrapper, { opacity: 1, duration: 0.4, ease: "power2.out" });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(wrapper, { opacity: 0, duration: 0.3, ease: "power2.in" });
        });

        gallery.appendChild(item);

        requestAnimationFrame(() => {
            if (titleEl.offsetWidth > item.offsetWidth - 24) {
                titleEl.classList.add("is-stacked");
            }
        });

        rowCursors[row] += imgW + GAP_X;
        maxX = Math.max(maxX, baseX + imgW);

        items.push({
            element: item,
            baseX, baseY,
            originalLeft: baseX,
            originalTop: baseY,
            originalW: imgW,
            originalH: imgH
        });
    });

    const VIRTUAL_W = maxX + vw * 0.35;

    gallery.style.width = VIRTUAL_W + "px";
    gallery.style.height = VIRTUAL_H + "px";

    // ==========================================
    // RELAYOUT
    // ==========================================
    let relayout = null;

    // ==========================================
    // MODO MOBILE
    // ==========================================
    if (isMobile) {

        const MOBILE_COLS = 2;
        const MOBILE_GAP_X = 20;
        const MOBILE_GAP_Y = 60;
        const MOBILE_PADDING_TOP = 200;

        const availableW = vw - 40;
        const MOBILE_IMG_W = (availableW - MOBILE_GAP_X) / MOBILE_COLS;
        const MOBILE_IMG_H = MOBILE_IMG_W / RATIO;

        const totalRows = Math.ceil(items.length / MOBILE_COLS);
        const totalContentHeight = MOBILE_PADDING_TOP + totalRows * (MOBILE_IMG_H + MOBILE_GAP_Y) + 200;

        items.forEach((item, i) => {
            const col = i % MOBILE_COLS;
            const row = Math.floor(i / MOBILE_COLS);

            const x = 20 + col * (MOBILE_IMG_W + MOBILE_GAP_X);
            const y = MOBILE_PADDING_TOP + row * (MOBILE_IMG_H + MOBILE_GAP_Y);

            item.element.style.left = x + "px";
            item.element.style.top = y + "px";
            item.element.style.width = MOBILE_IMG_W + "px";
            item.element.style.height = MOBILE_IMG_H + "px";

            item.baseX = x;
            item.baseY = y;

            gsap.set(item.element, { x: 0, y: 0, clearProps: "transform" });
        });

        gallery.style.width = vw + "px";
        gallery.style.height = totalContentHeight + "px";
        gallery.style.position = "relative";

        const galleryContainer = document.querySelector(".gallery-container");
        galleryContainer.style.position = "relative";
        galleryContainer.style.width = "100vw";
        galleryContainer.style.height = totalContentHeight + "px";
        galleryContainer.style.overflow = "visible";

        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
        document.body.style.height = "auto";

        const refilterMobile = () => {
            const visibleItems = items
                .filter(it => !it.element.classList.contains("hidden"))
                .sort((a, b) =>
                    Number(a.element.dataset.order) - Number(b.element.dataset.order)
                );

            const visibleRows = Math.max(1, Math.ceil(visibleItems.length / MOBILE_COLS));
            const contentH = MOBILE_PADDING_TOP + visibleRows * (MOBILE_IMG_H + MOBILE_GAP_Y) + 200;

            gallery.style.height = contentH + "px";
            galleryContainer.style.height = contentH + "px";

            visibleItems.forEach((item, i) => {
                const col = i % MOBILE_COLS;
                const row = Math.floor(i / MOBILE_COLS);

                const x = 20 + col * (MOBILE_IMG_W + MOBILE_GAP_X);
                const y = MOBILE_PADDING_TOP + row * (MOBILE_IMG_H + MOBILE_GAP_Y);

                gsap.to(item.element, {
                    left: x,
                    top: y,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        };

        relayout = refilterMobile;
    }

    // ==========================================
    // MODO DESKTOP
    // ==========================================
    else {

        const MIN_PAN_X = -(VIRTUAL_W - vw);
        const MAX_PAN_X = 0;
        const MIN_PAN_Y = -(VIRTUAL_H - vh);
        const MAX_PAN_Y = 0;

        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }

        let targetPanX = 0, targetPanY = 0;
        let currentPanX = 0, currentPanY = 0;

        const WHEEL_SENSITIVITY = 1.0;
        const TOUCH_SENSITIVITY = 1.5;

        const AUTO_SCROLL_SPEED = 0.6;
        let lastTime = performance.now();

        window.addEventListener("wheel", (e) => {
            if (e.target.closest(".nav-overlay")) return;
            if (e.target.closest(".directors-submenu")) return;
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

        window.addEventListener("touchstart", (e) => {
            if (e.target.closest(".logo-container, .nav-overlay, .site-footer, .directors-submenu")) return;
            if (e.target.closest(".video-wrapper")) return;

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

            targetPanX = clamp(touchStartPanX + dx * TOUCH_SENSITIVITY, MIN_PAN_X, MAX_PAN_X);
            targetPanY = clamp(touchStartPanY + dy * TOUCH_SENSITIVITY, MIN_PAN_Y, MAX_PAN_Y);
        }, { passive: false });

        window.addEventListener("touchend", () => {
            isTouching = false;
        });

        function loop() {
            const now = performance.now();
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            const submenuVisible = submenu &&
                submenu.style.display !== "none" &&
                parseFloat(getComputedStyle(submenu).opacity) > 0.01;

            if (submenuVisible) {
                targetPanX -= AUTO_SCROLL_SPEED * dt * 60;

                if (targetPanX < MIN_PAN_X) {
                    currentPanX = MAX_PAN_X;
                    targetPanX = MAX_PAN_X;
                }
            }

            const smooth = 0.08;
            currentPanX += (targetPanX - currentPanX) * smooth;
            currentPanY += (targetPanY - currentPanY) * smooth;

            items.forEach((item) => {
                gsap.set(item.element, { x: currentPanX, y: currentPanY, force3D: true });
            });

            requestAnimationFrame(loop);
        }
        loop();

        // ======================================
        // DISTRIBUIÇÃO ORGÂNICA DOS ITENS FILTRADOS
        // Não usa grelha rígida: distribui em 2 fileiras
        // com espaçamento variável (jitter determinístico)
        // ======================================
        function centerFilteredItemsDesktop() {
            const visible = items
                .filter(it => !it.element.classList.contains("hidden"))
                .sort((a, b) =>
                    Number(a.element.dataset.order) - Number(b.element.dataset.order)
                );

            if (visible.length === items.length) {
                items.forEach(it => {
                    gsap.to(it.element, {
                        left: it.originalLeft,
                        top: it.originalTop,
                        duration: 0.8,
                        ease: "power3.inOut"
                    });
                });
                return;
            }

            const n = visible.length;

            // distribuir por 2 fileiras (o mais equilibrado possível)
            const itemsPerRow = Math.ceil(n / ROWS);
            const rows = [];
            for (let r = 0; r < ROWS; r++) {
                const start = r * itemsPerRow;
                const end = Math.min(start + itemsPerRow, n);
                if (start < n) rows.push(visible.slice(start, end));
            }

            // largura total de cada fileira, com gaps variáveis entre itens
            const rowData = rows.map(row => {
                const gaps = [];
                let totalW = 0;

                row.forEach((it, i) => {
                    totalW += it.originalW;

                    if (i < row.length - 1) {
                        // gap base com jitter determinístico
                        const baseGap = 70;
                        const jitter =
                            (seededRandom(i * 1.91 + 2.3) - 0.5) * 60;
                        const gap = Math.max(30, baseGap + jitter);

                        gaps.push(gap);
                        totalW += gap;
                    }
                });

                return { row, gaps, totalW };
            });

            const maxRowW = Math.max(...rowData.map(r => r.totalW));
            const blockH = rows.length * ROW_HEIGHT;

            // centrar o bloco no canvas virtual
            const startX = (VIRTUAL_W - maxRowW) / 2;
            const startY = (VIRTUAL_H - blockH) / 2;

            rowData.forEach((data, r) => {
                const { row, gaps, totalW } = data;

                // centrar cada fileira dentro do bloco
                const rowStartX = startX + (maxRowW - totalW) / 2;
                const rowY = startY + r * ROW_HEIGHT;

                let cursorX = rowStartX;

                row.forEach((it, i) => {
                    // jitter vertical próprio de cada item
                    const maxJitterY = Math.max(0, ROW_HEIGHT - it.originalH);
                    const jitterY =
                        (seededRandom(it.originalW * 0.13 + i * 2.71 + 3.1) - 0.5)
                        * maxJitterY * 0.6;

                    const itemY = rowY + (ROW_HEIGHT - it.originalH) / 2 + jitterY;

                    gsap.to(it.element, {
                        left: cursorX,
                        top: itemY,
                        duration: 0.8,
                        ease: "power3.inOut"
                    });

                    cursorX += it.originalW;
                    if (i < row.length - 1) cursorX += gaps[i];
                });
            });

            targetPanX = clamp(vw / 2 - VIRTUAL_W / 2, MIN_PAN_X, MAX_PAN_X);
            targetPanY = clamp(vh / 2 - VIRTUAL_H / 2, MIN_PAN_Y, MAX_PAN_Y);
        }

        relayout = centerFilteredItemsDesktop;
    }

    // ==========================================
    // APLICAR FILTRO
    // ==========================================
    function applyFilter(filter) {
        items.forEach((item) => {
            const director = item.element.dataset.director;
            if (filter === "all" || director === filter) {
                item.element.classList.remove("hidden");
            } else {
                item.element.classList.add("hidden");
            }
        });

        if (typeof relayout === "function") relayout();

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
                filterCallout.textContent = "Call a Friend.";
                gsap.fromTo(filterCallout,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.7, delay: 0.3, ease: "power2.out" }
                );
            }
        }
    }

    // ==========================================
    // SUBMENU — cliques nos nomes
    // ==========================================
    const directorLinks = document.querySelectorAll(".director-link");

    directorLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const director = link.dataset.director;

            if (submenu) {
                gsap.to(submenu, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        submenu.style.display = "none";
                    }
                });
            }

            applyFilter(director);

            const url = new URL(window.location);
            url.searchParams.set("director", director);
            window.history.pushState({}, "", url);
        });
    });

    // ==========================================
    // ESTADO INICIAL — se vier com ?director= aplica logo
    // ==========================================
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("director");

    if (initial) {
        if (submenu) submenu.style.display = "none";
        applyFilter(initial);
    }

});
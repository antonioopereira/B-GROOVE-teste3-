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
    // DADOS DOS VÍDEOS
    // ==========================================
    const videoData = [
        // ========== ANDRÉ CHITAS ==========
        { id: "1226708222", brand: "McDonald's", title: "Reviews", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-01.webp" },
        { id: "1228562721", brand: "BIS", title: "Projeto 02", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-02.webp" },
        { id: "951206599",  brand: "Marca C", title: "Projeto 03", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-03.webp"},
        { id: "1228563134", brand: "Marca D", title: "Projeto 04", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-11.webp" },
        { id: "1229244984", brand: "Marca E", title: "Projeto 05", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-13.webp" },
        { id: "951206509",  brand: "Marca F", title: "Projeto 06", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-04.webp" },
        { id: "953718810",  brand: "Marca G", title: "Projeto 07", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-05.webp" },
        { id: "955961149",  brand: "Marca H", title: "Projeto 08", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-06.webp" },
        { id: "951206647",  brand: "Marca I", title: "Projeto 09", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-09.webp" },
        { id: "1064109149", brand: "Marca J", title: "Projeto 10", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-08.webp" },
        { id: "951206473",  brand: "Marca K", title: "Projeto 11", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-10.webp" },
        { id: "1075350120", brand: "Marca L", title: "Projeto 12", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-07.webp" },

        // ========== GONÇALO XZ ==========
        { id: "1220816532", brand: "Marca M", title: "Projeto 13", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-13.webp" },
        { id: "1220821289", brand: "Marca N", title: "Projeto 14", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-14.webp" },
        { id: "1220828316", brand: "Marca O", title: "Projeto 15", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-17.webp" },
        { id: "1229158772", brand: "Marca P", title: "Projeto 16", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-15.webp" },
        { id: "1220835706", brand: "Marca Q", title: "Projeto 17", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-18.webp" },
        { id: "1220831743", brand: "Marca R", title: "Projeto 18", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-16.webp" },

        // ========== INÊS MONTEIRO ==========
        { id: "1228567548", brand: "Marca S", title: "Projeto 19", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-24.webp" },
        { id: "1229123992", brand: "Marca T", title: "Projeto 20", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-20.webp"  },
        { id: "1229125856", brand: "Marca U", title: "Projeto 21", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-22.webp"  },
        { id: "1229127014", brand: "Marca V", title: "Projeto 22", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-21.webp"  },
        { id: "1229127593", brand: "Marca W", title: "Projeto 23", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-23.webp"  },
        { id: "1229129641", brand: "Marca X", title: "Projeto 24", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-19.webp"  }
    ];

    const gallery = document.getElementById("gallery");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // ==========================================
    // ÁREA VIRTUAL
    // ==========================================
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const VIRTUAL_W = vw * 3.0;
    const VIRTUAL_H = isMobile ? vh * 6.0 : vh * 3.0;

    gallery.style.width = VIRTUAL_W + "px";
    gallery.style.height = VIRTUAL_H + "px";

    // ==========================================
    // GRELHA
    // ==========================================
    const COLS = isMobile ? 2 : 5;
    const ROWS = isMobile ? 12 : 5;
    const CELL_W = VIRTUAL_W / COLS;
    const CELL_H = VIRTUAL_H / ROWS;

    const FILL_RATIO = 0.70;
    const RATIO = 16 / 9;

    const cells = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            cells.push({ r, c });
        }
    }
    cells.sort(() => Math.random() - 0.5);

    const items = [];

    // ==========================================
    // CRIAÇÃO DOS ITENS
    // ==========================================
    videoData.forEach((data, i) => {
        const cell = cells[i % cells.length];
        const item = document.createElement("div");
        item.classList.add("gallery-item");
        item.dataset.director = data.director;

        let imgW = CELL_W * FILL_RATIO;
        let imgH = imgW / RATIO;

        const maxH = CELL_H * FILL_RATIO;
        if (imgH > maxH) {
            imgH = maxH;
            imgW = imgH * RATIO;
        }

        const cellX = cell.c * CELL_W;
        const cellY = cell.r * CELL_H;
        const slackX = CELL_W - imgW;
        const slackY = CELL_H - imgH;
        const jitterX = (Math.random() - 0.5) * slackX * 0.6;
        const jitterY = (Math.random() - 0.5) * slackY * 0.6;

        const baseX = cellX + slackX / 2 + jitterX;
        const baseY = cellY + slackY / 2 + jitterY;

        item.style.left = baseX + "px";
        item.style.top = baseY + "px";
        item.style.width = imgW + "px";
        item.style.height = imgH + "px";

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

        // Iframe do Vimeo (pré-carregado, invisível)
        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");

        const iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${data.id}?background=1&autoplay=0&loop=1&muted=1&api=1&title=0&byline=0&portrait=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("loading", "eager");

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
        items.push({ element: item, baseX, baseY });
    });

    console.log(`🎬 ${items.length} vídeos em grid ${COLS}×${ROWS}`);

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
    // LOOP DE ANIMAÇÃO — SEM WRAP
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
                const director = item.element.dataset.director;
                if (filter === "all" || director === filter) {
                    item.element.classList.remove("hidden");
                } else {
                    item.element.classList.add("hidden");
                }
            });
        });
    });

});
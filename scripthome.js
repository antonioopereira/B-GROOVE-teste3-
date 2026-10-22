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

    // MAPEAMENTO DOS DIRETORES
    const directorNames = {
        "andre-chitas": "André Chitas",
        "goncalo-xz": "Gonçalo Xz",
        "ines-monteiro": "Inês Monteiro"
    };

    // DADOS DOS VÍDEOS
    const videoData = [
        { id: "1226708222", brand: "McDonald's", title: "Reviews", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-01.webp" },
        { id: "1228562721", brand: "BIS", title: "Rh", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-02.webp" },
        { id: "951206599",  brand: "KitKat", title: "The Town", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-03.webp" },
        { id: "1228563134", brand: "BIS", title: "Interceptação", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-11.webp" },
        { id: "1229244984", brand: "Guaraná", title: "Mãozinha", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-13.webp" },
        { id: "951206509",  brand: "Cobasi", title: "Pets", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-04.webp" },
        { id: "953718810",  brand: "Toyota", title: "Design", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-05.webp" },
        { id: "955961149",  brand: "Toyota", title: "Music", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-06.webp" },
        { id: "951206549",  brand: "Havaianas", title: "Pegada", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-12.webp" },
        { id: "951206647",  brand: "Ampara Animal", title: "Life Print", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-09.webp" },
        { id: "1229250084", brand: "Disney", title: "Disney+", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-14.webp" },
        { id: "1064109149", brand: "GRANADA", title: "From the Heart", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-08.webp" },
        { id: "951206473",  brand: "CCXP", title: "Worlds", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-10.webp" },
        { id: "1075350120", brand: "GRANADA", title: "My Girl", director: "andre-chitas", Thumb: "images/andre-chitas/imagem-07.webp" },
        { id: "1220816532", brand: "Profjam", title: "Dakar", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-13.webp" },
        { id: "1220821289", brand: "Profjam", title: "Dakar", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-14.webp" },
        { id: "1231972605", brand: "Realm", title: "Opo", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-a.webp" },
        { id: "1220828316", brand: "Conan Osíris", title: "Moleirinha", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-17.webp" },
        { id: "1231970301", brand: "SlowJ feat. GSon & Mizzy Miles", title: "Champions-League", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-b.webp" },
        { id: "1229158772", brand: "Mizzy Miles feat. T Rex & Zara G", title: "Fim do Nada", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-15.webp" },
        { id: "1220835706", brand: "SlowJ", title: "Where u @", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-18.webp" },
        { id: "1220831743", brand: "Project x", title: "Ghuettop", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-16.webp" },
        { id: "1231970990", brand: "Raissa", title: "Pensas em Mim", director: "goncalo-xz", Thumb: "images/goncalo-xz/imagem-c.webp" },
        { id: "1228567548", brand: "Mar", title: "Sem Carta", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-24.webp" },
        { id: "1229123992", brand: "Mar", title: "Old Money", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-20.webp" },
        { id: "1229125856", brand: "Kasha feat. Mar", title: "Livro Aberto", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-22.webp" },
        { id: "1229127014", brand: "Mar", title: "Graduada", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-21.webp" },
        { id: "1229127593", brand: "Mar", title: "Old Money", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-23.webp" },
        { id: "1229129641", brand: "Mar", title: "Atira-te a Mim", director: "ines-monteiro", Thumb: "images/ines-monteiro/imagem-19.webp" }
    ];

    // Shuffle
    for (let i = videoData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [videoData[i], videoData[j]] = [videoData[j], videoData[i]];
    }

    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");

    const items = [];
    const fragment = document.createDocumentFragment();
    
    // Controlo do vídeo ativo (Apenas um de cada vez)
    let activeItem = null;

    videoData.forEach((data) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");

        // Miniatura
        const thumbnailUrl = data.Thumb || `https://vumbnail.com/${data.id}.jpg`;
        const img = document.createElement("img");
        img.src = thumbnailUrl;
        img.alt = data.brand;
        img.classList.add("poster-preview");
        img.loading = "lazy";
        item.appendChild(img);

        // Wrapper Vimeo (Lazy Load)
        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");
        item.appendChild(wrapper); 

        // Título - FORMATO: Dir em cima, Marca - Projeto em baixo
        const titleEl = document.createElement("div");
        titleEl.classList.add("video-title");
        const dirName = directorNames[data.director] || data.director;
        
        const projectName = data.title ? `${data.brand} - ${data.title}` : data.brand;
        
        titleEl.innerHTML = `
            <div class="dir-info">Dir.<br>${dirName}</div>
            <div class="brand-info">${projectName}</div>
        `;
        item.appendChild(titleEl);

        // HOVER: Garante que apenas um carrega
        item.addEventListener("mouseenter", () => {
            if (activeItem && activeItem !== item) {
                const prevWrapper = activeItem.querySelector('.video-wrapper');
                if (prevWrapper) prevWrapper.innerHTML = "";
            }
            
            activeItem = item;

            if (wrapper.children.length === 0) {
                const iframe = document.createElement("iframe");
                iframe.src = `https://player.vimeo.com/video/${data.id}?background=1&autoplay=1&loop=1&muted=1&api=1&controls=0&autopause=0`;
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
                wrapper.appendChild(iframe);
            }
        });

        // MOUSE LEAVE
        item.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!item.matches(':hover')) {
                    wrapper.innerHTML = "";
                    if (activeItem === item) activeItem = null;
                }
            }, 300); 
        });

        fragment.appendChild(item);
        items.push(item);
    });

    track.appendChild(fragment);

    // ==========================================
    // LÓGICA DO CARROSSEL INFINITO
    // ==========================================
    let currentScroll = 0;
    let targetScroll = 0;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    
    // DISTÂNCIA ENTRE CENTROS (0.20 = Muita sobreposição, cabem 5 cards)
    let step = window.innerWidth * 0.20; 

    function snapToNearest() {
        targetScroll = Math.round(targetScroll / step) * step;
    }

    // Scroll do rato
    track.addEventListener("wheel", (e) => {
        e.preventDefault();
        targetScroll += e.deltaY * 1.5;
        
        clearTimeout(window._wheelTimeout);
        window._wheelTimeout = setTimeout(snapToNearest, 100);
    }, { passive: false });

    // Touch (mobile)
    track.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        scrollStart = targetScroll;
        clearTimeout(window._wheelTimeout);
    }, { passive: true });

    track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        targetScroll = scrollStart - dx * 2;
    }, { passive: true });

    track.addEventListener("touchend", () => {
        isDragging = false;
        snapToNearest();
    });

    // Botões
    prevBtn.addEventListener("click", () => {
        snapToNearest();
        targetScroll -= step;
    });
    
    nextBtn.addEventListener("click", () => {
        snapToNearest();
        targetScroll += step;
    });

    // Resize
    window.addEventListener('resize', () => {
        step = window.innerWidth * 0.20;
    });

    // Loop de animação
    function render() {
        currentScroll += (targetScroll - currentScroll) * 0.08;
        
        const n = items.length;
        const T = n * step;

        if (Math.abs(currentScroll) > T * 10) {
            const shift = Math.floor(currentScroll / T) * T;
            currentScroll -= shift;
            targetScroll -= shift;
        }

        items.forEach((item, i) => {
            let x = (i * step) - currentScroll;
            
            // Loop infinito
            x = ((x + T / 2) % T + T) % T - T / 2;

            const absX = Math.abs(x);
            const norm = absX / step; 
            
            // Mostra EXATAMENTE 5 cards: Central (0), 2 à esquerda (-2, -1) e 2 à direita (1, 2)
            // Qualquer coisa acima de 2.1 é escondida.
            if (norm > 2.1) {
                item.style.display = 'none'; 
            } else {
                item.style.display = 'block';
                
                // Escala (1 no centro, 0.75 e 0.50 nos lados)
                const scale = Math.max(0.5, 1 - (norm * 0.25));
                
                // Z-index garante que o do centro fica por cima dos outros
                const zIndex = Math.round(100 - norm * 10);

                // OPACIDADE 100% PARA TODOS
                item.style.opacity = 1; 
                
                item.style.transform = `translate(-50%, -50%) translateX(${x}px) scale(${scale})`;
                item.style.zIndex = zIndex;
            }
        });
        
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
});
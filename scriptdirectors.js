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

    // ELEMENTOS
    const submenu = document.getElementById("directors-submenu");
    const sliderContainer = document.getElementById("slider-container");
    const slidesWrapper = document.getElementById("slides-wrapper");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const directorLinks = document.querySelectorAll(".director-link");

    let currentDirectorVideos = [];
    let currentSlideIndex = 0;
    let activeIframe = null;

    // ==========================================
    // INICIAR SLIDER COM FILTRO DE DIRETOR
    // ==========================================
    function startSliderForDirector(directorId) {
        currentDirectorVideos = videoData.filter(v => v.director === directorId);
        currentSlideIndex = 0;

        if (currentDirectorVideos.length === 0) return;

        slidesWrapper.innerHTML = "";
        
        currentDirectorVideos.forEach((video, index) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (index === 0) slide.classList.add("active");

            const img = document.createElement("img");
            img.src = video.Thumb || `https://vumbnail.com/${video.id}.jpg`;
            img.classList.add("slide-media");
            slide.appendChild(img);

            const iframeWrapper = document.createElement("div");
            iframeWrapper.classList.add("iframe-wrapper");
            iframeWrapper.style.position = "absolute";
            iframeWrapper.style.inset = "0";
            iframeWrapper.style.zIndex = "2";
            iframeWrapper.style.pointerEvents = "none";
            slide.appendChild(iframeWrapper);

            const info = document.createElement("div");
            info.classList.add("slide-info");
            
            const dirName = directorNames[directorId] || directorId;
            const projectName = video.title ? `${video.brand} - ${video.title}` : video.brand;
            
            info.innerHTML = `
                <div class="dir-name">Dir.<br>${dirName}</div>
                <div class="brand-name">${projectName}</div>
            `;
            slide.appendChild(info);

            slidesWrapper.appendChild(slide);
        });

        function loadActiveVideo() {
            const slides = document.querySelectorAll(".slide");
            
            if (activeIframe) {
                activeIframe.remove();
                activeIframe = null;
            }

            const activeSlide = slides[currentSlideIndex];
            const iframeWrapper = activeSlide.querySelector(".iframe-wrapper");
            const videoId = currentDirectorVideos[currentSlideIndex].id;

            const iframe = document.createElement("iframe");
            iframe.src = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&api=1&controls=0`;
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
            
            iframeWrapper.appendChild(iframe);
            activeIframe = iframe;
        }

        if (currentDirectorVideos.length > 1) {
            prevBtn.classList.remove("hidden");
            nextBtn.classList.remove("hidden");
        } else {
            prevBtn.classList.add("hidden");
            nextBtn.classList.add("hidden");
        }

        gsap.to(submenu, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                submenu.style.display = "none";
                sliderContainer.classList.add("active");
                loadActiveVideo();
            }
        });
    }

    // ==========================================
    // NAVEGAÇÃO DO SLIDER
    // ==========================================
    function goToSlide(index) {
        const slides = document.querySelectorAll(".slide");
        if (index < 0) index = currentDirectorVideos.length - 1;
        if (index >= currentDirectorVideos.length) index = 0;

        slides[currentSlideIndex].classList.remove("active");
        slides[index].classList.add("active");

        currentSlideIndex = index;

        if (activeIframe) {
            activeIframe.remove();
            activeIframe = null;
        }

        const activeSlide = slides[currentSlideIndex];
        const iframeWrapper = activeSlide.querySelector(".iframe-wrapper");
        const videoId = currentDirectorVideos[currentSlideIndex].id;

        const iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&api=1&controls=0`;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
        
        iframeWrapper.appendChild(iframe);
        activeIframe = iframe;
    }

    prevBtn.addEventListener("click", () => goToSlide(currentSlideIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlideIndex + 1));

    window.addEventListener("keydown", (e) => {
        if (!sliderContainer.classList.contains("active")) return;
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });

    // ==========================================
    // CLICKS NOS NOMES DOS DIRETORES
    // ==========================================
    directorLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const directorId = link.dataset.director;
            startSliderForDirector(directorId);
        });
    });

});
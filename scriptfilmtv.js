document.addEventListener("DOMContentLoaded", () => {

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
            closeModal();
        }
    });

    // ==========================================
    // CONFIGURAÇÕES DO TÚNEL
    // ==========================================
    const config = {
        gap: 400,
        speed: 1.0,
        lerp: 0.08,
        zFactor: 0.75,
        rotFactor: 22,
        hoverPull: 120
    };

    // ==========================================
    // DADOS DOS FILMES
    // 👇 Substitui os "src" pelos teus posters reais
    // ==========================================
    const moviesData = [
        {
            src: "images/posters/impuros.webp",
            title: "Impuros",
            meta: "Série de ficção · Policial · 10 episódios × 45 min · 5 temporadas",
            synopsis: "Após ingressar no exército, Evandro do Dendê, um jovem da periferia carioca, perde o irmão mais novo, morto numa negociação do tráfico. A vingança despertará o lado selvagem de Evandro que, associado ao pensamento estratégico e à sua frieza, o alçarão à liderança de uma das maiores organizações criminosas do mundo. O sucesso das conquistas de Evandro chama a atenção do experiente policial federal Morello, um homem que parece procurar a própria destruição, mas não sabe onde encontrá-la. De um lado, um criminoso marcado por inúmeras perdas, traições e a rejeição de sua mãe, cuja conquista do amor é o motivo oculto de toda sua ambição; do outro, um caçador que encontrou o leão à sua altura e pode, enfim, lhe proporcionar a morte honrada que busca há tanto tempo. Uma história de dois homens violentos, estrategistas, frios, respeitados por seus 'exércitos', e que compartilham o amor pela guerra.",
            info: [
                { label: "Direção", value: "René Sampaio, Tatiana Fragoso & Tomás Portella" },
                { label: "Exibição", value: "Disney+" }
            ]
        },
        {
            src: "images/posters/o-filho-de-mil-homens.webp",
            title: "O Filho de Mil Homens",
            meta: "Longa-metragem de ficção · Drama · 126 min",
            synopsis: "Crisóstomo, um pescador solitário no auge de seus 40 anos que carrega dentro de si a culpa por não ter conseguido ser pai. Na procura de um filho sem pai, já que ele mesmo é um pai sem filho, Crisóstomo esbarra com Camilo, um garoto órfão de apenas 12 anos de idade. Logo, eles iniciam juntos uma jornada arriscada, mas recompensadora, de formar uma família nada convencional. No povoado onde vivem, um jovem incompreendido chamado Antonino e uma mulher fugindo da própria dor chamada Isaura cruzam o caminho de Crisóstomo e Camilo. Juntos, os quatro aprendem o verdadeiro significado de família e o propósito de compartilhar a vida.",
            info: [
                { label: "Elenco", value: "Rodrigo Santoro" },
                { label: "Baseado em", value: "Obra homônima de Hugo Filho Mãe" },
                { label: "Roteiro", value: "Daniel Rezende" },
                { label: "Direção", value: "Daniel Rezende" }
            ]
        },
        {
            src: "images/posters/amor-da-minha-vida.webp",
            title: "Amor da Minha Vida",
            meta: "Série de ficção · Comédia romântica · 10 episódios × 30 min · 1 temporada",
            synopsis: "'Amor da Minha Vida' é uma série sobre os relacionamentos amorosos de Bia (24) e Victor (24) com as pessoas que eles pensaram que seriam o 'amor de suas vidas'. Ao longo desses amores, a única relação inabalável é a amizade entre os dois, que se apoiam enquanto tentam encontrar um rumo para suas vidas amorosas e profissionais. Entre tantos altos e baixos, descobrem que ali existe algo além da amizade. Será que vão encontrar o amor da vida um no outro? Mas, para isso, primeiro precisam amadurecer.",
            info: [
                { label: "Elenco", value: "Bruna Marquezine e Sérgio Malheiros" },
                { label: "Ideia, argumento e roteiro", value: "Matheus Souza" },
                { label: "Direção", value: "René Sampaio, Tatiana Fragoso, Matheus Souza & Bruna Marquezine" },
                { label: "Exibição", value: "Disney+" }
            ]
        },
        {
            src: "images/posters/eduardo-e-monica.webp",
            title: "Eduardo e Mônica",
            meta: "Longa-metragem de ficção · Comédia romântica · 100 min",
            synopsis: "Adaptação para o cinema da famosa canção 'Eduardo e Mônica', composta por Renato Russo, sobre um casal que não tinha nada a ver um com o outro mas acabou se apaixonando perdidamente. Com direção de René Sampaio e protagonizado por Alice Braga e Gabriel Leone, o projeto é uma produção Gávea Filmes em coprodução com a Barry Company.",
            info: [
                { label: "Elenco", value: "Alice Braga e Gabriel Leone" },
                { label: "Direção", value: "René Sampaio" },
                { label: "Distribuição", value: "Downtown" }
            ]
        },
        {
            src: "images/posters/uma-familia-feliz.webp",
            title: "Uma Família Feliz",
            meta: "Longa-metragem de ficção · Thriller psicológico · 110 min",
            synopsis: "Eva acabou de dar à luz ao seu terceiro filho e se depara com a angústia de uma depressão pós-parto em meio a uma vida burguesa supostamente perfeita. O ar tranquilo de sua família feliz é invadido por acontecimentos estranhos quando suas filhas gêmeas aparecem machucadas. Eva é acusada e retaliada pela comunidade. Isolada e questionada por seu próprio marido, ela precisa superar sua fragilidade para provar sua inocência e reestruturar sua família.",
            info: [
                { label: "Elenco", value: "Grazi Massafera e Reynaldo Gianecchini" },
                { label: "Argumento e roteiro", value: "Raphael Montes" },
                { label: "Direção", value: "José Eduardo Belmonte" }
            ]
        },
        {
            src: "images/posters/faroeste-caboclo.webp",
            title: "Faroeste Caboclo",
            meta: "Longa-metragem de ficção · Drama · 108 min",
            synopsis: "Baseado na canção de Renato Russo, 'Faroeste Caboclo' conta a história de João de Santo Cristo, que se muda para Brasília e acaba envolvido com o tráfico de drogas. Ao ficar mais e mais imerso na vida do crime, ele se apaixona e encontra com seu maior inimigo.",
            info: [
                { label: "Direção", value: "René Sampaio" }
            ],
            notes: [
                "Mais de 1 milhão de espectadores nos cinemas somente no Brasil",
                "Vencedor de 07 Prêmios no Grande Prêmio do Cinema Brasileiro, incluindo Melhor Filme",
                "Selecionado para festivais como: Toronto, Zurique, Estocolmo, Miami, Huelva, Dallas, Shanghai",
                "Estreia comercial nos cinemas dos EUA em 2014"
            ]
        }
    ];

    // ==========================================
    // CONSTRUÇÃO DOS POSTERS
    // ==========================================
    const scene = document.getElementById("poster-scene");
    const posters = [];
    const totalPosters = moviesData.length;
    const totalWidth = totalPosters * config.gap;
    const halfWidth = totalWidth / 2;

    moviesData.forEach((data, i) => {
        const card = document.createElement("div");
        card.classList.add("poster-card");

        const img = document.createElement("img");
        img.src = data.src;
        img.alt = data.title;
        img.onerror = () => console.error("❌ Falhou poster:", data.src);
        card.appendChild(img);

        const info = document.createElement("div");
        info.classList.add("poster-info");

        const title = document.createElement("div");
        title.classList.add("poster-title");
        title.textContent = data.title;

        const meta = document.createElement("div");
        meta.classList.add("poster-meta");
        meta.textContent = data.meta;

        info.appendChild(title);
        info.appendChild(meta);
        card.appendChild(info);
        scene.appendChild(card);

        const baseX = (i - (totalPosters - 1) / 2) * config.gap;

        gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: baseX,
            y: 0,
            z: 0,
            rotationY: 0,
            opacity: 1,
            force3D: true
        });

        const poster = {
            element: card,
            baseX: baseX,
            hoverOffset: 0,
            data: data
        };

        card.addEventListener("mouseenter", () => {
            gsap.to(poster, {
                hoverOffset: config.hoverPull,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(poster, {
                hoverOffset: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        // 👇 Clique → abre o modal com os dados deste filme
        card.addEventListener("click", () => {
            openModal(data);
        });

        posters.push(poster);
    });

    // ==========================================
    // MODAL
    // ==========================================
    const modal = document.getElementById("movie-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");
    const modalBackdrop = modal.querySelector("[data-close-modal]");

    function openModal(data) {
        // Construir HTML do modal
        let html = `<h2 class="modal-title">${data.title}</h2>`;
        html += `<div class="modal-meta">${data.meta}</div>`;
        html += `<p class="modal-synopsis">${data.synopsis}</p>`;

        if (data.info && data.info.length) {
            html += `<div class="modal-info">`;
            data.info.forEach(row => {
                html += `
                    <div class="modal-info-row">
                        <span class="modal-info-label">${row.label}</span>
                        <span class="modal-info-value">${row.value}</span>
                    </div>
                `;
            });
            html += `</div>`;
        }

        if (data.notes && data.notes.length) {
            html += `<div class="modal-notes">`;
            data.notes.forEach(note => {
                html += `<div class="modal-notes-item">${note}</div>`;
            });
            html += `</div>`;
        }

        modalBody.innerHTML = html;

        // Abrir modal
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        // Reset scroll do modal
        modal.querySelector(".modal-content").scrollTop = 0;
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);

    // ==========================================
    // SCROLL
    // ==========================================
    let targetScroll = 0;
    let currentScroll = 0;

    window.addEventListener("wheel", (e) => {
        // Não faz scroll do túnel se o modal estiver aberto
        if (modal.classList.contains("is-open")) return;
        if (e.target.closest(".nav-overlay")) return;

        e.preventDefault();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        targetScroll -= delta * config.speed;
    }, { passive: false });

    let touchStartX = 0;
    let touchStartScroll = 0;

    window.addEventListener("touchstart", (e) => {
        if (modal.classList.contains("is-open")) return;
        if (e.target.closest(".logo-container, .nav-overlay, .site-footer")) return;
        touchStartX = e.touches[0].clientX;
        touchStartScroll = targetScroll;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (modal.classList.contains("is-open")) return;
        const dx = e.touches[0].clientX - touchStartX;
        targetScroll = touchStartScroll + dx * 1.5;
    }, { passive: true });

    // ==========================================
    // LOOP DE ANIMAÇÃO — WRAP INFINITO
    // ==========================================
    function loop() {
        currentScroll += (targetScroll - currentScroll) * config.lerp;

        posters.forEach((p) => {
            let x = p.baseX + currentScroll;

            x = ((x + halfWidth) % totalWidth + totalWidth) % totalWidth - halfWidth;

            const distance = Math.abs(x);
            const z = -distance * config.zFactor + p.hoverOffset;
            const rotY = -(x / halfWidth) * config.rotFactor;
            const opacity = Math.max(0, 1 - Math.pow(distance / halfWidth, 2));

            gsap.set(p.element, {
                xPercent: -50,
                yPercent: -50,
                x: x,
                z: z,
                rotationY: rotY,
                opacity: opacity,
                force3D: true,
                visibility: opacity <= 0.01 ? "hidden" : "visible"
            });
        });

        requestAnimationFrame(loop);
    }
    loop();

});
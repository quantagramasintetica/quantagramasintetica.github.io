document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isActive);
        });

        // Fechar o menu ao clicar em qualquer link (âncora)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 2. EFEITO DE SHRINK NO HEADER AO ROLAR
    // ==========================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // ==========================================
    // 3. ABAS INTERATIVAS (TABS) - TIPOS DE GRAMA
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTabId = button.getAttribute('data-tab');

                // Remover classe active de todas as abas
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.style.display = 'none';
                });

                // Adicionar classe active na aba clicada
                button.classList.add('active');
                const activePane = document.getElementById(targetTabId);
                if (activePane) {
                    activePane.style.display = 'block';
                    // Pequeno delay para transição de opacidade fluida
                    setTimeout(() => {
                        activePane.classList.add('active');
                    }, 50);
                }
            });
        });

        // Inicializar o estado das abas inativas como display none
        tabPanes.forEach(pane => {
            if (!pane.classList.contains('active')) {
                pane.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 4. GALERIA DE FOTOS (EXIBIÇÃO COM BOTÃO VER MAIS)
    // ==========================================
    const galleryItems = document.querySelectorAll('.portfolio-item');
    const btnVerMais = document.getElementById('btn-ver-mais');
    const maxInitialItems = 6;

    if (galleryItems.length > 0) {
        // Inicializar galeria ocultando itens excedentes
        if (galleryItems.length > maxInitialItems) {
            for (let i = maxInitialItems; i < galleryItems.length; i++) {
                galleryItems[i].classList.add('hidden');
                galleryItems[i].style.opacity = '0';
                galleryItems[i].style.transform = 'scale(0.95)';
            }
        } else if (btnVerMais) {
            // Se o total de imagens for menor ou igual ao limite inicial, oculta o botão
            btnVerMais.style.display = 'none';
        }

        if (btnVerMais) {
            btnVerMais.addEventListener('click', () => {
                const isExpanded = btnVerMais.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    // Recolher itens (Ver menos)
                    for (let i = maxInitialItems; i < galleryItems.length; i++) {
                        const item = galleryItems[i];
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                    btnVerMais.textContent = 'Ver mais';
                    btnVerMais.setAttribute('aria-expanded', 'false');

                    // Rolar suavemente de volta para o início da galeria
                    const targetElement = document.querySelector('#projetos');
                    if (targetElement) {
                        const headerOffset = 90;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Expandir itens (Ver mais)
                    for (let i = maxInitialItems; i < galleryItems.length; i++) {
                        const item = galleryItems[i];
                        
                        // Carregar imagens dinamicamente ao expandir
                        const sources = item.querySelectorAll('source[data-srcset]');
                        sources.forEach(source => {
                            source.setAttribute('srcset', source.getAttribute('data-srcset'));
                            source.removeAttribute('data-srcset');
                        });
                        const imgs = item.querySelectorAll('img[data-src]');
                        imgs.forEach(img => {
                            img.setAttribute('src', img.getAttribute('data-src'));
                            img.removeAttribute('data-src');
                        });
                        
                        item.classList.remove('hidden');
                        // Pequeno delay para a transição do CSS rodar perfeitamente
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    }
                    btnVerMais.textContent = 'Ver menos';
                    btnVerMais.setAttribute('aria-expanded', 'true');
                }
            });
        }
    }

    // ==========================================
    // 5. ACCORDION DO FAQ (PERGUNTAS FREQUENTES)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-header-btn');
        const body = item.querySelector('.faq-body');

        if (button && body) {
            button.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                 // Fechar outros itens abertos
                 faqItems.forEach(otherItem => {
                     if (otherItem !== item && otherItem.classList.contains('active')) {
                         otherItem.classList.remove('active');
                         const otherBody = otherItem.querySelector('.faq-body');
                         otherBody.style.maxHeight = '0';
                         otherBody.setAttribute('aria-hidden', 'true');
                         otherItem.querySelector('.faq-header-btn').setAttribute('aria-expanded', 'false');
                     }
                 });

                 // Alternar estado do item clicado
                 if (isOpen) {
                     item.classList.remove('active');
                     body.style.maxHeight = '0';
                     body.setAttribute('aria-hidden', 'true');
                     button.setAttribute('aria-expanded', 'false');
                 } else {
                     item.classList.add('active');
                     body.style.maxHeight = body.scrollHeight + 'px';
                     body.setAttribute('aria-hidden', 'false');
                     button.setAttribute('aria-expanded', 'true');
                 }
            });
        }
    });

    // ==========================================
    // 6. ANIMAÇÃO AO ROLAR (REVEAL ON SCROLL)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animará apenas uma vez
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback para navegadores antigos
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // ==========================================
    // 7. ROLAGEM SUAVE COM OFFSET AJUSTADO PARA O HEADER
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90; // Ajustado de acordo com a altura shrink do header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Register Service Worker for offline support and network independent performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered successfully:', reg.scope))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

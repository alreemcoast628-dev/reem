document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. الثيمات
    // =============================================
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcons(next);
    }

    function updateThemeIcons(theme) {
        document.querySelectorAll('#theme-toggle-desktop i, #theme-toggle-mobile i').forEach(icon => {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // =============================================
    // 2. اللغة
    // =============================================
    const savedLang = localStorage.getItem('lang') || 'ar';
    setLanguage(savedLang);

    document.querySelectorAll('#lang-toggle-desktop, #lang-toggle-mobile').forEach(btn => {
        btn.addEventListener('click', toggleLanguage);
    });

    function toggleLanguage() {
        const current = document.documentElement.getAttribute('lang');
        const next = current === 'ar' ? 'en' : 'ar';
        setLanguage(next);
    }

    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', lang);
        updateTexts(lang);
    }

    function updateTexts(lang) {
        const heroTitle = document.querySelector('.hero-content h1 span');
        if (heroTitle) {
            heroTitle.textContent = lang === 'ar' ? 'أحلامك' : 'Your Dreams';
        }

        const heroDesc = document.querySelector('.hero-desc');
        if (heroDesc) {
            heroDesc.textContent = lang === 'ar'
                ? 'نقدم حلولاً متكاملة في تصميم وتنفيذ المسابح، والأعمال الكهربائية والميكانيكية، ومعالجة المياه، وتنسيق الحدائق'
                : 'We provide integrated solutions in swimming pool design, electrical and mechanical works, water treatment, and landscaping';
        }

        // تحديث النصوص الأخرى حسب الحاجة
    }

    // =============================================
    // 3. العدادات
    // =============================================
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        document.querySelectorAll('.stat-num').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 2000 / 60);
        });
    }

    // =============================================
    // 4. تأثيرات التمرير
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-card, .project-card, .why-card, .mission-box, .about-text, .about-image, .contact-card, .hero-stats, .partners-slider').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-on-scroll:nth-child(2) { transition-delay: 0.08s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.16s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.24s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.32s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 0.40s; }
    `;
    document.head.appendChild(style);

    // =============================================
    // 5. المودال
    // =============================================
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementById('closeModalBtn');

    window.openOrderModal = () => {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeOrderModal = () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeOrderModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeOrderModal();
        });
    }

    const sendBtn = document.getElementById('sendWaBtn');
    const orderInput = document.getElementById('customerOrder');
    if (sendBtn && orderInput) {
        sendBtn.addEventListener('click', () => {
            const phone = '971545296084';
            const msg = orderInput.value.trim();
            if (!msg) {
                alert('الرجاء كتابة تفاصيل طلبك.');
                return;
            }
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
            closeOrderModal();
        });
    }

    // =============================================
    // 6. الهيدر يتغير عند التمرير
    // =============================================
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 80);
        });
    }

    // =============================================
    // 7. التنقل النشط
    // =============================================
    document.querySelectorAll('.nav-menu a, .m-nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.closest('.nav-menu') || this.closest('.mobile-bottom-nav');
            if (parent) {
                parent.querySelectorAll('.active').forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    console.log('✅ Alreem Coast - تم تحميل الموقع بنجاح!');
});

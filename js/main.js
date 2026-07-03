document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // 1. Theme Toggle
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme);
    }

    function updateThemeIcons(theme) {
        const iconClass = theme === 'light' ? 'fa-sun' : 'fa-moon';
        const iconElements = document.querySelectorAll('.theme-toggle-btn i, .mobile-theme-btn i');
        iconElements.forEach(icon => {
            icon.className = `fas ${iconClass}`;
        });
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    // =============================================
    // 2. Mobile Menu
    // =============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    function openMenu() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // =============================================
    // 3. WhatsApp Modal - الرقم الصحيح
    // =============================================
    const whatsappModal = document.getElementById('whatsappModal');
    const whatsappModalClose = document.getElementById('whatsappModalClose');
    const whatsappHeaderBtn = document.getElementById('whatsappHeaderBtn');
    const whatsappMobileBtn = document.getElementById('whatsappMobileBtn');
    const whatsappContactBtn = document.getElementById('whatsappContactBtn');
    const whatsappForm = document.getElementById('whatsappForm');

    // الرقم الصحيح (بدون 00)
    const WHATSAPP_PHONE = '971545296084';

    function openWhatsappModal(e) {
        e.preventDefault();
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeWhatsappModal() {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (whatsappHeaderBtn) whatsappHeaderBtn.addEventListener('click', openWhatsappModal);
    if (whatsappMobileBtn) whatsappMobileBtn.addEventListener('click', openWhatsappModal);
    if (whatsappContactBtn) whatsappContactBtn.addEventListener('click', openWhatsappModal);
    if (whatsappModalClose) whatsappModalClose.addEventListener('click', closeWhatsappModal);
    if (whatsappModal) {
        whatsappModal.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                closeWhatsappModal();
            }
        });
    }

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('whatsappName')?.value.trim();
            const email = document.getElementById('whatsappEmail')?.value.trim();
            const message = document.getElementById('whatsappMessage')?.value.trim();

            if (!name || !message) {
                alert('Please fill in your name and message.');
                return;
            }

            let whatsappMessage = `Name: ${name}%0A`;
            if (email) whatsappMessage += `Email: ${email}%0A`;
            whatsappMessage += `%0AMessage:%0A${message}`;

            // الرابط الصحيح
            const url = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;
            window.open(url, '_blank');
            closeWhatsappModal();
            whatsappForm.reset();
        });
    }

    // =============================================
    // 4. Contact Form - الرقم الصحيح
    // =============================================
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendWhatsAppBtn');

    if (contactForm && sendBtn) {
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const name = document.getElementById('userName')?.value.trim();
            const email = document.getElementById('userEmail')?.value.trim();
            const phone = document.getElementById('userPhone')?.value.trim();
            const message = document.getElementById('userMessage')?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            let whatsappMessage = `Name: ${name}%0AEmail: ${email}%0A`;
            if (phone) whatsappMessage += `Phone: ${phone}%0A`;
            whatsappMessage += `%0AMessage:%0A${message}`;

            // الرابط الصحيح
            const url = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;
            window.open(url, '_blank');
            contactForm.reset();
        });
    }

    // =============================================
    // 5. Active Nav Link
    // =============================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    console.log('🚀 Alreem Coast website loaded successfully!');
    console.log('📱 WhatsApp number:', WHATSAPP_PHONE);
});

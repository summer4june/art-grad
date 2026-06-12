document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Hero Stagger Animation
    const heroElements = document.querySelectorAll('.stagger-in');
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('show'));
    }, 100);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle (Removed)

    // 4. Word-by-Word Scroll Reveal for Manifesto Question
    const manifestoQuestion = document.getElementById('manifesto-question');
    const text = manifestoQuestion.textContent.trim();
    manifestoQuestion.textContent = ''; // clear original text

    // Split text by spaces and preserve them as words
    const words = text.split(/\s+/);
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        // 65ms stagger
        span.style.transitionDelay = `${index * 65}ms`;
        manifestoQuestion.appendChild(span);
        
        // Add a space after each word so it wraps correctly
        manifestoQuestion.appendChild(document.createTextNode(' '));
    });

    const wordElements = document.querySelectorAll('.word');
    const climateLine = document.querySelector('.climate-line');

    // 5. Intersection Observer for Manifesto
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
    };

    const manifestoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal words
                wordElements.forEach(word => word.classList.add('visible'));
                // Reveal climate line after a delay (CSS handles the main transition, but we trigger the class)
                climateLine.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const manifestoSection = document.querySelector('.manifesto-section');
    if (manifestoSection) {
        manifestoObserver.observe(manifestoSection);
    }

    // 6. Intersection Observer for Scroll Reveals
    const scrollRevealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, scrollRevealOptions);

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach((el, index) => {
        // Add staggered delay to cards
        el.style.transitionDelay = `${index * 150}ms`;
        scrollRevealObserver.observe(el);
    });

    // 7. Theme Toggler
    const themes = [
        { class: 'theme-ember-horizon', name: 'Ember Horizon' },
        { class: 'theme-burning-desert', name: 'Burning Desert' },
        { class: 'theme-red-eclipse', name: 'Red Eclipse' },
        { class: 'theme-crimson-atmosphere', name: 'Crimson Atmosphere' },
        { class: 'theme-solar-dust', name: 'Solar Dust' },
        { class: 'theme-luxury-red', name: 'Luxury Red' },
        { class: 'theme-molten-core', name: 'Molten Core' },
        { class: 'theme-velvet-crimson', name: 'Velvet Crimson' },
        { class: 'theme-molten-fabric', name: 'Molten Fabric' },
        { class: 'theme-red-horizon', name: 'Red Horizon' },
        { class: 'theme-atmospheric-heat', name: 'Atmospheric Heat' },
        { class: 'theme-artisun-red', name: 'Artisun Red' }
    ];
    let currentThemeIndex = 0;
    const globalBg = document.getElementById('global-bg');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn && globalBg) {
        themeToggleBtn.addEventListener('click', () => {
            globalBg.classList.remove(themes[currentThemeIndex].class);
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            globalBg.classList.add(themes[currentThemeIndex].class);
            themeToggleBtn.innerText = `Mood: ${themes[currentThemeIndex].name}`;
        });
    }

    // 8. Background Parallax (Slow scroll up to 50%)
    window.addEventListener('scroll', () => {
        if (!globalBg) return;
        const scrollY = window.scrollY;
        // Calculate max possible scroll
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        // Scroll percentage from 0 to 1
        const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        // Shift up to 50vh maximum
        const shiftAmount = scrollPercent * 50;
        globalBg.style.transform = `translateY(-${shiftAmount}vh)`;
    });
});

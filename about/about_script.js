/*
  JavaScript file for Dexterity About Page
*/

// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Feather Icons Initialization ---
    // Replaces all elements with a `data-feather` attribute with SVG icons.
    feather.replace();

    // --- Dynamic Year in Footer ---
    // Automatically updates the year in the footer.
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Scroll-triggered Animations ---
    // Uses the Intersection Observer API to make elements fade in as you scroll.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    fadeUpElements.forEach(el => observer.observe(el));


    // ===================================================================
    // Header Menu Logic (Consistent with homepage)
    // ===================================================================
    
    const menuBtn = document.getElementById('menu-btn');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const body = document.body;

    if (menuBtn && fullscreenMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            fullscreenMenu.classList.toggle('open');
            body.classList.toggle('nav-open');
        });
    }

});

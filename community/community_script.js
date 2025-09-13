/*
  JavaScript file for Dexterity Community Page
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Feather Icons Initialization ---
    feather.replace();

    // --- Dynamic Year in Footer ---
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --- Header Menu Logic ---
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

    // --- Scroll-triggered Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));


    // --- Spotlight Carousel (Swiper.js) ---
    const swiper = new Swiper('.spotlight-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    // --- Video Autoplay in Carousel ---
    const videoSlide = document.querySelector('.swiper-slide video');
    if (videoSlide) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When the video comes into view, try to play it
                if (entry.isIntersecting) {
                    const playPromise = videoSlide.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Autoplay was prevented.
                            console.log("Video autoplay was blocked by the browser.");
                        });
                    }
                } else {
                    videoSlide.pause();
                }
            });
        }, { threshold: 0.75 }); // Trigger when 75% of the video is visible

        videoObserver.observe(videoSlide);
    }


    // --- Background Music and Mute Button Logic ---
    const music = document.getElementById('background-music');
    const muteBtn = document.getElementById('mute-btn');
    let isPlaying = false; // To track music state

    if (music && muteBtn) {
        // Function to attempt to play music
        const playMusic = () => {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started!
                    isPlaying = true;
                    // We need to remove the interaction listener once music starts
                    document.removeEventListener('click', playMusic);
                    document.removeEventListener('keydown', playMusic);
                }).catch(error => {
                    // Autoplay was prevented. We'll wait for user interaction.
                    console.log("Background music autoplay was blocked. Waiting for user interaction.");
                });
            }
        };

        // Try to play music on load
        playMusic();
        
        // If autoplay fails, add event listeners to play on first click/keypress
        document.addEventListener('click', playMusic, { once: true });
        document.addEventListener('keydown', playMusic, { once: true });


        // Mute button functionality
        muteBtn.addEventListener('click', () => {
            music.muted = !music.muted;
            // Update the icon based on the muted state
            const icon = music.muted ? 'volume-x' : 'volume-2';
            muteBtn.innerHTML = `<i data-feather="${icon}"></i>`;
            feather.replace(); // Re-render the new icon
        });
    }

});

/*
  Main JavaScript file for Dexterity Homepage
  This file handles all dynamic and interactive elements on the page.
*/

// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Feather Icons Initialization ---
    // This function finds all elements with a `data-feather` attribute and replaces
    // them with the corresponding SVG icon.
    feather.replace();

    // --- Dynamic Year in Footer ---
    // Sets the current year in the footer's copyright notice automatically.
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Community Carousel Logic ---
    // This section controls the interactive "Community in Action" carousel.

    // Get the container element for the carousel.
    const carouselContainer = document.querySelector('.carousel-container');
    // Variable to hold the timer for the automatic scroll.
    let intervalId;

    // An array of member objects. This holds the data for each card.
    // It's easy to add, remove, or change members here.
    const members = [
        { name: 'Phire D', role: 'Musician', img: 'images/PhireD.jpg', fact: 'Im a Genuis, and not just musically', borderColor: 'border-blue-400' },
        { name: 'XENOSWZ', role: 'Visual Designer', img: 'images/XENOSWZ.jpg', fact: 'I design with weird design softwares', borderColor: 'border-green-400' },
        { name: 'Daniel', role: 'Developer', img: 'images/danielsamuel.jpg', fact: 'i love anime and tech, Im a tech-taku', borderColor: 'border-yellow-400' },
        { name: 'Bukola', role: 'Writer', img: 'images/bukola.jpg', fact: 'I love learning new things (im NOT a nerd)', borderColor: 'border-red-400' }
    ];

    // Function to create the HTML for the cards and add them to the DOM.
    function createCarousel() {
        if (!carouselContainer) return; // Exit if the container isn't on the page.
        carouselContainer.innerHTML = ''; // Clear any existing cards first.
        members.forEach((member) => {
            const card = document.createElement('div');
            card.className = `squaircle-card absolute border-4 shadow-xl ${member.borderColor}`;
            card.innerHTML = `
                <img src="${member.img}" alt="Photo of ${member.name}">
                <div class="overlay">
                    <h4 class="font-fredoka text-xl font-bold">${member.name}</h4>
                    <p class="text-sm">${member.role}</p>
                </div>
                <div class="fun-fact">
                    <p>${member.fact}</p>
                </div>
            `;
            carouselContainer.appendChild(card);
        });
        positionCards(); // Position the newly created cards.
    }

    // Function to calculate and apply the position, size, and rotation of each card.
    function positionCards() {
        const cards = carouselContainer.querySelectorAll('.squaircle-card');
        const numCards = cards.length;
        // Adjust the radius and card size based on the screen width for responsiveness.
        const radius = carouselContainer.offsetWidth < 600 ? carouselContainer.offsetWidth * 0.4 : carouselContainer.offsetWidth * 0.3;
        const cardSize = carouselContainer.offsetHeight * 0.5;
        
        cards.forEach((card, i) => {
            const angle = (i / numCards) * 2 * Math.PI; // Distribute cards evenly in a circle.
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle) * 0.4; // Make the orbit elliptical.
            const scale = y > 0 ? 0.9 : 1.1; // Cards in the back are smaller.
            const zIndex = y > 0 ? 1 : 5;     // Cards in the front are on top.
            const rotation = (Math.random() - 0.5) * 20; // Apply a random tilt.

            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;
            card.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
            card.style.zIndex = zIndex;
        });
    }
    
    // Function that animates the carousel by moving the first member to the end of the array.
    function animateCarousel() {
        const firstMember = members.shift(); // Remove the first member.
        members.push(firstMember);          // Add them to the end.
        createCarousel();                   // Re-create the cards with the new order.
    }

    // Function to start the automatic scrolling interval.
    function startCarousel() {
        if (!carouselContainer) return;
        stopCarousel(); // Clear any existing interval to prevent duplicates.
        intervalId = setInterval(animateCarousel, 2500); // 2.5 seconds per rotation.
    }

    // Function to stop the automatic scrolling (used on hover).
    function stopCarousel() {
        clearInterval(intervalId);
    }
    
    // Initial setup for the carousel when the page loads.
    if (carouselContainer) {
        createCarousel();
        startCarousel();

        // Pause the carousel when the mouse is over it.
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        // Resume the carousel when the mouse leaves.
        carouselContainer.addEventListener('mouseleave', startCarousel);
        // Reposition cards if the window is resized.
        window.addEventListener('resize', createCarousel);
    }


    // --- Scroll-triggered Animations ---
    // This uses the Intersection Observer API to detect when an element enters the viewport.
    
    // Create a new observer.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible on screen).
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation.
                entry.target.classList.add('is-visible');
                // Stop observing this element since the animation has been triggered.
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible.

    // Get all elements that have the 'fade-in-up' class.
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    // Tell the observer to watch each of these elements.
    fadeUpElements.forEach(el => observer.observe(el));


    // ===================================================================
    // START: New Header Menu Logic
    // ===================================================================
    
    // Get the necessary elements from the DOM
    const menuBtn = document.getElementById('menu-btn');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const body = document.body;

    // Check if the menu button exists to avoid errors
    if (menuBtn && fullscreenMenu) {
        // Add a click event listener to the menu button
        menuBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the button to trigger the 'X' animation
            menuBtn.classList.toggle('active');
            // Toggle the 'open' class on the menu to make it appear/disappear
            fullscreenMenu.classList.toggle('open');
            // Toggle the 'nav-open' class on the body to prevent scrolling
            body.classList.toggle('nav-open');
        });
    }

});

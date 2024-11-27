

let subMenu = document.getElementById("subMenu")

function toggleMenu(){
        subMenu.classList.toggle("open-menu");
}


// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const ad = document.querySelectorAll(".smileysFlyer");

    function checkCards() {
        const triggerBottom = window.innerHeight * 0.8;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if(cardTop < triggerBottom) {
                card.classList.add("visible");
            } else {
                card.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkCards);
    checkCards(); // Initial check in case any cards are already in view

    
});


document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.image_container');

    const handleScroll = () => {
        const rect = imageContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the image container is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            imageContainer.classList.add('fly-up');
        }
    };

    window.addEventListener('scroll', handleScroll);
});

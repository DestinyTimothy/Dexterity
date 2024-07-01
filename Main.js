let subMenu = document.getElementById("subMenu")

function toggleMenu(){
        subMenu.classList.toggle("open-menu");
}

// ------------------------------------------------------------------------------------------------------


var loader = document.getElementById("preloader");

window.addEventListener("load", function(){
        setTimeout(function(){
            loader.style.display = "none"
        }, 1500)
})

// ------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

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
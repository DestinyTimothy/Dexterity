let subMenu = document.getElementById("subMenu")
            
function toggleMenu(){
        subMenu.classList.toggle("open-menu");
}


function animateCounter(element, start, end, duration) {
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.innerText = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  const counterElement = document.getElementById('counter');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(counterElement, 0, 210, 2000); // 2000ms = 2 seconds
          observer.unobserve(entry.target); // Stop observing after counting
        }
      });
    },
    { threshold: 0.5 } // Adjust based on when you want the animation to trigger
  );

  observer.observe(counterElement);

  document.addEventListener('DOMContentLoaded', () => {
    const imageContainer1 = document.querySelector('.image_container');

    const handleScroll = () => {
        const rect = imageContainer1.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the image container is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            imageContainer1.classList.add('fly-up');
        }
    };

    window.addEventListener('scroll', handleScroll);
});



document.addEventListener('DOMContentLoaded', () => {
    const imageContainer2 = document.querySelector('.call_image');

    const handleScroll = () => {
        const rect = imageContainer2.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the image container is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            imageContainer2.classList.add('fly-up');
        }
    };

    window.addEventListener('scroll', handleScroll);
});



document.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".review");
    const triggerPoint = window.innerHeight * 0.75; // Trigger animation when 75% of the viewport is reached
    
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerPoint) {
        card.classList.add("show");
      }
    });
  });
  
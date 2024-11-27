let subMenu = document.getElementById("subMenu")
    
function toggleMenu(){
        subMenu.classList.toggle("open-menu");
}

// Select the section and the button
const section = document.getElementById('darkModeSection');
const toggleButton = document.getElementById('toggleBtn');

// Check localStorage for a saved preference
const currentTheme = localStorage.getItem('section-theme');
if (currentTheme === 'dark') {
    section.classList.remove('light-mode');
    section.classList.add('dark-mode');
}

// Add click event to the button
toggleButton.addEventListener('click', () => {
    section.classList.toggle('light-mode');
    section.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (section.classList.contains('dark-mode')) {
        localStorage.setItem('section-theme', 'dark');
    } else {
        localStorage.setItem('section-theme', 'light');
    }
});
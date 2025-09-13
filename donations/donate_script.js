/*
  JavaScript file for Dexterity Donate Page
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

    // ===================================================================
    // START: Donation Form Logic
    // ===================================================================
    
    const currencySwitch = document.getElementById('currency-switch');
    const amountButtons = document.querySelectorAll('.donation-amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const currencySymbol = document.getElementById('currency-symbol');
    const donateNowBtn = document.getElementById('donate-now-btn');

    let currentCurrency = 'USD'; // Default currency

    // --- Function to update the UI based on the selected currency ---
    function updateCurrencyDisplay() {
        const isNaira = currencySwitch.checked;
        currentCurrency = isNaira ? 'NGN' : 'USD';
        
        // Update currency symbol
        currencySymbol.textContent = isNaira ? '₦' : '$';
        
        // Update amount buttons
        amountButtons.forEach(button => {
            const amountUsd = button.dataset.amountUsd;
            const amountNgn = button.dataset.amountNgn;
            if (isNaira) {
                button.textContent = `₦${parseInt(amountNgn).toLocaleString()}`;
                button.dataset.amount = amountNgn;
            } else {
                button.textContent = `$${amountUsd}`;
                button.dataset.amount = amountUsd;
            }
        });

        // Clear input and selection
        customAmountInput.value = '';
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        updateDonateLink();
    }

    // --- Function to update the 'Donate Now' mailto link ---
    function updateDonateLink() {
        const selectedBtn = document.querySelector('.donation-amount-btn.selected');
        let amount = customAmountInput.value;
        let finalAmountString = '';

        if (selectedBtn && !amount) {
             amount = selectedBtn.dataset.amount;
        }

        if (amount) {
            finalAmountString = `${currencySymbol.textContent}${parseInt(amount).toLocaleString()}`;
        }
        
        const subject = "I Want to Donate to Dexterity";
        const body = `Hi Dexterity Team,\n\nI'd like to donate ${finalAmountString}. Please let me know the next steps!\n\nBest,`;
        donateNowBtn.href = `mailto:dexterity.email.1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }


    // --- Event Listeners ---
    currencySwitch.addEventListener('change', updateCurrencyDisplay);

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            customAmountInput.value = button.dataset.amount; // Sync input field
            updateDonateLink();
        });
    });

    customAmountInput.addEventListener('input', () => {
        const currentValue = customAmountInput.value;
        let buttonSelected = false;

        amountButtons.forEach(button => {
            if (button.dataset.amount === currentValue) {
                button.classList.add('selected');
                buttonSelected = true;
            } else {
                button.classList.remove('selected');
            }
        });
         if (!buttonSelected) {
             amountButtons.forEach(btn => btn.classList.remove('selected'));
        }
        updateDonateLink();
    });

    // --- Initial Setup ---
    updateCurrencyDisplay(); // Set initial currency on page load

});


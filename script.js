// Get elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');
const heartsContainer = document.getElementById('hearts-container');
const body = document.body;

// Track NO button clicks
let noClickCount = 0;

// YES button click handler
yesBtn.addEventListener('click', () => {
    // Show popup with success message
    popupMessage.textContent = "Yayyy! Thank youuu ❤️ I promise I won’t repeat it.";
    popup.style.display = 'flex';
    
    // Change background to soft pink/light blue
    body.style.background = 'linear-gradient(135deg, #ffb6c1, #add8e6)'; // Soft pink to light blue
    
    // Add floating hearts animation
    createHearts();
});

// NO button click handler
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    // Increase YES button size
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize + 5) + 'px'; // Grow YES button
    yesBtn.style.padding = 'calc(15px + ' + (noClickCount * 5) + 'px) calc(30px + ' + (noClickCount * 10) + 'px)'; // Increase padding
    
    // Decrease NO button size and move it randomly
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = Math.max(noSize - 2, 10) + 'px'; // Shrink NO button, minimum 10px
    noBtn.style.padding = 'calc(15px - ' + (noClickCount * 2) + 'px) calc(30px - ' + (noClickCount * 5) + 'px)'; // Shrink padding
    
    // Move NO button to random position
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width - noBtn.offsetWidth);
    const randomY = Math.random() * (containerRect.height - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // After 5 clicks, show final message
    if (noClickCount >= 5) {
        popupMessage.textContent = "Itna bhi gussa theek nahi hai 😭";
        popup.style.display = 'flex';
        // Disable buttons
        yesBtn.disabled = true;
        noBtn.disabled = true;
    }
});

// Close popup handler
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Function to create floating hearts
function createHearts() {
    for (let i = 0; i < 10; i++) { // Create 10 hearts
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        heart.style.animationDelay = Math.random() * 2 + 's'; // Stagger animation
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}
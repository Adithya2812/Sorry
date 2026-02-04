// Get DOM elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const messageDiv = document.getElementById('message');
const buttonContainer = document.getElementById('button-container');
const body = document.body;

// Counter for NO button clicks
let noClickCount = 0;

// Function to show a message
function showMessage(text) {
    messageDiv.textContent = text;
    messageDiv.classList.add('show');
}

// Function to create floating hearts
function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        heart.style.animationDelay = Math.random() * 2 + 's'; // Stagger animations
        document.body.appendChild(heart);
        // Remove heart after animation
        setTimeout(() => heart.remove(), 3000);
    }
}

// Function to move NO button to random position
function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// YES button event listener
yesBtn.addEventListener('click', () => {
    // Change background to soft pink gradient
    body.style.background = 'linear-gradient(135deg, #ffb3ba, #ffdfba)';
    
    // Show success message
    showMessage('Yayyy ❤️ Thank youuu. I promise I’ll do better.');
    
    // Add floating hearts
    createHearts();
    
    // Hide buttons after 2 seconds
    setTimeout(() => {
        buttonContainer.style.display = 'none';
    }, 2000);
});

// NO button event listener
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    // Gradually increase YES size and decrease NO size (up to reasonable limits)
    const yesScale = Math.min(1 + (noClickCount * 0.1), 2); // Max 2x
    const noScale = Math.max(1 - (noClickCount * 0.1), 0.1); // Min 0.1x
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;
    
    // Add bounce to YES
    yesBtn.classList.add('bounce');
    setTimeout(() => yesBtn.classList.remove('bounce'), 500);
    
    // Move NO to random position
    moveNoButton();
    
    // Show messages at specific click counts
    if (noClickCount === 5) {
        showMessage('Itna bhi gussa theek nahi hai 🥺');
    } else if (noClickCount === 10) {
        showMessage('Bas karo naaa 😭');
    } else if (noClickCount === 12) {
        // NO very tiny, YES very large
        noBtn.style.transform = 'scale(0.05)';
        yesBtn.style.transform = 'scale(2)';
    } else if (noClickCount >= 15) {
        // NO disappears, YES centered and glowing
        noBtn.style.display = 'none';
        yesBtn.style.position = 'static'; // Reset to center
        yesBtn.classList.add('glow');
        showMessage('Hehe 😌 I knew you’d forgive me.');
    }
});
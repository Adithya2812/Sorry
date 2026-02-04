// Wrap everything in DOMContentLoaded for safe execution
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const message = document.getElementById('message');
    const extraText = document.getElementById('extra-text');
    const heartsContainer = document.getElementById('hearts-container');
    const body = document.body;
    const buttons = document.querySelector('.buttons');

    // Declare counter variable
    let noClickCount = 0;

    // YES button click handler
    yesBtn.addEventListener('click', function() {
        // Smooth background transition
        body.style.background = 'linear-gradient(135deg, #e6f7ff, #f0e6ff)'; // Softer pastel
        
        // Fade out buttons smoothly
        buttons.style.opacity = '0';
        setTimeout(function() {
            buttons.style.display = 'none';
        }, 500);
        
        // Show message with fade and scale
        message.classList.remove('hidden');
        
        // Add floating hearts
        createHearts();
    });

    // NO button click handler
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Gradually increase YES button size
        const yesScale = 1 + (noClickCount * 0.1);
        yesBtn.style.transform = `scale(${yesScale})`;
        
        // Gradually decrease NO button size
        const noScale = Math.max(1 - (noClickCount * 0.05), 0.1);
        noBtn.style.transform = `scale(${noScale})`;
        
        // Move NO button to random position within viewport
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Handle milestones
        if (noClickCount === 5) {
            extraText.textContent = 'Abhi bhi gussa hai kya?';
            extraText.classList.remove('hidden');
        } else if (noClickCount === 10) {
            extraText.textContent = 'Yrr ab maan bhi ja.';
        } else if (noClickCount === 12) {
            noBtn.style.transform = 'scale(0.05)'; // Very small
        } else if (noClickCount === 15) {
            // Fade out NO button
            noBtn.style.opacity = '0';
            noBtn.style.transform = 'scale(0)';
            setTimeout(function() {
                noBtn.remove(); // Remove from DOM
            }, 500);
            
            // Center YES button and add glow
            yesBtn.style.position = 'static';
            yesBtn.style.transform = 'scale(1)';
            yesBtn.classList.add('glow');
            
            // Show final message
            message.textContent = 'Mujhe pata tha ignore zyada der nahi chalega.';
            message.classList.remove('hidden');
        }
    });

    // Function to create floating hearts
    function createHearts() {
        for (let i = 0; i < 8; i++) { // Create 8 hearts
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal
            heart.style.animationDelay = Math.random() * 2 + 's'; // Stagger
            heartsContainer.appendChild(heart);
            
            // Remove after animation
            setTimeout(function() {
                heart.remove();
            }, 4000);
        }
    }
});
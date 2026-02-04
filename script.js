// Wrap everything in DOMContentLoaded for safe, error-free execution
document.addEventListener('DOMContentLoaded', function() {
    // Declare and initialize all variables safely
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const message = document.getElementById('message');
    const extraText = document.getElementById('extra-text');
    const particlesContainer = document.getElementById('particles-container');
    const body = document.body;
    const buttons = document.querySelector('.buttons');
    let noClickCount = 0; // Track NO button clicks

    // Initialize gentle floating particles on load
    createParticles();

    // YES button click handler: Graceful stage-like transition
    yesBtn.addEventListener('click', function() {
        // Smooth background shift like stage lights
        body.style.background = 'linear-gradient(135deg, #ffe6f0, #e6d7ff)'; // Subtle shift
        
        // Fade out buttons gracefully
        buttons.style.opacity = '0';
        setTimeout(function() {
            buttons.style.display = 'none';
        }, 500);
        
        // Show message with upward float animation
        message.classList.remove('hidden');
        
        // Add more elegant particles for celebration
        createParticles();
    });

    // NO button click handler: Dancer-like gliding movement
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Gradually grow YES button
        const yesScale = 1 + (noClickCount * 0.08);
        yesBtn.style.transform = `scale(${yesScale})`;
        
        // Gradually shrink NO button
        const noScale = Math.max(1 - (noClickCount * 0.05), 0.1);
        noBtn.style.transform = `scale(${noScale})`;
        
        // Smooth movement: Calculate safe position within screen bounds
        const containerRect = document.documentElement.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        const margin = 20; // Margin to avoid edges
        const maxX = containerRect.width - btnWidth - margin;
        const maxY = containerRect.height - btnHeight - margin;
        const randomX = Math.random() * maxX + margin;
        const randomY = Math.random() * maxY + margin;
        
        // Apply smooth transition to new position
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Handle milestones with graceful text updates
        if (noClickCount === 5) {
            extraText.textContent = 'Still upset?';
            extraText.classList.remove('hidden');
        } else if (noClickCount === 10) {
            extraText.textContent = 'I’ll keep trying.';
        } else if (noClickCount === 12) {
            noBtn.style.transform = 'scale(0.05)'; // Very small, like fading dancer
        } else if (noClickCount === 15) {
            // Fade out NO button smoothly
            noBtn.style.opacity = '0';
            noBtn.style.transform = 'scale(0)';
            setTimeout(function() {
                noBtn.remove(); // Remove from DOM
            }, 500);
            
            // Center YES button with soft glow
            yesBtn.style.position = 'static';
            yesBtn.style.transform = 'scale(1)';
            yesBtn.classList.add('glow');
            
            // Show final message like spotlight reveal
            message.textContent = 'I knew you wouldn’t stay away for long.';
            message.classList.remove('hidden');
        }
    });

    // Function to create gentle floating particles (stage lights effect)
    function createParticles() {
        for (let i = 0; i < 10; i++) { // Create 10 particles
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw'; // Random horizontal
            particle.style.animationDelay = Math.random() * 3 + 's'; // Stagger for rhythm
            particlesContainer.appendChild(particle);
            
            // Remove after animation to avoid buildup
            setTimeout(function() {
                particle.remove();
            }, 6000);
        }
    }
});
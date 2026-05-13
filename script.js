// Premium Smooth Parallax
const parallaxContainer = document.getElementById('parallaxContainer');
const parallaxItems = document.querySelectorAll('.parallax-item');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Lerping factor (0.1 is smooth, lower is "heavier")
const lerpAmount = 0.12;

window.addEventListener('mousemove', (e) => {
    // Normalize coordinates to -0.5 to 0.5
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function animate() {
    // Smoothly interpolate current position towards target mouse position
    currentX += (mouseX - currentX) * lerpAmount;
    currentY += (mouseY - currentY) * lerpAmount;

    parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed')) || 0.05;
        
        // Calculate movement
        const x = currentX * speed * 1500;
        const y = currentY * speed * 1500;
        
        // Add a subtle tilt/rotation
        const rotate = currentX * 15; 
        
        item.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
    });

    requestAnimationFrame(animate);
}

// Start the animation loop
if (window.innerWidth > 768) {
    animate();
}

// Subtle scroll reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, section h2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a quick animation effect
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 200);
});

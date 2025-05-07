// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('menu-open');
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Prevent clicks inside nav-links from closing the menu
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                toggleMenu();
            }

            // Smooth scroll with offset for fixed header
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation with staggered delay
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = index * 0.1;
    observer.observe(card);
});

document.querySelectorAll('.section-title, .project-card, .about-text, .contact-form, .contact-info').forEach(el => {
    observer.observe(el);
});

// Form Animation with enhanced interaction
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
        group.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
        group.classList.remove('focused');
    });

    // Check if input has value on page load
    if (input.value) {
        label.classList.add('active');
    }
});

// Enhanced Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.style.boxShadow = 'none';
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
        navbar.style.boxShadow = 'var(--shadow)';
    }
    lastScroll = currentScroll;
});

// Add enhanced animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .section-title, .skill-card, .project-card, .about-text, .contact-form, .contact-info {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .section-title.animate, .skill-card.animate, .project-card.animate, .about-text.animate, .contact-form.animate, .contact-info.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .navbar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navbar.scroll-down {
        transform: translateY(-100%);
    }

    .navbar.scroll-up {
        transform: translateY(0);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .form-group {
        position: relative;
        transition: all 0.3s ease;
    }

    .form-group.focused {
        transform: translateY(-2px);
    }

    .form-group label.active {
        top: -0.5rem;
        left: 0.5rem;
        font-size: 0.875rem;
        background: white;
        padding: 0 0.5rem;
        color: var(--primary-color);
    }

    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
    }

    .btn:hover::after {
        width: 300px;
        height: 300px;
    }

    .skill-card {
        transition-delay: 0s;
    }

    .skill-card:hover i {
        transform: scale(1.1) rotate(5deg);
    }

    .project-card:hover .project-image {
        transform: scale(1.05);
    }
`;

document.head.appendChild(style);

// Enhanced Typing Animation for Hero Section
const heroTitle = document.querySelector('.hero h1');
const heroSubtitle = document.querySelector('.hero p');

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    const titleText = heroTitle.textContent;
    const subtitleText = heroSubtitle.textContent;
    
    typeWriter(heroTitle, titleText, 100);
    setTimeout(() => {
        typeWriter(heroSubtitle, subtitleText, 50);
    }, titleText.length * 100 + 200);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
}); 
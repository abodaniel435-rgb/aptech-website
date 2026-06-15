// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards
document.querySelectorAll('.feature-card, .instructor-card, .program-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Apply Now button functionality
document.querySelector('.apply-btn').addEventListener('click', function () {
    alert('Thank you for your interest! Please fill out the application form.');
    // You can replace this with a form modal or redirect
});

// Curriculum buttons functionality
document.querySelectorAll('.curriculum-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const programName = this.parentElement.querySelector('h3').textContent;
        alert(`Viewing curriculum for: ${programName}`);
        // You can replace this with actual curriculum links
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-item h3').forEach(stat => {
                const value = parseInt(stat.textContent);
                animateCounter(stat, value);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile menu toggle (if you add a hamburger menu)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }
}

initMobileMenu();

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        // Close any modals if implemented
        console.log('Escape key pressed');
    }
});

// Hover effect for program cards
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

initScrollProgress();

// Form validation (if contact form is added)
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || name.length < 2) {
        alert('Please enter a valid name');
        return false;
    }
    
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email');
        return false;
    }
    
    if (!message || message.length < 10) {
        alert('Please enter a message (at least 10 characters)');
        return false;
    }
    
    alert('Thank you for your message! We will contact you soon.');
    return true;
}

// Add active class to navigation on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = '#06b6d4';
            }
        });
    });
}

updateActiveNavLink();

// Prevent negative scroll
document.addEventListener('wheel', function (e) {
    if (e.deltaY < 0 && window.scrollY === 0) {
        e.preventDefault();
    }
}, { passive: false });

// Print function
function printPage() {
    window.print();
}

// Go to top button
function initGoToTop() {
    const goTopBtn = document.createElement('button');
    goTopBtn.innerHTML = '↑ Top';
    goTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
        color: white;
        border: none;
        padding: 12px 18px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
    `;
    
    document.body.appendChild(goTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goTopBtn.style.display = 'block';
        } else {
            goTopBtn.style.display = 'none';
        }
    });
    
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    goTopBtn.addEventListener('mouseenter', () => {
        goTopBtn.style.transform = 'scale(1.1)';
    });
    
    goTopBtn.addEventListener('mouseleave', () => {
        goTopBtn.style.transform = 'scale(1)';
    });
}

initGoToTop();

// Form submission handler
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', validateContactForm);
});

// Dynamic year in footer
function updateFooterYear() {
    const footers = document.querySelectorAll('.footer');
    footers.forEach(footer => {
        const text = footer.textContent;
        const currentYear = new Date().getFullYear();
        footer.textContent = text.replace(/\d{4}/, currentYear);
    });
}

updateFooterYear();

// Prevent double-click zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});

console.log('Aptech Website loaded successfully!');
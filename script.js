/**
 * S&S Lift ve Vinç Hizmetleri
 * Main JavaScript File
 * ES6+ Modern JavaScript
 */

// ===================================
// 1. DOM Content Loaded Event
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollToTop();
    initSmoothScroll();
    initContactForm();
    initAnimations();
});

// ===================================
// 2. Navbar Functionality
// ===================================
const initNavbar = () => {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Set active page based on current URL (for multi-page structure)
    const setActivePage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Remove active class from all links first
            link.classList.remove('active');

            // Add active class to current page link
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === '/' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    };

    // Call on page load
    setActivePage();

    // Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Active link on scroll (only for single-page sections with IDs)
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');

        // Only update active links if we have sections with IDs (single-page behavior)
        if (sections.length === 0) return;

        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    // Only update if it's an anchor link (starts with #)
                    if (linkHref && linkHref.startsWith('#')) {
                        link.classList.remove('active');
                        if (linkHref === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        });
    };
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveLink();
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
};

// ===================================
// 3. Scroll to Top Button
// ===================================
const initScrollToTop = () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // Show/hide button based on scroll position
    const toggleScrollTopBtn = () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };
    
    // Scroll to top on click
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Event listeners
    window.addEventListener('scroll', toggleScrollTopBtn);
    scrollTopBtn.addEventListener('click', scrollToTop);
};

// ===================================
// 4. Smooth Scroll for Anchor Links
// ===================================
const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ===================================
// 5. Contact Form Handling
// ===================================
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(data)) {
            showFormMessage('Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission(data);
            showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            form.reset();
        } catch (error) {
            showFormMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
        }
    });
};

// Form validation helper
const validateForm = (data) => {
    const { name, email, phone, service, message } = data;

    // Check if all fields are filled
    if (!name || !email || !phone || !service || !message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }

    // Validate phone format (Turkish phone number)
    const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        return false;
    }

    return true;
};

// Show form message
const showFormMessage = (message, type) => {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
};

// Simulate form submission (replace with actual API call)
const simulateFormSubmission = (data) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Log form data to console (for demonstration)
            console.log('Form submitted with data:', data);

            // Simulate successful submission
            resolve({ success: true });

            // To simulate error, uncomment the line below:
            // reject(new Error('Submission failed'));
        }, 1000);
    });
};

// ===================================
// 6. Scroll Animations
// ===================================
const initAnimations = () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.service-card, .equipment-card, .contact-info-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
};

// ===================================
// 7. Utility Functions
// ===================================

// Debounce function for performance optimization
const debounce = (func, wait = 20) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit = 100) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===================================
// 8. Additional Features
// ===================================

// Lazy loading for images (if needed)
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Add loading state to buttons
const addLoadingState = (button, isLoading) => {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Gönderiliyor...';
    } else {
        button.disabled = false;
        button.innerHTML = '<i class="bi bi-send-fill me-2"></i>Mesaj Gönder';
    }
};

// ===================================
// 9. Performance Monitoring
// ===================================

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ===================================
// 10. Error Handling
// ===================================

// Global error handler
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    // You can send error logs to a logging service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You can send error logs to a logging service here
});

// ===================================
// 11. Export functions (if using modules)
// ===================================

// If you're using ES6 modules, you can export functions like this:
// export { initNavbar, initScrollToTop, initSmoothScroll, initContactForm, initAnimations };

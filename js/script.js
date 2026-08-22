/* ========================================
   PIXANITHING - Global JavaScript
   Version: 4.0.0 (Final with API Config)
   Author: PIXANITHING
   Description: Complete global JavaScript with API configuration for all pages
   ======================================== */

// ========================================
// API CONFIGURATION
// ========================================
const API_CONFIG = {
    // Production URL (Render)
    API_URL: 'https://pixanithing-api.onrender.com/api',
    
    // Development URL (Local - Uncomment for local development)
    // API_URL: 'http://localhost:5000/api',
    
    // Fallback URL
    getBaseUrl: function() {
        // Check if we're in production (Render)
        if (window.location.hostname === 'pixanithing.onrender.com' || 
            window.location.hostname === 'pixanithing-api.onrender.com') {
            return 'https://pixanithing-api.onrender.com/api';
        }
        // For local development
        return 'http://localhost:5000/api';
    }
};

// Set the API URL
const API_URL = API_CONFIG.getBaseUrl();

// ========================================
// IIFE - Immediately Invoked Function Expression
// ========================================
(function() {
    'use strict';

    // ========================================
    // DOM READY
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {

        // ========================================
        // PRELOADER
        // ========================================
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    preloader.classList.add('hidden');
                }, 600);
            });

            setTimeout(function() {
                if (!preloader.classList.contains('hidden')) {
                    preloader.classList.add('hidden');
                }
            }, 3000);
        }

        // ========================================
        // THEME TOGGLE WITH DEVICE DETECTION
        // ========================================
        const themeToggle = document.getElementById('themeToggle');
        const root = document.documentElement;

        function getSystemTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
            return 'dark';
        }

        function getInitialTheme() {
            const savedTheme = localStorage.getItem('pixanithing-theme');
            if (savedTheme) {
                return savedTheme;
            }
            return getSystemTheme();
        }

        function applyTheme(theme) {
            if (theme === 'light') {
                root.setAttribute('data-theme', 'light');
                if (themeToggle) {
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                }
            } else {
                root.removeAttribute('data-theme');
                if (themeToggle) {
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }
            localStorage.setItem('pixanithing-theme', theme);
        }

        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = root.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);

                this.style.transform = 'rotate(180deg)';
                setTimeout(function() {
                    themeToggle.style.transform = 'rotate(0deg)';
                }, 300);
            });
        }

        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
            mediaQuery.addEventListener('change', function(e) {
                const savedTheme = localStorage.getItem('pixanithing-theme');
                if (!savedTheme) {
                    applyTheme(e.matches ? 'light' : 'dark');
                }
            });
        }

        // ========================================
        // MOBILE NAVIGATION TOGGLE
        // ========================================
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', function(e) {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // ========================================
        // HEADER SCROLL EFFECTS
        // ========================================
        const header = document.getElementById('header');
        let lastScrollY = 0;
        let ticking = false;

        function handleScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }

        if (header) {
            window.addEventListener('scroll', handleScroll, { passive: true });

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            }
        }

        // ========================================
        // BACK TO TOP BUTTON
        // ========================================
        const backToTop = document.getElementById('backToTop');

        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, { passive: true });

            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            backToTop.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // ========================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // ========================================
        // NEWSLETTER FORM (Global)
        // ========================================
        function setupNewsletterForms() {
            const forms = document.querySelectorAll('.newsletter-form');

            forms.forEach(function(form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const input = this.querySelector('input[type="email"]');
                    const email = input.value.trim();

                    if (!email) {
                        input.style.borderColor = '#F44336';
                        input.placeholder = 'Please enter your email';
                        setTimeout(function() {
                            input.style.borderColor = '';
                            input.placeholder = 'Enter your email address';
                        }, 3000);
                        return;
                    }

                    if (!isValidEmail(email)) {
                        input.style.borderColor = '#F44336';
                        input.value = '';
                        input.placeholder = 'Please enter a valid email';
                        setTimeout(function() {
                            input.style.borderColor = '';
                            input.placeholder = 'Enter your email address';
                        }, 3000);
                        return;
                    }

                    // API Call
                    try {
                        const response = await fetch(`${API_URL}/subscribers/subscribe`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email })
                        });

                        const data = await response.json();

                        if (response.ok && data.success) {
                            const btn = this.querySelector('button');
                            const originalText = btn.innerHTML;
                            btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                            btn.style.background = '#4CAF50';
                            btn.style.borderColor = '#4CAF50';
                            input.value = '';

                            setTimeout(function() {
                                btn.innerHTML = originalText;
                                btn.style.background = '';
                                btn.style.borderColor = '';
                            }, 3000);
                            
                            console.log('📧 Newsletter subscription:', email);
                        } else {
                            showNotification(data.message || 'Subscription failed', 'error');
                        }
                    } catch (error) {
                        console.error('Newsletter error:', error);
                        showNotification('Something went wrong. Please try again.', 'error');
                    }
                });
            });
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        setupNewsletterForms();

        // ========================================
        // ACTIVE NAV LINK HIGHLIGHT
        // ========================================
        function highlightActiveNav() {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-menu a');

            navLinks.forEach(function(link) {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        highlightActiveNav();

        // ========================================
        // KEYBOARD SHORTCUTS
        // ========================================
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"], #searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            if (e.key === 'Escape') {
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (themeToggle) {
                    themeToggle.click();
                }
            }
        });

        // ========================================
        // LAZY LOAD IMAGES
        // ========================================
        function lazyLoadImages() {
            if ('IntersectionObserver' in window) {
                const images = document.querySelectorAll('img[data-src]');

                const imageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px'
                });

                images.forEach(function(img) {
                    imageObserver.observe(img);
                });
            }
        }

        lazyLoadImages();

        // ========================================
        // CONSOLE WELCOME
        // ========================================
        console.log('%c🎬 PIXANITHING', 'font-size: 32px; font-weight: bold; color: #6C63FF;');
        console.log('%cWelcome to PIXANITHING!', 'font-size: 18px; color: #FF6B35;');
        console.log('%c🔴 API URL: ' + API_URL, 'font-size: 12px; color: #B0B0B0;');
        console.log('%c🔴 Subscribe for more creative content!', 'font-size: 14px; color: #B0B0B0;');
        console.log('%c📧 Contact: hello@pixanithing.com', 'font-size: 12px; color: #6B6B6B;');

        // ========================================
        // DYNAMIC COPYRIGHT YEAR
        // ========================================
        document.querySelectorAll('.footer-bottom p').forEach(function(el) {
            const year = new Date().getFullYear();
            el.innerHTML = el.innerHTML.replace('2026', year);
        });

        console.log('✅ PIXANITHING loaded successfully!');

    });

})();

// ========================================
// EXPOSE GLOBAL FUNCTIONS
// ========================================

/**
 * Toggle theme manually
 */
window.toggleTheme = function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.click();
    }
};

/**
 * Scroll to top
 */
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

/**
 * Show notification/toast message
 */
window.showNotification = function(message, type) {
    type = type || 'info';

    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
        info: '#6C63FF'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        background: ${colors[type] || colors.info};
        color: #FFFFFF;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.4s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.4s ease';
        setTimeout(function() {
            notification.remove();
        }, 400);
    }, 4000);
};

/**
 * Copy text to clipboard
 */
window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            window.showNotification('Copied to clipboard!', 'success');
        }).catch(function() {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        window.showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        window.showNotification('Failed to copy', 'error');
    }
    document.body.removeChild(textarea);
}

/**
 * Format number (e.g., 1000 -> 1K)
 */
window.formatNumber = function(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
};

/**
 * Time ago (e.g., 2 hours ago)
 */
window.timeAgo = function(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    if (diff < 604800) return Math.floor(diff / 86400) + ' days ago';
    if (diff < 2592000) return Math.floor(diff / 604800) + ' weeks ago';
    if (diff < 31536000) return Math.floor(diff / 2592000) + ' months ago';
    return Math.floor(diff / 31536000) + ' years ago';
};

/**
 * Format date (e.g., December 15, 2026)
 */
window.formatDate = function(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * API Request Helper
 */
window.apiRequest = async function(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('authToken');
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...(options.headers || {})
            }
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                if (!window.location.pathname.includes('login.html')) {
                    window.location.href = 'login.html';
                }
            }
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * Check if user is logged in
 */
window.isLoggedIn = function() {
    return !!localStorage.getItem('authToken');
};

/**
 * Get current user data
 */
window.getCurrentUser = function() {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch {
        return null;
    }
};

/**
 * Logout user
 */
window.logoutUser = function() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
};

console.log('✅ PIXANITHING global functions loaded!');
console.log('📍 API URL:', API_URL);
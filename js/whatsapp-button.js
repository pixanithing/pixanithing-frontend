/* ============================================
   WhatsApp Floating Button — Professional JS
   ============================================ */

(function () {
  'use strict';

  // Wait for DOM ready
  function initWhatsAppButton() {
    const wrapper = document.getElementById('waFloatWrapper');
    const btn     = document.getElementById('waFloatBtn');
    if (!wrapper || !btn) return;

    // ---- 1. Reduced Motion Support ----
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      wrapper.querySelectorAll('.wa-pulse-ring').forEach(r => r.remove());
    }

    // ---- 2. Scroll Fade Behavior ----
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      wrapper.style.opacity = '0.6';
      wrapper.style.transform = 'scale(0.95)';
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
      }, 350);
    }, { passive: true });

    // ---- 3. Hide on Input Focus (Mobile Only) ----
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('focus', () => { wrapper.style.display = 'none'; });
        el.addEventListener('blur',  () => { wrapper.style.display = '';     });
      });
    }

    // ---- 4. Click Tracking (Analytics Ready) ----
    btn.addEventListener('click', function () {
      // Google Analytics 4
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: 'Floating WhatsApp Button',
          value: 1
        });
      }
      // Google Tag Manager
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'whatsapp_click', location: 'floating_button' });
      }
      // Console log (development)
      console.log('[WA Button] Clicked — WhatsApp opening...');
    });

    // ---- 5. Show Button Only After Page Load ----
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.8)';
    window.addEventListener('load', () => {
      setTimeout(() => {
        wrapper.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
      }, 600);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppButton);
  } else {
    initWhatsAppButton();
  }
})();
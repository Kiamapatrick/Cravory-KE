/* ═══════════════════════════════════════════════
   CRAVORY KE — Main JavaScript
   ═══════════════════════════════════════════════ */

'use strict';

// ─── CONSTANTS ───────────────────────────────────
const WHATSAPP_NUMBER = '254719182470';

// ─── DOM READY ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initWhatsAppOrder();
  initFooterYear();
  initSmoothScroll();
  initImageParallax();
});

/* ═══════════════════════════════════════════════
   HEADER — Scroll behaviour
   ═══════════════════════════════════════════════ */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateHeader();
}

/* ═══════════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    mobileNav.setAttribute('aria-hidden', (!isOpen).toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close on outside tap
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      if (mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ═══════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
   ═══════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-fade');
  if (!targets.length) return;

  // Check for reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════
   WHATSAPP ORDER
   ═══════════════════════════════════════════════ */
function initWhatsAppOrder() {
  const submitBtn = document.getElementById('order-submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name        = getValue('order-name');
    const phone       = getValue('order-phone');
    const event       = getValue('order-event');
    const date        = getValue('order-date');
    const size        = getValue('order-size');
    const flavor      = getValue('order-flavor');
    const notes       = getValue('order-notes');

    // Basic validation
    if (!name.trim()) {
      highlight('order-name');
      showToast('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      highlight('order-phone');
      showToast('Please enter your phone number.');
      return;
    }
    if (!event) {
      highlight('order-event');
      showToast('Please select an event type.');
      return;
    }

    // Build WhatsApp message
    const lines = [
      '✨ *New Order from Cravory KE Website*',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Event Type:* ${event}`,
      date ? `*Event Date:* ${formatDate(date)}` : null,
      size ? `*Cake Size:* ${size}` : null,
      flavor ? `*Flavor:* ${flavor}` : null,
      notes.trim() ? `*Special Instructions:* ${notes.trim()}` : null,
      '',
      '— Sent via cravoryke.com'
    ].filter(line => line !== null).join('\n');

    const encoded = encodeURIComponent(lines);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    // Animate button
    submitBtn.textContent = 'Opening WhatsApp…';
    submitBtn.disabled = true;

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.57a.75.75 0 00.921.921l5.771-1.507A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.946-1.357l-.355-.212-3.667.958.976-3.565-.231-.367A9.696 9.696 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" fill="currentColor"/>
        </svg>
        <span>Send Order via WhatsApp</span>
      `;
    }, 600);
  });
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function highlight(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#C98BA3';
  el.focus();
  el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function showToast(msg) {
  // Remove existing toast
  const existing = document.querySelector('.cravory-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'cravory-toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = msg;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%) translateY(10px)',
    background: '#3A2A2A',
    color: '#FFF8F4',
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontFamily: 'Manrope, sans-serif',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(58,42,42,0.3)',
    opacity: '0',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    pointerEvents: 'none'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ═══════════════════════════════════════════════
   FOOTER YEAR
   ═══════════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL (for browsers that don't support CSS smooth scroll)
   ═══════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════
   SUBTLE PARALLAX on hero blobs
   ═══════════════════════════════════════════════ */
function initImageParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const blobs = document.querySelectorAll('.hero-bg-blob');
  if (!blobs.length) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        blobs.forEach((blob, i) => {
          const speed = i === 0 ? 0.15 : 0.08;
          blob.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════
   CMS INTEGRATION HOOKS
   Stubs ready for Sanity CMS connection
   ═══════════════════════════════════════════════ */

/**
 * Replace placeholder arts with real images from Sanity CMS.
 *
 * Usage:
 *   import sanityClient from '@sanity/client';
 *   const client = sanityClient({ projectId: 'xxx', dataset: 'production', useCdn: true });
 *
 *   fetchCMSImages(client).then(renderCMSContent);
 *
 * @param {Object} sanityData - Object with image arrays keyed by section
 */
function renderCMSContent(sanityData) {
  if (!sanityData) return;

  // Hero images
  if (sanityData.hero) {
    sanityData.hero.forEach((img, i) => {
      const target = document.querySelector(`[data-cms="hero-image-${i + 1}"]`);
      if (target) swapImage(target, img);
    });
  }

  // Gallery
  if (sanityData.gallery) {
    const grid = document.getElementById('gallery-grid');
    if (grid) {
      grid.innerHTML = sanityData.gallery.map(img => `
        <div class="gallery-item ${img.tall ? 'gallery-item--tall' : ''} ${img.wide ? 'gallery-item--wide' : ''}">
          <img src="${img.url}" alt="${img.alt || 'Cravory KE creation'}" loading="lazy" />
        </div>
      `).join('');
    }
  }

  // Instagram
  if (sanityData.instagram) {
    const container = document.querySelector('[data-cms-target="instagram-images"]');
    if (container && sanityData.instagram.length) {
      const [feature, ...thumbs] = sanityData.instagram;
      container.innerHTML = `
        <div class="insta-feature">
          <img src="${feature.url}" alt="${feature.alt || ''}" loading="lazy" />
          <div class="insta-overlay"><span class="insta-icon">♥</span></div>
        </div>
        <div class="insta-grid">
          ${thumbs.slice(0, 4).map(img => `
            <div class="insta-thumb">
              <img src="${img.url}" alt="${img.alt || ''}" loading="lazy" />
              <div class="insta-overlay"><span class="insta-icon">♥</span></div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }
}

function swapImage(container, imageData) {
  if (!container || !imageData) return;
  const img = document.createElement('img');
  img.src = imageData.url;
  img.alt = imageData.alt || 'Cravory KE';
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  container.innerHTML = '';
  container.appendChild(img);
}

// Expose for external CMS integration
window.CravoryKE = {
  renderCMSContent,
  swapImage,
  WHATSAPP_NUMBER
};

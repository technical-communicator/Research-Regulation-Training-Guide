// ===================================
// Main JavaScript - Core Functionality
// ===================================

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    const isOpen = nav.classList.contains('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '☰';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '☰';
    }
  });
}

/**
 * Highlight Active Navigation Link
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || currentPath.startsWith(linkPath.replace('index.html', ''))) {
      link.classList.add('active');
    }
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without triggering scroll
        if (this.getAttribute('href') !== '#') {
          history.pushState(null, null, this.getAttribute('href'));
        }

        // Focus the target for accessibility
        target.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Accordion Functionality
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all accordions
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });

      // Open clicked accordion if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Table of Contents Generation
 */
function generateTableOfContents() {
  const tocContainer = document.querySelector('.toc-content');
  if (!tocContainer) return;

  const headings = document.querySelectorAll('.main-content h2, .main-content h3');
  if (headings.length === 0) return;

  const tocList = document.createElement('ul');

  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    // Add indent class for h3
    if (heading.tagName === 'H3') {
      li.style.paddingLeft = 'var(--spacing-md)';
    }

    li.appendChild(link);
    tocList.appendChild(li);
  });

  tocContainer.appendChild(tocList);
}

/**
 * External Link Icon and Target
 */
function markExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach(link => {
    const url = new URL(link.href);
    if (url.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');

      // Add external link icon
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon';
        icon.setAttribute('aria-label', '(opens in new window)');
        icon.innerHTML = ' ↗';
        link.appendChild(icon);
      }
    }
  });
}

/**
 * Copy Code to Clipboard
 */
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });

    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.insertBefore(button, block);
  });
}

/**
 * Last Updated Date
 */
function updateLastModified() {
  const lastUpdated = document.querySelector('.last-updated');
  if (lastUpdated && !lastUpdated.textContent) {
    lastUpdated.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    box-shadow: var(--shadow-lg);
    z-index: 999;
  `;

  document.body.appendChild(scrollBtn);

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize All Functions on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveNav();
  initSmoothScroll();
  initAccordions();
  generateTableOfContents();
  markExternalLinks();
  initCodeCopy();
  updateLastModified();
  initScrollToTop();
});

/**
 * Utility Functions
 */
const utils = {
  // Debounce function for search/filter
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Escape HTML
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = utils;
}

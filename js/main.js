/* ==========================================
   WEBMANDU — Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page Loader ──
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1600);
    });
  }

  // ── Navbar Scroll ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ── Hamburger Menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Scroll Top ──
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Portfolio Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
          const show = filter === 'all' || item.dataset.cat === filter;
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = show ? 'block' : 'none';
            if (show) {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              });
            }
          }, 200);
        });
      });
    });
  }

  // ── Animated Counter ──
  const animateCounters = () => {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.innerHTML = `${Math.floor(current)}<span>${suffix}</span>`;
      }, 25);
    });
  };

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsEl);
  }

  // ── Typed Text Effect ──
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = ['Websites', 'Brands', 'Experiences', 'Solutions'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (!isDeleting) {
        typedEl.textContent = word.slice(0, ++charIndex);
        if (charIndex === word.length) {
          isDeleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = word.slice(0, --charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(type, isDeleting ? 60 : 100);
    };
    setTimeout(type, 1200);
  }

  // ── Contact Form ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const success = contactForm.querySelector('.form-success');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
        btn.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          setTimeout(() => {
            success.style.display = 'none';
            btn.style.display = 'inline-flex';
            btn.textContent = 'Send Message';
            btn.disabled = false;
          }, 4000);
        }
      }, 1500);
    });
  }

  // ── Navbar active highlight on scroll (home page) ──
  if (document.querySelectorAll('section[id]').length) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
      });
    }, { passive: true });
  }

});

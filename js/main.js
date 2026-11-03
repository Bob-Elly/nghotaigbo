/* ============================================
   Nghọta na Mmụta Asụsụ Igbo — Master JavaScript
   Multi-page navigation, Dark/Light Mode,
   Media Players, Lightbox, and Forms
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme Toggle (Warm Earth Dark Mode) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('nghotaigbo-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply initial theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('nghotaigbo-theme', newTheme);
    });
  }

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function onScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (scrollY > 350) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Back to Top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile Navigation ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function closeMobileNav() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    if (!hamburger || !navLinks) return;
    const willOpen = !navLinks.classList.contains('active');
    hamburger.classList.toggle('active', willOpen);
    navLinks.classList.toggle('active', willOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('active', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
      closeMobileNav();
    }
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Video Embed Play on Click ---------- */
  document.querySelectorAll('.video-thumbnail-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const card = wrapper.closest('.video-card');
      const videoId = wrapper.dataset.videoId;
      const embedContainer = card ? card.querySelector('.video-embed') : null;

      if (videoId && embedContainer) {
        wrapper.style.display = 'none';
        embedContainer.classList.add('active');

        // Pass origin parameter if served via http/https for YouTube security policy
        const originParam = window.location.protocol.startsWith('http')
          ? `&origin=${encodeURIComponent(window.location.origin)}`
          : '';

        embedContainer.innerHTML = `
          <iframe
            src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1${originParam}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            title="Video player">
          </iframe>
        `;
      }
    });
  });

  /* ---------- Video Filter Tabs (for Stories/Rhymes page) ---------- */
  const videoTabs = document.querySelectorAll('.video-tab-btn');
  const videoCards = document.querySelectorAll('.video-card[data-category]');
  const videoGrid = document.querySelector('.video-grid');

  videoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      videoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      if (videoGrid) {
        videoGrid.setAttribute('data-active-filter', filter);
      }
      videoCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Contact Form Handler & Pre-population ---------- */
  const contactForm = document.getElementById('contactForm');

  // Auto-fill inquiry from URL parameters (e.g. contact.html?inquiry=Book1)
  const urlParams = new URLSearchParams(window.location.search);
  const inquiry = urlParams.get('inquiry');
  if (inquiry && contactForm) {
    const subjectSelect = contactForm.querySelector('#subject');
    const messageTextarea = contactForm.querySelector('#message');

    if (inquiry && inquiry.startsWith('Primary')) {
      const pNum = inquiry.replace('Primary', '');
      if (subjectSelect) subjectSelect.value = 'Book Purchase';
      if (messageTextarea) messageTextarea.value = `Hello Mrs. Chinyere,\n\nI would like to request a copy of "Nghọta na Mmụta Asụsụ Igbo — Primary ${pNum}". Please share availability, pricing, and delivery details.\n\nThank you!`;
    } else if (inquiry === 'JSSBooks') {
      if (subjectSelect) subjectSelect.value = 'School Bulk Order';
      if (messageTextarea) messageTextarea.value = 'Hello Mrs. Chinyere,\n\nI am inquiring about the "Nghọta na Mmụta Asụsụ Igbo — JSS 1, 2 & 3" series. Please provide school curriculum details and ordering options.\n\nThank you!';
    } else if (inquiry === 'L2Series' || inquiry === 'Book1' || inquiry === 'L2Book1') {
      if (subjectSelect) subjectSelect.value = 'Book Purchase';
      if (messageTextarea) messageTextarea.value = 'Hello Mrs. Chinyere,\n\nI would like to request the complete "Nghọta na Mmụta Asụsụ Igbo — L2 Series (Books 1, 2, and 3)". Please share pricing, availability, and delivery details.\n\nThank you!';
    } else if (inquiry === 'Book2' || inquiry === 'L2Book2') {
      if (subjectSelect) subjectSelect.value = 'Book Purchase';
      if (messageTextarea) messageTextarea.value = 'Hello Mrs. Chinyere,\n\nI would like to request a copy of "L2 Book Two — Sentence Building & Vocabulary". Please share purchase and delivery details.\n\nThank you!';
    } else if (inquiry === 'Book3' || inquiry === 'L2Book3') {
      if (subjectSelect) subjectSelect.value = 'Book Purchase';
      if (messageTextarea) messageTextarea.value = 'Hello Mrs. Chinyere,\n\nI would like to request a copy of "L2 Book Three — Fluency & Cultural Mastery". Please share ordering details.\n\nThank you!';
    } else if (inquiry === 'Workbooks') {
      if (subjectSelect) subjectSelect.value = 'School Bulk Order';
      if (messageTextarea) messageTextarea.value = 'Hello Mrs. Chinyere,\n\nI am inquiring about companion workbooks and practice materials for students. Please let us know options for bulk school packages.\n\nThank you!';
    } else if (inquiry === 'BookPurchase') {
      if (subjectSelect) subjectSelect.value = 'Book Purchase';
      if (messageTextarea) messageTextarea.value = 'Hello Nghotaigbo Educational Services,\n\nI would like to inquire about ordering copies of the "Nghọta na Mmụta Asụsụ Igbo" textbooks. Please share pricing, availability, and delivery details.\n\nThank you!';
    } else if (inquiry === 'SchoolVisit') {
      if (subjectSelect) subjectSelect.value = 'School Bulk Order';
      if (messageTextarea) messageTextarea.value = 'Hello Nghotaigbo Educational Services,\n\nWe are interested in textbook packages and curriculum resources for our school.\n\nThank you!';
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      const subject = encodeURIComponent(`[Nghotaigbo Inquiry] ${data.subject || 'General Inquiries'} from ${data.firstName} ${data.lastName}`);
      const body = encodeURIComponent(
        `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone/WhatsApp: ${data.phone || 'N/A'}\nTopic: ${data.subject || 'General'}\n\nMessage:\n${data.message}`
      );
      window.location.href = `mailto:nghotaigbo@gmail.com?subject=${subject}&body=${body}`;

      const btn = contactForm.querySelector('.form-submit');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Opening Email Client…';
        btn.style.background = '#2E7D32';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 4000);
      }
    });
  }

});

/* ============================================
   Lightbox Functionality
   ============================================ */

let lightboxImages = [];
let currentLightboxIndex = 0;

function buildLightboxImages() {
  lightboxImages = [];
  const items = document.querySelectorAll('.school-card, .gallery-item:not([style*="display: none"]), .community-photo');
  items.forEach(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('.school-card-title, h4')?.textContent?.trim() || '';
    const loc = item.querySelector('.school-card-location span, .school-card-badge, span')?.textContent?.trim() || '';
    let caption = img?.alt || '';
    if (title && loc) {
      caption = `${title}, ${loc}`;
    } else if (title) {
      caption = title;
    }
    if (img) {
      lightboxImages.push({ src: img.src, alt: img.alt, caption: caption });
    }
  });
}

function openLightbox(index) {
  buildLightboxImages();
  if (index < 0 || index >= lightboxImages.length) return;

  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');

  if (lightbox && lbImg) {
    lbImg.src = lightboxImages[index].src;
    lbImg.alt = lightboxImages[index].alt;
    if (lbCaption) lbCaption.textContent = lightboxImages[index].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navigateLightbox(direction) {
  if (lightboxImages.length === 0) return;
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
  if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;

  const lbImg = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');
  if (lbImg) {
    lbImg.src = lightboxImages[currentLightboxIndex].src;
    lbImg.alt = lightboxImages[currentLightboxIndex].alt;
    if (lbCaption) lbCaption.textContent = lightboxImages[currentLightboxIndex].caption;
  }
}

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  buildLightboxImages();
});


/* ============================================
   Vocabulary Audio Speech Function
   ============================================ */
function speakIgbo(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // slightly slower for language learners
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } else {
    alert(`Pronunciation: "${text}"`);
  }
}

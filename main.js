document.addEventListener('DOMContentLoaded', function () {
  // ---------------- Gallery Lightbox ----------------
  const galleryImages = document.querySelectorAll('.img-thumb');
  const modalImg = document.getElementById('galleryModalImg');
  const modalCaption = document.getElementById('galleryModalCaption');
  const galleryModalEl = document.getElementById('galleryModal');

  galleryImages.forEach(img => {
    img.addEventListener('click', function () {
      const src = img.getAttribute('data-img');
      const caption = img.getAttribute('data-caption') || 'Gallery Image';
      modalImg.src = src;
      modalImg.alt = caption;
      modalCaption.textContent = caption;

      const modal = new bootstrap.Modal(galleryModalEl);
      modal.show();
    });
  });

  // ---------------- Contact Form Validation ----------------
  const contactForm = document.getElementById('contactForm');
  const statusEl = document.getElementById('contactStatus');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = contactForm.name;
      const email = contactForm.email;
      const message = contactForm.message;

      // Name validation
      if (!name.value || name.value.trim().length < 2) {
        name.classList.add('is-invalid');
        valid = false;
      } else {
        name.classList.remove('is-invalid');
      }

      // Email validation
      if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      // Message validation
      if (!message.value || message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        valid = false;
      } else {
        message.classList.remove('is-invalid');
      }

      // Result message
      if (!valid) {
        statusEl.textContent = '⚠️ Please fix errors above.';
        statusEl.classList.remove('text-success');
        statusEl.classList.add('text-danger');
        return;
      }

      statusEl.textContent = '✅ Thanks — your message has been received (demo only).';
      statusEl.classList.remove('text-danger');
      statusEl.classList.add('text-success');
      contactForm.reset();
    });
  }

  // ---------------- Active Navbar Link Highlight ----------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#mainNav a.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`#mainNav a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));

  // ---------------- Smooth Scroll for Navbar ----------------
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

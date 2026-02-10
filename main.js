
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Toggle Mobile Menu
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      // Animate burger menu
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close menu when clicking a link
  if (links.length > 0 && navLinks) {
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        // Reset burger
        if (mobileToggle) {
          const spans = mobileToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  // Smooth Scroll offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Product Modal Logic ---
  const modal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const orderButtons = document.querySelectorAll('.product-card .btn');

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');

  if (modal && orderButtons.length > 0) {
    orderButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Get product data from the card
        const card = btn.closest('.product-card');
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        const desc = card.querySelector('p').textContent;

        // Populate modal
        modalImg.src = img;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDesc.textContent = `High-quality ${title} with ${desc.toLowerCase()}. Perfect for modern minimalist interiors, crafted with premium materials to ensure both comfort and durability.`;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
      });
    });

    // Close Modal Events
    const closeFunc = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    };

    closeModal.addEventListener('click', closeFunc);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeFunc();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeFunc();
      }
    });

    // WhatsApp Order Placeholder Logic
    const confirmBtn = document.getElementById('confirmOrder');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const title = modalTitle.textContent;
        const waNumber = "628123456789";
        const message = encodeURIComponent(`Halo StoolMart, saya tertarik untuk memesan ${title}. Bisa bantu proses pemesanannya?`);
        window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
      });
    }
  }
});

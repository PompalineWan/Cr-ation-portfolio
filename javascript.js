  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  function openPopup(id) {
    document.getElementById(id).classList.add('active');
  }
  function closePopup(id) {
    document.getElementById(id).classList.remove('active');
  }

  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".project-card, .formation-card, .tab-content");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  });

  // Smooth parallax scroll effect (optimisé)
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  function updateParallax() {
    const scrollPos = window.scrollY;
    const bgElement = document.querySelector(".background");

    if (bgElement) {
      bgElement.style.transform = `translateY(${scrollPos * 0.5}px)`;
    }

    const heroImage = document.querySelector(".image img");
    if (heroImage) {
      const glowIntensity = Math.min(0.6, 0.2 + (scrollPos * 0.0002));
      heroImage.style.filter = `drop-shadow(0 0 40px rgba(0, 255, 128, ${glowIntensity}))`;
    }

    ticking = false;
  }

  // Fix scroll navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = 70;
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
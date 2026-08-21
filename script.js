document.addEventListener('DOMContentLoaded', () => {
  // --- Fade in animation ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => observer.observe(el));

  // --- Floating Dock Auto-Hide ---
  let lastScrollY = window.scrollY;
  const dock = document.querySelector('.floating-dock');
  
  if (dock) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        dock.style.transform = 'translateX(-50%) translateY(150px)';
      } else {
        // Scrolling up
        dock.style.transform = 'translateX(-50%) translateY(0)';
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  }

});

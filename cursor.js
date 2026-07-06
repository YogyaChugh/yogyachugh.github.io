document.addEventListener('DOMContentLoaded', () => {
  // Create cursor dot
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  const animateCursor = () => {
    // LERP (Linear Interpolation) for smoothness
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Add hover effect for interactive elements
  const interactives = document.querySelectorAll('a, button, input, .project-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.add('hovered');
      // Wait, classList.remove('hovered') is what we need
      cursorDot.classList.remove('hovered');
    });
  });

  // Re-run hover logic for dynamically added elements or just rely on event delegation?
  // Since this runs after DOMContentLoaded, it will catch the static elements.
  
  // Fade in animation (from before)
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
});

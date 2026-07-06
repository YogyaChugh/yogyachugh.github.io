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

  // --- ASCII Decrypt Hover Effect ---
  const decryptTargets = document.querySelectorAll('.decrypt-target');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  decryptTargets.forEach(target => {
    // Store original text
    const originalText = target.innerText;
    let isDecrypting = false;

    target.addEventListener('mouseenter', () => {
      if (isDecrypting) return;
      isDecrypting = true;
      
      let iteration = 0;
      const maxIterations = 15;
      
      const scramble = setInterval(() => {
        target.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < (iteration / maxIterations) * originalText.length) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        iteration++;
        
        if (iteration > maxIterations) {
          clearInterval(scramble);
          target.innerText = originalText;
          isDecrypting = false;
        }
      }, 30);
    });
  });
});

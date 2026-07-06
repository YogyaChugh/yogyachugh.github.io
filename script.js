document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-decode]');
  const hexChars = '0123456789ABCDEF';

  elements.forEach(el => {
    const originalText = el.getAttribute('data-decode');
    let iteration = 0;
    
    // Add decode-text class for monospace styling during animation
    el.classList.add('decode-text');

    const interval = setInterval(() => {
      el.innerText = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          // Preserve spaces
          if (letter === ' ') return ' ';
          return hexChars[Math.floor(Math.random() * 16)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        // Remove styling once complete
        el.classList.remove('decode-text');
      }

      iteration += 1 / 3; // Controls speed (lower = slower)
    }, 30);
  });
});

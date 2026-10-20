// yogya.dev — giant type that fits its block, the story lines, and two small conveniences.
(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");

  // Header gains a backdrop once the page scrolls under it.
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Copy the email address. The button stays hidden where the clipboard API isn't available.
  const copyBtn = document.querySelector("[data-copy]");
  if (copyBtn && navigator.clipboard) {
    const status = document.querySelector(".copy-status");
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        status.textContent = "Copied";
      } catch {
        status.textContent = "Couldn’t copy. Select the address instead.";
      }
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(() => (status.textContent = ""), 2400);
    });
  }

  // Giant type (the name, and the closing line) is sized so each line runs edge to edge.
  // On wide screens the name switches to one line when two stacked lines would have to shrink to fit.
  const fits = [...document.querySelectorAll(".fit")];
  function fit(el) {
    const lines = [...el.querySelectorAll(".line")];
    const room = el.clientWidth;
    if (!room || !lines.length) return;
    const canJoin = el.closest(".landing") !== null;
    const cap = innerHeight * (canJoin ? 0.48 : 0.62);
    const apply = (sizes) => lines.forEach((l, i) => (l.style.fontSize = `${sizes[i]}px`));

    el.classList.remove("one");
    lines.forEach((l) => (l.style.fontSize = "100px"));
    let sizes = lines.map((l) => (100 * room) / l.getBoundingClientRect().width);
    const height = sizes.reduce((sum, z, i) => sum + z * (i ? 0.82 : 1.02), 0);
    if (canJoin && height > cap / 0.85) {
      el.classList.add("one");
      const first = lines[0].getBoundingClientRect();
      const last = lines[lines.length - 1].getBoundingClientRect();
      const px = Math.min((100 * room) / (last.right - first.left), cap / 1.02);
      sizes = lines.map(() => px);
    } else if (height > cap) {
      sizes = sizes.map((z) => (z * cap) / height);
    }
    apply(sizes);

    // Correction pass at the real size, so nothing spills past the edge.
    const left = lines[0].getBoundingClientRect().left;
    const used = el.classList.contains("one")
      ? lines[lines.length - 1].getBoundingClientRect().right - left
      : Math.max(...lines.map((l) => l.getBoundingClientRect().width));
    if (used > room) apply(sizes.map((z) => (z * room) / used));
  }
  const fitAll = () => fits.forEach(fit);
  if (fits.length) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fitAll);
    let raf = 0;
    addEventListener("resize", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fitAll); });
  }

  // The small name in the header arrives once the giant one has scrolled away.
  const bigName = document.querySelector(".landing .fit");
  if (header && bigName && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => header.classList.toggle("show-brand", !entry.isIntersecting), {
      rootMargin: "-68px 0px 0px 0px",
    }).observe(bigName);
  }

  // Each big line stays faint until it reaches the middle of the screen, then comes into focus and stays.
  const lines = document.querySelectorAll(".say:not(.lit-always)");
  if ("IntersectionObserver" in window) {
    const focus = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-lit");
        focus.unobserve(entry.target);
      }
    }, { rootMargin: "-30% 0px -30% 0px" });
    lines.forEach((line) => focus.observe(line));
  } else {
    lines.forEach((line) => line.classList.add("is-lit"));
  }
})();

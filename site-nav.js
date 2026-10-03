(() => {
  const links = [...document.querySelectorAll('.section-links a[href^="#"]')];
  const sections = links
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter(({ section }) => section);

  if (!sections.length) return;

  let ticking = false;

  const updateCurrentSection = () => {
    const headerOffset = document.querySelector('header')?.offsetHeight ?? 0;
    const marker = headerOffset + 32;
    let current = sections[0];

    for (const item of sections) {
      if (item.section.getBoundingClientRect().top <= marker) current = item;
    }

    for (const item of sections) {
      if (item === current) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }

    current.link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateCurrentSection);
  };

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  addEventListener('hashchange', requestUpdate);
  updateCurrentSection();
})();

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    window.setTimeout(() => section.classList.add('visible'), 120 * index);
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  const createBadge = () => {
    const badge = document.createElement('div');
    badge.className = 'hero-badge';
    badge.innerHTML = `
      <div class="pixel-smiley" aria-hidden="true">
        <span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell on"></span><span class="smiley-cell off"></span><span class="smiley-cell on"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span>
        <span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span>
        <span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span>
        <span class="smiley-cell on"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell on"></span>
        <span class="smiley-cell off"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell off"></span>
        <span class="smiley-cell off"></span><span class="smiley-cell off"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell on"></span><span class="smiley-cell off"></span><span class="smiley-cell off"></span>
      </div>
      <div class="smiley-label">LVS clean</div>
    `;
    document.body.appendChild(badge);
    return badge;
  };

  const pageShell = document.querySelector('.site-shell');
  let badge = document.querySelector('.hero-badge');
  const showBadge = true;
  if (!badge) {
    badge = createBadge();
  }

  if (!badge) {
    return;
  }

  const moveBadge = () => {
    const badgeRect = badge.getBoundingClientRect();
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const scrollRatio = window.scrollY / Math.max(1, maxY);
    const y = Math.min(Math.max(0, scrollRatio), 1) * Math.max(0, window.innerHeight - badgeRect.height - 24);
    const edgeOffset = window.innerWidth > 900 ? window.innerWidth - badgeRect.width - 24 : 20;
    badge.style.transform = `translate(${edgeOffset}px, ${y}px)`;
  };

  moveBadge();
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(moveBadge);
  });
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(moveBadge);
  });
});
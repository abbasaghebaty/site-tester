async function loadProjects() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  try {
    const res = await fetch('assets/data/projects.json');
    const projects = await res.json();
    const visible = projects.filter((p) => !p.hidden);

    grid.innerHTML = visible.map(renderCard).join('');

    const statEl = document.getElementById('statProjects');
    if (statEl) statEl.textContent = visible.length;
  } catch (err) {
    console.error('Failed to load projects:', err);
  }
}

function getInitials(title) {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function renderTech(tech = []) {
  return tech
    .map((t) => {
      const modifier = t.variant ? ` portfolio-card__tech-badge--${t.variant}` : '';
      return `<span class="portfolio-card__tech-badge${modifier}">${t.label}</span>`;
    })
    .join('');
}

function renderLinks(links = []) {
  return links
    .map((link) => {
      if (link.type === 'current') {
        return `<span class="portfolio-card__link portfolio-card__link--secondary" style="cursor:default;opacity:0.7;">${link.label}</span>`;
      }
      const modifier = link.type === 'demo' ? ' portfolio-card__link--demo' : '';
      return `<a href="${link.url}" class="portfolio-card__link${modifier}" target="_blank" rel="noopener">${link.label} <span class="portfolio-card__link-arrow">→</span></a>`;
    })
    .join('');
}

function renderCard(project) {
  return `
    <article class="portfolio-card" data-project>
      <div class="portfolio-card__image">
        <div class="portfolio-card__image-placeholder">${getInitials(project.title)}</div>
      </div>
      <div class="portfolio-card__body">
        <h3 class="portfolio-card__title">${project.title}</h3>
        <p class="portfolio-card__desc">${project.description}</p>
        <div class="portfolio-card__tech">${renderTech(project.tech)}</div>
        <div class="portfolio-card__actions">${renderLinks(project.links)}</div>
      </div>
    </article>`;
}

document.addEventListener('DOMContentLoaded', loadProjects);

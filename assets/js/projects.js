async function loadProjects() {
    const tableBody = document.getElementById('portfolioGrid');
    if (!tableBody) return;

    try {
        const res = await fetch('assets/data/projects.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const projects = await res.json();
        const visible = projects.filter((project) => !project.hidden);

        tableBody.innerHTML = visible.map(renderProjectRow).join('');

        window.dispatchEvent(new CustomEvent('projects:loaded', {
            detail: { count: visible.length },
        }));
    } catch (err) {
        console.error('Failed to load projects:', err);
    }
}

function renderTech(tech = []) {
    return tech.map((item) => {
        const modifier = item.variant ? ` tech-badge--${item.variant}` : '';
        return `<span class="tech-badge${modifier}">${item.label}</span>`;
    }).join('');
}

function renderProjectName(project) {
    const currentLink = project.links?.find((link) => link.type === 'current');
    const externalLink = project.links?.find((link) => link.type !== 'current' && link.url);
    const link = externalLink || currentLink;

    if (!link) {
        return `<span class="projects-table__current">${project.title}</span>`;
    }

    if (link.type === 'current') {
        return `<span class="projects-table__current">${project.title}</span>`;
    }

    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer">
        ${project.title} <span class="projects-table__arrow">→</span>
    </a>`;
}

function renderProjectRow(project) {
    return `<tr data-project>
        <td class="projects-table__name">
            ${renderProjectName(project)}
        </td>
        <td>
            <p class="projects-table__desc">${project.description}</p>
            <div class="projects-table__tech">
                ${renderTech(project.tech)}
            </div>
        </td>
    </tr>`;
}

document.addEventListener('DOMContentLoaded', loadProjects);

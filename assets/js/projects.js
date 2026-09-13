async function loadProjects() {
    const container = document.getElementById('portfolioGrid');
    if (!container) return;

    try {
        const res = await fetch('assets/data/projects.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const projects = await res.json();
        const visible = projects.filter((project) => !project.hidden);

        container.innerHTML = `
            <table class="projects-table">
                <thead>
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${visible.map(renderProjectRow).join('')}
                </tbody>
            </table>`;

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
    const demoLink = project.links?.find((link) => link.type === 'demo' && link.url);

    if (!demoLink) {
        return `<span class="projects-table__current">${project.title}</span>`;
    }

    return `<a href="${demoLink.url}" target="_blank" rel="noopener noreferrer">
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

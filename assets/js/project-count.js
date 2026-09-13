// Project count is loaded asynchronously from projects.json.
// The old table no longer exists in index.html, so return 0 until projects.js
// finishes loading and publishes the real count.
export function getTotalProjects(projectsTableBody) {
    if (!projectsTableBody) return 0;

    const projectRows = projectsTableBody.querySelectorAll('[data-project]');
    return projectRows.length;
}

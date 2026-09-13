// Counts the project rows rendered in the projects table.
export function getTotalProjects(projectsTableBody) {
        // ========================================
        // Dynamic Project Count
        // ========================================
        const projectRows = projectsTableBody.querySelectorAll('[data-project]');
        return projectRows.length;

}

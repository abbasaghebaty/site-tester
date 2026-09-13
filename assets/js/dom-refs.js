// DOM references shared across modules.
export function getDomRefs() {
        // ========================================
        // DOM References
        // ========================================
        const typingTextEl = document.getElementById('typingText');
        const flipClockEl = document.getElementById('flipClock');
        const bgOrbsEl = document.getElementById('bgOrbs');
        const currentYearEl = document.getElementById('currentYear');
        const lastUpdatedEl = document.getElementById('lastUpdated');
        const statProjectsEl = document.getElementById('statProjects');
        const statExperienceEl = document.getElementById('statExperience');
        const statVisitorsEl = document.getElementById('statVisitors');
        const projectsTableBody = document.getElementById('projectsTableBody');
        const statsSectionEl = document.getElementById('statsSection');


    return {
        typingTextEl, flipClockEl, bgOrbsEl, currentYearEl, lastUpdatedEl,
        statProjectsEl, statExperienceEl, statVisitorsEl,
        projectsTableBody, statsSectionEl,
    };
}

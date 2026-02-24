/**
 * History Sidebar Controller
 * Manages the collapsible sidebar in the Version History modal AND the History Section page
 */

// Initialize sidebars
const initHistorySidebars = () => {
    console.log('Initializing History Sidebars...');
    // ===============================
    // MODAL SIDEBAR
    // ===============================
    const historySidebar = document.getElementById('history-sidebar');
    const historySidebarOverlay = document.getElementById('history-sidebar-overlay');
    const historyHamburgerBtn = document.getElementById('history-hamburger-btn');
    const historySidebarClose = document.getElementById('history-sidebar-close');
    const historyList = document.getElementById('history-list');

    function openHistorySidebar() {
        console.log('Opening History Modal Sidebar');
        if (historySidebar) historySidebar.classList.add('active');
        if (historySidebarOverlay) historySidebarOverlay.classList.add('active');
        if (window.gaTracker) window.gaTracker.trackEvent('history_sidebar_open', { type: 'modal' });
    }

    function closeHistorySidebar() {
        console.log('Closing History Modal Sidebar');
        if (historySidebar) historySidebar.classList.remove('active');
        if (historySidebarOverlay) historySidebarOverlay.classList.remove('active');
    }

    if (historyHamburgerBtn) {
        historyHamburgerBtn.addEventListener('click', openHistorySidebar);
    }

    if (historySidebarClose) {
        historySidebarClose.addEventListener('click', closeHistorySidebar);
    }

    if (historySidebarOverlay) {
        historySidebarOverlay.addEventListener('click', closeHistorySidebar);
    }

    // Close modal sidebar when a history item is clicked
    if (historyList) {
        historyList.addEventListener('click', function (e) {
            const historyItem = e.target.closest('.history-item');
            if (historyItem && !e.target.closest('.history-delete-btn')) {
                setTimeout(closeHistorySidebar, 150);
            }
        });
    }

    // ===============================
    // SECTION (PAGE) SIDEBAR
    // ===============================
    const historySectionSidebar = document.getElementById('history-section-sidebar');
    const historySectionSidebarOverlay = document.getElementById('history-section-sidebar-overlay');
    const historySectionHamburgerBtn = document.getElementById('history-section-hamburger-btn');
    const historySectionSidebarClose = document.getElementById('history-section-sidebar-close');
    const historySectionList = document.getElementById('history-section-list');

    function openHistorySectionSidebar() {
        console.log('Opening History Section Sidebar');
        if (historySectionSidebar) historySectionSidebar.classList.add('active');
        if (historySectionSidebarOverlay) historySectionSidebarOverlay.classList.add('active');
        if (window.gaTracker) window.gaTracker.trackEvent('history_sidebar_open', { type: 'section' });
    }

    function closeHistorySectionSidebar() {
        console.log('Closing History Section Sidebar');
        if (historySectionSidebar) historySectionSidebar.classList.remove('active');
        if (historySectionSidebarOverlay) historySectionSidebarOverlay.classList.remove('active');
    }

    if (historySectionHamburgerBtn) {
        historySectionHamburgerBtn.addEventListener('click', openHistorySectionSidebar);
    }

    if (historySectionSidebarClose) {
        historySectionSidebarClose.addEventListener('click', closeHistorySectionSidebar);
    }

    if (historySectionSidebarOverlay) {
        historySectionSidebarOverlay.addEventListener('click', closeHistorySectionSidebar);
    }

    // Close section sidebar when a history item is clicked
    if (historySectionList) {
        historySectionList.addEventListener('click', function (e) {
            const historyItem = e.target.closest('.history-item');
            if (historyItem && !e.target.closest('.history-delete-btn')) {
                setTimeout(closeHistorySectionSidebar, 150);
            }
        });
    }

    // ===============================
    // AI HISTORY SIDEBAR (SECTION)
    // ===============================
    const aiHistorySidebar = document.getElementById('ai-history-sidebar');
    const aiHistorySidebarOverlay = document.getElementById('ai-history-sidebar-overlay');
    const aiHistoryHamburgerBtn = document.getElementById('ai-history-hamburger-btn');
    const aiHistorySidebarClose = document.getElementById('ai-history-sidebar-close');
    const aiHistoryList = document.getElementById('ai-history-section-list');

    function openAiHistorySidebar() {
        console.log('Opening AI History Sidebar');
        if (aiHistorySidebar) aiHistorySidebar.classList.add('active');
        if (aiHistorySidebarOverlay) aiHistorySidebarOverlay.classList.add('active');
        if (window.gaTracker) window.gaTracker.trackEvent('history_sidebar_open', { type: 'ai_section' });
    }

    function closeAiHistorySidebar() {
        console.log('Closing AI History Sidebar');
        if (aiHistorySidebar) aiHistorySidebar.classList.remove('active');
        if (aiHistorySidebarOverlay) aiHistorySidebarOverlay.classList.remove('active');
    }

    if (aiHistoryHamburgerBtn) {
        aiHistoryHamburgerBtn.addEventListener('click', openAiHistorySidebar);
    }

    if (aiHistorySidebarClose) {
        aiHistorySidebarClose.addEventListener('click', closeAiHistorySidebar);
    }

    if (aiHistorySidebarOverlay) {
        aiHistorySidebarOverlay.addEventListener('click', closeAiHistorySidebar);
    }

    // Close AI sidebar when a history item is clicked
    if (aiHistoryList) {
        aiHistoryList.addEventListener('click', function (e) {
            const historyItem = e.target.closest('.history-item');
            if (historyItem && !e.target.closest('.history-delete-btn')) {
                setTimeout(closeAiHistorySidebar, 150);
            }
        });
    }

    // ===============================
    // EXPOSE GLOBAL CONTROLLERS
    // ===============================
    window.historySidebarController = {
        // Modal sidebar (JSON)
        open: openHistorySidebar,
        close: closeHistorySidebar,
        // Section sidebar (JSON)
        openSection: openHistorySectionSidebar,
        closeSection: closeHistorySectionSidebar,
        // AI History sidebar
        openAi: openAiHistorySidebar,
        closeAi: closeAiHistorySidebar
    };

    console.log('History sidebars initialized (modal + section + ai)');
};

// Run initialization
initHistorySidebars();

// Export for other modules if needed
export const historySidebarController = window.historySidebarController;

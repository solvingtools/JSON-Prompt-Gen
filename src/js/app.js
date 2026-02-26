// Core Services
import { CryptoUtils } from './cryptoUtils.js';
import { DictionaryService } from './dictionaryService.js';
import { LLMService } from './llmService.js';
import { HistoryService } from './historyService.js';
import { AnalyticsService } from './analyticsService.js';
import { FeedbackService } from './feedbackService.js';
import { GettingStarted } from './gettingStarted.js';
import { GlobalParamsService } from './globalParamsService.js';

import { TemplateService } from './services/templateService.js';
import { TemplateUI } from './templateUI.js';
import './components/SceneControlPanel.js';


// Global access for services needed in callbacks
window.CryptoUtils = CryptoUtils;
window.AnalyticsService = AnalyticsService;
// Initialize global services that don't need UI wait
window.historyService = new HistoryService();
window.llmService = new LLMService();


document.addEventListener('DOMContentLoaded', async () => {
    // Initialize LLM configuration (async)
    try {
        await window.llmService.init();
    } catch (e) {
        console.error('LLMService Init Error:', e);
    }

    // Initialize Core UI-dependent Services
    try {
        new GettingStarted();
    } catch (e) {
        console.error('GettingStarted Init Error:', e);
    }

    // Check for "Use in Prompt" Term from Dictionary
    const pendingTerm = localStorage.getItem('pending_dict_term');
    if (pendingTerm) {
        try {
            const term = JSON.parse(pendingTerm);
            // We assume the first scene is the target
            const firstSceneDesc = document.querySelector('.scene-description');
            if (firstSceneDesc) {
                const currentVal = firstSceneDesc.value;
                // Append logic: Add comma if needed, or replace if empty
                if (currentVal) {
                    firstSceneDesc.value = `${currentVal}, ${term.name}`;
                } else {
                    firstSceneDesc.value = term.name;
                }

                // Trigger Event for Auto-Save
                firstSceneDesc.dispatchEvent(new Event('input', { bubbles: true }));

                // Robust Toast Logic
                const showToastSafe = (title, message, type = 'info') => {
                    if (typeof showToast === 'function') {
                        showToast(title, message, type);
                    } else if (window.showToast) {
                        window.showToast(title, message, type);
                    } else {
                        // Fallback implementation
                        let container = document.getElementById('toast-container');
                        if (!container) {
                            container = document.createElement('div');
                            container.id = 'toast-container';
                            container.className = 'toast-container';
                            document.body.appendChild(container);
                        }

                        const toast = document.createElement('div');
                        toast.className = `toast toast-${type} show`;
                        toast.innerHTML = `
                            <div class="toast-header">
                                <strong class="me-auto">${title}</strong>
                                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
                            </div>
                            <div class="toast-body">${message}</div>
                        `;
                        container.appendChild(toast);

                        // Auto remove after 3s
                        setTimeout(() => {
                            toast.classList.remove('show');
                            setTimeout(() => toast.remove(), 300);
                        }, 3000);
                    }
                };

                showToastSafe('Term Applied', `Added "${term.name}" to your prompt.`, 'success');

                localStorage.removeItem('pending_dict_term');
            }
        } catch (e) {
            console.error('Error applying dictionary term:', e);
            localStorage.removeItem('pending_dict_term'); // Clear on error too
        }
    }



    // Initialize Template System
    try {
        const templateService = new TemplateService();
        const templateUI = new TemplateUI(templateService);
        window.templateUI = templateUI;
    } catch (e) {
        console.error('Template System Init Error:', e);
    }

    const gaTracker = new AnalyticsService();
    window.gaTracker = gaTracker; // Expose for other modules like History

    const scenesContainer = document.getElementById('scenes-container');
    const addSceneBtn = document.getElementById('add-scene-btn');
    const generateBtn = document.getElementById('generate-btn');
    const outputArea = document.getElementById('output-json');

    /* ============================
        AI Mode Announcement Logic
       ============================ */
    const aiAnnounceModal = document.getElementById('ai-announcement-modal');
    if (aiAnnounceModal && !localStorage.getItem('ai_announce_seen')) {
        // slight delay to let the app render first
        setTimeout(() => {
            aiAnnounceModal.classList.remove('hidden');

            // Mark as seen
            localStorage.setItem('ai_announce_seen', 'true');
            if (window.gaTracker) window.gaTracker.trackEvent('ai_announce_shown');
        }, 1200);

        const closeAnnounceBtn = document.getElementById('ai-announce-close-btn');
        const exploreAnnounceBtn = document.getElementById('ai-announce-explore-btn');

        if (closeAnnounceBtn) {
            closeAnnounceBtn.addEventListener('click', () => {
                aiAnnounceModal.classList.add('hidden');
                if (window.gaTracker) window.gaTracker.trackEvent('ai_announce_dismissed');
            });
        }

        if (exploreAnnounceBtn) {
            exploreAnnounceBtn.addEventListener('click', () => {
                aiAnnounceModal.classList.add('hidden');
                if (window.gaTracker) window.gaTracker.trackEvent('ai_announce_explored');

                // Switch to AI mode
                const aiModeRadio = document.getElementById('mode-ai');
                if (aiModeRadio) {
                    aiModeRadio.checked = true;
                    aiModeRadio.dispatchEvent(new Event('change'));
                }
            });
        }
    }

    /* ============================
        Mode Switcher Logic
       ============================ */
    const modeInputs = document.querySelectorAll('input[name="gen-mode"]');
    const jsonModeContainer = document.getElementById('json-mode-container');
    const aiModeContainer = document.getElementById('ai-mode-container');

    // Initial Check
    const currentMode = document.querySelector('input[name="gen-mode"]:checked')?.value || 'json';
    const headerResetBtn = document.getElementById('reset-btn');
    const headerGenerateBtn = document.getElementById('generate-btn');
    const globalParamsSection = document.getElementById('global-params-section');

    if (currentMode === 'ai') {
        if (jsonModeContainer) jsonModeContainer.classList.add('hidden');
        if (aiModeContainer) aiModeContainer.classList.remove('hidden');
        if (headerResetBtn) headerResetBtn.classList.add('hidden');
        if (headerGenerateBtn) headerGenerateBtn.classList.add('hidden');
        if (globalParamsSection) globalParamsSection.classList.add('hidden');
        initAiModeMockup();
    } else {
        if (jsonModeContainer) jsonModeContainer.classList.remove('hidden');
        if (aiModeContainer) aiModeContainer.classList.add('hidden');
        if (headerResetBtn) headerResetBtn.classList.remove('hidden');
        if (headerGenerateBtn) headerGenerateBtn.classList.remove('hidden');
        if (globalParamsSection) globalParamsSection.classList.remove('hidden');
    }

    // Add Event Listeners
    modeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'ai') {
                jsonModeContainer.classList.add('hidden');
                aiModeContainer.classList.remove('hidden');
                if (headerResetBtn) headerResetBtn.classList.add('hidden');
                if (headerGenerateBtn) headerGenerateBtn.classList.add('hidden');
                if (globalParamsSection) globalParamsSection.classList.add('hidden');
                gaTracker?.trackEvent('mode_switch', { mode: 'ai' });
                // Initialize AI Mode UI state if not already done
                initAiModeMockup();
            } else {
                jsonModeContainer.classList.remove('hidden');
                aiModeContainer.classList.add('hidden');
                if (headerResetBtn) headerResetBtn.classList.remove('hidden');
                if (headerGenerateBtn) headerGenerateBtn.classList.remove('hidden');
                if (globalParamsSection) globalParamsSection.classList.remove('hidden');
                gaTracker?.trackEvent('mode_switch', { mode: 'json' });
            }
        });
    });

    // AI Session Management Constants
    const AI_HISTORY_KEY = 'ai_chat_history_v1';

    // Simple mockup for AI Mode UI Flow
    function initAiModeMockup() {
        const messagesArea = document.getElementById('ai-messages-area');
        if (!messagesArea) return;

        window.aiModeState = window.aiModeState || {
            sessionId: 'ai-session-' + Date.now(),
            modality: null,
            expertise: null,
            industry: null,
            platform: null
        };

        if (messagesArea.children.length === 0) {
            showAiWelcome();
        }

        // Session Control Listeners
        const newChatBtn = document.getElementById('ai-new-chat-btn');
        if (newChatBtn) newChatBtn.onclick = () => window.resetAiChat();
    }

    function showAiWelcome() {
        const messagesArea = document.getElementById('ai-messages-area');
        if (!messagesArea) return;

        const welcomeHtml = `
            <div class="chat-message ai-message">
                <div class="message-content">
                    <p>Hello! I am your Universal AI Prompt Engineer. What type of content would you like to create today?</p>
                    <div class="modality-grid">
                        <button class="modality-card" data-modality="image">
                            <div class="modality-icon">🖼️</div>
                            <div class="modality-name">Image</div>
                        </button>
                        <button class="modality-card" data-modality="video">
                            <div class="modality-icon">🎥</div>
                            <div class="modality-name">Video</div>
                        </button>
                        <button class="modality-card" data-modality="music">
                            <div class="modality-icon">🎵</div>
                            <div class="modality-name">Music</div>
                        </button>
                        <button class="modality-card" data-modality="3d">
                            <div class="modality-icon">🧊</div>
                            <div class="modality-name">3D Model</div>
                        </button>
                        <button class="modality-card" data-modality="text">
                            <div class="modality-icon">📝</div>
                            <div class="modality-name">Text</div>
                        </button>
                        <button class="modality-card" data-modality="audio">
                            <div class="modality-icon">🔊</div>
                            <div class="modality-name">Audio/SFX</div>
                        </button>
                        <button class="modality-card" data-modality="animation">
                            <div class="modality-icon">✨</div>
                            <div class="modality-name">Animation</div>
                        </button>
                        <button class="modality-card" data-modality="vrar">
                            <div class="modality-icon">🥽</div>
                            <div class="modality-name">VR/AR</div>
                        </button>
                        <button class="modality-card" data-modality="motion">
                            <div class="modality-icon">🎬</div>
                            <div class="modality-name">Motion Graphics</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        messagesArea.innerHTML = welcomeHtml;

        // Add listeners to modalities
        setTimeout(() => {
            document.querySelectorAll('.modality-card').forEach(card => {
                card.addEventListener('click', function () {
                    const modality = this.dataset.modality;
                    const modName = this.querySelector('.modality-name').textContent;
                    window.aiModeState.modality = modName;

                    // User message
                    const userHtml = `
                        <div class="chat-message user-message">
                            <div class="message-content">
                                <p>I want to create a ${modName} prompt.</p>
                            </div>
                        </div>
                    `;
                    messagesArea.insertAdjacentHTML('beforeend', userHtml);
                    saveAiSession();

                    // Disable the buttons
                    document.querySelectorAll('.modality-card').forEach(c => {
                        c.style.pointerEvents = 'none';
                        c.style.opacity = '0.5';
                    });
                    this.style.opacity = '1';
                    this.style.borderColor = 'var(--accent-primary)';

                    // Update progress
                    const progressFill = document.getElementById('ai-progress-fill');
                    if (progressFill) progressFill.style.width = '16%';
                    const steps = document.querySelectorAll('#ai-progress-steps li');
                    if (steps.length > 1) {
                        steps[0].classList.replace('active', 'completed');
                        steps[1].classList.add('active');
                    }

                    // AI Response
                    setTimeout(() => {
                        const aiResponseHtml = `
                            <div class="chat-message ai-message">
                                <div class="message-content">
                                    <p>Excellent choice! Let's assess your technical expertise level to tailor the parameters accordingly. Please select one:</p>
                                    <div class="mcq-options-container">
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Beginner')">
                                            <div class="mcq-option-title">Beginner</div>
                                            <div class="mcq-option-desc">Need assistance with all technical parameters.</div>
                                        </div>
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Intermediate')">
                                            <div class="mcq-option-title">Intermediate</div>
                                            <div class="mcq-option-desc">Familiar with some concepts, but happy for suggestions.</div>
                                        </div>
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Professional')">
                                            <div class="mcq-option-title">Professional</div>
                                            <div class="mcq-option-desc">I know exactly what I want (camera, lenses, lighting).</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        messagesArea.insertAdjacentHTML('beforeend', aiResponseHtml);
                        messagesArea.scrollTop = messagesArea.scrollHeight;
                        saveAiSession();
                    }, 800);

                    messagesArea.scrollTop = messagesArea.scrollHeight;
                });
            });
        }, 100);
    }

    /**
     * Custom in-page confirmation — replaces native confirm() which Chrome
     * can suppress inside module scripts. Resolves a Promise<boolean>.
     */
    function aiConfirm(message) {
        return new Promise(resolve => {
            const existing = document.getElementById('ai-confirm-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.id = 'ai-confirm-overlay';
            overlay.style.cssText = [
                'position:fixed', 'inset:0', 'z-index:9999',
                'display:flex', 'align-items:center', 'justify-content:center',
                'background:rgba(0,0,0,0.6)', 'backdrop-filter:blur(4px)'
            ].join(';');

            overlay.innerHTML = `
                <div style="background:var(--bg-elevated);border:1px solid rgba(255,255,255,0.12);
                    border-radius:16px;padding:28px 32px;max-width:380px;width:90%;text-align:center;
                    box-shadow:0 24px 60px rgba(0,0,0,0.6);">
                    <p style="color:var(--text-primary);font-size:1rem;margin:0 0 24px;line-height:1.5;">${message}</p>
                    <div style="display:flex;gap:12px;justify-content:center;">
                        <button id="ai-confirm-cancel" class="btn btn-secondary" style="min-width:100px;">Cancel</button>
                        <button id="ai-confirm-ok" class="btn btn-primary" style="min-width:100px;">Confirm</button>
                    </div>
                </div>`;

            document.body.appendChild(overlay);

            const cleanup = (result) => {
                overlay.remove();
                resolve(result);
            };

            document.getElementById('ai-confirm-ok').onclick = () => cleanup(true);
            document.getElementById('ai-confirm-cancel').onclick = () => cleanup(false);
            overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
        });
    }

    window.resetAiChat = async function () {
        const confirmed = await aiConfirm('Clear current conversation and start a new chat?');
        if (!confirmed) return;

        // Save the current session BEFORE clearing it
        saveAiSession();

        const messagesArea = document.getElementById('ai-messages-area');
        if (messagesArea) messagesArea.innerHTML = '';

        window.aiModeState = {
            sessionId: 'ai-session-' + Date.now(),
            modality: null,
            expertise: null,
            industry: null,
            platform: null
        };

        const progressFill = document.getElementById('ai-progress-fill');
        if (progressFill) progressFill.style.width = '0%';

        const steps = document.querySelectorAll('#ai-progress-steps li');
        steps.forEach(step => step.classList.remove('active', 'completed'));
        if (steps.length > 0) steps[0].classList.add('active');

        showAiWelcome();
        if (window.showToast) window.showToast('New Chat', 'Previous session saved. Starting a fresh AI conversation.', 'info');
    };

    function saveAiSession() {
        if (!window.aiModeState?.modality) return; // Don't save empty states

        const messagesArea = document.getElementById('ai-messages-area');
        const progressFill = document.getElementById('ai-progress-fill');
        const stepsContainer = document.getElementById('ai-progress-steps');

        const outputJson = document.getElementById('output-json');

        const session = {
            id: window.aiModeState.sessionId,
            date: new Date().toLocaleString(),
            modality: window.aiModeState.modality,
            state: window.aiModeState,
            history: messagesArea.innerHTML,
            progress: progressFill ? progressFill.style.width : '0%',
            steps: stepsContainer ? stepsContainer.innerHTML : '',
            lastJson: outputJson ? outputJson.value : null
        };

        let history = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
        const existingIndex = history.findIndex(s => s.id === session.id);

        if (existingIndex !== -1) {
            history[existingIndex] = session;
        } else {
            history.unshift(session);
        }

        localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(history.slice(0, 15))); // Keep last 15
    }

    function openAiHistory() {
        const list = document.getElementById('ai-history-section-list');
        if (!list) return;

        const history = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');

        if (history.length === 0) {
            list.innerHTML = '<div class="empty-state" style="padding: 20px; font-size: 0.85rem;">No AI sessions found.</div>';
            return;
        }

        list.innerHTML = '';
        history.forEach(session => {
            const el = document.createElement('div');
            el.className = 'history-item';
            el.dataset.id = session.id;

            // Simple modality icons
            let icon = '💬';
            if (session.modality === 'Image') icon = '🖼️';
            if (session.modality === 'Video') icon = '🎬';
            if (session.modality === 'Music') icon = '🎵';

            el.innerHTML = `
                <div class="history-item-top">
                    <div class="history-summary" style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.1rem;">${icon}</span>
                        <span>${session.modality} Session</span>
                    </div>
                    <span class="history-badge badge-ai">AI</span>
                </div>
                <div class="history-item-bottom">
                    <div class="history-date" style="font-size: 0.75rem; opacity: 0.7;">${session.date}</div>
                    <button class="history-delete-btn" title="Delete Session">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;


            const deleteBtn = el.querySelector('.history-delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteAiSession(session.id);
            });

            el.addEventListener('click', () => selectAiHistoryItem(session, el));
            list.appendChild(el);
        });
    }

    // Expose globally so sidebar button and history nav can trigger it
    window.renderAiHistoryInSection = function () {
        document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
        const aiTab = document.getElementById('history-tab-ai');
        if (aiTab) {
            aiTab.classList.add('active');
            aiTab.parentElement.setAttribute('data-active-tab', 'ai');
        }
        document.getElementById('history-panel-json')?.classList.add('hidden');
        document.getElementById('history-panel-ai')?.classList.remove('hidden');
        openAiHistory();

        // Clear preview area when switching to AI tab
        const preview = document.getElementById('ai-history-preview-area');
        if (preview) preview.innerHTML = '<div class="placeholder-content">Select an AI session from the sidebar...</div>';
        document.getElementById('ai-history-preview-actions')?.classList.add('hidden');
    };

    /** AI History Sidebar Controls (Managed by history-sidebar.js) */

    let selectedAiSession = null;

    function selectAiHistoryItem(session, el) {
        selectedAiSession = session;

        // Update UI selection
        document.querySelectorAll('#ai-history-section-list .history-item').forEach(item => item.classList.remove('active'));
        el.classList.add('active');

        // Render preview
        const preview = document.getElementById('ai-history-preview-area');
        if (!preview) return;

        preview.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="session-preview-header" style="padding: 16px 24px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                       <span style="color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; display: block; margin-bottom: 4px;">Saved Session</span>
                       <div style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; font-family: 'Outfit', sans-serif;">${session.modality} Production</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 500;">${session.date}</div>
                        <div style="color: var(--accent-primary); font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; opacity: 0.5; margin-top: 2px;">${session.id}</div>
                    </div>
                </div>
                <div class="ai-messages-area" style="flex: 1; padding: 30px; background: transparent; border: none; overflow-y: auto; display: flex; flex-direction: column; gap: 20px;">
                    ${session.history}
                </div>
            </div>
        `;

        // Show actions
        document.getElementById('ai-history-preview-actions')?.classList.remove('hidden');

        // Close sidebar when an item is selected to allow immediate viewing of content
        if (window.historySidebarController) {
            setTimeout(() => window.historySidebarController.closeAi(), 150);
        }
    }

    const restoreAiHistoryItem = () => {
        if (selectedAiSession) {
            loadAiSession(selectedAiSession.id);
        }
    };
    document.getElementById('ai-history-restore-btn')?.addEventListener('click', restoreAiHistoryItem);

    window.loadAiSession = function (sessionId) {
        const historyData = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
        const session = historyData.find(s => s.id === sessionId);
        if (!session) return;

        // 1. Navigate to generator section first (synchronously shows the panel)
        if (window.switchSection) {
            window.switchSection('generator-section');
        }

        // 2. Restore state & chat history after a brief delay so DOM is ready
        setTimeout(() => {
            // Restore aiModeState
            window.aiModeState = { ...(session.state || {}) };
            window.aiModeState.sessionId = session.id;

            // Restore chat messages
            const messagesArea = document.getElementById('ai-messages-area');
            if (messagesArea) {
                messagesArea.innerHTML = session.history || '';
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }

            // Restore progress bar
            const progressFill = document.getElementById('ai-progress-fill');
            if (progressFill) progressFill.style.width = session.progress || '0%';

            // Restore progress steps
            const stepsContainer = document.getElementById('ai-progress-steps');
            if (stepsContainer && session.steps) stepsContainer.innerHTML = session.steps;

            // Restore Output JSON
            const outputJson = document.getElementById('output-json');
            if (outputJson && session.lastJson) {
                outputJson.value = session.lastJson;
            } else if (outputJson) {
                outputJson.value = JSON.stringify({ platform: "veo", prompt: "Waiting for input...", parameters: {} }, null, 2);
            }

            // Switch to AI mode
            const aiRadio = document.querySelector('input[name="gen-mode"][value="ai"]');
            if (aiRadio) {
                aiRadio.checked = true;
                aiRadio.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (window.showToast) window.showToast('Session Restored', 'The AI chat has been restored.', 'success');
        }, 80);
    };

    window.deleteAiSession = async function (sessionId) {
        const confirmed = await aiConfirm('Delete this saved session?');
        if (!confirmed) return;
        let history = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
        history = history.filter(s => s.id !== sessionId);
        localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(history));

        // Refresh list
        openAiHistory();

        // Clear preview if deleted item was selected
        if (selectedAiSession && selectedAiSession.id === sessionId) {
            selectedAiSession = null;
            const preview = document.getElementById('ai-history-preview-area');
            if (preview) preview.innerHTML = '<div class="placeholder-content">Select an AI session from the sidebar...</div>';
            document.getElementById('ai-history-preview-actions')?.classList.add('hidden');
        }

        if (window.showToast) window.showToast('Session Deleted', 'Item removed from history.', 'info');
    };

    // Global function for mock chat interaction
    window.handleAiOptionSelection = function (el, selectionType) {
        const messagesArea = document.getElementById('ai-messages-area');
        window.aiModeState.expertise = selectionType;

        // Disable current options
        el.parentElement.querySelectorAll('.mcq-option').forEach(c => {
            c.style.pointerEvents = 'none';
            c.style.opacity = '0.5';
        });
        el.style.opacity = '1';
        el.style.borderColor = 'var(--accent-primary)';

        // User message
        const userHtml = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I consider my expertise level as: ${selectionType}.</p>
                </div>
            </div>
        `;
        messagesArea.insertAdjacentHTML('beforeend', userHtml);
        saveAiSession();

        // Update progress
        const progressFill = document.getElementById('ai-progress-fill');
        if (progressFill) progressFill.style.width = '28%';
        const steps = document.querySelectorAll('#ai-progress-steps li');
        if (steps.length > 2) {
            steps[1].classList.replace('active', 'completed');
            steps[2].classList.add('active');
        }

        // Final AI response for this mockup step
        setTimeout(() => {
            const aiResponseHtml = `
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Got it. Finally, which industry are you creating this for? This helps me apply professional templates and standards.</p>
                        <div class="mcq-options-container">
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'commercial')">
                                <div class="mcq-option-title">Commercial / Ads</div>
                                <div class="mcq-option-desc">Product focus, clean lighting.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'film')">
                                <div class="mcq-option-title">Film & TV</div>
                                <div class="mcq-option-desc">Cinematic, narrative storytelling.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'gaming')">
                                <div class="mcq-option-title">Gaming</div>
                                <div class="mcq-option-desc">Real-time engine, VFX heavy.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'architecture')">
                                <div class="mcq-option-title">Architecture</div>
                                <div class="mcq-option-desc">Photorealistic materials, spatial flow.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'music')">
                                <div class="mcq-option-title">Music Industry</div>
                                <div class="mcq-option-desc">Rhythmic, surreal, high contrast.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'publishing')">
                                <div class="mcq-option-title">Publishing</div>
                                <div class="mcq-option-desc">Editorial layout, storytelling.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            messagesArea.insertAdjacentHTML('beforeend', aiResponseHtml);
            messagesArea.scrollTop = messagesArea.scrollHeight;
            saveAiSession();
        }, 800);

        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    window.handleAiIndustrySelection = function (el, industryId) {
        const messagesArea = document.getElementById('ai-messages-area');
        window.aiModeState.industry = industryId;

        // Disable current options
        el.parentElement.querySelectorAll('.mcq-option').forEach(c => {
            c.style.pointerEvents = 'none';
            c.style.opacity = '0.5';
        });
        el.style.opacity = '1';
        el.style.borderColor = 'var(--accent-primary)';

        // User message
        const industryName = el.querySelector('.mcq-option-title').textContent;
        const userHtml = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I'm creating content for: ${industryName}.</p>
                </div>
            </div>
        `;
        messagesArea.insertAdjacentHTML('beforeend', userHtml);
        saveAiSession();

        // Update progress
        const progressFill = document.getElementById('ai-progress-fill');
        if (progressFill) progressFill.style.width = '42%';
        const steps = document.querySelectorAll('#ai-progress-steps li');
        if (steps.length > 3) {
            steps[2].classList.replace('active', 'completed');
            steps[3].classList.add('active');
        }

        // Final AI response to accept platform
        setTimeout(() => {
            const aiResponseHtml = `
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Perfect. I've configured the parameters for the ${industryName} industry. Now, which AI platform are you targeting for <strong>${window.aiModeState.modality}</strong> generation? Each platform has specific technical limits and styles.</p>
                        <div class="mcq-options-container">
                            ${buildPlatformOptions(window.aiModeState.modality)}
                        </div>
                    </div>
                </div>
            `;
            messagesArea.insertAdjacentHTML('beforeend', aiResponseHtml);
            messagesArea.scrollTop = messagesArea.scrollHeight;
            saveAiSession();
        }, 800);

        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    window.handleAiPlatformSelection = function (el, platformId) {
        const messagesArea = document.getElementById('ai-messages-area');
        window.aiModeState.platform = platformId;

        // Disable current options
        el.parentElement.querySelectorAll('.mcq-option').forEach(c => {
            c.style.pointerEvents = 'none';
            c.style.opacity = '0.5';
        });
        el.style.opacity = '1';
        el.style.borderColor = 'var(--accent-primary)';

        // User message
        const platformName = el.querySelector('.mcq-option-title').textContent;
        const userHtml = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I'm targeting the ${platformName} platform.</p>
                </div>
            </div>
        `;
        messagesArea.insertAdjacentHTML('beforeend', userHtml);
        saveAiSession();

        // Update progress
        const progressFill = document.getElementById('ai-progress-fill');
        if (progressFill) progressFill.style.width = '57%';
        const steps = document.querySelectorAll('#ai-progress-steps li');
        if (steps.length > 4) {
            steps[3].classList.replace('active', 'completed');
            steps[4].classList.add('active');
        }

        // Final AI response to accept prompt
        setTimeout(() => {
            const aiResponseHtml = `
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Excellent. I've tailored the optimization logic for ${platformName}. Now, briefly describe the subject and setting of your scene in the input box below.</p>
                    </div>
                </div>
            `;
            messagesArea.insertAdjacentHTML('beforeend', aiResponseHtml);
            messagesArea.scrollTop = messagesArea.scrollHeight;
            document.getElementById('ai-chat-input').focus();
            saveAiSession();
        }, 800);

        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    // Platform options per modality (latest models as of 2026)
    const MODALITY_PLATFORMS = {
        'Video': [
            { id: 'veo', name: 'Google Veo 3', desc: 'Cinematic quality, 60s generation, native audio sync.' },
            { id: 'sora', name: 'OpenAI Sora', desc: 'Highly realistic, complex scene physics.' },
            { id: 'runway', name: 'Runway Gen-4', desc: 'Artistic control, reference image support.' },
            { id: 'luma', name: 'Luma Ray 2', desc: 'Rapid generation, high motion fidelity.' },
            { id: 'kling', name: 'Kling 2.0', desc: 'Superior character physics and lip-sync.' }
        ],
        'Image': [
            { id: 'midjourney', name: 'Midjourney v7', desc: 'Best overall quality, rich aesthetic styles.' },
            { id: 'flux', name: 'FLUX 1.1 Pro Ultra', desc: 'Photorealistic, exceptional detail and realism.' },
            { id: 'ideogram', name: 'Ideogram 3.0', desc: 'Best-in-class text rendering in images.' },
            { id: 'dalle', name: 'DALL-E 3', desc: 'OpenAI multimodal, strong prompt adherence.' },
            { id: 'stable', name: 'Stable Diffusion 3.5', desc: 'Open-source, full local control.' }
        ],
        'Music': [
            { id: 'suno', name: 'Suno v4', desc: 'Full song generation with vocals and custom lyrics.' },
            { id: 'udio', name: 'Udio v2', desc: 'High-fidelity music with fine-grained style control.' },
            { id: 'musicgen', name: 'MusicGen Large', desc: 'Meta open-source, melody-conditioned generation.' },
            { id: 'stable_audio', name: 'Stable Audio 2.0', desc: 'Long-form audio with timed generation.' },
            { id: 'mmaudio', name: 'MMAudio', desc: 'Synchronized audio generation for video clips.' }
        ],
        '3D Model': [
            { id: 'tripo3d', name: 'TripoAI Tripo3D', desc: 'Fast, high-quality 3D mesh from text or image.' },
            { id: 'meshy', name: 'Meshy 4', desc: 'Game-ready assets with automatic UV texture generation.' },
            { id: 'rodin', name: 'Hyper3D Rodin Gen-2', desc: 'Studio-grade 3D characters and complex assets.' },
            { id: 'shap_e', name: 'OpenAI Shap-E', desc: 'Open-source implicit 3D representations.' },
            { id: 'trellis', name: 'TRELLIS (Microsoft)', desc: '3D Gaussian and mesh from single image.' }
        ],
        'Text': [
            { id: 'gpt4o', name: 'GPT-4o', desc: 'OpenAI flagship, versatile creative and technical writing.' },
            { id: 'claude', name: 'Claude 3.7 Sonnet', desc: 'Best for long-form, nuanced creative writing.' },
            { id: 'gemini', name: 'Gemini 2.0 Flash', desc: 'Speed-optimized with native multimodal context.' },
            { id: 'llama', name: 'Llama 3.3 70B', desc: 'Powerful open-source, fully local capable.' },
            { id: 'mistral', name: 'Mistral Large 2', desc: 'Strong instruction following for structured prompts.' }
        ],
        'Audio/SFX': [
            { id: 'elevenlabs', name: 'ElevenLabs v3', desc: 'Ultra-realistic voice cloning and sound effects.' },
            { id: 'audioldm', name: 'AudioLDM 2', desc: 'Text-to-audio for sound effects and ambience.' },
            { id: 'audiogen', name: 'AudioGen XL', desc: 'Meta model for general audio from text descriptions.' },
            { id: 'aero', name: 'Aero (Stability AI)', desc: 'High-quality short sound effect generation.' },
            { id: 'bark', name: 'Bark v2', desc: 'Open-source voice, music, and ambient audio.' }
        ],
        'Animation': [
            { id: 'adobe_firefly', name: 'Adobe Firefly Video', desc: 'Professional animation tools, IP-safe content.' },
            { id: 'pika', name: 'Pika 2.2', desc: 'Character animation with cinematic scene transitions.' },
            { id: 'viggle', name: 'Viggle AI', desc: 'Physics-based character motion and animation.' },
            { id: 'haiper', name: 'Haiper 2.0', desc: 'Cinematic animation with consistent motion coherence.' },
            { id: 'minimax', name: 'MiniMax Video-01', desc: 'Long consistent animated sequence generation.' }
        ],
        'VR/AR': [
            { id: 'unity', name: 'Unity AI (Muse)', desc: 'Generative AI for real-time 3D and XR experiences.' },
            { id: 'nvidia_omniverse', name: 'NVIDIA Omniverse', desc: 'Professional XR simulation and scene generation.' },
            { id: 'meta_xr', name: 'Meta AI (XR Suite)', desc: 'Optimized for Quest VR social experiences.' },
            { id: 'apple_create', name: 'Apple RealityKit AI', desc: 'Best for Apple Vision Pro AR scenes.' },
            { id: 'polycam', name: 'Polycam AI', desc: 'Real-world to 3D scan for precise AR placement.' }
        ],
        'Motion Graphics': [
            { id: 'runway', name: 'Runway Gen-4', desc: 'Motion graphics generation with keyframe control.' },
            { id: 'pika_effects', name: 'Pika 2.2 Effects', desc: 'Rapid motion effects and animated transitions.' },
            { id: 'krea', name: 'Krea AI Realtime', desc: 'Live motion design with real-time canvas.' },
            { id: 'jitter', name: 'Jitter AI', desc: 'Animated UI components and micro-animation loops.' },
            { id: 'spline', name: 'Spline AI', desc: '3D motion graphics with interactive web export.' }
        ]
    };

    function buildPlatformOptions(modality) {
        const platforms = MODALITY_PLATFORMS[modality] || MODALITY_PLATFORMS['Video'];
        return platforms.map(p => `
            <div class="mcq-option" onclick="handleAiPlatformSelection(this, '${p.id}')">
                <div class="mcq-option-title">${p.name}</div>
                <div class="mcq-option-desc">${p.desc}</div>
            </div>
        `).join('');
    }

    // AI Chat Input Submission Logic
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');

    if (aiChatSend && aiChatInput) {
        aiChatSend.addEventListener('click', async () => {
            const text = aiChatInput.value.trim();
            if (!text) return;

            // Ensure modality, expertise, industry and platform are set
            if (!window.aiModeState?.modality || !window.aiModeState?.expertise || !window.aiModeState?.industry || !window.aiModeState?.platform) {
                if (window.showToast) window.showToast('Incomplete Setup', 'Please complete the setup steps first.', 'warning');
                return;
            }

            const messagesArea = document.getElementById('ai-messages-area');

            // Append user message
            const userHtml = `
                <div class="chat-message user-message">
                    <div class="message-content">
                        <p>${text}</p>
                    </div>
                </div>
            `;
            messagesArea.insertAdjacentHTML('beforeend', userHtml);
            aiChatInput.value = '';
            messagesArea.scrollTop = messagesArea.scrollHeight;
            saveAiSession();

            // Add AI Loading Bubble
            const loadingId = 'ai-loading-' + Date.now();
            const loadingHtml = `
                <div class="chat-message ai-message" id="${loadingId}">
                    <div class="message-content">
                        <p class="typing-indicator">Working...</p>
                    </div>
                </div>
            `;
            messagesArea.insertAdjacentHTML('beforeend', loadingHtml);
            messagesArea.scrollTop = messagesArea.scrollHeight;
            aiChatSend.disabled = true;

            try {
                // Call LLM
                const responseStr = await window.llmService.generateAiModePrompt(
                    window.aiModeState.modality,
                    window.aiModeState.expertise,
                    window.aiModeState.industry,
                    window.aiModeState.platform,
                    text
                );

                // Parse JSON response safely
                let responseData;
                try {
                    responseData = JSON.parse(responseStr);
                } catch (parseErr) {
                    console.error('Failed to parse AI JSON', responseStr);
                    throw new Error("AI returned malformed data. Please try again.");
                }

                // Format output
                const aiResponseHtml = `
                    <div class="chat-message ai-message">
                        <div class="message-content">
                            <p>${responseData.message}</p>
                            <pre><code class="language-json" style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; display: block; margin-top: 10px; color: #a1e261;">${JSON.stringify(responseData.prompt_data, null, 2)}</code></pre>
                        </div>
                    </div>
                `;

                document.getElementById(loadingId).remove();
                messagesArea.insertAdjacentHTML('beforeend', aiResponseHtml);

                // Populate the Output JSON section automatically
                const outputJson = document.getElementById('output-json');
                if (outputJson && responseData.prompt_data) {
                    outputJson.value = JSON.stringify(responseData.prompt_data, null, 2);
                    // Highlight or pulse effect to show update? Optional, but professional
                    outputJson.classList.add('pulse-effect');
                    setTimeout(() => outputJson.classList.remove('pulse-effect'), 2000);
                }

                saveAiSession();

                // Update Progress bar to 100%
                const progressFill = document.getElementById('ai-progress-fill');
                if (progressFill) progressFill.style.width = '100%';
                const steps = document.querySelectorAll('#ai-progress-steps li');
                if (steps.length > 5) {
                    steps[3].classList.replace('active', 'completed');
                    steps[4].classList.add('completed');
                    steps[5].classList.add('completed');
                }

            } catch (error) {
                const el = document.getElementById(loadingId);
                if (el) el.remove();

                const errHtml = `
                    <div class="chat-message ai-message">
                        <div class="message-content" style="border-color: #ff3b3b;">
                            <p style="color: #ff3b3b;">Error: ${error.message}</p>
                        </div>
                    </div>
                `;
                messagesArea.insertAdjacentHTML('beforeend', errHtml);
            } finally {
                aiChatSend.disabled = false;
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
        });

        // Allow Enter to send
        aiChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                aiChatSend.click();
            }
        });
    }




    /* ============================
        Sidebar Menu Logic
       ============================ */
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sidebarResetBtn = document.getElementById('sidebar-reset-btn');
    const sidebarExportBtn = document.getElementById('sidebar-export-btn');

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        gaTracker.trackEvent('sidebar_open');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    window.closeSidebar = closeSidebar;

    hamburgerBtn.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const sectionId = link.dataset.section;
            if (sectionId) {
                e.preventDefault();
                switchSection(sectionId);
            }
            // Always close sidebar when a link is clicked
            closeSidebar();
        });
    });

    if (sidebarResetBtn) {
        sidebarResetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gaTracker.trackEvent('sidebar_action', { action: 'reset' });
            closeSidebar();
            document.getElementById('reset-btn')?.click();
        });
    }

    if (sidebarExportBtn) {
        sidebarExportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gaTracker.trackEvent('sidebar_action', { action: 'export' });
            closeSidebar();
            document.getElementById('download-btn')?.click();
        });
    }

    // Tab visibility analytics
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            gaTracker.trackEvent('tab_wake_up');
        }
    });


    // Initialize Services
    const feedbackService = new FeedbackService(gaTracker);

    // Initialize History Service early
    const historyService = new HistoryService(); // Ensure HistoryService.js is loaded before app.js in HTML

    /* ============================
        Feedback Logic
       ============================ */
    const feedbackModal = document.getElementById('feedback-modal');
    const feedbackBtn = document.getElementById('sidebar-feedback-btn');
    const feedbackClose = document.getElementById('feedback-close-btn');
    const feedbackCancel = document.getElementById('feedback-cancel-btn');
    const feedbackSubmit = document.getElementById('feedback-submit-btn');
    const feedbackTypeChips = document.querySelectorAll('#feedback-type-chips .chip');
    let feedbackType = 'bug';

    function openFeedback() {
        if (feedbackModal) {
            feedbackModal.classList.remove('hidden');
            gaTracker.trackEvent('feedback_open');
            closeSidebar();
        }
    }

    function closeFeedback() {
        if (feedbackModal) feedbackModal.classList.add('hidden');
    }

    const footerFeedbackBtn = document.getElementById('footer-feedback-btn');

    if (feedbackBtn) feedbackBtn.addEventListener('click', openFeedback);
    if (footerFeedbackBtn) footerFeedbackBtn.addEventListener('click', openFeedback);
    if (feedbackClose) feedbackClose.addEventListener('click', closeFeedback);
    if (feedbackCancel) feedbackCancel.addEventListener('click', closeFeedback);

    feedbackTypeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            feedbackTypeChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            feedbackType = chip.dataset.value;
        });
    });

    if (feedbackSubmit) {
        feedbackSubmit.addEventListener('click', async () => {
            const msg = document.getElementById('feedback-message').value;
            if (!msg.trim()) {
                showToast('Error', 'Please enter a message.', 'error');
                return;
            }

            feedbackSubmit.classList.add('loading');
            try {
                await feedbackService.submitFeedback(feedbackType, msg);
                showToast('Feedback Sent', 'Thank you for your feedback!', 'success');
                gaTracker.trackEvent('submit_feedback', { type: feedbackType });
                document.getElementById('feedback-message').value = '';
                closeFeedback();
            } catch (err) {
                showToast('Error', 'Failed to send feedback.', 'error');
            } finally {
                feedbackSubmit.classList.remove('loading');
            }
        });
    }


    // Initialize Global Parameters Service
    let globalParams;
    try {
        globalParams = new GlobalParamsService();
    } catch (e) {
        console.error('GlobalParamsService Init Error:', e);
        // Fallback mock to prevent crashes in dependent code
        globalParams = {
            getParams: () => ({ platform_preset: 'veo', aspect_ratio: '16:9', resolution: '1080p', frame_rate: '24' }),
            updateParam: () => false,
            resetDefaults: () => ({}),
            modelService: { validateContent: () => ({ safe: true }), validateParams: () => ({ valid: true }) }
        };
    }

    // Global Params Dropdown Configuration
    const globalDropdowns = [
        { key: 'aspect_ratio', wrapperId: 'global-aspect-ratio-dropdown', inputId: 'global-aspect-ratio', displayId: 'global-aspect-ratio-display' },
        { key: 'resolution', wrapperId: 'global-resolution-dropdown', inputId: 'global-resolution', displayId: 'global-resolution-display' },
        { key: 'frame_rate', wrapperId: 'global-frame-rate-dropdown', inputId: 'global-frame-rate', displayId: 'global-frame-rate-display' },
        { key: 'platform_preset', wrapperId: 'global-platform-dropdown', inputId: 'global-platform', displayId: 'global-platform-display' }
    ];

    // Bind Dropdown Events
    globalDropdowns.forEach(conf => {
        const wrapper = document.getElementById(conf.wrapperId);
        if (!wrapper) return;

        const trigger = wrapper.querySelector('.dropdown-trigger');
        const menu = wrapper.querySelector('.dropdown-menu');
        const input = document.getElementById(conf.inputId);
        const display = document.getElementById(conf.displayId);

        // Toggle Dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other global dropdowns
            globalDropdowns.forEach(other => {
                if (other.wrapperId !== conf.wrapperId) {
                    document.getElementById(other.wrapperId)?.classList.remove('open');
                }
            });
            wrapper.classList.toggle('open');
        });

        // Select Item
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const val = item.dataset.value;
                const text = item.textContent;

                // Update UI
                display.textContent = text;
                menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');

                // Update State
                input.value = val;
                globalParams.updateParam(conf.key, val);
                gaTracker.trackEvent('parameter_change', {
                    param: conf.key,
                    value: val
                });

                // Update UI Capabilities
                updateModelUI();
                saveWork(); // Auto-save on global change

                // Close
                wrapper.classList.remove('open');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        globalDropdowns.forEach(conf => {
            document.getElementById(conf.wrapperId)?.classList.remove('open');
        });
    });

    function syncGlobalUI() {
        const params = globalParams.getParams();

        const updateDropdownUI = (conf, val) => {
            const wrapper = document.getElementById(conf.wrapperId);
            const input = document.getElementById(conf.inputId);
            const display = document.getElementById(conf.displayId);

            if (wrapper && input && display) {
                input.value = val;
                const item = wrapper.querySelector(`.dropdown-item[data-value="${val}"]`);
                if (item) {
                    display.textContent = item.textContent;
                    wrapper.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                    item.classList.add('selected');
                }
            }
        };

        updateDropdownUI(globalDropdowns[0], params.aspect_ratio);
        updateDropdownUI(globalDropdowns[1], params.resolution);
        updateDropdownUI(globalDropdowns[2], params.frame_rate);
        updateDropdownUI(globalDropdowns[3], params.platform_preset);

        updateModelUI(); // Update UI capabilities based on model
    }

    // Update UI based on Model Capabilities
    function updateModelUI() {
        const params = globalParams.getParams();
        const modelId = params.platform_preset;
        const service = globalParams.modelService;

        // 1. Negative Prompts
        const supportsNeg = service.supports(modelId, 'supportsNegativePrompt');

        // Comprehensive selector to find the Negative Prompt group
        // We look for both the input class and a potential container class for robustness
        document.querySelectorAll('.scene-input[data-id="negative_prompt"]').forEach(el => {
            const container = el.closest('.form-group');
            if (container) {
                const prevSibling = container.previousElementSibling;
                if (supportsNeg) {
                    container.classList.remove('hidden');
                    // Ensure the previous group has its separator if this one is visible
                    if (prevSibling) prevSibling.classList.remove('no-separator');
                } else {
                    container.classList.add('hidden');
                    // Hide the separator of the group above if this one is hidden to avoid double lines/spacing
                    if (prevSibling) prevSibling.classList.add('no-separator');
                }
            }
        });

        const supportsCam = service.supports(modelId, 'supportsCameraControls');
        document.querySelectorAll('.scene-input[data-id="camera"]').forEach(el => {
            const container = el.closest('.form-group');
            if (container) {
                if (supportsCam) {
                    container.classList.remove('disabled-group');
                    el.disabled = false;
                    container.style.opacity = '1';
                    container.style.pointerEvents = 'auto';
                } else {
                    container.classList.add('disabled-group');
                    el.disabled = true;
                    container.style.opacity = '0.5';
                    container.style.pointerEvents = 'none';
                }
            }
        });
    }

    // Listener for Auto-Corrections
    window.addEventListener('global-params-corrected', (e) => {
        const violations = e.detail.violations;
        // Create a user-friendly message
        const msgList = violations.map(v => `• ${v.message}`).join('<br>');
        showToast('Settings Adjusted', msgList, 'warning', 6000);
        gaTracker.trackEvent('settings_auto_adjusted', {
            violation_count: violations.length
        });
        syncGlobalUI();
        updateModelUI();
    });

    // Initial Sync
    syncGlobalUI();

    const resetGlobalBtn = document.getElementById('reset-global-params');
    if (resetGlobalBtn) {
        resetGlobalBtn.addEventListener('click', () => {
            if (confirm('Reset all global parameters to defaults?')) {
                globalParams.resetDefaults();
                syncGlobalUI();
                showToast('Global Parameters Reset', 'All global settings have been restored to defaults.', 'info');
            }
        });
    }

    let sceneCount = 1;

    // Add Scene Function
    addSceneBtn.addEventListener('click', () => {
        sceneCount++;
        const sceneId = sceneCount;
        gaTracker.trackEvent('add_scene', {
            scene_id: sceneId
        });

        const scenePanel = document.createElement('scene-control-panel');
        scenePanel.setAttribute('scene-id', sceneId);
        scenesContainer.appendChild(scenePanel);

        // Ensure the new scene respects model capabilities
        updateModelUI();
    });

    document.addEventListener('sceneRemoved', (e) => {
        updateSceneNumbers();
        saveWork(); // Auto-save on removal
    });

    function updateSceneNumbers() {
        const scenes = scenesContainer.querySelectorAll('scene-control-panel');
        scenes.forEach((scene, index) => {
            const title = scene.querySelector('.scene-title');
            if (title) {
                title.textContent = `Scene ${index + 1}`;
            }
        });
        sceneCount = scenes.length;
    }

    // Reset Generator Function
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the generator? All current work will be lost.')) {
                gaTracker.trackEvent('reset_generator');
                // 1. Clear first scene
                const firstScene = scenesContainer.querySelector('scene-control-panel[scene-id="1"]');
                if (firstScene) {
                    const emptyValues = {};
                    Object.keys(firstScene.values).forEach(k => emptyValues[k] = '');
                    firstScene.setValues(emptyValues);
                }

                // 2. Remove all other scenes
                const otherScenes = scenesContainer.querySelectorAll('scene-control-panel:not([scene-id="1"])');
                otherScenes.forEach(s => s.remove());

                // 3. Reset count
                sceneCount = 1;

                // 4. Reset Output Area
                outputArea.value = JSON.stringify({
                    platform: "veo",
                    prompt: "Waiting for input...",
                    parameters: {
                        aspect_ratio: "16:9",
                        resolution: "1080p"
                    }
                }, null, 2);

                localStorage.removeItem(AUTO_SAVE_KEY);
                showToast('Generator Reset', 'All scenes and outputs have been cleared.', 'info');
            }
        });
    }

    // Auto-Save Logic
    const AUTO_SAVE_KEY = 'json_prompt_gen_autosave';

    function saveWork() {
        const scenes = [];
        const scenePanels = scenesContainer.querySelectorAll('scene-control-panel');

        scenePanels.forEach(panel => {
            scenes.push(panel.getValues());
        });

        const data = {
            scenes: scenes,
            globalParams: globalParams.getParams(),
            timestamp: Date.now()
        };

        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
        // console.log('Work auto-saved');
    }

    function restoreWork() {
        const saved = localStorage.getItem(AUTO_SAVE_KEY);
        if (!saved) return;

        try {
            const data = JSON.parse(saved);

            // Restore Global Params
            if (data.globalParams) {
                Object.keys(data.globalParams).forEach(key => {
                    globalParams.updateParam(key, data.globalParams[key]);
                });
                syncGlobalUI();
            }

            // Restore Scenes
            if (data.scenes && data.scenes.length > 0) {
                // Clear existing (except first if we reuse it)
                scenesContainer.innerHTML = '';

                // Reset counter so addSceneBtn starts from 1
                sceneCount = 0;

                data.scenes.forEach(sceneData => {
                    // Reuse add scene logic - let it handle ID generation
                    addSceneBtn.click();
                    const newScene = scenesContainer.lastElementChild;

                    if (newScene && typeof newScene.setValues === 'function') {
                        // Use the web component's native restore method directly
                        newScene.setValues(sceneData);
                    }
                });

                showToast('Work Restored', 'Your previous session has been restored.', 'success');
            }
        } catch (e) {
            console.error('Failed to restore work:', e);
        }
    }

    // Attach Auto-Save to Inputs
    // We delegate change/input events on the container
    scenesContainer.addEventListener('input', () => {
        saveWork();
    });

    // Also save on global param changes (handled in globalParamsService but likely need explicit trigger here or hook)
    // For now, we rely on the fact that global params are saved to their own storage, 
    // BUT our restoreWork loads them from auto-save. behavior might be redundant but safe.
    // Let's hook into the global-params-corrected event or just save when we can.
    // Actually, globalParamsService saves to its own key. 
    // But "Scenes" are the main risk.

    // Attempt restore on load
    restoreWork();


    // Generate JSON logic
    generateBtn.addEventListener('click', async () => {
        saveWork(); // Save before generating
        // Cinematic Loading Effect
        generateBtn.classList.add('loading');
        await new Promise(r => setTimeout(r, 600)); // Short cinematic delay

        try {
            const scenes = [];
            const sceneElements = scenesContainer.querySelectorAll('scene-control-panel');

            sceneElements.forEach(sceneEl => {
                const values = sceneEl.getValues();
                const description = values.description || '';

                // Only add if description exists
                if (description.trim()) {
                    const params = {};
                    // Dynamically map all available schema parameters
                    Object.keys(values).forEach(k => {
                        if (k !== 'description' && k !== 'negative' && values[k]) {
                            params[k] = values[k];
                        }
                    });

                    scenes.push({
                        description: description.trim(),
                        negative_prompt: values.negative || null,
                        parameters: Object.keys(params).length > 0 ? params : undefined
                    });
                }
            });

            if (scenes.length === 0) {
                showToast('Empty Prompt', 'Please add at least one scene description.', 'warning');
                return;
            }

            // --- Safety Check (Master Mode) ---
            const safetyCheck = globalParams.modelService.validateContent(JSON.stringify(scenes));
            if (!safetyCheck.safe) {
                showToast('Safety Violation', `Content contains prohibited terms: ${safetyCheck.flagged.join(', ')}`, 'error');
                return;
            }

            // --- Dual Mode Logic ---
            const modeInput = document.querySelector('input[name="gen-mode"]:checked');
            const mode = modeInput ? modeInput.value : 'json';

            const currentGlobalParams = globalParams.getParams();

            // Base output structure
            const outputStructure = {
                platform: currentGlobalParams.platform_preset,
                version: "1.0",
                scenes: [],
                global_parameters: {
                    aspect_ratio: currentGlobalParams.aspect_ratio,
                    resolution: currentGlobalParams.resolution,
                    frame_rate: currentGlobalParams.frame_rate
                }
            };

            if (mode === 'ai') {
                // AI Mode
                const configured = llmService.getConfiguredProviders();
                if (configured.length === 0) {
                    showToast('Configuration Required', 'Please configure an AI provider in the integration hub first.', 'warning');
                    return;
                }

                const providerId = configured[0];
                generateBtn.disabled = true;

                try {
                    const jsonStr = await llmService.generateFullJson(providerId, scenes);
                    let enhancedScenes;

                    try {
                        enhancedScenes = JSON.parse(jsonStr);
                    } catch (e) {
                        throw new Error('Failed to parse AI response as valid JSON.');
                    }

                    outputStructure.scenes = enhancedScenes;

                    // Format Payload using Template Engine
                    const finalPayload = globalParams.modelService.formatPayload(currentGlobalParams.platform_preset, outputStructure);
                    outputArea.value = JSON.stringify(finalPayload, null, 2);

                    if (historyService) historyService.save(finalPayload, 'ai');
                    gaTracker.trackGeneration(scenes.length, 'ai', currentGlobalParams.platform_preset);
                    showToast('AI Generation Complete', 'Enhanced JSON prompt generated successfully!', 'success');
                    document.getElementById('output-section').classList.remove('hidden');
                    document.getElementById('output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

                } catch (e) {
                    console.error('AI Gen Error:', e);
                    showToast('Generation Failed', e.message, 'error');
                } finally {
                    generateBtn.disabled = false;
                }

            } else {
                // JSON Mode (Standard)
                outputStructure.scenes = scenes;

                // Format Payload using Template Engine
                const finalPayload = globalParams.modelService.formatPayload(currentGlobalParams.platform_preset, outputStructure);
                outputArea.value = JSON.stringify(finalPayload, null, 2);

                // Save to History
                if (historyService) historyService.save(finalPayload, 'json');
                gaTracker.trackGeneration(scenes.length, 'json', currentGlobalParams.platform_preset);

                showToast('Success', 'JSON generated successfully!', 'success');
                document.getElementById('output-section').classList.remove('hidden');
                document.getElementById('output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (error) {
            console.error('Generation Error:', error);
            showToast('Error', 'An unexpected error occurred.', 'error');
        } finally {
            generateBtn.classList.remove('loading');
        }
    });

    // Copy Content
    document.getElementById('copy-btn').addEventListener('click', () => {
        const text = outputArea.value;
        if (!text || text.includes('Waiting for input...')) {
            showToast('No Content', 'Generate a prompt first.', 'warning');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied', 'JSON prompt copied to clipboard!', 'success');
            gaTracker.trackEvent('copy_json');
        }).catch(err => {
            showToast('Error', 'Failed to copy to clipboard.', 'error');
        });
    });

    // Download Content
    document.getElementById('download-btn').addEventListener('click', () => {
        const text = outputArea.value;
        if (!text || text.includes('Waiting for input...')) {
            showToast('No Content', 'Generate a prompt first.', 'warning');
            return;
        }
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `veo-prompt-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Downloaded', 'JSON file downloaded successfully.', 'success');
        gaTracker.trackEvent('download_json');
    });

    /* ============================
        Cinematic Dictionary Logic
       ============================ */
    const dictionaryService = new DictionaryService();
    const dictionarySection = document.getElementById('dictionary-section');
    const generatorSection = document.getElementById('generator-section');
    const outputSection = document.getElementById('output-section');
    const navLinks = document.querySelectorAll('.main-nav a');
    const dictContentArea = document.getElementById('dict-content');
    const dictCategoryList = document.getElementById('dict-category-list');
    const dictSearchInput = document.getElementById('dict-search');
    const dictActiveCategoryTitle = document.getElementById('dict-active-category-title');

    const dictSidebar = document.getElementById('dict-sidebar');
    const dictSidebarOverlay = document.getElementById('dict-sidebar-overlay');
    const dictHamburgerBtn = document.getElementById('dict-hamburger-btn');
    const dictSidebarClose = document.getElementById('dict-sidebar-close');

    function openDictSidebar() {
        dictSidebar?.classList.add('active');
        dictSidebarOverlay?.classList.add('active');
    }

    function closeDictSidebar() {
        dictSidebar?.classList.remove('active');
        dictSidebarOverlay?.classList.remove('active');
    }

    if (dictHamburgerBtn) dictHamburgerBtn.addEventListener('click', openDictSidebar);
    if (dictSidebarClose) dictSidebarClose.addEventListener('click', closeDictSidebar);
    if (dictSidebarOverlay) dictSidebarOverlay.addEventListener('click', closeDictSidebar);

    /* ============================
        LLM Integration Logic
       ============================ */
    const llmService = new LLMService();
    const llmSection = document.getElementById('llm-section');
    const aiEnhanceBtn = document.getElementById('ai-enhance-btn');
    const llmKeyModal = document.getElementById('llm-key-modal');
    const llmModalCloseBtn = document.getElementById('llm-modal-close-btn');
    const keyModalCancel = document.getElementById('key-modal-cancel');
    const keyModalSave = document.getElementById('key-modal-save');
    const providerApiKeyInput = document.getElementById('provider-api-key');
    const keyValidationStatus = document.getElementById('key-validation-status');
    const providerCards = document.querySelectorAll('.provider-card');
    const usageDashboard = document.querySelector('.usage-dashboard');

    let currentSetupProvider = null;
    let selectedModelId = null;

    // Initialize LLM Service
    llmService.init().then(() => {
        updateLLMUI();
    });

    // Modal Elements
    const contributionModal = document.getElementById('contribution-modal');
    const contributeBtn = document.getElementById('dict-contribute-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const contribCategorySelect = document.getElementById('contrib-category');
    const newCategoryCheck = document.getElementById('new-category-check');
    const newCategoryInput = document.getElementById('new-category-name');
    const contribDifficultyPills = document.getElementById('contrib-difficulty-pills');

    let activeCategoryId = null;

    // API Key Visibility Toggle
    const toggleApiKeyBtn = document.getElementById('toggle-api-key');
    if (toggleApiKeyBtn) {
        toggleApiKeyBtn.addEventListener('click', () => {
            const input = document.getElementById('provider-api-key');
            const eyeIcon = toggleApiKeyBtn.querySelector('.eye-icon');
            const eyeOffIcon = toggleApiKeyBtn.querySelector('.eye-off-icon');

            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.classList.add('hidden');
                eyeOffIcon.classList.remove('hidden');
            } else {
                input.type = 'password';
                eyeIcon.classList.remove('hidden');
                eyeOffIcon.classList.add('hidden');
            }
        });
    }

    // Navigation Switcher Logic
    function switchSection(sectionId) {
        if (!sectionId) return;
        gaTracker.trackEvent('section_view', { section: sectionId });

        // Update Nav UI
        document.querySelectorAll('.main-nav a').forEach(l => {
            if (l.dataset.section === sectionId) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });

        // Update Sidebar Nav UI
        document.querySelectorAll('.sidebar-link').forEach(l => {
            if (l.dataset.section === sectionId) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });

        // Hide all sections and heroes
        document.querySelectorAll('section').forEach(sect => sect.classList.add('hidden'));
        const mainHero = document.querySelector('.hero-section');
        const dictHero = document.querySelector('.dict-hero');

        mainHero?.classList.add('hidden');
        dictHero?.classList.add('hidden');

        // Show target section and related components
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        if (sectionId === 'generator-section') {
            mainHero?.classList.remove('hidden');
            document.getElementById('global-params-section')?.classList.remove('hidden');
            document.getElementById('output-section')?.classList.remove('hidden');
        } else if (sectionId === 'dictionary-section') {
            dictHero?.classList.remove('hidden');
            if (!dictionaryService.isInitialized) {
                dictionaryService.init().then(() => {
                    renderSidebarCategories();
                    populateModalCategories();

                    // Default selection: First available category
                    setTimeout(() => {
                        const firstCategoryLi = dictCategoryList?.querySelector('li');
                        if (firstCategoryLi) {
                            firstCategoryLi.querySelector('.category-name').click();
                        }
                    }, 100);
                });
            }
        } else if (sectionId === 'llm-section') {
            updateLLMUI();
        } else if (sectionId === 'history-section') {
            if (typeof renderHistoryView === 'function') {
                renderHistoryView('section');
            }

        }
    }

    // Expose for external access
    window.switchSection = switchSection;

    // Bind Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const sectionId = link.dataset.section;
            if (sectionId) {
                e.preventDefault();
                switchSection(sectionId);
            }
        });
    });

    // Render Sidebar Categories
    function renderSidebarCategories() {
        if (!dictCategoryList) return;
        dictCategoryList.innerHTML = '';

        const categories = dictionaryService.getAllCategories();

        categories.forEach(cat => {
            const li = document.createElement('li');
            const isUserCategory = dictionaryService.isCategoryUserCreated(cat.id);
            if (isUserCategory) li.classList.add('user-category');

            // Create category name span
            const nameSpan = document.createElement('span');
            nameSpan.textContent = cat.name;
            nameSpan.className = 'category-name';
            li.appendChild(nameSpan);

            // Add delete button for user-created categories
            if (isUserCategory) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'category-delete-btn';
                deleteBtn.title = 'Delete Category';
                deleteBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                `;
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleDeleteCategory(cat.id);
                });
                li.appendChild(deleteBtn);
            }

            li.dataset.catId = cat.id;
            nameSpan.addEventListener('click', () => {
                dictCategoryList.querySelectorAll('li').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
                activeCategoryId = cat.id;
                dictActiveCategoryTitle.textContent = cat.name;
                renderTermsByCategory(cat.id);
                closeDictSidebar();
            });
            dictCategoryList.appendChild(li);
        });
    }

    // Render Terms
    function renderTermsByCategory(categoryId) {
        dictContentArea.innerHTML = '';

        if (!categoryId) {
            dictContentArea.innerHTML = '<div class="empty-state">Select a category from the sidebar to view terms</div>';
            return;
        }

        const terms = dictionaryService.getTermsByCategory(categoryId);
        terms.forEach(term => {
            const card = createEnhancedTermCard(term);
            dictContentArea.appendChild(card);
        });
    }

    function createEnhancedTermCard(term) {
        const div = document.createElement('div');
        const isUserTerm = dictionaryService.isUserCreated(term.id);
        div.className = `term-card ${isUserTerm ? 'user-term' : ''}`;
        div.dataset.termId = term.id;

        const examplesHtml = term.examples && term.examples.length > 0
            ? `<div class="term-examples">
                <h5>Examples:</h5>
                <ul>${term.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>
               </div>`
            : '';

        const difficultyClass = term.difficulty || 'beginner';
        const authorName = term.author || 'System';
        const likes = term.likes || 0;

        // Add edit/delete buttons for user-created terms
        const managementButtons = isUserTerm ? `
            <button class="term-manage-btn edit-btn" data-term-id="${term.id}" title="Edit Term">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <button class="term-manage-btn delete-btn" data-term-id="${term.id}" title="Delete Term">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        ` : '';

        div.innerHTML = `
            <div class="term-header">
                <h4 class="term-title">${term.name}</h4>
                <div class="term-header-right">
                    <span class="difficulty-badge ${difficultyClass}">${difficultyClass}</span>
                    ${managementButtons}
                </div>
            </div>
            <p class="term-definition">${term.definition}</p>
            ${examplesHtml}
            <div class="term-footer">
                <div class="term-author">By: <span>@${authorName}</span></div>
                <div class="term-actions">
                    <button class="term-action-btn like-btn" data-term-id="${term.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span class="like-count">${likes}</span>
                    </button>
                    <button class="btn-use-prompt" data-term-name="${term.name}">Use in Prompt</button>
                </div>
            </div>
        `;

        // Event Listeners
        const likeBtn = div.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => handleLike(term.id, likeBtn));

        const useBtn = div.querySelector('.btn-use-prompt');
        useBtn.addEventListener('click', () => handleUseInPrompt(term.name));

        // Management buttons for user-created terms
        if (isUserTerm) {
            const editBtn = div.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => handleEditTerm(term.id));

            const deleteBtn = div.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => handleDeleteTerm(term.id));
        }

        return div;
    }

    // Handle Like
    function handleLike(termId, btnElement) {
        // Toggle liked state visually
        btnElement.classList.toggle('liked');
        const countSpan = btnElement.querySelector('.like-count');
        gaTracker.trackEvent('dict_like_term', {
            term_id: termId,
            liked: btnElement.classList.contains('liked')
        });
        let currentLikes = parseInt(countSpan.textContent) || 0;

        if (btnElement.classList.contains('liked')) {
            currentLikes++;
        } else {
            currentLikes = Math.max(0, currentLikes - 1);
        }
        countSpan.textContent = currentLikes;

        // Persist to localStorage (simulated)
        const likedTerms = JSON.parse(localStorage.getItem('likedTerms') || '[]');
        if (btnElement.classList.contains('liked')) {
            if (!likedTerms.includes(termId)) likedTerms.push(termId);
        } else {
            const idx = likedTerms.indexOf(termId);
            if (idx > -1) likedTerms.splice(idx, 1);
        }
        localStorage.setItem('likedTerms', JSON.stringify(likedTerms));
    }

    // Handle Use in Prompt
    function handleUseInPrompt(termName) {
        // Find the first scene's description and append the term
        const firstSceneDesc = document.querySelector('.scene-description');

        if (firstSceneDesc) {
            // Update value
            const currentValue = firstSceneDesc.value;
            firstSceneDesc.value = currentValue ? `${currentValue}, ${termName}` : termName;
            gaTracker.trackEvent('dict_use_term', { term_name: termName });

            // Dispatch input event to ensure auto-generation/preview logic triggers
            firstSceneDesc.dispatchEvent(new Event('input', { bubbles: true }));

            // Switch to generator view by triggering the nav link click
            // This ensures centralized logic (showing global params, etc.) runs properly
            const generatorLink = Array.from(navLinks).find(l => l.textContent.trim() === 'JSON Generator');
            if (generatorLink) {
                generatorLink.click();
            } else {
                // Fallback for UI consistency
                document.querySelectorAll('section').forEach(sect => sect.classList.add('hidden'));
                generatorSection.classList.remove('hidden');
                document.getElementById('global-params-section')?.classList.remove('hidden');
                document.getElementById('output-section')?.classList.remove('hidden');
                document.querySelector('.hero-section')?.classList.remove('hidden');
                navLinks.forEach(l => l.classList.remove('active'));
                if (navLinks[0]) navLinks[0].classList.add('active');
            }

            if (typeof showToast === 'function') {
                showToast('Term Applied', `"${termName}" added to scene 1`, 'success');
            }
        } else {
            // No scene found, switch to generator and warn user
            const generatorLink = Array.from(navLinks).find(l => l.textContent.trim() === 'JSON Generator');
            if (generatorLink) generatorLink.click();

            if (typeof showToast === 'function') {
                showToast('No Active Scene', 'Add a scene first to use dictionary terms.', 'warning');
            }
        }
    }

    // Handle Edit Term
    let editingTermId = null;
    let editingCategoryId = null;

    function handleEditTerm(termId) {
        const result = dictionaryService.getTermById(termId);
        if (!result) return;

        const { term, categoryId } = result;
        editingTermId = termId;
        editingCategoryId = categoryId;

        // Populate modal with existing data
        document.getElementById('contrib-username').value = term.author || '';
        document.getElementById('contrib-term-name').value = term.name || '';
        document.getElementById('contrib-definition').value = term.definition || '';
        document.getElementById('contrib-examples').value = term.examples ? term.examples.join(', ') : '';

        // Set category in dropdown
        selectedCategoryId = categoryId;
        const category = dictionaryService.getAllCategories().find(c => c.id === categoryId);
        if (category) {
            dropdownValue.textContent = category.name;
        }

        // Set difficulty
        const difficultyPills = contribDifficultyPills.querySelectorAll('.pill');
        difficultyPills.forEach(pill => {
            pill.classList.remove('active');
            if (pill.dataset.value === term.difficulty) {
                pill.classList.add('active');
            }
        });

        // Update modal title and button
        document.querySelector('.modal-header h3').textContent = 'Edit Term';
        modalSubmitBtn.textContent = 'Update Term';

        contributionModal.classList.remove('hidden');
    }

    // Handle Delete Term
    function handleDeleteTerm(termId) {
        if (!confirm('Are you sure you want to delete this term? This action cannot be undone.')) {
            return;
        }

        const result = dictionaryService.getTermById(termId);
        if (!result) return;

        const { categoryId } = result;
        if (dictionaryService.deleteTerm(categoryId, termId)) {
            gaTracker.trackEvent('dict_delete_term', { term_id: termId, category_id: categoryId });
            // Refresh view if viewing this category
            if (activeCategoryId === categoryId) {
                renderTermsByCategory(categoryId);
            }
        }
    }

    // Handle Delete Category
    function handleDeleteCategory(categoryId) {
        const category = dictionaryService.getAllCategories().find(c => c.id === categoryId);
        const categoryName = category ? category.name : 'this category';

        if (!confirm(`Are you sure you want to delete "${categoryName}"? All terms in this category will also be deleted. This action cannot be undone.`)) {
            return;
        }

        if (dictionaryService.deleteCategory(categoryId)) {
            renderSidebarCategories();
            populateModalCategories(); // Refresh dropdown menu

            // If viewing deleted category, clear content
            if (activeCategoryId === categoryId) {
                activeCategoryId = null;
                dictActiveCategoryTitle.textContent = 'Select a Category';
                dictContentArea.innerHTML = '<div class="empty-state">Select a category from the sidebar to view terms</div>';
            }
        }
    }

    // Search Logic
    if (dictSearchInput) {
        dictSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            if (query.length > 0) {
                dictCategoryList?.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                dictActiveCategoryTitle.textContent = `Search: "${query}"`;

                const results = dictionaryService.searchTerm(query);
                gaTracker.trackEvent('dict_search', { query: query, result_count: results.length });
                renderSearchResults(results);
            } else {
                if (activeCategoryId) {
                    const cat = dictionaryService.getAllCategories().find(c => c.id === activeCategoryId);
                    dictActiveCategoryTitle.textContent = cat ? cat.name : 'Select a Category';
                    renderTermsByCategory(activeCategoryId);
                } else {
                    dictActiveCategoryTitle.textContent = 'Select a Category';
                    dictContentArea.innerHTML = '<div class="empty-state">Select a category from the sidebar to view terms</div>';
                }
            }
        });
    }

    function renderSearchResults(results) {
        dictContentArea.innerHTML = '';

        if (results.length === 0) {
            dictContentArea.innerHTML = '<div class="empty-state">No terms found matching your query.</div>';
            return;
        }

        results.forEach(group => {
            const header = document.createElement('div');
            header.className = 'search-category-header';
            header.textContent = group.categoryName;
            dictContentArea.appendChild(header);

            group.terms.forEach(term => {
                const card = createEnhancedTermCard(term);
                dictContentArea.appendChild(card);
            });
        });
    }

    // --- Contribution Modal ---
    if (contributeBtn) {
        contributeBtn.addEventListener('click', () => {
            resetModal();
            gaTracker.trackEvent('dict_contribute_click');
            contributionModal.classList.remove('hidden');
        });
    }

    // Modal close handlers moved below to avoid duplication

    // Custom Dropdown Logic
    const customDropdown = document.getElementById('custom-category-dropdown');
    const dropdownTrigger = document.getElementById('dropdown-trigger');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownValue = document.querySelector('.dropdown-value');
    let selectedCategoryId = null;

    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            customDropdown.classList.toggle('open');
            dropdownMenu.classList.toggle('hidden');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (customDropdown && !customDropdown.contains(e.target)) {
            customDropdown.classList.remove('open');
            dropdownMenu?.classList.add('hidden');
        }
    });

    // Difficulty Pills Toggle
    if (contribDifficultyPills) {
        contribDifficultyPills.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                contribDifficultyPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    // Populate Modal Categories (Custom Dropdown)
    function populateModalCategories() {
        if (!dropdownMenu) return;

        // Clear existing items but keep some state if needed
        dropdownMenu.innerHTML = '';

        const categories = dictionaryService.getAllCategories();
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.dataset.categoryId = cat.id;
            item.textContent = cat.name;
            if (cat.id === selectedCategoryId) item.classList.add('selected');
            dropdownMenu.appendChild(item);
        });

        // Add "Create New Category" button
        const newCategoryBtn = document.createElement('div');
        newCategoryBtn.className = 'dropdown-item new-category-btn';
        newCategoryBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Category
        `;
        dropdownMenu.appendChild(newCategoryBtn);
    }

    // Event Delegation for Custom Dropdown Menu
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (!item) return;

            if (item.classList.contains('new-category-btn')) {
                dropdownValue.textContent = 'New Category';
                selectedCategoryId = null;
                newCategoryInput.classList.remove('hidden');
                newCategoryInput.focus();
            } else {
                const catId = item.dataset.categoryId;
                const catName = item.textContent;

                // Update selection
                dropdownMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                dropdownValue.textContent = catName;
                selectedCategoryId = catId;
                newCategoryInput.classList.add('hidden');
            }

            // Close dropdown
            customDropdown.classList.remove('open');
            dropdownMenu.classList.add('hidden');
        });
    }

    // Submit New Term / Update Term
    if (modalSubmitBtn) {
        modalSubmitBtn.addEventListener('click', () => {
            const username = document.getElementById('contrib-username').value.trim() || 'Anonymous';
            const termName = document.getElementById('contrib-term-name').value.trim();
            const definition = document.getElementById('contrib-definition').value.trim();
            const examplesRaw = document.getElementById('contrib-examples').value.trim();
            const activeDiffPill = contribDifficultyPills.querySelector('.pill.active');
            const difficulty = activeDiffPill ? activeDiffPill.dataset.value : 'beginner';

            if (!termName || !definition) {
                showToast('Fields Required', 'Please fill in both the term name and its definition.', 'warning');
                return;
            }

            const examples = examplesRaw ? examplesRaw.split(',').map(s => s.trim()) : [];

            // Check if we're editing or creating
            if (editingTermId && editingCategoryId) {
                // Edit mode
                const updatedData = {
                    name: termName,
                    definition: definition,
                    difficulty: difficulty,
                    examples: examples,
                    author: username.replace('@', '')
                };

                if (dictionaryService.editTerm(editingCategoryId, editingTermId, updatedData)) {
                    // Refresh view if viewing the edited category
                    if (activeCategoryId === editingCategoryId) {
                        renderTermsByCategory(editingCategoryId);
                    }
                    resetModal();
                    contributionModal.classList.add('hidden');
                }
            } else {
                // Create mode
                let categoryId;
                // Check if creating new category
                if (!selectedCategoryId && !newCategoryInput.classList.contains('hidden')) {
                    const newCatName = newCategoryInput.value.trim();
                    if (!newCatName) {
                        showToast('Category Name Required', 'Please enter a name for the new category.', 'warning');
                        return;
                    }
                    categoryId = 'user_' + newCatName.toLowerCase().replace(/\s+/g, '_');
                    // Add new category to service
                    dictionaryService.addCategory({
                        id: categoryId,
                        name: newCatName,
                        author: username,
                        terms: []
                    });
                    renderSidebarCategories();
                    populateModalCategories();
                } else if (selectedCategoryId) {
                    categoryId = selectedCategoryId;
                } else {
                    showToast('Category Selection Required', 'Please select a category from the dropdown.', 'warning');
                    return;
                }

                const newTerm = {
                    id: 'user_' + Date.now(),
                    name: termName,
                    definition: definition,
                    difficulty: difficulty,
                    examples: examples,
                    author: username.replace('@', ''),
                    likes: 0
                };

                dictionaryService.addTerm(categoryId, newTerm);

                // Refresh terms if viewing that category
                if (activeCategoryId === categoryId) {
                    renderTermsByCategory(categoryId);
                }

                resetModal();
                contributionModal.classList.add('hidden');
            }
        });
    }

    // Reset modal to create mode
    function resetModal() {
        editingTermId = null;
        editingCategoryId = null;
        document.querySelector('.modal-header h3').textContent = 'Contribute a Term';
        modalSubmitBtn.textContent = 'Submit Term';
        document.getElementById('contrib-username').value = '';
        document.getElementById('contrib-term-name').value = '';
        document.getElementById('contrib-definition').value = '';
        document.getElementById('contrib-examples').value = '';
        newCategoryInput.value = '';
        newCategoryInput.classList.add('hidden');
        selectedCategoryId = null;
        dropdownValue.textContent = 'Select a category';
        contribDifficultyPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    }

    // Reset modal when closing
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            resetModal();
            contributionModal.classList.add('hidden');
        });
    }
    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', () => {
            resetModal();
            contributionModal.classList.add('hidden');
        });
    }

    /* --- LLM UI Helpers --- */

    function updateLLMUI() {
        if (!llmSection) return;

        const configured = llmService.getConfiguredProviders();
        providerCards.forEach(card => {
            const providerId = card.dataset.provider;
            const statusEl = card.querySelector('.provider-setup-status');
            const setupBtn = card.querySelector('.setup-key-btn');

            if (configured.includes(providerId)) {
                statusEl.textContent = 'CONFIGURED';
                statusEl.classList.add('configured');
                setupBtn.textContent = 'Update Key';
            } else {
                statusEl.textContent = 'NOT CONFIGURED';
                statusEl.classList.remove('configured');
                setupBtn.textContent = 'Setup API Key';
            }
        });

        // Show/Hide AI Enhance button
        if (aiEnhanceBtn) {
            aiEnhanceBtn.style.display = configured.length > 0 ? 'flex' : 'none';
        }

        // Update Dashboard
        const stats = llmService.getUsageStats();
        const hasStats = Object.keys(stats).length > 0;
        usageDashboard?.classList.toggle('hidden', !hasStats);

        if (hasStats && usageDashboard) {
            const grid = usageDashboard.querySelector('.usage-stats-grid');
            const totalTokensEl = usageDashboard.querySelector('.usage-total-tokens');
            grid.innerHTML = '';

            let totalRequests = 0;

            for (const [id, stat] of Object.entries(stats)) {
                totalRequests += stat.requestCount;
                const lastUsedDate = stat.lastUsed ? new Date(stat.lastUsed).toLocaleDateString() : 'Never';

                const box = document.createElement('div');
                box.className = 'stat-box';
                box.innerHTML = `
                    <div class="stat-header">
                        <div class="stat-provider">${llmService.providers[id].name}</div>
                        <div class="stat-indicator"></div>
                    </div>
                    <div class="stat-main">
                        <div class="stat-value">${stat.requestCount}<span class="stat-unit">Requests</span></div>
                    </div>
                    <div class="stat-footer">
                        <div class="stat-info">
                            <span>Active Model</span>
                            <span>${stat.model || 'Default'}</span>
                        </div>
                        <div class="stat-info">
                            <span>Last Used</span>
                            <span>${lastUsedDate}</span>
                        </div>
                    </div>
                `;
                grid.appendChild(box);
            }

            if (totalTokensEl) {
                totalTokensEl.textContent = `Total Requests: ${totalRequests}`;
            }
        }
    }

    function openLLMModal(providerId) {
        currentSetupProvider = providerId;
        const provider = llmService.providers[providerId];
        document.getElementById('modal-provider-name').textContent = `Configure ${provider.name}`;
        providerApiKeyInput.value = llmService.getProviderKey(providerId) || '';

        // Update Provider Dropdown UI (though hidden, we keep state consistent)
        const providerTriggerValue = document.querySelector('#llm-provider-dropdown .dropdown-value');
        if (providerTriggerValue) providerTriggerValue.textContent = provider.name;

        document.querySelectorAll('#llm-provider-dropdown .dropdown-item').forEach(item => {
            item.classList.toggle('selected', item.dataset.providerId === providerId);
        });

        // Reset status
        keyValidationStatus.classList.add('hidden');
        keyValidationStatus.classList.remove('success', 'error');

        const input = document.getElementById('provider-api-key');
        input.type = 'password';
        const toggleBtn = document.getElementById('toggle-api-key');
        if (toggleBtn) {
            toggleBtn.querySelector('.eye-icon').classList.remove('hidden');
            toggleBtn.querySelector('.eye-off-icon').classList.add('hidden');
        }

        // Hide custom group initially
        document.getElementById('custom-model-group').classList.add('hidden');
        document.getElementById('custom-model-id').value = '';

        populateModelDropdown(providerId);
        llmKeyModal.classList.remove('hidden');
    }

    function populateModelDropdown(providerId) {
        const menu = document.getElementById('model-dropdown-menu');
        const triggerValue = document.querySelector('#llm-model-dropdown .dropdown-value');
        const customGroup = document.getElementById('custom-model-group');
        const customInput = document.getElementById('custom-model-id');
        const provider = llmService.providers[providerId];

        const savedConfig = llmService.config[providerId];
        const currentModelId = savedConfig?.model || provider.models[0].id;

        // Check if current model is one of the defaults
        const isDefault = provider.models.some(m => m.id === currentModelId);

        menu.innerHTML = '';

        // Add default models
        provider.models.forEach(model => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            if (model.id === currentModelId) {
                item.classList.add('selected');
                triggerValue.textContent = model.name;
                selectedModelId = model.id;
            }
            item.textContent = model.name;
            item.dataset.modelId = model.id;

            item.addEventListener('click', () => {
                menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                triggerValue.textContent = model.name;
                selectedModelId = model.id;
                customGroup.classList.add('hidden');
                document.getElementById('model-dropdown-menu').classList.add('hidden');
                document.getElementById('llm-model-dropdown').classList.remove('open');
            });

            menu.appendChild(item);
        });

        // Add Custom Option
        const customItem = document.createElement('div');
        customItem.className = 'dropdown-item';
        customItem.textContent = 'Custom Model';
        customItem.dataset.modelId = 'custom';

        if (!isDefault) {
            customItem.classList.add('selected');
            triggerValue.textContent = 'Custom Model';
            selectedModelId = 'custom';
            customGroup.classList.remove('hidden');
            customInput.value = currentModelId;
        }

        customItem.addEventListener('click', () => {
            menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
            customItem.classList.add('selected');
            triggerValue.textContent = 'Custom Model';
            selectedModelId = 'custom';
            customGroup.classList.remove('hidden');
            customInput.focus();
            document.getElementById('model-dropdown-menu').classList.add('hidden');
            document.getElementById('llm-model-dropdown').classList.remove('open');
        });
        menu.appendChild(customItem);
    }

    // Modal Events
    providerCards.forEach(card => {
        const setupBtn = card.querySelector('.setup-key-btn');
        setupBtn.addEventListener('click', () => {
            openLLMModal(card.dataset.provider);
        });
    });

    if (llmModalCloseBtn) {
        llmModalCloseBtn.addEventListener('click', () => llmKeyModal.classList.add('hidden'));
    }
    if (keyModalCancel) {
        keyModalCancel.addEventListener('click', () => llmKeyModal.classList.add('hidden'));
    }

    if (keyModalSave) {
        keyModalSave.addEventListener('click', async () => {
            const key = providerApiKeyInput.value.trim();
            let finalModelId = selectedModelId;

            if (!key) {
                showToast('Input Required', 'Please enter an API key', 'warning');
                return;
            }

            if (selectedModelId === 'custom') {
                const customId = document.getElementById('custom-model-id').value.trim();
                if (!customId) {
                    showToast('Input Required', 'Please enter a custom model ID', 'warning');
                    return;
                }
                finalModelId = customId;
            }

            keyValidationStatus.classList.remove('hidden');
            keyValidationStatus.innerHTML = '<div class="loader-small"></div><span>Validating key...</span>';

            const result = await llmService.validateKey(currentSetupProvider, key);

            keyValidationStatus.innerHTML = `<span>${result.message}</span>`;
            keyValidationStatus.classList.replace('hidden', result.valid ? 'success' : 'error');
            if (!result.valid) keyValidationStatus.classList.add('error');

            gaTracker.trackEvent('llm_setup_attempt', {
                provider: currentSetupProvider,
                success: result.valid,
                model_type: selectedModelId === 'custom' ? 'custom' : 'preset'
            });

            if (result.valid) {
                await llmService.setProviderKey(currentSetupProvider, key, finalModelId);
                setTimeout(() => {
                    llmKeyModal.classList.add('hidden');
                    updateLLMUI();
                }, 1000);
            }
        });
    }

    // Dropdown Triggers
    const dropdowns = [
        { triggerId: 'provider-dropdown-trigger', menuId: 'provider-dropdown-menu', wrapperId: 'llm-provider-dropdown' },
        { triggerId: 'model-dropdown-trigger', menuId: 'model-dropdown-menu', wrapperId: 'llm-model-dropdown' }
    ];

    dropdowns.forEach(dd => {
        const trigger = document.getElementById(dd.triggerId);
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other dropdowns first
                dropdowns.forEach(other => {
                    if (other.triggerId !== dd.triggerId) {
                        const menu = document.getElementById(other.menuId);
                        const wrap = document.getElementById(other.wrapperId);
                        if (menu) menu.classList.add('hidden');
                        if (wrap) wrap.classList.remove('open');
                    }
                });
                document.getElementById(dd.wrapperId).classList.toggle('open');
                document.getElementById(dd.menuId).classList.toggle('hidden');
            });
        }
    });

    // Provider Dropdown Items
    document.querySelectorAll('#llm-provider-dropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const providerId = item.dataset.providerId;
            const providerName = item.textContent;

            // Update UI
            document.querySelector('#llm-provider-dropdown .dropdown-value').textContent = providerName;
            document.querySelectorAll('#llm-provider-dropdown .dropdown-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            // Update State
            currentSetupProvider = providerId;
            providerApiKeyInput.value = llmService.getProviderKey(providerId) || '';

            // Re-populate models for this provider
            populateModelDropdown(providerId);

            // Hide menu
            document.getElementById('provider-dropdown-menu').classList.add('hidden');
            document.getElementById('llm-provider-dropdown').classList.remove('open');
        });
    });

    // Document click to close dropdowns
    document.addEventListener('click', () => {
        dropdowns.forEach(dd => {
            const menu = document.getElementById(dd.menuId);
            const wrap = document.getElementById(dd.wrapperId);
            if (menu) menu.classList.add('hidden');
            if (wrap) wrap.classList.remove('open');
        });
    });

    /* --- Toast Logic --- */
    window.showToast = function (title, message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ?
            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>` :
            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Per-scene Original Prompt Tracking
    // Scene History State
    const sceneHistories = new Map();

    /**
     * Initialize or update history for a scene
     * @param {HTMLElement} sceneEl 
     * @param {string} text 
     * @param {boolean} isInitial - If true, resets history. If false, pushes new version.
     */
    function updateSceneHistory(sceneEl, text, isInitial = false) {
        if (!sceneHistories.has(sceneEl) || isInitial) {
            sceneHistories.set(sceneEl, {
                stack: [text],
                index: 0
            });
        } else {
            const history = sceneHistories.get(sceneEl);
            // If we've branched (manually typed or undo-ed then enhanced), truncate future
            if (history.index < history.stack.length - 1) {
                history.stack = history.stack.slice(0, history.index + 1);
            }

            // Only push if different from current
            if (text !== history.stack[history.index]) {
                history.stack.push(text);
                history.index++;
            }
        }
        updateHistoryButtons(sceneEl);
    }

    function updateHistoryButtons(sceneEl) {
        const history = sceneHistories.get(sceneEl);
        if (!history) return;

        const undoBtn = sceneEl.querySelector('.scene-undo-btn');
        const redoBtn = sceneEl.querySelector('.scene-redo-btn');

        if (undoBtn) undoBtn.classList.toggle('hidden', history.index <= 0);
        if (redoBtn) redoBtn.classList.toggle('hidden', history.index >= history.stack.length - 1);
    }

    // Track manual input
    scenesContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('scene-description')) {
            const sceneEl = e.target.closest('.scene-item');

            // For manual typing, we update the current index value 
            // but we don't automatically push a new history state for every keystroke
            // to avoid cluttering. However, we do want to hide redo if they start typing.
            const history = sceneHistories.get(sceneEl);
            if (history) {
                history.stack[history.index] = e.target.value;
                // If they change something manually, redo should be lost as they are on a new path
                if (history.index < history.stack.length - 1) {
                    history.stack = history.stack.slice(0, history.index + 1);
                }
                updateHistoryButtons(sceneEl);
            } else {
                // First-time manual input
                updateSceneHistory(sceneEl, e.target.value, true);
            }
        }
    });

    // AI Enhance Logic (Delegated)
    if (scenesContainer) {
        scenesContainer.addEventListener('click', async (e) => {
            // Undo Handler
            const undoBtn = e.target.closest('.scene-undo-btn');
            if (undoBtn) {
                const sceneEl = undoBtn.closest('.scene-item');
                const history = sceneHistories.get(sceneEl);
                if (history && history.index > 0) {
                    history.index--;
                    const textarea = sceneEl.querySelector('.scene-description');
                    textarea.value = history.stack[history.index];
                    updateHistoryButtons(sceneEl);
                    showToast('Undo', 'Reverted to previous version', 'info');
                    gaTracker.trackEvent('undo_enhance');
                }
                return;
            }

            // Redo Handler
            const redoBtn = e.target.closest('.scene-redo-btn');
            if (redoBtn) {
                const sceneEl = redoBtn.closest('.scene-item');
                const history = sceneHistories.get(sceneEl);
                if (history && history.index < history.stack.length - 1) {
                    history.index++;
                    const textarea = sceneEl.querySelector('.scene-description');
                    textarea.value = history.stack[history.index];
                    updateHistoryButtons(sceneEl);
                    showToast('Redo', 'Restored next version', 'info');
                    gaTracker.trackEvent('redo_enhance');
                }
                return;
            }

            // Enhance Handler
            const enhanceBtn = e.target.closest('.scene-enhance-btn');
            if (!enhanceBtn) return;

            const sceneEl = enhanceBtn.closest('.scene-item');
            if (!sceneEl) return;

            const textarea = sceneEl.querySelector('.scene-description');

            const configured = llmService.getConfiguredProviders();
            if (configured.length === 0) {
                showToast('Configuration Required', 'Please configure an AI provider in the integration hub first.', 'warning');
                return;
            }

            const providerId = configured[0];

            // Visual feedback
            enhanceBtn.classList.add('loading');
            enhanceBtn.disabled = true;

            try {
                const description = textarea.value.trim();
                const camera = sceneEl.querySelector('.scene-camera-value').value;
                const lighting = sceneEl.querySelector('.scene-lighting-value').value;
                const negative = sceneEl.querySelector('.scene-negative-prompt').value.trim();

                if (!description) {
                    showToast('Description Required', 'Please describe the scene before enhancing.', 'warning');
                    return;
                }

                // Ensure current state is in history before pushing new AI one
                if (!sceneHistories.has(sceneEl)) {
                    updateSceneHistory(sceneEl, description, true);
                }

                const sceneData = {
                    description,
                    camera: camera || '',
                    lighting: lighting || '',
                    negative_prompt: negative || ''
                };

                // Get current model profile for model-aware AI generation
                const currentModelId = globalParams.getParams().platform_preset;
                const modelProfile = globalParams.modelService.getProfile(currentModelId);

                const enhanced = await llmService.generatePrompt(providerId, sceneData, { modelProfile });
                textarea.value = enhanced;

                gaTracker.trackEnhance(description.length, enhanced.length);

                // Push enhanced version to history
                updateSceneHistory(sceneEl, enhanced);

                showToast('Scene Enhanced', 'AI version added to history stack!', 'success');

            } catch (e) {
                console.error('Enhance Error:', e);
                let errorTitle = 'AI Enhancement Failed';
                let errorMsg = e.message;

                if (e.message.toLowerCase().includes('quota') || e.message.toLowerCase().includes('rate limit')) {
                    errorTitle = 'Quota Exceeded';
                    errorMsg = 'Wait a moment or switch to Gemini 1.5 Flash.';
                }
                showToast(errorTitle, errorMsg, 'error');

            } finally {
                enhanceBtn.classList.remove('loading');
                enhanceBtn.disabled = false;
            }
        });
    }

    /* ============================
        History & Diff Logic
       ============================ */
    // historyService is already initialized at the top

    // Selectors for Section (the only history view now)
    const sectionList = document.getElementById('history-section-list');
    const sectionPreview = document.getElementById('history-section-preview-code');
    const sectionActions = document.getElementById('history-section-preview-actions');

    let selectedHistoryItem = null;

    // History Sidebar is managed by history-sidebar.js

    // ── Tab Switcher ────────────────────────────────
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            tab.parentElement.setAttribute('data-active-tab', target);

            document.getElementById('history-panel-json')?.classList.toggle('hidden', target !== 'json');
            document.getElementById('history-panel-ai')?.classList.toggle('hidden', target !== 'ai');
            if (target === 'json') renderHistoryView('section');
            if (target === 'ai') openAiHistory?.();

            // Ensure any open history sidebars are closed when switching tabs
            if (window.historySidebarController) {
                window.historySidebarController.closeSection();
                window.historySidebarController.closeAi();
            }
        });
    });

    // Render JSON versions whenever History section is shown
    document.querySelector('[data-section="history-section"]')?.addEventListener('click', () => {
        renderHistoryView('section');
    });

    // Trigger section render on header nav History click is handled above
    // Clear History
    const clearAllHistory = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            historyService.clear();
            gaTracker.trackEvent('history_clear_all');
            renderHistoryView('section');
            if (sectionPreview) sectionPreview.textContent = 'History cleared.';
            if (sectionActions) sectionActions.classList.add('hidden');
            showToast('History Cleared', 'All recorded versions have been removed.', 'info');
        }
    };

    document.getElementById('history-section-clear-btn')?.addEventListener('click', clearAllHistory);

    // Restore Version
    const restoreHistoryItem = () => {
        if (selectedHistoryItem) {
            outputArea.value = JSON.stringify(selectedHistoryItem.content, null, 2);
            gaTracker.trackEvent('history_restore_item', { item_id: selectedHistoryItem.id });

            // Return to generator section from History
            document.querySelector('[data-section="generator-section"]')?.click();

            document.getElementById('output-section').classList.remove('hidden');
            document.getElementById('output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast('Restored', 'Version loaded into output editor.', 'success');
        }
    };

    document.getElementById('history-section-restore-btn')?.addEventListener('click', restoreHistoryItem);

    // Render Sidebar
    function renderHistoryView(view) {
        const items = historyService.getAll();
        const container = sectionList; // Single canonical history view now

        if (!container) return;
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding: 20px; font-size: 0.85rem;">No history found.</div>`;
            return;
        }

        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'history-item';
            el.dataset.id = item.id;

            const date = new Date(item.timestamp);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = date.toLocaleDateString();

            const badgeClass = item.mode === 'ai' ? 'badge-ai' : 'badge-json';
            const badgeText = item.mode === 'ai' ? 'AI' : 'JSON';

            el.innerHTML = `
                <div class="history-item-top">
                    <div class="history-summary">${item.summary || 'Generated Prompt'}</div>
                    <span class="history-badge ${badgeClass}">${badgeText}</span>
                </div>
                <div class="history-item-bottom">
                    <div class="history-date">${dateStr} ${timeStr}</div>
                    <button class="history-delete-btn" title="Delete Version">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;

            const deleteBtn = el.querySelector('.history-delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Delete this version history?')) {
                    historyService.delete(item.id);
                    renderHistoryView('modal');
                    renderHistoryView('section');

                    if (selectedHistoryItem && selectedHistoryItem.id === item.id) {
                        selectedHistoryItem = null;
                        if (modalActions) modalActions.classList.add('hidden');
                        if (sectionActions) sectionActions.classList.add('hidden');
                        if (modalPreview) modalPreview.innerHTML = '<div class="placeholder-content">Select an item from the sidebar...</div>';
                        if (sectionPreview) sectionPreview.innerHTML = '<div class="placeholder-content">Select an item from the sidebar...</div>';
                    }
                }
            });

            el.addEventListener('click', () => selectHistoryItem(item, el, view));
            container.appendChild(el);
        });
    }

    // Select Item Logic
    function selectHistoryItem(item, element, view) {
        const container = view === 'modal' ? modalList : sectionList;
        container?.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
        element.classList.add('active');

        selectedHistoryItem = item;

        const previewArea = view === 'modal' ? modalPreview : sectionPreview;
        const actionsArea = view === 'modal' ? modalActions : sectionActions;

        if (actionsArea) actionsArea.classList.remove('hidden');
        if (previewArea) previewArea.textContent = JSON.stringify(item.content, null, 2);

        // Close sidebar on select (using global controller from history-sidebar.js)
        if (window.historySidebarController) {
            if (view === 'modal') {
                window.historySidebarController.close();
            } else {
                window.historySidebarController.closeSection();
            }
        }
    }

    // Expose for nav
    window.renderHistoryView = renderHistoryView;

    // We need to inject the save call into the existing event listener logic
    // Since we can't easily "inject" code into a closure without rewriting it, 
    // we'll listen for the OUTPUT text area change? No, that's unreliable.
    // We will attach a secondary listener that checks if output changed?
    // Better: We explicitly call historyService.save() inside the generateBtn block.
    // Use the MutationObserver for now? Or just rewrite the generateBtn handler?
    // *Strategy*: Refactor the generateBtn handler one last time to include save().

    // --- Template System Integration ---
    const saveTemplateBtn = document.getElementById('save-as-template');
    const openGalleryBtn = document.getElementById('open-template-gallery');

    if (saveTemplateBtn) {
        saveTemplateBtn.addEventListener('click', () => {
            // Collect Current State
            const scenes = [];
            const sceneElements = scenesContainer.querySelectorAll('.scene-item');

            sceneElements.forEach(sceneEl => {
                const desc = sceneEl.querySelector('.scene-description').value;
                const cam = sceneEl.querySelector('.scene-camera-input')?.value || '';
                const light = sceneEl.querySelector('.scene-lighting-input')?.value || '';
                const color = sceneEl.querySelector('.scene-color-input')?.value || '';
                const mood = sceneEl.querySelector('.scene-mood-input')?.value || '';
                const sound = sceneEl.querySelector('.scene-sound-input')?.value || '';
                const custNeg = sceneEl.querySelector('.scene-negative-prompt')?.value || '';

                scenes.push({
                    description: desc,
                    camera: cam,
                    lighting: light,
                    color: color,
                    mood: mood,
                    sound: sound,
                    customNegative: custNeg
                });
            });

            // Prevent saving empty state if desired, or allow it.
            // Templates can be partial.

            const templateData = {
                scenes: scenes,
                globalParams: globalParams.getParams()
            };

            if (window.templateUI) {
                window.templateUI.openSaveModal(templateData);
            } else {
                console.error('TemplateUI not found');
            }
        });
    }

    if (openGalleryBtn) {
        openGalleryBtn.addEventListener('click', () => {
            if (window.templateUI) window.templateUI.openGallery();
        });
    }

    // Apply Template Event
    window.addEventListener('apply-template', (e) => {
        const data = e.detail;
        if (!data || !data.scenes) return;

        if (confirm('Apply this template? Current scenes will be replaced.')) {
            // 1. Reset Scenes
            // Use the reset logic from reset-btn roughly but simpler
            const allScenes = scenesContainer.querySelectorAll('.scene-item');
            allScenes.forEach(s => s.remove());
            sceneCount = 0;

            // 2. Restore Scenes
            data.scenes.forEach((sceneData) => {
                // Add a new scene
                addSceneBtn.click();

                const newScene = scenesContainer.lastElementChild;
                if (newScene && typeof newScene.setValues === 'function') {
                    newScene.setValues(sceneData);
                }
            });

            // 3. Restore Global Params
            if (data.globalParams) {
                ['aspect_ratio', 'resolution', 'frame_rate', 'platform_preset'].forEach(key => {
                    if (data.globalParams[key]) {
                        globalParams.updateParam(key, data.globalParams[key]);
                    }
                });

                syncGlobalUI();
            }

            showToast('Template Applied', 'Configuration loaded successfully.', 'success');
        }
    });

}); // End of DOMContentLoaded

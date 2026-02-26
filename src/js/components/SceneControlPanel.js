import { SceneControlSchema } from '../core/SceneControlSchema.js';

export class SceneControlPanel extends HTMLElement {
    constructor() {
        super();
        this.tier = 1; // Default tier (1=Quick, 2=Standard, 3=Pro, 4=Expert)
        this.schema = SceneControlSchema;
        this.values = {};
    }

    getTierLabel() {
        const labels = {
            1: 'Quick',
            2: 'Standard',
            3: 'Pro',
            4: 'Expert'
        };
        return labels[this.tier] || 'Quick';
    }

    // Helper used when rendering individual control badges
    getTierLabelForControl(tier) {
        const labels = {
            1: 'Quick',
            2: 'Standard',
            3: 'Pro',
            4: 'Expert'
        };
        return labels[tier] || 'Quick';
    }

    connectedCallback() {
        // Read scene-id here, AFTER the element is in the DOM so getAttribute works
        this.sceneId = this.getAttribute('scene-id') || (this.sceneId || Date.now());
        this.render();
        this.setupListeners();
    }

    setTier(tierLevel) {
        this.getValues(); // preserve current values
        this.tier = parseInt(tierLevel, 10);

        // Preserve open accordion states before re-rendering
        const openGroups = [];
        this.querySelectorAll('.scene-group.active').forEach(group => {
            openGroups.push(group.dataset.group);
        });

        // Ensure 'core' is open by default if nothing is open or it's a fresh render
        if (openGroups.length === 0) {
            openGroups.push('core');
        }

        this.render();
        this.setupListeners();

        // Re-open previously open accordions
        openGroups.forEach(groupId => {
            const groupEl = this.querySelector(`.scene-group[data-group="${groupId}"]`);
            if (groupEl) groupEl.classList.add('active');
        });

        // Fire an event to notify that structure might have changed
        this.dispatchEvent(new Event('input', { bubbles: true }));
    }

    getValues() {
        const inputs = this.querySelectorAll('.scene-input');
        inputs.forEach(input => {
            if (input.dataset.id) {
                this.values[input.dataset.id] = input.value;
            }
        });
        return this.values;
    }

    setValues(savedValues) {
        this.values = { ...this.values, ...savedValues };
        this.render();
        this.setupListeners();
    }

    render() {
        let html = `
            <div class="scene-item" data-scene-id="${this.sceneId}">
                <div class="scene-header">
                    <h4 class="scene-title">Scene ${this.sceneId}</h4>
                    <div class="scene-actions">
                        <!-- Mode Selector -->
                        <div class="custom-dropdown tier-selector-dropdown" title="Control Mode">
                            <div class="dropdown-trigger">
                                <span class="dropdown-value">${this.getTierLabel()}</span>
                                <svg class="dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-item ${this.tier === 1 ? 'selected' : ''}" data-value="1">Quick</div>
                                <div class="dropdown-item ${this.tier === 2 ? 'selected' : ''}" data-value="2">Standard</div>
                                <div class="dropdown-item ${this.tier === 3 ? 'selected' : ''}" data-value="3">Pro</div>
                                <div class="dropdown-item ${this.tier === 4 ? 'selected' : ''}" data-value="4">Expert</div>
                            </div>
                        </div>
                        <button class="scene-enhance-btn" title="Enhance with AI" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="enhance-stars-icon">
                                <path d="M15.5 5.5 L16.8 10.2 L21.5 11.5 L16.8 12.8 L15.5 17.5 L14.2 12.8 L9.5 11.5 L14.2 10.2 Z" />
                                <path d="M5.5 2.5 L6.2 4.8 L8.5 5.5 L6.2 6.2 L5.5 8.5 L4.8 6.2 L2.5 5.5 L4.8 4.8 Z" />
                                <path d="M6.5 15.5 L7.2 17.8 L9.5 18.5 L7.2 19.2 L6.5 21.5 L5.8 19.2 L3.5 18.5 L5.8 17.8 Z" />
                            </svg>
                        </button>
                        <button class="remove-scene-btn" title="Remove Scene" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="scene-groups-container">
        `;

        this.schema.groups.forEach(group => {
            // Filter controls by current tier
            const visibleControls = group.controls.filter(c => c.tier <= this.tier);
            if (visibleControls.length === 0) return;

            // Make the first group active by default
            const activeClass = group.id === 'core' ? 'active' : '';

            html += `
                <div class="scene-group ${activeClass}" data-group="${group.id}">
                    <button type="button" class="scene-group-accordion-btn">
                        <span>${group.title}</span>
                        <svg class="accordion-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="scene-params-grid">
            `;

            visibleControls.forEach(control => {
                const value = this.values[control.id] || '';

                // Extra class for textarea to take full width
                const groupClass = control.type === 'textarea' ? 'form-group f-width-100' : 'form-group';
                // Add a small badge or tooltip for advanced controls
                const tierIndicator = control.tier > 1 ? `<span class="tier-badge tier-${control.tier}" title="Tier ${control.tier}">[${this.getTierLabelForControl(control.tier)}]</span>` : '';
                const infoIcon = control.info ? `<span class="info-tooltip" title="${control.info}"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></span>` : '';

                if (control.type === 'textarea') {
                    html += `
                        <div class="${groupClass}" style="grid-column: 1 / -1;">
                            <label class="section-label">${control.label} ${tierIndicator} ${infoIcon}</label>
                            <textarea class="scene-input scene-description" data-id="${control.id}" placeholder="${control.placeholder}">${value}</textarea>
                        </div>
                    `;
                } else if (control.type === 'select') {
                    html += `
                        <div class="${groupClass}">
                            <label class="section-label">${control.label} ${tierIndicator} ${infoIcon}</label>
                            <div class="input-with-dropdown">
                                <input type="text" class="scene-input" data-id="${control.id}" placeholder="${control.placeholder || 'Select or type...'}" value="${value}">
                                <div class="input-dropdown-wrapper">
                                    <button type="button" class="input-dropdown-trigger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    <div class="input-dropdown-menu">
                                        ${control.options.map(opt => `<div class="dropdown-item" data-value="${opt}">${opt}</div>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="${groupClass}">
                            <label class="section-label">${control.label} ${tierIndicator} ${infoIcon}</label>
                            <input type="text" class="scene-input" data-id="${control.id}" placeholder="${control.placeholder}" value="${value}">
                        </div>
                    `;
                }
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>`;
        this.innerHTML = html;
    }

    setupListeners() {
        this.setupAccordions();

        // Tier Selector Dropdown Toggle
        const tierTrigger = this.querySelector('.tier-selector-dropdown .dropdown-trigger');
        if (tierTrigger) {
            tierTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = tierTrigger.closest('.custom-dropdown');
                dropdown.classList.toggle('open');

                // Close other open element dropdowns in this panel
                this.querySelectorAll('.input-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
            });
        }

        // Tier Selector Item Selection
        this.querySelectorAll('.tier-selector-dropdown .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = e.target.dataset.value;
                this.setTier(val);
            });
        });

        const removeBtn = this.querySelector('.remove-scene-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.remove();
                document.dispatchEvent(new CustomEvent('sceneRemoved', { detail: { sceneId: this.sceneId } }));
            });
        }

        const enhanceBtn = this.querySelector('.scene-enhance-btn');
        if (enhanceBtn) {
            enhanceBtn.addEventListener('click', () => {
                // Just log it or fire an event out for AI to pick up
                console.log(`Enhance scene ${this.sceneId} with AI called.`);
                // AI functionality usually hooks onto this via document body delegation,
                // so we can also let it bubble.
            });
        }

        // Dropdown toggle logic
        this.querySelectorAll('.input-dropdown-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others first
                this.querySelectorAll('.input-dropdown-wrapper.open').forEach(w => {
                    if (w !== e.currentTarget.closest('.input-dropdown-wrapper')) {
                        w.classList.remove('open');
                    }
                });

                const wrapper = e.target.closest('.input-dropdown-wrapper');
                if (wrapper) wrapper.classList.toggle('open');
            });
        });

        // Dropdown item selection
        this.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const wrapper = e.target.closest('.input-with-dropdown');
                const input = wrapper.querySelector('.scene-input');
                input.value = e.target.dataset.value;
                this.values[input.dataset.id] = input.value; // Store the quick value

                e.target.closest('.input-dropdown-wrapper').classList.remove('open');

                // Fire input event to trigger auto-save in app.js
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });

        // Auto-update values map on input
        this.querySelectorAll('.scene-input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.values[e.target.dataset.id] = e.target.value;
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.querySelectorAll('.input-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
                this.querySelectorAll('.tier-selector-dropdown').forEach(d => d.classList.remove('open'));
            }
        });
    }

    setupAccordions() {
        const accordionBtns = this.querySelectorAll('.scene-group-accordion-btn');
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const group = btn.closest('.scene-group');
                group.classList.toggle('active');
            });
        });
    }
}

// Register Web Component securely to avoid double registration issues
if (!customElements.get('scene-control-panel')) {
    customElements.define('scene-control-panel', SceneControlPanel);
}

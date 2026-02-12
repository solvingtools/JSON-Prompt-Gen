/* =========================================
   Form Manager - Dynamic Modal System
   Handles all 7 Google Forms with unified UI
   ========================================= */

class FormManager {
    constructor() {
        this.isInitialized = false;
        this.currentFormType = null;
        this.formConfigs = this.getFormConfigurations();
        this.init();
    }

    /**
     * Form Configurations for all 7 types
     * TODO: User will provide formResponse URLs and entry IDs later
     */
    getFormConfigurations() {
        return {
            bug: {
                title: 'Report a Bug',
                subtitle: 'Help us fix issues faster by providing detailed information',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLSdAfiosyDKMh8ikLJ8bajbBNIykNvxbYY9v927OODF4F0fCrQ/formResponse',
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'John Doe', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com', entryId: 'entry.437453787' },
                    {
                        name: 'issueType',
                        label: 'Issue Type',
                        type: 'select',
                        required: true,
                        options: ['Interface', 'Generator Logic', 'Performance', 'Mobile', 'Export'],
                        entryId: 'entry.1234265674'
                    },
                    {
                        name: 'severity',
                        label: 'Severity',
                        type: 'select',
                        required: true,
                        options: ['Blocker', 'Major', 'Minor', 'Tweak'],
                        entryId: 'entry.1929743395'
                    },
                    { name: 'environment', label: 'Environment (Browser & OS)', type: 'text', required: false, placeholder: 'Chrome 120 on Windows 11', entryId: 'entry.1633959711' },
                    { name: 'expected', label: 'Expected Behavior', type: 'textarea', required: true, placeholder: 'What did you expect to happen?', entryId: 'entry.819638022' },
                    { name: 'actual', label: 'Actual Behavior', type: 'textarea', required: true, placeholder: 'What actually happened?', entryId: 'entry.1438176335' },
                    { name: 'steps', label: 'Steps to Reproduce', type: 'textarea', required: true, placeholder: '1. Go to...\n2. Click on...\n3. See error', entryId: 'entry.1664947985' },
                    { name: 'errors', label: 'Error Logs/Messages', type: 'textarea', required: false, placeholder: 'Paste any error messages from console', entryId: 'entry.527551602' }
                ]
            },
            feature: {
                title: 'Request a Feature',
                subtitle: 'Share your ideas to make the tool even better',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLScnrUDqo97U6Vc0ckqA6FLsemjxd025oV-E1Eogi7oxx-9a0A/formResponse',
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Jane Smith', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'jane@example.com', entryId: 'entry.1044274461' },
                    { name: 'featureTitle', label: 'Feature Name', type: 'text', required: true, placeholder: 'Real-time Collaboration', entryId: 'entry.553278622' },
                    {
                        name: 'context',
                        label: 'Feature Area',
                        type: 'select',
                        required: true,
                        options: ['Dictionary', 'Export Tools', 'AI Integration', 'Workflow', 'Mobile App'],
                        entryId: 'entry.1234265674'
                    },
                    { name: 'problem', label: 'Problem to Solve', type: 'textarea', required: true, placeholder: 'Why is this feature needed?', entryId: 'entry.1633959711' },
                    { name: 'solution', label: 'Proposed Solution', type: 'textarea', required: true, placeholder: 'How would this feature work?', entryId: 'entry.819638022' },
                    { name: 'useCase', label: 'Use Case Scenario', type: 'textarea', required: true, placeholder: 'Describe a real-world scenario where this would be useful', entryId: 'entry.1824049887' },
                    {
                        name: 'priority',
                        label: 'Priority Level',
                        type: 'select',
                        required: true,
                        options: ['Critical for my work', 'Would improve my workflow', 'Nice to have'],
                        entryId: 'entry.1929743395'
                    }
                ]
            },
            general: {
                title: 'General Inquiry',
                subtitle: 'Get in touch for partnerships, press, or general questions',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLScEEkuHDWnzSPwGX7XRle2WgVHi3ZUhA2QeLt8VRS1QUFVmlA/formResponse',
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Alex Johnson', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'alex@example.com', entryId: 'entry.1324323823' },
                    {
                        name: 'category',
                        label: 'Subject Category',
                        type: 'select',
                        required: true,
                        options: ['Partnership', 'Press/Media', 'General Feedback', 'Other'],
                        entryId: 'entry.1234265674'
                    },
                    {
                        name: 'contactMethod',
                        label: 'Preferred Contact Method',
                        type: 'select',
                        required: false,
                        options: ['Email', 'Phone', 'Video Call'],
                        entryId: 'entry.621081373'
                    },
                    { name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'What is your inquiry about?', entryId: 'entry.1633959711' },
                    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Please provide detailed information...', entryId: 'entry.819638022' }
                ]
            },
            security: {
                title: 'Report Security Issue',
                subtitle: 'We take security seriously. Your report is confidential.',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLSfvuvX20NGyZpGk4nC5N8QO2qUAtzgJnjT1PQ6vtPQc1Vo_Fg/formResponse',
                fields: [
                    { name: 'alias', label: 'Name/Alias', type: 'text', required: true, placeholder: 'You can use an alias for anonymity', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Secure Email', type: 'email', required: true, placeholder: 'secure@example.com', entryId: 'entry.1459126260' },
                    {
                        name: 'vulnType',
                        label: 'Vulnerability Category',
                        type: 'select',
                        required: true,
                        options: ['XSS', 'Authentication Bypass', 'SQL Injection', 'Logic Flaw', 'Data Leak', 'Other'],
                        entryId: 'entry.1234265674'
                    },
                    { name: 'component', label: 'Target Component', type: 'text', required: true, placeholder: 'e.g., Login Form, API Endpoint', entryId: 'entry.1633959711' },
                    {
                        name: 'impact',
                        label: 'Threat Impact',
                        type: 'select',
                        required: true,
                        options: ['Low', 'Medium', 'High', 'Critical'],
                        entryId: 'entry.1929743395'
                    },
                    { name: 'poc', label: 'Proof of Concept Steps', type: 'textarea', required: true, placeholder: 'Detailed steps to reproduce the vulnerability', entryId: 'entry.819638022' },
                    { name: 'remediation', label: 'Suggested Fix', type: 'textarea', required: false, placeholder: 'If you have recommendations for a fix', entryId: 'entry.2143940871' }
                ]
            },
            privacy: {
                title: 'Privacy & Data Request',
                subtitle: 'Exercise your data rights under GDPR/CCPA',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLScId2WU1z8CQVJK11P1fzKU4w1fkHbIV_qeq5-6_8P3gSQgQA/formResponse',
                fields: [
                    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Legal Name', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'email@example.com', entryId: 'entry.35958845' },
                    { name: 'reference', label: 'Account Identifier (if applicable)', type: 'text', required: false, placeholder: 'User ID or email on file', entryId: 'entry.1234265674' },
                    {
                        name: 'requestType',
                        label: 'Request Type',
                        type: 'select',
                        required: true,
                        options: ['Right to be Forgotten (Delete Data)', 'Data Access Request', 'Opt-Out of Processing', 'Data Correction'],
                        entryId: 'entry.1176564616'
                    },
                    {
                        name: 'jurisdiction',
                        label: 'Jurisdiction',
                        type: 'select',
                        required: false,
                        options: ['GDPR (EU)', 'CCPA (California)', 'Other'],
                        entryId: 'entry.1633959711'
                    },
                    { name: 'details', label: 'Request Details', type: 'textarea', required: true, placeholder: 'Provide specific information about your request', entryId: 'entry.819638022' }
                ]
            },
            legal: {
                title: 'Legal & Compliance Inquiry',
                subtitle: 'Questions about terms, licensing, or legal matters',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLSds5P0IBVLv_hpIYcpkDfLUlg_XgI5xmsqJ0uiNI1zS4xdKjA/formResponse',
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Full Name', entryId: 'entry.612544380' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'email@example.com', entryId: 'entry.1774178489' },
                    { name: 'organization', label: 'Organization (if applicable)', type: 'text', required: false, placeholder: 'Company Name', entryId: 'entry.1154990499' },
                    {
                        name: 'topic',
                        label: 'Topic Area',
                        type: 'select',
                        required: true,
                        options: ['Licensing', 'Trademark', 'Terms Violation', 'Copyright', 'General Legal'],
                        entryId: 'entry.1234265674'
                    },
                    { name: 'clause', label: 'Specific Clause Reference', type: 'text', required: false, placeholder: 'Section or clause number', entryId: 'entry.1633959711' },
                    { name: 'inquiry', label: 'Question or Concern', type: 'textarea', required: true, placeholder: 'Describe your legal question or concern', entryId: 'entry.819638022' }
                ]
            },
            voting: {
                title: 'Pro Feature Poll',
                subtitle: 'Help prioritize the features you want most',
                action: 'https://docs.google.com/forms/d/e/1FAIpQLScFuQMHZWoP82FXEGg3-9jkfpmW8bZXxLjIEselOUFaq1bb1w/formResponse',
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'John Doe', entryId: 'entry.1542724307' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com', entryId: 'entry.1693986332' },
                    {
                        name: 'profile',
                        label: 'User Profile',
                        type: 'select',
                        required: true,
                        options: ['Hobbyist', 'Professional Director', 'Studio/Agency', 'Developer/Integrator'],
                        entryId: 'entry.1504256996'
                    },
                    {
                        name: 'priority',
                        label: 'Top Priority Feature',
                        type: 'select',
                        required: true,
                        options: ['Real-time Video Preview', '3D Scene Controls', 'Team Collaboration', 'Advanced Export Formats', 'API Access'],
                        entryId: 'entry.953202038'
                    },
                    {
                        name: 'secondary',
                        label: 'Secondary Interest',
                        type: 'select',
                        required: false,
                        options: ['Real-time Video Preview', '3D Scene Controls', 'Team Collaboration', 'Advanced Export Formats', 'API Access'],
                        entryId: 'entry.963578128'
                    },
                    { name: 'workflow', label: 'Current Workflow', type: 'textarea', required: false, placeholder: 'How do you currently manage multi-shot video projects?', entryId: 'entry.1634956242' },

                    // SECTION 2
                    { type: 'header', label: 'Pricing Sensitivity', subtitle: 'Help us design fair pricing tiers' },
                    {
                        name: 'monthlyPrice',
                        label: 'What would you pay monthly for unlimited access?',
                        type: 'select',
                        required: true,
                        options: ['Free only', '$5-9', '$10-19', '$20-29', '$30+', 'Other'],
                        entryId: 'entry.1769860341'
                    },
                    {
                        name: 'paidFeatures',
                        label: 'Which features would make you pay?',
                        type: 'checkbox',
                        required: true,
                        options: [
                            'Style Shifter (transform visual styles)',
                            'Character Bible (reference uploads)',
                            'Team Collaboration',
                            'Advanced Physics Engine',
                            'Template Marketplace',
                            'One-Click Export Suite',
                            'Audio Cue Integration',
                            'Multi-Scene Timeline Builder',
                            'Atomic Scene + Global Locks',
                            'Visual Pre-Visualization',
                            'Consistency Score Preview'
                        ],
                        entryId: 'entry.691126925'
                    },
                    { name: 'concerns', label: 'What\'s your biggest concern about paid tiers?', type: 'textarea', required: true, placeholder: 'Cost, limitation, or value concerns...', entryId: 'entry.1767161251' },

                    { name: 'feedback', label: 'Additional Feedback', type: 'textarea', required: false, placeholder: 'Any other features or improvements you\'d like to see?', entryId: 'entry.2108740022' }
                ]
            }
        };
    }

    /**
     * Initialize the form system
     */
    init() {
        if (this.isInitialized) return;

        // Inject modal HTML into body
        this.injectModalHTML();

        // Bind event listeners
        this.bindEvents();

        this.isInitialized = true;
    }

    /**
     * Inject the modal structure into the page
     */
    injectModalHTML() {
        const modalHTML = `
            <div class="form-modal-overlay" id="formModal">
                <div class="glass-form-container">
                    <!-- Success Message (Hidden by default) -->
                    <div class="form-success-message" id="formSuccess">
                        <div class="success-icon">✓</div>
                        <h3 class="success-title">Message Sent!</h3>
                        <p class="success-description">Thank you for your submission. We'll get back to you shortly.</p>
                    </div>
                    
                    <!-- Form Content -->
                    <div id="formContent">
                        <div class="form-modal-header">
                            <div class="form-header-row">
                                <h2 class="form-modal-title" id="formTitle">Contact Form</h2>
                                <button class="form-close-btn" id="formCloseBtn" type="button">&times;</button>
                            </div>
                            <p class="form-modal-subtitle" id="formSubtitle">Please fill out the form below</p>
                        </div>
                        
                        <form id="dynamicForm" method="POST" target="formBridge">
                            <div id="formFieldsContainer"></div>
                            <button type="submit" class="form-submit-btn" id="formSubmitBtn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Hidden iframe for silent submission -->
            <iframe name="formBridge" id="formBridge" style="display:none;"></iframe>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        const modal = document.getElementById('formModal');
        const closeBtn = document.getElementById('formCloseBtn');
        const form = document.getElementById('dynamicForm');

        if (!modal || !form || !closeBtn) {
            console.error('FormManager: Required modal elements not found');
            return;
        }

        // Close modal events
        closeBtn.addEventListener('click', () => this.closeForm());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeForm();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeForm();
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation on input
        form.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-input') ||
                e.target.classList.contains('form-textarea') ||
                e.target.classList.contains('form-select-hidden')) {
                this.validateField(e.target);
            }
        });

        // Delegate Radio/Checkbox/Dropdown events once at the form level
        form.addEventListener('click', (e) => {
            // Radio logic
            const radioOption = e.target.closest('.radio-option');
            if (radioOption) {
                const radio = radioOption.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    document.querySelectorAll(`input[name="${radio.name}"]`).forEach(r => {
                        r.closest('.radio-option').classList.remove('selected');
                    });
                    radioOption.classList.add('selected');
                }
            }

            // Checkbox logic
            const checkboxOption = e.target.closest('.checkbox-option');
            if (checkboxOption) {
                const checkbox = checkboxOption.querySelector('input[type="checkbox"]');
                // If the user clicked the label/container but not the input itself, toggle it
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    // Dispatch change event manually so the 'change' listener fires
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }

            // Dropdown trigger logic
            const trigger = e.target.closest('.dropdown-trigger');
            if (trigger) {
                const dropdown = trigger.closest('.custom-dropdown');
                e.stopPropagation();
                document.querySelectorAll('.custom-dropdown.open').forEach(openDropdown => {
                    if (openDropdown !== dropdown) openDropdown.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            }

            // Dropdown item selection
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const dropdown = item.closest('.custom-dropdown');
                const hiddenInput = dropdown.querySelector('.form-select-hidden');
                const displayValue = dropdown.querySelector('.dropdown-value');
                const value = item.getAttribute('data-value');
                const text = item.textContent;

                dropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                displayValue.textContent = text;
                displayValue.classList.add('has-value');
                hiddenInput.value = value;
                dropdown.classList.remove('open');
                this.validateField(hiddenInput);
            }
        });

        // Handle checkbox change for styling
        form.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const option = e.target.closest('.checkbox-option');
                if (option) {
                    if (e.target.checked) option.classList.add('selected');
                    else option.classList.remove('selected');
                }
            }
        });
    }

    /**
     * Open the form modal with specified type
     */
    openForm(type) {
        const config = this.formConfigs[type];
        if (!config) {
            console.error(`Form type "${type}" not found`);
            return;
        }

        this.currentFormType = type;
        this.renderForm(config);

        const modal = document.getElementById('formModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the form modal
     */
    closeForm() {
        const modal = document.getElementById('formModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset after animation
        setTimeout(() => {
            this.resetForm();
        }, 400);
    }

    /**
     * Render form fields based on configuration
     */
    renderForm(config) {
        const form = document.getElementById('dynamicForm');
        const title = document.getElementById('formTitle');
        const subtitle = document.getElementById('formSubtitle');
        const container = document.getElementById('formFieldsContainer');

        if (title) title.textContent = config.title;
        if (subtitle) subtitle.textContent = config.subtitle;
        form.action = config.action || '#';

        container.innerHTML = '';

        config.fields.forEach(field => {
            const fieldHTML = this.createFieldHTML(field);
            container.insertAdjacentHTML('beforeend', fieldHTML);
        });

        // Interactive elements are now handled via event delegation in bindEvents()
    }

    /**
     * Create HTML for a single field
     */
    createFieldHTML(field) {
        const requiredMark = field.required ? '<span class="required">*</span>' : '';

        if (field.type === 'header') {
            return `
                <div class="form-section-header">
                    <h3 class="form-section-title">${field.label}</h3>
                    ${field.subtitle ? `<p class="form-section-subtitle">${field.subtitle}</p>` : ''}
                </div>
            `;
        }

        if (field.type === 'checkbox') {
            const options = field.options.map((opt, idx) => `
                <label class="checkbox-option">
                    <input type="checkbox" name="${field.entryId || field.name}" value="${opt}" ${field.required ? '' : ''}>
                    <span>${opt}</span>
                </label>
            `).join('');

            return `
                <div class="form-field-group checkbox-group-container" data-required="${field.required}">
                    <label class="form-field-label">${field.label}${requiredMark}</label>
                    <div class="checkbox-group">
                        ${options}
                    </div>
                    <div class="form-error-message">Please select at least one option</div>
                </div>
            `;
        }

        if (field.type === 'radio') {
            const options = field.options.map((opt, idx) => `
                <label class="radio-option">
                    <input type="radio" name="${field.entryId || field.name}" value="${opt}" ${field.required ? 'required' : ''}>
                    <span>${opt}</span>
                </label>
            `).join('');

            return `
                <div class="form-field-group">
                    <label class="form-field-label">${field.label}${requiredMark}</label>
                    <div class="radio-group">
                        ${options}
                    </div>
                </div>
            `;
        }

        if (field.type === 'select') {
            const options = field.options.map((opt, idx) =>
                `<div class="dropdown-item" data-value="${opt}">${opt}</div>`
            ).join('');

            return `
                <div class="form-field-group">
                    <label class="form-field-label">${field.label}${requiredMark}</label>
                    <div class="custom-dropdown" data-field-name="${field.entryId || field.name}">
                        <div class="dropdown-trigger">
                            <span class="dropdown-value">Select ${field.label}</span>
                            <svg class="dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div class="dropdown-menu">
                            ${options}
                        </div>
                        <input type="hidden" name="${field.entryId || field.name}" class="form-select-hidden" ${field.required ? 'required' : ''}>
                    </div>
                    <div class="form-error-message">This field is required</div>
                </div>
            `;
        }

        if (field.type === 'textarea') {
            return `
                <div class="form-field-group">
                    <label class="form-field-label">${field.label}${requiredMark}</label>
                    <textarea 
                        name="${field.entryId || field.name}" 
                        class="form-textarea" 
                        placeholder="${field.placeholder || ''}"
                        ${field.required ? 'required' : ''}
                    ></textarea>
                    <div class="form-error-message">This field is required</div>
                </div>
            `;
        }

        // Default: text or email input
        return `
            <div class="form-field-group">
                <label class="form-field-label">${field.label}${requiredMark}</label>
                <input 
                    type="${field.type}" 
                    name="${field.entryId || field.name}" 
                    class="form-input"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''}
                >
                <div class="form-error-message">This field is required</div>
            </div>
        `;
    }

    /**
     * Validate a single field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-field-group');

        // For custom dropdowns, find the parent container
        const customDropdown = field.closest('.custom-dropdown');

        if (field.hasAttribute('required') && !value) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            if (customDropdown) customDropdown.classList.add('invalid');
            fieldGroup.classList.add('has-error');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('invalid');
                field.classList.remove('valid');
                fieldGroup.classList.add('has-error');
                return false;
            }
        }

        field.classList.remove('invalid');
        field.classList.add('valid');
        if (customDropdown) {
            customDropdown.classList.remove('invalid');
            customDropdown.classList.add('valid');
        }
        fieldGroup.classList.remove('has-error');
        return true;
    }

    /**
     * Validate entire form
     */
    validateForm() {
        const form = document.getElementById('dynamicForm');
        const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select-hidden');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Check radio groups
        const radioGroups = {};
        form.querySelectorAll('input[type="radio"][required]').forEach(radio => {
            if (!radioGroups[radio.name]) {
                radioGroups[radio.name] = false;
            }
            if (radio.checked) {
                radioGroups[radio.name] = true;
            }
        });

        Object.values(radioGroups).forEach(checked => {
            if (!checked) isValid = false;
        });

        // Check checkbox groups
        form.querySelectorAll('.checkbox-group-container[data-required="true"]').forEach(group => {
            const checked = group.querySelectorAll('input[type="checkbox"]:checked');
            if (checked.length === 0) {
                isValid = false;
                group.classList.add('has-error');
            } else {
                group.classList.remove('has-error');
            }
        });

        return isValid;
    }

    /**
     * Handle form submission
     */
    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const form = document.getElementById('dynamicForm');
        const submitBtn = document.getElementById('formSubmitBtn');
        const originalBtnText = submitBtn.textContent;

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        form.target = "formBridge";

        const iframe = document.getElementById('formBridge');
        const handleResponse = () => {
            this.showSuccess();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            iframe.removeEventListener('load', handleResponse);
        };
        iframe.addEventListener('load', handleResponse);

        form.submit();
    }

    /**
     * Show success message
     */
    showSuccess() {
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').classList.add('active');

        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeForm();
        }, 3000);
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        document.getElementById('formContent').style.display = 'block';
        document.getElementById('formSuccess').classList.remove('active');
        document.getElementById('dynamicForm').reset();
        document.getElementById('formSubmitBtn').classList.remove('loading');
        document.getElementById('formSubmitBtn').textContent = 'Send Message';

        // Clear validation states
        document.querySelectorAll('.form-input, .form-textarea, .form-select-hidden').forEach(field => {
            field.classList.remove('valid', 'invalid');
            field.closest('.form-field-group').classList.remove('has-error');
        });

        // Reset custom dropdowns
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
            dropdown.classList.remove('valid', 'invalid');
            const displayValue = dropdown.querySelector('.dropdown-value');
            if (displayValue) {
                const config = this.formConfigs[this.currentFormType];
                const fieldName = dropdown.getAttribute('data-field-name');
                const field = config.fields.find(f => (f.entryId || f.name) === fieldName);
                displayValue.textContent = 'Select ' + (field ? field.label : 'Option');
                displayValue.classList.remove('has-value');
            }
        });
    }
}

// Initialize immediately if DOM is ready, otherwise wait for DOMContentLoaded
// This ensures openForm is available for inline onclick handlers
let formManagerInstance = null;

function initFormManager() {
    if (!formManagerInstance) {
        formManagerInstance = new FormManager();
    }
}

// Expose openForm globally immediately (will queue calls if needed)
window.openForm = function (type) {
    if (formManagerInstance && formManagerInstance.isInitialized) {
        formManagerInstance.openForm(type);
    } else {
        // If not initialized yet, wait for DOM and then open
        const tryOpen = () => {
            if (formManagerInstance && formManagerInstance.isInitialized) {
                formManagerInstance.openForm(type);
            } else {
                setTimeout(tryOpen, 50);
            }
        };
        tryOpen();
    }
};

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormManager);
} else {
    // DOM is already ready
    initFormManager();
}

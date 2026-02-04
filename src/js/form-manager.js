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
                action: '', // Will be filled by user: forms.gle/DCd4PkYEMFKoqKiJ8
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'John Doe', entryId: '' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com', entryId: '' },
                    {
                        name: 'issueType',
                        label: 'Issue Type',
                        type: 'select',
                        required: true,
                        options: ['Interface', 'Generator Logic', 'Performance', 'Mobile', 'Export'],
                        entryId: ''
                    },
                    {
                        name: 'severity',
                        label: 'Severity',
                        type: 'select',
                        required: true,
                        options: ['Blocker', 'Major', 'Minor', 'Tweak'],
                        entryId: ''
                    },
                    { name: 'environment', label: 'Environment (Browser & OS)', type: 'text', required: false, placeholder: 'Chrome 120 on Windows 11', entryId: '' },
                    { name: 'expected', label: 'Expected Behavior', type: 'textarea', required: true, placeholder: 'What did you expect to happen?', entryId: '' },
                    { name: 'actual', label: 'Actual Behavior', type: 'textarea', required: true, placeholder: 'What actually happened?', entryId: '' },
                    { name: 'steps', label: 'Steps to Reproduce', type: 'textarea', required: true, placeholder: '1. Go to...\n2. Click on...\n3. See error', entryId: '' },
                    { name: 'errors', label: 'Error Logs/Messages', type: 'textarea', required: false, placeholder: 'Paste any error messages from console', entryId: '' }
                ]
            },
            feature: {
                title: 'Request a Feature',
                subtitle: 'Share your ideas to make the tool even better',
                action: '', // forms.gle/6iXQA6vYfNjFQwfp9
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Jane Smith', entryId: '' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'jane@example.com', entryId: '' },
                    { name: 'featureTitle', label: 'Feature Name', type: 'text', required: true, placeholder: 'Real-time Collaboration', entryId: '' },
                    {
                        name: 'context',
                        label: 'Feature Area',
                        type: 'select',
                        required: true,
                        options: ['Dictionary', 'Export Tools', 'AI Integration', 'Workflow', 'Mobile App'],
                        entryId: ''
                    },
                    { name: 'problem', label: 'Problem to Solve', type: 'textarea', required: true, placeholder: 'Why is this feature needed?', entryId: '' },
                    { name: 'solution', label: 'Proposed Solution', type: 'textarea', required: true, placeholder: 'How would this feature work?', entryId: '' },
                    { name: 'useCase', label: 'Use Case Scenario', type: 'textarea', required: true, placeholder: 'Describe a real-world scenario where this would be useful', entryId: '' },
                    {
                        name: 'priority',
                        label: 'Priority Level',
                        type: 'select',
                        required: true,
                        options: ['Critical for my work', 'Would improve my workflow', 'Nice to have'],
                        entryId: ''
                    }
                ]
            },
            general: {
                title: 'General Inquiry',
                subtitle: 'Get in touch for partnerships, press, or general questions',
                action: '', // forms.gle/nNbEK5uLwU4fS4iy9
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Alex Johnson', entryId: '' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'alex@example.com', entryId: '' },
                    {
                        name: 'category',
                        label: 'Subject Category',
                        type: 'select',
                        required: true,
                        options: ['Partnership', 'Press/Media', 'General Feedback', 'Other'],
                        entryId: ''
                    },
                    {
                        name: 'contactMethod',
                        label: 'Preferred Contact Method',
                        type: 'select',
                        required: false,
                        options: ['Email', 'Phone', 'Video Call'],
                        entryId: ''
                    },
                    { name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'What is your inquiry about?', entryId: '' },
                    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Please provide detailed information...', entryId: '' }
                ]
            },
            security: {
                title: 'Report Security Issue',
                subtitle: 'We take security seriously. Your report is confidential.',
                action: '', // forms.gle/wdr5GBkxZGmbA18i8
                fields: [
                    { name: 'alias', label: 'Name/Alias', type: 'text', required: true, placeholder: 'You can use an alias for anonymity', entryId: '' },
                    { name: 'email', label: 'Secure Email', type: 'email', required: true, placeholder: 'secure@example.com', entryId: '' },
                    {
                        name: 'vulnType',
                        label: 'Vulnerability Category',
                        type: 'select',
                        required: true,
                        options: ['XSS', 'Authentication Bypass', 'SQL Injection', 'Logic Flaw', 'Data Leak', 'Other'],
                        entryId: ''
                    },
                    { name: 'component', label: 'Target Component', type: 'text', required: true, placeholder: 'e.g., Login Form, API Endpoint', entryId: '' },
                    {
                        name: 'impact',
                        label: 'Threat Impact',
                        type: 'select',
                        required: true,
                        options: ['Low', 'Medium', 'High', 'Critical'],
                        entryId: ''
                    },
                    { name: 'poc', label: 'Proof of Concept Steps', type: 'textarea', required: true, placeholder: 'Detailed steps to reproduce the vulnerability', entryId: '' },
                    { name: 'remediation', label: 'Suggested Fix', type: 'textarea', required: false, placeholder: 'If you have recommendations for a fix', entryId: '' }
                ]
            },
            privacy: {
                title: 'Privacy & Data Request',
                subtitle: 'Exercise your data rights under GDPR/CCPA',
                action: '', // forms.gle/YRTq4Xg8WMPSDqW37
                fields: [
                    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Legal Name', entryId: '' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'email@example.com', entryId: '' },
                    { name: 'reference', label: 'Account Identifier (if applicable)', type: 'text', required: false, placeholder: 'User ID or email on file', entryId: '' },
                    {
                        name: 'requestType',
                        label: 'Request Type',
                        type: 'select',
                        required: true,
                        options: ['Right to be Forgotten (Delete Data)', 'Data Access Request', 'Opt-Out of Processing', 'Data Correction'],
                        entryId: ''
                    },
                    {
                        name: 'jurisdiction',
                        label: 'Jurisdiction',
                        type: 'select',
                        required: false,
                        options: ['GDPR (EU)', 'CCPA (California)', 'Other'],
                        entryId: ''
                    },
                    { name: 'details', label: 'Request Details', type: 'textarea', required: true, placeholder: 'Provide specific information about your request', entryId: '' }
                ]
            },
            legal: {
                title: 'Legal & Compliance Inquiry',
                subtitle: 'Questions about terms, licensing, or legal matters',
                action: '', // forms.gle/sV9y7hyzix652h6X8
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Full Name', entryId: '' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'email@example.com', entryId: '' },
                    { name: 'organization', label: 'Organization (if applicable)', type: 'text', required: false, placeholder: 'Company Name', entryId: '' },
                    {
                        name: 'topic',
                        label: 'Topic Area',
                        type: 'select',
                        required: true,
                        options: ['Licensing', 'Trademark', 'Terms Violation', 'Copyright', 'General Legal'],
                        entryId: ''
                    },
                    { name: 'clause', label: 'Specific Clause Reference', type: 'text', required: false, placeholder: 'Section or clause number', entryId: '' },
                    { name: 'inquiry', label: 'Question or Concern', type: 'textarea', required: true, placeholder: 'Describe your legal question or concern', entryId: '' }
                ]
            },
            voting: {
                title: 'Pro Feature Poll',
                subtitle: 'Help prioritize the features you want most',
                action: '', // forms.gle/RJ9r4UyEw2eNdRYb9
                fields: [
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Name', entryId: '' },
                    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'email@example.com', entryId: '' },
                    {
                        name: 'profile',
                        label: 'User Profile',
                        type: 'select',
                        required: true,
                        options: ['Hobbyist', 'Professional Director', 'Studio/Agency', 'Developer/Integrator'],
                        entryId: ''
                    },
                    {
                        name: 'priority',
                        label: 'Top Priority Feature',
                        type: 'radio',
                        required: true,
                        options: ['Real-time Video Preview', '3D Scene Controls', 'Team Collaboration', 'Advanced Export Formats', 'API Access'],
                        entryId: ''
                    },
                    {
                        name: 'secondary',
                        label: 'Secondary Interest',
                        type: 'select',
                        required: false,
                        options: ['Real-time Video Preview', '3D Scene Controls', 'Team Collaboration', 'Advanced Export Formats', 'API Access'],
                        entryId: ''
                    },
                    { name: 'workflow', label: 'Current Workflow', type: 'textarea', required: false, placeholder: 'How do you currently manage multi-shot video projects?', entryId: '' },
                    { name: 'feedback', label: 'Additional Feedback', type: 'textarea', required: false, placeholder: 'Any other features or improvements you\'d like to see?', entryId: '' }
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

        // Make openForm globally accessible
        window.openForm = (type) => this.openForm(type);

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

        // Special handling for interactive elements
        this.bindRadioGroups();
        this.bindCustomDropdowns();
    }

    /**
     * Bind custom dropdown interactions
     */
    bindCustomDropdowns() {
        const dropdowns = document.querySelectorAll('.custom-dropdown');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const items = dropdown.querySelectorAll('.dropdown-item');
            const hiddenInput = dropdown.querySelector('.form-select-hidden');
            const displayValue = dropdown.querySelector('.dropdown-value');

            // Toggle menu
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other dropdowns
                document.querySelectorAll('.custom-dropdown.open').forEach(openDropdown => {
                    if (openDropdown !== dropdown) openDropdown.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            });

            // Handle item selection
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = item.getAttribute('data-value');
                    const text = item.textContent;

                    // Update UI
                    items.forEach(i => i.classList.remove('selected'));
                    item.classList.add('selected');
                    displayValue.textContent = text;
                    displayValue.classList.add('has-value');

                    // Update hidden input
                    hiddenInput.value = value;
                    dropdown.classList.remove('open');

                    // Trigger validation
                    this.validateField(hiddenInput);
                });
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        });
    }

    /**
     * Create HTML for a single field
     */
    createFieldHTML(field) {
        const requiredMark = field.required ? '<span class="required">*</span>' : '';

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
     * Bind radio button interactions
     */
    bindRadioGroups() {
        const radioOptions = document.querySelectorAll('.radio-option');
        radioOptions.forEach(option => {
            option.addEventListener('click', function () {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;

                // Remove selected class from siblings
                const name = radio.name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.radio-option').classList.remove('selected');
                });

                // Add to this option
                this.classList.add('selected');
            });
        });
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

        const submitBtn = document.getElementById('formSubmitBtn');
        submitBtn.classList.add('loading');
        submitBtn.textContent = '';

        // The form will submit to the iframe automatically
        // When iframe loads, we'll show success
        const iframe = document.getElementById('formBridge');
        iframe.onload = () => {
            this.showSuccess();
        };

        // Manual submit to trigger iframe
        document.getElementById('dynamicForm').submit();
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new FormManager();
});

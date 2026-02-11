
import { DictionaryService } from './dictionaryService.js';
import { AnalyticsService } from './analyticsService.js';

class DictionaryPage {
    constructor() {
        this.dictionaryService = new DictionaryService();
        this.gaTracker = new AnalyticsService();


        this.activeCategory = null; // Will set on init
        this.editingTermId = null;

        // UI Elements
        this.dictSidebar = document.getElementById('dict-sidebar');
        this.dictSidebarOverlay = document.getElementById('dict-sidebar-overlay');
        this.dictHamburgerBtn = document.getElementById('dict-hamburger-btn');
        this.dictSidebarClose = document.getElementById('dict-sidebar-close');
        this.dictCategoryList = document.getElementById('dict-category-list');
        this.dictActiveCategoryTitle = document.getElementById('dict-active-category-title');
        this.dictSearchInput = document.getElementById('dict-search');
        this.dictContentArea = document.getElementById('dict-content');

        this.contributeBtn = document.getElementById('dict-contribute-btn');
        this.contributionModal = document.getElementById('contribution-modal');
        this.modalCloseBtn = document.getElementById('modal-close-btn');
        this.modalCancelBtn = document.getElementById('modal-cancel-btn');
        this.modalSubmitBtn = document.getElementById('modal-submit-btn');

        // Modal Inputs
        this.contribUsername = document.getElementById('contrib-username');
        this.contribTermName = document.getElementById('contrib-term-name');
        this.contribDefinition = document.getElementById('contrib-definition');
        this.contribExamples = document.getElementById('contrib-examples');
        this.contribDifficultyPills = document.getElementById('contrib-difficulty-pills');

        // Custom Dropdown
        this.customDropdown = document.getElementById('custom-category-dropdown');
        this.dropdownTrigger = document.getElementById('dropdown-trigger');
        this.dropdownMenu = document.getElementById('dropdown-menu');
        this.dropdownValue = document.querySelector('.dropdown-value');
        this.newCategoryNameInput = document.getElementById('new-category-name');
        this.selectedCategoryId = null;

        this.init();
    }

    async init() {
        await this.dictionaryService.init();

        this.renderSidebarCategories();
        this.bindEvents();

        // Default selection: First available category
        const categories = this.dictionaryService.getAllCategories();
        if (categories.length > 0) {
            this.activeCategory = categories[0].id; // "camera" usually
            this.selectCategory(this.activeCategory);
        } else {
            this.renderTermsByCategory(null);
        }
    }

    bindEvents() {
        // Sidebar Toggles
        this.dictHamburgerBtn.addEventListener('click', () => {
            this.dictSidebar.classList.add('active');
            this.dictSidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeSidebar = () => {
            this.dictSidebar.classList.remove('active');
            this.dictSidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        this.dictSidebarClose.addEventListener('click', closeSidebar);
        this.dictSidebarOverlay.addEventListener('click', closeSidebar);

        // Search
        this.dictSearchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Contribution Modal
        if (this.contributeBtn) {
            this.contributeBtn.addEventListener('click', () => {
                this.resetModal();
                this.gaTracker.trackEvent('dict_contribute_click');
                this.contributionModal.classList.remove('hidden');
            });
        }

        if (this.modalCloseBtn) {
            this.modalCloseBtn.addEventListener('click', () => {
                this.contributionModal.classList.add('hidden');
            });
        }

        if (this.modalCancelBtn) {
            this.modalCancelBtn.addEventListener('click', () => {
                this.contributionModal.classList.add('hidden');
            });
        }

        if (this.modalSubmitBtn) {
            this.modalSubmitBtn.addEventListener('click', () => this.handleModalSubmit());
        }

        // Difficulty Pills
        if (this.contribDifficultyPills) {
            this.contribDifficultyPills.querySelectorAll('.pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    this.contribDifficultyPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                });
            });
        }

        // Custom Dropdown
        if (this.dropdownTrigger) {
            this.dropdownTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.customDropdown.classList.toggle('open');
                this.dropdownMenu.classList.toggle('hidden');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.customDropdown && !this.customDropdown.contains(e.target)) {
                this.customDropdown.classList.remove('open');
                this.dropdownMenu.classList.add('hidden');
            }
        });
    }

    renderSidebarCategories() {
        if (!this.dictCategoryList) return;
        this.dictCategoryList.innerHTML = '';

        const categories = this.dictionaryService.getAllCategories();

        categories.forEach(cat => {
            const li = document.createElement('li');
            const isUserCategory = this.dictionaryService.isCategoryUserCreated(cat.id);
            if (isUserCategory) li.classList.add('user-category');

            // Category Name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = cat.name;
            nameSpan.className = 'category-name';
            li.appendChild(nameSpan);

            // Delete Button (User Categories)
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
                    this.handleDeleteCategory(cat.id);
                });
                li.appendChild(deleteBtn);
            }

            li.dataset.catId = cat.id;
            // Click Event
            li.addEventListener('click', (e) => {
                // Ignore if clicked on delete btn (managed by stopPropagation above, but safety check)
                if (e.target.closest('.category-delete-btn')) return;

                this.selectCategory(cat.id);

                // Close sidebar on mobile
                this.dictSidebar.classList.remove('active');
                this.dictSidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });

            this.dictCategoryList.appendChild(li);
        });
    }

    selectCategory(categoryId) {
        this.activeCategory = categoryId;

        // Update Active State in Sidebar
        this.dictCategoryList.querySelectorAll('li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.catId === categoryId) item.classList.add('active');
        });

        // Update Title
        const cat = this.dictionaryService.getAllCategories().find(c => c.id === categoryId);
        this.dictActiveCategoryTitle.textContent = cat ? cat.name : 'Select a Category';

        // Render Terms
        this.renderTermsByCategory(categoryId);
    }

    renderTermsByCategory(categoryId) {
        this.dictContentArea.innerHTML = '';

        if (!categoryId) {
            this.dictContentArea.innerHTML = '<div class="empty-state">Select a category from the sidebar to view terms</div>';
            return;
        }

        const terms = this.dictionaryService.getTermsByCategory(categoryId);
        if (terms.length === 0) {
            this.dictContentArea.innerHTML = '<div class="empty-state">No terms in this category yet.</div>';
            return;
        }

        terms.forEach(term => {
            const card = this.createEnhancedTermCard(term);
            this.dictContentArea.appendChild(card);
        });
    }

    createEnhancedTermCard(term) {
        const div = document.createElement('div');
        const isUserTerm = this.dictionaryService.isUserCreated(term.id);
        div.className = `term-card ${isUserTerm ? 'user-term' : ''}`;
        div.dataset.termId = term.id;

        // Difficulty Badge
        const difficultyClass = (term.difficulty || 'beginner').toLowerCase();

        // Examples
        const examplesHtml = term.examples && term.examples.length > 0
            ? `<div class="term-examples">
                <h5>Examples:</h5>
                <ul>${term.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>
               </div>`
            : '';

        const authorName = term.author || 'System';

        // Likes Logic - check LocalStorage
        const likedTerms = JSON.parse(localStorage.getItem('likedTerms') || '[]');
        const isLiked = likedTerms.includes(term.id);

        // Base likes + 1 if liked by user (simulated)
        let likes = term.likes || 0;
        if (isLiked) {
            // Check if term.likes already includes user like? 
            // Assuming static JSON, we add 1 visually if stored in local
            // Actually app.js just increments/decrements current value.
            // We'll trust the stored 'liked' state to set the class, 
            // and maybe increment the display count if liked.
            likes += 1;
        }

        // Edit/Delete Buttons for User Terms
        const managementButtons = isUserTerm ? `
            <button class="term-manage-btn edit-btn" title="Edit Term">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <button class="term-manage-btn delete-btn" title="Delete Term">
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
                    <button class="term-action-btn like-btn ${isLiked ? 'liked' : ''}" data-term-id="${term.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span class="like-count">${likes}</span>
                    </button>
                    <button class="btn-use-prompt">Use in Prompt</button>
                </div>
            </div>
        `;

        // Event Listeners
        const likeBtn = div.querySelector('.like-btn');
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleLikeTerm(term.id, likeBtn);
        });

        const useBtn = div.querySelector('.btn-use-prompt');
        useBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleUseInPrompt(term);
        });

        if (isUserTerm) {
            const editBtn = div.querySelector('.edit-btn');
            if (editBtn) editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleEditTerm(term);
            });

            const deleteBtn = div.querySelector('.delete-btn');
            if (deleteBtn) deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleDeleteTerm(term.id);
            });
        }

        return div;
    }

    handleLikeTerm(termId, btn) {
        // Toggle liked state visually
        const isLiked = btn.classList.toggle('liked');
        const countSpan = btn.querySelector('.like-count');
        const svg = btn.querySelector('svg');

        svg.setAttribute('fill', isLiked ? 'currentColor' : 'none');

        let currentLikes = parseInt(countSpan.textContent) || 0;
        if (isLiked) {
            currentLikes++;
        } else {
            currentLikes = Math.max(0, currentLikes - 1);
        }
        countSpan.textContent = currentLikes;

        this.gaTracker.trackEvent('dict_term_like', { termId, liked: isLiked });

        // Persist to localStorage
        const likedTerms = JSON.parse(localStorage.getItem('likedTerms') || '[]');
        if (isLiked) {
            if (!likedTerms.includes(termId)) likedTerms.push(termId);
        } else {
            const idx = likedTerms.indexOf(termId);
            if (idx > -1) likedTerms.splice(idx, 1);
        }
        localStorage.setItem('likedTerms', JSON.stringify(likedTerms));
    }

    handleUseInPrompt(term) {
        // Store for app.html to pick up
        localStorage.setItem('pending_dict_term', JSON.stringify(term));

        // Redirect to main app (first tab)
        window.location.href = 'app.html';
    }

    handleSearch(query) {
        query = query.trim();
        if (query.length > 0) {
            this.dictCategoryList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            this.dictActiveCategoryTitle.textContent = `Search: "${query}"`;

            const results = this.dictionaryService.searchTerm(query);
            this.renderSearchResults(results);
        } else {
            if (this.activeCategory) {
                this.selectCategory(this.activeCategory);
            } else {
                this.dictContentArea.innerHTML = '<div class="empty-state">Select a category from the sidebar to view terms</div>';
            }
        }
    }

    renderSearchResults(results) {
        this.dictContentArea.innerHTML = '';
        if (results.length === 0) {
            this.dictContentArea.innerHTML = '<div class="empty-state">No terms found matching your query.</div>';
            return;
        }

        results.forEach(group => {
            const header = document.createElement('div');
            header.className = 'search-category-header';
            header.textContent = group.categoryName;
            this.dictContentArea.appendChild(header);

            group.terms.forEach(term => {
                const card = this.createEnhancedTermCard(term);
                this.dictContentArea.appendChild(card);
            });
        });
    }

    // --- Modal & Category Management ---

    resetModal() {
        this.editingTermId = null;
        this.contribUsername.value = '';
        this.contribTermName.value = '';
        this.contribDefinition.value = '';
        this.contribExamples.value = '';
        this.newCategoryNameInput.value = '';
        this.newCategoryNameInput.classList.add('hidden');
        this.dropdownValue.textContent = 'Select a category';
        this.dropdownValue.classList.remove('has-value');
        this.selectedCategoryId = this.activeCategory || null;

        // Populate modal categories
        this.populateModalCategories();

        if (this.selectedCategoryId) {
            const cat = this.dictionaryService.getAllCategories().find(c => c.id === this.selectedCategoryId);
            if (cat) {
                this.dropdownValue.textContent = cat.name;
            }
        }

        this.contribDifficultyPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        if (this.modalSubmitBtn) this.modalSubmitBtn.textContent = 'Submit Term';
    }

    populateModalCategories() {
        if (!this.dropdownMenu) return;
        this.dropdownMenu.innerHTML = '';

        const categories = this.dictionaryService.getAllCategories();
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            if (cat.id === this.selectedCategoryId) item.classList.add('selected');
            item.textContent = cat.name;
            item.addEventListener('click', () => {
                this.selectedCategoryId = cat.id;
                this.dropdownValue.textContent = cat.name;
                this.dropdownValue.classList.add('has-value');
                this.newCategoryNameInput.classList.add('hidden');
                this.customDropdown.classList.remove('open');
                this.dropdownMenu.classList.add('hidden');
            });
            this.dropdownMenu.appendChild(item);
        });

        // Add "Create New Category"
        const newItem = document.createElement('div');
        newItem.className = 'dropdown-item new-category-btn';
        newItem.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Category
        `;
        newItem.addEventListener('click', () => {
            this.selectedCategoryId = 'new';
            this.dropdownValue.textContent = 'New Category';
            this.newCategoryNameInput.classList.remove('hidden');
            this.newCategoryNameInput.focus();
            this.customDropdown.classList.remove('open');
            this.dropdownMenu.classList.add('hidden');
        });
        this.dropdownMenu.appendChild(newItem);
    }

    handleModalSubmit() {
        const termName = this.contribTermName.value.trim();
        const definition = this.contribDefinition.value.trim();
        const username = this.contribUsername.value.trim() || 'Anonymous';

        if (!termName || !definition || !this.selectedCategoryId) {
            alert('Please fill in all required fields.');
            return;
        }

        // Difficulty
        const activePill = this.contribDifficultyPills.querySelector('.pill.active');
        const difficulty = activePill ? activePill.dataset.value : 'intermediate';

        let categoryId = this.selectedCategoryId;
        if (categoryId === 'new') {
            const newCatName = this.newCategoryNameInput.value.trim();
            if (!newCatName) {
                alert('Please enter a name for the new category.');
                return;
            }
            categoryId = 'user_cat_' + Date.now();
            this.dictionaryService.addCategory({
                id: categoryId,
                name: newCatName,
                author: username
            });
        }

        const termData = {
            name: termName,
            definition: definition,
            difficulty: difficulty,
            examples: this.contribExamples.value.split(',').map(s => s.trim()).filter(Boolean), // Array
            author: username
        };

        if (this.editingTermId) {
            this.dictionaryService.editTerm(categoryId, this.editingTermId, termData);
        } else {
            this.dictionaryService.addTerm(categoryId, termData);
        }

        this.contributionModal.classList.add('hidden');
        // Refresh sidebar if category added
        this.renderSidebarCategories();
        // Refresh terms
        this.selectCategory(categoryId);
    }

    handleEditTerm(term) {
        this.editingTermId = term.id;

        // Fill form
        this.contribUsername.value = term.author || '';
        this.contribTermName.value = term.name;
        this.contribDefinition.value = term.definition;
        this.contribExamples.value = term.examples ? term.examples.join(', ') : '';

        // Set category
        const termInfo = this.dictionaryService.getTermById(term.id);
        const categoryId = termInfo.categoryId;
        this.selectedCategoryId = categoryId;

        const cat = this.dictionaryService.getAllCategories().find(c => c.id === categoryId);
        if (cat) {
            this.dropdownValue.textContent = cat.name;
            this.dropdownValue.classList.add('has-value');
        }

        // Difficulty
        this.contribDifficultyPills.querySelectorAll('.pill').forEach(p => {
            p.classList.remove('active');
            if (p.dataset.value === term.difficulty) p.classList.add('active');
        });

        this.contributionModal.classList.remove('hidden');
        if (this.modalSubmitBtn) this.modalSubmitBtn.textContent = 'Update Term';
    }

    handleDeleteTerm(termId) {
        if (confirm('Are you sure you want to delete this term?')) {
            const termInfo = this.dictionaryService.getTermById(termId);
            if (termInfo) {
                this.dictionaryService.deleteTerm(termInfo.categoryId, termId);
                this.renderTermsByCategory(this.activeCategory);
            }
        }
    }

    handleDeleteCategory(categoryId) {
        if (confirm('Delete this category and all its terms?')) {
            this.dictionaryService.deleteCategory(categoryId);
            this.renderSidebarCategories();
            if (this.activeCategory === categoryId) {
                this.activeCategory = null;
                this.dictContentArea.innerHTML = '<div class="empty-state">Select a category...</div>';
            }
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new DictionaryPage();
});

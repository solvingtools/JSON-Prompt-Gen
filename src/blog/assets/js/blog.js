// Blog Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('blogSearch');
    const blogGrid = document.getElementById('blogGrid');

    let activePlatform = 'all';
    let searchTerm = '';

    // Create No Results message if it doesn't exist
    const createNoResultsMessage = () => {
        let msg = document.getElementById('no-results-message');
        if (!msg) {
            msg = document.createElement('div');
            msg.id = 'no-results-message';
            msg.className = 'empty-state-container hidden';
            msg.innerHTML = `
                <div class="empty-state">
                    <p>No guides found matching your criteria.</p>
                    <button class="btn btn-secondary" id="resetFilters">Clear All Filters</button>
                </div>
            `;
            blogGrid.parentNode.appendChild(msg);

            document.getElementById('resetFilters')?.addEventListener('click', () => {
                activePlatform = 'all';
                searchTerm = '';
                if (searchInput) searchInput.value = '';
                filterBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.platform === 'all');
                });
                applyFilters();
            });
        }
        return msg;
    };

    const noResultsMsg = createNoResultsMessage();

    function applyFilters() {
        let visibleCount = 0;

        blogCards.forEach(card => {
            const cardPlatform = card.dataset.platform;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const badge = card.querySelector('.platform-badge').textContent.toLowerCase();

            const matchesPlatform = activePlatform === 'all' || cardPlatform === activePlatform;
            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                excerpt.includes(searchTerm) ||
                badge.includes(searchTerm);

            if (matchesPlatform && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/Hide no results message
        if (visibleCount === 0) {
            noResultsMsg.classList.remove('hidden');
        } else {
            noResultsMsg.classList.add('hidden');
        }
    }

    // Platform Filter Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activePlatform = btn.dataset.platform;
            applyFilters();
        });
    });

    // Search Input
    searchInput?.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        applyFilters();
    });

    // Handle card clicks
    blogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && e.target.closest('a') === null) {
                const link = card.querySelector('.read-more-btn');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });

    console.log('Blog Engine Initialized');
});

// Blog Functionality

// Platform Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const platform = btn.dataset.platform;

        // Filter blog cards
        blogCards.forEach(card => {
            if (platform === 'all' || card.dataset.platform === platform) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search Functionality
const searchInput = document.getElementById('blogSearch');

searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
        const platform = card.querySelector('.platform-badge').textContent.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || platform.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // TODO: Integrate with newsletter service
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    newsletterForm.reset();
});

// Smooth Scroll for Blog Cards
blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Only navigate if clicking on the card itself, not on links
        if (e.target.tagName !== 'A') {
            const link = card.querySelector('.read-more-btn');
            if (link) {
                window.location.href = link.href;
            }
        }
    });
});

// Add hover sound effect (optional)
if ('AudioContext' in window) {
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle hover feedback without actual sound
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Lazy load images when implemented
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Future: load actual images here
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

document.querySelectorAll('.blog-card-image').forEach(img => {
    imageObserver.observe(img);
});

console.log('Blog JS loaded successfully');

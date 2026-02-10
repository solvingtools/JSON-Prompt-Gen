// Post Page Functionality

// Copy Code Button
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const codeBlock = btn.closest('.code-block').querySelector('code');
        const code = codeBlock.textContent;

        try {
            await navigator.clipboard.writeText(code);
            btn.textContent = '✓ Copied!';
            btn.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#4CAF50';

            setTimeout(() => {
                btn.textContent = 'Copy';
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            btn.textContent = '✗ Failed';
        }
    });
});

// Smooth Scroll for TOC Links
const tocLinks = document.querySelectorAll('.table-of-contents a');

tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 100; // Account for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight Current TOC Section
const sections = document.querySelectorAll('.post-content section[id]');
const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -66%',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active class from all TOC links
            tocLinks.forEach(link => {
                link.style.color = '';
                link.style.background = '';
            });

            // Add active class to current TOC link
            const activeLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--accent-blue)';
                activeLink.style.background = 'rgba(33, 150, 243, 0.15)';
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Social Share Buttons
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const url = window.location.href;
        const title = document.querySelector('.post-hero h1').textContent;

        if (btn.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (btn.classList.contains('linkedin')) {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else if (btn.classList.contains('reddit')) {
            window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        }
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form-large');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // TODO: Integrate with newsletter service
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    newsletterForm.reset();
});

// Reading Progress Bar (optional enhancement)
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
};

createProgressBar();

console.log('Post JS loaded successfully');

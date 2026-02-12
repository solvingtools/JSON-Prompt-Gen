import Engine from './core/Engine.js';
import FloatingField from './objects/FloatingField.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // === 3D Engine Init ===
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
        const engine = new Engine(canvas);
        const field = new FloatingField();
        engine.add(field);

        // === GSAP Orchestration ===

        // 1. Entrance Sequence
        const tl = gsap.timeline();

        // Initial set
        gsap.set(canvas, { opacity: 0 });
        gsap.set('.hero-centered > *', { y: 50, opacity: 0 });

        // Sequence
        tl.to(canvas, { duration: 2, opacity: 1, ease: 'power2.inOut' })
            .to('.hero-centered > *', {
                duration: 1,
                y: 0,
                opacity: 1,
                stagger: 0.2,
                ease: 'back.out(1.7)'
            }, '-=1.0');

        // 2. Scroll Triggers

        // Background Blur
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                // Blur increases as you scroll
                gsap.to(canvas, { filter: `blur(${self.progress * 10}px)`, overwrite: 'auto' });
            }
        });

        // Parallax Prism Card
        gsap.to('.prism-card-wrapper', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            yPercent: -50, // Move up faster
            ease: 'none'
        });
    }

    // === Interactive Demo Logic ===
    const platformSelect = document.getElementById('demo-platform');
    const cameraSelect = document.getElementById('demo-camera');
    const moodSelect = document.getElementById('demo-mood');
    const codeBlock = document.getElementById('demo-code-block').querySelector('code');
    const exportBtn = document.getElementById('demo-export-btn');

    // Initial State
    const demoState = {
        platform: 'veo',
        camera: 'dolly_push',
        mood: 'cyberpunk'
    };

    function updateCodePreview() {
        const platformMap = {
            'veo': 'veo_3.1',
            'sora': 'sora_v1',
            'kling': 'kling_2.6'
        };

        const json = {
            platform: platformMap[demoState.platform],
            camera: demoState.camera,
            mood: demoState.mood,
            // Add some "Ghost" randomness for realism
            seed: Math.floor(Math.random() * 1000000)
        };

        // Custom syntax highlighting HTML generation
        const highlightedJson = `{
  <span class="key">"platform"</span>: <span class="string">"${json.platform}"</span>,
  <span class="key">"camera"</span>: <span class="string">"${json.camera}"</span>,
  <span class="key">"mood"</span>: <span class="string">"${json.mood}"</span>,
  <span class="key">"seed"</span>: <span class="number">${json.seed}</span>
}`;
        codeBlock.innerHTML = highlightedJson;
    }

    // Event Listeners
    if (platformSelect) {
        platformSelect.addEventListener('change', (e) => {
            demoState.platform = e.target.value;
            updateCodePreview();
        });
    }

    if (cameraSelect) {
        cameraSelect.addEventListener('change', (e) => {
            demoState.camera = e.target.value;
            updateCodePreview();
        });
    }

    if (moodSelect) {
        moodSelect.addEventListener('change', (e) => {
            demoState.mood = e.target.value;
            updateCodePreview();
        });
    }

    // === Waitlist Modal Logic ===
    const modal = document.getElementById('waitlist-modal');
    const closeModal = document.getElementById('close-modal');
    const waitlistForm = document.getElementById('waitlist-form');
    const formSourceInput = document.getElementById('form-source');
    const heroNotifyBtn = document.getElementById('hero-notify-btn');

    if (exportBtn && modal && formSourceInput) {
        exportBtn.addEventListener('click', () => {
            formSourceInput.value = 'demo_export_btn';
            modal.classList.remove('hidden');
        });
    }

    if (heroNotifyBtn && modal && formSourceInput) {
        heroNotifyBtn.addEventListener('click', () => {
            formSourceInput.value = 'hero_notify_btn';
            modal.classList.remove('hidden');
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Handle "Invisible" Form Submission
    if (waitlistForm && modal) {
        waitlistForm.addEventListener('submit', () => {
            // Since we are targeting a hidden iframe, the page won't reload.
            // We just need to show a success state.
            const submitBtn = waitlistForm.querySelector('button');
            const originalText = submitBtn ? submitBtn.textContent : 'Join';
            if (submitBtn) submitBtn.textContent = 'Joined!';

            setTimeout(() => {
                modal.classList.add('hidden');
                if (submitBtn) submitBtn.textContent = originalText;
                alert("Thanks for joining! (Simulation: Data sent to Google Form)");
            }, 1500);
        });
    }


    // === Sticky CTA Logic ===
    const stickyCta = document.getElementById('sticky-cta');
    const modelsSection = document.getElementById('models');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.classList.add('visible');
            } else {
                // simple logic: if we scroll WAY back up, maybe hide it? 
                // For now, let's keep it visible once triggered or toggle based on hero visibility.
            }
        });
    }, { threshold: 0.1 });

    if (modelsSection) {
        observer.observe(modelsSection);
    }

    // === Exit Intent Logic ===
    let exitIntentTriggered = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !exitIntentTriggered && modal.classList.contains('hidden')) {
            exitIntentTriggered = true;
            formSourceInput.value = 'exit_intent';
            modal.classList.remove('hidden');
            // Update modal text for exit intent context if needed, or keep generic
        }
    });
    // === PWA Install Logic ===
    let deferredPrompt;
    const pwaToast = document.getElementById('pwa-toast');
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const pwaDismissBtn = document.getElementById('pwa-dismiss-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        // Show our custom prompt after 10s (simulating engagement)
        setTimeout(() => {
            if (!localStorage.getItem('pwa_dismissed')) {
                pwaToast.classList.remove('hidden');
            }
        }, 10000);
    });

    pwaInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        }
        pwaToast.classList.add('hidden');
    });

    pwaDismissBtn.addEventListener('click', () => {
        pwaToast.classList.add('hidden');
        localStorage.setItem('pwa_dismissed', 'true');
    });

    // === Event Tracking (Google Analytics) ===
    function trackEvent(eventName, eventParams = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
        }
    }

    // Track CTA clicks
    document.querySelectorAll('a[href="app.html"]').forEach(link => {
        link.addEventListener('click', () => {
            const linkText = link.innerText || link.title || 'Unknown CTA';
            trackEvent('cta_click', {
                cta_location: linkText,
                page_location: window.location.pathname
            });
        });
    });

    // Track modal opens
    const originalModalOpen = modal.classList.remove.bind(modal.classList);
    const modalOpenInterceptor = function (className) {
        if (className === 'hidden' && modal.id === 'waitlist-modal') {
            trackEvent('modal_open', {
                modal_type: 'waitlist',
                trigger_source: formSourceInput.value
            });
        }
        return originalModalOpen(className);
    };

    // Track form submission
    waitlistForm.addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_type: 'waitlist',
            source: formSourceInput.value
        });
    });

    // Track demo interactions
    [platformSelect, cameraSelect, moodSelect].forEach(select => {
        select.addEventListener('change', (e) => {
            trackEvent('demo_interaction', {
                control_type: e.target.id.replace('demo-', ''),
                selected_value: e.target.value
            });
        });
    });

    // Track scroll depth
    let scrollDepthTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

        Object.keys(scrollDepthTracked).forEach(depth => {
            if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;
                trackEvent('scroll_depth', {
                    depth_percent: depth
                });
            }
        });
    });

    // === FAB Logic ===
    const fabCta = document.getElementById('fab-cta');
    const heroTitle = document.querySelector('.hero-title');

    const fabObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Hero title is gone, show FAB
                fabCta.classList.remove('hidden');
                trackEvent('fab_shown', { page_location: window.location.pathname });
            } else {
                // Hero title is visible, hide FAB to avoid clutter
                fabCta.classList.add('hidden');
            }
        });
    }, { threshold: 0.1 });

    if (heroTitle) {
        fabObserver.observe(heroTitle);
    }

    // Track FAB click
    fabCta.addEventListener('click', () => {
        trackEvent('fab_click', { page_location: window.location.pathname });
    });
});

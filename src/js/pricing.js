/* =========================================
   Pricing Page Logic
   ========================================= */

export class PricingManager {
    constructor() {
        this.init();
    }

    init() {

        // 2. Handle Pricing Toggle (Monthly vs Yearly)
        const pricingToggle = document.getElementById('pricing-toggle');
        const priceAmounts = document.querySelectorAll('.price-amount');
        const monthlyLabel = document.getElementById('monthly-label');
        const yearlyLabel = document.getElementById('yearly-label');

        if (pricingToggle) {
            pricingToggle.addEventListener('change', () => {
                const isYearly = pricingToggle.checked;

                // Update Labels
                if (isYearly) {
                    monthlyLabel.classList.remove('active');
                    yearlyLabel.classList.add('active');
                } else {
                    monthlyLabel.classList.add('active');
                    yearlyLabel.classList.remove('active');
                }

                // Update Prices
                priceAmounts.forEach(price => {
                    const newPrice = isYearly ? price.dataset.yearly : price.dataset.monthly;

                    // Simple animation for price change
                    price.style.opacity = '0';
                    price.style.transform = 'translateY(-10px)';

                    setTimeout(() => {
                        price.textContent = newPrice;
                        price.style.opacity = '1';
                        price.style.transform = 'translateY(0)';
                    }, 200);
                });

                // Analytics
                if (window.gaTracker) {
                    window.gaTracker.trackEvent('pricing_toggle_click', { plan_type: isYearly ? 'yearly' : 'monthly' });
                }
            });
        }

        // 3. Pricing Navigation Handler (if linked from header)
        const pricingLinks = document.querySelectorAll('a[href="#pricing-section"]');
        pricingLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.switchSection) {
                    window.switchSection('pricing-section');
                } else {
                    console.warn('Navigation function not available');
                }
            });
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new PricingManager();
});

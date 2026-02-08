import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? "/JSON-Prompt-Gen/" : "/",
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.png', 'apple-touch-icon.png', 'assets/*.png'],
            manifest: {
                name: 'JSON Prompt Gen',
                short_name: 'JSONGen',
                start_url: './index.html',
                display: 'standalone',
                background_color: '#0F0A1F',
                theme_color: '#2196F3',
                description: 'Generate JSON prompts for AI video generation platforms.',
                icons: [
                    {
                        src: 'assets/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'assets/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'assets/maskable-icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true
            },
            devOptions: {
                enabled: false,
                type: 'module'
            }
        })
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                app: 'app.html',
                about: 'about.html',
                contact: 'contact.html',
                security: 'security.html',
                documentation: 'documentation.html',
                privacy: 'legal/privacy.html',
                terms: 'legal/terms.html',
                cookies: 'legal/cookies.html',
                disclaimer: 'legal/disclaimer.html',
                pricing: 'pricing.html',
                blog: 'src/blog/index.html',
                'blog-veo': 'src/blog/veo-json-prompt-guide/index.html',
                'blog-sora': 'src/blog/sora-json-prompt-guide/index.html',
                'blog-runway': 'src/blog/runway-json-prompt-guide/index.html',
                'blog-luma': 'src/blog/luma-json-prompt-guide/index.html',
                'blog-kling': 'src/blog/kling-json-prompt-guide/index.html'
            }
        }
    }
});

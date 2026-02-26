/*
 * LLM Service - BYOK Integration for OpenAI, Anthropic, and Gemini
 * Local-first PWA implementation with secure key management
 */
import { IndustryTemplateService } from './industryTemplateService.js';
import { DictionaryService } from './dictionaryService.js';

export class LLMService {
    constructor() {
        this.STORAGE_KEY = 'llm_vault';
        this.providers = {
            openai: {
                name: 'OpenAI',
                models: [
                    { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex (Recommended)', maxTokens: 8192 },
                    { id: 'gpt-5.2-instant', name: 'GPT-5.2 Instant', maxTokens: 8192 },
                    { id: 'gpt-5.2-thinking', name: 'GPT-5.2 Thinking', maxTokens: 8192 },
                    { id: 'gpt-5-codex-max', name: 'GPT-5 Codex Max', maxTokens: 8192 }
                ],
                endpoint: 'https://api.openai.com/v1/chat/completions',
                validateEndpoint: 'https://api.openai.com/v1/models'
            },
            anthropic: {
                name: 'Anthropic',
                models: [
                    { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6 (Recommended)', maxTokens: 4096 },
                    { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', maxTokens: 4096 },
                    { id: 'claude-sonnet-3.7', name: 'Claude 3.7 Sonnet', maxTokens: 4096 },
                    { id: 'claude-haiku-3.5', name: 'Claude 3.5 Haiku', maxTokens: 4096 }
                ],
                endpoint: 'https://api.anthropic.com/v1/messages'
            },
            gemini: {
                name: 'Gemini',
                models: [
                    { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro (Recommended)', maxTokens: 8192 },
                    { id: 'gemini-3.0-pro', name: 'Gemini 3.0 Pro', maxTokens: 8192 },
                    { id: 'gemini-3.0-flash', name: 'Gemini 3.0 Flash', maxTokens: 8192 },
                    { id: 'gemini-3.0-nano', name: 'Gemini 3.0 Nano', maxTokens: 8192 }
                ],
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models'
            },
            kimi: {
                name: 'Kimi',
                models: [
                    { id: 'kimi-k2.5', name: 'Kimi K2.5 (Recommended)', maxTokens: 4096 },
                    { id: 'kimi-k1.6', name: 'Kimi K1.6', maxTokens: 4096 },
                    { id: 'kimi-k0-math', name: 'Kimi k0-math', maxTokens: 4096 },
                    { id: 'kimi-vision', name: 'Kimi Vision', maxTokens: 4096 }
                ],
                endpoint: 'https://api.moonshot.cn/v1/chat/completions',
                validateEndpoint: 'https://api.moonshot.cn/v1/models'
            },
            grok: {
                name: 'Grok',
                models: [
                    { id: 'grok-4.2-beta', name: 'Grok 4.2 Beta (Recommended)', maxTokens: 4096 },
                    { id: 'grok-4', name: 'Grok 4', maxTokens: 4096 },
                    { id: 'grok-3.5', name: 'Grok 3.5', maxTokens: 4096 },
                    { id: 'grok-3-mini', name: 'Grok 3 Mini', maxTokens: 4096 }
                ],
                endpoint: 'https://api.x.ai/v1/chat/completions',
                validateEndpoint: 'https://api.x.ai/v1/models'
            },
            qwen: {
                name: 'Qwen',
                models: [
                    { id: 'qwen3.5-plus', name: 'Qwen3.5-Plus (Recommended)', maxTokens: 4096 },
                    { id: 'qwen3-max', name: 'Qwen3-Max', maxTokens: 4096 },
                    { id: 'qwen3-turbo', name: 'Qwen3-Turbo', maxTokens: 4096 },
                    { id: 'qwen3-vision', name: 'Qwen3-Vision', maxTokens: 4096 }
                ],
                endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
                validateEndpoint: 'https://dashscope.aliyuncs.com/api/v1/models'
            },
            deepseek: {
                name: 'DeepSeek',
                models: [
                    { id: 'deepseek-v3.2', name: 'DeepSeek V3.2 (Recommended)', maxTokens: 4096 },
                    { id: 'deepseek-r1', name: 'DeepSeek R1', maxTokens: 4096 },
                    { id: 'deepseek-v3', name: 'DeepSeek V3', maxTokens: 4096 },
                    { id: 'deepseek-coder-v3', name: 'DeepSeek Coder V3', maxTokens: 4096 }
                ],
                endpoint: 'https://api.deepseek.com/v1/chat/completions',
                validateEndpoint: 'https://api.deepseek.com/v1/models'
            },
            glm: {
                name: 'GLM',
                models: [
                    { id: 'glm-5', name: 'GLM-5 (Recommended)', maxTokens: 4096 },
                    { id: 'glm-4.7', name: 'GLM-4.7', maxTokens: 4096 },
                    { id: 'glm-4.6', name: 'GLM-4.6', maxTokens: 4096 },
                    { id: 'glm-4.6v', name: 'GLM-4.6V', maxTokens: 4096 }
                ],
                endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
                validateEndpoint: 'https://open.bigmodel.cn/api/paas/v4/models'
            },
            openrouter: {
                name: 'OpenRouter',
                models: [
                    { id: 'openrouter/auto', name: 'Auto (Recommended)', maxTokens: 4096 },
                    { id: 'openrouter/openai/gpt-5.3-codex', name: 'GPT-5.3 Codex', maxTokens: 8192 },
                    { id: 'openrouter/anthropic/claude-sonnet-4.6', name: 'Claude Sonnet 4.6', maxTokens: 4096 },
                    { id: 'openrouter/google/gemini-3.1-pro', name: 'Gemini 3.1 Pro', maxTokens: 8192 }
                ],
                endpoint: 'https://openrouter.ai/api/v1/chat/completions',
                validateEndpoint: 'https://openrouter.ai/api/v1/models'
            }
        };
        this.activeProvider = null;
        this.config = {};
        this.industryService = new IndustryTemplateService();
        this.dictionaryService = new DictionaryService();
    }


    /**
     * Initialize service and load saved configuration.
     * Also migrates any legacy keys from the old KeyManager storage (prompt_gen_api_keys).
     */
    async init() {
        await this.loadConfig();
        await this.dictionaryService.init();
        await this._migrateLegacyKeys();
    }

    /**
     * One-time migration: import any keys that were previously saved by the
     * old KeyManager class (storage key: 'prompt_gen_api_keys') into this
     * service's own vault, then remove the old entry to avoid drift.
     */
    async _migrateLegacyKeys() {
        const LEGACY_KEY = 'prompt_gen_api_keys';
        const stored = localStorage.getItem(LEGACY_KEY);
        if (!stored) return;

        try {
            const fingerprint = await CryptoUtils.getDeviceFingerprint();
            const decrypted = await CryptoUtils.decrypt(stored, fingerprint);
            const keys = JSON.parse(decrypted); // { openai: '...', anthropic: '...', gemini: '...' }
            let migrated = false;

            for (const [provider, apiKey] of Object.entries(keys)) {
                if (apiKey && this.providers[provider]) {
                    // Only write if we don't already have a richer entry
                    if (!this.config[provider]?.key) {
                        this.config[provider] = {
                            key: apiKey,
                            model: this.providers[provider].models[0].id,
                            lastUsed: null,
                            requestCount: 0
                        };
                        migrated = true;
                    }
                }
            }

            if (migrated) {
                await this.saveConfig();
                console.info('LLMService: Migrated legacy API keys to unified vault.');
            }
            // Remove the old siloed storage regardless
            localStorage.removeItem(LEGACY_KEY);
        } catch (e) {
            console.warn('LLMService: Could not migrate legacy keys.', e.message);
        }
    }



    /**
     * Load encrypted configuration from localStorage
     */
    async loadConfig() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const deviceKey = await CryptoUtils.getDeviceFingerprint();
                const decrypted = await CryptoUtils.decrypt(stored, deviceKey);
                this.config = JSON.parse(decrypted);
            }
        } catch (e) {
            console.warn('LLMService: Could not load config, starting fresh.', e.message);
            this.config = {};
        }
    }

    /**
     * Save configuration to localStorage (encrypted)
     */
    async saveConfig() {
        try {
            const deviceKey = await CryptoUtils.getDeviceFingerprint();
            const encrypted = await CryptoUtils.encrypt(JSON.stringify(this.config), deviceKey);
            localStorage.setItem(this.STORAGE_KEY, encrypted);
        } catch (e) {
            console.error('LLMService: Failed to save config.', e);
        }
    }

    /**
     * Store an API key for a provider
     * @param {string} providerId - 'openai', 'anthropic', or 'gemini'
     * @param {string} apiKey - The API key to store
     * @param {string} modelId - Default model for this provider
     */
    async setProviderKey(providerId, apiKey, modelId) {
        if (!this.providers[providerId]) {
            throw new Error(`Unknown provider: ${providerId}`);
        }

        this.config[providerId] = {
            key: apiKey,
            model: modelId || this.providers[providerId].models[0].id,
            lastUsed: null,
            requestCount: 0
        };

        await this.saveConfig();
    }

    /**
     * Get stored API key for a provider
     * @param {string} providerId 
     * @returns {string|null}
     */
    getProviderKey(providerId) {
        return this.config[providerId]?.key || null;
    }

    /**
     * Remove a provider's configuration
     * @param {string} providerId 
     */
    async removeProvider(providerId) {
        delete this.config[providerId];
        await this.saveConfig();
    }

    /**
     * Get all configured providers
     * @returns {string[]} Array of configured provider IDs
     */
    getConfiguredProviders() {
        return Object.keys(this.config).filter(id => this.config[id]?.key);
    }

    /**
     * Validate an API key by making a test request
     * @param {string} providerId 
     * @param {string} apiKey 
     * @returns {Promise<{valid: boolean, message: string}>}
     */
    async validateKey(providerId, apiKey) {
        try {
            switch (providerId) {
                case 'openai':
                    return await this._validateOpenAI(apiKey);
                case 'anthropic':
                    return await this._validateAnthropic(apiKey);
                case 'gemini':
                    return await this._validateGemini(apiKey);
                case 'kimi':
                    return await this._validateKimi(apiKey);
                case 'grok':
                    return await this._validateGrok(apiKey);
                case 'qwen':
                    return await this._validateQwen(apiKey);
                case 'deepseek':
                    return await this._validateDeepSeek(apiKey);
                case 'glm':
                    return await this._validateGLM(apiKey);
                default:
                    return { valid: false, message: 'Unknown provider' };
            }
        } catch (e) {
            return { valid: false, message: e.message };
        }
    }

    async _validateOpenAI(apiKey) {
        const response = await fetch(this.providers.openai.validateEndpoint, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateAnthropic(apiKey) {
        // Anthropic doesn't have a dedicated validate endpoint, so we'll do a minimal call
        const response = await fetch(this.providers.anthropic.endpoint, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-5-haiku-20241022',
                max_tokens: 10,
                messages: [{ role: 'user', content: 'Hi' }]
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateGemini(apiKey) {
        const url = `${this.providers.gemini.endpoint}?key=${apiKey}`;
        const response = await fetch(url);
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateKimi(apiKey) {
        const response = await fetch(this.providers.kimi.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'kimi-k1',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 10
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateGrok(apiKey) {
        const response = await fetch(this.providers.grok.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'grok-2',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 10
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateQwen(apiKey) {
        const response = await fetch(this.providers.qwen.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'qwen-turbo',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 10
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateDeepSeek(apiKey) {
        const response = await fetch(this.providers.deepseek.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 10
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    async _validateGLM(apiKey) {
        const response = await fetch(this.providers.glm.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'glm-3-turbo',
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 10
            })
        });
        if (response.ok) {
            return { valid: true, message: 'API key is valid!' };
        }
        const error = await response.json();
        return { valid: false, message: error.error?.message || 'Invalid API key' };
    }

    /**
     * Generate enhanced prompt using selected LLM provider
     * @param {string} providerId - Provider to use
     * @param {object} sceneData - Scene data from the generator
     * @param {object} options - Generation options (temperature, etc.)
     * @returns {Promise<string>} - Enhanced prompt text
     */
    async generatePrompt(providerId, sceneData, options = {}) {
        const providerConfig = this.config[providerId];
        if (!providerConfig?.key) {
            throw new Error(`No API key configured for ${providerId}`);
        }

        // Model-aware system prompt
        const systemPrompt = this._buildSystemPrompt(options.modelProfile || null);
        const userPrompt = this._buildUserPrompt(sceneData);

        let result;
        switch (providerId) {
            case 'openai':
                result = await this._callOpenAI(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            case 'anthropic':
                result = await this._callAnthropic(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            case 'gemini':
                result = await this._callGemini(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            default:
                throw new Error('Unknown provider');
        }

        // Update usage stats
        providerConfig.lastUsed = new Date().toISOString();
        providerConfig.requestCount = (providerConfig.requestCount || 0) + 1;
        await this.saveConfig();

        return this._cleanResponse(result);
    }

    /**
     * Determine best provider dynamically based on task
     * @param {string} modality 
     * @param {string} expertise 
     * @returns {string} providerId
     */
    determineBestProvider(modality, expertise) {
        const configured = this.getConfiguredProviders();
        if (configured.length === 0) throw new Error("No API keys configured. Please add one in settings.");

        let preferred = 'openai';
        // Anthropic for technical precision
        if (expertise === 'Professional' || modality === 'text') preferred = 'anthropic';
        // Gemini for specific platforms / multimodal
        if (modality === 'vrar' || modality === '3d' || modality === 'animation') preferred = 'gemini';

        if (configured.includes(preferred)) return preferred;
        return configured[0]; // Fallback
    }

    /**
     * Generate prompt for the interactive AI Mode
     * @param {string} modality 
     * @param {string} expertise 
     * @param {string} industry 
     * @param {string} userInput 
     */
    async generateAiModePrompt(modality, expertise, industry, platform, userInput) {
        let providerId = this.determineBestProvider(modality, expertise);
        const providerConfig = this.config[providerId];

        let industryContext = '';
        if (industry) {
            industryContext = this.industryService.getIndustryPromptContext(industry);
        }

        let platformContext = '';
        if (platform) {
            platformContext = `\n[TARGET PLATFORM: ${platform.toUpperCase()}]\nOptimize the technical parameters, aspect ratios, and cinematic tags specifically for the ${platform} video generation platform.`;
        }

        let dictContext = '';
        const cats = this.dictionaryService.getAllCategories();
        if (cats && cats.length > 0) {
            let sampleTerms = [];
            cats.forEach(c => c.terms.forEach(t => sampleTerms.push(t.name + ": " + t.definition)));
            // Pick a handful of random terms to guide the AI's vocabulary without overloading context window
            sampleTerms = sampleTerms.sort(() => 0.5 - Math.random()).slice(0, 15);
            dictContext = `\n[CINEMATIC DICTIONARY - PROFESSIONAL TERMINOLOGY]\nIncorporate professional terminology where applicable. Examples:\n- ` + sampleTerms.join('\n- ') + `\n`;
        }

        const systemPrompt = `You are a Universal AI Prompt Engineer specializing in generating prompts for ${modality} generation.
The user's expertise level is ${expertise}.
If the user is a Beginner, create a highly detailed and optimized prompt explaining technical terms simply.
If the user is a Professional, focus on advanced technical parameters, specific camera/lighting/render engines without hand-holding.
${industryContext}
${platformContext}
${dictContext}

Your output MUST be formatted as a structured JSON object representing the prompt parameters, wrapped in a single message explaining the rationale. Provide actionable Best Practices in the message based on their expertise.
Format:
{
  "message": "A brief explanation of how you optimized their prompt with professional best practices...",
  "prompt_data": {
    "subject": "Detailed subject...",
    "style": "Visual style...",
    "technical_params": "Camera, resolution, fps, etc..."
  }
}
Output raw JSON only. Do not wrap in markdown \`\`\` codeblocks.`;

        const userMsg = `I want to create a ${modality}. Here is my idea: ${userInput}`;

        // Fallback Retry Loop
        let attempts = 0;
        const maxAttempts = 2;
        let lastError = null;

        while (attempts < maxAttempts) {
            try {
                let result;
                if (providerId === 'openai') {
                    result = await this._callOpenAI(providerConfig.key, providerConfig.model, systemPrompt, userMsg, { maxTokens: 800 });
                } else if (providerId === 'anthropic') {
                    result = await this._callAnthropic(providerConfig.key, providerConfig.model, systemPrompt, userMsg, { maxTokens: 800 });
                } else if (providerId === 'gemini') {
                    result = await this._callGemini(providerConfig.key, providerConfig.model, systemPrompt, userMsg, { maxTokens: 800 });
                }

                providerConfig.lastUsed = new Date().toISOString();
                providerConfig.requestCount = (providerConfig.requestCount || 0) + 1;
                this.saveConfig();

                return this._cleanResponse(result);
            } catch (error) {
                lastError = error;
                attempts++;
                console.warn(`Provider ${providerId} failed (Attempt ${attempts}): ${error.message}`);

                // Exponential backoff or Switch provider
                const configured = this.getConfiguredProviders();
                const alternatives = configured.filter(p => p !== providerId);

                if (alternatives.length > 0) {
                    console.log(`Falling back to ${alternatives[0]}...`);
                    providerId = alternatives[0];
                } else {
                    // Backoff delay before retry on same provider
                    await new Promise(r => setTimeout(r, 1000 * attempts));
                }
            }
        }

        throw new Error(`LLM Generation Failed after retries. Last error: ${lastError?.message}`);
    }

    /**
     * Clean LLM responses from common unprofessional prefixes and formatting
     * @param {string} text - Raw LLM output
     * @returns {string} - Cleaned text
     */
    _cleanResponse(text) {
        if (!text) return '';

        return text
            // Remove common prefixes (case insensitive)
            .replace(/^(Prompt|Enhanced Prompt|Result|Response|Scene \d+|Output|Description):?\s*/i, '')
            // Remove wrapping quotes if they exist
            .replace(/^["'](.*)["']$/s, '$1')
            // Clean markdown blocks
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            // Trim whitespace
            .trim();
    }

    /**
     * Generate enhanced JSON output for all scenes
     * @param {string} providerId 
     * @param {Array} scenes 
     * @param {object} options 
     */
    async generateFullJson(providerId, scenes, options = {}) {
        const providerConfig = this.config[providerId];
        if (!providerConfig?.key) {
            throw new Error(`No API key configured for ${providerId}`);
        }

        const systemPrompt = `You are a specialized AI for generating professional VEO video prompts in strict JSON format.
        
Your task is to take the user's rough scene inputs and transform them into a polished, cinematic JSON output.
Follow these rules strictly:
1. Output MUST be a valid JSON array of objects.
2. Each object must follow this schema:
   {
     "description": "Enhanced, detailed cinematic description",
     "camera": "Camera angle/movement (keep original if good, or enhance)",
     "lighting": "Lighting style (keep original if good, or enhance)",
     "negative_prompt": "Negative constraints"
   }
3. Enhance the 'description' field to be vivid, detailed, and use professional filmmaking terminology.
4. Keep the 'negative_prompt' robust but concise.
5. Do NOT add any markdown formatting (like \`\`\`json). Output raw JSON string only.
6. Maintain the exact number of scenes as the input.
7. Output ONLY the raw JSON content without any conversational filler or "Prompt" labels.`;

        const userPrompt = `Here is the raw scene data to enhance and format as JSON:\n${JSON.stringify(scenes, null, 2)}`;

        let result;
        switch (providerId) {
            case 'openai':
                result = await this._callOpenAI(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            case 'anthropic':
                result = await this._callAnthropic(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            case 'gemini':
                result = await this._callGemini(providerConfig.key, providerConfig.model, systemPrompt, userPrompt, options);
                break;
            default:
                throw new Error('Unknown provider');
        }

        // Update usage stats
        providerConfig.lastUsed = new Date().toISOString();
        providerConfig.requestCount = (providerConfig.requestCount || 0) + 1;
        await this.saveConfig();

        // Basic cleaning of potential markdown code blocks
        return result.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    }

    _buildSystemPrompt(modelProfile = null) {
        let prompt = `You are PromptForge AI, an expert cinematic video prompt engineer. Your role is to enhance user scene descriptions into highly detailed, professional video generation prompts.

Guidelines:
- Incorporate specific cinematic techniques (camera angles, movements, lighting styles)
- Use vivid, evocative language that AI video models understand
- Maintain the user's creative intent while adding professional depth
- Keep responses focused and concise (max 200 words per scene)
- Output ONLY the refined descriptive text.
- DO NOT include labels like "Prompt:", "Enhanced:", or "Scene:".
- DO NOT include any introductory or concluding remarks.`;

        // Model-Aware Constraints
        if (modelProfile) {
            prompt += `\n\n**Target Model: ${modelProfile.name}**\n`;
            prompt += `- ${modelProfile.description}\n`;
            if (!modelProfile.supportsCameraControls) {
                prompt += `- This model does NOT support advanced camera controls. Avoid describing specific camera movements like "tracking shot" or "crane shot".\n`;
            }
            if (!modelProfile.supportsNegativePrompt) {
                prompt += `- This model does NOT support negative prompts. If the user mentions things to avoid, try to express constraints positively or rephrase.\n`;
            }
            prompt += `- Allowed Frame Rates: ${modelProfile.allowedFrameRates.join(', ')} fps.\n`;
            prompt += `- Max Resolution: ${modelProfile.maxResolution}.\n`;
        }

        return prompt;
    }

    _buildUserPrompt(sceneData) {
        let prompt = `Enhance this scene description for AI video generation:\n\n`;
        prompt += `Description: ${sceneData.description || 'A cinematic scene'}\n`;

        if (sceneData.camera) {
            prompt += `Camera: ${sceneData.camera}\n`;
        }
        if (sceneData.lighting) {
            prompt += `Lighting: ${sceneData.lighting}\n`;
        }
        if (sceneData.negative_prompt) {
            prompt += `Avoid: ${sceneData.negative_prompt}\n`;
        }

        return prompt;
    }

    async _callOpenAI(apiKey, model, systemPrompt, userPrompt, options) {
        const response = await fetch(this.providers.openai.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'OpenAI API error');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async _callAnthropic(apiKey, model, systemPrompt, userPrompt, options) {
        const response = await fetch(this.providers.anthropic.endpoint, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: options.maxTokens || 500,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Anthropic API error');
        }

        const data = await response.json();
        return data.content[0].text;
    }

    async _callGemini(apiKey, model, systemPrompt, userPrompt, options) {
        const url = `${this.providers.gemini.endpoint}/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
                ],
                generationConfig: {
                    temperature: options.temperature || 0.7,
                    maxOutputTokens: options.maxTokens || 500
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Gemini API error');
        }

        const data = await response.json();

        // Robust check for Gemini response structure
        if (!data.candidates || data.candidates.length === 0) {
            // Handle block reasons (safety/quota/finish reasons)
            const finishReason = data.promptFeedback?.blockReason || 'UNKNOWN_REASON';
            throw new Error(`Gemini blocked the request: ${finishReason}. Please try a slightly different prompt.`);
        }

        const candidate = data.candidates[0];

        // Check if content exists (could be blocked by safety filters)
        if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
            const safetyReason = candidate.finishReason || 'SAFETY/FILTERING';
            throw new Error(`Gemini response generation failed: ${safetyReason}. The content may have been flagged by safety filters.`);
        }

        return candidate.content.parts[0].text;
    }

    /**
     * Get usage statistics for all providers
     * @returns {object} Usage stats per provider
     */
    getUsageStats() {
        const stats = {};
        for (const [id, config] of Object.entries(this.config)) {
            if (config?.key) {
                stats[id] = {
                    lastUsed: config.lastUsed,
                    requestCount: config.requestCount || 0,
                    model: config.model
                };
            }
        }
        return stats;
    }
}



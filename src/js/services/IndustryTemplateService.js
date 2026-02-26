/**
 * IndustryTemplateService.js
 * Provides industry-specific templates that map to the SceneControlSchema parameters.
 * When applied, these provide smart defaults for scenes.
 */

export const IndustryTemplates = [
    {
        id: 'film_tv',
        name: 'Film & TV',
        icon: '🎬',
        description: 'Cinematic lighting, dynamic camera movements, and classic film stocks.',
        defaults: {
            lighting: 'Cinematic',
            color: 'Cinematic Teal & Orange',
            camera_movement: 'Smooth Tracking',
            composition: 'Rule of Thirds',
            lens: 'Anamorphic',
            pacing: 'Slow Steady',
            sound: 'Cinematic Orchestral',
            vfx: 'Film Grain'
        }
    },
    {
        id: 'commercial',
        name: 'Commercial Product',
        icon: '📺',
        description: 'Bright, high-contrast, perfectly lit shots designed to sell.',
        defaults: {
            lighting: 'Softbox',
            color: 'High Saturation',
            camera_movement: 'Crane Shot',
            composition: 'Center Framed',
            lens: 'Macro',
            pacing: 'Action Packed',
            vfx: 'Light Leaks'
        }
    },
    {
        id: 'gaming',
        name: 'Video Game / CGI',
        icon: '🎮',
        description: 'High energy, virtual camera setups, and cyberpunk or epic aesthetics.',
        defaults: {
            lighting: 'Neon Cyberpunk',
            color: 'Cyberpunk Glow',
            camera_movement: 'Drone Shot',
            composition: 'Asymmetrical',
            lens: 'Wide Angle',
            pacing: 'Action Packed',
            physics: 'Exaggerated physics, particle effects',
            art_style: 'Unreal Engine 5 Render'
        }
    },
    {
        id: 'architecture',
        name: 'Architecture / Real Estate',
        icon: '🏢',
        description: 'Clean, natural lighting with wide angles to show space.',
        defaults: {
            lighting: 'Natural',
            color: 'Pastel Tones',
            camera_movement: 'Smooth Tracking',
            composition: 'Leading Lines',
            lens: 'Wide Angle',
            pacing: 'Slow Steady',
            art_style: 'Photorealistic Architectural Visualization'
        }
    },
    {
        id: 'music_video',
        name: 'Music Video',
        icon: '🎵',
        description: 'Erratic cuts, heavy stylization, and rhythmic movement.',
        defaults: {
            lighting: 'Dramatic',
            color: 'Moody Desaturated',
            camera_movement: 'Handheld',
            composition: 'Asymmetrical',
            lens: 'Fisheye',
            pacing: 'Rhythmic',
            vfx: 'Chromatic Aberration',
            sound: 'Glitchy Beats'
        }
    }
];

export class IndustryTemplateService {
    /**
     * Get all available templates
     */
    static getTemplates() {
        return IndustryTemplates;
    }

    /**
     * Get a specific template by ID
     */
    static getTemplateById(id) {
        return IndustryTemplates.find(t => t.id === id);
    }

    /**
     * Applies a template's default values to a target SceneControlPanel element
     * @param {string} templateId - The ID of the template to apply
     * @param {HTMLElement} scenePanel - The <scene-control-panel> element
     */
    static applyTemplateToScene(templateId, scenePanel) {
        const template = this.getTemplateById(templateId);
        if (!template || !scenePanel || typeof scenePanel.setValues !== 'function') {
            console.warn(`Cannot apply template ${templateId} to scene.`);
            return;
        }

        // Apply values to the scene panel
        scenePanel.setValues(template.defaults);
    }
}

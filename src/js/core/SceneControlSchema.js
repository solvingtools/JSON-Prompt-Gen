export const SceneControlSchema = {
    groups: [
        {
            id: 'core',
            title: 'Core Scene Elements',
            description: 'Fundamental elements defining the scene.',
            controls: [
                { id: 'description', label: 'Scene Description', type: 'textarea', tier: 1, placeholder: 'Describe your scene in detail...', info: 'The core narrative or visual action of the scene.' },
                { id: 'subject', label: 'Subject & Character', type: 'text', tier: 1, placeholder: 'Main character, object, or focus...', info: 'Specific details about who or what the scene focuses on.' },
                { id: 'setting', label: 'Environment & Setting', type: 'text', tier: 1, placeholder: 'Location, time period, weather...', info: 'Where and when the scene takes place.' },
                { id: 'camera', label: 'Camera Angle', type: 'select', tier: 1, options: ['Pan Left', 'Pan Right', 'Zoom In', 'Zoom Out', 'Dolly Zoom', 'Tracking Shot', 'Eye Level', 'Low Angle', 'High Angle', 'Aerial View'], info: 'How the camera is positioned relative to the subject.' },
                { id: 'composition', label: 'Composition Principles', type: 'select', tier: 2, options: ['Rule of Thirds', 'Center Framed', 'Leading Lines', 'Golden Ratio', 'Negative Space', 'Symmetrical', 'Asymmetrical', 'Depth of Field'], info: 'Structural arrangement of visual elements.' },
                { id: 'lens', label: 'Lens Techniques', type: 'select', tier: 2, options: ['Wide Angle', 'Telephoto', 'Macro', 'Fisheye', 'Tilt-Shift', 'Anamorphic', 'Split Diopter', 'Deep Focus'], info: 'Physical or simulated optical characteristics.' }
            ]
        },
        {
            id: 'motion',
            title: 'Motion & Animation',
            description: 'Controls for character and camera movement pacing.',
            controls: [
                { id: 'object_movement', label: 'Object & Element Movement', type: 'select', tier: 2, options: ['Static', 'Slow Motion', 'Fast Motion', 'Time Lapse', 'Stop Motion'], info: 'Speed and style of subjects moving in frame.' },
                { id: 'camera_movement', label: 'Camera Movement', type: 'select', tier: 2, options: ['Static', 'Smooth Tracking', 'Handheld', 'Crane Shot', 'Drone Shot', 'Whip Pan'], info: 'Physical motion of the camera through space.' },
                { id: 'pacing', label: 'Temporal & Pacing', type: 'select', tier: 3, options: ['Slow Steady', 'Action Packed', 'Rhythmic', 'Erratic'], info: 'The overall rhythm and subjective speed of the action.' }
            ]
        },
        {
            id: 'style',
            title: 'Visual Style & Aesthetics',
            description: 'Art direction and grading.',
            controls: [
                { id: 'lighting', label: 'Lighting Style', type: 'select', tier: 1, options: ['Natural', 'Golden Hour', 'Blue Hour', 'Neon Cyberpunk', 'Studio', 'Dramatic', 'Cinematic', 'Softbox', 'Backlit', 'Rim Light'], info: 'The primary illumination source and style.' },
                { id: 'color', label: 'Color Palettes', type: 'select', tier: 1, options: ['Monochromatic', 'Complementary', 'Analogous', 'Cinematic Teal & Orange', 'Cyberpunk Glow', 'Sepia Tone', 'High Saturation', 'Moody Desaturated', 'Pastel Tones', 'Classic B&W'], info: 'Overall color grading and thematic hues.' },
                { id: 'mood', label: 'Mood Descriptors', type: 'select', tier: 1, options: ['Ethereal', 'Ominous', 'High Energy', 'Calm', 'Nostalgic', 'Cyberpunk', 'Epic', 'Suspenseful', 'Melancholic', 'Whimsical'], info: 'Emotional resonance and atmosphere.' },
                { id: 'vfx', label: 'Visual Effects & Filters', type: 'select', tier: 3, options: ['Film Grain', 'Lens Flare', 'Light Leaks', 'Chromatic Aberration', 'Bloom', 'Vignette'], info: 'Post-processing visual enhancements.' },
                { id: 'grading', label: 'Advanced Color Grading', type: 'text', tier: 4, placeholder: 'e.g. Kodak 2383 LUT, Shadows pushed teal...', info: 'Specific LUTs or precise color lab techniques.' },
                { id: 'art_style', label: 'Art Style', type: 'text', tier: 3, placeholder: 'e.g. Photorealistic, Anime, Oil Painting...', info: 'Fundamental rendering style or medium.' }
            ]
        },
        {
            id: 'technical',
            title: 'Technical Production',
            description: 'Platform and standard limits.',
            controls: [
                { id: 'sound', label: 'Sound Design', type: 'select', tier: 1, options: ['Ambient Wind', 'Cinematic Orchestral', 'Low Hum', 'Nature Sounds', 'Urban Traffic', '80s Synth', 'Heavy Industrial', 'Deep Silence', 'ASMR Rustle', 'Glitchy Beats'], info: 'Audio landscape (supported by newer models).' },
                { id: 'negative_prompt', label: 'Negative Prompts', type: 'select', tier: 1, options: ['Blurry', 'Low Res', 'Deformed', 'Watermark', 'Flicker', 'Grainy', 'Overexposed', 'Extra Limbs', 'Distorted', 'Unrealistic'], info: 'Elements the AI should explicitly avoid generating.' },
                { id: 'resolution_override', label: 'Resolution Override', type: 'select', tier: 4, options: ['Global Default', '1080p', '4K', '720p'], info: 'Specific per-scene resolution deviation.' },
                { id: 'physics', label: 'Physics & Simulation', type: 'text', tier: 4, placeholder: 'e.g. realistic fluid dynamics, low gravity...', info: 'Simulation parameters for complex interactions.' },
                { id: 'audio_mix', label: 'Audio Mix Expansion', type: 'text', tier: 4, placeholder: 'e.g. 5.1 surround, heavy bass...', info: 'Deep audio mastery overrides.' }
            ]
        },
        {
            id: 'narrative',
            title: 'Advanced Narrative',
            description: 'Storyline continuity and structural controls.',
            controls: [
                { id: 'narrative_arc', label: 'Narrative Structure', type: 'text', tier: 4, placeholder: 'e.g. inciting incident, climax buildup...', info: 'How this scene fits into the broader story.' },
                { id: 'continuity', label: 'Consistency & Continuity', type: 'text', tier: 4, placeholder: 'e.g. matched cuts, character outfit retention...', info: 'Rules to enforce matching between scenes.' },
                { id: 'accessibility', label: 'Accessibility', type: 'text', tier: 4, placeholder: 'e.g. high contrast, clear dialogue...', info: 'Design choices for inclusive viewing.' }
            ]
        }
    ]
};

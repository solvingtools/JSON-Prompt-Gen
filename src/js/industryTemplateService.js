/**
 * IndustryTemplateService
 * Provides industry-specific templates and constraints for the AI Mode.
 */
export class IndustryTemplateService {
    constructor() {
        this.industries = {
            commercial: {
                id: 'commercial',
                name: 'Commercial Advertising',
                focus: 'Product highlighting, brand colors, clean lighting, high conversion aesthetics.',
                templates: [
                    { name: 'Product Hero Shot', description: 'Studio lighting, macro detail, slow pan over product.' },
                    { name: 'Lifestyle Integration', description: 'Product being used in a vibrant, aspirational setting.' },
                    { name: 'Dynamic Typography', description: 'Fast-paced edits with bold kinetic typography.' }
                ]
            },
            film: {
                id: 'film',
                name: 'Film & Television',
                focus: 'Cinematic composition, narrative storytelling, emotional lighting, industry-standard camera movements.',
                templates: [
                    { name: 'Dramatic Dialogue', description: 'Over-the-shoulder shots, shallow depth of field, motivated lighting.' },
                    { name: 'Establishing Vista', description: 'Wide drone shot, golden hour lighting, epic scale.' },
                    { name: 'Action Sequence', description: 'Handheld camera, high shutter speed, dynamic blocking.' }
                ]
            },
            gaming: {
                id: 'gaming',
                name: 'Gaming',
                focus: 'Real-time engine aesthetics (Unreal 5), particle VFX, character-focused framing, high-octane mood.',
                templates: [
                    { name: 'Character Intro', description: 'Low angle, dramatic rim lighting, epic particle effects in background.' },
                    { name: 'Level Flythrough', description: 'Smooth virtual camera tracking, showcasing environment assets.' },
                    { name: 'Combat Impact', description: 'High contrast, screen shake effect, vibrant hit-sparks.' }
                ]
            },
            architecture: {
                id: 'architecture',
                name: 'Architecture',
                focus: 'Photorealistic materials, accurate lighting (V-Ray/Corona style), spatial flow, structural majesty.',
                templates: [
                    { name: 'Exterior Daylight', description: 'Clear sky, sharp shadows, emphasizing building geometry.' },
                    { name: 'Interior Walkthrough', description: 'Smooth gimbal movement, soft diffuse lighting, material focus.' },
                    { name: 'Twilight Rendering', description: 'Blue hour sky, warm interior lights glowing outwards.' }
                ]
            },
            music: {
                id: 'music',
                name: 'Music Industry',
                focus: 'Rhythmic editing, abstract visuals, high contrast, surrealistic environments, synchronized lighting.',
                templates: [
                    { name: 'Performance Close-up', description: 'Lens flares, strobe lighting matching beat, intimate framing.' },
                    { name: 'Abstract Visualizer', description: 'Audio-reactive geometry, neon colors, hypnotic motion.' },
                    { name: 'Narrative Vignette', description: 'Dreamlike sequence, stylized color grade, slow motion.' }
                ]
            },
            publishing: {
                id: 'publishing',
                name: 'Publishing & Editorial',
                focus: 'Composition for layout, high-end fashion aesthetics, storytelling through still poses, negative space.',
                templates: [
                    { name: 'Cover Portrait', description: 'Eye contact, dramatic studio lighting, ample negative space for text.' },
                    { name: 'Editorial Spread', description: 'Environmental portrait, storytelling elements in background.' },
                    { name: 'Still Life', description: 'Curated objects, moody Chiaroscuro lighting, textured surfaces.' }
                ]
            }
        };
    }

    getAllIndustries() {
        return Object.values(this.industries);
    }

    getIndustryById(id) {
        return this.industries[id] || null;
    }

    getIndustryPromptContext(industryId) {
        const industry = this.getIndustryById(industryId);
        if (!industry) return '';

        let context = `\n[INDUSTRY FOCUS: ${industry.name}]\n`;
        context += `Professional Focus: ${industry.focus}\n`;
        context += `Common Templates/Archetypes to draw inspiration from:\n`;
        industry.templates.forEach(t => {
            context += `- ${t.name}: ${t.description}\n`;
        });

        return context;
    }
}

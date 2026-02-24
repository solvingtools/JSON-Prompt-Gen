import"./form-manager-CpHzPdap.js";/* empty css              *//* empty css             */import{D as Tt,A as At}from"./analyticsService-Dn4J6mx_.js";const Qt=()=>{console.log("Initializing History Sidebars...");const b=document.getElementById("history-sidebar"),i=document.getElementById("history-sidebar-overlay"),n=document.getElementById("history-hamburger-btn"),r=document.getElementById("history-sidebar-close"),c=document.getElementById("history-list");function h(){console.log("Opening History Modal Sidebar"),b&&b.classList.add("active"),i&&i.classList.add("active"),window.gaTracker&&window.gaTracker.trackEvent("history_sidebar_open",{type:"modal"})}function u(){console.log("Closing History Modal Sidebar"),b&&b.classList.remove("active"),i&&i.classList.remove("active")}n&&n.addEventListener("click",h),r&&r.addEventListener("click",u),i&&i.addEventListener("click",u),c&&c.addEventListener("click",function(j){j.target.closest(".history-item")&&!j.target.closest(".history-delete-btn")&&setTimeout(u,150)});const p=document.getElementById("history-section-sidebar"),y=document.getElementById("history-section-sidebar-overlay"),w=document.getElementById("history-section-hamburger-btn"),L=document.getElementById("history-section-sidebar-close"),E=document.getElementById("history-section-list");function k(){console.log("Opening History Section Sidebar"),p&&p.classList.add("active"),y&&y.classList.add("active"),window.gaTracker&&window.gaTracker.trackEvent("history_sidebar_open",{type:"section"})}function T(){console.log("Closing History Section Sidebar"),p&&p.classList.remove("active"),y&&y.classList.remove("active")}w&&w.addEventListener("click",k),L&&L.addEventListener("click",T),y&&y.addEventListener("click",T),E&&E.addEventListener("click",function(j){j.target.closest(".history-item")&&!j.target.closest(".history-delete-btn")&&setTimeout(T,150)});const _=document.getElementById("ai-history-sidebar"),N=document.getElementById("ai-history-sidebar-overlay"),$=document.getElementById("ai-history-hamburger-btn"),I=document.getElementById("ai-history-sidebar-close"),A=document.getElementById("ai-history-section-list");function q(){console.log("Opening AI History Sidebar"),_&&_.classList.add("active"),N&&N.classList.add("active"),window.gaTracker&&window.gaTracker.trackEvent("history_sidebar_open",{type:"ai_section"})}function M(){console.log("Closing AI History Sidebar"),_&&_.classList.remove("active"),N&&N.classList.remove("active")}$&&$.addEventListener("click",q),I&&I.addEventListener("click",M),N&&N.addEventListener("click",M),A&&A.addEventListener("click",function(j){j.target.closest(".history-item")&&!j.target.closest(".history-delete-btn")&&setTimeout(M,150)}),window.historySidebarController={open:h,close:u,openSection:k,closeSection:T,openAi:q,closeAi:M},console.log("History sidebars initialized (modal + section + ai)")};Qt();const ei={ALGORITHM:"AES-GCM",KEY_LENGTH:256,IV_LENGTH:12,SALT_LENGTH:16,ITERATIONS:1e5,async deriveKey(b,i){const n=new TextEncoder,r=await crypto.subtle.importKey("raw",n.encode(b),"PBKDF2",!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:i,iterations:this.ITERATIONS,hash:"SHA-256"},r,{name:this.ALGORITHM,length:this.KEY_LENGTH},!1,["encrypt","decrypt"])},async encrypt(b,i){const n=new TextEncoder,r=crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH)),c=crypto.getRandomValues(new Uint8Array(this.IV_LENGTH)),h=await this.deriveKey(i,r),u=await crypto.subtle.encrypt({name:this.ALGORITHM,iv:c},h,n.encode(b)),p=new Uint8Array(r.length+c.length+u.byteLength);return p.set(r,0),p.set(c,r.length),p.set(new Uint8Array(u),r.length+c.length),this.arrayBufferToBase64(p)},async decrypt(b,i){const n=new TextDecoder,r=this.base64ToArrayBuffer(b),c=r.slice(0,this.SALT_LENGTH),h=r.slice(this.SALT_LENGTH,this.SALT_LENGTH+this.IV_LENGTH),u=r.slice(this.SALT_LENGTH+this.IV_LENGTH),p=await this.deriveKey(i,c);try{const y=await crypto.subtle.decrypt({name:this.ALGORITHM,iv:h},p,u);return n.decode(y)}catch{throw new Error("Decryption failed. Invalid password or corrupted data.")}},async getDeviceFingerprint(){var b;try{const n=[navigator.userAgent,navigator.language,screen.width+"x"+screen.height,new Date().getTimezoneOffset().toString(),((b=navigator.hardwareConcurrency)==null?void 0:b.toString())||"unknown"].join("|"),r=new TextEncoder,c=await crypto.subtle.digest("SHA-256",r.encode(n));return this.arrayBufferToBase64(new Uint8Array(c))}catch{return"default_device_salt_"+window.location.origin}},arrayBufferToBase64(b){let i="";const n=new Uint8Array(b);for(let r=0;r<n.byteLength;r++)i+=String.fromCharCode(n[r]);return btoa(i)},base64ToArrayBuffer(b){const i=atob(b),n=new Uint8Array(i.length);for(let r=0;r<i.length;r++)n[r]=i.charCodeAt(r);return n}};class ti{constructor(){this.industries={commercial:{id:"commercial",name:"Commercial Advertising",focus:"Product highlighting, brand colors, clean lighting, high conversion aesthetics.",templates:[{name:"Product Hero Shot",description:"Studio lighting, macro detail, slow pan over product."},{name:"Lifestyle Integration",description:"Product being used in a vibrant, aspirational setting."},{name:"Dynamic Typography",description:"Fast-paced edits with bold kinetic typography."}]},film:{id:"film",name:"Film & Television",focus:"Cinematic composition, narrative storytelling, emotional lighting, industry-standard camera movements.",templates:[{name:"Dramatic Dialogue",description:"Over-the-shoulder shots, shallow depth of field, motivated lighting."},{name:"Establishing Vista",description:"Wide drone shot, golden hour lighting, epic scale."},{name:"Action Sequence",description:"Handheld camera, high shutter speed, dynamic blocking."}]},gaming:{id:"gaming",name:"Gaming",focus:"Real-time engine aesthetics (Unreal 5), particle VFX, character-focused framing, high-octane mood.",templates:[{name:"Character Intro",description:"Low angle, dramatic rim lighting, epic particle effects in background."},{name:"Level Flythrough",description:"Smooth virtual camera tracking, showcasing environment assets."},{name:"Combat Impact",description:"High contrast, screen shake effect, vibrant hit-sparks."}]},architecture:{id:"architecture",name:"Architecture",focus:"Photorealistic materials, accurate lighting (V-Ray/Corona style), spatial flow, structural majesty.",templates:[{name:"Exterior Daylight",description:"Clear sky, sharp shadows, emphasizing building geometry."},{name:"Interior Walkthrough",description:"Smooth gimbal movement, soft diffuse lighting, material focus."},{name:"Twilight Rendering",description:"Blue hour sky, warm interior lights glowing outwards."}]},music:{id:"music",name:"Music Industry",focus:"Rhythmic editing, abstract visuals, high contrast, surrealistic environments, synchronized lighting.",templates:[{name:"Performance Close-up",description:"Lens flares, strobe lighting matching beat, intimate framing."},{name:"Abstract Visualizer",description:"Audio-reactive geometry, neon colors, hypnotic motion."},{name:"Narrative Vignette",description:"Dreamlike sequence, stylized color grade, slow motion."}]},publishing:{id:"publishing",name:"Publishing & Editorial",focus:"Composition for layout, high-end fashion aesthetics, storytelling through still poses, negative space.",templates:[{name:"Cover Portrait",description:"Eye contact, dramatic studio lighting, ample negative space for text."},{name:"Editorial Spread",description:"Environmental portrait, storytelling elements in background."},{name:"Still Life",description:"Curated objects, moody Chiaroscuro lighting, textured surfaces."}]}}}getAllIndustries(){return Object.values(this.industries)}getIndustryById(i){return this.industries[i]||null}getIndustryPromptContext(i){const n=this.getIndustryById(i);if(!n)return"";let r=`
[INDUSTRY FOCUS: ${n.name}]
`;return r+=`Professional Focus: ${n.focus}
`,r+=`Common Templates/Archetypes to draw inspiration from:
`,n.templates.forEach(c=>{r+=`- ${c.name}: ${c.description}
`}),r}}class Bt{constructor(){this.STORAGE_KEY="llm_vault",this.providers={openai:{name:"OpenAI",models:[{id:"gpt-5.2-pro",name:"GPT-5.2 Pro (Recommended)",maxTokens:4096},{id:"o4-mini",name:"o4-mini",maxTokens:4096},{id:"gpt-4.1-mini",name:"GPT-4.1 mini",maxTokens:4096},{id:"gpt-4.5",name:"GPT-4.5",maxTokens:4096}],endpoint:"https://api.openai.com/v1/chat/completions",validateEndpoint:"https://api.openai.com/v1/models"},anthropic:{name:"Anthropic",models:[{id:"claude-opus-4.5",name:"Claude Opus 4.5 (Recommended)",maxTokens:4096},{id:"claude-sonnet-4.5",name:"Claude Sonnet 4.5",maxTokens:4096},{id:"claude-opus-4.1",name:"Claude Opus 4.1",maxTokens:4096},{id:"claude-haiku-4.5",name:"Claude Haiku 4.5",maxTokens:4096}],endpoint:"https://api.anthropic.com/v1/messages"},gemini:{name:"Gemini",models:[{id:"gemini-3-pro",name:"Gemini 3 Pro (Recommended)",maxTokens:8192},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro",maxTokens:8192},{id:"gemini-3-flash",name:"Gemini 3 Flash",maxTokens:8192},{id:"gemini-2.5-flash-lite",name:"Gemini 2.5 Flash-Lite",maxTokens:8192}],endpoint:"https://generativelanguage.googleapis.com/v1beta/models"}},this.activeProvider=null,this.config={},this.industryService=new ti,this.dictionaryService=new Tt}async init(){await this.loadConfig(),await this.dictionaryService.init(),await this._migrateLegacyKeys()}async _migrateLegacyKeys(){var r;const i="prompt_gen_api_keys",n=localStorage.getItem(i);if(n)try{const c=await CryptoUtils.getDeviceFingerprint(),h=await CryptoUtils.decrypt(n,c),u=JSON.parse(h);let p=!1;for(const[y,w]of Object.entries(u))w&&this.providers[y]&&((r=this.config[y])!=null&&r.key||(this.config[y]={key:w,model:this.providers[y].models[0].id,lastUsed:null,requestCount:0},p=!0));p&&(await this.saveConfig(),console.info("LLMService: Migrated legacy API keys to unified vault.")),localStorage.removeItem(i)}catch(c){console.warn("LLMService: Could not migrate legacy keys.",c.message)}}async loadConfig(){try{const i=localStorage.getItem(this.STORAGE_KEY);if(i){const n=await CryptoUtils.getDeviceFingerprint(),r=await CryptoUtils.decrypt(i,n);this.config=JSON.parse(r)}}catch(i){console.warn("LLMService: Could not load config, starting fresh.",i.message),this.config={}}}async saveConfig(){try{const i=await CryptoUtils.getDeviceFingerprint(),n=await CryptoUtils.encrypt(JSON.stringify(this.config),i);localStorage.setItem(this.STORAGE_KEY,n)}catch(i){console.error("LLMService: Failed to save config.",i)}}async setProviderKey(i,n,r){if(!this.providers[i])throw new Error(`Unknown provider: ${i}`);this.config[i]={key:n,model:r||this.providers[i].models[0].id,lastUsed:null,requestCount:0},await this.saveConfig()}getProviderKey(i){var n;return((n=this.config[i])==null?void 0:n.key)||null}async removeProvider(i){delete this.config[i],await this.saveConfig()}getConfiguredProviders(){return Object.keys(this.config).filter(i=>{var n;return(n=this.config[i])==null?void 0:n.key})}async validateKey(i,n){try{switch(i){case"openai":return await this._validateOpenAI(n);case"anthropic":return await this._validateAnthropic(n);case"gemini":return await this._validateGemini(n);default:return{valid:!1,message:"Unknown provider"}}}catch(r){return{valid:!1,message:r.message}}}async _validateOpenAI(i){var c;const n=await fetch(this.providers.openai.validateEndpoint,{method:"GET",headers:{Authorization:`Bearer ${i}`}});return n.ok?{valid:!0,message:"API key is valid!"}:{valid:!1,message:((c=(await n.json()).error)==null?void 0:c.message)||"Invalid API key"}}async _validateAnthropic(i){var c;const n=await fetch(this.providers.anthropic.endpoint,{method:"POST",headers:{"x-api-key":i,"anthropic-version":"2023-06-01","content-type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-3-5-haiku-20241022",max_tokens:10,messages:[{role:"user",content:"Hi"}]})});return n.ok?{valid:!0,message:"API key is valid!"}:{valid:!1,message:((c=(await n.json()).error)==null?void 0:c.message)||"Invalid API key"}}async _validateGemini(i){var h;const n=`${this.providers.gemini.endpoint}?key=${i}`,r=await fetch(n);return r.ok?{valid:!0,message:"API key is valid!"}:{valid:!1,message:((h=(await r.json()).error)==null?void 0:h.message)||"Invalid API key"}}async generatePrompt(i,n,r={}){const c=this.config[i];if(!(c!=null&&c.key))throw new Error(`No API key configured for ${i}`);const h=this._buildSystemPrompt(r.modelProfile||null),u=this._buildUserPrompt(n);let p;switch(i){case"openai":p=await this._callOpenAI(c.key,c.model,h,u,r);break;case"anthropic":p=await this._callAnthropic(c.key,c.model,h,u,r);break;case"gemini":p=await this._callGemini(c.key,c.model,h,u,r);break;default:throw new Error("Unknown provider")}return c.lastUsed=new Date().toISOString(),c.requestCount=(c.requestCount||0)+1,await this.saveConfig(),this._cleanResponse(p)}determineBestProvider(i,n){const r=this.getConfiguredProviders();if(r.length===0)throw new Error("No API keys configured. Please add one in settings.");let c="openai";return(n==="Professional"||i==="text")&&(c="anthropic"),(i==="vrar"||i==="3d"||i==="animation")&&(c="gemini"),r.includes(c)?c:r[0]}async generateAiModePrompt(i,n,r,c,h){let u=this.determineBestProvider(i,n);const p=this.config[u];let y="";r&&(y=this.industryService.getIndustryPromptContext(r));let w="";c&&(w=`
[TARGET PLATFORM: ${c.toUpperCase()}]
Optimize the technical parameters, aspect ratios, and cinematic tags specifically for the ${c} video generation platform.`);let L="";const E=this.dictionaryService.getAllCategories();if(E&&E.length>0){let I=[];E.forEach(A=>A.terms.forEach(q=>I.push(q.name+": "+q.definition))),I=I.sort(()=>.5-Math.random()).slice(0,15),L=`
[CINEMATIC DICTIONARY - PROFESSIONAL TERMINOLOGY]
Incorporate professional terminology where applicable. Examples:
- `+I.join(`
- `)+`
`}const k=`You are a Universal AI Prompt Engineer specializing in generating prompts for ${i} generation.
The user's expertise level is ${n}.
If the user is a Beginner, create a highly detailed and optimized prompt explaining technical terms simply.
If the user is a Professional, focus on advanced technical parameters, specific camera/lighting/render engines without hand-holding.
${y}
${w}
${L}

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
Output raw JSON only. Do not wrap in markdown \`\`\` codeblocks.`,T=`I want to create a ${i}. Here is my idea: ${h}`;let _=0;const N=2;let $=null;for(;_<N;)try{let I;return u==="openai"?I=await this._callOpenAI(p.key,p.model,k,T,{maxTokens:800}):u==="anthropic"?I=await this._callAnthropic(p.key,p.model,k,T,{maxTokens:800}):u==="gemini"&&(I=await this._callGemini(p.key,p.model,k,T,{maxTokens:800})),p.lastUsed=new Date().toISOString(),p.requestCount=(p.requestCount||0)+1,this.saveConfig(),this._cleanResponse(I)}catch(I){$=I,_++,console.warn(`Provider ${u} failed (Attempt ${_}): ${I.message}`);const q=this.getConfiguredProviders().filter(M=>M!==u);q.length>0?(console.log(`Falling back to ${q[0]}...`),u=q[0]):await new Promise(M=>setTimeout(M,1e3*_))}throw new Error(`LLM Generation Failed after retries. Last error: ${$==null?void 0:$.message}`)}_cleanResponse(i){return i?i.replace(/^(Prompt|Enhanced Prompt|Result|Response|Scene \d+|Output|Description):?\s*/i,"").replace(/^["'](.*)["']$/s,"$1").replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/\s*```$/i,"").trim():""}async generateFullJson(i,n,r={}){const c=this.config[i];if(!(c!=null&&c.key))throw new Error(`No API key configured for ${i}`);const h=`You are a specialized AI for generating professional VEO video prompts in strict JSON format.
        
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
7. Output ONLY the raw JSON content without any conversational filler or "Prompt" labels.`,u=`Here is the raw scene data to enhance and format as JSON:
${JSON.stringify(n,null,2)}`;let p;switch(i){case"openai":p=await this._callOpenAI(c.key,c.model,h,u,r);break;case"anthropic":p=await this._callAnthropic(c.key,c.model,h,u,r);break;case"gemini":p=await this._callGemini(c.key,c.model,h,u,r);break;default:throw new Error("Unknown provider")}return c.lastUsed=new Date().toISOString(),c.requestCount=(c.requestCount||0)+1,await this.saveConfig(),p.replace(/^```json\s*/i,"").replace(/\s*```$/,"").trim()}_buildSystemPrompt(i=null){let n=`You are PromptForge AI, an expert cinematic video prompt engineer. Your role is to enhance user scene descriptions into highly detailed, professional video generation prompts.

Guidelines:
- Incorporate specific cinematic techniques (camera angles, movements, lighting styles)
- Use vivid, evocative language that AI video models understand
- Maintain the user's creative intent while adding professional depth
- Keep responses focused and concise (max 200 words per scene)
- Output ONLY the refined descriptive text.
- DO NOT include labels like "Prompt:", "Enhanced:", or "Scene:".
- DO NOT include any introductory or concluding remarks.`;return i&&(n+=`

**Target Model: ${i.name}**
`,n+=`- ${i.description}
`,i.supportsCameraControls||(n+=`- This model does NOT support advanced camera controls. Avoid describing specific camera movements like "tracking shot" or "crane shot".
`),i.supportsNegativePrompt||(n+=`- This model does NOT support negative prompts. If the user mentions things to avoid, try to express constraints positively or rephrase.
`),n+=`- Allowed Frame Rates: ${i.allowedFrameRates.join(", ")} fps.
`,n+=`- Max Resolution: ${i.maxResolution}.
`),n}_buildUserPrompt(i){let n=`Enhance this scene description for AI video generation:

`;return n+=`Description: ${i.description||"A cinematic scene"}
`,i.camera&&(n+=`Camera: ${i.camera}
`),i.lighting&&(n+=`Lighting: ${i.lighting}
`),i.negative_prompt&&(n+=`Avoid: ${i.negative_prompt}
`),n}async _callOpenAI(i,n,r,c,h){var y;const u=await fetch(this.providers.openai.endpoint,{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:r},{role:"user",content:c}],temperature:h.temperature||.7,max_tokens:h.maxTokens||500})});if(!u.ok){const w=await u.json();throw new Error(((y=w.error)==null?void 0:y.message)||"OpenAI API error")}return(await u.json()).choices[0].message.content}async _callAnthropic(i,n,r,c,h){var y;const u=await fetch(this.providers.anthropic.endpoint,{method:"POST",headers:{"x-api-key":i,"anthropic-version":"2023-06-01","content-type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:n,max_tokens:h.maxTokens||500,system:r,messages:[{role:"user",content:c}]})});if(!u.ok){const w=await u.json();throw new Error(((y=w.error)==null?void 0:y.message)||"Anthropic API error")}return(await u.json()).content[0].text}async _callGemini(i,n,r,c,h){var L,E;const u=`${this.providers.gemini.endpoint}/${n}:generateContent?key=${i}`,p=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:`${r}

${c}`}]}],generationConfig:{temperature:h.temperature||.7,maxOutputTokens:h.maxTokens||500}})});if(!p.ok){const k=await p.json();throw new Error(((L=k.error)==null?void 0:L.message)||"Gemini API error")}const y=await p.json();if(!y.candidates||y.candidates.length===0){const k=((E=y.promptFeedback)==null?void 0:E.blockReason)||"UNKNOWN_REASON";throw new Error(`Gemini blocked the request: ${k}. Please try a slightly different prompt.`)}const w=y.candidates[0];if(!w.content||!w.content.parts||w.content.parts.length===0){const k=w.finishReason||"SAFETY/FILTERING";throw new Error(`Gemini response generation failed: ${k}. The content may have been flagged by safety filters.`)}return w.content.parts[0].text}getUsageStats(){const i={};for(const[n,r]of Object.entries(this.config))r!=null&&r.key&&(i[n]={lastUsed:r.lastUsed,requestCount:r.requestCount||0,model:r.model});return i}}class Ct{constructor(){this.STORAGE_KEY="json_prompt_gen_history",this.MAX_ITEMS=50}save(i,n="json"){const r=this.getAll(),c={id:Date.now().toString(36)+Math.random().toString(36).substr(2,5),timestamp:Date.now(),mode:n,content:i,summary:this._generateSummary(i)};return r.unshift(c),r.length>this.MAX_ITEMS&&(r.length=this.MAX_ITEMS),this._persist(r),c}getAll(){try{const i=localStorage.getItem(this.STORAGE_KEY);return i?JSON.parse(i):[]}catch(i){return console.error("Failed to load history:",i),[]}}getById(i){return this.getAll().find(n=>n.id===i)}clear(){localStorage.removeItem(this.STORAGE_KEY)}delete(i){let n=this.getAll();n=n.filter(r=>r.id!==i),this._persist(n)}getDiff(i,n){const r=JSON.stringify(i,null,2),c=JSON.stringify(n,null,2),h=r.split(`
`),u=c.split(`
`);let p="",y=0,w=0;for(;y<h.length||w<u.length;){const L=h[y],E=u[w];L===E?(p+=`<div class="diff-line">${this._escapeHtml(L||"")}</div>`,y++,w++):(L!==void 0&&(p+=`<div class="diff-line diff-remove">- ${this._escapeHtml(L)}</div>`,y++),E!==void 0&&(p+=`<div class="diff-line diff-add">+ ${this._escapeHtml(E)}</div>`,w++))}return p}_generateSummary(i){const n=i.scenes?i.scenes.length:0,r=i.platform||"Unknown";return`${n} Scene${n!==1?"s":""} • ${r}`}_persist(i){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(i))}catch(n){if(console.error("Failed to save history:",n),i.length>1){const r=i.slice(0,Math.floor(i.length/2));this._persist(r)}}}_escapeHtml(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}}class ii{constructor(i){this.analytics=i}async submitFeedback(i,n,r=null){return await new Promise(c=>setTimeout(c,1e3)),this.analytics&&this.analytics.trackEvent("feedback_submitted",{type:i,length:n.length,has_screenshot:!!r}),{success:!0,id:"fb_"+Date.now()}}}class oi{constructor(){this.currentStep=1,this.totalSteps=4,this.modal=document.getElementById("getting-started-modal"),this.closeBtn=document.getElementById("getting-started-close-btn"),this.nextBtn=document.getElementById("getting-started-next"),this.prevBtn=document.getElementById("getting-started-prev"),this.checkbox=document.getElementById("dont-show-again"),this.modal&&this.init()}init(){localStorage.getItem("hasSeenGettingStarted")||setTimeout(()=>this.show(),1e3),this.bindEvents(),window.showGettingStarted=()=>this.show()}show(){this.modal.classList.remove("hidden"),this.currentStep=1,this.updateStep()}hide(){this.modal.classList.add("hidden"),this.checkbox.checked&&localStorage.setItem("hasSeenGettingStarted","true")}updateStep(){document.querySelectorAll(".getting-started-step").forEach(n=>{n.classList.add("hidden")});const i=document.querySelector(`.getting-started-step[data-step="${this.currentStep}"]`);i&&i.classList.remove("hidden"),document.querySelectorAll(".progress-dot").forEach(n=>{const r=parseInt(n.dataset.dot);n.classList.toggle("active",r===this.currentStep)}),this.prevBtn.style.display=this.currentStep===1?"none":"inline-flex",this.nextBtn.textContent=this.currentStep===this.totalSteps?"Get Started":"Next"}next(){this.currentStep<this.totalSteps?(this.currentStep++,this.updateStep()):this.hide()}prev(){this.currentStep>1&&(this.currentStep--,this.updateStep())}bindEvents(){this.closeBtn.addEventListener("click",()=>this.hide()),this.nextBtn.addEventListener("click",()=>this.next()),this.prevBtn.addEventListener("click",()=>this.prev()),document.querySelectorAll(".progress-dot").forEach(i=>{i.addEventListener("click",()=>{this.currentStep=parseInt(i.dataset.dot),this.updateStep()})}),this.modal.addEventListener("click",i=>{i.target===this.modal&&this.hide()})}}class si{constructor(){this.profiles={veo:{id:"veo",name:"Google Veo",maxResolution:"1080p",allowedResolutions:["1080p"],allowedAspectRatios:["16:9","9:16","1:1","4:3","21:9"],allowedFrameRates:["24","30"],supportsNegativePrompt:!0,supportsCameraControls:!0,maxPromptLength:500,description:"Google's high-fidelity video generation model aimed at cinematic realism."},sora:{id:"sora",name:"OpenAI Sora",maxResolution:"1080p",allowedResolutions:["1080p"],allowedAspectRatios:["16:9","9:16","1:1","4:3","21:9"],allowedFrameRates:["24","30","60"],supportsNegativePrompt:!1,supportsCameraControls:!0,maxPromptLength:300,description:"OpenAI's physics-simulating video model known for complex motion."},runway:{id:"runway",name:"Runway Gen-3 Alpha",maxResolution:"4K",allowedResolutions:["720p","1080p","4K"],allowedAspectRatios:["16:9","9:16","21:9"],allowedFrameRates:["24","30","60"],supportsNegativePrompt:!1,supportsCameraControls:!0,maxPromptLength:500,description:"Runway's latest model with advanced temporal consistency and realistic motion."},luma:{id:"luma",name:"Luma Dream Machine",maxResolution:"1080p",allowedResolutions:["1080p"],allowedAspectRatios:["16:9","9:16","1:1","4:3"],allowedFrameRates:["24","30"],supportsNegativePrompt:!0,supportsCameraControls:!0,maxPromptLength:400,description:"Fast, high-quality video model optimized for creative workflows."},kling:{id:"kling",name:"Kling",maxResolution:"1080p",allowedResolutions:["1080p"],allowedAspectRatios:["16:9","9:16","1:1"],allowedFrameRates:["30"],supportsNegativePrompt:!0,supportsCameraControls:!0,maxPromptLength:600,description:"Emerging high-motion model with strong character consistency."}}}getProfile(i){return this.profiles[i]||null}getCapability(i,n){const r=this.profiles[i];return r?r[n]:null}validateParams(i,n){const r=this.profiles[i];if(!r)return{valid:!0,violations:[]};const c=[];return n.resolution&&!r.allowedResolutions.includes(n.resolution)&&c.push({param:"resolution",message:`Resolution '${n.resolution}' is not supported by ${r.name}. Supported: ${r.allowedResolutions.join(", ")}`,suggested:r.allowedResolutions[0]}),n.aspectRatio&&!r.allowedAspectRatios.includes(n.aspectRatio)&&c.push({param:"aspect_ratio",message:`Aspect Ratio '${n.aspectRatio}' is not supported by ${r.name}. Supported: ${r.allowedAspectRatios.join(", ")}`,suggested:r.allowedAspectRatios[0]}),n.frameRate&&!r.allowedFrameRates.includes(String(n.frameRate))&&c.push({param:"frame_rate",message:`Frame Rate '${n.frameRate}' is not supported by ${r.name}. Supported: ${r.allowedFrameRates.join(", ")}`,suggested:r.allowedFrameRates[0]}),{valid:c.length===0,violations:c}}supports(i,n){const r=this.profiles[i];return r?!!r[n]:!0}validateContent(i){if(!i)return{safe:!0,flagged:[]};const r=["nsfw","naked","graphic violence","blood","hate speech"].filter(c=>i.toLowerCase().includes(c));return{safe:r.length===0,flagged:r}}formatPayload(i,n){var c;const r={target_model:((c=this.profiles[i])==null?void 0:c.name)||i,generated_at:new Date().toISOString(),...n};return i==="sora"?{model:"sora-1.0",prompts:n.scenes.map(h=>h.description),advanced_params:{...n.global_parameters},metadata:r}:r}}class ni{constructor(){this.STORAGE_KEY="json_prompt_gen_global_params",this.modelService=new si,this.defaults={platform_preset:"veo",aspect_ratio:"16:9",resolution:"1080p",frame_rate:"24"},this.params=this.loadState()}loadState(){try{const i=localStorage.getItem(this.STORAGE_KEY);if(i)return{...this.defaults,...JSON.parse(i)}}catch(i){console.warn("Failed to load global params:",i)}return{...this.defaults}}saveState(){try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.params))}catch(i){console.warn("Failed to save global params:",i)}}getParams(){return{...this.params}}updateParam(i,n){if(this.params.hasOwnProperty(i)){this.params[i]=n;const r=this.params.platform_preset,c=this.modelService.validateParams(r,this.params);return c.valid||(c.violations.forEach(h=>{this.params[h.param]=h.suggested}),window.dispatchEvent(new CustomEvent("global-params-corrected",{detail:{violations:c.violations}}))),this.saveState(),!0}return!1}resetDefaults(){return this.params={...this.defaults},this.saveState(),this.params}}class ai{constructor(){this.dbName="JsonPromptGenDB",this.storeName="templates",this.dbVersion=1,this.db=null,this.initPromise=this.initDB()}initDB(){return new Promise((i,n)=>{const r=indexedDB.open(this.dbName,this.dbVersion);r.onerror=c=>{console.error("TemplateService: Database error",c.target.error),n("Database error: "+c.target.error)},r.onsuccess=c=>{this.db=c.target.result,i(this.db)},r.onupgradeneeded=c=>{const h=c.target.result;if(!h.objectStoreNames.contains(this.storeName)){const u=h.createObjectStore(this.storeName,{keyPath:"id"});u.createIndex("name","name",{unique:!1}),u.createIndex("updatedAt","updatedAt",{unique:!1}),u.createIndex("tags","tags",{unique:!1,multiEntry:!0})}}})}async getDB(){return this.db||await this.initPromise,this.db}async saveTemplate(i){const n=await this.getDB();return new Promise((r,c)=>{const u=n.transaction([this.storeName],"readwrite").objectStore(this.storeName),p={id:i.id||crypto.randomUUID(),name:i.name||"Untitled Template",description:i.description||"",content:i.content||{},tags:i.tags||[],createdAt:i.createdAt||Date.now(),updatedAt:Date.now(),usageCount:i.usageCount||0},y=u.put(p);y.onsuccess=()=>{r(p)},y.onerror=w=>{c("Error saving template: "+w.target.error)}})}async getTemplate(i){const n=await this.getDB();return new Promise((r,c)=>{const p=n.transaction([this.storeName],"readonly").objectStore(this.storeName).get(i);p.onsuccess=()=>{r(p.result)},p.onerror=y=>{c("Error fetching template: "+y.target.error)}})}async getAllTemplates(){const i=await this.getDB();return new Promise((n,r)=>{const p=i.transaction([this.storeName],"readonly").objectStore(this.storeName).index("updatedAt").openCursor(null,"prev"),y=[];p.onsuccess=w=>{const L=w.target.result;L?(y.push(L.value),L.continue()):n(y)},p.onerror=w=>{r("Error fetching all templates: "+w.target.error)}})}async deleteTemplate(i){const n=await this.getDB();return new Promise((r,c)=>{const p=n.transaction([this.storeName],"readwrite").objectStore(this.storeName).delete(i);p.onsuccess=()=>{r(!0)},p.onerror=y=>{c("Error deleting template: "+y.target.error)}})}}class ri{constructor(i){this.services=i,this.currentPromptData=null,this.saveModal=null,this.galleryModal=null,this.saveForm=null,this.galleryGrid=null,this.init()}init(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setup()):this.setup()}setup(){this.injectModals(),this.saveModal=document.getElementById("template-save-modal"),this.galleryModal=document.getElementById("template-gallery-modal"),this.saveForm=document.getElementById("template-save-form"),this.galleryGrid=document.getElementById("template-gallery-grid"),this.bindEvents()}injectModals(){document.body.insertAdjacentHTML("beforeend",`
            <!-- Save Template Modal -->
            <div id="template-save-modal" class="template-modal-overlay">
                <div class="template-modal save-dialog">
                    <div class="template-modal-header">
                        <h3 class="gradient-text">Save Template</h3>
                        <button class="close-modal-btn" data-target="template-save-modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                    <form id="template-save-form">
                        <div class="template-modal-body">
                            <div class="template-form-group">
                                <label for="template-name">Template Name</label>
                                <input type="text" id="template-name" class="template-form-input" placeholder="e.g., Cinematic Sci-Fi Setup" required>
                            </div>
                            <div class="template-form-group">
                                <label for="template-desc">Description (Optional)</label>
                                <textarea id="template-desc" class="template-form-textarea" placeholder="Briefly describe what this template does..."></textarea>
                            </div>
                            <div class="template-form-group">
                                <label for="template-tags">Tags (Comma separated)</label>
                                <input type="text" id="template-tags" class="template-form-input" placeholder="scifi, dark, 8k">
                            </div>
                        </div>
                        <div class="template-modal-footer">
                            <button type="button" class="btn-secondary close-modal-btn" data-target="template-save-modal">Cancel</button>
                            <button type="submit" class="btn-primary">Save Template</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Template Gallery Modal -->
            <div id="template-gallery-modal" class="template-modal-overlay">
                <div class="template-modal">
                    <div class="template-modal-header">
                        <h3 class="gradient-text">Template Gallery</h3>
                        <button class="close-modal-btn" data-target="template-gallery-modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                    <div class="template-modal-body">
                        <div id="template-gallery-grid" class="template-grid">
                            <!-- Templates will be injected here -->
                        </div>
                    </div>
                </div>
            </div>
        `)}bindEvents(){document.addEventListener("click",i=>{if(i.target.closest(".close-modal-btn")){const n=i.target.closest(".close-modal-btn").dataset.target;this.closeModal(n)}i.target.classList.contains("template-modal-overlay")&&this.closeModal(i.target.id)}),this.saveForm.addEventListener("submit",async i=>{i.preventDefault(),await this.handleSaveSubmit()})}openSaveModal(i){this.currentPromptData=i,this.saveForm.reset(),this.saveModal.classList.add("active"),document.getElementById("template-name").focus()}async openGallery(){await this.renderGallery(),this.galleryModal.classList.add("active")}closeModal(i){document.getElementById(i).classList.remove("active")}async handleSaveSubmit(){const i=document.getElementById("template-name").value,n=document.getElementById("template-desc").value,c=document.getElementById("template-tags").value.split(",").map(u=>u.trim()).filter(u=>u),h={name:i,description:n,tags:c,content:this.currentPromptData};try{await this.services.saveTemplate(h),this.closeModal("template-save-modal"),window.showToast&&window.showToast("Template Saved",`"${i}" has been saved to your gallery.`,"success")}catch(u){console.error("Failed to save template:",u),window.showToast&&window.showToast("Error","Failed to save template.","error")}}async renderGallery(){this.galleryGrid.innerHTML='<div class="template-loading">Loading templates...</div>';try{const i=await this.services.getAllTemplates();if(this.galleryGrid.innerHTML="",i.length===0){this.galleryGrid.innerHTML=`
                    <div class="template-empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                        <p>No templates found. Create your first template from the generator!</p>
                    </div>
                `;return}i.forEach(n=>{const r=this.createTemplateCard(n);this.galleryGrid.appendChild(r)})}catch(i){console.error("Error rendering gallery:",i),this.galleryGrid.innerHTML='<div class="template-error">Failed to load templates.</div>'}}createTemplateCard(i){const n=document.createElement("div");n.className="template-card",n.onclick=c=>{c.target.closest(".icon-btn")||this.applyTemplate(i)};const r=new Date(i.updatedAt).toLocaleDateString();return n.innerHTML=`
            <div class="template-card-header">
                <h4 class="template-name" title="${i.name}">${i.name}</h4>
                <div class="template-actions">
                    <button class="icon-btn delete" title="Delete" onclick="window.templateUI.deleteTemplate('${i.id}', event)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
            <p class="template-desc">${i.description||"No description"}</p>
            <div class="template-info">
                <span>${r}</span>
                <span class="template-tag">${i.tags[0]||"Template"}</span>
            </div>
        `,n}async deleteTemplate(i,n){if(n.stopPropagation(),confirm("Are you sure you want to delete this template?"))try{await this.services.deleteTemplate(i),this.renderGallery(),window.showToast&&window.showToast("Deleted","Template removed.","success")}catch(r){console.error("Delete failed:",r)}}applyTemplate(i){const n=new CustomEvent("apply-template",{detail:i.content});window.dispatchEvent(n),this.closeModal("template-gallery-modal"),window.showToast&&window.showToast("Template Applied",`"${i.name}" loaded successfully.`,"success")}}window.CryptoUtils=ei;window.AnalyticsService=At;window.historyService=new Ct;window.llmService=new Bt;document.addEventListener("DOMContentLoaded",async()=>{var ft,wt,bt,St,Et;try{await window.llmService.init()}catch(e){console.error("LLMService Init Error:",e)}try{new oi}catch(e){console.error("GettingStarted Init Error:",e)}const b=localStorage.getItem("pending_dict_term");if(b)try{const e=JSON.parse(b),o=document.querySelector(".scene-description");if(o){const t=o.value;t?o.value=`${t}, ${e.name}`:o.value=e.name,o.dispatchEvent(new Event("input",{bubbles:!0})),((a,d,l="info")=>{if(typeof showToast=="function")showToast(a,d,l);else if(window.showToast)window.showToast(a,d,l);else{let m=document.getElementById("toast-container");m||(m=document.createElement("div"),m.id="toast-container",m.className="toast-container",document.body.appendChild(m));const v=document.createElement("div");v.className=`toast toast-${l} show`,v.innerHTML=`
                            <div class="toast-header">
                                <strong class="me-auto">${a}</strong>
                                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
                            </div>
                            <div class="toast-body">${d}</div>
                        `,m.appendChild(v),setTimeout(()=>{v.classList.remove("show"),setTimeout(()=>v.remove(),300)},3e3)}})("Term Applied",`Added "${e.name}" to your prompt.`,"success"),localStorage.removeItem("pending_dict_term")}}catch(e){console.error("Error applying dictionary term:",e),localStorage.removeItem("pending_dict_term")}try{const e=new ai,o=new ri(e);window.templateUI=o}catch(e){console.error("Template System Init Error:",e)}const i=new At;window.gaTracker=i;const n=document.getElementById("scenes-container"),r=document.getElementById("add-scene-btn"),c=document.getElementById("generate-btn"),h=document.getElementById("output-json"),u=document.getElementById("ai-announcement-modal");if(u&&!localStorage.getItem("ai_announce_seen")){setTimeout(()=>{u.classList.remove("hidden"),localStorage.setItem("ai_announce_seen","true"),window.gaTracker&&window.gaTracker.trackEvent("ai_announce_shown")},1200);const e=document.getElementById("ai-announce-close-btn"),o=document.getElementById("ai-announce-explore-btn");e&&e.addEventListener("click",()=>{u.classList.add("hidden"),window.gaTracker&&window.gaTracker.trackEvent("ai_announce_dismissed")}),o&&o.addEventListener("click",()=>{u.classList.add("hidden"),window.gaTracker&&window.gaTracker.trackEvent("ai_announce_explored");const t=document.getElementById("mode-ai");t&&(t.checked=!0,t.dispatchEvent(new Event("change")))})}const p=document.querySelectorAll('input[name="gen-mode"]'),y=document.getElementById("json-mode-container"),w=document.getElementById("ai-mode-container"),L=((ft=document.querySelector('input[name="gen-mode"]:checked'))==null?void 0:ft.value)||"json",E=document.getElementById("reset-btn"),k=document.getElementById("generate-btn"),T=document.getElementById("global-params-section");L==="ai"?(y&&y.classList.add("hidden"),w&&w.classList.remove("hidden"),E&&E.classList.add("hidden"),k&&k.classList.add("hidden"),T&&T.classList.add("hidden"),N()):(y&&y.classList.remove("hidden"),w&&w.classList.add("hidden"),E&&E.classList.remove("hidden"),k&&k.classList.remove("hidden"),T&&T.classList.remove("hidden")),p.forEach(e=>{e.addEventListener("change",o=>{o.target.value==="ai"?(y.classList.add("hidden"),w.classList.remove("hidden"),E&&E.classList.add("hidden"),k&&k.classList.add("hidden"),T&&T.classList.add("hidden"),i==null||i.trackEvent("mode_switch",{mode:"ai"}),N()):(y.classList.remove("hidden"),w.classList.add("hidden"),E&&E.classList.remove("hidden"),k&&k.classList.remove("hidden"),T&&T.classList.remove("hidden"),i==null||i.trackEvent("mode_switch",{mode:"json"}))})});const _="ai_chat_history_v1";function N(){const e=document.getElementById("ai-messages-area");if(!e)return;window.aiModeState=window.aiModeState||{sessionId:"ai-session-"+Date.now(),modality:null,expertise:null,industry:null,platform:null},e.children.length===0&&$();const o=document.getElementById("ai-new-chat-btn");o&&(o.onclick=()=>window.resetAiChat())}function $(){const e=document.getElementById("ai-messages-area");if(!e)return;const o=`
            <div class="chat-message ai-message">
                <div class="message-content">
                    <p>Hello! I am your Universal AI Prompt Engineer. What type of content would you like to create today?</p>
                    <div class="modality-grid">
                        <button class="modality-card" data-modality="image">
                            <div class="modality-icon">🖼️</div>
                            <div class="modality-name">Image</div>
                        </button>
                        <button class="modality-card" data-modality="video">
                            <div class="modality-icon">🎥</div>
                            <div class="modality-name">Video</div>
                        </button>
                        <button class="modality-card" data-modality="music">
                            <div class="modality-icon">🎵</div>
                            <div class="modality-name">Music</div>
                        </button>
                        <button class="modality-card" data-modality="3d">
                            <div class="modality-icon">🧊</div>
                            <div class="modality-name">3D Model</div>
                        </button>
                        <button class="modality-card" data-modality="text">
                            <div class="modality-icon">📝</div>
                            <div class="modality-name">Text</div>
                        </button>
                        <button class="modality-card" data-modality="audio">
                            <div class="modality-icon">🔊</div>
                            <div class="modality-name">Audio/SFX</div>
                        </button>
                        <button class="modality-card" data-modality="animation">
                            <div class="modality-icon">✨</div>
                            <div class="modality-name">Animation</div>
                        </button>
                        <button class="modality-card" data-modality="vrar">
                            <div class="modality-icon">🥽</div>
                            <div class="modality-name">VR/AR</div>
                        </button>
                        <button class="modality-card" data-modality="motion">
                            <div class="modality-icon">🎬</div>
                            <div class="modality-name">Motion Graphics</div>
                        </button>
                    </div>
                </div>
            </div>
        `;e.innerHTML=o,setTimeout(()=>{document.querySelectorAll(".modality-card").forEach(t=>{t.addEventListener("click",function(){this.dataset.modality;const s=this.querySelector(".modality-name").textContent;window.aiModeState.modality=s;const a=`
                        <div class="chat-message user-message">
                            <div class="message-content">
                                <p>I want to create a ${s} prompt.</p>
                            </div>
                        </div>
                    `;e.insertAdjacentHTML("beforeend",a),A(),document.querySelectorAll(".modality-card").forEach(m=>{m.style.pointerEvents="none",m.style.opacity="0.5"}),this.style.opacity="1",this.style.borderColor="var(--accent-primary)";const d=document.getElementById("ai-progress-fill");d&&(d.style.width="16%");const l=document.querySelectorAll("#ai-progress-steps li");l.length>1&&(l[0].classList.replace("active","completed"),l[1].classList.add("active")),setTimeout(()=>{e.insertAdjacentHTML("beforeend",`
                            <div class="chat-message ai-message">
                                <div class="message-content">
                                    <p>Excellent choice! Let's assess your technical expertise level to tailor the parameters accordingly. Please select one:</p>
                                    <div class="mcq-options-container">
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Beginner')">
                                            <div class="mcq-option-title">Beginner</div>
                                            <div class="mcq-option-desc">Need assistance with all technical parameters.</div>
                                        </div>
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Intermediate')">
                                            <div class="mcq-option-title">Intermediate</div>
                                            <div class="mcq-option-desc">Familiar with some concepts, but happy for suggestions.</div>
                                        </div>
                                        <div class="mcq-option" onclick="handleAiOptionSelection(this, 'Professional')">
                                            <div class="mcq-option-title">Professional</div>
                                            <div class="mcq-option-desc">I know exactly what I want (camera, lenses, lighting).</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `),e.scrollTop=e.scrollHeight,A()},800),e.scrollTop=e.scrollHeight})})},100)}function I(e){return new Promise(o=>{const t=document.getElementById("ai-confirm-overlay");t&&t.remove();const s=document.createElement("div");s.id="ai-confirm-overlay",s.style.cssText=["position:fixed","inset:0","z-index:9999","display:flex","align-items:center","justify-content:center","background:rgba(0,0,0,0.6)","backdrop-filter:blur(4px)"].join(";"),s.innerHTML=`
                <div style="background:var(--bg-elevated);border:1px solid rgba(255,255,255,0.12);
                    border-radius:16px;padding:28px 32px;max-width:380px;width:90%;text-align:center;
                    box-shadow:0 24px 60px rgba(0,0,0,0.6);">
                    <p style="color:var(--text-primary);font-size:1rem;margin:0 0 24px;line-height:1.5;">${e}</p>
                    <div style="display:flex;gap:12px;justify-content:center;">
                        <button id="ai-confirm-cancel" class="btn btn-secondary" style="min-width:100px;">Cancel</button>
                        <button id="ai-confirm-ok" class="btn btn-primary" style="min-width:100px;">Confirm</button>
                    </div>
                </div>`,document.body.appendChild(s);const a=d=>{s.remove(),o(d)};document.getElementById("ai-confirm-ok").onclick=()=>a(!0),document.getElementById("ai-confirm-cancel").onclick=()=>a(!1),s.addEventListener("click",d=>{d.target===s&&a(!1)})})}window.resetAiChat=async function(){if(!await I("Clear current conversation and start a new chat?"))return;A();const o=document.getElementById("ai-messages-area");o&&(o.innerHTML=""),window.aiModeState={sessionId:"ai-session-"+Date.now(),modality:null,expertise:null,industry:null,platform:null};const t=document.getElementById("ai-progress-fill");t&&(t.style.width="0%");const s=document.querySelectorAll("#ai-progress-steps li");s.forEach(a=>a.classList.remove("active","completed")),s.length>0&&s[0].classList.add("active"),$(),window.showToast&&window.showToast("New Chat","Previous session saved. Starting a fresh AI conversation.","info")};function A(){var m;if(!((m=window.aiModeState)!=null&&m.modality))return;const e=document.getElementById("ai-messages-area"),o=document.getElementById("ai-progress-fill"),t=document.getElementById("ai-progress-steps"),s=document.getElementById("output-json"),a={id:window.aiModeState.sessionId,date:new Date().toLocaleString(),modality:window.aiModeState.modality,state:window.aiModeState,history:e.innerHTML,progress:o?o.style.width:"0%",steps:t?t.innerHTML:"",lastJson:s?s.value:null};let d=JSON.parse(localStorage.getItem(_)||"[]");const l=d.findIndex(v=>v.id===a.id);l!==-1?d[l]=a:d.unshift(a),localStorage.setItem(_,JSON.stringify(d.slice(0,15)))}function q(){const e=document.getElementById("ai-history-section-list");if(!e)return;const o=JSON.parse(localStorage.getItem(_)||"[]");if(o.length===0){e.innerHTML='<div class="empty-state" style="padding: 20px; font-size: 0.85rem;">No AI sessions found.</div>';return}e.innerHTML="",o.forEach(t=>{const s=document.createElement("div");s.className="history-item",s.dataset.id=t.id;let a="💬";t.modality==="Image"&&(a="🖼️"),t.modality==="Video"&&(a="🎬"),t.modality==="Music"&&(a="🎵"),s.innerHTML=`
                <div class="history-item-top">
                    <div class="history-summary" style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.1rem;">${a}</span>
                        <span>${t.modality} Session</span>
                    </div>
                    <span class="history-badge badge-ai">AI</span>
                </div>
                <div class="history-item-bottom">
                    <div class="history-date" style="font-size: 0.75rem; opacity: 0.7;">${t.date}</div>
                    <button class="history-delete-btn" title="Delete Session">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `,s.querySelector(".history-delete-btn").addEventListener("click",l=>{l.stopPropagation(),deleteAiSession(t.id)}),s.addEventListener("click",()=>j(t,s)),e.appendChild(s)})}window.renderAiHistoryInSection=function(){var t,s,a;document.querySelectorAll(".history-tab").forEach(d=>d.classList.remove("active"));const e=document.getElementById("history-tab-ai");e&&(e.classList.add("active"),e.parentElement.setAttribute("data-active-tab","ai")),(t=document.getElementById("history-panel-json"))==null||t.classList.add("hidden"),(s=document.getElementById("history-panel-ai"))==null||s.classList.remove("hidden"),q();const o=document.getElementById("ai-history-preview-area");o&&(o.innerHTML='<div class="placeholder-content">Select an AI session from the sidebar...</div>'),(a=document.getElementById("ai-history-preview-actions"))==null||a.classList.add("hidden")};let M=null;function j(e,o){var s;M=e,document.querySelectorAll("#ai-history-section-list .history-item").forEach(a=>a.classList.remove("active")),o.classList.add("active");const t=document.getElementById("ai-history-preview-area");t&&(t.innerHTML=`
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="session-preview-header" style="padding: 16px 24px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                       <span style="color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; display: block; margin-bottom: 4px;">Saved Session</span>
                       <div style="color: var(--text-primary); font-size: 1.1rem; font-weight: 600; font-family: 'Outfit', sans-serif;">${e.modality} Production</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 500;">${e.date}</div>
                        <div style="color: var(--accent-primary); font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; opacity: 0.5; margin-top: 2px;">${e.id}</div>
                    </div>
                </div>
                <div class="ai-messages-area" style="flex: 1; padding: 30px; background: transparent; border: none; overflow-y: auto; display: flex; flex-direction: column; gap: 20px;">
                    ${e.history}
                </div>
            </div>
        `,(s=document.getElementById("ai-history-preview-actions"))==null||s.classList.remove("hidden"),window.historySidebarController&&setTimeout(()=>window.historySidebarController.closeAi(),150))}const fe=()=>{M&&loadAiSession(M.id)};(wt=document.getElementById("ai-history-restore-btn"))==null||wt.addEventListener("click",fe),window.loadAiSession=function(e){const t=JSON.parse(localStorage.getItem(_)||"[]").find(s=>s.id===e);t&&(window.switchSection&&window.switchSection("generator-section"),setTimeout(()=>{window.aiModeState={...t.state||{}},window.aiModeState.sessionId=t.id;const s=document.getElementById("ai-messages-area");s&&(s.innerHTML=t.history||"",s.scrollTop=s.scrollHeight);const a=document.getElementById("ai-progress-fill");a&&(a.style.width=t.progress||"0%");const d=document.getElementById("ai-progress-steps");d&&t.steps&&(d.innerHTML=t.steps);const l=document.getElementById("output-json");l&&t.lastJson?l.value=t.lastJson:l&&(l.value=JSON.stringify({platform:"veo",prompt:"Waiting for input...",parameters:{}},null,2));const m=document.querySelector('input[name="gen-mode"][value="ai"]');m&&(m.checked=!0,m.dispatchEvent(new Event("change",{bubbles:!0}))),window.showToast&&window.showToast("Session Restored","The AI chat has been restored.","success")},80))},window.deleteAiSession=async function(e){var s;if(!await I("Delete this saved session?"))return;let t=JSON.parse(localStorage.getItem(_)||"[]");if(t=t.filter(a=>a.id!==e),localStorage.setItem(_,JSON.stringify(t)),q(),M&&M.id===e){M=null;const a=document.getElementById("ai-history-preview-area");a&&(a.innerHTML='<div class="placeholder-content">Select an AI session from the sidebar...</div>'),(s=document.getElementById("ai-history-preview-actions"))==null||s.classList.add("hidden")}window.showToast&&window.showToast("Session Deleted","Item removed from history.","info")},window.handleAiOptionSelection=function(e,o){const t=document.getElementById("ai-messages-area");window.aiModeState.expertise=o,e.parentElement.querySelectorAll(".mcq-option").forEach(l=>{l.style.pointerEvents="none",l.style.opacity="0.5"}),e.style.opacity="1",e.style.borderColor="var(--accent-primary)";const s=`
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I consider my expertise level as: ${o}.</p>
                </div>
            </div>
        `;t.insertAdjacentHTML("beforeend",s),A();const a=document.getElementById("ai-progress-fill");a&&(a.style.width="28%");const d=document.querySelectorAll("#ai-progress-steps li");d.length>2&&(d[1].classList.replace("active","completed"),d[2].classList.add("active")),setTimeout(()=>{t.insertAdjacentHTML("beforeend",`
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Got it. Finally, which industry are you creating this for? This helps me apply professional templates and standards.</p>
                        <div class="mcq-options-container">
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'commercial')">
                                <div class="mcq-option-title">Commercial / Ads</div>
                                <div class="mcq-option-desc">Product focus, clean lighting.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'film')">
                                <div class="mcq-option-title">Film & TV</div>
                                <div class="mcq-option-desc">Cinematic, narrative storytelling.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'gaming')">
                                <div class="mcq-option-title">Gaming</div>
                                <div class="mcq-option-desc">Real-time engine, VFX heavy.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'architecture')">
                                <div class="mcq-option-title">Architecture</div>
                                <div class="mcq-option-desc">Photorealistic materials, spatial flow.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'music')">
                                <div class="mcq-option-title">Music Industry</div>
                                <div class="mcq-option-desc">Rhythmic, surreal, high contrast.</div>
                            </div>
                            <div class="mcq-option" onclick="handleAiIndustrySelection(this, 'publishing')">
                                <div class="mcq-option-title">Publishing</div>
                                <div class="mcq-option-desc">Editorial layout, storytelling.</div>
                            </div>
                        </div>
                    </div>
                </div>
            `),t.scrollTop=t.scrollHeight,A()},800),t.scrollTop=t.scrollHeight},window.handleAiIndustrySelection=function(e,o){const t=document.getElementById("ai-messages-area");window.aiModeState.industry=o,e.parentElement.querySelectorAll(".mcq-option").forEach(m=>{m.style.pointerEvents="none",m.style.opacity="0.5"}),e.style.opacity="1",e.style.borderColor="var(--accent-primary)";const s=e.querySelector(".mcq-option-title").textContent,a=`
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I'm creating content for: ${s}.</p>
                </div>
            </div>
        `;t.insertAdjacentHTML("beforeend",a),A();const d=document.getElementById("ai-progress-fill");d&&(d.style.width="42%");const l=document.querySelectorAll("#ai-progress-steps li");l.length>3&&(l[2].classList.replace("active","completed"),l[3].classList.add("active")),setTimeout(()=>{const m=`
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Perfect. I've configured the parameters for the ${s} industry. Now, which AI platform are you targeting for <strong>${window.aiModeState.modality}</strong> generation? Each platform has specific technical limits and styles.</p>
                        <div class="mcq-options-container">
                            ${_t(window.aiModeState.modality)}
                        </div>
                    </div>
                </div>
            `;t.insertAdjacentHTML("beforeend",m),t.scrollTop=t.scrollHeight,A()},800),t.scrollTop=t.scrollHeight},window.handleAiPlatformSelection=function(e,o){const t=document.getElementById("ai-messages-area");window.aiModeState.platform=o,e.parentElement.querySelectorAll(".mcq-option").forEach(m=>{m.style.pointerEvents="none",m.style.opacity="0.5"}),e.style.opacity="1",e.style.borderColor="var(--accent-primary)";const s=e.querySelector(".mcq-option-title").textContent,a=`
            <div class="chat-message user-message">
                <div class="message-content">
                    <p>I'm targeting the ${s} platform.</p>
                </div>
            </div>
        `;t.insertAdjacentHTML("beforeend",a),A();const d=document.getElementById("ai-progress-fill");d&&(d.style.width="57%");const l=document.querySelectorAll("#ai-progress-steps li");l.length>4&&(l[3].classList.replace("active","completed"),l[4].classList.add("active")),setTimeout(()=>{const m=`
                <div class="chat-message ai-message">
                    <div class="message-content">
                        <p>Excellent. I've tailored the optimization logic for ${s}. Now, briefly describe the subject and setting of your scene in the input box below.</p>
                    </div>
                </div>
            `;t.insertAdjacentHTML("beforeend",m),t.scrollTop=t.scrollHeight,document.getElementById("ai-chat-input").focus(),A()},800),t.scrollTop=t.scrollHeight};const Fe={Video:[{id:"veo",name:"Google Veo 3",desc:"Cinematic quality, 60s generation, native audio sync."},{id:"sora",name:"OpenAI Sora",desc:"Highly realistic, complex scene physics."},{id:"runway",name:"Runway Gen-4",desc:"Artistic control, reference image support."},{id:"luma",name:"Luma Ray 2",desc:"Rapid generation, high motion fidelity."},{id:"kling",name:"Kling 2.0",desc:"Superior character physics and lip-sync."}],Image:[{id:"midjourney",name:"Midjourney v7",desc:"Best overall quality, rich aesthetic styles."},{id:"flux",name:"FLUX 1.1 Pro Ultra",desc:"Photorealistic, exceptional detail and realism."},{id:"ideogram",name:"Ideogram 3.0",desc:"Best-in-class text rendering in images."},{id:"dalle",name:"DALL-E 3",desc:"OpenAI multimodal, strong prompt adherence."},{id:"stable",name:"Stable Diffusion 3.5",desc:"Open-source, full local control."}],Music:[{id:"suno",name:"Suno v4",desc:"Full song generation with vocals and custom lyrics."},{id:"udio",name:"Udio v2",desc:"High-fidelity music with fine-grained style control."},{id:"musicgen",name:"MusicGen Large",desc:"Meta open-source, melody-conditioned generation."},{id:"stable_audio",name:"Stable Audio 2.0",desc:"Long-form audio with timed generation."},{id:"mmaudio",name:"MMAudio",desc:"Synchronized audio generation for video clips."}],"3D Model":[{id:"tripo3d",name:"TripoAI Tripo3D",desc:"Fast, high-quality 3D mesh from text or image."},{id:"meshy",name:"Meshy 4",desc:"Game-ready assets with automatic UV texture generation."},{id:"rodin",name:"Hyper3D Rodin Gen-2",desc:"Studio-grade 3D characters and complex assets."},{id:"shap_e",name:"OpenAI Shap-E",desc:"Open-source implicit 3D representations."},{id:"trellis",name:"TRELLIS (Microsoft)",desc:"3D Gaussian and mesh from single image."}],Text:[{id:"gpt4o",name:"GPT-4o",desc:"OpenAI flagship, versatile creative and technical writing."},{id:"claude",name:"Claude 3.7 Sonnet",desc:"Best for long-form, nuanced creative writing."},{id:"gemini",name:"Gemini 2.0 Flash",desc:"Speed-optimized with native multimodal context."},{id:"llama",name:"Llama 3.3 70B",desc:"Powerful open-source, fully local capable."},{id:"mistral",name:"Mistral Large 2",desc:"Strong instruction following for structured prompts."}],"Audio/SFX":[{id:"elevenlabs",name:"ElevenLabs v3",desc:"Ultra-realistic voice cloning and sound effects."},{id:"audioldm",name:"AudioLDM 2",desc:"Text-to-audio for sound effects and ambience."},{id:"audiogen",name:"AudioGen XL",desc:"Meta model for general audio from text descriptions."},{id:"aero",name:"Aero (Stability AI)",desc:"High-quality short sound effect generation."},{id:"bark",name:"Bark v2",desc:"Open-source voice, music, and ambient audio."}],Animation:[{id:"adobe_firefly",name:"Adobe Firefly Video",desc:"Professional animation tools, IP-safe content."},{id:"pika",name:"Pika 2.2",desc:"Character animation with cinematic scene transitions."},{id:"viggle",name:"Viggle AI",desc:"Physics-based character motion and animation."},{id:"haiper",name:"Haiper 2.0",desc:"Cinematic animation with consistent motion coherence."},{id:"minimax",name:"MiniMax Video-01",desc:"Long consistent animated sequence generation."}],"VR/AR":[{id:"unity",name:"Unity AI (Muse)",desc:"Generative AI for real-time 3D and XR experiences."},{id:"nvidia_omniverse",name:"NVIDIA Omniverse",desc:"Professional XR simulation and scene generation."},{id:"meta_xr",name:"Meta AI (XR Suite)",desc:"Optimized for Quest VR social experiences."},{id:"apple_create",name:"Apple RealityKit AI",desc:"Best for Apple Vision Pro AR scenes."},{id:"polycam",name:"Polycam AI",desc:"Real-world to 3D scan for precise AR placement."}],"Motion Graphics":[{id:"runway",name:"Runway Gen-4",desc:"Motion graphics generation with keyframe control."},{id:"pika_effects",name:"Pika 2.2 Effects",desc:"Rapid motion effects and animated transitions."},{id:"krea",name:"Krea AI Realtime",desc:"Live motion design with real-time canvas."},{id:"jitter",name:"Jitter AI",desc:"Animated UI components and micro-animation loops."},{id:"spline",name:"Spline AI",desc:"3D motion graphics with interactive web export."}]};function _t(e){return(Fe[e]||Fe.Video).map(t=>`
            <div class="mcq-option" onclick="handleAiPlatformSelection(this, '${t.id}')">
                <div class="mcq-option-title">${t.name}</div>
                <div class="mcq-option-desc">${t.desc}</div>
            </div>
        `).join("")}const we=document.getElementById("ai-chat-input"),le=document.getElementById("ai-chat-send");le&&we&&(le.addEventListener("click",async()=>{var d,l,m,v;const e=we.value.trim();if(!e)return;if(!((d=window.aiModeState)!=null&&d.modality)||!((l=window.aiModeState)!=null&&l.expertise)||!((m=window.aiModeState)!=null&&m.industry)||!((v=window.aiModeState)!=null&&v.platform)){window.showToast&&window.showToast("Incomplete Setup","Please complete the setup steps first.","warning");return}const o=document.getElementById("ai-messages-area"),t=`
                <div class="chat-message user-message">
                    <div class="message-content">
                        <p>${e}</p>
                    </div>
                </div>
            `;o.insertAdjacentHTML("beforeend",t),we.value="",o.scrollTop=o.scrollHeight,A();const s="ai-loading-"+Date.now(),a=`
                <div class="chat-message ai-message" id="${s}">
                    <div class="message-content">
                        <p class="typing-indicator">Working...</p>
                    </div>
                </div>
            `;o.insertAdjacentHTML("beforeend",a),o.scrollTop=o.scrollHeight,le.disabled=!0;try{const g=await window.llmService.generateAiModePrompt(window.aiModeState.modality,window.aiModeState.expertise,window.aiModeState.industry,window.aiModeState.platform,e);let f;try{f=JSON.parse(g)}catch{throw console.error("Failed to parse AI JSON",g),new Error("AI returned malformed data. Please try again.")}const S=`
                    <div class="chat-message ai-message">
                        <div class="message-content">
                            <p>${f.message}</p>
                            <pre><code class="language-json" style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; display: block; margin-top: 10px; color: #a1e261;">${JSON.stringify(f.prompt_data,null,2)}</code></pre>
                        </div>
                    </div>
                `;document.getElementById(s).remove(),o.insertAdjacentHTML("beforeend",S);const C=document.getElementById("output-json");C&&f.prompt_data&&(C.value=JSON.stringify(f.prompt_data,null,2),C.classList.add("pulse-effect"),setTimeout(()=>C.classList.remove("pulse-effect"),2e3)),A();const H=document.getElementById("ai-progress-fill");H&&(H.style.width="100%");const R=document.querySelectorAll("#ai-progress-steps li");R.length>5&&(R[3].classList.replace("active","completed"),R[4].classList.add("completed"),R[5].classList.add("completed"))}catch(g){const f=document.getElementById(s);f&&f.remove();const S=`
                    <div class="chat-message ai-message">
                        <div class="message-content" style="border-color: #ff3b3b;">
                            <p style="color: #ff3b3b;">Error: ${g.message}</p>
                        </div>
                    </div>
                `;o.insertAdjacentHTML("beforeend",S)}finally{le.disabled=!1,o.scrollTop=o.scrollHeight}}),we.addEventListener("keypress",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),le.click())}));const Ue=document.getElementById("sidebar"),Ce=document.getElementById("sidebar-overlay"),qt=document.getElementById("hamburger-btn"),Mt=document.querySelectorAll(".sidebar-link"),Je=document.getElementById("sidebar-reset-btn"),Ve=document.getElementById("sidebar-export-btn");function Pt(){Ue.classList.add("active"),Ce.classList.add("active"),document.body.style.overflow="hidden",i.trackEvent("sidebar_open")}function te(){Ue.classList.remove("active"),Ce.classList.remove("active"),document.body.style.overflow=""}window.closeSidebar=te,qt.addEventListener("click",Pt),Ce.addEventListener("click",te),Mt.forEach(e=>{e.addEventListener("click",o=>{const t=e.dataset.section;t&&(o.preventDefault(),Ne(t)),te()})}),Je&&Je.addEventListener("click",e=>{var o;e.preventDefault(),i.trackEvent("sidebar_action",{action:"reset"}),te(),(o=document.getElementById("reset-btn"))==null||o.click()}),Ve&&Ve.addEventListener("click",e=>{var o;e.preventDefault(),i.trackEvent("sidebar_action",{action:"export"}),te(),(o=document.getElementById("download-btn"))==null||o.click()}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&i.trackEvent("tab_wake_up")});const Ot=new ii(i),Y=new Ct,be=document.getElementById("feedback-modal"),Ke=document.getElementById("sidebar-feedback-btn"),ze=document.getElementById("feedback-close-btn"),Ye=document.getElementById("feedback-cancel-btn"),Se=document.getElementById("feedback-submit-btn"),We=document.querySelectorAll("#feedback-type-chips .chip");let _e="bug";function Xe(){be&&(be.classList.remove("hidden"),i.trackEvent("feedback_open"),te())}function qe(){be&&be.classList.add("hidden")}const Ze=document.getElementById("footer-feedback-btn");Ke&&Ke.addEventListener("click",Xe),Ze&&Ze.addEventListener("click",Xe),ze&&ze.addEventListener("click",qe),Ye&&Ye.addEventListener("click",qe),We.forEach(e=>{e.addEventListener("click",()=>{We.forEach(o=>o.classList.remove("active")),e.classList.add("active"),_e=e.dataset.value})}),Se&&Se.addEventListener("click",async()=>{const e=document.getElementById("feedback-message").value;if(!e.trim()){showToast("Error","Please enter a message.","error");return}Se.classList.add("loading");try{await Ot.submitFeedback(_e,e),showToast("Feedback Sent","Thank you for your feedback!","success"),i.trackEvent("submit_feedback",{type:_e}),document.getElementById("feedback-message").value="",qe()}catch{showToast("Error","Failed to send feedback.","error")}finally{Se.classList.remove("loading")}});let B;try{B=new ni}catch(e){console.error("GlobalParamsService Init Error:",e),B={getParams:()=>({platform_preset:"veo",aspect_ratio:"16:9",resolution:"1080p",frame_rate:"24"}),updateParam:()=>!1,resetDefaults:()=>({}),modelService:{validateContent:()=>({safe:!0}),validateParams:()=>({valid:!0})}}}const W=[{key:"aspect_ratio",wrapperId:"global-aspect-ratio-dropdown",inputId:"global-aspect-ratio",displayId:"global-aspect-ratio-display"},{key:"resolution",wrapperId:"global-resolution-dropdown",inputId:"global-resolution",displayId:"global-resolution-display"},{key:"frame_rate",wrapperId:"global-frame-rate-dropdown",inputId:"global-frame-rate",displayId:"global-frame-rate-display"},{key:"platform_preset",wrapperId:"global-platform-dropdown",inputId:"global-platform",displayId:"global-platform-display"}];W.forEach(e=>{const o=document.getElementById(e.wrapperId);if(!o)return;const t=o.querySelector(".dropdown-trigger"),s=o.querySelector(".dropdown-menu"),a=document.getElementById(e.inputId),d=document.getElementById(e.displayId);t.addEventListener("click",l=>{l.stopPropagation(),W.forEach(m=>{var v;m.wrapperId!==e.wrapperId&&((v=document.getElementById(m.wrapperId))==null||v.classList.remove("open"))}),o.classList.toggle("open")}),s.addEventListener("click",l=>{l.stopPropagation();const m=l.target.closest(".dropdown-item");if(m){const v=m.dataset.value,g=m.textContent;d.textContent=g,s.querySelectorAll(".dropdown-item").forEach(f=>f.classList.remove("selected")),m.classList.add("selected"),a.value=v,B.updateParam(e.key,v),i.trackEvent("parameter_change",{param:e.key,value:v}),Ee(),Pe(),o.classList.remove("open")}})}),document.addEventListener("click",()=>{W.forEach(e=>{var o;(o=document.getElementById(e.wrapperId))==null||o.classList.remove("open")})});function ce(){const e=B.getParams(),o=(t,s)=>{const a=document.getElementById(t.wrapperId),d=document.getElementById(t.inputId),l=document.getElementById(t.displayId);if(a&&d&&l){d.value=s;const m=a.querySelector(`.dropdown-item[data-value="${s}"]`);m&&(l.textContent=m.textContent,a.querySelectorAll(".dropdown-item").forEach(v=>v.classList.remove("selected")),m.classList.add("selected"))}};o(W[0],e.aspect_ratio),o(W[1],e.resolution),o(W[2],e.frame_rate),o(W[3],e.platform_preset),Ee()}function Ee(){const o=B.getParams().platform_preset,t=B.modelService,s=t.supports(o,"supportsNegativePrompt");document.querySelectorAll(".scene-negative-prompt").forEach(d=>{const l=d.closest(".form-group");if(l){const m=l.previousElementSibling;s?(l.classList.remove("hidden"),m&&m.classList.remove("no-separator")):(l.classList.add("hidden"),m&&m.classList.add("no-separator"))}});const a=t.supports(o,"supportsCameraControls");document.querySelectorAll(".scene-camera-input").forEach(d=>{const l=d.closest(".form-group");l&&(a?(l.classList.remove("disabled-group"),d.disabled=!1,l.style.opacity="1",l.style.pointerEvents="auto"):(l.classList.add("disabled-group"),d.disabled=!0,l.style.opacity="0.5",l.style.pointerEvents="none"))})}window.addEventListener("global-params-corrected",e=>{const o=e.detail.violations,t=o.map(s=>`• ${s.message}`).join("<br>");showToast("Settings Adjusted",t,"warning",6e3),i.trackEvent("settings_auto_adjusted",{violation_count:o.length}),ce(),Ee()}),ce();const Qe=document.getElementById("reset-global-params");Qe&&Qe.addEventListener("click",()=>{confirm("Reset all global parameters to defaults?")&&(B.resetDefaults(),ce(),showToast("Global Parameters Reset","All global settings have been restored to defaults.","info"))});let ie=1;r.addEventListener("click",()=>{ie++;const e=ie;i.trackEvent("add_scene",{scene_id:e});const o=`
            <div class="scene-item" data-scene-id="${e}">
                <div class="scene-header">
                    <h4 class="scene-title" style="margin: 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Scene ${e}</h4>
                    <div class="scene-actions">
                        <button class="scene-undo-btn hidden" title="Undo AI Enhancement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><path d="m3 10 6 6"/><path d="m3 10 6-6"/></svg>
                        </button>
                        <button class="scene-redo-btn hidden" title="Redo AI Enhancement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10H11a5 5 0 0 0-5 5v2"/><path d="m21 10-6 6"/><path d="m21 10-6-6"/></svg>
                        </button>
                        <button class="scene-enhance-btn" title="Enhance with AI">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="enhance-stars-icon">
                                <path d="M15.5 5.5 L16.8 10.2 L21.5 11.5 L16.8 12.8 L15.5 17.5 L14.2 12.8 L9.5 11.5 L14.2 10.2 Z" />
                                <path d="M5.5 2.5 L6.2 4.8 L8.5 5.5 L6.2 6.2 L5.5 8.5 L4.8 6.2 L2.5 5.5 L4.8 4.8 Z" />
                                <path d="M6.5 15.5 L7.2 17.8 L9.5 18.5 L7.2 19.2 L6.5 21.5 L5.8 19.2 L3.5 18.5 L5.8 17.8 Z" />
                            </svg>
                        </button>
                        <button class="remove-scene-btn" onclick="removeScene(this)" title="Remove Scene">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Scene Description</label>
                    <textarea class="scene-description" placeholder="Describe your scene in detail..." style="min-height: 100px;"></textarea>
                </div>
                <div class="scene-params-grid">
                <div class="form-group">
                    <label class="section-label">Camera Angle</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-camera-input" 
                            placeholder="Select angle or type custom..."
                            aria-label="Camera Angle">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open camera presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="pan_left">Pan Left</div>
                                <div class="dropdown-item" data-value="pan_right">Pan Right</div>
                                <div class="dropdown-item" data-value="zoom_in">Zoom In</div>
                                <div class="dropdown-item" data-value="zoom_out">Zoom Out</div>
                                <div class="dropdown-item" data-value="dolly_zoom">Dolly Zoom</div>
                                <div class="dropdown-item" data-value="tracking_shot">Track</div>
                                <div class="dropdown-item" data-value="eye_level">Eye Level</div>
                                <div class="dropdown-item" data-value="low_angle">Low Angle</div>
                                <div class="dropdown-item" data-value="high_angle">High Angle</div>
                                <div class="dropdown-item" data-value="aerial_view">Aerial View</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Lighting Style</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-lighting-input" 
                            placeholder="Select lighting or type custom..."
                            aria-label="Lighting Style">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open lighting presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="natural">Natural</div>
                                <div class="dropdown-item" data-value="golden_hour">Golden Hour</div>
                                <div class="dropdown-item" data-value="blue_hour">Blue Hour</div>
                                <div class="dropdown-item" data-value="neon">Neon Cyberpunk</div>
                                <div class="dropdown-item" data-value="studio">Studio</div>
                                <div class="dropdown-item" data-value="dramatic">Dramatic</div>
                                <div class="dropdown-item" data-value="cinematic">Cinematic</div>
                                <div class="dropdown-item" data-value="softbox">Softbox</div>
                                <div class="dropdown-item" data-value="backlit">Backlit</div>
                                <div class="dropdown-item" data-value="rim_light">Rim Light</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Color Palettes</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-color-input" placeholder="Select palette or type custom..." aria-label="Color Palette">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open color presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="monochromatic">Monochromatic</div>
                                <div class="dropdown-item" data-value="complementary">Complementary</div>
                                <div class="dropdown-item" data-value="analogous">Analogous</div>
                                <div class="dropdown-item" data-value="teal_orange">Cinematic Teal & Orange</div>
                                <div class="dropdown-item" data-value="cyberpunk">Cyberpunk Glow</div>
                                <div class="dropdown-item" data-value="sepia">Sepia Tone</div>
                                <div class="dropdown-item" data-value="vibrant">High Saturation</div>
                                <div class="dropdown-item" data-value="desaturated">Moody Desaturated</div>
                                <div class="dropdown-item" data-value="pastel">Pastel Tones</div>
                                <div class="dropdown-item" data-value="bw">Classic B&W</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Mood Descriptors</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-mood-input" placeholder="Select mood or type custom..." aria-label="Mood Descriptors">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open mood presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="ethereal">Ethereal/Dreamy</div>
                                <div class="dropdown-item" data-value="ominous">Dark/Ominous</div>
                                <div class="dropdown-item" data-value="energetic">High Energy</div>
                                <div class="dropdown-item" data-value="calm">Calm/Peaceful</div>
                                <div class="dropdown-item" data-value="nostalgic">Nostalgic</div>
                                <div class="dropdown-item" data-value="cyberpunk">Cyberpunk/Neon</div>
                                <div class="dropdown-item" data-value="epic">Epic/Cinematic</div>
                                <div class="dropdown-item" data-value="suspenseful">Suspenseful</div>
                                <div class="dropdown-item" data-value="melancholic">Melancholic</div>
                                <div class="dropdown-item" data-value="whimsical">Whimsical</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Sound Design</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-sound-input" placeholder="Describe sound or select presets..." aria-label="Sound Design">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open sound presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="ambient_wind">Ambient Wind</div>
                                <div class="dropdown-item" data-value="orchestral">Cinematic Orchestral</div>
                                <div class="dropdown-item" data-value="low_hum">Low Hum</div>
                                <div class="dropdown-item" data-value="nature">Nature Sounds</div>
                                <div class="dropdown-item" data-value="urban_traffic">Urban Traffic</div>
                                <div class="dropdown-item" data-value="synthwave">80s Synth</div>
                                <div class="dropdown-item" data-value="industrial">Heavy Industrial</div>
                                <div class="dropdown-item" data-value="silence">Deep Silence</div>
                                <div class="dropdown-item" data-value="asmr">ASMR Rustle</div>
                                <div class="dropdown-item" data-value="glitch">Glitchy Beats</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Negative Prompts</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-negative-prompt" 
                            placeholder="Type elements to exclude or select from presets..."
                            aria-label="Custom negative prompts">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger" aria-label="Open presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="blurry">Blurry</div>
                                <div class="dropdown-item" data-value="low_res">Low Res</div>
                                <div class="dropdown-item" data-value="deformed">Deformed</div>
                                <div class="dropdown-item" data-value="watermark">Watermark</div>
                                <div class="dropdown-item" data-value="flicker">Flicker</div>
                                <div class="dropdown-item" data-value="grainy">Grainy</div>
                                <div class="dropdown-item" data-value="overexposed">Overexposed</div>
                                <div class="dropdown-item" data-value="extra_limbs">Extra Limbs</div>
                                <div class="dropdown-item" data-value="distorted">Distorted</div>
                                <div class="dropdown-item" data-value="unrealistic">Unrealistic</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Composition Principles</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-composition-input"
                            placeholder="Select composition or type custom..."
                            aria-label="Composition Principles">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger"
                                aria-label="Open composition presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="rule_of_thirds">Rule of Thirds</div>
                                <div class="dropdown-item" data-value="center_framed">Center Framed</div>
                                <div class="dropdown-item" data-value="leading_lines">Leading Lines</div>
                                <div class="dropdown-item" data-value="golden_ratio">Golden Ratio</div>
                                <div class="dropdown-item" data-value="negative_space">Negative Space</div>
                                <div class="dropdown-item" data-value="symmetrical">Symmetrical</div>
                                <div class="dropdown-item" data-value="asymmetrical">Asymmetrical</div>
                                <div class="dropdown-item" data-value="depth_of_field">Depth of Field</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Lens Techniques</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-lens-input"
                            placeholder="Select lens or type custom..." aria-label="Lens Techniques">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger"
                                aria-label="Open lens presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="macro">Macro</div>
                                <div class="dropdown-item" data-value="wide_angle">Wide Angle</div>
                                <div class="dropdown-item" data-value="telephoto">Telephoto</div>
                                <div class="dropdown-item" data-value="fisheye">Fisheye</div>
                                <div class="dropdown-item" data-value="bokeh">Bokeh</div>
                                <div class="dropdown-item" data-value="tilt_shift">Tilt Shift</div>
                                <div class="dropdown-item" data-value="anamorphic">Anamorphic</div>
                                <div class="dropdown-item" data-value="prime_lens">Prime Lens</div>
                                <div class="dropdown-item" data-value="zoom_lens">Zoom Lens</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Production Design</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-production-input"
                            placeholder="Select style or type custom..." aria-label="Production Design">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger"
                                aria-label="Open production presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="minimalist">Minimalist</div>
                                <div class="dropdown-item" data-value="brutalist">Brutalist</div>
                                <div class="dropdown-item" data-value="futuristic">Futuristic</div>
                                <div class="dropdown-item" data-value="retro_vintage">Retro/Vintage</div>
                                <div class="dropdown-item" data-value="industrial">Industrial</div>
                                <div class="dropdown-item" data-value="gothic">Gothic</div>
                                <div class="dropdown-item" data-value="art_deco">Art Deco</div>
                                <div class="dropdown-item" data-value="cyberpunk">Cyberpunk</div>
                                <div class="dropdown-item" data-value="steampunk">Steampunk</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="section-label">Editing Techniques</label>
                    <div class="input-with-dropdown">
                        <input type="text" class="scene-editing-input"
                            placeholder="Select technique or type custom..."
                            aria-label="Editing Techniques">
                        <div class="input-dropdown-wrapper">
                            <button type="button" class="input-dropdown-trigger"
                                aria-label="Open editing presets">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div class="input-dropdown-menu">
                                <div class="dropdown-item" data-value="fast_cut">Fast Cut</div>
                                <div class="dropdown-item" data-value="slow_motion">Slow Motion</div>
                                <div class="dropdown-item" data-value="jump_cut">Jump Cut</div>
                                <div class="dropdown-item" data-value="cross_dissolve">Cross Dissolve</div>
                                <div class="dropdown-item" data-value="match_cut">Match Cut</div>
                                <div class="dropdown-item" data-value="fade_to_black">Fade to Black</div>
                                <div class="dropdown-item" data-value="long_take">Long Take</div>
                                <div class="dropdown-item" data-value="montage">Montage</div>
                                <div class="dropdown-item" data-value="time_lapse">Time Lapse</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div> <!-- End scene-params-grid -->
            </div>
        `;n.insertAdjacentHTML("beforeend",o),Ee()}),n.addEventListener("click",e=>{const o=e.target.closest(".input-dropdown-trigger");if(o){e.stopPropagation();const s=o.closest(".input-dropdown-wrapper");document.querySelectorAll(".input-dropdown-wrapper.open").forEach(a=>{a!==s&&a.classList.remove("open")}),s.classList.toggle("open")}const t=e.target.closest(".input-dropdown-menu .dropdown-item");if(t){e.stopPropagation();const s=t.closest(".input-dropdown-wrapper"),a=s.closest(".input-with-dropdown").querySelector("input"),d=t.textContent.trim();let l=a.value.trim();l?l.split(",").map(v=>v.trim().toLowerCase()).includes(d.toLowerCase())||(a.value=`${l}, ${d}`):a.value=d,s.classList.remove("open"),a.focus(),a.dispatchEvent(new Event("input",{bubbles:!0}))}}),document.addEventListener("click",()=>{document.querySelectorAll(".input-dropdown-wrapper.open").forEach(e=>{e.classList.remove("open")})}),window.removeScene=function(e){const o=e.closest(".scene-item");o&&(o.remove(),Ht())};function Ht(){const e=n.querySelectorAll(".scene-item");e.forEach((o,t)=>{const s=o.querySelector("h4");s&&(s.textContent=`Scene ${t+1}`)}),ie=e.length}const et=document.getElementById("reset-btn");et&&et.addEventListener("click",()=>{var e,o;if(confirm("Are you sure you want to reset the generator? All current work will be lost.")){i.trackEvent("reset_generator");const t=n.querySelector('.scene-item[data-scene-id="1"]');t&&(t.querySelector(".scene-description").value="",t.querySelector(".scene-negative-prompt").value="",t.querySelector(".scene-camera-input").value="",t.querySelector(".scene-lighting-input").value="",t.querySelector(".scene-color-input").value="",t.querySelector(".scene-mood-input").value="",t.querySelector(".scene-sound-input").value="",t.querySelector(".scene-composition-input").value="",t.querySelector(".scene-lens-input").value="",t.querySelector(".scene-production-input").value="",t.querySelector(".scene-editing-input").value="",(e=t.querySelector(".scene-undo-btn"))==null||e.classList.add("hidden"),(o=t.querySelector(".scene-redo-btn"))==null||o.classList.add("hidden")),n.querySelectorAll('.scene-item:not([data-scene-id="1"])').forEach(a=>a.remove()),ie=1,h.value=JSON.stringify({platform:"veo",prompt:"Waiting for input...",parameters:{aspect_ratio:"16:9",resolution:"1080p"}},null,2),localStorage.removeItem(Me),showToast("Generator Reset","All scenes and outputs have been cleared.","info")}});const Me="json_prompt_gen_autosave";function Pe(){const e=[];n.querySelectorAll(".scene-item").forEach(s=>{var a,d,l,m,v,g,f,S,C,H;e.push({description:s.querySelector(".scene-description").value,camera:((a=s.querySelector(".scene-camera-input"))==null?void 0:a.value)||"",lighting:((d=s.querySelector(".scene-lighting-input"))==null?void 0:d.value)||"",color:((l=s.querySelector(".scene-color-input"))==null?void 0:l.value)||"",mood:((m=s.querySelector(".scene-mood-input"))==null?void 0:m.value)||"",sound:((v=s.querySelector(".scene-sound-input"))==null?void 0:v.value)||"",negative:((g=s.querySelector(".scene-negative-prompt"))==null?void 0:g.value)||"",composition:((f=s.querySelector(".scene-composition-input"))==null?void 0:f.value)||"",lens:((S=s.querySelector(".scene-lens-input"))==null?void 0:S.value)||"",production:((C=s.querySelector(".scene-production-input"))==null?void 0:C.value)||"",editing:((H=s.querySelector(".scene-editing-input"))==null?void 0:H.value)||""})});const t={scenes:e,globalParams:B.getParams(),timestamp:Date.now()};localStorage.setItem(Me,JSON.stringify(t))}function Nt(){const e=localStorage.getItem(Me);if(e)try{const o=JSON.parse(e);o.globalParams&&(Object.keys(o.globalParams).forEach(t=>{B.updateParam(t,o.globalParams[t])}),ce()),o.scenes&&o.scenes.length>0&&(n.innerHTML="",ie=0,o.scenes.forEach(t=>{r.click();const s=n.lastElementChild;s.querySelector(".scene-description").value=t.description||"",t.camera&&(s.querySelector(".scene-camera-input").value=t.camera),t.lighting&&(s.querySelector(".scene-lighting-input").value=t.lighting),t.color&&(s.querySelector(".scene-color-input").value=t.color),t.mood&&(s.querySelector(".scene-mood-input").value=t.mood),t.sound&&(s.querySelector(".scene-sound-input").value=t.sound),t.negative&&(s.querySelector(".scene-negative-prompt").value=t.negative),t.composition&&(s.querySelector(".scene-composition-input").value=t.composition),t.lens&&(s.querySelector(".scene-lens-input").value=t.lens),t.production&&(s.querySelector(".scene-production-input").value=t.production),t.editing&&(s.querySelector(".scene-editing-input").value=t.editing)}),showToast("Work Restored","Your previous session has been restored.","success"))}catch(o){console.error("Failed to restore work:",o)}}n.addEventListener("input",()=>{Pe()}),Nt(),c.addEventListener("click",async()=>{Pe(),c.classList.add("loading"),await new Promise(e=>setTimeout(e,600));try{const e=[];if(n.querySelectorAll(".scene-item").forEach(m=>{var kt,Lt,It,xt;const v=m.querySelector(".scene-description").value,g=m.querySelector(".scene-camera-input").value.trim(),f=m.querySelector(".scene-lighting-input").value.trim(),S=m.querySelector(".scene-color-input").value.trim(),C=m.querySelector(".scene-mood-input").value.trim(),H=m.querySelector(".scene-sound-input").value.trim(),R=((kt=m.querySelector(".scene-composition-input"))==null?void 0:kt.value.trim())||"",U=((Lt=m.querySelector(".scene-lens-input"))==null?void 0:Lt.value.trim())||"",Be=((It=m.querySelector(".scene-production-input"))==null?void 0:It.value.trim())||"",Xt=((xt=m.querySelector(".scene-editing-input"))==null?void 0:xt.value.trim())||"",Zt=m.querySelector(".scene-negative-prompt").value.trim();v.trim()&&e.push({description:v.trim(),negative_prompt:Zt||null,parameters:{camera:g||null,lighting:f||null,color_palette:S||null,mood:C||null,sound_design:H||null,composition:R||null,lens_technique:U||null,production_design:Be||null,editing_technique:Xt||null}})}),e.length===0){showToast("Empty Prompt","Please add at least one scene description.","warning");return}const t=B.modelService.validateContent(JSON.stringify(e));if(!t.safe){showToast("Safety Violation",`Content contains prohibited terms: ${t.flagged.join(", ")}`,"error");return}const s=document.querySelector('input[name="gen-mode"]:checked'),a=s?s.value:"json",d=B.getParams(),l={platform:d.platform_preset,version:"1.0",scenes:[],global_parameters:{aspect_ratio:d.aspect_ratio,resolution:d.resolution,frame_rate:d.frame_rate}};if(a==="ai"){const m=P.getConfiguredProviders();if(m.length===0){showToast("Configuration Required","Please configure an AI provider in the integration hub first.","warning");return}const v=m[0];c.disabled=!0;try{const g=await P.generateFullJson(v,e);let f;try{f=JSON.parse(g)}catch{throw new Error("Failed to parse AI response as valid JSON.")}l.scenes=f;const S=B.modelService.formatPayload(d.platform_preset,l);h.value=JSON.stringify(S,null,2),Y&&Y.save(S,"ai"),i.trackGeneration(e.length,"ai",d.platform_preset),showToast("AI Generation Complete","Enhanced JSON prompt generated successfully!","success"),document.getElementById("output-section").classList.remove("hidden"),document.getElementById("output-section").scrollIntoView({behavior:"smooth",block:"start"})}catch(g){console.error("AI Gen Error:",g),showToast("Generation Failed",g.message,"error")}finally{c.disabled=!1}}else{l.scenes=e;const m=B.modelService.formatPayload(d.platform_preset,l);h.value=JSON.stringify(m,null,2),Y&&Y.save(m,"json"),i.trackGeneration(e.length,"json",d.platform_preset),showToast("Success","JSON generated successfully!","success"),document.getElementById("output-section").classList.remove("hidden"),document.getElementById("output-section").scrollIntoView({behavior:"smooth",block:"start"})}}catch(e){console.error("Generation Error:",e),showToast("Error","An unexpected error occurred.","error")}finally{c.classList.remove("loading")}}),document.getElementById("copy-btn").addEventListener("click",()=>{const e=h.value;if(!e||e.includes("Waiting for input...")){showToast("No Content","Generate a prompt first.","warning");return}navigator.clipboard.writeText(e).then(()=>{showToast("Copied","JSON prompt copied to clipboard!","success"),i.trackEvent("copy_json")}).catch(o=>{showToast("Error","Failed to copy to clipboard.","error")})}),document.getElementById("download-btn").addEventListener("click",()=>{const e=h.value;if(!e||e.includes("Waiting for input...")){showToast("No Content","Generate a prompt first.","warning");return}const o=new Blob([e],{type:"application/json"}),t=URL.createObjectURL(o),s=document.createElement("a");s.href=t,s.download=`veo-prompt-${Date.now()}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(t),showToast("Downloaded","JSON file downloaded successfully.","success"),i.trackEvent("download_json")});const x=new Tt;document.getElementById("dictionary-section");const Rt=document.getElementById("generator-section");document.getElementById("output-section");const oe=document.querySelectorAll(".main-nav a"),D=document.getElementById("dict-content"),G=document.getElementById("dict-category-list"),tt=document.getElementById("dict-search"),me=document.getElementById("dict-active-category-title"),se=document.getElementById("dict-sidebar"),J=document.getElementById("dict-sidebar-overlay"),it=document.getElementById("dict-hamburger-btn"),ot=document.getElementById("dict-sidebar-close");function $t(){se==null||se.classList.add("active"),J==null||J.classList.add("active")}function Oe(){se==null||se.classList.remove("active"),J==null||J.classList.remove("active")}it&&it.addEventListener("click",$t),ot&&ot.addEventListener("click",Oe),J&&J.addEventListener("click",Oe);const P=new Bt,jt=document.getElementById("llm-section"),st=document.getElementById("ai-enhance-btn"),ke=document.getElementById("llm-key-modal"),nt=document.getElementById("llm-modal-close-btn"),at=document.getElementById("key-modal-cancel"),rt=document.getElementById("key-modal-save"),He=document.getElementById("provider-api-key"),X=document.getElementById("key-validation-status"),dt=document.querySelectorAll(".provider-card"),ne=document.querySelector(".usage-dashboard");let ue=null,Z=null;P.init().then(()=>{je()});const ae=document.getElementById("contribution-modal"),lt=document.getElementById("dict-contribute-btn"),ct=document.getElementById("modal-close-btn"),mt=document.getElementById("modal-cancel-btn"),Le=document.getElementById("modal-submit-btn");document.getElementById("contrib-category"),document.getElementById("new-category-check");const Q=document.getElementById("new-category-name"),re=document.getElementById("contrib-difficulty-pills");let F=null;const Ie=document.getElementById("toggle-api-key");Ie&&Ie.addEventListener("click",()=>{const e=document.getElementById("provider-api-key"),o=Ie.querySelector(".eye-icon"),t=Ie.querySelector(".eye-off-icon");e.type==="password"?(e.type="text",o.classList.add("hidden"),t.classList.remove("hidden")):(e.type="password",o.classList.remove("hidden"),t.classList.add("hidden"))});function Ne(e){var a,d;if(!e)return;i.trackEvent("section_view",{section:e}),document.querySelectorAll(".main-nav a").forEach(l=>{l.dataset.section===e?l.classList.add("active"):l.classList.remove("active")}),document.querySelectorAll(".sidebar-link").forEach(l=>{l.dataset.section===e?l.classList.add("active"):l.classList.remove("active")}),document.querySelectorAll("section").forEach(l=>l.classList.add("hidden"));const o=document.querySelector(".hero-section"),t=document.querySelector(".dict-hero");o==null||o.classList.add("hidden"),t==null||t.classList.add("hidden");const s=document.getElementById(e);s&&s.classList.remove("hidden"),e==="generator-section"?(o==null||o.classList.remove("hidden"),(a=document.getElementById("global-params-section"))==null||a.classList.remove("hidden"),(d=document.getElementById("output-section"))==null||d.classList.remove("hidden")):e==="dictionary-section"?(t==null||t.classList.remove("hidden"),x.isInitialized||x.init().then(()=>{Re(),$e(),setTimeout(()=>{const l=G==null?void 0:G.querySelector("li");l&&l.querySelector(".category-name").click()},100)})):e==="llm-section"?je():e==="history-section"&&typeof z=="function"&&z("section")}window.switchSection=Ne,oe.forEach(e=>{e.addEventListener("click",o=>{const t=e.dataset.section;t&&(o.preventDefault(),Ne(t))})});function Re(){if(!G)return;G.innerHTML="",x.getAllCategories().forEach(o=>{const t=document.createElement("li"),s=x.isCategoryUserCreated(o.id);s&&t.classList.add("user-category");const a=document.createElement("span");if(a.textContent=o.name,a.className="category-name",t.appendChild(a),s){const d=document.createElement("button");d.className="category-delete-btn",d.title="Delete Category",d.innerHTML=`
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                `,d.addEventListener("click",l=>{l.stopPropagation(),Jt(o.id)}),t.appendChild(d)}t.dataset.catId=o.id,a.addEventListener("click",()=>{G.querySelectorAll("li").forEach(d=>d.classList.remove("active")),t.classList.add("active"),F=o.id,me.textContent=o.name,pe(o.id),Oe()}),G.appendChild(t)})}function pe(e){if(D.innerHTML="",!e){D.innerHTML='<div class="empty-state">Select a category from the sidebar to view terms</div>';return}x.getTermsByCategory(e).forEach(t=>{const s=ut(t);D.appendChild(s)})}function ut(e){const o=document.createElement("div"),t=x.isUserCreated(e.id);o.className=`term-card ${t?"user-term":""}`,o.dataset.termId=e.id;const s=e.examples&&e.examples.length>0?`<div class="term-examples">
                <h5>Examples:</h5>
                <ul>${e.examples.map(f=>`<li>${f}</li>`).join("")}</ul>
               </div>`:"",a=e.difficulty||"beginner",d=e.author||"System",l=e.likes||0,m=t?`
            <button class="term-manage-btn edit-btn" data-term-id="${e.id}" title="Edit Term">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <button class="term-manage-btn delete-btn" data-term-id="${e.id}" title="Delete Term">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        `:"";o.innerHTML=`
            <div class="term-header">
                <h4 class="term-title">${e.name}</h4>
                <div class="term-header-right">
                    <span class="difficulty-badge ${a}">${a}</span>
                    ${m}
                </div>
            </div>
            <p class="term-definition">${e.definition}</p>
            ${s}
            <div class="term-footer">
                <div class="term-author">By: <span>@${d}</span></div>
                <div class="term-actions">
                    <button class="term-action-btn like-btn" data-term-id="${e.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span class="like-count">${l}</span>
                    </button>
                    <button class="btn-use-prompt" data-term-name="${e.name}">Use in Prompt</button>
                </div>
            </div>
        `;const v=o.querySelector(".like-btn");return v.addEventListener("click",()=>Gt(e.id,v)),o.querySelector(".btn-use-prompt").addEventListener("click",()=>Dt(e.name)),t&&(o.querySelector(".edit-btn").addEventListener("click",()=>Ft(e.id)),o.querySelector(".delete-btn").addEventListener("click",()=>Ut(e.id))),o}function Gt(e,o){o.classList.toggle("liked");const t=o.querySelector(".like-count");i.trackEvent("dict_like_term",{term_id:e,liked:o.classList.contains("liked")});let s=parseInt(t.textContent)||0;o.classList.contains("liked")?s++:s=Math.max(0,s-1),t.textContent=s;const a=JSON.parse(localStorage.getItem("likedTerms")||"[]");if(o.classList.contains("liked"))a.includes(e)||a.push(e);else{const d=a.indexOf(e);d>-1&&a.splice(d,1)}localStorage.setItem("likedTerms",JSON.stringify(a))}function Dt(e){var t,s,a;const o=document.querySelector(".scene-description");if(o){const d=o.value;o.value=d?`${d}, ${e}`:e,i.trackEvent("dict_use_term",{term_name:e}),o.dispatchEvent(new Event("input",{bubbles:!0}));const l=Array.from(oe).find(m=>m.textContent.trim()==="JSON Generator");l?l.click():(document.querySelectorAll("section").forEach(m=>m.classList.add("hidden")),Rt.classList.remove("hidden"),(t=document.getElementById("global-params-section"))==null||t.classList.remove("hidden"),(s=document.getElementById("output-section"))==null||s.classList.remove("hidden"),(a=document.querySelector(".hero-section"))==null||a.classList.remove("hidden"),oe.forEach(m=>m.classList.remove("active")),oe[0]&&oe[0].classList.add("active")),typeof showToast=="function"&&showToast("Term Applied",`"${e}" added to scene 1`,"success")}else{const d=Array.from(oe).find(l=>l.textContent.trim()==="JSON Generator");d&&d.click(),typeof showToast=="function"&&showToast("No Active Scene","Add a scene first to use dictionary terms.","warning")}}let xe=null,de=null;function Ft(e){const o=x.getTermById(e);if(!o)return;const{term:t,categoryId:s}=o;xe=e,de=s,document.getElementById("contrib-username").value=t.author||"",document.getElementById("contrib-term-name").value=t.name||"",document.getElementById("contrib-definition").value=t.definition||"",document.getElementById("contrib-examples").value=t.examples?t.examples.join(", "):"",V=s;const a=x.getAllCategories().find(l=>l.id===s);a&&(Te.textContent=a.name),re.querySelectorAll(".pill").forEach(l=>{l.classList.remove("active"),l.dataset.value===t.difficulty&&l.classList.add("active")}),document.querySelector(".modal-header h3").textContent="Edit Term",Le.textContent="Update Term",ae.classList.remove("hidden")}function Ut(e){if(!confirm("Are you sure you want to delete this term? This action cannot be undone."))return;const o=x.getTermById(e);if(!o)return;const{categoryId:t}=o;x.deleteTerm(t,e)&&(i.trackEvent("dict_delete_term",{term_id:e,category_id:t}),F===t&&pe(t))}function Jt(e){const o=x.getAllCategories().find(s=>s.id===e),t=o?o.name:"this category";confirm(`Are you sure you want to delete "${t}"? All terms in this category will also be deleted. This action cannot be undone.`)&&x.deleteCategory(e)&&(Re(),$e(),F===e&&(F=null,me.textContent="Select a Category",D.innerHTML='<div class="empty-state">Select a category from the sidebar to view terms</div>'))}tt&&tt.addEventListener("input",e=>{const o=e.target.value.trim();if(o.length>0){G==null||G.querySelectorAll("li").forEach(s=>s.classList.remove("active")),me.textContent=`Search: "${o}"`;const t=x.searchTerm(o);i.trackEvent("dict_search",{query:o,result_count:t.length}),Vt(t)}else if(F){const t=x.getAllCategories().find(s=>s.id===F);me.textContent=t?t.name:"Select a Category",pe(F)}else me.textContent="Select a Category",D.innerHTML='<div class="empty-state">Select a category from the sidebar to view terms</div>'});function Vt(e){if(D.innerHTML="",e.length===0){D.innerHTML='<div class="empty-state">No terms found matching your query.</div>';return}e.forEach(o=>{const t=document.createElement("div");t.className="search-category-header",t.textContent=o.categoryName,D.appendChild(t),o.terms.forEach(s=>{const a=ut(s);D.appendChild(a)})})}lt&&lt.addEventListener("click",()=>{ge(),i.trackEvent("dict_contribute_click"),ae.classList.remove("hidden")});const ve=document.getElementById("custom-category-dropdown"),pt=document.getElementById("dropdown-trigger"),O=document.getElementById("dropdown-menu"),Te=document.querySelector(".dropdown-value");let V=null;pt&&pt.addEventListener("click",e=>{e.stopPropagation(),ve.classList.toggle("open"),O.classList.toggle("hidden")}),document.addEventListener("click",e=>{ve&&!ve.contains(e.target)&&(ve.classList.remove("open"),O==null||O.classList.add("hidden"))}),re&&re.addEventListener("click",e=>{e.target.classList.contains("pill")&&(re.querySelectorAll(".pill").forEach(o=>o.classList.remove("active")),e.target.classList.add("active"))});function $e(){if(!O)return;O.innerHTML="",x.getAllCategories().forEach(t=>{const s=document.createElement("div");s.className="dropdown-item",s.dataset.categoryId=t.id,s.textContent=t.name,t.id===V&&s.classList.add("selected"),O.appendChild(s)});const o=document.createElement("div");o.className="dropdown-item new-category-btn",o.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Category
        `,O.appendChild(o)}O&&O.addEventListener("click",e=>{const o=e.target.closest(".dropdown-item");if(o){if(o.classList.contains("new-category-btn"))Te.textContent="New Category",V=null,Q.classList.remove("hidden"),Q.focus();else{const t=o.dataset.categoryId,s=o.textContent;O.querySelectorAll(".dropdown-item").forEach(a=>a.classList.remove("selected")),o.classList.add("selected"),Te.textContent=s,V=t,Q.classList.add("hidden")}ve.classList.remove("open"),O.classList.add("hidden")}}),Le&&Le.addEventListener("click",()=>{const e=document.getElementById("contrib-username").value.trim()||"Anonymous",o=document.getElementById("contrib-term-name").value.trim(),t=document.getElementById("contrib-definition").value.trim(),s=document.getElementById("contrib-examples").value.trim(),a=re.querySelector(".pill.active"),d=a?a.dataset.value:"beginner";if(!o||!t){showToast("Fields Required","Please fill in both the term name and its definition.","warning");return}const l=s?s.split(",").map(m=>m.trim()):[];if(xe&&de){const m={name:o,definition:t,difficulty:d,examples:l,author:e.replace("@","")};x.editTerm(de,xe,m)&&(F===de&&pe(de),ge(),ae.classList.add("hidden"))}else{let m;if(!V&&!Q.classList.contains("hidden")){const g=Q.value.trim();if(!g){showToast("Category Name Required","Please enter a name for the new category.","warning");return}m="user_"+g.toLowerCase().replace(/\s+/g,"_"),x.addCategory({id:m,name:g,author:e,terms:[]}),Re(),$e()}else if(V)m=V;else{showToast("Category Selection Required","Please select a category from the dropdown.","warning");return}const v={id:"user_"+Date.now(),name:o,definition:t,difficulty:d,examples:l,author:e.replace("@",""),likes:0};x.addTerm(m,v),F===m&&pe(m),ge(),ae.classList.add("hidden")}});function ge(){xe=null,de=null,document.querySelector(".modal-header h3").textContent="Contribute a Term",Le.textContent="Submit Term",document.getElementById("contrib-username").value="",document.getElementById("contrib-term-name").value="",document.getElementById("contrib-definition").value="",document.getElementById("contrib-examples").value="",Q.value="",Q.classList.add("hidden"),V=null,Te.textContent="Select a category",re.querySelectorAll(".pill").forEach(e=>e.classList.remove("active"))}ct&&ct.addEventListener("click",()=>{ge(),ae.classList.add("hidden")}),mt&&mt.addEventListener("click",()=>{ge(),ae.classList.add("hidden")});function je(){if(!jt)return;const e=P.getConfiguredProviders();dt.forEach(s=>{const a=s.dataset.provider,d=s.querySelector(".provider-setup-status"),l=s.querySelector(".setup-key-btn");e.includes(a)?(d.textContent="CONFIGURED",d.classList.add("configured"),l.textContent="Update Key"):(d.textContent="NOT CONFIGURED",d.classList.remove("configured"),l.textContent="Setup API Key")}),st&&(st.style.display=e.length>0?"flex":"none");const o=P.getUsageStats(),t=Object.keys(o).length>0;if(ne==null||ne.classList.toggle("hidden",!t),t&&ne){const s=ne.querySelector(".usage-stats-grid"),a=ne.querySelector(".usage-total-tokens");s.innerHTML="";let d=0;for(const[l,m]of Object.entries(o)){d+=m.requestCount;const v=m.lastUsed?new Date(m.lastUsed).toLocaleDateString():"Never",g=document.createElement("div");g.className="stat-box",g.innerHTML=`
                    <div class="stat-header">
                        <div class="stat-provider">${P.providers[l].name}</div>
                        <div class="stat-indicator"></div>
                    </div>
                    <div class="stat-main">
                        <div class="stat-value">${m.requestCount}<span class="stat-unit">Requests</span></div>
                    </div>
                    <div class="stat-footer">
                        <div class="stat-info">
                            <span>Active Model</span>
                            <span>${m.model||"Default"}</span>
                        </div>
                        <div class="stat-info">
                            <span>Last Used</span>
                            <span>${v}</span>
                        </div>
                    </div>
                `,s.appendChild(g)}a&&(a.textContent=`Total Requests: ${d}`)}}function Kt(e){ue=e;const o=P.providers[e];document.getElementById("modal-provider-name").textContent=`Configure ${o.name}`,He.value=P.getProviderKey(e)||"";const t=document.querySelector("#llm-provider-dropdown .dropdown-value");t&&(t.textContent=o.name),document.querySelectorAll("#llm-provider-dropdown .dropdown-item").forEach(d=>{d.classList.toggle("selected",d.dataset.providerId===e)}),X.classList.add("hidden"),X.classList.remove("success","error");const s=document.getElementById("provider-api-key");s.type="password";const a=document.getElementById("toggle-api-key");a&&(a.querySelector(".eye-icon").classList.remove("hidden"),a.querySelector(".eye-off-icon").classList.add("hidden")),document.getElementById("custom-model-group").classList.add("hidden"),document.getElementById("custom-model-id").value="",vt(e),ke.classList.remove("hidden")}function vt(e){const o=document.getElementById("model-dropdown-menu"),t=document.querySelector("#llm-model-dropdown .dropdown-value"),s=document.getElementById("custom-model-group"),a=document.getElementById("custom-model-id"),d=P.providers[e],l=P.config[e],m=(l==null?void 0:l.model)||d.models[0].id,v=d.models.some(f=>f.id===m);o.innerHTML="",d.models.forEach(f=>{const S=document.createElement("div");S.className="dropdown-item",f.id===m&&(S.classList.add("selected"),t.textContent=f.name,Z=f.id),S.textContent=f.name,S.dataset.modelId=f.id,S.addEventListener("click",()=>{o.querySelectorAll(".dropdown-item").forEach(C=>C.classList.remove("selected")),S.classList.add("selected"),t.textContent=f.name,Z=f.id,s.classList.add("hidden"),document.getElementById("model-dropdown-menu").classList.add("hidden"),document.getElementById("llm-model-dropdown").classList.remove("open")}),o.appendChild(S)});const g=document.createElement("div");g.className="dropdown-item",g.textContent="Custom Model",g.dataset.modelId="custom",v||(g.classList.add("selected"),t.textContent="Custom Model",Z="custom",s.classList.remove("hidden"),a.value=m),g.addEventListener("click",()=>{o.querySelectorAll(".dropdown-item").forEach(f=>f.classList.remove("selected")),g.classList.add("selected"),t.textContent="Custom Model",Z="custom",s.classList.remove("hidden"),a.focus(),document.getElementById("model-dropdown-menu").classList.add("hidden"),document.getElementById("llm-model-dropdown").classList.remove("open")}),o.appendChild(g)}dt.forEach(e=>{e.querySelector(".setup-key-btn").addEventListener("click",()=>{Kt(e.dataset.provider)})}),nt&&nt.addEventListener("click",()=>ke.classList.add("hidden")),at&&at.addEventListener("click",()=>ke.classList.add("hidden")),rt&&rt.addEventListener("click",async()=>{const e=He.value.trim();let o=Z;if(!e){showToast("Input Required","Please enter an API key","warning");return}if(Z==="custom"){const s=document.getElementById("custom-model-id").value.trim();if(!s){showToast("Input Required","Please enter a custom model ID","warning");return}o=s}X.classList.remove("hidden"),X.innerHTML='<div class="loader-small"></div><span>Validating key...</span>';const t=await P.validateKey(ue,e);X.innerHTML=`<span>${t.message}</span>`,X.classList.replace("hidden",t.valid?"success":"error"),t.valid||X.classList.add("error"),i.trackEvent("llm_setup_attempt",{provider:ue,success:t.valid,model_type:Z==="custom"?"custom":"preset"}),t.valid&&(await P.setProviderKey(ue,e,o),setTimeout(()=>{ke.classList.add("hidden"),je()},1e3))});const Ge=[{triggerId:"provider-dropdown-trigger",menuId:"provider-dropdown-menu",wrapperId:"llm-provider-dropdown"},{triggerId:"model-dropdown-trigger",menuId:"model-dropdown-menu",wrapperId:"llm-model-dropdown"}];Ge.forEach(e=>{const o=document.getElementById(e.triggerId);o&&o.addEventListener("click",t=>{t.stopPropagation(),Ge.forEach(s=>{if(s.triggerId!==e.triggerId){const a=document.getElementById(s.menuId),d=document.getElementById(s.wrapperId);a&&a.classList.add("hidden"),d&&d.classList.remove("open")}}),document.getElementById(e.wrapperId).classList.toggle("open"),document.getElementById(e.menuId).classList.toggle("hidden")})}),document.querySelectorAll("#llm-provider-dropdown .dropdown-item").forEach(e=>{e.addEventListener("click",()=>{const o=e.dataset.providerId,t=e.textContent;document.querySelector("#llm-provider-dropdown .dropdown-value").textContent=t,document.querySelectorAll("#llm-provider-dropdown .dropdown-item").forEach(s=>s.classList.remove("selected")),e.classList.add("selected"),ue=o,He.value=P.getProviderKey(o)||"",vt(o),document.getElementById("provider-dropdown-menu").classList.add("hidden"),document.getElementById("llm-provider-dropdown").classList.remove("open")})}),document.addEventListener("click",()=>{Ge.forEach(e=>{const o=document.getElementById(e.menuId),t=document.getElementById(e.wrapperId);o&&o.classList.add("hidden"),t&&t.classList.remove("open")})}),window.showToast=function(e,o,t="info",s=5e3){const a=document.getElementById("toast-container");if(!a)return;const d=document.createElement("div");d.className=`toast ${t}`;const l=t==="success"?'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';d.innerHTML=`
            <div class="toast-icon">${l}</div>
            <div class="toast-content">
                <div class="toast-title">${e}</div>
                <div class="toast-message">${o}</div>
            </div>
        `,a.appendChild(d),setTimeout(()=>{d.classList.add("hiding"),setTimeout(()=>d.remove(),300)},s)};const K=new Map;function De(e,o,t=!1){if(!K.has(e)||t)K.set(e,{stack:[o],index:0});else{const s=K.get(e);s.index<s.stack.length-1&&(s.stack=s.stack.slice(0,s.index+1)),o!==s.stack[s.index]&&(s.stack.push(o),s.index++)}Ae(e)}function Ae(e){const o=K.get(e);if(!o)return;const t=e.querySelector(".scene-undo-btn"),s=e.querySelector(".scene-redo-btn");t&&t.classList.toggle("hidden",o.index<=0),s&&s.classList.toggle("hidden",o.index>=o.stack.length-1)}n.addEventListener("input",e=>{if(e.target.classList.contains("scene-description")){const o=e.target.closest(".scene-item"),t=K.get(o);t?(t.stack[t.index]=e.target.value,t.index<t.stack.length-1&&(t.stack=t.stack.slice(0,t.index+1)),Ae(o)):De(o,e.target.value,!0)}}),n&&n.addEventListener("click",async e=>{const o=e.target.closest(".scene-undo-btn");if(o){const v=o.closest(".scene-item"),g=K.get(v);if(g&&g.index>0){g.index--;const f=v.querySelector(".scene-description");f.value=g.stack[g.index],Ae(v),showToast("Undo","Reverted to previous version","info"),i.trackEvent("undo_enhance")}return}const t=e.target.closest(".scene-redo-btn");if(t){const v=t.closest(".scene-item"),g=K.get(v);if(g&&g.index<g.stack.length-1){g.index++;const f=v.querySelector(".scene-description");f.value=g.stack[g.index],Ae(v),showToast("Redo","Restored next version","info"),i.trackEvent("redo_enhance")}return}const s=e.target.closest(".scene-enhance-btn");if(!s)return;const a=s.closest(".scene-item");if(!a)return;const d=a.querySelector(".scene-description"),l=P.getConfiguredProviders();if(l.length===0){showToast("Configuration Required","Please configure an AI provider in the integration hub first.","warning");return}const m=l[0];s.classList.add("loading"),s.disabled=!0;try{const v=d.value.trim(),g=a.querySelector(".scene-camera-value").value,f=a.querySelector(".scene-lighting-value").value,S=a.querySelector(".scene-negative-prompt").value.trim();if(!v){showToast("Description Required","Please describe the scene before enhancing.","warning");return}K.has(a)||De(a,v,!0);const C={description:v,camera:g||"",lighting:f||"",negative_prompt:S||""},H=B.getParams().platform_preset,R=B.modelService.getProfile(H),U=await P.generatePrompt(m,C,{modelProfile:R});d.value=U,i.trackEnhance(v.length,U.length),De(a,U),showToast("Scene Enhanced","AI version added to history stack!","success")}catch(v){console.error("Enhance Error:",v);let g="AI Enhancement Failed",f=v.message;(v.message.toLowerCase().includes("quota")||v.message.toLowerCase().includes("rate limit"))&&(g="Quota Exceeded",f="Wait a moment or switch to Gemini 1.5 Flash."),showToast(g,f,"error")}finally{s.classList.remove("loading"),s.disabled=!1}});const gt=document.getElementById("history-section-list"),he=document.getElementById("history-section-preview-code"),ye=document.getElementById("history-section-preview-actions");let ee=null;document.querySelectorAll(".history-tab").forEach(e=>{e.addEventListener("click",()=>{var t,s;document.querySelectorAll(".history-tab").forEach(a=>a.classList.remove("active")),e.classList.add("active");const o=e.dataset.tab;e.parentElement.setAttribute("data-active-tab",o),(t=document.getElementById("history-panel-json"))==null||t.classList.toggle("hidden",o!=="json"),(s=document.getElementById("history-panel-ai"))==null||s.classList.toggle("hidden",o!=="ai"),o==="json"&&z("section"),o==="ai"&&(q==null||q()),window.historySidebarController&&(window.historySidebarController.closeSection(),window.historySidebarController.closeAi())})}),(bt=document.querySelector('[data-section="history-section"]'))==null||bt.addEventListener("click",()=>{z("section")});const zt=()=>{window.confirm("Are you sure you want to clear all history?")&&(Y.clear(),i.trackEvent("history_clear_all"),z("section"),he&&(he.textContent="History cleared."),ye&&ye.classList.add("hidden"),showToast("History Cleared","All recorded versions have been removed.","info"))};(St=document.getElementById("history-section-clear-btn"))==null||St.addEventListener("click",zt);const Yt=()=>{var e;ee&&(h.value=JSON.stringify(ee.content,null,2),i.trackEvent("history_restore_item",{item_id:ee.id}),(e=document.querySelector('[data-section="generator-section"]'))==null||e.click(),document.getElementById("output-section").classList.remove("hidden"),document.getElementById("output-section").scrollIntoView({behavior:"smooth",block:"start"}),showToast("Restored","Version loaded into output editor.","success"))};(Et=document.getElementById("history-section-restore-btn"))==null||Et.addEventListener("click",Yt);function z(e){const o=Y.getAll(),t=gt;if(t){if(t.innerHTML="",o.length===0){t.innerHTML='<div class="empty-state" style="padding: 20px; font-size: 0.85rem;">No history found.</div>';return}o.forEach(s=>{const a=document.createElement("div");a.className="history-item",a.dataset.id=s.id;const d=new Date(s.timestamp),l=d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),m=d.toLocaleDateString(),v=s.mode==="ai"?"badge-ai":"badge-json",g=s.mode==="ai"?"AI":"JSON";a.innerHTML=`
                <div class="history-item-top">
                    <div class="history-summary">${s.summary||"Generated Prompt"}</div>
                    <span class="history-badge ${v}">${g}</span>
                </div>
                <div class="history-item-bottom">
                    <div class="history-date">${m} ${l}</div>
                    <button class="history-delete-btn" title="Delete Version">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `,a.querySelector(".history-delete-btn").addEventListener("click",S=>{S.stopPropagation(),confirm("Delete this version history?")&&(Y.delete(s.id),z("modal"),z("section"),ee&&ee.id===s.id&&(ee=null,modalActions&&modalActions.classList.add("hidden"),ye&&ye.classList.add("hidden"),modalPreview&&(modalPreview.innerHTML='<div class="placeholder-content">Select an item from the sidebar...</div>'),he&&(he.innerHTML='<div class="placeholder-content">Select an item from the sidebar...</div>')))}),a.addEventListener("click",()=>Wt(s,a,e)),t.appendChild(a)})}}function Wt(e,o,t){const s=t==="modal"?modalList:gt;s==null||s.querySelectorAll(".history-item").forEach(l=>l.classList.remove("active")),o.classList.add("active"),ee=e;const a=t==="modal"?modalPreview:he,d=t==="modal"?modalActions:ye;d&&d.classList.remove("hidden"),a&&(a.textContent=JSON.stringify(e.content,null,2)),window.historySidebarController&&(t==="modal"?window.historySidebarController.close():window.historySidebarController.closeSection())}window.renderHistoryView=z;const ht=document.getElementById("save-as-template"),yt=document.getElementById("open-template-gallery");ht&&ht.addEventListener("click",()=>{const e=[];n.querySelectorAll(".scene-item").forEach(s=>{var S,C,H,R,U,Be;const a=s.querySelector(".scene-description").value,d=((S=s.querySelector(".scene-camera-input"))==null?void 0:S.value)||"",l=((C=s.querySelector(".scene-lighting-input"))==null?void 0:C.value)||"",m=((H=s.querySelector(".scene-color-input"))==null?void 0:H.value)||"",v=((R=s.querySelector(".scene-mood-input"))==null?void 0:R.value)||"",g=((U=s.querySelector(".scene-sound-input"))==null?void 0:U.value)||"",f=((Be=s.querySelector(".scene-negative-prompt"))==null?void 0:Be.value)||"";e.push({description:a,camera:d,lighting:l,color:m,mood:v,sound:g,customNegative:f})});const t={scenes:e,globalParams:B.getParams()};window.templateUI?window.templateUI.openSaveModal(t):console.error("TemplateUI not found")}),yt&&yt.addEventListener("click",()=>{window.templateUI&&window.templateUI.openGallery()}),window.addEventListener("apply-template",e=>{const o=e.detail;!o||!o.scenes||confirm("Apply this template? Current scenes will be replaced.")&&(n.querySelectorAll(".scene-item").forEach(s=>s.remove()),ie=0,o.scenes.forEach(s=>{r.click();const a=n.lastElementChild;a&&(a.querySelector(".scene-description").value=s.description||"",a.querySelector(".scene-camera-input").value=s.camera||"",a.querySelector(".scene-lighting-input").value=s.lighting||"",a.querySelector(".scene-color-input").value=s.color||"",a.querySelector(".scene-mood-input").value=s.mood||"",a.querySelector(".scene-sound-input").value=s.sound||"",a.querySelector(".scene-negative-prompt").value=s.customNegative||"")}),o.globalParams&&(["aspect_ratio","resolution","frame_rate","platform_preset"].forEach(s=>{o.globalParams[s]&&B.updateParam(s,o.globalParams[s])}),ce()),showToast("Template Applied","Configuration loaded successfully.","success"))})});

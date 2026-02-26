const fs = require('fs');
const lines = fs.readFileSync('d:/JSON Prompt Gen/app.html', 'utf8').split(/\r?\n/);
const newLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<div class="scene-item" data-scene-id="1">')) {
        skip = true;
        newLines.push('                        <scene-control-panel scene-id="1"></scene-control-panel>');
    }

    if (skip && line.includes('<div class="add-scene-area">')) {
        skip = false;
        newLines.push('                    </div>');
        newLines.push('');
    }

    if (!skip) {
        newLines.push(line);
    }
}
fs.writeFileSync('d:/JSON Prompt Gen/app.html', newLines.join('\n'), 'utf8');
console.log("Done");

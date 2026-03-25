const fs = require('fs');

const userHtml = fs.readFileSync('user_cinematic.html', 'utf8');

// Extract style block
const styleMatch = userHtml.match(/<style>([\s\S]*?)<\/style>/);
const newStyle = styleMatch ? styleMatch[0] : '';

// Extract animation container
const animMatch = userHtml.match(/<div class="animation-container" id="animContainer">([\s\S]*?)<\/div>\s*<script>/);
// Need to only get the div, the regex above matches everything up to the script tag.
const newAnim = animMatch ? '<div class="animation-container" id="animContainer">' + animMatch[1] : '';

// Extract script block
const scriptMatch = userHtml.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
const newScript = scriptMatch ? '<script>' + scriptMatch[1] + '</script>' : '';

function updateIndexHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace <style> block that contains cinematic
    content = content.replace(/<style>\s*\/\* --- CINEMATIC BACKGROUND INTEGRATION --- \*\/([\s\S]*?)<\/style>/, newStyle);

    // Replace animation container
    content = content.replace(/<div class="animation-container" id="animContainer">([\s\S]*?)(?=<!-- ══════ NAVBAR ══════ -->)/, newAnim + '\n\n');

    // Replace script block at the bottom
    content = content.replace(/<script>\s*\/\* =========================================\s*CINEMATIC PARTICLE ENGINE([\s\S]*?)<\/script>\s*(?=<\/body>)/, newScript + '\n');

    fs.writeFileSync(filePath, content, 'utf8');
}

updateIndexHtml('index.html');
console.log('Update complete for index.html.');

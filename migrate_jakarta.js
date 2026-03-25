const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.java')) {
            results.push(file);
        }
    });
    return results;
}

const javaFiles = walk('src/main/java/com/apcars');

let count = 0;
javaFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('javax.')) {
        content = content.replace(/javax\./g, 'jakarta.');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log(`Migrated javax. to jakarta. in ${count} files.`);

const fs = require('fs');

const content = fs.readFileSync('src/data/courses/piad-221.ts', 'utf8');
let braces = 0;
let brackets = 0;

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // ignore inside strings for a rough estimate
    // just count { } [ ]
    for(let char of line) {
        if(char === '{') braces++;
        if(char === '}') braces--;
        if(char === '[') brackets++;
        if(char === ']') brackets--;
    }
    if (braces < 0) {
        console.log(\Negative braces at line \: \\);
        break;
    }
    if (brackets < 0) {
        console.log(\Negative brackets at line \: \\);
        break;
    }
}
console.log('Final braces:', braces);
console.log('Final brackets:', brackets);

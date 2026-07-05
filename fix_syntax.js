const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /        \}-\$\{tCode\}\`\)\) return true;\s*\}\s*return false;\s*\}/g,
    `        }`
);

fs.writeFileSync('CHICri_testeIA.html', code);

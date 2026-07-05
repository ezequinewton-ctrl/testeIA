const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /if\(p && p\.restricoes\.includes\(\`\$\{d\}-\$\{tr\.id\}\`\)\) \{/g,
    `if(p && p.restricoes.includes(\`\${d}-\${tr.id}-\${h}\`)) {`
);

fs.writeFileSync('CHICri_testeIA.html', code);

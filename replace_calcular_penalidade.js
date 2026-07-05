const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /if\(p && p\.restricoes && p\.restricoes\.includes\(\`\$\{d\}-\$\{trId\}\`\)\) pen \+= pesoRestricao\('restricao'\);\s*if\(p && p\.evitar && p\.evitar\.includes\(\`\$\{d\}-\$\{trId\}\`\)\) pen \+= pesoRestricao\('evitar'\);/g,
    `if(p && p.restricoes && p.restricoes.includes(\`\${d}-\${trId}-\${hr}\`)) pen += pesoRestricao('restricao');
                                if(p && p.evitar && p.evitar.includes(\`\${d}-\${trId}-\${hr}\`)) pen += pesoRestricao('evitar');`
);

fs.writeFileSync('CHICri_testeIA.html', code);

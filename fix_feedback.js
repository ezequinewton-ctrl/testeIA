const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// Fix professoresLivresSlotIndexado
code = code.replace(
    /if\(p\.restricoes && p\.restricoes\.includes\(\`\$\{d\}-\$\{tCode\}\`\)\) return false;/g,
    `if(p.restricoes && p.restricoes.includes(\`\${d}-\${tCode}-\${h}\`)) return false;`
);

// Fix pontuarSlotIndexado
code = code.replace(
    /if\(params\.some\(p => temEvitar\(p\.pids, s\.d, s\.t\)\)\) score \+= pesoRestricao\('evitar'\) \* 10;/g,
    `if(params.some(p => temEvitar(p.pids, s.d, s.t, s.h))) score += pesoRestricao('evitar') * 10;`
);

// Fix renderGradesProfessores
code = code.replace(
    /let isRestrito = px\.restricoes && px\.restricoes\.includes\(\`\$\{dx\}-\$\{tr\.id\}\`\);\s*let isEvitar = px\.evitar && px\.evitar\.includes\(\`\$\{dx\}-\$\{tr\.id\}\`\);/g,
    `let isRestrito = px.restricoes && px.restricoes.includes(\`\${dx}-\${tr.id}-\${hr}\`);
                            let isEvitar = px.evitar && px.evitar.includes(\`\${dx}-\${tr.id}-\${hr}\`);`
);

fs.writeFileSync('CHICri_testeIA.html', code);

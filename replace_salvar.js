const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /DIAS\.forEach\(\(dayName,d\)=>TURNOS\.forEach\(t=>\{const el=document\.getElementById\(\`cell-res-\$\{d\}-\$\{t\.id\}\`\);if\(el\)\{const s=parseInt\(el\.dataset\.state\);if\(s===1\)r\.push\(\`\$\{d\}-\$\{t\.id\}\`\);if\(s===2\)e\.push\(\`\$\{d\}-\$\{t\.id\}\`\)\}\}\)\);/,
    `DIAS.forEach((dayName,d)=>TURNOS.forEach(t=>{HORARIOS.forEach(h=>{const el=document.getElementById(\`cell-res-\${d}-\${t.id}-\${h}\`);if(el){const s=parseInt(el.dataset.state);if(s===1)r.push(\`\${d}-\${t.id}-\${h}\`);if(s===2)e.push(\`\${d}-\${t.id}-\${h}\`)}})}))`
);

fs.writeFileSync('CHICri_testeIA.html', code);

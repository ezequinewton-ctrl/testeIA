const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /return String\(pidStr\|\|''\)\.split\(','\)\.filter\(Boolean\)\.map\(pid=>prof\.find\(x=>x\.id==pid\)\)\.filter\(p=>p && p\.restricoes\.includes\(\`\$\{d\}-\$\{tCode\}-\$\{h\}\`\)\);\s*\}\-\$\{tCode\}\`\)\);\s*\}\s*function temRestricaoIgnoradaAlocacao\(aloc, d, tCode\) \{/g,
    `return String(pidStr||'').split(',').filter(Boolean).map(pid=>prof.find(x=>x.id==pid)).filter(p=>p && p.restricoes.includes(\`\${d}-\${tCode}-\${h}\`));
        }

        function temRestricaoIgnoradaAlocacao(aloc, d, tCode, h) {`
);

fs.writeFileSync('CHICri_testeIA.html', code);

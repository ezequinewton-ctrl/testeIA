const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// Update restricoesIgnoradas signature and body
code = code.replace(
    /function restricoesIgnoradas\(pidStr, d, tCode\) \{([\s\S]*?)\}/,
    `function restricoesIgnoradas(pidStr, d, tCode, h) {
            return String(pidStr||'').split(',').filter(Boolean).map(pid=>prof.find(x=>x.id==pid)).filter(p=>p && p.restricoes.includes(\`\${d}-\${tCode}-\${h}\`));
        }`
);

// Update calls to restricoesIgnoradas
code = code.replace(/restricoesIgnoradas\(aloc\.split\('\|'\)\[0\], d, tCode\)/g, "restricoesIgnoradas(aloc.split('|')[0], d, tCode, h)");
code = code.replace(/const restritos = restricoesIgnoradas\(pidsVinculados,dx,tr\.id\);/g, "const restritos = restricoesIgnoradas(pidsVinculados,dx,tr.id,hr);");
code = code.replace(/const isRestrito = restricoesIgnoradas\(pid, dx, tr\.id\)\.length > 0;/g, "const isRestrito = restricoesIgnoradas(pid, dx, tr.id, hr).length > 0;");
code = code.replace(/const ignoradas = restricoesIgnoradas\(aloc\.split\('\|'\)\[0\], d, trId\);/g, "const ignoradas = restricoesIgnoradas(aloc.split('|')[0], d, trId, hr);");

// Update temEvitar signature and body
code = code.replace(
    /function temEvitar\(pidStr, d, tCode\) \{([\s\S]*?)\}/,
    `function temEvitar(pidStr, d, tCode, h) {
            for(let pid of String(pidStr).split(',').filter(Boolean)){
                const p = prof.find(x=>x.id==pid);
                if(p && p.evitar && p.evitar.includes(\`\${d}-\${tCode}-\${h}\`)) return true;
            }
            return false;
        }`
);

// Update calls to temEvitar
code = code.replace(/const isEvitar = temEvitar\(pid, dx, tr\.id\);/g, "const isEvitar = temEvitar(pid, dx, tr.id, hr);");
code = code.replace(/let ev = params\.some\(p => temEvitar\(p\.pids, s\.d, s\.t\)\);/g, "let ev = params.some(p => temEvitar(p.pids, s.d, s.t, s.h));");
code = code.replace(/const evita = params\.some\(p => temEvitar\(p\.pids, d, tr\.id\)\);/g, "const evita = params.some(p => temEvitar(p.pids, d, tr.id, h));");
code = code.replace(/evita: params\.some\(p=>temEvitar\(p\.pids, d, tr\.id\)\),/g, "evita: params.some(p=>temEvitar(p.pids, d, tr.id, h)),");

// Update verificarConflitoHard
code = code.replace(
    /if\(p\.restricoes\.includes\(\`\$\{d\}-\$\{tCode\}\`\)\) return \`Prof\. \$\{p\.nome\} Bloqueado nesse horário\`;/g,
    `if(p.restricoes.includes(\`\${d}-\${tCode}-\${h}\`)) return \`Prof. \${p.nome} Bloqueado nesse horário\`;`
);

// Update verificarConflitoHardInterno
code = code.replace(
    /if\(p\.restricoes\.includes\(\`\$\{d\}-\$\{tCode\}\`\)\) return true;/g,
    `if(p.restricoes.includes(\`\${d}-\${tCode}-\${h}\`)) return true;`
);

fs.writeFileSync('CHICri_testeIA.html', code);

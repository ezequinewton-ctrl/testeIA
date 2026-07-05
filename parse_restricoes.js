const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// Add parseRestricoes and formatRestricoes
const helpers = `
        function formatRestricoes(restricoes) {
            if (!restricoes) return '';
            const map = {};
            restricoes.forEach(r => {
                const parts = r.split('-');
                if (parts.length === 3) {
                    const key = parts[0] + '-' + parts[1];
                    if (!map[key]) map[key] = [];
                    if (!map[key].includes(parts[2])) map[key].push(parts[2]);
                } else if (parts.length === 2) {
                    const key = r;
                    if (!map[key]) map[key] = [];
                    for(let h=1; h<=NUM_AULAS; h++) if (!map[key].includes(String(h))) map[key].push(String(h));
                }
            });
            return Object.keys(map).map(k => {
                map[k].sort((a,b) => parseInt(a) - parseInt(b));
                return k + map[k].join('');
            }).join('|');
        }

        function parseRestricoes(str) {
            if (!str) return [];
            const res = [];
            str.split('|').map(x => x.trim()).filter(Boolean).forEach(r => {
                const match = r.match(/^(\\d+)-([MTN])(\\d*)$/);
                if (match) {
                    const d = match[1];
                    const t = match[2];
                    const hours = match[3];
                    if (hours) {
                        hours.split('').forEach(h => res.push(\`\${d}-\${t}-\${h}\`));
                    } else {
                        // Old format (e.g., "1-M") without hours, will be expanded by migrar or here
                        res.push(r);
                    }
                }
            });
            return res;
        }
`;

code = code.replace(/function exportarCRICAtual\(\) \{/, helpers + '\n        function exportarCRICAtual() {');

// Update exportarCRIC
code = code.replace(
    /prof\.forEach\(p=>cric\+=\`PROF§\$\{p\.nome\}§\$\{p\.disciplinas\.join\('\\\|'\)\}§\$\{p\.restricoes\.join\('\\\|'\)\}§\$\{p\.evitar\.join\('\\\|'\)\}§\$\{p\.semRestricao\?'semRestricao':''\}§§\\n\`\);/,
    `prof.forEach(p=>cric+=\`PROF§\${p.nome}§\${p.disciplinas.join('|')}§\${formatRestricoes(p.restricoes)}§\${formatRestricoes(p.evitar)}§\${p.semRestricao?'semRestricao':''}§§\\n\`);`
);

// Update executarProcessamentoCRIC (import)
code = code.replace(
    /const rests = c\[3\] \? c\[3\]\.split\('\\\|'\)\.map\(x => x\.trim\(\)\)\.filter\(Boolean\) : \[\];/,
    `const rests = parseRestricoes(c[3]);`
);
code = code.replace(
    /const evits = c\[4\] \? c\[4\]\.split\('\\\|'\)\.map\(x => x\.trim\(\)\)\.filter\(Boolean\) : \[\];/,
    `const evits = parseRestricoes(c[4]);`
);

fs.writeFileSync('CHICri_testeIA.html', code);

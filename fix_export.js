const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /prof\.forEach\(p=>cric\+=\`PROF§\$\{p\.nome\}§\$\{p\.disciplinas\.join\('\\\|'\)\}§\$\{p\.restricoes\.join\('\\\|'\)\}§\$\{p\.evitar\.join\('\\\|'\)\}§\$\{p\.semRestricao\?'semRestricao':''\}§§\\n\`\);/,
    `prof.forEach(p=>cric+=\`PROF§\${p.nome}§\${p.disciplinas.join('|')}§\${formatRestricoes(p.restricoes)}§\${formatRestricoes(p.evitar)}§\${p.semRestricao?'semRestricao':''}§§\\n\`);`
);

fs.writeFileSync('CHICri_testeIA.html', code);

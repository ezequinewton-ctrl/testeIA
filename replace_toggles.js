const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

code = code.replace(
    /function toggleRestricao\(d,t\)\{const e=document.getElementById\(\`cell-res-\$\{d\}-\$\{t\}\`\);let s=\(parseInt\(e.dataset.state\)\+1\)%3;e.dataset.state=s;e.className=\`restricao-cell w-full h-6 rounded flex items-center justify-center font-bold cursor-pointer \$\{s===0\?'res-livre':s===1\?'res-block':'res-evitar'\}\`;e.firstChild.className=s===0\?"fas fa-check text-\[8px\] opacity-0":s===1\?"fas fa-times text-xs":"fas fa-exclamation text-xs";\}/,
    `function toggleRestricao(d,t,h){const e=document.getElementById(\`cell-res-\${d}-\${t}-\${h}\`);let s=(parseInt(e.dataset.state)+1)%3;e.dataset.state=s;e.className=\`restricao-cell res-\${s===0?'livre':s===1?'block':'evitar'} w-full h-4 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]\`;}`
);

code = code.replace(
    /function setRestricaoState\(d,t,s\)\{const e=document.getElementById\(\`cell-res-\$\{d\}-\$\{t\}\`\);if\(e\)\{e.dataset.state=\(s\+2\)%3;toggleRestricao\(d,t\);\}/,
    `function setRestricaoState(d,t,h,s){const e=document.getElementById(\`cell-res-\${d}-\${t}-\${h}\`);if(e){e.dataset.state=(s+2)%3;toggleRestricao(d,t,h);}`
);

fs.writeFileSync('CHICri_testeIA.html', code);

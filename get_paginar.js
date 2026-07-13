const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

let funcStart = content.indexOf('function paginarConteudo(html, baixaVisao, fatorZoom)');
console.log(content.substring(funcStart, funcStart + 2000));

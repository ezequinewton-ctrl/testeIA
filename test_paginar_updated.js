const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
console.log(content.includes('Array.from(temporario.children).forEach(function(el)'));

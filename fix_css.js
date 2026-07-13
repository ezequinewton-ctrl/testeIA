const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The prompt mentions "corta a página de introdução e gabarito, e quero que ao ser solicitada a impressão que imprima direto esse segundo monitor"
// and "hoje está cortando demais as margens primeira página de introdução e gabarito"
// In the paginarConteudo, we injected CSS. Let's make sure it handles margins correctly.

content = content.replace(/margin: 0 !important;/g, '');

fs.writeFileSync('index.html', content);

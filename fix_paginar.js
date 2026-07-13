const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The CSS issue: folha-preview has overflow: hidden.
// At @media print, folha-preview has overflow: hidden !important;
// Let's remove overflow: hidden from .folha-preview and .conteudo-folha-preview in the style tag.

content = content.replace(/\.folha-preview \{([^}]+)overflow: hidden;([^}]+)\}/, '.folha-preview {$1$2}');
content = content.replace(/\.conteudo-folha-preview \{([^}]+)overflow: hidden;([^}]+)\}/, '.conteudo-folha-preview {$1$2}');
content = content.replace(/body\.modo-monitor-paginado \.folha-preview \{([^}]+)overflow: hidden !important;([^}]+)\}/, 'body.modo-monitor-paginado .folha-preview {$1$2}');

fs.writeFileSync('index.html', content);
console.log("CSS updated");

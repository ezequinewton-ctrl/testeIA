const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/#visualizadorPaginado \.page, [\s\S]*?padding: 0 !important;\n                \}/, `#visualizadorPaginado .page,
                #visualizadorPaginado .pageCabecalho {
                    min-height: 0 !important;
                    height: 100% !important;
                    box-shadow: none !important;
                    background: transparent !important;
                    padding: inherit;
                }`);

fs.writeFileSync('index.html', content);

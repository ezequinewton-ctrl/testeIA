const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Also update the message listener to handle 'imprimir'
content = content.replace(/if \(\n\t\t\t\tdados\.tipo === 'atualizar_prova' &&\n\t\t\t\tehMonitor2\n\t\t\t\) \{/, `if (dados.tipo === 'imprimir' && ehMonitor2) {
                window.print();
                return;
            }

            if (
				dados.tipo === 'atualizar_prova' &&
				ehMonitor2
			) {`);

// Also update cabecalho class mapping
content = content.replace(/if \(numero === 1\) \{\n\t\t\t\tfolha\.classList\.add\('primeira-folha'\);\n                folha\.classList\.add\('pageCabecalho'\);\n\t\t\t\}/, `if (numero === 1) {
				folha.classList.add('primeira-folha');
                folha.classList.add('pageCabecalho');
			} else {
                folha.classList.add('page');
            }`);

fs.writeFileSync('index.html', content);
console.log("Applied printing message");

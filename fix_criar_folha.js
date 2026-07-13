const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

let replace = `function criarFolha(numero, baixaVisao) {

			const folha = document.createElement('div');

			folha.className = 'folha-preview';

			if (numero === 1) {
				folha.classList.add('primeira-folha');
                folha.classList.add('pageCabecalho');
			} else {
                folha.classList.add('page');
            }

			const conteudo = document.createElement('div');

			conteudo.className = 'conteudo-folha-preview content';

            const section = document.createElement('div');
            section.className = 'section';

            conteudo.appendChild(section);
			folha.appendChild(conteudo);

			return {
				folha: folha,
				conteudo: section,
                folhaContent: conteudo
			};
		}`;

content = content.replace(/function criarFolha\(numero, baixaVisao\) \{[\s\S]*?return \{\n\t\t\t\tfolha: folha,\n\t\t\t\tconteudo: conteudo\n\t\t\t\};\n\t\t\}/, replace);

fs.writeFileSync('index.html', content);
console.log("criarFolha replaced.");

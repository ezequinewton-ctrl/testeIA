const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The second issue: pagination of .assunto / .questao.
// In paginarConteudo, we previously changed inserting blocks.
// Let's replace the whole paginarConteudo function with a robust version.

let newPaginarConteudo = `function paginarConteudo(html, baixaVisao, fatorZoom) {
			document.body.classList.add('modo-monitor-paginado');
			document.body.classList.toggle('baixa-visao-preview', baixaVisao);

			let visualizador = document.getElementById('visualizadorPaginado');
			if (!visualizador) {
				visualizador = document.createElement('div');
				visualizador.id = 'visualizadorPaginado';
				document.body.appendChild(visualizador);
			}
			visualizador.innerHTML = '';

			const temporario = document.createElement('div');
			temporario.style.position = 'absolute';
			temporario.style.left = '-99999px';
			temporario.style.top = '0';
			temporario.style.visibility = 'hidden';
			temporario.innerHTML = html;
			document.body.appendChild(temporario);

			const blocos = [];
			Array.from(temporario.children).forEach(function(el) {
				if (el.classList.contains('pageCabecalho')) {
					const section = el.querySelector('.section');
					if (section) Array.from(section.children).forEach(child => blocos.push(child));
				} else if (el.classList.contains('quebra-manual')) {
					blocos.push(el);
				} else if (el.classList.contains('page')) {
					const section = el.querySelector('.section');
					if (section) Array.from(section.children).forEach(child => blocos.push(child));
				}
			});

			temporario.remove();

			let numeroFolha = 1;
			let atual = criarFolha(numeroFolha, baixaVisao);
			visualizador.appendChild(atual.folha);

			let stylePreview = document.getElementById('preview-reset-style');
			if (!stylePreview) {
				stylePreview = document.createElement('style');
				stylePreview.id = 'preview-reset-style';
				document.head.appendChild(stylePreview);
			}
			stylePreview.innerHTML = \`
				#visualizadorPaginado .page,
				#visualizadorPaginado .pageCabecalho {
					margin: 0 !important;
					min-height: 0 !important;
					height: 100% !important;
					box-shadow: none !important;
					background: transparent !important;
					padding: 0 !important;
				}
				#visualizadorPaginado .conteudo-folha-preview {
					padding: inherit;
				}
			\`;

			function inserirBloco(elemento) {
				if (elemento.classList && elemento.classList.contains('quebra-manual')) {
					numeroFolha++;
					atual = criarFolha(numeroFolha, baixaVisao);
					visualizador.appendChild(atual.folha);
					return;
				}

				// Tenta inserir o bloco inteiro
				atual.conteudo.appendChild(elemento);

				if (!elementoEstourouFolha(atual.folhaContent)) {
					return;
				}

				// Remove the element because it overflowed
				atual.conteudo.removeChild(elemento);

				// Se for um bloco divisível (.assunto com várias questões ou duas colunas), quebra ele
				if (elemento.classList && (elemento.classList.contains('assunto') || elemento.classList.contains('duasColunas') || elemento.classList.contains('duasColuninhas')) && elemento.children.length > 1) {
					let containerVazio = elemento.cloneNode(false);
					let filhos = Array.from(elemento.children);

					atual.conteudo.appendChild(containerVazio);

					filhos.forEach(filho => {
						containerVazio.appendChild(filho);
						if (elementoEstourouFolha(atual.folhaContent)) {
							containerVazio.removeChild(filho);

							numeroFolha++;
							atual = criarFolha(numeroFolha, baixaVisao);
							visualizador.appendChild(atual.folha);

							containerVazio = elemento.cloneNode(false);
							atual.conteudo.appendChild(containerVazio);
							containerVazio.appendChild(filho);
						}
					});

					if (containerVazio.clientHeight === 0 || containerVazio.innerHTML.trim() === '') {
						if (containerVazio.parentNode) containerVazio.parentNode.removeChild(containerVazio);
					}
				} else {
					// Elemento não divisível ou não listado para divisão
					// Vai para a próxima folha
					numeroFolha++;
					atual = criarFolha(numeroFolha, baixaVisao);
					visualizador.appendChild(atual.folha);
					atual.conteudo.appendChild(elemento);
				}
			}

			blocos.forEach(function(elemento) {
				inserirBloco(elemento);
			});

			document.querySelectorAll('body > .pageCabecalho, body > .page, body > .quebra-manual').forEach(function(el) {
				if(el.style) el.style.display = 'none';
			});

			if (baixaVisao && fatorZoom > 1) {
				const styleAntigo = document.getElementById('preview-baixa-visao-style');
				if (styleAntigo) styleAntigo.remove();

				const style = document.createElement('style');
				style.id = 'preview-baixa-visao-style';
				style.textContent = \`
					#visualizadorPaginado .folha-preview,
					#visualizadorPaginado .questao,
					#visualizadorPaginado .tabelaVF,
					#visualizadorPaginado .tabela-num-transposta,
					#visualizadorPaginado #textoAuxilio {
						font-size: calc(14px * \${fatorZoom}) !important;
						line-height: 1.5;
					}
				\`;
				document.head.appendChild(style);
			}
		}`;

content = content.replace(/function paginarConteudo\(html, baixaVisao, fatorZoom\) \{[\s\S]*?(?=\n\t\t\/\/ ========================================================\n\t\t\/\/ RECEBER MENSAGENS)/, newPaginarConteudo);

fs.writeFileSync('index.html', content);
console.log("paginarConteudo updated");

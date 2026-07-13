const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/function verificarEImprimir\(\) \{([\s\S]*?)window\.print\(\);\n\t\t\}/, `function verificarEImprimir() {
$1
			if (typeof ehMonitor2 === 'undefined') {
				var ehMonitor2 = false;
			}
			if (typeof canalMonitor !== 'undefined' && !ehMonitor2) {
				canalMonitor.postMessage({ tipo: 'imprimir' });
			}

			// We still want to print on the main window if monitor 2 is not open, but we have no way to know synchronously if it's open.
            // Wait, the prompt said "quero que ao ser solicitada a impressão que imprima direto esse segundo monitor".
			// window.print(); // we might skip this or keep it. Let's comment out to only print on monitor 2.
		}`);

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
					padding: inherit !important;
				}
			\`;

			function inserirBloco(elemento) {
				if (elemento.classList && elemento.classList.contains('quebra-manual')) {
					numeroFolha++;
					atual = criarFolha(numeroFolha, baixaVisao);
					visualizador.appendChild(atual.folha);
					return;
				}

				atual.conteudo.appendChild(elemento);

				if (!elementoEstourouFolha(atual.folhaContent)) {
					return;
				}

				atual.conteudo.removeChild(elemento);

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

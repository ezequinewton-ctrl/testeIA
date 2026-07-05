const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

const newGrids = `        function renderGridsInit() {
            const diasDefs=[0,1,2,3,4];
            const header = \`<div class="font-bold self-center text-gray-400">T/D</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div>\`;
            let profHtml = header; let turmaHtml = header;

            TURNOS.forEach(t=>{
                profHtml += \`<div class='font-bold self-center'>\${t.id}</div>\`;
                turmaHtml += \`<div class='font-bold self-center'>\${t.id}</div>\`;
                diasDefs.forEach(d=>{
                    let hHtml = \`<div class="flex flex-col gap-0.5 w-full">\`;
                    HORARIOS.forEach(h => {
                        hHtml += \`<div class="restricao-cell res-livre w-full h-4 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]" id="cell-res-\${d}-\${t.id}-\${h}" onclick="toggleRestricao(\${d},'\${t.id}',\${h})" data-state="0" title="Horário \${h}">\${h}</div>\`;
                    });
                    hHtml += \`</div>\`;
                    profHtml += hHtml;
                    turmaHtml += \`<div class="restricao-cell res-active w-full h-6 rounded cursor-pointer flex items-center justify-center font-bold" id="cell-turma-\${d}-\${t.id}" onclick="toggleTurmaTurno(\${d},'\${t.id}')" data-active="true" data-blocked="false"><i class="fas fa-check text-[8px]"></i></div>\`;
                });
            });
            document.getElementById('gridRestricoesProf').innerHTML = profHtml;
            document.getElementById('gridTurnosTurma').innerHTML = turmaHtml;
        }`;

code = code.replace(/function renderGridsInit\(\) \{[\s\S]*?document\.getElementById\('gridTurnosTurma'\)\.innerHTML = turmaHtml;\n        \}/, newGrids);

fs.writeFileSync('CHICri_testeIA.html', code);

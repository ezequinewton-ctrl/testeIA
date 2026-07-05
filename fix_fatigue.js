const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// The requirement is: "evitar apenas os dois últimos da noite e o início da manhã para dias sequenciais"
// (which is already implemented using ultimosNoite and primeirosManha, maybe we just refine them)
// And: "aceite no mesmo dia os do final da manhã e os do início da noite".
// So M and N on the same day is NOT always bad. Only if early morning and late night.

code = code.replace(
    /function violariaTresTurnos\(pid, d, tCode, lista, extras=\[\]\) \{([\s\S]*?)return turnos\.has\('M'\) && turnos\.has\('N'\);\s*\}/,
    `function violariaTresTurnos(pid, d, tCode, lista, extras=[]) {
            // Avoid M and N on the same day ONLY if early M and late N
            const primeirosManha = HORARIOS.filter(h => h <= Math.min(2, NUM_AULAS));
            const ultimosNoite = HORARIOS.filter(h => h >= Math.max(1, NUM_AULAS - 1));

            let temManhaInicial = false;
            let temNoiteFinal = false;

            // Check M
            if (tCode === 'M' && primeirosManha.includes(extras.length ? extras[0].h : 1)) temManhaInicial = true;
            else temManhaInicial = primeirosManha.some(h => professorTemAulaHorario(lista, pid, d, 'M', h, extras));

            // Check N
            if (tCode === 'N' && ultimosNoite.includes(extras.length ? extras[0].h : 1)) temNoiteFinal = true;
            else temNoiteFinal = ultimosNoite.some(h => professorTemAulaHorario(lista, pid, d, 'N', h, extras));

            return temManhaInicial && temNoiteFinal;
        }`
);

code = code.replace(
    /function violariaTresTurnosIndexado\(pid, d, tCode, idx, extras=\[\]\) \{([\s\S]*?)return turnos\.has\('M'\) && turnos\.has\('N'\);\s*\}/,
    `function violariaTresTurnosIndexado(pid, d, tCode, idx, extras=[]) {
            const primeirosManha = HORARIOS.filter(h => h <= Math.min(2, NUM_AULAS));
            const ultimosNoite = HORARIOS.filter(h => h >= Math.max(1, NUM_AULAS - 1));

            let temManhaInicial = false;
            let temNoiteFinal = false;

            if (tCode === 'M' && primeirosManha.includes(extras.length ? extras[0].h : 1)) temManhaInicial = true;
            else temManhaInicial = primeirosManha.some(h => professorTemSlotIndexado(idx, pid, d, 'M', h, extras));

            if (tCode === 'N' && ultimosNoite.includes(extras.length ? extras[0].h : 1)) temNoiteFinal = true;
            else temNoiteFinal = ultimosNoite.some(h => professorTemSlotIndexado(idx, pid, d, 'N', h, extras));

            return temManhaInicial && temNoiteFinal;
        }`
);

// We need to also check the penalties in calcularPenalidade
code = code.replace(
    /if \(temM && temT && temN\) pen \+= pesoRestricao\('tresTurnos'\);\s*else if \(temM && temN\) pen \+= pesoRestricao\('manhaNoiteMesmoDia'\);/g,
    `const primeirosManha = HORARIOS.filter(h => h <= Math.min(2, NUM_AULAS));
                        const ultimosNoite = HORARIOS.filter(h => h >= Math.max(1, NUM_AULAS - 1));
                        let temManhaInicial = primeirosManha.some(h => professorTemAulaHorario(lista, px.id, d, 'M', h, []));
                        let temNoiteFinal = ultimosNoite.some(h => professorTemAulaHorario(lista, px.id, d, 'N', h, []));

                        if (temM && temT && temN) pen += pesoRestricao('tresTurnos');
                        if (temManhaInicial && temNoiteFinal) pen += pesoRestricao('manhaNoiteMesmoDia');`
);

fs.writeFileSync('CHICri_testeIA.html', code);

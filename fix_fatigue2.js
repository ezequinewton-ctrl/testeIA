const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// The original `violariaNoiteManha` already checks exactly this:
// const ultimosNoite = HORARIOS.filter(h => h >= Math.max(1, NUM_AULAS - 1));
// const primeirosManha = HORARIOS.filter(h => h <= Math.min(2, NUM_AULAS));
// It avoids sequential days (d and d+1) with late night (ultimosNoite) and early morning (primeirosManha).
// So `violariaNoiteManha` is actually correct according to the requirement ("evitar apenas os dois últimos da noite e o início da manhã para dias sequenciais").

// Let's verify if `violariaNoiteManhaIndexado` also matches this.
// `violariaNoiteManhaIndexado` is:
// const ultimosNoite = HORARIOS.filter(h => h >= Math.max(1, NUM_AULAS - 1));
// const primeirosManha = HORARIOS.filter(h => h <= Math.min(2, NUM_AULAS));
// ... if(temNoiteFinal && temManhaInicial) return true;
// So they are both already matching the requested rule for sequential days.

// The requested change for "aceite no mesmo dia os do final da manhã e os do início da noite"
// corresponds to the change we just made in `violariaTresTurnos` and `calcularPenalidade`,
// which allows early night and late morning on the same day by ONLY penalizing when it's early morning AND late night on the same day.

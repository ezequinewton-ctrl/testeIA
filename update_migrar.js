const fs = require('fs');
let code = fs.readFileSync('CHICri_testeIA.html', 'utf8');

// 1. Update `migrar` function to convert old professor restrictions (`d-t`) to the new parts-of-shift format (`d-t1`, `d-t2`, etc.)
code = code.replace(
    /tur\.forEach\(t=>\{/,
    `prof.forEach(p => {
        // Expand old restrictions (d-t) to (d-t-h)
        const expandOld = arr => {
            if(!arr) return [];
            const newArr = [];
            arr.forEach(r => {
                const parts = r.split('-');
                if(parts.length === 2) {
                    for(let h=1; h<=NUM_AULAS; h++) newArr.push(r + '-' + h);
                } else {
                    newArr.push(r);
                }
            });
            return newArr;
        };
        p.restricoes = expandOld(p.restricoes);
        p.evitar = expandOld(p.evitar);
    });

    tur.forEach(t=>{`
);

fs.writeFileSync('CHICri_testeIA.html', code);

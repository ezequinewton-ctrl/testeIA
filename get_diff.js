const { execSync } = require('child_process');
const output = execSync('git diff index.html').toString();
console.log(output);

const fs = require('fs');
const lines = fs.readFileSync('c:/site/index.html', 'utf8').split('\n');

const block = lines.splice(453, 145);
let blockStr = block.join('\n');

blockStr = blockStr.replace(/class="glass card reveal span-3"/, 'class="glass card reveal"');
blockStr = blockStr.replace(/\s*style="margin-top: var\(--space-3\)"/, '');

let wrappedBlock = `
      <!-- Interactive Grammar Trainers -->
      <section class="section" style="padding-top: 0">
        <div class="container stack">
${blockStr}
        </div>
      </section>
`;

lines.splice(811, 0, wrappedBlock);
fs.writeFileSync('c:/site/index.html', lines.join('\n'), 'utf8');
console.log('Successfully moved section');

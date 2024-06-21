import fs from 'fs';
import { yarg } from './config/plugins/args.pluging';

const { b:base, l:limit, s:showTable } = yarg;

let body = '';
let outputMessage = '';

const headerMessage = `==========================
        Tabla del ${base}
==========================\n`;

for (let i = 1; i <= limit; i++) {
    outputMessage+=`${base} x ${i} = ${base*i}\n`;
}

body = headerMessage + outputMessage;

if (showTable) {
    console.log(body);
}

const outputPath = `outputs/`;
fs.mkdirSync(outputPath, { recursive: true })

const path = `${outputPath}/tabla-${base}.txt`;

fs.writeFileSync(path, body);
console.log("File created");

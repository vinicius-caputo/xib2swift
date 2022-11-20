import { parser } from 'posthtml-parser'
const fs = require('fs')

const html = fs.readFileSync('samples/TableViewCell.xib', 'utf-8')

let xib = html


console.log(xib);

xib = parser(xib)
console.log(xib);

function main() {
  console.log('Hello World')
}




for (const rule of xib) {
    if (typeof rule == 'object') {
        console.log(rule);
        console.log(rule.content);
        
    }
}





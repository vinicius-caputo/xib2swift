import { xib2swift } from './xib2swift';
import { argv } from 'process';

function resolveArgs() {
    if (argv.length < 3) {
        console.log('Usage: xib2swift <path-to-xib-file>');
        process.exit(1);
    }
    let path = argv[2];
    let string = '';
    let outputPath = '';
    argv.forEach((val, index) => {
        if (val == '-h' || val == '--help') {
            console.log('Basic usage: xib2swift <path-to-xib-file>');
            console.log('Options:');
            console.log(' -p, --path <path-to-xib-file>  Path to xib file');
            console.log(' -o, --outputPath <path-to-output-file>  Path to output file');
            console.log(' -s, --string <xib-string>  xib string');
            console.log(' -h, --help  Display this help message');
            process.exit(0);
        }
        else if (val == '-p' || val == '--path') {
            path = argv[index + 1];
        }
        else if (val == "-s" || val == "--string") {
            string = argv[index + 1];
        }
        else if (val == '-o' || val == '--outputPath') {
            outputPath = argv[index + 1];
        }
    });

    let convertedCode = '';
    if (string != '') {
        convertedCode = xib2swift(string);
    }
    else if (path != '') {
        const fs = require('fs');
        let xibFile = fs.readFileSync(path, 'utf8')
        convertedCode = xib2swift(xibFile);
    }
    
    if (outputPath != '') {
        const fs = require('fs');
        fs.writeFileSync(outputPath.replace(".swift",'')+".swift", convertedCode);
    }
    
    console.log(convertedCode);
}

resolveArgs();

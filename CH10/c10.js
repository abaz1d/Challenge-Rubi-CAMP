const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu >'
});

rl.prompt();
rl.on('line', (line) => {

    let string = ' '
    let x = line.split(' ').map(kata => kata.trim());
    for (y = 0; y < x.length; y++) {
        if (x[y].charAt(0) == ('a') ||
            x[y].charAt(0) == ('i') ||
            x[y].charAt(0) == ('u') ||
            x[y].charAt(0) == ('e') ||
            x[y].charAt(0) == ('o')) {
            string += ' ' + x[y]

        } else {
            x[y] = x[y].substring(1) + x[y].charAt(0) + 'nyo';
            string = string + ' ' + x[y]
        }

    }
    console.log(`Hasil konversi :'${string.trim()}'`);

    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
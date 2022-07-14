// dataBase = [{"definition": "siapa presiden indonesia?", "term": "jokowi"}, {"definition": "kapan indonesia merdeka?", "term": "1945"}]

// greeting sekaligus memanggil fs dan readline
console.log('selamat datang di permainan tebak kata, silah kan isi dengan tebakan benar ya!')
const fs = require('fs')
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tebakan: '
});

// insialisasi 
const dataBase = fs.readFileSync('data.json', 'utf-8')
var isiData = JSON.parse(dataBase)
var indeks = 0
console.log(isiData[indeks].definition) // menampilkan pertanyaan 1
rl.prompt();

//membaca line/tebakan
rl.on('line', (tebakan) => {
    let x = tebakan.toLowerCase();
    //jika function/tebakan/line sama dengan term data.json
    if (x == isiData[indeks].term) {
        console.log('tebakan anda benar!')
        indeks++
    
        if (indeks < isiData.length) {
            console.log(isiData[indeks].definition) //menampilkan pertanyaan 2
            rl.prompt()
        }
        if (indeks == isiData.length) {
            console.log('selamat semua benar!')
            rl.close()
        }
        //jika function/tebakan/line tidak sama dengan term data.json
    } else if (x != isiData[indeks].term) {
        console.log('x anda kurang tepat!')
        console.log(isiData[indeks].definition)
        rl.prompt()
    }
})
// dataBase = [{"definition": "siapa presiden indonesia?", "term": "jokowi"}, {"definition": "kapan indonesia merdeka?", "term": "1945"}]
// greeting sekaligus memanggil fs dan readline

console.log('selamat datang di permainan tebak kata, silah kan isi dengan tebakan benar ya!')
const fs = require('fs')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban : '
});

// insialisasi 
const dataBase = fs.readFileSync('data.json', 'utf-8')
let isiData = JSON.parse(dataBase)
let indeks = 0
let percobaan = 0
console.log('Pertanyaan  : ' + isiData[indeks].definition)                    // menampilkan pertanyaan 1
rl.prompt();

//membaca line/tebakan
rl.on('line', (tebakan) => {
    let x = tebakan.toLowerCase();
    percobaan++


    if (x == 'skip') {
        let soal1 = isiData.splice(0, 1)[0];            // potong dan menyimpan data 1
        isiData.splice(isiData.length, 0, soal1);       // potong dan masukan ke bagian terakhir

    } if (x == isiData[indeks].term) {                  //jika function/tebakan/line sama dengan term data.json
        console.log('tebakan anda benar!')
        indeks++

        if (indeks < isiData.length) {
            console.log('Pertanyaan  :' + isiData[indeks].definition)     //menampilkan pertanyaan selanjutnya
            rl.prompt()
        }
        if (indeks == isiData.length) {
            console.log('selamat semua benar!')
            rl.close()
        }

    } else if (x != isiData[indeks].term) {             //jika function/tebakan/line tidak sama dengan term data.json
        console.log('tebakan anda kurang tepat! percobaan ke ' + percobaan + ' kali')
        console.log('Pertanyaan  ;' + isiData[indeks].definition)
        rl.prompt()
    }
})


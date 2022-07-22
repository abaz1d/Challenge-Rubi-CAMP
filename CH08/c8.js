function pola(str) {
    let a = str.split(" ")
    let hasil = []
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            const awal = Number(a[0].replace("#", x));
            const akhir = Number(a[4].replace("#", y));
            const tengah = a[2];

            if (awal * tengah === akhir) {
                hasil.push(x, y);
                return hasil;
            }
        }
    }
};
console.log(pola("42#3 * 188 = 80#204")); 
console.log(pola("8#61 * 895 = 78410#5"));
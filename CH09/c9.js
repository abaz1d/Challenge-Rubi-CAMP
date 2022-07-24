// membuat arr terlebih dahulu
function spiral(param1) {
    var arr = []
    var counter = 0;
    for (var x = 0; x < param1; x++) {
        arr[x] = []
        for (var y = 0; y < param1; y++) {
            arr[x][y] = counter++

        }
    }
    console.log('Ilustrasi', arr)

    let atas = 0;
    let kiri = 0;
    let bawah = arr.length - 1;
    let kanan = arr[0].length - 1;
    const hasil = [];
    const size = arr.length * arr[0].length;

    while (hasil.length < size) {

        //membaca dari kiri ke kanan
        for (let i = kiri; i <= kanan; i++) {
            hasil.push(arr[atas][i]);
        }
        atas++;
        //membaca dari atas ke bawah 
        for (let i = atas; i <= bawah; i++) {
            hasil.push(arr[i][kanan]);
        }
        kanan--;

        //membaca dari kanan ke kiri
        for (let i = kanan; i >= kiri; i--) {
            hasil.push(arr[bawah][i]);
        }
        bawah--;

        //membaca dari bawah ke atas
        for (let i = bawah; i >= atas; i--) {
            hasil.push(arr[i][kiri]);
        }
        kiri++;
    }

    console.log('hasil', hasil)
    //return hasil
};
spiral(5)
spiral(6)
spiral(7)
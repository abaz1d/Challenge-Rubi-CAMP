import ViewMatkul from '../View/ViewMatkul.js';
import Utama, { rl } from '../c18.js';
import Table from 'cli-table';
import ModelMatkul from '../Model/ModelMatkul.js';


//================================================================================================================
//Matkul
export default class Matkul {
    static MenuMatkul() {
        ViewMatkul.menuMatkul()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Matkul
                    Matkul.daftarMatkul()
                    break;
                case '2': //Cari Matkul
                    Matkul.cariMatkul()
                    break;
                case '3': //Tambah Matkul
                    Matkul.tambahMatkul()
                    break;
                case '4': //Hapus Matkul
                    Matkul.hapusMatkul()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarMatkul(callback) {
        const tableMatkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        ModelMatkul.daftarMk((err, data) => {
            if (err) {
                console.log('gagal mengambil data Mata Kuliah', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableMatkul.push([
                    item.kodeMatkul,
                    item.namaMatkul,
                    item.sks
                ])
            })
            console.log(tableMatkul.toString())
            if (callback)
                callback()
            else
                Matkul.MenuMatkul()
        })
    }

    static cariMatkul() {
        rl.question('Masukkan Kode Mata Kuliah : ', (kodeMatkul) => {
            ModelMatkul.cariMk(kodeMatkul, (err, data) => {
                if (err) {
                    console.log('gagal ambil data dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan kode ${kodeMatkul}, tidak terdaftar`)
                    Matkul.MenuMatkul()
                } else {
                    console.log(`
========================================
Detail Matkul dengan Kode '${kodeMatkul}' :
Kode Matkul : ${data[0].kodeMatkul}
Nama Matkul : ${data[0].namaMatkul}
SKS         : ${data[0].sks}
            `);
                    Matkul.MenuMatkul()
                }
            })
        })
    }

    static tambahMatkul() {
        console.log('Lengkapi data di bawah ini : ')
        Matkul.daftarMatkul(() => {
            rl.question('kodeMatkul :', (kodeMatkul) => {
                rl.question('Nama Matkul :', (namaMatkul) => {
                    rl.question('SKS :', (sks) => {
                        ModelMatkul.tambahMk(kodeMatkul, namaMatkul, sks, (err) => {
                            if (err) {
                                console.log('gagal menambah Matkul', err)
                                process.exit(1)
                            } else {
                                console.log('Matkul telah ditambahkan')
                                Matkul.daftarMatkul()
                            }
                        })
                    })
                })
            })
        })
    }

    static hapusMatkul() {
        rl.question('Masukkan kode Matkul : ', (kodeMatkul) => {
            ModelMatkul.hapusMk(kodeMatkul, (err) => {
                if (err) {
                    console.log('gagal ambil data Matkul', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data dosen ${kodeMatkul}, telah dihapus`);
                    Matkul.MenuMatkul()
                }
            })
        })
    }
}

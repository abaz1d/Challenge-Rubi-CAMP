import ViewJurusan from '../View/ViewJurusan.js';
import Utama, { rl } from '../c18.js';
import Table from 'cli-table';
import ModelJurusan from '../Model/ModelJurusan.js';


//================================================================================================================
//Jurusan
export default class Jurusan {
    static MenuJurusan() {
        ViewJurusan.menuJrsn()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Jurusan
                    Jurusan.daftarJurusan()
                    break;
                case '2': //Cari Jurusan
                    Jurusan.cariJurusan()
                    break;
                case '3': //Tambah Jurusan
                    Jurusan.tambahJurusan()
                    break;
                case '4': //Hapus Jurusan
                    Jurusan.hapusJurusan()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarJurusan(callback) {
        ModelJurusan.daftarJrsn((err, data) => {
            if (err) {
                console.log('gagal mengambil database jurusan', err)
                process.exit(1)
            }

            const tableJurusan = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
                , colWidths: [15, 20]
            });

            data.forEach(item => {
                tableJurusan.push([
                    item.kodeJurusan,
                    item.namaJurusan
                ])
            })
            console.log(tableJurusan.toString())
            if (callback)
                callback()
            else
                Jurusan.MenuJurusan()

        })
    }

    static cariJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kodeJurusan) => {
            ModelJurusan.cariJrsn(kodeJurusan, (err, data) => {
                if (err) {
                    console.log('gagal ambil database jurusan', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Jurusan dengan kode ${kodeJurusan}, tidak terdaftar`)
                    Jurusan.MenuJurusan()
                } else {
                    console.log(`
========================================
Detail Jurusan dengan Kode '${kodeJurusan}' :
Kode Jurusan : ${data[0].kodeJurusan}
Nama Jurusan : ${data[0].namaJurusan}
            `);
                    Jurusan.MenuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        console.log('Lengkapi data di bawah ini : ')
        Jurusan.daftarJurusan(() => {
            rl.question('Kode Jurusan: ', (kodeJurusan) => {
                rl.question('Nama Jurusan : ', (namaJurusan) => {
                    ModelJurusan.tambahJrsn(kodeJurusan, namaJurusan, (err) => {
                        if (err) {
                            console.log('gagal menambah database jurusan', err)
                            process.exit(1)
                        } else {
                            console.log('jurusan telah ditambahkan ke database')
                            Jurusan.daftarJurusan()
                        }
                    })
                })
            })
        })
    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kodeJurusan) => {
            ModelJurusan.hapusJrsn(kodeJurusan, (err) => {
                if (err) {
                    console.log('gagal menghapus database jurusan', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data jurusan ${kodeJurusan}, telah dihapus`);
                    Jurusan.MenuJurusan()
                }
            })
        })
    }
}
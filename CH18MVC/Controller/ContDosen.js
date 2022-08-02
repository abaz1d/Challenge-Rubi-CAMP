import ViewDosen from '../View/ViewDosen.js';
import Utama, { rl } from '../c18.js';
import Table from 'cli-table';
import ModelDosen from '../Model/ModelDosen.js';

//================================================================================================================
//Dosen
export default class Dosen {
    static MenuDosen() {
        ViewDosen.menuDsn()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Dosen
                    Dosen.daftarDosen()
                    break;
                case '2': //Cari Dosen
                    Dosen.cariDosen()
                    break;
                case '3': //Tambah Dosen
                    Dosen.tambahDosen()
                    break;
                case '4': //Hapus Dosen
                    Dosen.hapusDosen()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarDosen(callback) {
        const tableDosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [15, 20]
        });
        ModelDosen.daftarDsn((err, data) => {
            if (err) {
                console.log('gagal mengambil database dosen', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableDosen.push([
                    item.nip,
                    item.namaDosen
                ])
            })
            console.log(tableDosen.toString())
            if (callback)
                callback()
            else
                Dosen.MenuDosen()
        })
    }

    static cariDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            ModelDosen.cariDsn(nip, (err, data) => {
                if (err) {
                    console.log('gagal ambil database dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan NIP ${nip}, tidak terdaftar`)
                    Dosen.MenuDosen()
                } else {
                    console.log(`
========================================
Detail Dosen dengan NIP '${nip}' :
NIP        : ${data[0].nip}
Nama Dosen : ${data[0].namaDosen}
            `);
                    Dosen.MenuDosen()
                }
            })
        })
    }

    static tambahDosen() {
        console.log('Lengkapi data di bawah ini : ')
        Dosen.daftarDosen(() => {
            rl.question('NIP :', (nip) => {
                rl.question('Nama Dosen :', (namaDosen) => {
                    ModelDosen.tambahDsn(nip, namaDosen, (err) => {
                        if (err) {
                            console.log('gagal menambah database Dosen', err)
                            process.exit(1)
                        } else {
                            console.log('Dosen baru telah ditambahkan ke database')
                            Dosen.daftarDosen()
                        }
                    })
                })
            })
        })
    }

    static hapusDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            ModelDosen.hapusDsn(nip, (err) => {
                if (err) {
                    console.log('gagal ambil dosen', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data dosen ${nip}, telah dihapus`);
                    Dosen.MenuDosen()
                }
            })
        })
    }
}
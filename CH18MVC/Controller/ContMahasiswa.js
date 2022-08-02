import ViewMahasiswa from '../View/ViewMahasiswa.js';
import Utama, { rl } from '../c18.js';
import Table from 'cli-table';
import ModelMahasiswa from '../Model/ModelMahasiswa.js';
import Jurusan from './ContJurusan.js';


//================================================================================================================
//Mahasiswa
export default class Mahasiswa {
    static MenuMahasiswa() {
        ViewMahasiswa.menuMhs()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Mahasiswa
                    Mahasiswa.daftarMahasiswa()
                    break;
                case '2': //Cari Mahasiswa
                    Mahasiswa.cariMahasiswa()
                    break;
                case '3': //Tambah Mahasiswa
                    Mahasiswa.tambahMahasiswa()
                    break;
                case '4': //Hapus Mahasiswa
                    Mahasiswa.hapusMahasiswa()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarMahasiswa(callback) {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan']
            , colWidths: [15, 20, 15, 15, 15]
        });
        ModelMahasiswa.daftarMhs((err, data) => {
            if (err) {
                console.log('gagal ambil mahasiswa', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableMahasiswa.push([
                    item.nim,
                    item.nama,
                    item.dob,
                    item.alamat,
                    item.kodeJurusan
                ])
            })
            console.log(tableMahasiswa.toString())
            if (callback)
                callback()
            else
                Mahasiswa.MenuMahasiswa()

        })
    }

    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            ModelMahasiswa.cariMhs(nim, (err, data) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar`)
                    Mahasiswa.MenuMahasiswa()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${nim}' :
NIM     : ${data[0].nim}
Nama    : ${data[0].nama}
Alamat  : ${data[0].alamat}
Jurusan : ${data[0].kodeJurusan}
            `);
                    Mahasiswa.MenuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        console.log('Lengkapi data di bawah ini : ')
        Mahasiswa.daftarMahasiswa(() => {
            rl.question('NIM :', (nim) => {
                rl.question('Nama: ', (nama) => {
                    rl.question('Tanggal Lahir: ', (dob) => {
                        rl.question('Alamat: ', (alamat) => {
                            Jurusan.daftarJurusan(() => {
                                rl.question('Kode Jurusan: ', (kodeJurusan) => {
                                    ModelMahasiswa.tambahMhs(nim, nama, alamat, kodeJurusan, dob, (err) => {
                                        if (err) {
                                            console.log('gagal menambah mahasiswa mahasiswa', err)
                                            process.exit(1)
                                        } else {
                                            console.log('mahasiswa telah ditambahkan')
                                            Mahasiswa.daftarMahasiswa()
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            ModelMahasiswa.hapusMhs(nim, (err) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${nim}, telah dihapus`);
                    Mahasiswa.MenuMahasiswa()
                }
            })
        })
    }
}

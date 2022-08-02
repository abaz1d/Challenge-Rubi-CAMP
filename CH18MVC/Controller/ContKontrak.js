import Utama, { rl } from '../c18.js';
import Table from 'cli-table';
import ModelKontrak from '../Model/ModelKontrak.js';
import ViewKontrak from '../View/ViewKontrak.js';


//================================================================================================================
//Kontrak
export default class Kontrak {
    static MenuKontrak() {
        ViewKontrak.menuKontrak()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Kontrak
                    Kontrak.daftarKontrak()
                    break;
                case '2': //Cari Kontrak
                    Kontrak.cariKontrak()
                    break;
                case '3': //Tambah Kontrak
                    Kontrak.tambahKontrak()
                    break;
                case '4': //Hapus Kontrak
                    Kontrak.hapusKontrak()
                    break;
                case '5': //Update Nilai
                    Kontrak.updateNilai()
                    break;
                case '6': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarKontrak(callback) {
        const tableKontrak = new Table({
            head: ['ID', 'NIM', 'Kode Mata Kuliah', 'NIP', 'Nilai']
            , colWidths: [5, 15, 10, 15, 10]
        });
        ModelKontrak.daftarKt((err, data) => {
            if (err) {
                console.log('gagal ambil rapot', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableKontrak.push([
                    item.ID,
                    item.nim,
                    item.kodeMatkul,
                    item.nip,
                    item.nilai == null ? ' ' : item.nilai
                ])
            })
            console.log(tableKontrak.toString())
            if (callback)
                callback()
            else
                Kontrak.MenuKontrak()
        })
    }

    static cariKontrak() {
        rl.question('Masukkan ID Mahasiswa : ', (ID) => {
            ModelKontrak.cariKt(ID, (err, data) => {
                if (err) {
                    console.log('gagal ambil rapot', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan ID ${ID}, tidak terdaftar`)
                    Kontrak.MenuKontrak()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan ID '${ID}' :
NIM               : ${data[0].nim}
Kode Mata Kuliah  : ${data[0].kodeMatkul}
NIP               : ${data[0].nip}
Nilai             : ${data[0].nilai}
            `);
                    Kontrak.MenuKontrak()
                }
            })
        })
    }

    static tambahKontrak() {
        console.log('Lengkapi data di bawah ini : ')
        Kontrak.daftarKontrak(() => {
            rl.question('NIM: ', (nim) => {
                rl.question('Kode Mata Kuliah: ', (kodeMatkul) => {
                    rl.question('NIP: ', (nip) => {
                        ModelKontrak.tambahKt(nim, kodeMatkul, nip, (err) => {
                            if (err) {
                                console.log('gagal menambah kontrak mahasiswa', err)
                                process.exit(1)
                            } else {
                                console.log('kontrak telah ditambahkan')
                                Kontrak.daftarKontrak()
                            }
                        })
                    })
                })
            })
        })
    }

    static hapusKontrak() {
        rl.question('Masukkan ID Mahasiswa : ', (ID) => {
            ModelKontrak.hapusKt(ID, (err) => {
                if (err) {
                    console.log('gagal ambil data kontrak', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Kontrak Mahasiswa ${ID}, telah dihapus`);
                    Kontrak.MenuKontrak()
                }
            })
        })
    }

    static updateNilai(callback) {
        Kontrak.daftarKontrak(() => {
            rl.question('Masukkan nim Mahasiswa : ', (nim) => {
                ModelKontrak.updateKt(nim, (err, data) => {
                    if (err) {
                        console.log('gagal ambil rapot', err)
                        process.exit(1)
                    }

                    if (data.length == 0) {
                        console.log(`Mahasiswa dengan NIM ${nim}, tidak terdaftar`)
                        Kontrak.MenuKontrak()
                    } else {
                        ViewKontrak.line()
                        console.log(`Detail mahasiswa dengan NIM '${nim}' :`)
                        const tableKontrak = new Table({
                            head: ['ID', 'Mata Kuliah', 'Nilai']
                            , colWidths: [5, 15, 10]
                        })

                        data.forEach(item => {
                            tableKontrak.push([
                                item.ID,
                                item.namaMatkul,
                                item.nilai == null ? ' ' : item.nilai
                            ])
                        })
                        console.log(tableKontrak.toString())
                    }

                    ViewKontrak.line()
                    rl.question('masukan id yang akan dirubah nilainya : ', (ID) => {
                        ViewKontrak.line()
                        rl.question('tulis nilai yang baru : ', (nilai) => {
                            ModelKontrak.upNilai(nilai, ID, (err) => {
                                if (err) {
                                    console.log('gagal mengubah nilai Kontrak', err)
                                    process.exit(1)
                                }
                                ViewKontrak.line()
                                console.log('nilai telah diupdate')
                                Kontrak.daftarKontrak()
                            })
                        })
                    })
                })
            })
        })
    }
}
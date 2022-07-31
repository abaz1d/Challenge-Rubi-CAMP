//======================================================================
//Kontrak
class Kontrak {
    static MenuKontrak() {
        Greet.menuKontrak()
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
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarKontrak() {
        const tableKontrak = new Table({
            head: ['ID', 'NIM', 'Kode Mata Kuliah', 'NIP', 'Nilai']
            , colWidths: [5, 15, 10, 15, 10]
        });
        db.all('SELECT * FROM rapot', (err, data) => {
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
                    item.nilai
                ])
            })
            console.log(tableKontrak.toString())
            Kontrak.MenuKontrak()
        })
    }

    static cariKontrak() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('SELECT * FROM rapot WHERE rapot.nim = ?', [nim], (err, data) => {
                if (err) {
                    console.log('gagal ambil rapot', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar`)
                    Kontrak.MenuKontrak()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${nim}' :
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
        rl.question('ID :', (ID) => {
            rl.question('NIM: ', (nim) => {
                rl.question('Kode Mata Kuliah: ', (kodeMatkul) => {
                    rl.question('NIP: ', (nip) => {
                        rl.question('NILAI: ', (nilai) => {
                            db.run('INSERT INTO rapot VALUES (?, ?, ?, ?, ?)', [ID, nim, kodeMatkul, nip, nilai], (err) => {
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
        })
    }

    static hapusKontrak() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('DELETE FROM rapot WHERE rapot.nim = ?', [nim], (err) => {
                if (err) {
                    console.log('gagal ambil data kontrak', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Kontrak Mahasiswa ${nim}, telah dihapus`);
                    Kontrak.MenuKontrak()
                }
            })
        })
    }
}
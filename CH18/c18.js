const readline = require('readline');
const Table = require('cli-table');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const sqlite3 = require('sqlite3');
const dbFile = __dirname + "./university.db";

const db = new sqlite3.Database('university.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`gak nyambung didatabase`, err) };
});

//================================================================================================================
//login
class users {
    static username() {
        rl.question('username : ', (username) => {
            db.all('SELECT * FROM users WHERE users.username = ?', [username], (err, data) => {
                if (err) {
                    console.log('gagal ambil users', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('username tidak terdaftar')
                    users.username()
                }
                users.password(data[0])
            })
        })
    }

    static password(user) {
        rl.question('password : ', (password) => {
            if (password == user.password) {
                Greet.line()
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Utama.home()
            } else {
                console.log('password salah')
                users.password(user)
            }

        })
    }
}

//================================================================================================================
//greet
class Greet {

    static line() {
        console.log('=============================================')
    }

    static logout() {
        console.log(`
=============================================
Anda telah keluar`)
    }

    static home() {
        Greet.line()
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
        Greet.line();
    }

    static welcome() {
        Greet.line()
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        Greet.line()
    }

    static menuMhs() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali`)
        Greet.line();
    }

    static menuJrsn() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali`)
        Greet.line();
    }
    static menuDsn() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali`)
        Greet.line();
    }

    static menuMatkul() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali`)
        Greet.line();
    }

    static menuKontrak() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali`)
        Greet.line();
    }

}

//================================================================================================================
//Mahasiswa
class Mahasiswa {
    static MenuMahasiswa() {
        Greet.menuMhs()
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

    static daftarMahasiswa() {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan']
            , colWidths: [20, 10, 15, 15, 15]
        });
        db.all('SELECT * FROM mahasiswa', (err, data) => {
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
            Mahasiswa.MenuMahasiswa()
        })
    }

    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('SELECT * FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err, data) => {
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
        rl.question('NIM :', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Alamat: ', (alamat) => {
                    rl.question('Jurusan: ', (kodeJurusan) => {
                        rl.question('Tanggal Lahir: ', (dob) => {
                            db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, kodeJurusan, dob], (err) => {
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
    }

    static hapusMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('DELETE FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err) => {
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

//================================================================================================================
//Jurusan
class Jurusan {
    static MenuJurusan() {
        Greet.menuJrsn()
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

    static daftarJurusan() {
        const tableJurusan = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
            , colWidths: [15, 20]
        });
        db.all('SELECT * FROM jurusan', (err, data) => {
            if (err) {
                console.log('gagal mengambil database jurusan', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableJurusan.push([
                    item.kodeJurusan,
                    item.namaJurusan
                ])
            })
            console.log(tableJurusan.toString())
            Jurusan.MenuJurusan()
        })
    }

    static cariJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kodeJurusan) => {
            db.all('SELECT * FROM jurusan WHERE jurusan.kodeJurusan = ?', [kodeJurusan], (err, data) => {
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
        rl.question('Kode Jurusan: ', (kodeJurusan) => {
            rl.question('Nama Jurusan : ', (namaJurusan) => {
                db.run('INSERT INTO jurusan VALUES (?, ?)', [kodeJurusan, namaJurusan], (err) => {
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



    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kodeJurusan) => {
            db.all('DELETE FROM jurusan WHERE jurusan.kodeJurusan = ?', [kodeJurusan], (err) => {
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

//================================================================================================================
//Dosen
class Dosen {
    static MenuDosen() {
        Greet.menuDsn()
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

    static daftarDosen() {
        const tableDosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [15, 20]
        });
        db.all('SELECT * FROM dosen', (err, data) => {
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
            Dosen.MenuDosen()
        })
    }

    static cariDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            db.all('SELECT * FROM dosen WHERE dosen.nip = ?', [nip], (err, data) => {
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
        rl.question('NIP :', (nip) => {
            rl.question('Nama Dosen :', (namaDosen) => {
                db.run('INSERT INTO dosen VALUES (?, ?)', [nip, namaDosen], (err) => {
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



    }

    static hapusDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            db.all('DELETE FROM dosen WHERE dosen.nip = ?', [nip], (err) => {
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

//================================================================================================================
//Matkul
class Matkul {
    static MenuMatkul() {
        Greet.menuMatkul()
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

    static daftarMatkul() {
        const tableMatkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        db.all('SELECT * FROM mataKuliah', (err, data) => {
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
            Matkul.MenuMatkul()
        })
    }

    static cariMatkul() {
        rl.question('Masukkan Kode Mata Kuliah : ', (kodeMatkul) => {
            db.all('SELECT * FROM mataKuliah WHERE mataKuliah.kodeMatkul = ?', [kodeMatkul], (err, data) => {
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
        rl.question('kodeMatkul :', (kodeMatkul) => {
            rl.question('Nama Matkul :', (namaMatkul) => {
                rl.question('SKS :', (sks) => {
                    db.run('INSERT INTO mataKuliah VALUES (?, ?, ?)', [kodeMatkul, namaMatkul, sks], (err) => {
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



    }

    static hapusMatkul() {
        rl.question('Masukkan kode Matkul : ', (kodeMatkul) => {
            db.all('DELETE FROM mataKuliah WHERE mataKuliah.kodeMatkul = ?', [kodeMatkul], (err) => {
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

//================================================================================================================
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

//================================================================================================================
//Utama
class Utama {
    static login() {
        Greet.welcome()
        users.username()
    }

    static home() {
        Greet.home();
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (opsi) => {
            switch (opsi) {


                case '1': //Mahasiswa
                    Mahasiswa.MenuMahasiswa();
                    break;
                case '2': //Jurusan
                    Jurusan.MenuJurusan();
                    break;
                case '3': //Dosen
                    Dosen.MenuDosen();
                    break;
                case '4': //Mata Kuliah
                    Matkul.MenuMatkul()
                    break;
                case '5': //Kontrak
                    Kontrak.MenuKontrak()
                    break;
                case '6': //Keluar
                    Greet.logout()
                    Utama.login()
            }
        })
    }
};

Utama.login()
//Utama.home()
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
                    UserController.askPassword(user)
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
}

//======================================================================
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

                    break;
                case '4': //Hapus Mahasiswa

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
                    console.log('data tidak ditemukan')
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

    static tambahMahasiswa(){
        
    }
}

//===========================================================================
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
                    break;
                case '3': //Dosen
                    break;
                case '4': //Mata Kuliah
                    break;
                case '5': //Kontrak
                    break;
                case '6': //Keluar
                    Utama.login()
            }
        })
    }
};

Utama.login()
//Utama.home()
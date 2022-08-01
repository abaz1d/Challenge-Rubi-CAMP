import readline from 'readline'
import sqlite3 from 'sqlite3';

import ViewLogin from './View/ViewLogin.js';
import users from './Controller/ContLogin.js';
import Mahasiswa from './Controller/ContMahasiswa.js';
import Jurusan from './Controller/ContJurusan.js';
import Dosen from './Controller/ContDosen.js';
import Matkul from './Controller/ContMatkul.js';
import Kontrak from './Controller/ContKontrak.js';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//const dbFile = __dirname + "./university.db";

export const db = new sqlite3.Database('university.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`gak nyambung didatabase`, err) };
});


//================================================================================================================
//Utama
export default class Utama {
    static login() {
        ViewLogin.welcome()
        users.username()
    }

    static home() {
        ViewLogin.home();
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
                    ViewLogin.logout()
                    Utama.login()
            }
        })
    }
};

Utama.login()
//Utama.home()
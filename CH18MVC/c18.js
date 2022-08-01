// const readline = require('readline');
// const sqlite3 = require('sqlite3');
// const Table = require('cli-table');
import readline from 'readline'
import sqlite3 from 'sqlite3';

import Greet from './View/View.js';
import { users } from './Controller/Controller.js';
import { Mahasiswa } from './Controller/Controller.js';
import { Jurusan } from './Controller/Controller.js';
import { Dosen } from './Controller/Controller.js';
import { Matkul } from './Controller/Controller.js';
import { Kontrak } from './Controller/Controller.js';

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
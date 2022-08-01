import { db } from "../c18.js";

export default class ModelMatkul {
    static daftarMk(callback) {
        db.all('SELECT * FROM mataKuliah', (err, data) => {
            callback(err, data)
        })

    }

    static cariMk(kodeMatkul, callback) {
        db.all('SELECT * FROM mataKuliah WHERE mataKuliah.kodeMatkul = ?', [kodeMatkul], (err, data) => {
            callback(err, data)
        })
    }

    static tambahMk(kodeMatkul, namaMatkul, sks, callback) {
        db.run('INSERT INTO mataKuliah VALUES (?, ?, ?)', [kodeMatkul, namaMatkul, sks], (err) => {
            callback(err)
        })
    }

    static hapusMk(kodeMatkul, callback) {
        db.all('DELETE FROM mataKuliah WHERE mataKuliah.kodeMatkul = ?', [kodeMatkul], (err) => {
            callback(err)
        })
    }
}
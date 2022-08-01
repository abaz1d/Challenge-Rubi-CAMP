import { db } from "../c18.js";

export default class ModelMahasiswa {
    static daftarMhs(callback) {
        db.all('SELECT * FROM mahasiswa', (err, data) => {
            callback(err, data)
        })
    }

    static cariMhs(nim, callback) {
        db.all('SELECT * FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err, data) => {
            callback(err, data)
        })
    }

    static tambahMhs(nim, nama, alamat, kodeJurusan, dob, callback) {
        db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, kodeJurusan, dob], (err) => {
            callback(err)
        })
    }

    static hapusMhs(nim, callback) {
        db.all('DELETE FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err) => {
            callback(err)
        })
    }

}
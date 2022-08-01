import { db } from "../c18.js";

export default class Model {
    static findUser(username, callback) {
        db.all('SELECT * FROM users WHERE users.username = ?', [username], (err, data) => {
            callback(err, data)
        })
    }

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

    static daftarJrsn(callback) {
        db.all('SELECT * FROM jurusan', (err, data) => {
            callback(err, data)
        })
    
    }

    static cariJrsn(kodeJurusan, callback) {
        db.all('SELECT * FROM jurusan WHERE jurusan.kodeJurusan = ?', [kodeJurusan], (err, data) => {
            callback(err, data)
        })
    }

    static tambahJrsn(kodeJurusan, namaJurusan, callback) {
        db.run('INSERT INTO jurusan VALUES (?, ?)', [kodeJurusan, namaJurusan], (err) => {
            callback(err)
        })
    }

    static hapusJrsn(kodeJurusan, callback) {
        db.all('DELETE FROM jurusan WHERE jurusan.kodeJurusan = ?', [kodeJurusan], (err) => {
            callback(err)
        })
    }

    static daftarDsn(callback) {
        db.all('SELECT * FROM dosen', (err, data) => {
            callback(err, data)
        })
    
    }

    static cariDsn(nip, callback) {
        db.all('SELECT * FROM dosen WHERE dosen.nip = ?', [nip], (err, data) => {
            callback(err, data)
        })
    }

    static tambahDsn(nip, namaDosen, callback) {
        db.run('INSERT INTO dosen VALUES (?, ?)', [nip, namaDosen], (err) => {
            callback(err)
        })
    }

    static hapusDsn(nip, callback) {
        db.all('DELETE FROM dosen WHERE dosen.nip = ?', [nip], (err) => {
            callback(err)
        })
    }

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

    static daftarKt(callback) {
        db.all('SELECT * FROM rapot', (err, data) => {
            callback(err, data)
        })
    
    }

    static cariKt(nim, callback) {
        db.all('SELECT * FROM rapot WHERE rapot.nim = ?', [nim], (err, data) => {
            callback(err, data)
        })
    }

    static tambahKt(ID, nim, kodeMatkul, nip, nilai, callback) {
        db.run('INSERT INTO rapot VALUES (?, ?, ?, ?, ?)', [ID, nim, kodeMatkul, nip, nilai], (err) => {
            callback(err)
        })
    }

    static hapusKt(ID, callback) {
        db.all('DELETE FROM rapot WHERE rapot.ID = ?', [ID], (err) => {
            callback(err)
        })
    }
}
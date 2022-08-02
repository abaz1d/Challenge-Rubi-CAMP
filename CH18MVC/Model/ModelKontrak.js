import { db } from "../c18.js";


export default class ModelKontrak {
    static daftarKt(callback) {
        db.all('SELECT * FROM rapot', (err, data) => {
            callback(err, data)
        })

    }

    static cariKt(ID, callback) {
        db.all('SELECT * FROM rapot WHERE rapot.ID = ?', [ID], (err, data) => {
            callback(err, data)
        })
    }

    static tambahKt(nim, kodeMatkul, nip, callback) {
        db.run('INSERT INTO rapot (nim, kodeMatkul, nip) VALUES (?, ?, ?)', [nim, kodeMatkul, nip], (err) => {
            callback(err)
        })
    }

    static hapusKt(ID, callback) {
        db.all('DELETE FROM rapot WHERE rapot.ID = ?', [ID], (err) => {
            callback(err)
        })
    }

    static updateKt(nim, callback) {
        db.all('SELECT rapot.ID, mataKuliah.namaMatkul, rapot.nilai FROM rapot JOIN mataKuliah ON mataKuliah.kodeMatkul=rapot.kodeMatkul WHERE rapot.nim = ?', [nim], (err, data) => {
            callback(err, data)
        })

    }

    static upNilai(nilai, ID, callback) {
        db.run('UPDATE rapot SET nilai = ? WHERE ID = ?', [nilai, ID], (err) => {
        callback(err)
    })
}
}

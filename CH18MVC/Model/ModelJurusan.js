import { db } from "../c18.js";

export default class ModelJurusan{
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
}
import { db } from "../c18.js";

export default class ModelDosen{
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
}
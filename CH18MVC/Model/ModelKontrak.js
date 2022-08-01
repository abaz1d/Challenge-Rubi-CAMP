import { db } from "../c18.js";


export default class ModelKontrak{
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

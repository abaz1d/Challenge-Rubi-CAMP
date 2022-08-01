import { db } from "../c18.js";

export default class ModelLogin {
    static findUser(username, callback) {
        db.all('SELECT * FROM users WHERE users.username = ?', [username], (err, data) => {
            callback(err, data)
        })
    }
}
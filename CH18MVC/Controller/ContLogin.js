import ViewLogin from '../View/ViewLogin.js';
import Utama, { rl } from '../c18.js';
import ModelLogin from '../Model/ModelLogin.js';

//================================================================================================================
//login
export default class users {
    static username() {
        rl.question('username : ', (username) => {
                ModelLogin.findUser(username, (err, data) => {
                    if (err) {
                        console.log('gagal ambil users', err)
                        process.exit(1)
                    }
                    if (data.length == 0) {
                        console.log('username tidak terdaftar')
                        users.username()
                    }
                    users.password(data[0])
                })
        })
    }

    static password(user) {
        rl.question('password : ', (password) => {
            if (password == user.password) {
                ViewLogin.line()
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Utama.home()
            } else {
                console.log('password salah')
                users.password(user)
            }

        })
    }
}
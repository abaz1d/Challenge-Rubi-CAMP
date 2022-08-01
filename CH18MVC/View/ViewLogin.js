
export default class ViewLogin {
    static line() {
        console.log('=============================================')
    }

    static welcome() {
        ViewLogin.line()
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        ViewLogin.line()
    }

    static home() {
        ViewLogin.line()
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
`)
        ViewLogin.line();
    }

    static logout() {
        console.log(`
=============================================
Anda telah keluar`)
    }

}
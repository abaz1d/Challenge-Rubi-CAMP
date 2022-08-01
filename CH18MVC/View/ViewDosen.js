export default class ViewDosen{
    static line() {
        console.log('=============================================')
    }
    
    static menuDsn() {
        ViewDosen.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali`)
        ViewDosen.line();
    }
}
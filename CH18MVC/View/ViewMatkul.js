export default class ViewMatkul {
    static line() {
        console.log('=============================================')
    }

    static menuMatkul() {
        ViewMatkul.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali`)
        ViewMatkul.line();
    }
}
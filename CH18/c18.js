

class Utama {
    static Login() {

    }

    static Home() {
        console.log(`====================================================`)
        console.log(`
silahkan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar`)
        console.log(`====================================================`)
        rl.question('masukan salah satu nomor dari opsi diatas ; ', (opsi) => {
            switch (opsi) {
                case '1': //Mahasiswa
                    switch (opsi) {
                        case '1': //Daftar Mahasiswa
                            break;
                        case '2': //Cari Mahasiswa
                            break;
                        case '3': //Tambah Mahasiswa
                            break;
                        case '4': //Hapus Mahasiswa
                            break;
                        case '5': //Kembali
                            break;
                    }
                    break;
                case '2': //Jurusan
                    break;
                case '3': //Dosen
                    console.log(`====================================================`)
                    rl.question('masukan salah satu nomor dari opsi diatas ; ', (opsi) => {
                        switch (opsi) {
                            case '1': //Daftar Dosen
                                break;
                            case '2': //Cari Dosen
                                break;
                            case '3': //Tambah Dosen
                                break;
                            case '4': //Hapus Dosen
                                break;
                            case '5': //Kembali
                                break;
                        }

                        break;
                case '4': //Mata Kuliah
                    break;
                case '5': //Kontrak
                    break;
                case '6': //Keluar
                    break;
            }
        })
    }
};
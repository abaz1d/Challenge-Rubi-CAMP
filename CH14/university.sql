CREATE TABLE jurusan(
    kodeJurusan VARCHAR(4) NOT NULL PRIMARY KEY,
    namaJurusan VARCHAR(50) NOT NULL
);

CREATE TABLE mahasiswa(
    nim VARCHAR(10) NOT NULL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    alamat text,
    kodeJurusan VARCHAR(4) NOT NULL,
    FOREIGN KEY (kodeJurusan) REFERENCES jurusan(kodeJurusan)
);

CREATE TABLE mataKuliah(
    kodeMatkul VARCHAR (4) NOT NULL PRIMARY KEY,
    namaMatkul VARCHAR(50) NOT NULL,
    sks INTEGER NOT NULL
);

CREATE TABLE dosen(
    nip VARCHAR(6) NOT NULL PRIMARY KEY,
    namaDosen VARCHAR(50) NOT NULL
);

CREATE TABLE rapot(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama VARCHAR(50) NOT NULL,
    nim VARCHAR(10) NOT NULL,
    kodeJurusan VARCHAR(4) NOT NULL PRIMARY KEY,
    kodeMatkul VARCHAR(4) NOT NULL,
    FOREIGN KEY (nip) REFERENCES dosen (nip), 
    nilai VARCHAR(2) NULL
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (kodeMk) REFERENCES matauliah (kodeMk),
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);
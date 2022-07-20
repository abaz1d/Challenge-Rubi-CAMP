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

CREATE TABLE dosen(
    nip VARCHAR(5) NOT NULL PRIMARY KEY,
    namaDosen VARCHAR(50) NOT NULL
);

CREATE TABLE mataKuliah(
    kodeMatkul VARCHAR (4) NOT NULL PRIMARY KEY,
    namaMatkul VARCHAR(50) NOT NULL,
    sks INTEGER NOT NULL
);

CREATE TABLE rapot(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    nim varchar(10) NOT NULL,
    kodeMatkul varchar(4) NOT NULL,
    nip varchar(6) NOT NULL,
    nilai varchar(5)NULL,
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (kodeMatkul) REFERENCES mataKuliah (kodeMatkul),
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);


INSERT INTO jurusan VALUES 
('J001', 'Fabrikasi Logam'),
('J002', 'Listrik Tenaga'),
('J003', 'Elektronika'),
('J004', 'Mekatronika'),
('J005', 'Otomotif'),
('J006', 'Informatika'),
('J007', 'Alat Berat'),
('J008', 'Gambar Bangunan'),
('J009', 'Arsitek'),
('J010', 'Gambar Bangunan');

INSERT INTO mahasiswa VALUES 
('2022070001','Abaz','Semarang','J001'),
('2022070002','Faisal','Medan','J002'),
('2022070003','Lutfi','Bali','J003'),
('2022070004','Dimas','Surabaya','J004'),
('2022070005','Ikhsan','Balikpapan','J005'),
('2022070006','Eril','Makasar','J006'),
('2022070007','Zafran','Bandung','J007'),
('2022070008','Zakka','Lampung','J008'),
('2022070009','Emir','Cianjur','J009'),
('2022070010','Eril','Makasar','J010');

INSERT INTO mataKuliah VALUES 
('MK01','gambar teknik',20),
('MK02','basic',20),
('MK03','kerja bengkel',20),
('MK04','matematika',15),
('MK05','bahasa inggris',15);

INSERT INTO dosen VALUES 
('D2201','Rubi'),
('D2202','Wildan'),
('D2203','Rizky'),
('D2204','Hilmi'),
('D2205','Bambang');

INSERT INTO rapot('nim','kodeMatkul','nip','nilai') VALUES 
('2022070001','MK01','D2201','A'),
('2022070002','MK01','D2201','A+'),
('2022070003','MK04','D2204','B'),
('2022070004','MK02','D2202','B+'),
('2022070010','MK03','D2205','A'),
('2022070009','MK04','D2204','A++'),
('2022070008','MK01','D2203','B+'),
('2022070007','MK05','D2202','A'),
('2022070006','MK04','D2204','B+'),
('2022070005','MK01','D2203','C+');
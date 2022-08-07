CREATE TABLE data(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    string VARCHAR(50) NOT NULL,
    integer INTEGER NOT NULL,
    float REAL NOT NULL,
    date DATE NOT NULL,
    boolean NUMERIC
);

INSERT INTO data('string','integer','float','date', 'boolean') VALUES 
('coba', '10', '1.45', '2020-11-01', '1'),
('lagi', '44', '1.405', '2022-09-01', '0'),
('again', '213', '91.450', '2026-11-01', '0'),
('maneh', '634', '1.555', '2000-11-19', '1');
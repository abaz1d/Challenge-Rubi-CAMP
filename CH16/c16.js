class CarFactory {
    constructor(brand1, brand2) {
        this.brand1 = brand1
        this.brand2 = brand2
        this.cars = []
    }

    static random() {
        return Math.floor(Math.random() * 10) + 1;
    }

    produksi(year) {
        let A = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car1 = new Avanza(year);

            this.cars.push(car1)
            A++;
        }

        let B = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car2 = new Sigra(year);

            this.cars.push(car2)
            B++
        }
        console.log(`Pada tahun ${year}, perusahaan ${this.brand1} memproduksi sebanyak ${A} mobil, sedangkan perusahaan ${this.brand2} memproduksi sebanyak ${B} mobil`)
    }

    static generateUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    garansi(year) {
        console.log("\nNama Produk :")

        for (let i = 0; i < this.cars.length; i++) {
            let y = year;

            if (y > (this.cars[i].garansi + this.cars[i].yearp)) {
                console.log(`\n============================================================================================`)
                console.log(`Merk: ${this.cars[i].merk} \nModel: ${this.cars[i].model} \nNomor Mesin: ${this.cars[i].mesin}`)
                console.log(`\nDengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi sudah TIDAK AKTIF, karena diproduksi pada tahun ${this.cars[i].yearp} dan sudah habis pada tahun ${this.cars[i].garansi + this.cars[i].yearp}.\n`)
            } else {
                console.log(`\n============================================================================================`)
                console.log(`Merk: ${this.cars[i].merk} \nModel: ${this.cars[i].model} \nNomor Mesin: ${this.cars[i].mesin}`)
                console.log(`\nDengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi masih AKTIF, karena diproduksi pada tahun ${this.cars[i].yearp} dan baru akan habis pada tahun ${this.cars[i].garansi + this.cars[i].yearp}.\n`)
            }

        }

    }

}

class Car {
    constructor(merk, model, yearp, gr, sit, door, trye) {
        this.merk = merk
        this.model = model
        this.yearp = yearp
        this.garansi = gr
        this.sit = sit;
        this.door = door;
        this.trye = trye;
        this.mesin = CarFactory.generateUUID()
    }
}

class Trye {
    constructor(sizeTrye, brandTrye) {
        this.size = sizeTrye;
        this.brand = brandTrye;
    }
}

class Avanza extends Car {
    constructor() {
        super('Toyota', 'Avanza', 2021, 10, 7, 5, new Trye(4, 'Bridgestone'))
    }
}

class Sigra extends Car {
    constructor() {
        super('Daihatsu', 'Sigra', 2022, 5, 7, 5, new Trye(4, 'Dunlop'))
    }
}

let comp = new CarFactory('Toyota', 'Daihatsu');
let date = (Math.floor(Math.random() * 15) + 2020)
comp.produksi(date);
comp.garansi(date)

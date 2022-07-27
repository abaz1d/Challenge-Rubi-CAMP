class CarFactory {
    constructor(brand1, brand2) {
        this.brand1 = brand1
        this.brand2 = brand2
        this.cars = []
    }

    static random() {
        return Math.floor(Math.random() * 50) + 1;
    }

    produksi(year) {
        let A = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car1 = new Avanza(year);

            this.cars.push(car1)
            A++;
        }

        let B = 0;
        for (let i = 0; i < CarFactory.random(); i++){
            const car2 = new Sigra(year);

            this.cars.push(car2)
            B++
        }
        console.log(`pada tahun ${year} perusahaan ${this.brand1} menghasilkan sebanyak ${A} mobil, sedangkan perusahaan ${this.brand2} menghasilkan sebanyak ${B} mobil`)
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
}

class Car {
    constructor(model, year, trye, sit, door) {
        this.model = model
        this.year = year
        this.sit = sit;
        this.door = door;
        this.trye = trye;
        this.mesin = CarFactory.generateUUID
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
        super('Avanza', 2020, 7, 5, new Trye(4, 'Bridgestone'))
        this.garansi = 5;
    }
}

class Sigra extends Car {
    constructor() {
        super('Sigra', 2022, 7, 5, new Trye(4, 'Dunlop'))
        this.garansi = 6;
    }
}

let crew = new CarFactory('Toyota', 'Daihatsu');
crew.produksi(2020);
// crew.garansi(2019)





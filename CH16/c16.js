class CarFactory{

}

class Car {
    constructor(model,year,trye, sit, door) {
        this.model = model
        this.year = year
        this.trye = trye;
        this.sit = sit;
        this.door = door;
    }
}

class Trye {
    constructor(sizeTrye, brandTrye) {
        this.sizeTrye = sizeTrye;
        this.brandTrye = brandTrye;
    }
}

class Avanza extends Car {
    constructor() {
        super(new Trye(4, 'King'), 7, 5,2020,'Avanza')
        this.garansi = 5;
    }
}




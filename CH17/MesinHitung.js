export const Pi = 22 / 7;

export default class MesinHitung {
    constructor(x) {
        //this.x = x
        this.x = 1
    }

    tambah(x) {
        this.x += x
        return this
    }

    kurang(x) {
        this.x -= x
        return this
    }

    bagi(x) {
        this.x /= x
        return this
    }

    ap2() {
        this.x = Math.pow(this.x, 2)
        return this
    }

    kali(x) {
        this.x *= x
        return this
    }

    squareRoot() {
        this.x = Math.sqrt(this.x)
        return this
    }

    exponent(x) {
        this.x = Math.pow(this.x, x)
        return this
    }

    result() {
        console.log(this.x)
    }
};

// y = new MesinHitung(5)
// console.log(y.ap2())
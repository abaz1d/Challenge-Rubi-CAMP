//CH7
//==============================================================

function weirdMultiply(num) {
    let arr = Array.from(String(num));

    if (arr.length == 1) {
        return num;
    } else {
        return weirdMultiply(arr.reduce((a, b) => a * b));
    }
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));
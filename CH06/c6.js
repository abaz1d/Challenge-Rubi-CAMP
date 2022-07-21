function sentenceManipulation(word) {
    // var array = []
    var string = ' '
    var x = word.split(' ');
    for (y = 0; y < x.length; y++) {
        if (x[y].charAt(0) == ('a') ||
            x[y].charAt(0) == ('i') ||
            x[y].charAt(0) == ('u') ||
            x[y].charAt(0) == ('e') ||
            x[y].charAt(0) == ('o')) {
            string += ' ' + x[y]
            //  array.push(x[y]);
        } else {
            x[y] = x[y].substring(1) + x[y].charAt(0) + 'nyo';
            //  array.push(x[y]);
            string = string + ' ' + x[y]
        }
    }
    console.log(string);
    //  console.log(array);
    // console.log(array.join(" "));
};

sentenceManipulation('ibu pergi ke pasar bersama aku');

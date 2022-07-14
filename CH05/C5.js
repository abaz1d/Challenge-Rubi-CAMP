//CH5
//==============================================================
function stringManipulation(word) {
    var x = word.toLowerCase();
       if (x.charAt(0) == ('a') ||
            x.charAt(0) == ('i') ||
           x.charAt(0) == ('u') ||
          x.charAt(0) == ('e') ||
          x.charAt(0) == ('o')) {
          console.log(word);
       } else {
          console.log(word.substring(1) + word.charAt(0) + “nyo”);
       }
    };
    
    stringManipulation('ibu pergi ke pasar bersama ku');
    stringManipulation('Bebek');
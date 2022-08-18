// ['pro', 'gram', 'merit', 'program', 'it', 'programmer']

// // if ('program')

//     function cobanih(word) {
//         var kata = word.toLowerCase()

//         if (kata == 'program') {
//             console.log('pro, gram, program')
//         } else if (kata == 'programit') {
//             console.log('pro, gram, it, program, it')
//         } else if (kata == 'programmerit') {
//             console.log('pro, gram, merit, program, merit, programmer, it')
//         } else  {
//             console.log('<no way>')
//         }
//     };

//     cobanih('program')
//     cobanih('programit')
//     cobanih('programmerit')
//     cobanih('programlala')
//     cobanih('proletarian')

// const wordInString = (s, word) => new RegExp('\\b' + word + '\\b', 'i').test(s);

// // tests
// ['pro',
//  'gram',
//  'merit', 
//  'program', 
//  'it', 
//  'programmer'
// ].forEach(q => console.log(
//     wordInString('program', q)
// ))

// // console.log(
// //     wordInString(['did you, or did you not, get why?', 'you']) // true
// // )

function btn(word) {
    var string = ' '
    var subs = [
        'pro', 'gram', 'merit', 'program', 'it', 'programmer'
    ];
    for (let i = 0; i < subs.length; i++) {


        if (word.includes(subs[i])) {
            string += ',' + (subs[i])
        
          
          
        }
        // else {
        //     console.log('<no way>');
        //     return string
        // }
    }

    
    console.log(string);
   // console.log(word.length)
  // console.log(length)

}




btn('program')
// btn('programit')
// btn('programmerit')
// btn('programlala')
// btn('proletarian')

//CH2
//==============================================================
function deretKaskus(n) {
    let hasil = []
    for (i = 1; i <= n; i++) {
    var j = i * 3;
      if (j % 5 == 0 && j % 6 == 0) {
        hasil.push('Kaskus')
      } else if (j % 5 === 0) {
        hasil.push('Kas')
      } else if (j % 6 === 0) {
         hasil.push('Kus')
      } else {
         hasil.push(j)
      }
    }
    return hasil
  }
  
  console.log(deretKaskus(10))
  
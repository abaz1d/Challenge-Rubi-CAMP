//CH4
//==============================================================

function indexPrime(param1) {
    let i, primes = [2, 3], n = 5;
    const isPrime = n => {
       let i = 1, p = primes[i],
       limit = Math.ceil(Math.sqrt(n));
       while (p <= limit) {
          if (n % p === 0) {
             return false;
          }
          i += 1;
          p = primes[i];
       }
       return true;
    }
    for (i = 2; i <= param1; i += 1) {
       while (!isPrime(n)) {
          n += 2;
       }
       primes.push(n);
       n += 2;
    };
    return primes[param1 - 1];
  }
  console.log(indexPrime(4));
  console.log(indexPrime(500));
  console.log(indexPrime(37786));
  
const AINPUT = document.getElementById("aValue"),
BINPUT = document.getElementById("bValue"),
CINPUT = document.getElementById("cValue"),
CALCULATEBUTTON  = document.getElementById("calculate-Button");

//Function that converts a string into a number

function inputValue(id) {
    //console.log(id); //Ok

    const NUM = parseInt(id.value);
    if (isNaN(NUM) == true) {
        return 0;
    } else {
        return NUM;
    }
}


//Function that prints initial quadratic function

function formQF(a, b, c) {
    var form;

    //ax²

    switch (a) {
        case 1:
            form = `x² `;
            break;
        case -1:
            form = `-x² `;
            break;
        default:
            form = `${a}x² `;
    };

    //bx

    if (b == -1) {
        form += `-x `;
    } else if (b == 1) {
        form += `+x `;
    } else if (b < 0) {
        form += `${b}x `;
    } else if (b > 0) {
        form += `+${b}x `;
    };

    //c

    if (c < 0) {
        form += `${c} `;
    } else if (c > 0) {
        form += `+${c} `;
    };

    form += `= 0`;
    return form;
};

//console.log(formQF(2, 4 , -6)); //Ok


//Function that calculates the great common divisor

function gcd(m, n) {
    let module = m % n;
    while (module != 0) {
        m = n;
        n = module;
        module = m % n;
    }
    return n;
}

//console.log(gcd(60,144)); /* to test */
//console.log(gcd(12, gcd(144, gcd (6, 32)))); /* to test */


//Function that returns a number as a product of prime numbers

function factorization(num) {

    //    console.log(num); //Ok

    var factors = [], arr = [];
    while (num > 1) {
        for (let i = 2; i <= num; i++) {
            if (num % i == 0) {
                factors.push(i);
                num /= i;
                break;
            }
        }
    }

    //    console.log(factors); //Ok

    let i = 0;
    while (i < factors.length) {
        let j = factors[i], occurrences;
        occurrences = factors.lastIndexOf(j) - factors.indexOf(j) + 1;
        arr.push([j, occurrences]);
        i = factors.lastIndexOf(j) + 1;
    }

    //    console.log(arr); //Ok

    return arr;
}

//console.log(factorization(242)); //Ok


// Function that simplifies a square root

function rootSimplifier(num) {
    let arr = factorization(num), intPart = 1, radicandPart = 1, finalNum;

    //    console.log(arr); //Ok

    for (let i of arr) {
        //        console.log(i); //Ok
        //        console.log(i[0]); //Ok

        let exponent = i[1];

        //        console.log(exponent); //Ok

        if (exponent >= 2) {
            intPart *= (i[0] * Math.floor(exponent / 2));
            if (exponent % 2 != 0) {
                radicandPart *= i[0];
            }
        } else {
            radicandPart *= i[0];
        }
    }

    //    console.log(`${intPart}\u221A${radicandPart}`); //Ok

    finalNum = [intPart, radicandPart];
    return finalNum;
}

//console.log(rootSimplifier(124)); //Ok


//Function that calculates x value(s)

function quadraticFunction(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c) || a == 0) {
        return "This is NOT a quadratic function!"
    }
    let aa = 2 * a;
    const DELTA = b ** 2 - 4 * a * c,
    DELTAROOT = Math.sqrt(DELTA);
    b = -b
    if (DELTA < 0) {
        return ("This quadratic function don't have any real value.")
    } else if (DELTA == 0) {
        if (b % aa == 0) {
            return `x = ${b / aa}`;
        } else {
            const GCD = gcd(b, aa);
            if (GCD != 1) {
                b /= GCD;
                aa /= GCD;
            }
            if (aa < 0) {
                aa = -aa;
                b = -b;
            }
            return `x = ${b}/${aa}`;
        }
    } else {
        let x1, x2;
        if (Number.isInteger(DELTAROOT) === true) {
            let numerator1 = b - DELTAROOT, numerator2 = b + DELTAROOT
            if (numerator1 % aa == 0) {
                x1 = `${numerator1 / aa}`;
            } else {
                const GCD1 = gcd(numerator1, aa);
                if (aa < 0) {
                    aa = -aa;
                    numerator1 = -numerator1
                    numerator2 = -numerator2;
                }
                if (GCD1 != 1) {
                    numerator1 /= GCD1;
                    aa /= GCD1;
                }
                x1 = `${numerator1}/${aa}`;
            }
            if (numerator2 % aa == 0) {
                x2 = numerator2 / aa;
            } else {
                const GCD2 = gcd(numerator2, aa);
                if (GCD2 != 0) {
                    numerator2 /= GCD2;
                    aa /= GCD2;
                }
                x2 = `${numerator2}/${aa}`;
            }
        } else {
            const DELTAROOTSIMPLIFIED = rootSimplifier(DELTA);
            let intDeltaPart = DELTAROOTSIMPLIFIED[0],
            irrationalDeltaPart = DELTAROOTSIMPLIFIED[1];
            const GCD = gcd(intDeltaPart, aa);

//            console.log(DELTAROOTSIMPLIFIED); /*to test*/

            if (b == 0) {
                if ((intDeltaPart % aa) == 0) {
                    intDeltaPart /= aa;
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `-\u221A${irrationalDeltaPart}`;
                        x2 = `\u221A${irrationalDeltaPart}`;
                    } else {
                        x1 = `${-intDeltaPart}\u221A${irrationalDeltaPart}`;
                        x2 = `${intDeltaPart}\u221A${irrationalDeltaPart}`;
                    }
                } else {
                    if (GCD != 1) {
                        intDeltaPart /= GCD;
                        aa /= GCD;
                        //PS: aa will be != 1 and != -1, because GCD will be != aa
                    }
                    if (aa < 0) {
                        aa = -aa;
                        intDeltaPart = -intDeltaPart;
                    }
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `-(\u221A${irrationalDeltaPart})/${aa}`;
                        x2 = `(\u221A${irrationalDeltaPart})/${aa}`;
                    } else {
                        x1 = `${-intDeltaPart}\u221A(${irrationalDeltaPart})/${aa}`;
                        x2 = `${intDeltaPart}\u221A(${irrationalDeltaPart})/${aa}`;
                    }
                }
            } else {
                const GCDB = gcd(GCD, b);

//                console.log(b, intDeltaPart, aa, GCDB); //Ok

                if (GCDB != 1) {
                    intDeltaPart /= GCDB;
                    aa /= GCDB;
                    b /= GCDB;
                }

//                console.log(b, intDeltaPart, aa); //Ok

                if (aa < 0) {
                    aa = -aa;
                    b = -b;
                    intDeltaPart = -intDeltaPart;
                }

//                console.log(b, intDeltaPart, aa); //Ok

                if (aa == 1) {
                    if (intDeltaPart == -1 || intDeltaPart == 1) {
                        x1 = `${b} -\u221A${irrationalDeltaPart}`;
                        x2 = `${b} +\u221A${irrationalDeltaPart}`;
                    } else {
                        if (intDeltaPart < 0) {
                            intDeltaPart = -intDeltaPart;
                        }
                        x1 = `${b} ${-intDeltaPart}\u221A${irrationalDeltaPart}`;
                        x2 = `${b} + ${intDeltaPart}\u221A${irrationalDeltaPart}`;
                    }
                } else {
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `(${b} -\u221A${irrationalDeltaPart})/${aa}`;
                        x2 = `(${b} +\u221A${irrationalDeltaPart})/${aa}`;
                    } else {
                        if (intDeltaPart > 0) {
                            intDeltaPart = -intDeltaPart
                        }
                        x1 = `(${b} ${-intDeltaPart}\u221A${irrationalDeltaPart})/${aa}`;
                        x2 = `(${b} +${intDeltaPart}\u221A${irrationalDeltaPart})/${aa}`;
                    }
                }
            }
        }
        return `x' = ${x1}, x" = ${x2}`;
    }
}


//Function that calls the others

function calculate() {
    const A = inputValue(AINPUT),
    B = inputValue(BINPUT),
    C = inputValue(CINPUT),
    RESULTDIV = document.getElementById("resultPrinting");
    if (A != 0) {
        document.getElementById("functionPrinting").innerHTML = formQF(A, B, C);
        RESULTDIV.innerHTML = quadraticFunction(A, B, C);
    } else {
        RESULTDIV.innerHTML = "In a quadratic function \"a\" must be a number NOT equal 0!";
    }
}


//Test function

/* (function (a, b, c) {
    console.log(`${formQF(a, b, c)}\n${quadraticFunction(a, b, c)}`);
})(-2, 2, 18); //Ok */


//Functions that change

AINPUT.onkeydown = (e) => {
    if (e.keyCode == 13) {
        BINPUT.focus();
        BINPUT.value = "";
        return false;
    }
}

BINPUT.onkeydown = (e) => {
    if (e.keyCode == 13) {
        CINPUT.focus();
        CINPUT.value = "";
        return false;
    }
}

CINPUT.onkeydown = (e) => {
    if (e.keyCode == 13) {
        calculate();
    }
}

CALCULATEBUTTON.onclick = () => {
    calculate();
    return false;
}
//Function that prints initial quadratic function

function formQF(a, b, c) {
    let form = "y = ";

    //ax²

    switch (a) {
        case 1:
            form += `x\u00B2 `;
            break;
        case -1:
            form += `-x\u00B2 `;
            break;
        default:
            form += `${a}x\u00B2 `;
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

    return form;
};


//Function that calculates the great common divisor

function gcd(m, n) {
    let module = m % n;
    if (module != 0) {
        return gcd(n, module)
    } else {
        return Math.abs(n);
    }
}


//Function that returns a number as a product of prime numbers

function factorization(num) {
    const FACTORS = [], ARR = [];
    while (num > 1) {
        for (let i = 2; i <= num; i++) {
            if (num % i == 0) {
                FACTORS.push(i);
                num /= i;
                break;
            }
        }
    }
    let i = 0;
    while (i < FACTORS.length) {
        let j = FACTORS[i], occurrences;
        occurrences = FACTORS.lastIndexOf(j) - FACTORS.indexOf(j) + 1;
        ARR.push([j, occurrences]);
        i = FACTORS.lastIndexOf(j) + 1;
    }
    return ARR;
}


// Function that simplifies a square root

function rootSimplifier(num) {
    const ARR = factorization(num);
    let intPart = 1, radicandPart = 1;
    for (let i of ARR) {
        let exponent = i[1];
        if (exponent >= 2) {
            intPart *= (i[0] ** Math.floor(exponent / 2));
            if (exponent % 2 != 0) {
                radicandPart *= i[0];
            }
        } else {
            radicandPart *= i[0];
        }
    }
    return [intPart, radicandPart];
}


//Function that calculates x value(s)

function quadraticFunction(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c) || a == 0) {
        throw "In a quadratic function \"a\", \"b\" and \"c\" must be numbers, and \"a\" must be NOT equal 0!"
    }
    if (a < 0) {
        a = -a;
        b = -b;
        c = -c;
    }
    let aa = 2 * a,
        aaaa = 4 * a,
        x;
    const DELTA = b ** 2 - 4 * a * c,
        DELTAROOT = Math.sqrt(DELTA);
    b = -b
    const GCDX = gcd(b, aa),
        GCDY = gcd(DELTA, aaaa),
        VERTEXX = (b % aa == 0) ? `${b / aa}` : `${b / GCDX}/${aa / GCDX}`,
        VERTEXY = (-DELTA % aaaa == 0) ? `${-DELTA / aaaa}` : `${-DELTA / GCDY}/${aaaa / GCDY}`,
        VERTEX = `(${VERTEXX}, ${VERTEXY})`;
    if (DELTA < 0) {
        x = "This quadratic function don't have any real value.";
    } else if (DELTA == 0) {
        x = `x = ${VERTEXX}`;
    } else {
        let x1, x2;
        if (Number.isInteger(DELTAROOT) === true) {
            let numerator1 = b - DELTAROOT, numerator2 = b + DELTAROOT
            if (numerator1 % aa == 0) {
                x1 = `${numerator1 / aa}`;
            } else {
                const GCD1 = gcd(numerator1, aa);
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
            let intDeltaPart = DELTAROOTSIMPLIFIED[0];
            const IRRATIONALDELTAPART = DELTAROOTSIMPLIFIED[1],
                GCD = gcd(intDeltaPart, aa);

            if (b == 0) {
                if ((intDeltaPart % aa) == 0) {
                    intDeltaPart /= aa;
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `-\u221A${IRRATIONALDELTAPART}`;
                        x2 = `\u221A${IRRATIONALDELTAPART}`;
                    } else {
                        x1 = `${-intDeltaPart}\u221A${IRRATIONALDELTAPART}`;
                        x2 = `${intDeltaPart}\u221A${IRRATIONALDELTAPART}`;
                    }
                } else {
                    if (GCD != 1) {
                        intDeltaPart /= GCD;
                        aa /= GCD;
                        //PS: aa will be != 1 and != -1, because GCD will be != aa
                    }
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `-(\u221A${IRRATIONALDELTAPART})/${aa}`;
                        x2 = `(\u221A${IRRATIONALDELTAPART})/${aa}`;
                    } else {
                        x1 = `${-intDeltaPart}\u221A(${IRRATIONALDELTAPART})/${aa}`;
                        x2 = `${intDeltaPart}\u221A(${IRRATIONALDELTAPART})/${aa}`;
                    }
                }
            } else {
                const GCDB = gcd(GCD, b);
                if (GCDB != 1) {
                    intDeltaPart /= GCDB;
                    aa /= GCDB;
                    b /= GCDB;
                }
                if (aa == 1) {
                    if (intDeltaPart == -1 || intDeltaPart == 1) {
                        x1 = `${b} -\u221A${IRRATIONALDELTAPART}`;
                        x2 = `${b} +\u221A${IRRATIONALDELTAPART}`;
                    } else {
                        if (intDeltaPart < 0) {
                            intDeltaPart = -intDeltaPart;
                        }
                        x1 = `${b} ${-intDeltaPart}\u221A${IRRATIONALDELTAPART}`;
                        x2 = `${b} + ${intDeltaPart}\u221A${IRRATIONALDELTAPART}`;
                    }
                } else {
                    if (intDeltaPart == 1 || intDeltaPart == -1) {
                        x1 = `(${b} -\u221A${IRRATIONALDELTAPART})/${aa}`;
                        x2 = `(${b} +\u221A${IRRATIONALDELTAPART})/${aa}`;
                    } else {
                        x1 = `(${b} ${-intDeltaPart}\u221A${IRRATIONALDELTAPART})/${aa}`;
                        x2 = `(${b} +${intDeltaPart}\u221A${IRRATIONALDELTAPART})/${aa}`;
                    }
                }
            }
        }
        x = `x' = ${x1}, x" = ${x2}`;
    }
    return [x, VERTEX];
}


//Test function

/* void function (a, b, c) {
    try {
        console.log(`${formQF(a, b, c)}\n${quadraticFunction(a, b, c)[0]}`);
    } catch (e) {
        console.warn(e)
    }
}(-2, -8, 16); //Ok */
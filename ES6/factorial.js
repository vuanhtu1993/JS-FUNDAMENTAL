//Version 1 :
var m = new Map();

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    if (m.has(n)) {
        return m.get(n);
    }
    console.log(`No value for ${n}`);
    m.set(n, n * factorial(n - 1));
    return m.get(n);
};
factorial(4);

//Version 2:
function memorized(fn) {
    var m = new Map();

    return function (n) {
        if (m.has(n)) {
            return m.get(n);
        }
        console.log(`No values for ${n}`);
        m.set(n, fn(n));
        return m.get(n);
    }
}

var factorial = memorized(function (n) {
    if (n <= 1) {
        return 1;
    }
    return n * fac(n - 1);
});

factorial(4);
factorial(5);



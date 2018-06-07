//Custom Object Iterator Example:

var o = {
    start: 1,
    end: 10,
    [Symbol.iterator]() {
        var done = false;
        var id = this.start;
        var end = this.end;
        return {
            next: function () {
                if (!done) {
                    if (id > end) {
                        done = true;
                    }
                    return {value: (id = id + 2), done: false};
                } else {
                    return {value: undefined, done: true};
                }
            }
        };
    }
};

//[...o];

for (var v of o) {
    console.log(v);
}
//Custom Object Iterator(using Generator):

var o = {
    start: 1,
    end: 10,
    * [Symbol.iterator]() {
        for (let i = this.start; i < this.end; i = i + 2) {
            yield i;
        }
    }
};

//[...o];

for (var v of o) {
    console.log(v);
}
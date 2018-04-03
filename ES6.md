# 1 ES 6
## 1.1 Reference:
### 1.1.1 ES6: http://blog.thefirehoseproject.com/posts/12-reasons-es6-future-javascript-web-development/
### 1.1.2 ES6 Features
    1 (https://github.com/lukehoban/)
    2 (http://es6-features.org/#Constants)
### 1.1.3 JS Engines: https://developer.telerik.com/featured/a-guide-to-javascript-engines-for-idiots/
### 1.1.4 Transpilers: https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them
## 1.2 History
### 1.2.1 What's is ECMAScript ? <br>
ECMAScript là bộ đặc tả tiêu chuẩn dành cho Javascript do Hiệp hội các nhà sản xuất máy tính Châu Âu đề xuất. Phiên bản ECMAScript phổ biến hiện nay là ECMAScript 5(ES5) được hầu hết các trình duyệt hỗ trợ. Phiên bản tiếp theo của ES5 là ES6 được ra đời năm 2015 đang dần được phổ biến do có nhiều ưu điểm hơn phiên bản trước đó.
### 1.2.2 What is JavaScript Engine ? Can you name a few JavaScript Engine used in some popular Browsers such as Chrome, Firefox, IE
* Như một máy ảo Virtual Machine để compiled (từ source code => mã máy) cho Browser hiểu và thực thi code JS
* Một số Javascript engine trên các trình duyệt là:
  - Chrome: Engine V8.
  - Firefox: Spidermonkey.
  - IE: Chakra.
  - Safari: JavascriptCore.
### 1.2.3 What is Future JavaScript ? <br>
Javascript là ngôn ngữ lập trình để tạo ra các trang web có tính tương tác và sử dụng hầu hết trong các trang web. Hiện nay Javascript có thể dùng để viết server với NodeJS hay front end với các framework phổ biến bây giờ như Angular, ReactJS, Vue.js. Ngoài ra ta có thể dùng Javascript để viết app mobile hay app desktop với các framework như PhoneGap, React Native, Electron.
### 1.2.4 What is problem you have if you want to use Future JavaScript in Present Browsers? <br>
Hầu hết các trình duyệt đã hỗ trợ chuẩn ES5. Tuy nhiên những phiên bản mới hơn như ES6 thì chưa được một số trình duyệt được hỗ trợ.
### 1.2.5 What is transpiler ? <br>
Transpiler là một trình biên dịch chuyển đổi code của ngôn ngữ lập trình này sang ngôn ngữ lập trình khác. Ví dụ Google Web Toolkit chuyển đổi Java code sang Javascript.
### 1.2.6 What is Babel ? Try Babel online here: https://babeljs.io/repl/ <br>
Do ES6 mới ra đời trong năm 2015 nên nó chưa được hỗ trợ hoàn toàn trên tất cả các trình duyệt vì vậy Babel giúp ta chuyển đổi Javascript ES6 sang Javascript ES5.
## 1.3 Arrow Function
### 1.3.1 Arrow Function syntax ?
- Có nhiều biến dạng hơn,
    ```
    var getId = (v) => {
        console.log(v.id) // bên trong dấu {} là một statement
    }

    Biến dạng 1:
    var getId = (v) => console.log(v.id); // trong consice body là một expression
    Biến dạng 2:
    var getId = v => console.log(v.id)
    Biến dạng 3: return object
    var getId = v => ({ id: 10});
    ```
- Điểm bất lợi của arrow function
    ```
    1. arrow function là một anonymous function và cũng như không thể đặt tên cho nó
    nên dẫn đến lỗi thì không biết lỗi ở đâu
    2. this của arrow function là tĩnh
    2. this của arrow function sẽ ăn theo this của thằng cha nó, nếu thằng cha nó là arrow function thì nó lại phụ thuộc vào thằng
    cha trên nữa của nó
    ```
- Điểm lợi của anonymous function
    ```
    1. Ngắn ngọn hơn
    2. This đc xác định tại nơi hàm đc khai báo
    3. var obj = {
         a: 10,
         method: function method() {
           setTimeout(function () {
               console.log(this.a);
           }, 200);
         }
       }
       /*
       1. có thể dùng 3 cách như sau: var that = this; dùng closure
       2. có thể dùng bind, call, apply
       3. có thể dùng arrow function
       */
    ```
### 1.3.2 Compare arrow function syntax to ES5 function syntax ? <br>
Arrow function giúp code nhìn tường minh và ngắn gọn hơn.
```
//ES5
function sayHello(name) {
    console.log("Xin chào " + name);
}
sayHello('Linh');

//ES6
var hello = (name) => console.log("Xin chào " + name);
hello('Linh');
```
Khắc phục được các vấn đề của con trỏ this.
```
var person = {
  firstName: 'Linh',
  friends : ['Minh', 'Sang', 'Khoa', 'Hoang'],
  showFriend: function() {
    this.friends.forEach(function(fr) {
      console.log(this.firstName + ' have a friend named ' + fr); // this trỏ đến object windows
    });
    this.friends.forEach(fr => console.log(this.firstName + ' have a friend named ' + fr));  // this trỏ đến object person.
  }
};
```
### 1.3.3 Arrow function variations, try them in Babel Repl, fix error if any
```
const f1 = () => 10;
const f2 = x  => 3;
const f3 = (...x) => 3;
const f4 = (x, y) => 3;
const f5 = x => {
  try {
    1;
  } catch (e) {}
}
const f6 = x => { return 10; }
const f7 = x => { y: x }
```
### 1.3.4 True or false: arrow functions are anonymous ?
```
const myFunc = x => 4;
console.log(myFunc.name);
```
Arrow functions là biểu thức hàm
### 1.3.5 this
Evaluate the code below, can you explain what happens ?
```
var obj = {
  a: 10,
  method: function method() {
    setTimeout(function () {
        console.log(this.a);
    }, 200);
  }
}

var obj2 = {
  a: 10,
  method: function method() {
    setTimeout(() => {
        console.log(this.a);
    }, 200);
  }
}

obj.method();  // undefined
obj2.method(); // 10
```
this trong object obj không trỏ đến obj mà trỏ đến object windows nhưng ở windows không có a nên giá trị trả về là undefined.
this trong object obj2 trỏ đến obj2 mà trong obj có a = 10 nên giá trị trả về là 10.
### 1.3.6 Promise
Compare 2 Promise call below, what do you think ? If v is null or undefined what will happend ? How you handle that ?
```
p.then(function (v) { return v.id });

p.then(v => v.id);
```

### 1.3.7 Exercise 01: rewrite all function below with arrow functions and try to avoid curly braces {} as much as possible
    ```
    (function iife(){

      function foo(x) {
        var y = x * 2;

        return function bar(z) {
          if (z.length > 3) {
            return z.map( function baz(v){
              if (v > 3) return v + y;
              else return baz( v * 4 );
            } );
          }
          else {
            var obj = [];

            setTimeout( function bam(){
              obj.length = 1;
              obj[0] = this.w;
            }.bind( this ), 100 );

            return obj;
          }
        };
      }

      var p = foo( 2 ); // INVOKE FOO
      var list1 = [1,3,4];
      var list2 = list1.concat( 6 );

      list1 = p.call( { w: 42 }, list1 ); // INVOKE BAR CÓ GÁN THIS BẰNG { w: 42 }
      list2 = p( list2 ); // INVOKE BAR KO GÁN THIS

      setTimeout( function(){
        console.log( list1[0] === list2.reduce( function(s,v){
          return s + v;
        }, 0 ) );
      }, 200 );
    })();
    ```
## 1.4 Block Scope
### 1.4.1 Compare let and var <br>
```var``` tạo ra biến có phạm vi truy cập xuyên suốt function chứa nó. ```let``` tạo ra một biến chỉ có thể truy cập được trong block bao quanh nó(bên trong dấu {}).
```
//var

function a() {
   var x = 10;
   if (true) {
      var x = 20;
      console.log(x); // 20
   }
   console.log(x); // 20
}

//let

function b() {
   let x = 10;
   if (true) {
      let x = 20;
      console.log(x); //20
   }
   console.log(x); // 10
}
```
### 1.4.2 Closures scope, how do let work in closures, try example below
```
for (let i = 0; i < 3; i++) {
  let btn = document.getElementById('btn' + i);
  btn.addEventListener('click', () {
    alert(i);
  });
}
```
Khi click vào button có id là btn0 thì xuất hiện hộp thoại hiển thị 0. Tương tự như vậy với btn1 và btn2 sẽ hiện hộp thoại lần lượt là 1 và 2.
### 1.4.3 What is const ? Example ?
```const``` dùng để khởi tạo một hằng số, không thể thể gán lại.
```
const a = 2;
console.log( a );    // 2

a = 3;                // TypeError!
```
### 1.4.4 Exercise: fix code below (anywhere) so the console.log will display true
```
var x = 2, fns = [];

(function(){
  var x = 5;

  for (var i=0; i<x; i++) {
  }
})();

console.log((x * 2) === fns[x*2]()); // must be true
```
```
var x = 2, fns = [];

(function(){
  var x = 5;

  for (var i=0; i<x; i++) {
	fns.push(i);
  }
})();
console.log((x * 2) === fns[x*2]);
```
### 1.4 Classes {#sec-1-4}

#### 1.4.1 Provide an example to create a new classed named Person which have 2 fields: **id**, **name** and 1 method: **sayHello** which print hello to the console {#sec-1-4-1}

#### 1.4.2 What is keyword **extends** and **super**, provide an example that used both keyword ? {#sec-1-4-2}

#### 1.4.3 Consider the following code, what will be printed out? {#sec-1-4-3}

```
class Cha {
  constructor() { this.id = 'a' }
  method() {
    console.log('Cha', this.id)
  }
}

class Con extends Cha {
  method() {
    super.method();
    console.log('Con', this.id)
  }
}
```

#### 1.4.4 What is static keyword ? {#sec-1-4-4}
    ```
    Static là từ khóa đứng trước một method đc định nghĩa trong class mà tại đó class có thể gọi
    được phương thức static đó ()
    ```

### 1.5 Block Scope: let + const {#sec-1-5}

    ```
    Giống nhau: Đều để khai báo biến, có giá trị trong block scope

    Khác nhau: const phải đc khai báo giá trị ban đầu và không được gán lại
                let ko cần khai báo giá trị ban đầu và được gán lại đc
    ```

#### 1.5.1 Compare let and var {#sec-1-5-1}

    ```
    Giống nhau: Khai báo biến

    Khác nhau:  let không có hoisting, chỉ đc truy xuất trong block scope
                var có hoisting, có thể đc khai báo ngoài block scope
    ```

#### 1.5.2 Closures scope, how do let work in closures, try example below {#sec-1-5-2}

``` {.src .src-js}
for (let i = 0; i < 3; i++) {
  let btn = document.getElementById('btn' + i);
  btn.addEventListener('click', () {
    alert(i);
  });
}

- khó debug do ....
```

#### 1.5.3 What is const ? Example ? {#sec-1-5-3}

#### 1.5.4 Exercise: fix code below (anywhere) so the console.log will display true {#sec-1-5-4}

``` {.src .src-js}
var x = 2, fns = [];

(function(){
  var x = 5;

  for (var i=0; i<x; i++) {
  }
})();

console.log((x * 2) === fns[x*2]()); // must be true
```



### 1.6 Default Values and the Gather/Spread Operator {#sec-1-6}

#### 1.6.1 Default Values: how to define a functon with default value in ES6 ? And in ES6 ? {#sec-1-6-1}

#### 1.6.2 Lazy expression, evaluate the following code, how many times g have been called ? {#sec-1-6-2}

```
function g() {
  console.log('g');
}

function f(x = g()) {
}

f(1);
f();
f();
```

#### 1.6.3 Evaluate the following code {#sec-1-6-3}

    ```
    var x = 1;

    function f(x = 2, fn = function() { return x }) {
      console.log(fn());
    }

    f();

    Pay attention: scope của hàm trong js phụ thuộc vào nơi nó được định nghĩa
    ```

#### 1.6.4 What's a variadic arguments? {#sec-1-6-4}

    ```
    function abc() {
        console.log(arguments);
        console.log(Array.isArray(arguments));
        const a = [].slice.call(argumnets);
        return
    }
    ```

#### 1.6.5 What is **arguments** in a JavaScript function ? {#sec-1-6-5}

#### 1.6.6 **…** operator can be used in 2 differents ways, see code below: {#sec-1-6-6}

```
Khai báo:
function g(...args) {
    args = [1,2,3,4];
    console.log(...args); // 1,2,3,4
}
g(1, 2, 3, 4)
function f(...args) { // gather arguments (gán vì đc khai báo trong param của hàm) giá trị từ tham số vào biến
}

var x = [1, 2, 3];
var y = [4, 5];
var z = [0, ...x, ...y ]; // spread out, (giá trị) tách từng phần tử trong mảng ra thành từ phần tử riêng biệt
```

#### 1.6.7 In which way the **…** operator is used in following code {#sec-1-6-7}

```
function g(...arr) { // ???
}

var a = [1, 2, 3];
var b = [4, 5, 6];

g(...a, ...b); // ???
```

#### 1.6.8 Exercise: fix the following code so console.log will print **true** {#sec-1-6-8}

    ```
    function f() { }

    function g() {
      var a1 = [2, 4];
      var a2 = [6, 8, 10, 12];

      return f();
    }

    console.log(g().join("") === "281012"); // must print true
    ```
- Bài giải
    ```
    g().join tuc la trước join phải là một array và
    ```

### 1.7 Destructuring (Generator => destructoring => arrow => class)
1. Gán giá trị cho mảng
2. Bỏ qua nó (dump)
3. Constructor tiếp, lấy giá trị của nó
4. Miểu tả cấu trúc của array + lấy giá trị của mảng (phù hợp với khi lấy API về, lấy giá trị )
5. Bản chất để lấy giá trị của tham số truyền vào (xây dụng theo đúng cấu trúc của dữ liệu truyền vào)

#### 1.7.1 What is destructuring ?
    ```
    // ES5
    var arr = [1,2,3,4];
    var a = arr[1]
    var b = arr[2]
    var c = arr[3]
    var d = arr[4]

    // ES6
    var [a = 2,b = 1,c,d] = arr
    ```

#### 1.7.2 Can you use destructuring and default values together ? Provide example?
    ```
    Có thể vừa phân tán vừa gán giá trị ban đầu
    function f({ a: x, b: y, c: { d: z } = {} }) {
        console.log(x, y, z)
    }

    var obj = {
        a: 20,
        b: ,
        c: {
            d: "object"
        }
    }
    f(obj) // 20, undefined, object
    ```

#### 1.7.3 Dumping values: provide example that extract the 3rd element in an array and don't care about the 1st, 2nd element ? Provide example that swap 2 numbers ?

    ```
     var arr = [1,2,3]
     var [x, y] = arr; console.log(x, y) // 1, 2 dumping 3
     [x, y] = [y, x];
    ```

#### 1.7.4 Nested Array Destructuring: in case we have an array like this [[1, 2], [3, 4], [5, 6]] use destructuring to extract the number 1 to variabled called **a** {#sec-1-7-4}

#### 1.7.5 Object Destructuring: provide an example that use destructuring to extract property in an object ? {#sec-1-7-5}

```
function f() {
    return {
        d : 1,
        e : 2,
        f : 3,
    }
}
// ES6
var obj = f();
var {d: a, e: b, d: f} = obj;

Quan trong: được sử dụng cả 3 tính chất của deconstoring

function fn([ x, y ]) { // trong ngữ cảnh khai báo
   console.log(x, y)
}
function fn([ x, y ] = []) { // trong ngữ cảnh khai báo và gán default value
   console.log(x, y)
}

function f({ a,b,c }) {
    console.log(a,b,c) // trường hợp này được hiểu là f({ a: a, b: b, c: c })
}
f({})

var { a } = {};
var { a = 10 } = {};
object destructoring để sử dụng argument (để gán cho param cos ten cụ thẻ =>  không bị truyền sai param)
```

#### 1.7.6 Nested Object Destructuring: in case we have an object like this { nested: { a: 10 } }, provide an example that use destructuring to extract value of **a** in inside nested object {#sec-1-7-6}



#### 1.7.7 Destructuring and Function Parameters: consider the array destructuring for parameters what will be printed out ? {#sec-1-7-7}
    ```
    function fn([ x, y ]) {
      console.log(x, y);
    }

    fn([ 1, 2 ]); // ??
    fn([ 1 ]); // ??
    fn([ ]); // ??
    ```

    #### 1.7.8 Exercise: practice object destructuring, object constructuring {#sec-1-7-8}

    ``` {.src .src-js}
    function ajax(url,cb) {
      // fake ajax response:
      cb({
        foo: 2,
        baz: [ 6, 8, 10 ],
        bam: {
          qux: 12
        }
      });
    }

    function check(data) {
      console.log(
        56 === (
          data.foo +
          data.bar +
          data.baz[0] + data.baz[1] + data.baz[2] +
          data.bam.qux +
          data.bam.qam
        )
      );
    }

    var defaults = {
      foo: 0,
      bar: 4,
      bam: {
        qux: 0,
        qam: 14
      }
    };

    function response(/* TODO: object destructuring */) {

      check({
      /* TODO: object constructuring */
      });

    }

    ajax("http://fun.tld",response);
    ```
- Bài giải

    ```
    function ajax(url,cb) {
          // {} trong callback là obj thông thường
          cb({
            foo: 2,
            baz: [ 6, 8, 10 ],
            bam: {
              qux: 12
            }
          });
        }

        function check(data) {
          console.log(
            56 === (
              data.foo +
              data.bar +
              data.baz[0] + data.baz[1] + data.baz[2] +
              data.bam.qux +
              data.bam.qam
            )
          );
        }

        var defaults = {
          foo: 0,
          bar: 4,
          bam: {
            qux: 0,
            qam: 14
          }
        };

        // {} trong response là destructuring theo kiểu assign
        function response({
         foo,
         baz: [...a],
         bam: {
           qux
         }
        }) {
          check({
             foo,
             baz: [...a],
             bar =\ defaults.bar,
             bam: {
               qux,
               qam = default.bam.qam,
             }
          });

        }

        ajax("http://fun.tld",response);
    ```

### 1.8 Object Literal Extensions {#sec-1-8}

#### 1.8.1 Concise properties: consider the following code what do you think ? {#sec-1-8-1}

``` {.src .src-js}
var x = 2, y = 3;
var o1 = {
  x: x,
  y: y
}

var o2 = {
  x,
  y
}
console.log(o1); // ??
console.log(o2); // ??
```

#### 1.8.2 Concise Methods: consider the following code what do you think ? {#sec-1-8-2}

``` {.src .src-js}
var o1 = {
  x: function() {
    console.log('o1.x');
  },
  y: function() { }
}

o1.x();

var o2 = {
  x() {
     console.log('o2.x');
  },
  y() {}
}
o2.x();
```

#### 1.8.3 ES5 Getter/Setter: consider the following code {#sec-1-8-3}

``` {.src .src-js}
var o = {
  _id: 10,
  get id() { return this._id++; },
  set id(v) { this._id = v; }
}

o.id; // ??
o.id = 100;
o.id; // ??
```

### 1.9 Template Strings {#sec-1-9}

#### 1.9.1 Template Strings: what is template strings ? {#sec-1-9-1}

#### 1.9.2 Consider this code below, rewrite it using ES6 template string {#sec-1-9-2}

``` {.src .src-js}
var name = 'That Duy';
var chaoDuy = 'Hello ' + name + '!';

console.log(chaoDuy);
console.log(typeof chaoDuy);
```

#### 1.9.3 Interpolated Expression: can we use function inside **\${…}** if yes provide an example {#sec-1-9-3}

#### 1.9.4 Tag Functions: consider the code below {#sec-1-9-4}

``` {.src .src-js}
function f(strings, ...values) {
  console.log(strings);
  console.log(values);
}

var s = 'Fresher Academy';
f`Hello ${s}`; // ??
```

#### 1.9.5 Exercise {#sec-1-9-5}

``` {.src .src-js}
function upper(strings,...values) {
  // TODO
}

var name = 'Nguyen Van A',
  account = 'anv',
  classname = 'Fresher Academ ES6';

console.log(
  `Hello ____ (@____), welcome to the ____!` ===
  'Hello NGUYEN VAN A (@ANV), welcome to the FRESHER ACADEMY ES6!'
);
```

### 1.10 Modules {#sec-1-10}

#### 1.10.1 What is module pattern ? {#sec-1-10-1}

#### 1.10.2 What is ES6 import/export ? {#sec-1-10-2}

#### 1.10.3 What is export default ? How to import a exported default function ? {#sec-1-10-3}

#### 1.10.4 Circular Module Dependency: A imports B, B imports A, how does this work ? {#sec-1-10-4}

### 1.11 Module Loaders {#sec-1-11}

### 1.12 Collections {#sec-1-12}

#### 1.12.1 Map: what is Map in JS ? How to iterate a Map ? How to get a value ? How to set a value ? How to know if a value is in Map ? {#sec-1-12-1}
```
var o = {}
var x = { id: 1}
var y = { id: 2}
o.x = "Duy";
o.y = "Khue";
nhưng khi chuyển về kiểu string lại trở thành x.toString = [object Object] => lỗi ghi đè
=> sinh ra Map đẻ giải quyết case này
=> Lưu cache trong nhưng phép tính yêu cầu tính toán nhiều
VD dãy Fibonacy
var m = new Map()
function fina()
if(m.has(n-1)) {
    return n * m.get(n-1);
}
m.set(n, n * factorial(n - 1));
return m.get(n);
```
#### 1.12.2 Set: what is Set in JS ? How to iterate a Set ? How to get a value ? How to set a value ? How to know if a value is in Set ?
```
Là một collection chứa các thành phần là unique
```

#### 1.12.3 Weakmap same question like Map ? What is the difference between Map vs Weakmap
```
Liên quan đến garbage collector, cơ chế mất reference đến dữ liệu thì những dữ liệu đó là rác

```

#### 1.12.4 Weakset same question like Set ? What is the difference between Set vs WeakSet {#sec-1-12-4}

### 1.13 Proxies {#sec-1-13}

### 1.14 Promises {#sec-1-14}

### 1.15 Math + number + string + array + objects {#sec-1-15}

#### 1.15.1 Array add **of(..)**, **from(..)\*** and **fill(..)**. Provide example using them {#sec-1-15-1}

#### 1.15.2 Provide example using **Object.is** and **Object.assign** {#sec-1-15-2}

#### 1.15.3 Provide example using **String.repeat** and **String.includes** {#sec-1-15-3}

### 1.16 Binary and Octal literals {#sec-1-16}

### 1.17 Reflect Api {#sec-1-17}

### 1.18 Tail calls {#sec-1-18}

### 1.19 Symbols, Iterators, and Generators {#sec-1-19}

#### 1.19.1 Symbols: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) {#sec-1-19-1}

1.  what is symbols ? provide same\
2.  Well-known Symbols?\
```
tạo ra biến random trong phạm vi toàn bộ dự án
```
#### 1.19.2 Iterators: study about Iterators ([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators\_and\_Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)) {#sec-1-19-2}

1.  What is Iterators ?\
2.  What is the Interface of Iterators ?\
3.  Provide an example using Iterator ?\
4.  Creating a Custom Iterators\

#### 1.19.3 Generators {#sec-1-19-3}

1.  What is Generators ? What is syntax to create a generator ? How you
    execute a generator ? How we handle errors in generator ?\
2.  Where do you think we should use generator ?\

#### 1.19.4 Exercise {#sec-1-19-4}

``` {.src .src-js}
var numbers = {
  // ..
};

// should print 0..100 by 1s
for (let num of numbers) {
  console.log(num);
}

// should print 6..30 by 4s
for (let num of /*..*/) {
  console.log(num);
}
```


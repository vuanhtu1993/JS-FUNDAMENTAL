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
    2. var obj = {
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

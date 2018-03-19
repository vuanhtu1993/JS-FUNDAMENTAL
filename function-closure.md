# Function in JS

### Function declaration
```
    function b() {
       console.log(b);
    }

    console.log(b); // function b
    b(); // function b
```
### Function expression
```
    var a = function b() {
       console.log(a, b);
    }

    a(); //  function a, function a
    b(); // ReferenceError
```
### What is Scope?
- Là phạm vi hoạt động của biến
### Hoisting
- Là một kỹ thuật trong js, compiler sẽ duyệt qua một lượt code và đầy các
khai báo hàm lên đầu tiên, sau đó là các khai báo biến (chỉ khai báo chưa gán)
### What is Nested Scope?
- Là phạm vi hoạt động của biến
### What is Lexical Scope?
- Là phạm vi hoạt động của biến
### What is Closure Scope?
```
function foo() {
  var a = 2;
  function bar() {
    console.log( a );
  }
  return bar;
}
var baz = foo();
baz(); // ???
```
# 2 Assignment
Tạo hàm range(a, b) trả về array các số tự nhiên liên tiếp từ a => b. Ví dụ: range(1, 4) = [1, 2, 3, 4]
Tạo hàm sum(array) tính tổng các số trong array. V/d sum([1, 2, 3, 4]) = 10;
Tính sum(range(1, 10))
Xử dụng lệ quy để viết hàm isEven(n); isEven(10) => true; isEven(3) => false
Viết nốt body của hàm dưới, sao cho khi gọi sẽ hiện thị như comment
```
function print(fn, s) {
  // TODO
}

print(console.log, 'a'); // hiển thị 'a'
print(console.log, 10); // hiện thị 10
```
Viết nốt body của hàm dưới, sao cho khi gọi sẽ hiện thị như comment
```
function add(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b;
}

function op(fn, a, b) {
  // TODO
  return ...;
}

var opAdd = op(add);
opAdd(1, 2); // trả về 1 + 2

var opSub = op(sub);
opSub(3, 2); // trả về 3 - 1
```

Viết hàm repeat nhận 2 tham số, tham số đầu tiên là 1 hàm fn, tham số thứ 2 là n, và gọi hàm fn n lần. Ví dụ:
```
function foo() {
   console.log('a');
}

function repeat(fn, n) {
// TODO
}

repeat(foo, 10); // hiện thị ra a 10 lần
```
# 1 this & Object prototype
### 1.1 This
* This là một con trỏ đặc biệt, nó trỏ đến đối tượng chứa phương thức đang
được gọi thưc thi
* This không phụ thuộc vào hàm đó được khai báo hay invoke ở đâu mà
phụ thuộc vào cách gọi hàm đó
  - Cách gọi 1 (Default binding) fn(): gọi hàm thông thường, this ở trong function sẽ trỏ tới đối tượng global.
  - Cách gọi 2 (Implicit binding) o.method(): gọi hàm thông qua phương thức của một đối tượng, this trỏ tới object của phương thức.
   ```
    function log() {
      console.log(this.a);
    }
    var obj1 = {
        a: 10,
        f: log,
    }
    var obj2 = {
        a: 20,
        f: obj1.f,
    }
    log() // this => object global -> undefined
    obj1.log() // this => obj1 -> 10
    obj2.log() // this => obj2 -> 20
    ```
  - Cách gọi 3 (Explicit binding) fn.call(): gọi hàm với method call(), giá trị của biến this phụ thuộc vào object được truyền vào khi gọi method call(). Ngoài ra có thể sử dụng method bind(), apply().
  - Cách gọi 4 (new binding) new fn(): Khi có từ khóa new trước một function sẽ được coi như là một constructor, this bên trong function sẽ được trỏ tới object mới được tạo.
* Từ đó theo em quy tác để xác định **this** là gì?
   - Xem đối tượng mới có phải được tạo bằng từ khóa new hay không
   - Xem đối tượng có được thay đổi bằng các phương thước bind, call, apply hay không ?
   - Xem có đối tượng nào nào đang gọi hàm như một phương thức hay không
   - Xem hàm có được gọi theo cách thông thương hay không


### 1.2 Objects
* Liệt kê lại 6 kiểu nguyên thuỷ trong JS ? liệt kê những kiểu Object có sẵn trong JS?<br>
  - 6 kiểu nguyên thủy trong Javascript là: boolean, null, undefined, number, string
  - Những kiểu object có sẵn trong javascript: String, Number, Boolean, Object, Function, Array, Date, RegEx
* Cách để clone object trong JS:
    1. Để bảo tồn việc toàn vẹn dữ liệu của object, phải clone một object mới đẻ truyền cho người khác cần dùng(thích sửa gì thì sửa ko ảnh hưởng đến object cũ)
    ```

    - Shallow Copy: Object.assign()
    Cách 1:
    Loop qua từng thuộc tính rồi copy (chỉ hoạt động khi value là )
    Cách 2:
    var a = { o : { n: 100}};
    var a_copy = Object.assign({}, a)
    - Deep Copy: JSON.parse(JSON.stringify(object))
    var a = { o: { n: 1000} };
    var b = JSON.parse(JSON.toString(a));
    ```

## OOP la gi
###
### 4 Tinh chat của hướng đối tượng:
* Trong lập trình hướng đối tượng có 4 tính chất
    1. Tính Trừu tượng : Là việc mô hình hóa một lớp đối tượng ngoài đời thật vào
    trong chương trình của mình
    2. Tính Bao đóng: Không cho phép đối tượng khác truy cập trực tiếp vào
    3. Tính Kế thừa: là sự kế thừa tính chất (thuộc tính và phương thức) của class con từ class cha
    4. Tính Đa hình: là phương thức giống tên nhau nhưng cách thế hiện khác nhau (cùng phương thức kêu nhưng chó kêu khác mèo)
### 1.3 Class Theory
* Nhớ lại OOP là gì ? các thuộc tính của OOP?<br>
  OOP là phương pháp lập trình dựa trên các đối tượng, mỗi đối tượng có các thuộc tính và hành vi riêng của nó.<br>
  OOP có 4 thuộc tính là: tính đóng gói, tính trừu tượng, tính đa hình và tính kế thừa.
* So sánh "class" và "instance"
    - Class: là một khái niệm trong Lập trình hướng đối tượng mô tả cho những thực thể có chung tính chất và hành vi. Class định nghĩa những thuộc tính và hành vi được dùng cho những đối tượng của lớp đó
    - Instance: Là sự thế hiện của một class
* Constructor là gì?
  Constructor là một phương thức đặc biệt để tạo và khởi tạo một object từ một class
### 1.4 Prototypes
* Xem xét đoạn code sau, em có nhận xét gì ?
```
var o1 = {
  a: 2
}

var o2 = Object.create(o1);

console.log(o2.a); // ??

o1.a = 10;
console.log(o2.a); // ??
```
Có một object tên là o1, object o2 được tạo mới từ object o1.  Vì o2 được tạo ra từ o1 nên nó có cùng thuộc tính với o1 nên khi câu lệnh
console.log(o2.a) ta được kết quả trả về là 2. Khi ta thay đổi thuộc tính của o1 thì thuộc tính của o2 cũng thay đổi vì vậy khi chạy câu lệnh console.log(o2.a) ta được kết quả là 10.
* Tìm hiểu về **Object.prototype**<br>
Prototype là một đối tượng của object. Tất cả object đều có 1 prototype  và các object này kế thừa thuộc tính và phương thức từ prototype của mình. Prototype của String là String.prototype, Number là Number.prototype

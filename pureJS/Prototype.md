### Prototype
Mỗi Object trong JS là một tập hợp các thuộc tính (property) và trong số những thuộc tính đó có chứa 1 thằng được gọi là Prototype.

Và không có gì thay đổi, Prototype đó cũng là một Object (facepalm) vì vậy nó cũng có Prototype... Người ta gọi đó là một chuỗi Prototype (Prototype chain). Chuỗi này là hữu hạn, cuối cùng của chuỗi Prototype đó là trùm cuối Object.Prototype.

> __proto__ ở trong hình chính là proptotype.

Đây có thể coi như 1 cách trình duyệt public ra để bạn truy cập vào Prototype của Object.

Kế thừa qua Prototype
Bài viết này đang hướng ngược lại thời kì trước đây, khi ES6 chưa xuất hiện hay những thư viện cồng kềnh chưa được sử dụng. Vì vậy việc kế thừa qua Prototype là một vấn đề quan trọng khi nói JS là ngôn ngữ OOP.

Có thể hiểu Prototype của Object chính là khuôn mẫu, hay là sư phụ của Object cho dễ hiểu.

Mỗi khi gọi đến một thuộc tính của thằng Object để nhờ làm việc,JS sẽ tìm trong Object xem có không, nếu không thì tìm đến thằng sư phụ.
Đấy là lí do mà có thể sử dụng những hàm như hasOwnProperty để kiểm tra xem thuộc tính đó có tồn tại trong Object hay không vì thằng sư tổ Object.prototype đã có rồi.



var anhtus = {};

anhtus.hasOwnProperty('abc'); // false
Nếu thằng sư phụ hay sư tổ mà cũng không thể thực hiện được, lúc này việc cần làm là dạy cho 1 sư nào đó cách thực hiện để tất cả những đệ tử tầng dưới có thể làm theo =)) Ví dụ sư phụ chưa biết bay, ta sẽ cho sư phụ học bay, và các đệ tử tầng dưới được kế thừa lại những tinh hoa từ sư phụ:
```javascript
// Sử dụng Object literal
var sensei = {
    fly: function () {
        console.log('Can Fly');
    }
};

var senpai = {
    __proto__: sensei
};

var kohai = {
    __proto__: senpai
};

senpai.fly(); // Can Fly
kohai.fly(); // Can Fly
```
Hoặc:
```javascript
//  Sử dụng Constructor Function
var Sensei = function () {
    this.fly = function () {
        console.log('Can Fly');
    };
    
    return this;
};

var Senpai = function () { 
    // 
};

Senpai.prototype = new Sensei();

var kohai = new Senpai();

kohai.fly(); // Can Fly
```
Khi tạo Object bằng cách gọi new Senpai() thì prototype của kohai là Senpai.prototype. Và nếu muốn thêm function cho các Object đệ tử thì chỉ cần thêm 1 lần vào prototype là được.
```javascript
 Sensei.prototype.fight = function () {
     console.log('Can Fight');
 }
 
 var kohai = new Sensei();
 kohai.fight(); // Can Fight
Tuy nhiên nếu tự dưng có thằng đệ tử do được bố mẹ năn nỉ xin cho học nhưng thấy nó tư chất si đa không muốn dạy cho một thân bản lãnh thì lúc đấy đành bí mật phong bế nó trước vậy =))

var phevat = Object.create(null);

Sensei.prototype.taichi = function() {
  console.log('Can Taichi');
}

phevat.taichi(); // TypeError: phevat.taichi is not a function
```
Ý nghĩa của Prototype
Từ phiên bản ES5 trở về trước, JS không hề có khái niệm Class, vấn đề này mình có đá qua vài lần ở trên kia rồi, vậy nên việc kế thừa giống các ngôn ngữ OOP khác trong JS cũng không thể thực hiện được như bình thường. Và Prototype là người hùng giúp ta có thể thực hiện được việc kế thừa. Vậy nên mới nói việc kế thừa của JS là Prototype-based, còn trong các ngôn ngữ OOP khác là Class-based.

Kết luận
Tất cả những kiến thức trên thực ra áp dụng vào thời điểm này có vẻ hơi ít vì sự mạnh mẽ của ES6 và Babel, tuy nhiên mình thực sự mong qua bài viết này khi sử dụng OOP trong JS bạn sẽ hiểu thêm được phần nào cách hoạt động và sự hơi liên quan với OOP trong các ngôn ngữ khác. Cám ơn đã theo dõi!

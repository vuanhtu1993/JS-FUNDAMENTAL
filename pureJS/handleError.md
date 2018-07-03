### Javascript errors
Có rất nhiều loại lỗi trong javascript, nó được chia làm hai loại:
Vấn đề thực tế: ví dụ như form của chúng ta có ô input nhập vào họ tên, nhưng người dùng lại nhập vào đó số điện thoại.
Lỗi lập trình: ví dụ như lỗi logic, lỗi cú pháp...

## Best Practices for Handling Errors
Một sự chỉ trích thường gặp đối với javascript đó là cách xử lý lỗi thông qua callback function. Hãy xem ví dụ dưới đây:
```javascript
    function getInfo(callback) {
        getUserId(function(error, id) {
            if (error) return callback(error);
            getUserById(function(error, info) {
                if (error) return callback(error);
                return callback(null, info);
            });
        });
    }
```
Đoạn code trên bắt buộc các lập trình viên phải xử lý lỗi trong hàm callback của họ. Khi viết code thì chúng ta luôn muốn là có thể handle được hết các trường hợp lỗi có thể gặp phải, thì với đoạn code trên ta có thể handle được các lỗi có thể gặp phải trong quá trình lấy về info của user.

Đấy là mặt tốt, còn đoạn code trên không tốt ở điểm nào ? Nếu như có lỗi xảy ra ở 1 trong 2 callback getUserId hoặc getUserById thì chương trình sẽ bị dừng ngay lập tức, vì thế trong hàm callback của bạn nếu có error xảy ra bạn nên retry lại hàm, hoặc revert những thay đổi trước đó và phải báo lỗi chi tiết hơn cho người dùng.

May mắn là chúng ta có một vài cách và hàm để giải quyết những lỗi này. Hãy thử những cách dưới đây xem sao:

The try...catch...finally statement
Mệnh đề try...catch.finally đánh dấu 1 block các câu lệnh và chỉ định 1 kết quả duy nhất trả ra nếu có exception bất kỳ nào xảy ra. Nó có thể bắt được lỗi runtime và logical nhưng không bắt được lỗi syntax.
Dưới đây là ví dụ sử dụng try...catch...finally:
```javascript
    try {
        getUserId();
        getUserById();
        getInfo();
    } catch (e) {
        renderError(e);
    } finally {
        renderReport();
    }
```
Nhìn cũng gọn hơn và dễ hiểu hơn. Đoạn code sẽ chạy lần lượt 3 hàm getUserId() rồi getUserById() rồi getInfo(). Nếu có lỗi xảy ra trong bất cứ hàm nào nó cũng sẽ đều nhảy vào hàm renderError(). Nếu không có lỗi thì nó sẽ chạy lần lượt hết cả 3 hàm trên.

Cuối cùng thì hoặc sau khi chạy xong hàm getInfo() hoặc renderError() thì đoạn code cũng sẽ đều chạy vào renderReport(). Đoạn code ở finally là optional, bạn có thể có hoặc không tùy vào mục đích của bạn.

The throw statement
The throw statement được sử dụng để trả ra các exception đã được developer định nghĩa trước. Trong khi chạy, khi gặp lệnh throw việc thực thi hàm sẽ dừng lại và nhảy ngay vào lệnh catch đầu tiên, nếu không tìm thấy catch thì cả chương trình sẽ bị dừng.

Xem ví dụ dưới đây:
```javascript
    try {
        var token = getToken();
        if (!token) {
            throw("You are not authorized !");
        }
        redirectToDashboard();
    } catch(e) {
        console.log("Error occurs: " + e);
    }
```
Thì khi chạy nếu không có token chương trình sẽ nhảy vào hàm catch và console.log ra là:
    Error occurs: You are not authorized !
The onerror() method
Hàm onerror() là trình xử lý sự kiện đầu tiên để xử lý lỗi trong javascript. Nó thường được xử dụng với cú pháp window.onerror. Lệnh này cho phép các sự kiện lỗi được trả vào đối tượng window bất cứ khi nào có lỗi xảy ra trong khi javascript đang chạy.

Xem ví dụ dưới đây:
```javascript
    var button = document.getElementById("button1");

    button.addEventListener("click", renderBox());

    window.onerror = function() {
        console.log("An error occured !");
    }
```
Lúc chạy thì khi bạn click vào button thì trình duyệt sẽ console.log ra là An error occured ! do hàm renderBox() chưa được định nghĩa trong đoạn code bên trên.
Call stack property
Thuộc tính stack là một feature trong đối tượng Error của javascript. Nó cung cấp một danh sách trong đó có các hàm đã được gọi , theo thứ tự nào, từ dòng nào file nào, gọi với các arguments nào...

Đoạn code dưới đây sẽ minh họa việc đó:
```javascript
function trace() {
    try {
      throw new Error('An error occured: ');
    } catch(e) {
      alert(e.stack);
    }
  }

  function second() {
    trace();
  }

  function first() {
    second(1, 'viblo', {});
  }
  first("demo");
```
Ví dụ trên sẽ hiển thị ra lỗi lần lượt từ khi gọi hàm first() đến hàm second(), hiển thị cả số dòng xảy ra lỗi cũng như lỗi gì.

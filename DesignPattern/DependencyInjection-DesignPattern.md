# Dependency Injection Design Pattern

## Concept

## Consider example
    ```
    // Email Service
    class EmailService {
      sendEmail(message, receiver) {
      	console.log(`send email to ${receiver} with content ${message}`)
      }
    }

    // My app
    class MyApp {
    	emailService = new EmailService();
    	processMessage(msg, receiver) {
          this.emailService.sendEmail(msg, receiver);
        }
    }

    Nhận xét:
    1. Việc MyApp khởi tạo EmailService để sử dụng các phương thức là hoàn toàn đúng
    2.
    2. Trường hợp muốn mở rộng thêm một vài tính năng hữu ích khác trong EmailService
    như là link với facebook hay instagram, và cần
    2. Testing khó khăn vì việc đưa object (emailService vào function test là quá khó)
    ```
## Approach DI
    ```
    DI yêu cầu thỏa mãn các tiêu chí sau:
    1. Phải có một nhóm các service injector phụ trách việc khởi tạo service và các ứng dụng sử
    dụng lại service ấy (Khởi tạo 1 lần và được sử dụng nhiều lần ở các class khác)
    2. Các thành phần của service nên được viết ở một lớp cơ sở hoặc 1 interface
    3. Những class sử dụng service nên sử dụng những interface mà service cần dùng implement
    ```
    
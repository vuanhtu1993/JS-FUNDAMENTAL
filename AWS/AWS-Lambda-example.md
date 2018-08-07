### Thử nghiệm serverless với dịch vụ Amazon Lambda của Amazon AWS
Bài viết này sẽ ghi lại quá trình làm một website theo mô hình serverless - tất cả thành phần đều là dịch vụ miễn phí của Amazon AWS.


#### AWS lambda
Dịch vụ cho phép người dùng upload hoặc paste code lên và chạy.
Miễn phí 1 triệu lần chạy mỗi tháng.


#### AWS S3
Dịch vụ lưu trữ file của Amazon, ta sẽ viết code để tạo file HTML và lưu vào S3, rồi cấu hình cho S3 phụ vụ file HTML đó như 1 website (thay vì 1 file để tải về).
0.023 $ / 1GB, với 1 file HTML ~ 10K, bạn mất gần như 0 đồng mỗi tháng.

#### AWS Cloudwatch 
Dịch vụ chạy một công việc theo thời gian tùy chọn (như cron).
Xem thêm về free tier ở https://aws.amazon.com/free/#legal - người dùng phải nhập thẻ tín dụng mới được dùng free.

- Mô hình
Cloudwatch sẽ chạy hàng ngày để chạy AWS lambda function, kết quả lưu vào S3 là một website HTML mà người dùng xem được.

Viết code và dùng trên AWS Lambda
Paste code vào AWS Lambda, có hỗ trợ Python3.6 và 2.7, ở đây dùng Python3.6, ta không thể cài đặt các package trên Lambda được, vì vậy cần thư viện nào, ta đóng gói nó cùng code (vendor) thành file .zip và upload lên AWS Lambda, hoặc đơn giản là chỉ dùng thư viện standard đi kèm sẵn với Python.

Code chỉ được quyền ghi vào thư mục `/tmp`.

AWS Lambda có sẵn thư viện "boto3", một Python lib để tương tác với các dịch vụ của AWS.
Code mặc định chỉ chạy được trong vòng 3s, ta chọn lại cho phép chạy trong vòng 1 phút.
Để code chạy trên AWS lambda ghi được file vào S3, ta phải cấu hình IAM cho phép ghi vào bucket (hiểu nôm na như thư mục) cụ thể trên S3.

IAM là dịch vụ quản lý quyền truy cập tới các dịch vụ của AWS, tạo một Role mới với policy như sau:

```javascript
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "s3:*"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*",
                "arn:aws:s3:::aj.pymi.vn/*"
            ]
        }
    ]
}
```
để được quyền ghi vào S3, tại bucket `aj.pymi.vn`.

File HTML ta sẽ tạo ra cần được set Content-Type là html/text (mặc định sẽ là binary), và phải được set là "public" để mọi người có thể vào xem nội dung website - việc này sẽ làm thông qua code boto khi upload file sang S3.

Tên bucket phải trùng với tên domain mà ta sẽ sử dụng, sau khi hoàn thành, ta tạo CNAME trỏ từ
domain mong muốn -> domain S3 mà S3 tự tạo, nhờ vậy sẽ xem được kết quả qua tên domain mong muốn. Khi tạo Bucket xong, ta chọn dùng bucket đó như 1 static website -> nhận được domain S3 của site để truy cập vào trang kêt quả.

Code Python 3.6
Dùng urllib có sẵn thay vì requests để đỡ phải cài.
Đoạn code đọc API GitHub lấy danh sách các issue mới nhất của repo Awesome/vietnam, render ra HTML với các thông tin quan trọng (lương, ngày tạo).
Phần code upload lên S3:

    s3 = boto3.resource('s3')
    bucket = s3.Bucket('aj.pymi.vn')
    bucket.put_object(ACL='public-read',
                      Bucket='aj.pymi.vn',
                      Key='index.html',
                      Body=open('/tmp/index.html').read().encode(),
                      ContentType='text/html; charset=utf-8'
                      )
Xem code đầy đủ tại (PS chưa tối ưu):
https://github.com/familug/FAMILUG/blob/master/Python/lambda_awejob.py

Kết quả xem tại PyMi awsome job.




Website được cập nhật hàng ngày nhờ dịch vụ cloudwatch chạy AWS lambda, không cần lo vận hành, toàn bộ là miễn phí.


Kết luận
Một chương trình muốn chuyển đổi từ cách chạy thông thường sang dùng kiến trúc serverless sẽ cần thay đổi rất nhiều về mặt kiến trúc và code.
Serverless là một giải pháp mới, nhưng nó không phải là một thiên đường lấp lánh, sẽ có những bài toán mà serverless không dành cho bạn, và các hệ thống serverless cũng không phải là ít đau thương
- https://news.ycombinator.com/item?id=13771429
- https://news.ycombinator.com/item?id=14601809

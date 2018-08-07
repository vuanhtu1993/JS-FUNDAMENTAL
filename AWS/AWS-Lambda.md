## AWS Lambda
Run code without thinking about servers. Pay only for the compute time you consume.
## Use cases
### 1. Data processing
>You can use AWS Lambda to execute code in response to triggers such as changes in data, shifts in system state, or actions by users.
>Lambda can be directly triggered by AWS services such as S3, DynamoDB, Kinesis, SNS, and CloudWatch, or it can be orchestrated into workflows by AWS Step Functions.
>This allows you to build a variety of real-time serverless data processing systems.
##### REAL-TIME FILE PROCESSING
You can use Amazon S3 to trigger AWS Lambda to process data immediately after an upload.
For example, you can use Lambda to thumbnail images, transcode videos, index files, process logs,
validate content, and aggregate and filter data in real-time.
![alt text](https://d1.awsstatic.com/Test%20Images/MasonTests/Lambda/Lambda_FileProcessing.c0915267504e6d2e82d43268f3df408bbab08af9.png)
##### REAL-TIME STREAM PROCESSING
You can use AWS Lambda and Amazon Kinesis to process real-time streaming data for application activity tracking, transaction order processing, click stream analysis, data cleansing, metrics generation, log filtering, indexing, social media analysis, and IoT device data telemetry and metering.
![alt text](https://d1.awsstatic.com/Test%20Images/MasonTests/Lambda/Lambda_StreamProcessing.8464961e382ff17c57750f7b1dc23c1ef7e4c233.png)

### 2. Back-end
>You can build *serverless* backends using AWS Lambda to handle web, mobile, Internet of Things (IoT), and 3rd party API requests.
- Serverless: Serverless là cái tên dành cho công nghệ chạy code mà người dùng (lập trình viên) không phải lo cài đặt / cấu hình server họ chỉ cần viết code, còn việc chạy, hãy để nhà cung cấp dịch vụ lo (và tất nhiên người dùng chỉ lo code và trả tiền).

- Kiến trúc serverless này, chỉ là "không có server" trong nỗi lo của lập trình viên, chứ code không tự nhiên mà chạy được. Các nhà cung cấp dịch vụ sẽ lo thiết kế, vận hành chạy code của người dùng.
Các dịch vụ có sẵn:
1. AWS Lambda
2. Google cloud functions
3. Azure functions
##### IOT Back-end
You can build serverless backends using AWS Lambda to handle web, mobile, Internet of Things (IoT), and 3rd party API requests.
![alt text](https://d1.awsstatic.com/Test%20Images/MasonTests/Lambda_IoT.d93dbca1da3b4b080c259ba33351763fd66fb1fa.png)

##### Mobile Back-end
You can build backends using AWS Lambda and Amazon API Gateway to authenticate and process API requests. Lambda makes it easy to create rich, personalized app experiences.
![alt text](https://d1.awsstatic.com/Test%20Images/MasonTests/Lambda/Lambda_MobileBackends.35e0e7cb2b8c1f7c276435c56e341916adb2033d.png)
##### Web-application
By combining AWS Lambda with other AWS services, developers can build powerful web applications that automatically scale up and down and run in a highly available configuration across multiple data centers – with zero administrative effort required for scalability, back-ups or multi-data center redundancy.
![alt text](https://d1.awsstatic.com/Test%20Images/MasonTests/Lambda_WebApplications.2139ddbc8a84f5564ee5846995f28c88e9db5c2d.png)

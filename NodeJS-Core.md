# NodeJs Check List
## NodeJS introduction
### NodeJs là gì ?
    * Nodejs is a Javascript runtime build on Chrome'a V8 Javascript engine, NodeJs runs on various platforms (windown, linux, unix, OSX...), uses javascript to build server.
### Điểm mạnh và điểm yếu của NodeJs ?
    * advantage
        - NodeJs is new technology, its uses an envent-driven, non-blocking IO, that makes it lightweight and efficient.
        - NodeJs is free,
        - NodeJs uses assynchronous programing.
        - many modules to support,
        - generally, NodeJs eliminates waiting, and simply contineus with next request, run single-threaded, non-blocking I/O, asynchronous programing, which is very memory efficient.
    * disadvantage
        - Nếu bạn cần xử lý các ứng dụng tốn tài nguyên CPU như encoding video, convert file, decoding encryption... hoặc các ứng dụng tương tự như vậy thì không nên dùng NodeJS (Lý do: NodeJS được viết bằng C++ & Javascript, nên phải thông qua thêm 1 trình biên dịch của NodeJS sẽ lâu hơn 1 chút ). Trường hợp này bạn hãy viết 1 Addon C++ để tích hợp với NodeJS để tăng hiệu suất tối đa !(Việc tích hợp rất thân thiện và nhanh chóng).
        - là 1 công nghệ mới nên công đồng còn chưa lớn mạnh được như các ngôn ngữ như PHP, Ruby, .Net....
        - Nodejs + NoSQL là sự kết hợp hoàn hảo nhưng cũng là con dao 2 lưỡi nếu không hiểu rõ và sâu về chúng.
### V8 Engine là gì ?
    * Chrome v8 engine is an open-source Javascript engine developed by the Chromium Project for google Chrome and Chromium web browers.
    * V8 compiles Javascript directly to native machine code before executing it,instead of traditional techniques susch as interpreting bytecode or compiles the whole program to machine code and executing it from a filesystem.
### Nêu mô hình client - server ?. Cụ thế mô hình client server ở trong web service
    * client - server model is a distributed application structure that partition task or workloads between providers of a resource or service, called server, and service request called client.
    * example model:
        client1 (request)  \
        client2 (request) --  server (providers service or a resource).
        client3 (request) /
### Thế nào là code js ở phía server ?
    * code js ở phía server nghĩa là chúng ta sẽ viết code javascript để xử lý những request của người dùng gửi lên,
### Cài đặt node và kiểm tra phiên bản của node và npm ?
    * node --version
    * npm --version
### Use node CLI to run js script ?
    * node fileName.js
### Viết script để lắng nghe cổng 3000 trả về Hello World ?
```
    const http =  require("http");
    const host = "127.0.0.1";
    const port = 3000;

    const server = http.createServer((req,res)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('Hello world');
        res.end();
    }).listen(port, host,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(`server ${host} đang được khởi chạy ở cổng ${port}`);
    })
```

## NPM
### NPM là gì ?. Nêu các lợi ích khi sử dụng trình quản lí package ?
    * NPM là 1 trình quản lý package cho Javascript và những phần mềm lớn trên thế giới, khám phá những package có thể sử dụng lại được và nhúng chúng theo 1 cách mới.
    * Lợi ích khi sử dụng trình quản lý package:
        - dễ ràng quản lý 1 package ( install, remove module, chia sẻ và phân bổ code ), test code;
### File package.json dùng để làm gì ? Cách tạo file và nêu chức năng của từng trường trong file package.json
    * file package.json dùng để quản lý, thiết lập cài đặt cho các node_modules, quản lý version của package
    * để tạo file, chúng ta có thể dùng lệnh trên CLI:
        - npm init hoặc yarn init
        - các trường trong file package.json gồm:
            + name: Tên của project hoặc package, nên viết hoa cho thuộc tính name. Đây là thuộc tính bắt buộc. Ngoài ra chúng ta có thể public project của mình, thì thuộc tính name này sẽ là package name, nên cái này phải là duy nhất.
            + version: version của project
            + description: Đoạn mô tả của project. Chú ý viết ngắn gọn xúc tích rõ ràng dễ hiểu, không hư cấu nhé.
            + main: file chính trong project (file sẽ dùng để thiết lập midleware)
            + scripts: các setup của cho từng package.
            + author: Thông tin về tác giả.
            + dependencies: Cái này quan trọng đây. Trong project, bạn sẽ phải sử dụng rất nhiều gói, những gói này đã được viết sẵn, chỉ cần require rồi sử dụng, trong này sẽ chứa các package mà để run project.
            + devDependencies: cái này để quản lý các package khi build project.
            + license: bản quyền
### Dependency la gì ?, devDependencies là gì ?
    *dependencies: Cái này quan trọng đây. Trong project, bạn sẽ phải sử dụng rất nhiều gói, những gói này đã được viết sẵn, chỉ cần require rồi sử dụng, trong này sẽ chứa các package mà để run project.
    *devDependencies: cái này để quản lý các package khi build project.
### Tự tạo file package.json bằng npm init ?
    * npm init rồi cứ enter, trong quá trình press enter có thể viết các trường của nó.
### Cài đặt thư viện bằng npm add dependencies trong file package.json
    * để save package vào package.json ta dùng lệnh : npm install nameOfPackage --save
### Xoá thư viện trong file package.json ?
    * để xóa thư viện trong package.json dùng npm uninstall fileOfPackage
### Chạy lệnh Js trong script, nhận xét sự khác biệt giữa chạy code trong script và ngoài script
    * lệnh Js trong script e chỉ thấy nếu setup và chạy thì nó ngắn hơn thôi.
## Dev tools
### Tìm hiểu node debugger là gì ?
    * node debugger là câu lệnh dùng để kiểm tra quá trình chạy của node, để debugger chúng ta đặt lệnh "debugger;" vào nơi muốn chương trình dừng lại sau đó thực hiện lệnh: node --spect-brk filename.js
    * sẽ có cửa sổ dev tool của brower hiện ra và chúng ta sẽ thực hiện chạy code theo từng bước để biết chương trình hoạt động ra sao.
### Debug một chương trình tính tích một mảng số dương, sử dụng các câu lệnh continue( c ), next( n ), repl( read eval print loop )
    * e chưa hiểu ý của câu hỏi này?
    * ở đây e có tạo 1 chương trình thực hiện như yêu cầu và đặt debugger; vào trong đó.
```
const http =  require("http");
const fs = require('fs');
const host = "127.0.0.1";
const port = 3000;

const server = http.createServer((req,res)=>{
    function multipleArr(arr){
        let mul=1
        let i;
        function multiple(a,b){
            return a*b;
        }
        for(i=0; i<arr.length; i++){
            debugger;
            mul=multiple(mul, arr[i]);
        }
        
        return mul;
    };
    console.log(multipleArr([1,2,3,4,5,6]));
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write("multipleArr([1,2,3,4,5,6])");
    res.end();
}).listen(port, host,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server ${host} đang được khởi chạy ở cổng ${port}`);
})


```
### Phân biệt babel-cli, babel-presets-es2015, babel-presets-stage-2 ?
    * theo như e hiểu thì babel-cli là module được dùng để compile code JS, tức là nó sẽ nhận đầu vào là các file .js và dịch biên dịch nó sang cú pháp tùy vào việc ta thiết lập.
    * babel-presents-es2015 là bản es5, tức là để báo cho babel-cli biết là sẽ dịch cái file .js đó sang ES5.
    * babel-presets-stage-2 là bản es thử nghiệm các tính năng, và tất nhiên nó sẽ chưa được đầy đủ.
### Sử dụng npm để install babel và các presets của babel
    * để cài babel-cli và babel-presets-2015 chúng ta thực hiện:
        npm install --save-dev babel-cli babel-preset-env
### Webpack là gì ?. Ứng dụng của Webpack trong dự án NodeJS
### Sử dụng NPM để cài đặt webpack ?. Cấu hình webpack trong file webpack.config.js.
### Linter là gì ?, Cài đặt ES Lint bằng NPM
    * linter là nói vể các module có khả năng compare code js của mình với các tiêu chuẩn codejs của các nhà phát triển khác mà họ đã viết theo 1 quy chuẩn nhất định, 
### Sử dụng ESLint test coding convention yourfile.js
    * Để sử dụng ESLint chúng ta cần cài module ESLint bằng câu lệnh: yarn add eslint --save-dev, sau đó chạy lệnh yarn eslint filename.js
## Node core
### Để trở thành một webserver thì hệ thống cần đảm bảo những tiêu chí gì ?
    * để trành thành 1 webserver thì hệ thống cấn đảm bảo những tiêu chí sau:
        + 
### Module Pattern là gì ?
    * là chỉ export những thuộc tính và phương thức chung mà chúng ta muốn từ 1 object trả về, việc này sẽ giúp bảo vệ code của module
### Các phương thức require, exports, module.exports dùng để làm gì ?
    * require(): được dùng để lấy những giá trị từ file mà chúng ta đã export.
    * exports và module.exports đều là object, cùng trỏ đến cùng 1 vùng nhớ, nhưng sau khi gán cho exports 1 phương thức hoặc thuộc tính thì nó lại trỏ đến 1 vùng nhớ hoàn toàn khác không liên quan đến module.exports nữa, vì vậy, tốt nhất khi muốn export ta nên dùng module.exports.
### So sánh require ES5 => import Es6, sử dụng Babel để convert từ ES6 về  ES5
    * require thực hiện việc loading synchronous, import thực hiện việc loading asynchronous
    * ruquire thực hiện việc Throws error at runtime, import thực hiển việc Throws error while parsing
### So sánh require/import relative file, library
    * library là thư viện core của NodeJs, vì vậy khi import hay require chúng ta chỉ cần khai báo tên của library đó.
    * còn khi muốn import/require file thì phải chỉ rõ đường dẫn tới file đó.
### Node APIs là gì ?
    * Node APIs là những thư viện đã được thiết kế sẵn, thông qua đó người lập trình có thể tái sử dụng để dùng các thư viện đó trong chương trình của họ 1 cách nhanh chóng và thuận tiện.
### Fs module trong NodeJS dùng để làm gì ?
    * fs module trong NodeJS dùng thể thao tác với file (tất tần tật các thao tác về file bao gồm: đọc, ghi, mở, đóng, copy........);
### Viết  chương trình tạo, viết và đọc file ?
    * chương trình:
```
fs.stat(__dirname+'/newFile.txt',(err,stat)=>{
    if (err) {
        fs.writeFile(__dirname+'/newFile.txt','á đù, ta đã được tạo =)))',(err)=>{
            if(err) throw err;
            console.log('file is saved');
        });
    };
    fs.readFile(__dirname+'/newFile.txt',(err,dt)=>{
        if(err) throw err;
        console.log(dt.toString());
    })
})
```
    * explain: đầu tiên sẽ kiểm tra xem có file chưa, nếu chưa có sễ tạo 1 file có nội dung như trên, nếu có file rồi thì đọc file và hiển thị ra nội dung.
### Sự khác biệt giữa Fs asynchronous và Fs synchronous là gì ?
    * Fs synchronous: là việc đọc hoặc thao tác với file theo quy trình đồng bộ, ví dụ fs.readFileSync, là việc phải đọc xong file đó rồi mới tiếp tục thực hiện các statement bên dưới.
    * Fs asynchronous: là việc đọc hoặc thao tác với file theo quy trình bất đồng bộ, ví dụ fs.readFile, là việc trong khi đọc file vẫn có thể thực hiện các statement bên dưới.
    * code ví dụ
```
    let SyncFile=fs.readFileSync('yourfile');
    console.log(SyncFile);
    console.log('hello');
    //đoạn code trên có nghĩa là sau khi đọc file xong và hiển thị ra kết quả thì mới thực hiển tiếp câu lệnh console.log() bên dưới


    fs.readFile('yourFile',(err, data)=>{
        console.log(data);
    });
    console.log('hello1');
    //đoạn code trên có nghĩa là trong khi đọc file thì câu lệnh console.log() phía dưới sẽ được thực hiện, và sau khi đọc xong thì mới hiển thị ra data.
```
### Http module trong NodeJS dùng để làm gì ?
    * Http module trong NodeJs là 1 module được cài sẵn của Node, cho phép NodeJs truyền dữ liệu qua giao thức chuyển tiếp siêu văn bản (HTTP)
### Tạo một server đơn giản lẳng nghe ở cổng 8000, request trả lại "Hello world" sử dụng Http APIs
```
    const http =  require("http");
    const host = "127.0.0.1";
    const port = 8000;

    const server = http.createServer((req,res)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('Hello world');
        res.end();
    }).listen(port, host,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(`server ${host} đang được khởi chạy ở cổng ${port}`);
    })
```
### Event emitter trong nodejs là gì ?. Kể tên và nêu chức năng của các phương thức trong lớp Event emitter
    * Nhiều đối tượng trong Node.js sinh ra các sự kiện, ví dụ net.Server sinh ra một sự kiện mỗi khi có một kết nối ngang hàng đến nó, hay fs.readStream sinh ra sự kiện khi một file được mở. Tất cả các đối tượng này đều là sự thể hiện của lớp events.EventEmitter trong Node.js.
    * Lớp events Emitter nằm trong envents module, lớp này được truy cập qua cú pháp:
        var events = require ('events');
        var eventEmitter = new events.EventEmitter();
    * 1 số các phương thức trong lớp Event emitter:
        - addListener(event, listener): thêm 1 listener vào phần cuối của mảng các listener cho 1 sự kiện cụ thể.
        - on(event, listener): thêm 1 listener vào phần cuối của mảng các listener cho 1 sự kiện cụ thể.
        - emit(event, [arg1],[arg2],[...]): thực thi từng listener với các tham số đã cho, trả về true nếu sự kiện có các listener, hoặc false nếu ko có.
### Chức năng của Event Loop là gì ?.  Event loop trong nodeJs có giống Event loop trong engine V8 hay không ?
    * Event loop là quy trình mà Node xử lý các request và trả về phản hồi, trong NodeJs khi có 1 thư viện là LibUV, thư viện này được viết bằng C++ và chức năng xử lý các yêu cầu rồi trả về phản hồi, khi có request được tiếp nhận, libUV sẽ gửi request tới OS (operation system) để xử lý, sau đó OS sẽ tạo ra các events tương ứng với các request đó và cho vào 1 queun, đồng thời events loop trong libUV sẽ liên tục kiểm tra các event trong queun và trả về brower qua các tác vụ callback.
    * Event loop trong nodeJs về cơ bản thì giống Event loop trong engine V8, nhưng nó rộng và tổng quát hơn.
### Trình bày các khái niệm: Event Driven, Non - Blocking trong nodeJS 
    * Event Driven (lập trình hướng sự kiện): là việc khi có các tác vụ xử lý request, thì việc thiết lập các callback function cho từng tác vụ đó là hình thức đơn giản nhất của event driven, khi đó luồng xử lý sẽ không còn đồng bộ nữa.
    * Non - blocking I/O: trước tiên để tìm hiểu về Non - blocking I/O chúng ta sẽ đi qua khái niệm về Blocking-I/O:
        - blocking - I/O: là việc yêu cầu thực thi 1 IO operation, sau khi hoàn thành thì trả kết quả lại ngay, các thread/pocess bị block cho đến khi có kết quả trả về hoặc sảy ra ngoại lệ, sẽ có nhiều bất cập khi sử dụng cơ chế này, vì vậy Non-blocking I/O ra đời để giạ quyết vấn đề này.
        - Non - bloking I/O: là việc yêu cầu thực thi 1 IO operation và trả về kết quả ngay lập tức (setTimout=0) qua 1 callback function, nếu operation chưa sẵn sàng để thực hiện thì có thể thử lại sau, tương đương với việc kiểm tra IO operation có sẵn sàng hay ko, nếu có thì thực hiện trả về, nếu không thì thông báo thử lại sau.
### Phân biệt giữa asynchronous và Non - Blocking trong NodeJS ?
    * Synchronous:
        Hiểu đơn giản: Diễn ra theo thứ tự. Một hành động chỉ được bắt đầu khi hành động trước kết thúc.
    * Asynchronous:
        Không theo thứ tự, các hành động có thể xảy ra đồng thời hoặc chí ít, mặc dù các hành động bắt đầu theo thứ tự nhưng kết thúc thì không. Một hành động có thể bắt đầu (và thậm chí kết thúc) trước khi hành động trước đó hoàn thành.
    * Non - Bloking: 
        là cơ chế sử dụng lại cơ chế Asynchronous để xử lý các tác vụ chỉ liên quan đến I/O.
## Express
### Express là gì ?. Nếu chức năng của framework này ? 
    * express là 1 framework web application nhỏ và linh hoạt, cung cấp bộ tính năng mạnh mẽ cho ứng dụng web và di động, với vô số các phương thức HTTP hữu ích và cho phép thiết lập midleware theo ý mình, có thể tạo ra các APIs mạnh mẽ 1 cách nhanh chóng và dẽ dàng, bên cạnh đó, các tính năng của express không làm khuất đi các tính năng của Nodejs.
### WebServices la gi ? Có bao nhiêu loại: RESTfull, SOAP
    * webservice là 1 môi trường được chuẩn hóa để thực hiện việc giao tiếp giữa ứng dụng client và server trên wwww, nó cung cấp những nền tảng chung cho phép đa ứng dụng xây dựng trên nhiều các ngôn ngữ lập trình để có khả năng giao tiếp với nhau.
    * có 2 loại webservices: RESTfull and SOAP:
        + RESTful: REST định nghĩa các quy tắc kiến trúc để bạn thiết kế Web services, chú trọng vào tài nguyên hệ thống, bao gồm các trạng thái tài nguyên được định dạng như thế nào và được truyền tải qua HTTP, và được viết bởi nhiều ngôn ngữ khác nhau. Nếu tính theo số dịch vụ mạng sử dụng, REST đã nổi lên trong vài năm qua như là một mô hình thiết kế dịch vụ chiếm ưu thế. Trong thực tế, REST đã có những ảnh hưởng lớn và gần như thay thế SOAP và WSDL vì nó đơn giản và dễ sử dụng hơn rất nhiều.
            + REST là một bộ quy tắc để tạo ra một ứng dụng Web Service, mà nó tuân thủ 4 nguyên tắc thiết kế cơ bản sau:
                - Sử dụng các phương thức HTTP một cách rõ ràng
                - Phi trạng thái
                - Hiển thị cấu trúc thư mục như các URls
                - Truyền tải JavaScript Object Notation (JSON), XML hoặc cả hai.
        + SOAP: SOAP (viết tắt từ tiếng Anh Simple Object Access Protocol) là một giao thức do W3C định nghĩa [1]. SOAP áp dụng XML để xác định dữ liệu dạng văn bản (plain text) qua HTTP và SMTP. Web Service dùng SOAP trong quá trình truyền tải dữ liệu. SOAP không phụ thuộc ngôn ngữ lập trình hay bất cứ nền tảng nào vì nó dùng XML.

### Có các loại RESTFull method nào ?
    * các loại RESTFul method là:
        - GET: phương thức lấy dữ liệu
        - POST: phương thức tạo mới dữ liệu
        - PUT: phương thức UPDATE dữ liệu
        -DELETE: phươn thức xóa dữ liệ
### Các bước tạo ra web server đơn giản bằng Express ?
    * các bước tạo ra 1 web server đơn giản bằng Express:
        1. cài đặt express : yarn add express --save
        2. require module express:  const express = require('express');
                                    const app = express();
        3. sử dụng các method (GET, POST, PUT, DELETE):
                                    app.get('/',(req,res)=>{
                                        res.send('hello world');
                                    })
        4. lắng nghe cổng : app.listen(3000);
### Routing là gì ?
    * Routing là 1 phần vô cùng quan trọng của 1 website, nó giống như controller trong mô hình MVC, thông qua nó, website có thể biết được người dùng đang muốn truy cập đến nơi nào của trang web từ đó phản hồi lại 1 cách thích hợp.
    * Mỗi routing có thể có 1 hoặc nhiều function xử lý, funcion sẽ thực thi khi route is matched.
### Nếu các khái niệm Route method, Route path, Route param ?
    * Router method: cũng giống như các method của HTTP, express cung cấp cho lập trình viên các method như: checkout, copy, delete, get, head, lock, merge, mkactivity, post, delete, put.....
    * Route path: đường dẫn được yêu cầu, có thể là chuỗi, các mẫu chuỗi hoặc các biểu thứ thông thường.
    * Router param: là những phân đoạn của URL, những cái được dùng để bắt giá trị tại cái vị trí của chúng trên URL, những giá trị bắt được sẽ được lưu trong req.params dưới dạng 1 object, với tên là những phân đoạn được chỉ rõ và giá trị là vị trí của của chúng trên URL.
### Template engine là gì ?, trình bày cách để tạo template trong express
    * Template engine cho phép bạn sử dụng static template files trong ứng dụng của mình, trong thời gian chạy, tempalte engine sẽ thay thế những biến trong template file bằng những giá trị thực tế, và biến đổi template đó thành HTML file sau đó gửi tới client.
    * cách để tạo template trong express (thực hiện với pug template engine:
        - 1. cài đặt pug: yarn add pug
        - 2. thiết lập cài đặt tại midleware và bố cục thư mục của project:
            + bố cục thư mục: tạo thư mục views để chứa các file html (lúc này do dùng pug nên phải đặt đuôi là .pug);
            + setup midleware: const pug = require('pug')
                                app.set('view engine','pug') 
        - 3. tạo file index.pug đặt trong views folder với nội dung tùy ý.
        - 4. ở midleware thực hiện render file index.pug:
            app.get('/',(req,res)=>{
                res.render('index',{title:'demo template engine'});
            })
        - 5. khời chạy port và ra brower để xem kết quả.
### Middleware là gì ?, Nếu các chức năng của middleware
    * Middleware là cầu nối tương tác giữa người dùng và phần nhân của hệ thống, trong lập trình web, middleware sẽ đóng vai trò trung gian giữa request/response (tương tác với người dùng) và các xử lý logic bên trong web server, nó bao gồm các hàm được dùng để tiền xử lý, lọc các request trước khi đưa vào xử lý logic hoặc điều chỉnh các respons trước khi trả về client.
    * chức năng của middleware
        - Thiện hiện bất kỳ đoạn code nào;
        - Thay đổi các đối tượng req, res;
        - Kết thức vòng tròn req-res;
        - Gọi hàm middleware tiếp theo trong callstack nếu có.
### Nêu tác dụng của phương thức use, all, next() 
    * phương thức use(): dùng để gán các chức năng được chỉ định hoặc thực hiện các chức năng ở đường dẫn cụ thể, 
        - example: app.use((req,res,nex)=>{
            console.log('chức năng được chỉ định');
        })
                    app.use('/index',(req,res,next)=>{
                        console.log('chức năng được thực hiện khi match với đường dẫn được chỉ định "/index"');
                    })
    * phương thức all(): 
    * phươn thức next(): là phương thức cho phép gọi middleware tiếp theo nếu middleware hiện tại đã thực hiện xong nhưng chưa phải là cuối cùng.
        - example: app.use('/user/:id',(req,res,next)=>{
            console.log('chưa kết thúc ở đây, muốn gọi tiếp');
            next();
        },(req,res,next)=>{
            res.send('kết thúc ở đây');
        })
        





# 1 React fundamentals
  * Read: https://www.tutorialspoint.com/reactjs/reactjs_overview.htm
## 1.1 What exactly is React ?
  * [ ] Read https://blog.andrewray.me/reactjs-for-stupid-people/
  * [ ] Read https://facebook.github.io/react/docs/why-react.html
  * [ ] Read https://facebook.github.io/react/blog/2013/06/05/why-react.html
  * [ ] Understand what is React, who build React <br>
  React một thư viện Javascript được phát triển bởi Facebook để xây dựng các thành phần ở giao diện người dùng có thể tái sử dụng được. React được sử dụng trong Facebook, Instagram. React được ví như phần View của mô hình MVC.
  * [ ] Understand why use React <br>
  - React sử dụng Viture DOM: cải thiện hiệu năng của trang web.
  - Có thể xây dựng các các Component có thể sử dụng lại.
  - React không chỉ hoạt động ở phía client mà còn có thể render ở phía server
  * [ ] Understand React advantages/disadvantages <br>
  * [ ] Understand Virtual DOM <br>
  Với DOM thật thì khi có mỗi thay đổi trên DOM thì browser sẽ render lại toàn bộ DOM nên nếu có nhiều thay đổi thì DOM sẽ phải lại render lại nhiều lần. Việc này làm ảnh hưởng đến tốc độ tải trang web. Trong React sử dụng DOM ảo giống với DOM thật nhưng khi có thay đổi trên DOM thì DOM ảo này sẽ tìm kiếm lại những điểm thay đổi và render lại DOM mới. Sử dụng DOM ảo giúp cải thiện tốc độ tải trang của trang web.
## 1.2 Environment Setup
  * [ ] Read: https://github.com/facebook/create-react-app
  * [ ] What is create-react-app <br>
  ```create-react-app``` là một package giúp thiết lập nhanh một project React.
  * [ ] Create a new app with create-react-app <br>
  Tạo một folder chứa procject -> cd tới thư mục -> Chạy lệnh ```npm install create-react-app``` -> ```create-react-app <tên_project>``` 
  Như vậy một React project đã được tạo ra.
  * [ ] How to runs the app created by create-react-app in development mode ? <br>
  Để run project được tạo ta bằng ```create-react-app``` ta cd vào project đó và chạy lệnh ```npm start```. Project sẽ được chạy ở đường dẫn http://localhost:3000/.
  * [ ] Investigate a React project structure <br>
  Một React project khi được tạo ra có cấu trúc như hình bên dưới: <br>
  ![alt text](https://image.ibb.co/i8pBWc/Capture.png "React project structure")
    * node_modules: là thư mục chứa các package khi được cài đặt vào project.
    * scr: những đoạn code sẽ được chứa trong các file bên trong thư mục này.
    * .gitignore: chứa các thư mục, các file sẽ được bỏ qua và không được commit lên.
    * package.json: file này chứa các cài đặt của project. 
## 1.3 Hello World
  * [ ] Understand React render method <br>
  render() method của Component sẽ mô tả Component sẽ như thế nào. Hàm render() chỉ render ra một nốt duy nhất nên nếu có nhiều node thì cần bọc nó lại, có thể trog một thẻ div.
  * [ ] Modify the app to display 'Hello World' in app
  * [ ] Using Developer Tools to inspect HTML <br>
## 1.4 Component 
- React Element: Một react element (là thành phần đã được rendered trên DOM ảo) là bất biến (immutable). Một khi đã tạo (rendered) element thì không thể thay đổi nội dung hay thuộc tính của nó .Chỉ có một cách để thay đổi là tạo ra một element mới bằng ReactDOM.render()
  * [ ] Understand what is a React Component ? <br>
  React được xây dựng xung quanh các Component, chứ không dùng template như các framework khác. Mỗi thành phần trên giao diện là một    Component. Các component có thể là Button, InputText, ... và các component có thể được lồng nhau.
  Điều kiện của React Component là nhận vào props và return về React element mô tả cái sẽ xuất hiện ở hàm hình
  Để tạo một component ta có hai cách: 
  ```
  // Khởi tạo bằng function
  function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
  }
  // Sử dụng class trong ES6
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```
  * [ ] Understand how many type of React Component ? <br>
  Có 2 loại component: class component và function component.
## 1.5 JSX
  * [ ] Understand what is JSX <br>
  JSX là một cú pháp mở rộng của Javascript, với JSX có thể viết Javascript với những tag giống như HTML
  . Về bản chất các tag là những lời gọi hàm sẽ được chuyển đổi trong React code và end up dưới dạng HTML và Javascript trong cây DOM.
```
// JSX
const element = <h1>Hello</h1>;

//Code React sau khi được complie
const element = React.createElement('h1', null, 'Hello');
```
  * [ ] Understand why JSX <br>
  - JXS đảm bảo tính dễ đọc và làm cho việc bảo trì được dễ dàng hơn.<br>
  - JSX tối ưu hóa code khi compile, vì vậy nó chạy nhanh hơn so với code JavaScript tương đương
  * [ ] Understand how to use JSX <br>
```
// Tạo một JSX
const MyButton = (<button>Click Me</button>)
```
  * [ ] Understand how to add JavaScript to JSX <br>
  Đặt các cặp biểu thức Javascript vào dấu ngoặc nhon {}
```
// Button sẽ có nội dung là 6
const MyButton = (<button>{1 + 5}</button>)
```
  * [ ] Understand the limitation of JavaScript in JSX <br>
  * [ ] Understand how we add style in JSX? How to <br>
  Có 2 cách add style trong JSX
  - Sử dụng thuộc tính className cho JSX như class của một thẻ html thông thường.
  ```
  const element = <div className="Hello">Hello</div>
  ```
  - Inline style
  ```
  const divStyle = {
    color: 'blue'
  };

  function HelloWorldComponent() {
    return <div style={divStyle}>Hello World!</div>;
  }
  ```
  * [ ] Understand what is JSX Comment <br>
  ```
  <div>
    {/* Comment goes here */}
    Hello, {name}!
  </div>
  ```
  * [ ] Practice put JSX Comment
  * [ ] Understand Naming Convention of JSX <br>
  Tên của các component được viết theo kiểu Pascal Case(viết hoa kí tự đầu tiên của mỗi từ).
  * [ ] Know why class and for of HTML is not the same in JSX <br>
  Để tránh trùng lặp với các từ khóa trong JXS. Ta có thể dùng className thay cho class, htmlFor thay cho for.
  * [ ] Practice know how to iterating & rendering list in React: http://jasonjl.me/blog/2015/04/18/rendering-list-of-elements-in-react-with-jsx/
## 1.6 State [0%]
  * [ ] Understand State in React (what, why and how it work?) <br>
  State biểu diễn trạng thái của component, state là private chỉ có thể thay đổi bên trong bản thân của chính component đó. 
  * [ ] Know how to change State of a Component via user input or programmatically <br>
  Để thay đổi state của một component bằng cách sử dụng this.setState().
  ```
   class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          name: ''
      };
      this.onChange = this.onChange.bind(this);
   }

   onChange(e) {
     this.setState({name: e.target.value});
   }

   render() {
     return (
       <div>
         <input type='text' onChange={this.onChange} />
         <h1>{this.state.name}</h1>
       </div>
     );
   }
 }
 ```
 Ở đoạn code khởi tạo state với name: ''.
 Function onChange được gọi mỗi khi giá trị input thay đổi và nó sẽ setState name bằng giá trị input.
 Mỗi khi state.name thay đổi thì thẻ h1 sẽ được render lại.
## 1.7 Props [0%]
  * [ ] Understand Props in React <br>
  Props có thể hiểu là thuộc tính của component, props có thể thể là function, object, string, number,... Props là bất biến, không thể thay đổi.
  ```
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  function App() {
    return (
      <div>
        <Welcome name="Sara" />        // Hello, Sara
        <Welcome name="Cahal" />       // Hello, Cahal
        <Welcome name="Edite" />       // Hello, Edite
      </div>
    );
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  ```
  * [ ] Understand why use props to create "reusable components" <br>
  * [ ] Can we set default value for a Prop <br>
  Để set default value cho props bằng cách sử dụng thuộc tính defaultProps
  ```
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }

  // Specifies the default values for props:
  Greeting.defaultProps = {
    name: 'Stranger'
  };

  // Renders "Hello, Stranger":
  ReactDOM.render(
    <Greeting />,
    document.getElementById('root')
  );
  ```
## 1.8 Props Validation [0%]
  * [ ] Understand what is validation <br>
  Validation props dùng để chắc chắn kiểu dữ liệu của props. Nếu kiểu dữ liệu của props không đúng thì sẽ có cảnh báo.
  * [ ] Know how to validate Props in React <br>
  Để validate props trong react sử dụng propTypes.
  ```
  import PropTypes from 'prop-types';

  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }

  Greeting.propTypes = {
    name: PropTypes.string
  };
  ```
## 1.9 Component Lifecycle Methods [%]
  * [ ] Understand what is lifecycle methods <br>
  Các component sẽ có một số lifecycle cho phép thực hiện một tác vụ nào đó tại một thời điểm cụ thể. Có 3 giai đoạn trong một vòng đời của một component: Mounting, Update and Unmounting.
  - Mount: Khi một component được thêm vào DOM sẽ gọi các method theo thứ tự:
    + constructor()
    + componentWillMount()
    + render()
    + componentDidMount()
  - Update: Khi props hay state của component được thay đổi thì bản thân component sẽ được re-render lại qua các phương thức:
    + componentWillReceiveProps()
    + shouldComponentUpdate()
    + componentWillUpdate()
    + render()
    + componentDidUpdate()
  - Unmount: Compont được xóa khỏi DOM.
    + componentWillUnmount()
  * [ ] Understand why we need lifecycle methods <br>
  Lifecycle methods cho phép ta cập nhật lại UI khi có sự thay đổi về props hoặc state của các component.
  * [ ] Understand 7 lifecycle methods of React Component (http://busypeoples.github.io/post/react-component-lifecycle/) <br>
  7 vòng đời của một Component trong React: 
  - componentWillMount(): được thực thi trước khi component được render. Phương thức này chỉ được gọi một lần.
  - componentDidMount(): method này được thực thi khi một component được render và được đưa vào DOM. Có thể sử dụng method này để lấy dữ liệu từ server với AJAX.
  - componentWillReceiveProps(): sẽ được thực thi ngay khi thuộc tính props được update và trước khi component được render lại. 
  - shouldComponentUpdate(): sẽ trả về true hoặc false. Phương thức này sẽ xác định 1 component có được update hay không. Mặc định giá trị này là true. Nếu bạn không muốn component render lại sau khi update state hay props thì return giá trị thành false.
  - componentWillUpdate(): được gọi khi chúng ta update state của component trước khi nó render lại
  - componentDidUpdate(): sau khi componentWillUpdate ở trên được gọi xong thì đến lượt method này được gọi. 
  - componentWillUnmount(): được gọi khi chúng ta xóa component khỏi DOM.
  * [ ] Understand componentDidMount = where you do DOM manipulation & AJAX request <br>
  * [ ] Understand componentWillMount = clean up after your React components gets destroyed <br>
  * [ ] Practice: create a Component that have 7 lifecycle methods and observe the behaviour <br>
## 1.10 Forms [%]
  * [ ] Understand how to to forms in React <br>r
## 1.11 Events [%]
  * [ ] Understand how to handle events in React such as: click event on a button, keypress event on a input <br>
  Handle event trong React tương tự như handle event trong DOM. Tuy nhiên có một số điểm khác biệt:
  - Tên event được viết theo kiểu camelCase: onClick, onChange...
  - Các hàm xử lí sự kiện được để bên trong cặp dấu ngoặc nhọn {}. onClick={handleClick}
## 1.12 Refs [%]
  * [ ] Understand refs = how to access DOM nodes within your React Component (https://reactjs.org/docs/refs-and-the-dom.html#the-ref-string-attribute) <br>
  refs dùng để tham chiếu đến một node DOM hoặc là một thể hiện của một component. refs sẽ trả về một node mà chúng ta tham chiếu đến. refs được sử dụng trong một số trường hợp:
  - Managing focus, text selection, or media playback.
  - Khi sử dụng animation.
  - Sử dụng với các thư viện DOM thứ ba.
  * [ ] Practice use refs to access a div and change style add text to it <br>
## 1.13 Mixins [0%]
  * [ ] Understand mixins = reuse methods across multiple components (https://reactjs.org/docs/components-and-props.html#mixins) <br>
## 1.14 Practice [0%]
  * [ ] Build Countdown app using React
  * [ ] Build Todo app using React
  
# 1 Concept Part 2
## 1.1 API Security
### 1.1.1 Understand Authentication vs Authorization (https://blog.restcase.com/restful-api-authentication-basics/)
* Authentication: là xác thực thông tin của một kết nối. Quá trình này bao gồm gửi các thông tin từ client lên server dưới dạng text thường hoặc đã được mã hóa bằng một giao thức xác thực. Nói cách khác là authentication chỉ ra bạn là ai.
* Authorization: là kiểm tra xem một kết nối có được phép không. Authorization được thực hiện sau khi Authentication thành công. Nói một cách khác là authorization chỉ ra rằng bạn được phép làm gì. <br/>
Ví dụ khi người dùng đăng nhập vào một hệ thống thì username và password mà gửi dùng gửi lên là quá trình authentication. Sau khi authentication thành công(username và password đúng) thì hệ thống sẽ kiểm tra xem user này có thể làm được gì trong hệ thống, chẳng hạn user chỉ có thêm xem thông tin mà không được chỉnh sửa hay xóa thông tin. Quá trình này gọi là authorization.
## 1.2 Testing
### 1.2.1 Understand TDD, BDD: https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/
* TDD(Test-Driven Development): là quá trình khi viết test trước khi viết code. Quá trình TDD bao gồm các bước sau: 
  - Viết 1 test và đảm bảo test sẽ fail.
  - Viết code để test pass.
  - Tối ưu code.
  - Lặp lại bước đầu tiên.
TDD giúp code được gọn gàng hơn, ngăn chặn bug cũng như dễ dàng sửa chữa và bảo trì.
* BDD(Behavior-Driven Development): BDD là sự mở rộng của TDD, thay vì tập trung vào phát triển phần mềm theo hướng kiểm thử, BDD tập trung vào phát triển phần mềm theo hướng hành vi. Dựa vào requirement các kịch bản test (Scenarios) sẽ được viết trước dưới dạng ngôn ngữ tự nhiên và dễ hiểu nhất sau đó mới thực hiện cài đặt source code đễ pass qua tất cả các stories đó.
### 1.2.2 Understand about Unit Test:
* https://medium.com/@lazlojuly/how-to-get-started-with-unit-testing-part-1-7f490bbf560a
* https://stackoverflow.com/questions/16860/getting-started-with-unit-testing
* https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/
* https://hackernoon.com/a-crash-course-on-testing-with-node-js-6c7428d3da02
Unit test là phương pháp testing theo từng đơn vị của code. Mục đích của unit test là đảm bảo mỗi phần trong phần mềm đảm bảo theo đúng yêu cầu đề ra. Một unit test bao gồm ba phần:
  * Arrange.
  * Act.
  * Assert
```
function add(a, b) {
  return a + b;
} 

function testAdd() {

  // Arrange
  let a = 2;
  let b = 4;
  let sum1 = a + b;
  
  // Act
  let sum2 = add(a, b);
  console.log('Fuction add() should return the sum of its two parameters.');
  console.log('Expect ' + sum1 + ' to equal ' + sum2 + '.');
  
  // Assert
  if(sum1 === sum2) {
    console.log('PASSED');
  }
  console.log('FAILED');
}

testAdd();
```
### 1.2.3 Understand about Test runner (e.g jest, mocha) <br>
Test runner là một thư viện hoặc công cụ bao gồm các unit test, các thiết lập và sau đó thực hiện chúng và viết kết quả test ra console hoặc file log. Có nhiều loại test runner khác nhau ví dụ như NUnit và MSTest cho C#, JUnit cho Java, Jest hoặc mocha cho Javascript.
### 1.2.4 Understand about Test Assertion Framework (e.g chai, jasmine) <br>
Nếu như test runner cung cấp môi trường để chạy các test và đưa ra kết quả thì Test framework là cái chúng ta dùng để viết các test. Ví dụ jasmine đưa ra các cú pháp để viết test:
```
describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
```
### 1.2.5 Understand about spies, stubs and mocks (e.g sinon) (https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js) <br>
* Spies được dùng để lấy thông tin các lời gọi hàm. 1 spy có thể chỉ ra một hàm được gọi bao nhiêu lần, đối số của mỗi hàm, giá trị trả về là gì hoặc lỗi nào trả về. Spy được sử dụng khi mục đích của test là kiểm tra điều gì đã xảy ra. Spy thường được dùng nhiều nhất để kiểm tra một hàm được gọi bao nhiêu lần thông qua ```sinon.assert.callCount```, ```sinon.assert.calledOnce```, ```sinon.assert.notCalled```,... hoặc kiểm tra xem đối số nào đã được đưa vào hàm thông qua ```sinon.assert.calledWith```, ```spy.lastCall```, ```spy.getCall()```,...
* Stubs giống như spies, ngoại trừ việc nó thay thế targer function. Stub thường được sử dụng để:
  * Thay thế một đoạn code có vấn đề: nếu một function phụ thuộc vào các yếu tố bên ngoài chẳng hạn như request lên server hay kết nối với database, việc này ta không thể kiểm soát được. Vì vậy việc viết test trở nên khó khăn hơn.
  * Trigger các code path khác nhau: nếu đoạn code ta đang test gọi một hàm khác chúng ta cần test nó sẽ hoạt động như thế nào nếu có lỗi.
  * Stubs có thể đơn giản hóa việc testing code bất đồng bộ.
* Mock: nên được sử dụng chủ yếu khi dùng stub nhưng cần xác mình nhiều hành vi cụ thể hơn trên đó.
### 1.2.6 Understand code coverage (e.g nyc) <br>
Code coverage là xác định xem có bao nhiêu code đã được test. Nó được tính theo công thức: <br>
```Code Coverage = (Number of lines of code exercised)/(Total Number of lines of code) * 100%```
### 1.2.7 Understand HTTP mocking (e.g nock) <br>
HTTP mocking tạo một server ảo để có thể kiểm tra từng request có reponse về theo đúng yêu cầu hay không.
## 1.3 Understand disadvantage of React alone <br>
- Truyền props từ component cha xuống component con và từ component con lên component cha rất phức tạp nếu ứng dụng có nhiều tầng component.
## 1.4 Flux
### 1.4.1 Understand Flux architecture <br>
Flux là một kiến trúc được Facebook đưa ra và được đưa vào React. Dữ liệu luôn chỉ di chuyển theo một chiều duy nhất, khi có dữ liệu mới luồng sẽ bắt đầu lại từ đầu: <br>
 ![alt text](https://cdn-images-1.medium.com/max/800/1*lZM0yU9ExEMd7DggVxXkxA.png)
* Actions - Làm nhiệm vụ truyền dẫn dữ liệu tới Dispatcher 
* Dispatcher - Nhận thông tin từ Actions, truyền tải dữ liệu tới các nơi đã đăng ký nhận thông tin.
* Stores - Là nơi lưu trữ trạng thái và các logic của hệ thống, đây chính là nơi sẽ đăng ký nhận dữ liệu với Dispatcher.
* Views chính là thành phần làm nhiệm vụ hiển thị nội dung ứng dụng
### 1.4.2 Understand Universal Data Flow <br>
Flux giúp làm việc với các component dễ dàng hơn thông qua luồng dữ liệu một chiều (Unidirectional Data Flow).
![alt text](https://cdn-images-1.medium.com/max/800/1*lZM0yU9ExEMd7DggVxXkxA.png)
  * Views chính là thành phần làm nhiệm vụ hiển thị nội dung ứng dụng. 
  * Khi người dùng tương tác với ứng dụng(click button, nhập dữ liệu...) làm thay đổi state của ứng dụng, view sẽ thông qua action gửi thông tin tới dispatcher.
  * Sau khi nhận được thông tin từ Action, Dispatcher làm nhiệm vụ gửi nội dung nhận được tới các Store đăng ký lắng nghe sự kiện thay đổi từ trước đó.
  * Store sau khi nhận thông tin, tiến hành cập nhật lại state.
  * Sau đó view hiển thị lại nội dung.
### 1.4.3 Understand Action, Dispatcher, Store, View
* Action: 1 action được hiểu là mỗi sự kiện làm thay đổi trạng thái của ứng dụng và sẽ tạo ra một object action tương ứng với type và payload của action đó sau đó nó sẽ được chuyển tới Dispatcher.
* Dispatcher: có nhiệm vụ nhận action payload từ action và gửi nó tới các callback đã được đăng kí trước.
* Store: là nơi chứa các trạng thái, logic của ứng dụng. Store có chứa các method callback đã được đăng ký với Dispatcher.
* View: nhận input data từ người dùng cũng như lắng nghe các thay đổi từ Store để hiển thị kết quả, trạng thái của ứng dụng.
## 1.5 Redux
### 1.5.1 Understand Redux (https://redux.js.org/) <br>
Redux là thư viện được thiết kế dựa trên kiến trúc Flux giúp quản lí state của ứng dụng dễ dàng hơn. Ví dụ như project của chúng ta có nhiều component và việc truyền dữ liệu qua lại giữa các component sẽ rất phức tạp vì vậy Redux đưa ra một giải pháp là các state được lưu trữ tại một điểm duy nhất - gọi là Store. <br>
Redux có 3 nguyên tắc như sau:
* Single source of truth: State của toàn bộ ứng dụng được lưu trong trong 1 store duy nhất là 1 Object mô hình tree.
* State is read-only: Chỉ có 1 cách duy nhất để thay đổi state đó là tạo ra một action.
* Changes are made with pure functions: Để chỉ rõ state tree được thay đổi bởi 1 action bạn phải viết pure reducers.
### 1.5.2 Understand Action, Reducers, Store, Data Flow <br>
Redux có 4 thành phần chính: 
* Action: Là nơi mang các thông tin dùng để gửi từ ứng dụng đến Store. Các thông tin này là 1 object có 2 thuộc tính:
  - type: kiểu mô tả action.
  - payload: giá trị tham số truyền vào.
* Reducers: là nơi xác định state thay đổi như thế nào. Reducer nhận 2 tham số vào: 1 state cũ và action được gửi lên sau đó trả ra một state mới, ko làm thay đổi state cũ.
* Store:  Là nơi quản lý State, cho phép truy cập State qua getState(), update State qua dispatch(action), đăng kí listener qua subscribe(listener).
* View: Hiển thị dữ liệu được cung cấp bởi Store. <br>
Data flow: Vòng đời của 1 ứng dung Redux bao gồm 4 bước:
* Gọi store.dispatch(action): 1 action là một object mô tả những gì sẽ xảy ra.
* Redux store gọi reducer function: store sẽ gửi hai tham số là state hiện tại và action.
* Root reducer có thể kết hợp output của nhiều reducers thành một single state tree: Redux có helper function combineReducers(), giúp cho việc chia nhỏ function thành các function quản lý các nhánh của state tree.
* Redux store lưu lại toàn bộ state tree được trả về bởi root reducer: state tree mới này sẽ là trạng thái mới của ứng dụng. Mỗi một listener registered với store.subscribe(listener) sẽ được gọi. Listenter có thể gọi store.getState() để lấy current state.
### 1.5.3 Understand Async Action, Async Flow, Middleware
* Async Action: đôi khi trong các sự kiện chúng ta muốn nó chạy bất đồng bộ. Ví dụ khi login thì ta phải gửi request lên server
và đợi server phản hồi về tùy vào kết quả thành công hay thất bại cần dispatch một action tương ứng để store update lại state của ứng dụng và hiển thị lên view.
* Async Flow: không đồng bộ được thực hiện nhờ middleware: redux-thunk, redux promise cho phép gửi đi nhiều hơn một là action, có thể là hàm hoặc promise
* Middleware: Đặt giữa gửi đi action và reducer, sử dụng để ghi log, báo lỗi, nhận API không đồng bộ, routing...
## 1.6 Redux Saga
### 1.6.1 https://medium.freecodecamp.org/async-operations-using-redux-saga-2ba02ae077b3 <br>
Redux-Saga là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generatorscủa ES6, nó cho phép ta viết async code nhìn giống như là synchronos.
### 1.6.2 Understand limitation of Redux in Async Flow ?
### 1.6.3 Understand ES6 generator (http://2ality.com/2015/03/es6-generators.html) <br>
generator function là một tính năng mới của ES6 có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác.
```
function* name([param[, param[, ... param]]]) {
   // statements
}
```
Hàm sẽ không được thực thi ngay sau khi gọi, mà thay vào đó generator function trả về iterator, giống như con trỏ trong vòng lặp. 
Sau khi hàm next() của iterator được gọi, generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield đầu tiên. yield sẽ trả về giá trị cho iterator, generator function kết thúc cho đến khi hết giá trị để yield.
```
function* idMaker() {
  var index = 0;
  while (index < index+1)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```
### 1.6.4 Understand effect
### 1.6.5 Understand fork, take, race, put, call, select, takeLatest, takeEvery


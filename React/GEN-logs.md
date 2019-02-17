### 1. Ngày 31/1/2019: Bắt đầu quá trình quay trở lại ReactJs cuả tối như thế naò
Mới đầu cũng tự tin phết, js cũng không quá khó với tôi. Tự tin có thể cân đc vài phần hộ anh Tuấn :))). Cơ mà căng vđ, mỗi cái cho Css vào trong file HTML công thêm cái back-ground image mà lỗi lên lỗi xuống mất bố nó cả ngày, hầy
Thôi không sao cũng coi như chưa quen cònfig. Đến phần cho được rồi thì được giao 4 cái HTML để cắt cho nó responsive ngon ngẻ :))). ĐM khó vãi đạn, sao flex ko work hoá ra quên display: flex. Ở RN méo cần cái này nhé, tự động rồi

Nhưng mà vẫn đéo work vì heigh: 1vh là full màn. đền đệt hoá ra phải bằng 100vh với đúng
H phải chuyển sang thằng Grid cho nó hoàng tráng, bằng bạn bằng bè (hay phết chứ ko đùa)
 
### 2. Ngày 1/2/2019: Câu hỏi đầu ngày gây đau lòng: Em đã thực sự hiểu hết redux chưa

Tôi phải lọ mọ tìm hiểu lại vì thực sự đã hiểu gì về nó đâu, dự ấn trước làm tay chân à.
1. React Questions: 
2. React- Redux questions:

#### Life-cycle hooks (V >16)
Life circle các hàm  sẽ được gọi tại các thời điểm trong vòng đời của một component, gồm có 3 giai đoạn như sau 
Mounting, updating, unmount
1. Mount: Khi một component được thêm vào DOM sẽ gọi các method theo thứ tự:
constructor()
componentWillMount()
render()
componentDidMount()
2. Update: Khi props hay state của component được thay đổi thì bản thân component sẽ được re-render lại qua các phương thức:
componentWillReceiveProps() (Không khuyên dùng. )
shouldComponentUpdate()
componentWillUpdate() (Không khuyên dùng. )
render()
componentDidUpdate()
3. Unmount: Compont được xóa khỏi DOM.
componentWillUnmount()

#### Context ?
Context cung cấp một cách để truyền dữ liệu từ trên xuống dưới (Top - down) thông qua props, 

```javascript
const FamilyContext = React.createContext({});

class GrandFather extends React.Component {
  state = {
    lastName: "Biswas"
  };
render() {
    return (
      <FamilyContext.Provider value={this.state.lastName}>
        <Father />
      </FamilyContext.Provider>
    );
  }
}
const Father = () => {
  return <Child />;
};
const Child = () => {
  return <FamilyContext.Consumer>{context => <p>{context}</p>}</FamilyContext.Consumer>;
};

```

#### Render props ?
Là chỉ đến một kĩ thuât để chia sẻ code giuă các component của React
Một component với render props sẽ nhận vào một một function mà fucntion đá sẽ render ra là một React Elememt, cái 
mã nó sẽ có nhưng logic sử li riêng


#### StrictMode ?
Là một tools để đánh dấu cacs thành phần có thể gây ra lỗi trong úng dụng: <React.StrictMode>
- Identifying components with unsafe lifecycles

- Warning about legacy string ref API usage

- Warning about deprecated findDOMNode usage

- Detecting unexpected side effects

- Detecting legacy context API


#### createRef() ?
Refs cung cấp một cách để access DOM hoặc React Element được tạo trong hàm render()

Trong luồng của React thông thường thì props là các duy nhất mà Parent có thẻ tương tác với Child => đê thay đỏ thằng 
con thì thằng cha sẽ render lại với một prop mới. Tuy nhiên có một số trường hợp hãn hữu mà cần phải thay đổi
thằng con ngoài luồng

- Managing focus, text selection, or media playback.

- Triggering imperative animations.

- Integrating with third-party DOM libraries.



#### Redux ?
- Gỉair thích về luồng React-Redux:
What: Redux là gì 
![](./redux-model.png?raw=true)
Why: Tại sao phải dùng Redux
Trong React việc truyền data (hoặc state) từ cha xuống con sẽ được thưc hiện qua props, nhưng vấn đề đặt ra là nếu 
Dữ liệu cần được truyền từ lớp 1 đến lớp 5 thì nó sẽ đi qua 4 lớp mà không cần , việc pass dữ liệu từ con lên cha cũng mất tùng đấy 
tầng sẽ mất nhiều thời gian -> Code phưc tạp 
How:
When:
Middleware: Là phần nằm giữa action và reducer => Nó vô cùng hữu dụng cho việc thực hiện các tác dụng bất đông bộ như call API
Trả lại một reducer và dispatch lại cho reducer

#### Redux Saga ?

### Ngày 3: Mùng 6 tết với quyết tâm làm việc tới bến:
#### Webpack là cái khỉ gì:
 - Theo định nghĩa chính thức: là một module bundler cho các ứng dụng JS hiện đại. Khi webpack chạy nó sẽ nội tại build một dependency graph cái sẽ map các module mà dự án cần để generate one or more bundles
 - Tại sao phải dùng Webpack (Được chạy trên nền NodeJS): 
1. Sự ra đời của JS module bắt đầu từ khi CommonJS ra đời mà cho ra khái niệm `require`cũng là lúc khái niệm module ra đời cho phép
load và sử dụng module ở bên trong một file bằng term `require`
Nhưng mà không một browser nào hỗ trở CommonJS cà và CommonJS chỉ phổ biến ở các ứng dụng NodeJS
2. Sự ra đời của Browserify, RequireJS and SystemJS cho phép sử dụng CommonJS ở các browser
3. Thât may mắn là khái niệm module đã được chính thức ở ES6 bằng term `from`
4. Vậy sự tồn tại của Webpack là gì? là nó sẽ không chỉ bundle `.js` files mà  different assets như images, fonts and stylesheets.
#### Core concept của Webpack
1. Entry: Là điểm bắt đầu của dependency graph 
```javascript
  module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
2. Output: Là nơi khai báo tên và đường dẫn của files outputs
3. Loaders: Thực tể Webpack chỉ hiểu JS files và package.json. Loaders cho phép webpack sử lí các kiểu files khác thành các module hợp lệ để sử dụng trong ứng dụng và được thêm vào dependency graph
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```
4. Plugins: được tận dụng để thực hiện các wider range of tasks như tối ưu bundle và quản lí asset
#### Cac lỗi hay gắp webpack
1. Trong file sử dụng ES6 nhưng chưa cài babel loader
```javascript
Module parse failed: Unexpected token (7:2)
You may need an appropriate loader to handle this file type.
| const Home = () => (
>   <div>
|     <Head title="Home" />
|     <Nav />


```

### Ngay 4: Học lại về Css cơ bản
1. Adding css file into HTML files:
2. Box - model: 
3. Grid: Các bước để tạo ra một layout bằng grid là:
  * 1. Tạo các lưới chia layout bằng grid column hoặc grid row  
  * 2. Dựng layout cho các thành phần trong grid bằng grid template
  * 3. Dùng @media query để chia responsive
4. Kể ra từ khi dùng dự án cung ít khi dùng grid vì layout khá đơn giản, chủ yếu lại dùng flex :)))
Thế lại ôn lại về flex vậy:
 * 1. Cái hay đầu tiên là cứ thằng cha display: flex thì tức là các thằng bên trong bắt đầu phải tuân theo quy tắc của cách chia layout này bao gồm flex-direction: row, justify-content: flex-start, align-items: stretch, ...
Chiều rộng(width) sẽ luôn tràn hết =100% nếu cac items bên trong ko xác định chiều rộng
 * 2. khi sử dụng flex, ta sẽ ko sử dụng % để chia chiều rộng của cột cũng nhưng chiều dài (height) khi đã biết trươc height
 mã sẽ sử dụng thuộc tính flex = 1, 2, 3 theo tỉ lệ phân số
 * 3. Thuộc tính height mặc định của các các items sẽ bằng nhau là bằng bằng thành cao nhất, quyết đinh bởi thuộc tính aligh-items
 * 4. Tạo gap cho các items bằng cách fix width (flex-basis) và justify-content
 * 5. Có thể cho một phần tử là center (justify-content, align-items: center tại phần tử cha) bằng cách css phần tử đó margin: auto
 

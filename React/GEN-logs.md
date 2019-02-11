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


#### Cut HTML CSS using GRID


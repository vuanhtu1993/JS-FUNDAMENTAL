## Better Modals in React Navigation
- Create Stack Navigation
```javascript
	const ModalStack = StackNavigator({
	  Home: { screen: MyHomeScreen },
	  Profile: { screen: MyProfileScreen },
	}, {
	  mode: 'modal',
});
``` 
#### Issue: Nếu bạn không muốn tất cả các màn hình của bạn to be presented in a modal
- Fix: React Navigation cho phép chúng ta tạo nhiều navigators với các thuộc tính khác nhau và lồng vào trong 1 cái
```javascript
// Main Card-Style Navigator
	const MainStack = StackNavigator({
	  Home: { screen: HomeScreen },
	  Detail: { screen: DetailScreen }
	});

// Modal-Style Navigator
	const ModalStack = StackNavigator({
	  Home: { screen: MainStack },
	  Modal: { screen: ModalScreen },
	}, {
	  mode: 'modal',
	});
```
- MainStack là một component lòng 2 màn hình ở bên trong. Sau đó lại là đầu vào của HomeScreen
#### Issue rồi em ơi :(
- Khi ta lồng 2 stackNavigation vào trong một stackNavigation khác đã invertently asked navigator tạo ra 2 header
Và đương nhiên trong doc đã có ghi cách FIX
```javascript
	// Modal-Style Navigator
	const ModalStack = StackNavigator({
	  Home: { screen: MainStack },
	  Modal: { screen: ModalScreen },
	}, {
	  mode: 'modal',
	  headerMode: 'none',
	});
```
#### Wait lại issue nữa cũng như SHIT em ơi DAMN IT (mất bố nó header của MODAL)
- Cách FIX như sau
Cách 1: Tự việt một header cho modal
Cách 2: Lấy Header đã viết sẵn của react navigation
```javascript
	import Header from 'react-navigation/src/views/Header/Header';
	class ModalScreen extends React.Component {
	  render() {
	   return (
		 ...
		 <Header scene={{index: 0}}
				 scenes={[{index: 0, isActive: true}]}
				 navigation={{state: {index: 0}}}
				 getScreenDetails={() => ({options: {
					title: 'Modal',
					headerRight: (
					  <Button 
						 title="Close" 
						 onPress={() => this.props.navigation.goBack()}
					  />
					)
				 }})}
		 />
		 ...
	   );
	  }
	}
```
>Xong issue đầu tiên, khó quá chừng hầy. Nhưng mà ngon phết

## Expanding and Collapsing Elements 
-Link: https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/

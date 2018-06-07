## React Navigation
5. Configure header bar
### Khái báo Header title
-Mỗi conponent sẽ có một thuộc tính static navigationOptions là một object hoặc một function return ra object
```javascript
	class HomeScreen extends React.Component {
	  static navigationOptions = {
		title: 'Home',
	  };

	  /* render function, etc */
	}

	class DetailsScreen extends React.Component {
	  static navigationOptions = {
		title: 'Details',
	  };

	  /* render function, etc */
	}
```
### sử dụng param ở trong title
- Đẻ sử dụng đc các param truyền từ screen này sang screen khác thì navigationOptions phải là một hàm mà return ra một object
```javascript
	class DetailsScreen extends React.Component {
	  static navigationOptions = ({ navigation }) => {
		return {
		  title: navigation.getParam('otherParam', 'A Nested Details Screen'),
		};
	  };

	  /* render function, etc */
	}
```
- Object là tham số của hàm navigationOptions là một object có các thuộc tính như sau
	1. navigation: là navigation prop của screen
	2. screenProps - The props passing from above the navigator component
	3. navigationOptions - The default or previous options that would be used if new values are not provided
### Cập nhật NavigationOptions với setParam
- Bằng phuong thức setParam
```javascript
  /* Inside of render() */
  <Button
    title="Update the title"
    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
  />

```
### Thay doi style cho header 
- Có 3 thuộc tính có sẵn là headerStyle, headerTintColor, headerTitleStyle
```javascript
	class HomeScreen extends React.Component {
	  static navigationOptions = {
		title: 'Home',
		headerStyle: {
		  backgroundColor: '#f4511e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
		  fontWeight: 'bold',
		},
	  };

	  /* render function, etc */
}
``` 
- có 2 điều cần chú ý: 

### Chia sẻ navigationOptions dùng chung qua các Screen
- Thay vì cứ copy style của header ở mỗi screen thì ta sẽ lưu style đó ở trong stack navigator
```javascript
		class HomeScreen extends React.Component {
	  static navigationOptions = {
		title: 'Home',
		/* No more header config here! */
	  };

	  /* render function, etc */
	}

	/* other code... */

	const RootStack = createStackNavigator(
	  {
		Home: HomeScreen,
		Details: DetailsScreen,
	  },
	  {
		initialRouteName: 'Home',
		/* The header config from HomeScreen is now here */
		navigationOptions: {
		  headerStyle: {
			backgroundColor: '#f4511e',
		  },
		  headerTintColor: '#fff',
		  headerTitleStyle: {
			fontWeight: 'bold',
		  },
		},
	  }
	);
```
### Override the common navigationOptions 
### Custom title bằng các component khác (custom component)

### Header button
- Cách tương tác thường dùng nhất là thêm button vào bên trong header
```javascript
	class HomeScreen extends React.Component {
	  static navigationOptions = {
		headerTitle: <LogoTitle />,
		headerRight: (
		  <Button
			onPress={() => alert('This is a button!')}
			title="Info"
			color="#fff"
		  />
		),
	  };
	}
```
### Tương tác Header với screen component
- Concept: vì static navigationOptions không phải là instance của Screen Component nên không sử dụng đc các phương thức của Component đã đc khai báo
- Phương án đưa ra là SỬ DỤNG navigation.setParam({newParam}) để navigationOptions nhận đc phương thức mới đc khai báo
DEMO
```javascript
	class HomeScreen extends React.Component {
	  static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || {};

		return {
		  headerTitle: <LogoTitle />,
		  headerRight: (
			<Button onPress={params.increaseCount} title="+1" color="#fff" />
		  ),
		};
	  };

	  componentWillMount() {
		this.props.navigation.setParams({ increaseCount: this._increaseCount });
	  }

	  state = {
		count: 0,
	  };

	  _increaseCount = () => {
		this.setState({ count: this.state.count + 1 });
	  };

	  /* later in the render function we display the count */
	}
```
### Customize back button
### Override the back button


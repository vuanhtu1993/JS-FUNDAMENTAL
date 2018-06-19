## React Navigation
- Concept cửa Navigation trong web và RN là khác nhau
- Web browser có một history stack, khi người dùng trỏ vào anchor <a> thì url sẽ đc push vào stack này, khi người dùng click back thì stack sẽ pop url cuối cùng ra
- React Navigation cung câp mọt cách để chuyển giữa các màn hình và quản lí Navigation history. ```Khác biết giữa web và RN là ``` RN sử dụng nhiều stack navigator hơn và React Navigation cung cấp các
gestures và animation tùy thuộc Android hay IOS khi navigate giữa các route trong stack
### Tạo stack navigator
- Sử dụng phương thức ```createStackNavigator``` để tại stack, function này return ra React Component. Nó nhận vào một ```route configure object``` nên có thể viết trực tiếp trong App.js
```javascript
 import React from 'react';
 import { View, Text } from 'react-native';
 import { createStackNavigator } from 'react-navigation';

 class HomeScreen extends React.Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Home Screen</Text>
       </View>
     );
   }
 }

 export default createStackNavigator({
   Home: {
     screen: HomeScreen
   },
 });
 ```
 -Ở RN các component đc export từ App.js là các entry point (root component). Nó là phần từ mà từ nó các con đc bọc bên trong nó. Nó thường đc sử dụng để
 quản lý các component con.
 ```javascript
 const RootStack = createStackNavigator({
   Home: {
     screen: HomeScreen
   },
 });

 export default class App extends React.Component {
   render() {
     return <RootStack />;
   }
 }
 ```
 ### Adding second route
 ```javascript
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
 ```
 - Giờ ta đã có 2 route một là Home 2 là Details, và initial stack là Home route

 ## Moving the between screens
 - Thay vì sử dụng các anchor <a> để navigate sang screen khác thì RN sử dụng ```navigataion prop``` để truyền vào screen component
 ### Navigating to the new screen
 ```javascript
 import React from 'react';
 import { Button, View, Text } from 'react-native';
 import { createStackNavigator } from 'react-navigation';

 class HomeScreen extends React.Component {
   render() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Home Screen</Text>
         <Button
           title="Go to Details"
           onPress={() => this.props.navigation.navigate('Details')}
         />
       </View>
     );
   }
 }
 ```
 - Cùng làm rõ hơn: navigation prop đc truyền đến tất cả các screen đc defined ở trong stack navigator,
 - navigate('Screen') function sẽ đưa người dùng đến screen được trỏ đến
### Navigating to route multiple time
```javascript
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
      </View>
    );
  }
}
```
- Khi sử dụng phương thức navigate thì RN chỉ push những route chưa có trong navigation stack vào trong stack, nhưng phương thức push thì cứ thêm mới vào route vào stack mà không quan tâm nó đã tồn tại hay chưa
### Go back
- Header cung cấp bới stack navigator sẽ tự động thêm một back button khi mà nó có thể go back từ screen hiện tại. Nhưng nếu muốn custom thì có thể sử dụng phương thức goBack()
```javascript
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```
## Pass parameter to routes
- Cần 2 bước để thực hiện việc truyền dữ liệu qua phương thức navigate
1. (Trang gốc) Truyền một object dữ liệu cần truyền vào tham số thứ 2 của phương thức navigate('Screen', {object passed data}) hoặc phương thức push()
2. (Trang đích) Bắt được parameter đã truyền bằng phương thức getParam(ParamName, defaultValue(if parameter undefined))
  Có thể thay thế phương thức getParam bằng phương thức ```this.props.navigation.state.params```
```javascript
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
```

## React Native Animation
- Animation rất quan trọng cho trải nghiệm người dùng, thông thường thì các đối tượng chuyển động have momentum rarely come a stop ngay lập tức, mà nó sẽ chuyển động theo quản tính. RN cung cấp 2 hệ thống animation bổ xung: Animated for granular and interactive control of specific values, and LayoutAnimation for animated global layout transactions.
#### Animated API
- The Animated API is designed to make it very easy to (concisely express) thể hiện ngắn ngon a wide variety of interesting animation and (interaction patterns) tương tác mẫu in a very performant way. Animated focuses on declarative relationships between inputs and outputs. With configurable transforms in between (Với cấu hình thay đổi ở giữa), and simple start/stop methods to control time-based animation execution.
- Animated exports four animatable component types: View, Text, Image, and ScrollView, but you can also create your own using Animated.createAnimatedComponent().

For example, a container view that fades in when it is mounted may look like this:
```javascript
import React from 'react';
import { Animated, Text, View } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
        </FadeInView>
      </View>
    )
  }
}
```
* Bước 1: Khởi tạo giá trị Animated.Value vào state (Input)
* Bước 2: Cho vào hàm componentDidMount để setState cho trạng thái cần animation (Output)
* Bước 3: Sử dụng fadeAnim ở bên trong Animated.View, Image, Text, ScrollView 
This is done in an optimized way that is faster than calling setState and re-rendering.
Because the entire configuration is declarative, we will be able to implement further optimizations that serialize the configuration and runs the animation on a high-priority thread.



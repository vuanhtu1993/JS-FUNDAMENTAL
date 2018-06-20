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
- Link: https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/

## Expanding and Collapsing Panel apply animation 
- Link https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
```javascript
import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('./images/Arrowhead-01-128.png'),
            'down'  : require('./images/Arrowhead-Down-01-128.png')
        };

        this.state = {
            title       : props.title,
            expanded    : true,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;
```
## Custom Every Component Easier
- Concept: Hầu hết các native conponent của 'react-native' đều có props là style (Điều này cũng đúng với 'native-base')
nên ta sẽ dựa vào cái này để xây dựng các custom component
```javascript
	import PropTypes from ‘prop-types’;
	import React, { Component } from 'react';
	import { Text, TouchableOpacity } from 'react-native';
	class CustomText extends Component {
	  static propTypes = {
	    children: PropTypes.string.isRequired,
	    textStyles: PropTypes.oneOfType([
	      PropTypes.array,
	      PropTypes.number,
	      PropTypes.shape({}),
	    ]).isRequired,
	    buttonStyles: PropTypes.oneOfType([
	      PropTypes.array,
	      PropTypes.number,
	      PropTypes.shape({}),
	    ]).isRequired,
	  }
	render = () => {
	    const { textStyles, buttonStyles, children } = this.props;
	    return (
	      <TouchableOpacity style={buttonStyles}>
		<Text style={textStyles}>{children}</Text>
	      </TouchableOpacity>
	    );
	  }
	}
	export default CustomText;
	########################################
	import CustomText from ...
	<CustomText
	  buttonStyles={styles.buttonStyles}
	  textStyles={styles.textStyles}>
	    This is some custom text
	</CustomText>
```
## Press and hold button action RN
- Link: https://codedaily.io/tutorials/24/React-Native-Press-and-Hold-Button-Actions
```javascript
var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback
} = React;

var ACTION_TIMER = 400;
var COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];

var AnimatedButtonPress = React.createClass({
  getInitialState: function() {
    return {
        pressAction: new Animated.Value(0),
        textComplete: '',
        buttonWidth: 0,
        buttonHeight: 0
    };
  },
  componentWillMount: function() {
    this._value = 0;
    this.state.pressAction.addListener((v) => this._value = v.value);
  },
  handlePressIn: function() {
    Animated.timing(this.state.pressAction, {
        duration: ACTION_TIMER,
        toValue: 1
    }).start(this.animationActionComplete);
  },
  handlePressOut: function() {
    Animated.timing(this.state.pressAction, {
            duration: this._value * ACTION_TIMER,
            toValue: 0
    }).start();
  },
  animationActionComplete: function() {
    var message = '';
    if (this._value === 1) {
        message = 'You held it long enough to fire the action!';
    }
    this.setState({
        textComplete: message
    });
  },
  getButtonWidthLayout: function(e) {
    this.setState({
        buttonWidth: e.nativeEvent.layout.width - 6,
        buttonHeight: e.nativeEvent.layout.height - 6
    });
  },
  getProgressStyles: function() {
    var width = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.buttonWidth]
    });
    var bgColor = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: COLORS
    })
    return {
        width: width,
        height: this.state.buttonHeight,
        backgroundColor: bgColor
    }
  },
  render: function() {
    return (
       <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPressIn={this.handlePressIn} 
                onPressOut={this.handlePressOut}
            >
                <View style={styles.button} onLayout={this.getButtonWidthLayout}>
                    <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
                    <Text style={styles.text}>Press And Hold Me</Text>
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text>{this.state.textComplete}</Text>
            </View>
       </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#111'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});


AppRegistry.registerComponent('SampleApp', () => AnimatedButtonPress);
```
## Series Building with React Native
- Link: https://medium.com/building-with-react-native

## Draw shape in React Native 
- Link https://www.npmjs.com/package/react-native-art-extra
```javascript
import React from 'react';
import ART from 'react-native-art-extra';
import {Text, View} from "react-native";
import {responsiveHeight} from "../../../public/ShareComponent/Dimension";

const {Surface, Group, Shape, Circle, Transform} = ART;
const style = {
  fill: '#40a8a7' ,
  stroke: '#ddd' ,
  strokeWidth: 2,
  strokeCap: 'square',
  strokeJoin: 'miter',
};

class BubbleChart extends React.Component {
  render () {
    return (
      <View>
        <Text>Abc</Text>
        <Surface width={responsiveHeight(100)} height={400}>
          <Circle {...style} cx={100} cy={100} r={70}/>
          <Circle {...style} cx={220} cy={80} r={50}/>
          <Circle {...style} cx={180} cy={180} r={40}/>
          <Circle {...style} cx={250} cy={160} r={30}/>
        </Surface>
      </View>
    );
  }
}

export default BubbleChart;
```

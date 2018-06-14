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
```javascipt
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

### React filter item including category (through twice field)
```javascript
render() {
    let row = [];
    let category = null;
    // filter condition
    let filterText = this.props.filterText;
    let isStockOnly = this.props.isStockOnly;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (isStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== category) {
        row.push(
          <ProductCategoryRow product={product}/>
        )
      }
      row.push(
        <ProductRow product={product}/>
      );
      category = product.category;
    });
    return (
      <div>
        <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      </div>
    );
  }
```
## Functions as child component
- Link
```javascript

import React from 'react';
import PropTypes from 'prop-types'
class ScrollPosition extends React.Component {
  state = {
    position: 0,
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () =>{
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    this.setState({
      position: scrollTop,
    });
  };
  render() {
    return (
      <div>{this.props.children(this.state.position)}</div>
    );
  }
}
export default ScrollPosition;

ScrollPosition.propTypes = {
  children: PropTypes.func.isRequired,
};

// App.js
class App extends Component {
  render() {
    return (
      <div className="app">
          <div className="height"/>
          <ScrollPosition>
            {(position) => <div className="position">{position}</div>}
          </ScrollPosition>
          <div className="height"/>
        </div>
    );
  }
}

export default App;
```
## React children API
- Link:
```javascript
////////////////
// Slider
///////////////
import React, {Children} from 'react';

class Slider extends React.Component {
  state = {
    total: 0,
    current: 0,
  };
  componentDidMount() {
    const {children} = this.props;
    this.setState({
      total: children.length,
    });
    this.interval = setInterval(this.showNext, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  showNext = () => {
    const {total, current} = this.state;
    this.setState({
      current: current + 1 === total ? 0 : current + 1,
    });
  };
  render() {
    const bullet = Array(this.state.total).fill("o");
    bullet[this.state.current] = "*";
    return (
      <div style={{width: '50%', margin: 'auto', textAlign: 'center'}}>
        {bullet}
        {this.props.children[this.state.current]}
      </div>
    );
  }
}

export default Slider;

///////////
// App.js
///////////
class App extends Component {
  render() {
    return (
      <div className="app">
          <Slider>
            <img style={{width: '100%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2Nf_oCroXKd3dGpWN1nCDX3gAXyaWac_fBBhVv5Oe36D7W12'/>
            <img style={{width: '100%'}} src='https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&h=350'/>
            <img style={{width: '100%'}} src='https://images.pexels.com/photos/103573/pexels-photo-103573.jpeg?auto=compress&cs=tinysrgb&h=350'/>
          </Slider>
      </div>
    );
  }
}
```

## Higher order component
- Link:

```javascript
import React from 'react';
import LoaderHOC from "../HOC/LoaderHOC";

class ArticleDetail extends React.Component {
  render() {
    const {phones} = this.props;
    console.log(phones);
    return (
      <div>
        {phones.map(phone => (
          <li>{phone.id}, {phone.name}</li>
        ))}
      </div>
    );
  }
}
// ở đây thực chất là gọi Higher order component
export default LoaderHOC(ArticleDetail);

////////////////////////////
///// Higher order component
////////////////////////////
import React from 'react';

import './loader.css';
const LoaderHOC = (WrapComponent) => {
  return class LoaderHOC extends React.Component {
    render() {
    // Class loader is the spiner
       return this.props.phones.length === 0 ? <div className="loader"> </div> : <WrapComponent {...this.props}/>
    }
  }
};
export default LoaderHOC;

```

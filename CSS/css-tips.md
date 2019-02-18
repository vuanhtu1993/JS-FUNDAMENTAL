## CSS tips course

#### 1. Tạo background full màn hình 
```html
    <!--HTML-->
    <div id="bg">
      <img src="images/bg.jpg" alt="">
    </div>
```
```css
    csss
    #bg {
      position: fixed; 
      top: -50%; 
      left: -50%; 
      width: 200%; 
      height: 200%;
    }
    #bg img {
      position: absolute; 
      top: 0; 
      left: 0; 
      right: 0; 
      bottom: 0; 
      margin: auto; 
      min-width: 50%;
      min-height: 50%;
    }
    
    /*Hoặc đơn giản hơn nữa mà vẫn đẹp là*/
    body {
      background: url("https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")
        no-repeat center center fixed;
      background-size: cover;
      height: 100vh;
    }
```

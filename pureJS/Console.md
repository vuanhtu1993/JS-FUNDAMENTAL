## Console.log, warn, error
- Là những phương thức được sử dụng nhiều nhất. Warn và error dùng như console.log

## Console.group
- Gom nhóm các console.log ở giữa console.group và console.groupEnd
```javascript
  function doSomething(obj) {
    console.group('doSomething Profile');
    const _data = new Date()
    console.log('evauating data: ', _data);
    const _fullName = `${obj.firstName} ${obj.lastName}`
    console.log('fullName: ', _fullName);
    const _id = Math.random(1)
    console.log('id: ', _id);
    console.groupEnd()
  }

  doSomething({"firstName": "Riccardo", "lastName": "
```
## Console.table (Hay vđ :) amazing JS)
```javascript
  const mySocial = {
    facebook: true,
    linkedin: true,
    flickr: true,
    instagram: true,
    VKontaktebadoo: false
  }

  console.table(mySocial);
```
- Có thể sử dụng console.table với đối số là một Array

## Console.time and console.timeEnd
```javascript
    console.time('total');
    console.time('init arr');
    const arr = new Array(20);
    console.timeEnd('init arr');

    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Object();
      const _type = (i % 2 === 0) ? 'even' : 'odd'
      console.count(_type + 'added');
    }

    console.timeEnd('total')
```

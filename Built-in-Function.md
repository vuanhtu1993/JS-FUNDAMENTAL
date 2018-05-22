### Map
- Nếu tôi có 1 mảng và tôi muốn xử lý từng biến trong mảng theo cùng 1 cách, trả về các giá trị sau xử lý (số lượng đúng bằng số lượng phần tử ban đầu của mảng) thì tôi sẽ sử dụng map.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
let arr = [
  new Animal("dog"),
  new Animal("rhino"),
  new Animal("bird"),
  new Animal("cat"),
];
let arrMap = arr.map((obj) => {
  obj.name = "hi" + obj.name;
  // Phai co return, nhung cai gi return se dc gan vao mang arrMap
  return obj;
})
```
### Filter
- Nếu tôi đã có 1 mảng nhưng tôi chỉ muốn lấy các phần tử theo 1 tiêu chuẩn nhất định, tôi sử dụng filter.
```javascript
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
}
let arr = [
  new Animal("dog", 1),
  new Animal("rhino", 2),
  new Animal("bird", 2),
  new Animal("cat", 1),
];
let arrFilter = arr.filter((obj) => {
  if (obj.age > 1) {
    // nhung obj nao return true se duoc gan vao arrFilter
    return true;
  }
  return false;
})
```


- Nếu tôi đã có 1 mảng nhưng tôi muốn sử dụng các giá trị trong mảng để tạo ra vài thứ khác hoàn toàn mới, tôi sử dụng reduce.

### Reduce
>Syntax arr.reduce(callback, [initialValue])

Trong đó callback là một function dạng như sau:
```javascript
const cb = (accumulator, currentValue) {
  ....do sth
  return accumulator; 
}
```
- accumulator là phần tích lũy, function cb return là cái gì thì nó sẽ là accumulator của vòng lặp sau (tức là cb không return thì accumulator sẽ trả về undefined)
- currentValue là các item trong mảng (duyệt từ đầu đến cuối mảng)
- initial là giá trị ban đầu của accumulator
> Nếu không có initialValue thì accumulator nhận giá trị đầu của mảng và currentValue nhận giá trị thứ 2 của mảng
##### Example
- Flatten Array
```javascript
let arr = [[1,2], [3,4], [5,6]];

function flatten(arr) {
	return arr.reduce((accumulator, currentValue) => {
		accumulator = [...accumulator, ...currentValue];
		return accumulator;
	}, [])
}
console.log(flatten(arr));
}
```
- Counting instance of value in object (đếm số lần xuất hiện của phần tử trong mảng)
```javascript
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let result = names.reduce((accumulator, currentValue) => {
	if (currentValue in accumulator) {
		accumulator[currentValue]++;
	} else {
		accumulator[currentValue] = 1;
	}
	return accumulator;
}, {});
console.log(result);
```
- GroupBy by property
```javascript
console.log(bestAction);

let people = [
	{ name: 'Alice', age: 21 },
	{ name: 'Max', age: 20 },
	{ name: 'Jane', age: 20 }
];

function groupBy(objArr, property) {
	return objArr.reduce((accumulator, currentValue) => {
		let key = currentValue[property];
		if (!accumulator[key]) {
			accumulator[key] = [];
		}
		accumulator[key].push(currentValue);
		return accumulator;
	}, {});
}

console.log(groupBy(people, "age"));
```
- Revome duplicate
```javascript
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
//First way
function removeDuplicateItem(arr) {
	return arr.reduce((accumulator, currentValue) => {
		if (!accumulator.includes(currentValue)) {
			accumulator.push(currentValue);
		}
		return accumulator;
	}, []);
}
//Second way
function removeDuplicateItem(arr) {
	return arr.sort().reduce((accumulator, currentValue) => {
		let length = accumulator.length;
		if (length === 0 || accumulator[length - 1] !== currentValue) {
			console.log(length, currentValue);
			accumulator.push(currentValue);
		}
		return accumulator;
	}, []);
}

console.log(removeDuplicateItem(arr));
```








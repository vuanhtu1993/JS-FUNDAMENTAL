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
#### Example
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








## Map
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
## Filter
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
#### Sử dụng filter để query nhiều trường trong object
- Lưu ý syntax của filter trong doc
> var newArray = arr.filter(callback(element[, index[, array]]), argument2)
- Trong đó argument2 sẽ được dùng là this trong callback
```javascript
	var users = [{name: 'John',email: 'johnson@mail.com',age: 25,address: 'USA'},
		     {name: 'Tom',email: 'tom@mail.com',age: 35,address: 'England'},
		     {name: 'Mark',email: 'mark@mail.com',age: 28,address: 'England'}];

	var query = {address: "England", name: "Mark"};

	function search(user){
	  return Object.keys(this).every((key) => user[key] === this[key]);
	}
	
	var result = users.filter(search, query);
```

## Reduce
- Nếu tôi đã có 1 mảng nhưng tôi muốn sử dụng các giá trị trong mảng để tạo ra vài thứ khác hoàn toàn mới, tôi sử dụng reduce.
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
- Revome duplicate value in array
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
- Remove duplicate ARRAY in array
```javascript
arr = [ [ '0', '3', '4', '8' ],
  [ '0', '3', '4', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '8' ],
  [ '0', '3', '4', '8' ],
  [ '0', '3', '8' ] ];
let trips = arr.reduce((accumulator, currentValue) => {
      if (accumulator.length <= 0) {
        return [currentValue];
      } else {
        let count = 0;
        for (let i = 0; i < accumulator.length; i++) {
          if (JSON.stringify(currentValue) !== JSON.stringify(accumulator[i])) {
            count ++;
          }
        }
        if (count == accumulator.length) {
          return [...accumulator, currentValue];
        }
        return accumulator;
      }
    },[]);
    OUTPUT: trips // [ [ '0', '3', '4', '8' ], [ '0', '3', '8' ] ]
```


## Một số hàm tổng hợp
### I. Chunk
> Chuyển 1 mảng thành 1 mảng chứa các mảng con nhỏ hơn với số lượng element định sẵn

- Chúng ta sẽ dùng Array.from() để tạo mảng mới có số lượng element khớp với size ta mong muốn.
```javascript
Sử dụng Array.slice() để map các element của array mới thành 1 mảng có length = size

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_n, i) =>
    arr.slice(i * size, i * size + size)
  );
```
### II. compact
> Loại bỏ các giá trị false, null, 0, "", undefined, NaN khỏi mảng

- Sử dụng Array.filter() để filter các giá trị false, null, 0, "", undefined, NaN
```javascript
const compact = arr => arr.filter(Boolean);
Examples:

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
```
### III. countOccurrences
> Đếm số lần xuất hiện của 1 giá trị trong 1 mảng

- Sử dụng Array.reduce() để tăng giá trị biến đêm lên khi gặp giá trị đó trong mảng
```javascript
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
Examples:

countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```
### IV: Flatten
> Chuyển tất cả các mảng con trong 1 mảng thành 1 mảng thống nhất
```javascript
const flatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? flatten(v) : v)));
Examples:

flatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```
### V: isSorted
> Trả về 1 nếu array đã được sort theo ascending order, trả về -1 nếu array đã được sort theo descending order và trả về 0 nếu array chưa được sort
```javascript
const isSorted = arr => {
  const direction = arr[0] > arr[1] ? -1 : 1;
  for (let [i, val] of arr.entries())
    if (i === arr.length - 1) return direction;
    else if ((val - arr[i + 1]) * direction > 0) return 0;
};
Examples:

isSorted([0, 1, 2, 3]); // 1
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
```
### VI: union
> Trả về 1 mảng mới chưa tất cả các phần tử có trong 2 mảng đã uniq
``` javascript
const union = (a, b) => Array.from(new Set([...a, ...b]));
Examples:

union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
```
### VII: take
> Trả về 1 mảng chứa số phần tử yều cầu tính từ phần tử đầu tiên
```javascript
const take = (arr, n = 1) => arr.slice(0, n);
Examples:

take([1,2,3,4,5,6,7,8]); // [1]
take([1,2,3,4,5,6,7,8], 0); // []
take([1,2,3,4,5,6,7,8], 2); // [1,2]
take([1,2,3,4,5,6,7,8], 10); // [1,2,3,4,5,6,7,8]
```



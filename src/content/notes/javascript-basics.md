---
title: JavaScript基础
category: 前端
tags: [JavaScript]
pubDate: 2026-06-17
description: JavaScript基础语法、数据类型、原型链与数组操作入门笔记
source: JavaScript基础.md
---

# JavaScript

## 简介

JavaScript是一门**脚本语言**

脚本语言的特点：编译**速度更快**，**不需要编译**、简单、易学、易用、**灵活性高**

其他常见的计算机语言类型

- 汇编语言
- 机器语言
- 高级语言

## JavaScript组成

- ECMAScript：JavaScript语法规范
- DOM：文档对象模型
- BOM：浏览器对象模型

## 数据类型

1.**基本数据类型**(简单数据类型)：共有7种

Boolean、Number、String、undefined、null、Symbol、Bigint(es10新增，`BigInt`数据类型的目的是比`Number`数据类型支持的范围更大的整数值)

2.**引用数据类型**(复杂数据类型)：1种

Object对象(包括普通Object、Function、Array、Date、RegExp、Math)

### JS的数据类型的转换

在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值（调用Boolean()方法）
- 转换为数字（调用Number()、parseInt()和parseFloat()方法）
- 转换为字符串（调用.toString()或者String()方法）

### typeof 问题汇总

#### typeof

> 优点：能够快速区分基本数据类型 缺点：不能将Object、Array和Null区分，都返回object

1. `typeof`的作用？

   区分数据类型，可以返回7种数据类型：`number、string、boolean、undefined、object、function` ，以及 `ES6` 新增的 `symbol`

2. `typeof` 能正确区分数据类型吗？

   不能。对于原始类型，除 `null` 都可以正确判断；对于引用类型，除 `function` 外，都会返回 `"object"`

3. `typeof` 注意事项

   - `typeof` 返回值为 `string` 格式，注意类似这种考题: `typeof(typeof(undefined)) -> "string"`
   - `typeof` 未定义的变量不会报错，返回 `"undefined"`
   - `typeof(null) -> "object"`: 遗留已久的 `bug`
   - `typeof`无法区别数组与普通对象: `typeof([]) -> "object"`
   - `typeof(NaN) -> "number"`
   - typeof是`操作符`

#### instanceof

> 优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象 缺点：Number，Boolean，String基本数据类型不能判断

1. `instanceof` 判断对象的原型链上是否存在构造函数的原型。只能判断引用类型。
2. `instanceof` 常用来判断 `A` 是否为 `B` 的实例

#### Object.prototype.toString.call()

> 优点：精准判断数据类型 缺点：写法繁琐不容易记，推荐进行封装后使用

**==、===和Object.is()问题汇总**

**1、区别**

- `==` 两边值类型不同的时候，先进行类型转换，再比较
- `===`  不进行类型转换，直接值比较
- `Object.is(val1, val2)` 判断两个值是否为同一值

**2、`==` 类型转换是怎么转换的？**

1. 如果类型不同，进行类型转换
2. 判断比较的是否是 `null` 或者是 `undefined`，如果是，返回 `true`
3. 判断类型是否为 `string` 或者 `number`，如果是，将 `string` 转换为 `number`
4. 判断其中一方是否为 `boolean`，如果是，将其中一方转为 `number` 再进行比较
5. 判断其中一方是否为 `object`，且另外一方是 `string`、`number`、`symbol`，如果是，将 `object` 转为原始类型进行判断(`valueOf()` 方法)
6. 如果有一个是 `NaN`，则直接返回 `false`
7. 如果两个都是对象，则比较是否指向同一个对象

### number能表示的整数的最大范围

1. 安全的整数范围：15位数以下
2. JavaScript 并不能表示任意位的整数，最大的整数是Number.MAX_SAFE_INTEGER(9007199254740991)，最小的整数是Number.MIN_SAFE_INTEGER(-9007199254740991)
3. 特别注意，很多ID是超出这个范围的，所以ID最好是用string，当ID超出**15**位数的话，就肯定要用字符串类型了。
4. 超出会失准

### 数组和类数组

#### 类数组

所谓类数组，就是可以通过索引属性访问元素并且拥有`length`属性对象

#### 数组和类数组的区别

类数组不具备数组的方法(splice，split，push..)

类数组是一个普通对象，数组类型是Array

#### 为什么需要设置类数组

类数组对象的设计目的更多是只让你**遍历和访问下标**,而不是去添加或删除元素

### 基本引用类型

#### Date

#### Math

##### Math.max

```js
语法：Math.max(n1,n2,n3,...,nX)
```

返回值：max() 方法可返回指定的参数中带有较大的值的那个数

```js
var a = Math.max(1,2,3,4);
console.log(a); //4
```

但如果参数是放一个数组的话，就不能这样用了，就需要用到apply方法。

##### Math.max.apply

```js
语法：fun.apply(thisArg, [argsArray])
```

- thisArg：在fun函数运行时指定的 this 值 ，可以为null，就是不设置指向
- argsArray：传递的值，必须包含在数组里面

```js
var arr = [1, 66, 3, 99, 4];
var max = Math.max.apply(0, arr);
var min = Math.min.apply(0, arr);
console.log(max);  //99
console.log(min);  //1
```

##### 舍入方法

- Math.ceil()方法始终向上舍入为最接近的整数
- Math.floor()方法始终向下舍入为最接近的整数
- Math.round()方法执行四舍五入

##### random()方法

```js
语法：number=Math.random();
```

返回值：返回一个0~1范围内的随机数，包含0但不包含1.

```js
// 因为random始终返回小数，即使乘上一个数或是加上一个数，它仍是小数，所以若想得到整数，需借助Math.floor方法
number=Math.floor(Math.random()*10);
console.log(number);//0~10
```

### 集合引用类型

#### Array

ECMAScript的数组和其他语言的数组有很大的区别。首先它可以和其他语言一样是一组有序数据，但它还可以在**每个下标处存储不同类型的数据**。这意味着这个数组，第一个元素可以是number，第二个元素可以是String，第三个元素可以是object。**ECMAScript数组是动态大小的**，也就是说它会随着数据的添加而增长。

##### 创建数组

一种是**使用Array构造函数**

```js
let arr = new Array();
```

```js
let arr = new Array(20);//给构造函数传入一个参数，代表length被设置为该值
```

```js
let arr = new Array("ES5","ES6");//如果传入的不是数值，则会创建一个只包含传入参数的数组
```

其实上面这些例子的**new是可以被省略**的：

```js
let arr = Array();
```

```js
let arr = Array(20);
```

另一种是**使用数组字面量**

```js
let colors = ["red","blue","green"];
```

```js
let colors = [];//这里是可以为空的，这代表创建一个空数组
```

**注意：在用数组字面量创建时，不会调用Array构造函数**

##### from()和of()

###### from()

说明:from()用于**将类数组结构转换为数组实例**

关于类数组：即**任何可迭代的结构**或者**有一个length属性和可索引元素**的结构

##### 数组空位

ES6新增的方法普遍将这些空位当成**存在的元素**，不过值为**undefined**。由于行为不一致和存在性能隐患，因此实践中避免使用数组空位。如果确实需要使用，建议**显式**地用undefined值表示

##### 数组检测

1.**instanceof操作符**

在只有一个网页（因此只有一个全局作用域的情况下），使用instanceof足矣

```js
let color = ['red','blue','white'];
if(color instanceof Array){
    alert('这是数组');	//这是数组
  }
```

2.**Array.isArray()方法**

这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。

```js
let color = ['red','blue','white'];
  if(Array.isArray(color)){
    alert('这是数组');	//这是数组
  }
```

#### Map（映射）

是ES6新增的特性，是一种**新的集合类型**，为JS带来了真正的**键值式存储机制**。在此之前JS实现键值式存储是靠**Object**实现，也就是**使用对象属性作为键，再使用属性来引用值**。二者大体相同，但在细微处仍有差别

##### 创建与初始化Map实例

```js
const map = new Map(); //创建一个空映射
alert(map.size); //0
```

```js
//使用嵌套数组初始化映射，前面是key后面是value
 const map = new Map([
   ["张三",66],
   ["李四",77],
   ["王五",88]
 ]);
 alert(map.size);	//3
```

##### 对键/值对进行操作

用**set()**添加键值对

```js
//这里操作的是上面用嵌套函数初始化的映射
map.set("赵六",99);
alert(map.size);  //4
alert(map.get("赵六")); //99
alert(map.get("99"));  //undefined
```

用**get()**和**has()**进行**查询**

```js
//这里操作的是上面用嵌套函数初始化的映射
alert(map.get("张三")); //66
alert(map.has("张三")); //true
//has()和get()的区别在于get是去获取键的值，而has是判断这个键存不存在
```

用**delete()**和**clear()** **删除值**

```js
//这里操作的是上面用嵌套函数初始化的映射
alert(map.size);  //3
map.delete("李四");
alert(map.size);  //2
map.clear();
alert(map.size);  //0
//delete和clear的区别在于前者可以一个一个的删除，而后者是清空这个映射内的所有键值对
```

##### 顺序和迭代

与object的主要差异是，**Map实例会维护键值对的插入顺序**，因此可以**根据插入的顺序进行迭代操作**。

Map提供了一个**迭代器（Iterator）**，能够**以插入的顺序**生成键值对形式的**数组**。这个迭代器可以通过**entries（）方法**取得。

```js
//因为迭代器生产的是数组，所有需要通过for循环来遍历输出
for(let pair of map.entries()){
  alert(pair);
  //["张三",66]
  //["李四",77]
  //["王五",88]
}
```

```js
//因为entries()是默认迭代器，所以可以直接对映射进行扩展操作
alert([...map]);	//这里是将全部键值对一起显示出来，与前面略有不同
//注意："..."这三个点是固定的格式要求，不能多也不能少
```

##### 选择Object还是Map

简单来说如果不在乎内存和性能，两者就只是个人偏好问题。但如果追求高性能的话，两者确实存在显著差异（这个后续有精力可以继续了解，这里点到为止）

## 原型和原型链

### 原型模式

我们创建的每一个函数都会随之创建一个 **prototype** 属性（指向原型对象）。这个对象的用途是包含可以由特定类型的**所有实例共享的属性和方法**。这个对象就是通过调用构造函数创建的**对象的原型**。使用原型对象的好处是，在它上面定义的属性和方法可以**被所有对象实例共享**。原来在构造函数中直接赋给对象实例的值，可以**直接赋给它们的原型**

```js
function Person(){}

// 为原型对象赋值
Person.prototype.name = 'Linus';
Person.prototype.age = 18;

console.log(Person.prototype.name)  //Linus

Person.prototype.sayName = function () {
  console.log(this.name);
}

let person1 = new Person();
person1.sayName(); //Linus

let person2 = new Person();
person2.sayName(); //Linus

console.log(person1.sayName == person2.sayName); //true
```

### constructor属性

当函数创建时，prototype属性指向一个原型对象时，在默认情况下，这个原型对象将会获得一个**constructor**属性，这个属性是一个指针，**指向prototype所在的函数对象**

就拿前面的例子来说， Person.prototype.constructor 就指向 Person 函数对象。

### 对象的__proto__属性

需要注意的是，虽然prototype属性是每个构造函数都有的，但是在脚本中**没有标准的方式访问**Prototype属性，但是在Firefox，Safari 和 Chrome 浏览器中每个对象中都支持一个属性 _proto_ 来访问，为了区分 prototype 属性，我们在下边都使用 _proto_来表示。

```js
//函数的声明参见前面的例子

console.log(person1.__proto__ === person1.prototype); //true
console.log(person1.__proto__ === person2.prototype); //true
```

### isPrototypeOf()

虽然我们在脚本中没有办法访问到Prototype属性，但是我们可以通过isPrototypeOf方法来确认对象之间是否存在这种关系。

**isPrototypeOf()**方法用于测试**一个对象是否存在于另一个对象的原型链上**

## 数组操作方法

### splice() 删除/添加数组元素

作用：splice() 方法**向/从数组中添加/删除**项目，然后返回被删除的项目

```js
array.splice(index,howmany,item1,.....,itemX)
//参数:
//index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//howmany：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
//item1, ..., itemX： 可选。向数组添加的新项目。
```

返回值: 如果有元素被删除,返回的就是被删除元素组成的新数组。

eg1：删除元素

```js
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 3); // [1,2,3]
console.log(a); // [4,5,6,7]
// 从数组下标0开始，删除3个元素
let item = a.splice(-1, 3); // [7]
//上面的式子等同于下面
let item = a.splice(6, 3); //[7]
// 从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7
```

eg2：添加元素

```js
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0,3,'添加'); // [1,2,3]
console.log(a); // ['添加',4,5,6,7]
//添加元素从最开始添加
```

使用splice()**注意点**

1. 数组如果元素不够，会删除到最后一个元素为止
2. 操作的元素，包括开始的那个元素
3. 可以添加很多个元素
4. 添加是在开始的元素前面添加的

### sort()数组排序

作用: sort()方法对数组元素进行排序，并返回这个数组。

参数可选: 规定排序顺序的比较函数。

默认情况下sort()方法**没有传比较函数**的话，**默认按字母升序**，如果元素不是字符串的话，会调用**toString()**方法将元素转化为字符串的**Unicode(万国码)**位点，然后再比较字符。

```js
// 字符串排列 看起来很正常
var a = ["Banana", "Orange", "Apple", "Mango"];
a.sort(); // ["Apple","Banana","Mango","Orange"]
// 数字排序的时候 因为转换成Unicode字符串之后，有些数字会比较大会排在后面 这显然不是我们想要的
var	a = [10, 1, 3, 20,25,8];
console.log(a.sort()) // [1,10,20,25,3,8];
```

这个时候就需要**规定比较函数**了

sort的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

### join()转换数组

作用：**将数组转换为字符串**，返回**转换后的字符串**

参数：可指定一个字符串（可以为空）作为数组中元素的连接符

注意：**默认使用 `,` 作为连接符**，此时和**toString()**的效果是一致的。所以如果想没有连接符，是需要指定空字符串的`''`

```js
var arr = ['a', 'b', 'c'];
// 这里没有指定连接符，所以默认使用 , 作为连接符
arr.join();	//a,b,c
// 使用指定的字符串作为连接符
arr.join('-'); 	//a-b-c
```

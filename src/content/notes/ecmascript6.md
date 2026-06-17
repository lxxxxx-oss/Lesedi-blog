---
title: ES6核心特性
category: 前端
tags: [JavaScript, ES6]
pubDate: 2026-06-17
description: ES6 let/const命令、块级作用域、Promise异步编程入门笔记
source: ECMAscript6.md
---

# ES6核心特性

## 一、let和const命令

### 1.let命令

#### 基本用法

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。换句话说，let声明的变量是有作用域的。

for循环计数器，就很适合使用`let`命令

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i);
// ReferenceError: i is not defined
```

上面代码中，**i**只在for循环体内有效，在循环体外引用就会报错。

另外，`for`循环还有一个特别之处，就是**设置循环变量**的那部分是一个**父作用域**，而**循环体内部**是一个单独的**子作用域**。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 `let` 重复声明同一个变量）。

#### 不存在变量提升

`var`命令会发生"**变量提升**"现象，即变量可以在声明之前使用，值为`undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

这其实也是JavaScript一直存在的问题。`let`命令的出现纠正了这种错误

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

上面代码中，变量`foo`用`var`命令声明，会发生变量提升，即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。变量`bar`用`let`命令声明，不会发生变量提升。这表示在声明它之前，变量`bar`是不存在的，这时如果用到它，就会抛出一个错误。

#### 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就"绑定"（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。**凡是在声明之前就使用这些变量，就会报错**。

总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为"**暂时性死区**"（temporal dead zone，简称 TDZ）。

"暂时性死区"也意味着`typeof`不再是一个百分之百安全的操作。

```javascript
typeof x; // ReferenceError
let x;
```

上面代码中，变量`x`使用`let`命令声明，所以在声明之前，都属于`x`的"死区"，只要用到该变量就会报错。因此，`typeof`运行时就会抛出一个`ReferenceError`（引用错误）。

有意思的是，如果一个**变量没有被声明**，使用`typeof`反而不会报错。会返回`undefined`

总之，**暂时性死区的本质**就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

#### 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}
// 报错
function func() {
  let a = 10;
  let a = 1;
}
//警告
function func() {
  var a = 10;
  var a = 1;
}
```

### 2.块级作用域

#### 为什么需要块级作用域？

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

上面代码的原意是，`if`代码块的外部使用外层的`tmp`变量，内部使用内层的`tmp`变量。但是，函数`f`执行后，输出结果为`undefined`，原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量。

第二种场景，用来计数的循环变量泄露为全局变量。

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量`i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

#### ES6的块级作用域

`let`实际上为新增的块级作用域

## 二、异步编程

浏览器中的JavaScript程序是典型的**事件驱动型程序**，即它们会等待用户触发后才真正的执行，而基于JavaScript的服务器通常要**等待客户端通过网络发送请求**，**然后**才能**执行**。这种异步编程在JavaScript是很常见的。而JavaScript是单线程的，那如何实现异步呢？就是把一些操作交给了其他线程处理，然后采用了**事件循环**的机制来处理返回结果

### 异步和回调函数

在最基本层面上，JavaScript的异步编程**通过回调实现**。回调的是函数，可以传给其他函数，而其他函数会**在满足某个条件时调用这个函数**。

## 三、Promise

promise是**异步编程**的一种解决方案

### 同步编程和异步编程

**同步(synchronization)：** 在执行某段代码时，在**没有得到返回结果**之前，**其他代码**暂时是**无法执行**的，但是一旦执行完成拿到返回值，即可执行其他代码。也就是说，**在此段代码执行完未返回结果之前，会阻塞之后的代码执行**，这样的情况称为同步。

**异步(asynchronization)：** 当某一代码执行异步过程调用发出后，这段代码不会立刻得到返回结果。而是在异步调用发出之后，一般通过**回调函数**处理这个调用之后拿到结果。异步调用发出后，不会影响阻塞后面的代码执行，这样的情况称为异步。

### promise的应用场景

- 异步编程一个很常见的场景就是**网络请求**
- 我们封装一个网络请求的函数，因为不能立即拿到结果
- 所以我们往往会传入另一个函数，在数据请求成功时，将数据通过传入的函数回调回去，当然只是最易想到的方法，如果只是一个简单的请求，那么这种方案不会出现大的麻烦
- 但当这个网络请求非常复杂时，就会出现回调地狱

而Promise可以以一种非常优雅的方式解决这个问题

promise就是一个**类**，它通过**对异步操作的封装**来优化代码。

```js
//Promise需要传入一个函数，这个函数又包括两个参数
//而resolve和reject本身又是两个函数
//resolve成功的时候调用，reject失败的时候调用
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('HelloWorld')	//HelloWorld
  },5000)
})
//这两段代码作用相同，后者更为常用。在异步操作里面调用resolve(),再将处理操作放在.then()里面
//resolve和data所传的值可以为空
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('HelloWorld')
  },5000)
}).then((data) => {
  console.log('HelloWorld') //HelloWorld
  console.log(data)	//HelloWorld
})
```

### Promise的链式调用

当网络请求非常复杂时，promise的优势就展现出来了

```js
//一个setTimeout看作一个异步，对应一个promise封装。
//该代码的目的是，在第一次回调完成后才进行第二次，再第三次
//看似用promise封装的代码量更多了，但逻辑结构更加清晰明了，便于后期维护
//所有的处理代码都在promise封装后的.then里面，便于维护
//这就是所谓的链式编程
  new Promise((resolve, reject) => {
  //第一次网络请求
    setTimeout(() => {
      resolve()
    }, 1000)
  }).then(() => {
  //第一次拿到结果后的处理代码
    console.log(111);
    return new Promise((resolve ,reject) => {
      //第二次网络请求
      setTimeout(() => {
        resolve()
      }, 1000)
  })
    }).then(() => {
    //第二次拿到结果后的处理代码
    console.log(222);
    return new Promise((resolve, reject) => {
      //第三次网络请求
      setTimeout(() => {
        resolve()
      },1000)
    }).then(() => {
      //第三次拿到结果后的处理代码
      console.log(333);
    })
  })
```

### 一些Promise的方法

#### all方法

**谁跑的慢，以谁为准执行回调**

有了all，就可以同时**执行多个并行**操作,并在**一个**回调中处理所有数据

```js
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then((posts) => {
    //全部成功则成功
  }).catch((reason) => {
    //一个失败都失败
  })
```

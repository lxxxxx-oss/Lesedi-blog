---
title: 零零碎碎
tags: [前端, 编程基础, 知识点, 杂项]
pubDate: 2026-06-17
description: JavaScript模块化规范（CommonJS与ES Module）以及Promise异步编程基础笔记
source: 零零碎碎.md
---

# 零零碎碎

## JavaScript的模块化

#### 概述

在早期的JavaScript中是没有模块化的概念的，引用第三方包时都是把变量直接绑定在全局环境下---**全局引入**

以axios为例，以script标签引入时，实际上是在window对象上绑定了一个axios属性

这种全局引入的方式，会带来两个大的问题

- **变量污染**：所有脚本都在全局上下文中绑定变量，如果出现重名，后面的变量就会覆盖掉前面的变量，造成变量污染

- **依赖混乱**：当多个脚本有相互依赖的时候，它们彼此间的关系就不明确

  > 在这种背景下，就急需"**模块化**"的开发来对代码进行规范，所以涌现出多种**JavaScript模块化规范** ---> 到如今我们用的最多的、需要重点了解的有两种 ---> `CommonJS`、`ES Module`

模块化给我们带来的好处

- **避免了变量污染**：因为每个模块是独立的，所以变量或函数名重名不会造成影响

- **提高了可维护性**：因为每个模块是独立的，各司其职，在后续迭代或者维护的时候，只用在需要的模块进行修改即可

- **性能优化**：异步加载模块的页面性能非常好

#### CommonJS

CommonJS的发明者希望它能让客户端和服务端使用同一套规范。但CommonJS主要还是应用于服务端，它最开始是叫ServerJS，被应用于Node服务端

该规范最核心的理念就是：**把每一个文件都看成一个模块**

CommonJS的**特点**

- **每个文件都是独立的模块**，有独立的作用域
- 文件可以被重复引用、加载，**第一次加载时会被缓存**，之后再引用就直接读取缓存
- 加载某个模块时，**module.exports 输出的是值的拷贝**，一旦这个值被输出，模块内再发生变化不会影响已经输出的值

CommonJS里面的**三个核心变量**

- **exports**：记录当前模块导出的变量
- **module**：记录当前模块的详细信息
- **require**：对外部的模块进行导入

示例：

```js
//a.js
function test() {
    console.log('一个模块化实例');
}

function sayHi() {
    console.log('你好哇');
}

//不导出的话，默认外部是无法访问到的

//导出该方法，使其向外界暴露
// module.exports = test
//当要同时导出多个方法时，这样写
module.exports = {
    //ES6的字面量加强写法
    // test: test,
    test,
    sayHi
}
```

```js
//index.js
//require是引入外部文件的关键字，接收的参数是外部文件的路径
let moduleA = require('./a')
//这里test()方法被赋值给了moduleA，所以调用时也要使用moduleA。当然这里的名字是自定义的，前后对应即可

console.log(moduleA.test, moduleA.sayHi);   //[Function: test] [Function: sayHi]
//调用该方法
moduleA.test() //一个模块化实例
moduleA.sayHi() //你好哇
```

#### ES Module

ES6 模块的设计思想，是尽量地静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

Node.js 可以通过 `.mjs` 后缀或者在 `package.json` 添加 `"type": "module"` 来使用，通常选择后者，一劳永逸！

```json
"type": "module"
//这个字段有两个取值 ---> commonjs、module，默认是commonjs，所以如果不进行设置，node默认是遵循commonJS规范的
```

用法示例：

```js
//ModuleA.js
const ModuleA = {
    printInfo() {
        console.log('这是ESModule！');
    }
}
//这种方法只能导出一个
export default ModuleA
```

```js
//ModuleB.js
const ModuleB = {
    whoIam() {
        return "I am Lesedi"
    }
}

//这种导出方法可以导出多个
export {
    ModuleB
    //...
}
```

```js
//index.js
//有一个细节需要注意：和CommonJS不同，这里引入的名字必须和模块内部的名字一致
import ModuleA from "./Module.js/ModuleA.js";
//用export导出，就要用解构的方法导入 ---> {}包裹住
import {ModuleB} from "./Module.js/ModuleB.js"


ModuleA.printInfo() //这是ESModule！

console.log(ModuleB.whoIam()); //I am Lesedi
```

## Promise异步编程

### promise的优点

**1. 支持链式调用，可以解决回调地狱的问题**

回调地狱是指多层异步回调嵌套，导致代码层层缩进、难以阅读和维护。Promise 通过 `.then()` 链式调用的方式，将嵌套的异步操作扁平化，使代码结构更加清晰。

**2. 指定回调函数的方式更加灵活**

传统异步编程（如回调函数）必须在执行异步操作之前就指定好回调；而 Promise 可以先启动异步任务，后续再通过 `.then()` / `.catch()` 指定回调函数，时机更加灵活。

**3. Promise 提供了统一的异步编程解决方案**

Promise 最早由社区提出和实现，ES6 将其写进了语言标准，原生提供了 `Promise` 对象。Promise 可以理解为一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，通过它可以获取异步操作的消息，并且提供 `Promise.all`、`Promise.race` 等组合方法，统一了异步编程的范式。

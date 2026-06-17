---
title: Node与Gulp
category: 后端
tags: [Node.js, Gulp]
pubDate: 2026-06-17
description: Node.js运行环境、模块化开发与Gulp构建工具入门笔记
source: Node与Gulp.md
---

# Node与Gulp

## 服务器端的基本概念

### IP地址

互联网中设备的**唯一标识**，IP是Internet Protocol Address的简写，译为**互联网协议地址**

#### 域名

由于IP地址较难记忆，所以一般情况下，我们不会直接使用IP地址，这就产生了**域名**的概念，也就是我们平时**上网所使用的网址**

域名和IP是**对应**的关系，浏览器会帮我们解析我们输入的域名，也就是说其实还是IP在发挥作用，只有IP才能访问到指定网站的服务器。当然除了访问网站这种服务，每个服务器还能提供包括**发送邮件**、**连接数据库**、**文件上传下载**，那这么多种服务，服务器是怎么区分的呢？

#### 端口

**端口**就是用来**区分服务器中提供的不同服务**，不同**端口号**就代表不同的服务，它是计算机与外界通讯交流的出口

## Node

### Node简介

Node是一个基于**Chrome V8引擎**的JavaScript**代码运行环境**

- **运行环境**
  - 浏览器能运行JavaScript代码，那么浏览器就是JavaScript代码运行环境
  - Node能运行JavaScript代码，那么Node就是JavaScript代码运行环境

Node开发就是**服务器端开发**，也就是所谓的后端开发

#### Node.js的组成

Node.js是由**ECMAScript**及Node环境提供的**API**组成的，API包括文件、网络、路径等

#### Node.js的基础语法

所有的ECMAScript语法在Node上面都适用。不过由于Node中没有HTML的存在，所以**Node的运行要借助于命令行**

要执行node文件，首先命令**行要处于文件的目录下**，然后执行下面的代码

```bash
node +文件名
如：node hello.js
```

### 服务器端开发要做的事情

- **实现**网站的**业务逻辑**
- 基于**数据**做**增删改查**

### Node的模块化开发

#### 开发规范

- Node规定一个**JavaScript文件**就是一个模块，模块**内部定义的变量和函数**默认情况下**外部是无法得到**的
- 模块内部可以使用**exports对象**进行**导出**，导出的模块就可以被其他模块用**require方法导入**

```js
//a.js
//在一个模块内部定义变量
let version = 1.0;
//在模块内部定义方法
const sayHi = 'hello，node'
//导出
exports.version = version;
exports.sayHi = sayHi;
```

```js
//b.js
//导入所有a.js导出的变量、方法
let a = require('./a.js')

console.log(a.version)  //1
console.log(a.sayHi)    //hello,node
```

#### 系统模块

系统模块就是**Node运行环境**提供的**API**，这些API都是以模块化的方式进行开发的

##### 文件操作fs

即为file system，文件操作系统

```js
//在require里面就是所引用模块的名字
const fs = require('fs')
```

**文件操作之读取文件**

读取文件是**硬盘操作**，比较耗时，所以我们需要借助**回调函数**（这里的（err，doc）就是回调函数的参数）

```js
//读取文件
fs.readFile('../a.js', 'utf-8', (err, doc) => {
    //如果文件读取发生错误，参数err的值为错误对象，否则err为null
    //doc为读取的文件的内容信息
    if(err == null) {
        //在控制台输出文件内容
        console.log(doc);
    }
})
```

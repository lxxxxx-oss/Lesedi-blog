---
title: Node.js
category: 后端
tags: [Node.js]
pubDate: 2026-06-17
description: Node.js运行时基础：fs文件系统、path路径与http网络模块入门
source: nodejs.md
---

# Node.js

## 简介

Node.js基于**V8 JavaScript引擎**（Chrome浏览器的内核）的**JavaScript运行环境**。这使得我们可以在任何地方执行JS文件，而不必再依赖浏览器。

运行环境：**代码运行所依赖的必要环境**

**浏览器**为**前端运行环境**，**Node.js**为**后端运行环境**，所以Node.js**无法调用DOM和BOM等浏览器内置API**。 每个浏览器都内置了DOM和BOM这样的API函数，因此，浏览器中的JavaScript才可以调用它们。运行环境提供了特殊的接口供内置API使用，内置API只能**在所属的运行环境中被调用**

总的来说：**Node.js是JavaScript运行所需的后端环境**（浏览器属于前端环境），它不是一门编程语言

### Node.js的学习路线

> JavaScript基础语法 ---> Node.js内置API模块（fs + path + http 等）---> 第三方API模块（express，mysql等）

### Node.js框架和工具

Node.js 是一个底层平台。 在不断的发展过程中，社区在 Node.js 上构建了数千个库。

下面是一些值得学习的常用库

- **AdonisJS**：基于 `TypeScript` 的全功能框架，高度关注开发者的效率、稳定和信任。Adonis 是最快的 Node.js Web 框架之一。
- **Express**：提供了最简单而强大的方式来**创建 Web 服务器**。它的极简主义方法、没有偏见、专注于服务器的核心功能，是其成功的关键
- **Fastify**：高度专注于以最少的开销和强大的插件架构提供最佳开发者体验的 Web 框架。Fastify 是最快的 Node.js Web 框架之一。

## Node的内置模块

### fs文件系统模块

**fs模块**是Nodejs官方提供的、**用来操作文件的模块**。它提供一系列方法和属性，来满足用户对文件的操作需求

例如：

+ **`fs.readFile()`**方法，用来**读取指定文件的内容**
+ **`fs.writeFile()`**方法，用来**向指定文件写入内容**

注意：**要使用一个模块，就必须在使用前进行导入**

```js
//导入文件系统模块
const fs = require('fs')
```

#### 读取文件

使用**`fs.readFile()`**可以**读取指定文件的内容**，语法格式如下

```js
fs.readFile(path, [options], callback)
```

+ **`path`**：必选参数，所读取**文件的路径**

+ **`options`**：可选参数，以什么**编码类型**来读取文件

+ **`callback`**：必选参数，读取完成后，通过**回调函数拿到的结果**

  + 有两个参数，**err读取失败的结果，data读取成功所拿到的数据**

  + 读取成功:**`err：null`** ,读取失败：**`data：undefined`**

  + ```js
    fs.readFile('../eg.txt', 'utf-8', (err, data) => {
        console.log(data);
        console.log(err);
    })
    ```

可以简单加一个判断语句，让其成功时，只输出数据，失败时，则输出错误信息

```js
fs.readFile('../eg.txt', 'utf-8', (err, data) => {
    if(err === null)
    console.log(data);
    else
    console.log(err);
})
```

#### 写入文件

使用**`fs.writeFile()`**可以**向指定文件写入内容**，语法格式如下

```js
fs.writeFile(path, data, [options], callback)
```

+ **`path`**：必选参数，所写入**文件的路径**
+ **`data`**：必选参数，表示要**写入的内容**
+ **`options`**：可选参数，以什么**编码类型**来读取文件
+ **`callback`**：必选参数，写入完成后，通过**回调函数拿到的结果**

示例：向指定文件，写入字符串 'I am Lesedi'

```js
fs.writeFile('../eg.txt', 'I am Lesedi', 'utf-8', (err) => {
    if(err) {
        console.log(err);
    }
})
```

### path路径模块

顾名思义，这个模块是专门用来**对路径进行处理**的模块

例如：

+ **`path.join()`**方法，用来**将多个路径片段拼接成一个完整的路径字符串**
+ **`path.basename()`**，用来**从路径字符串中，将文件名解析出来**

#### 导入路径模块

```js
const path = require('path')
```

#### 路径拼接

使用**`path.join()`**方法，**将多个路径片段拼接成一个完整的路径字符串**，语法格式如下

```js
path.join([paths])
```

参数解读：

+ paths：可以填写**多个路径片段**
+ 返回值：**string**

示例

```js
//导入模块
const path = require('path')

//在使用路径拼接的操作的时候，一律要使用path.join方法
//注意：../会抵消前一个路径 ---> /b/c被抵消变成了/b
const pathStr = path.join('/a', '/b/c', '../','./', '/d')
console.log(pathStr);

//双下划线dirname表示当前文件所处目录
const pathStr1 = __dirname
console.log(pathStr1);

const pathStr2 = path.join(__dirname, '/join.js')
console.log(pathStr2);
```

#### 获取路径中的文件名

使用**`path.basename()`**，可以**从路径字符串中，将文件名解析出来**，语法格式如下

```js
path.basename(path, [ext])
```

参数解读

+ path：必选参数，需要操作的**路径字符串**
+ ext：可选参数，表示**文件的扩展名**，是用来**删除扩展名**的
+ 返回值：表示**路径的最后一部分**

示例：

```js
//导入模块
const path = require('path')

const filePath = 'c/user/downloads/node.exe'

//第二参数是用来删除扩展名的
const basename = path.basename(filePath, '.exe')

console.log(basename);
```

### http网络模块

**http模块**，是Nodejs官方提供的，专门用来**创建web服务器的模块**，把一台普通的电脑变成一台Web服务器，从而对外提供Web资源服务

#### 导入网络模块

```js
const http = require('http')
```

#### 一个简单的HTTP服务器

```js
//导入网络模块
const http = require('http')
//创建了一个HTTP服务器来接收数据并监听3000端口
http.createServer(function (req, res) {
    //设置响应成功状态码和内容类型
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World')
}).listen(3000)
```

> http.createServer是创建服务器的固定写法，后面的回调函数存放一系列核心代码
>
> **req**即是request，**接收服务端传的参数**；**res**即是response，**返回服务器响应的内容**

#### 另一种等价的写法

```js
//获取http模块
const http = require("http");
//获取http.Server对象
const server = new http.Server();

//创建服务器，并监听3000端口
server.on("request",function(req,res) {
    res.writeHead(200,{"content-type":"text/plain"});
    res.write("Hello World");
    res.end();
}).listen(3000);
```

注意：在执行完所有操作后，一定要调用 `res.end`来提示浏览器所有操作都已经执行完，可以**结束响应**了，res.end也可以向浏览器渲染内容，作用类似于`res.write`，只不过res.write可以有多个，而`res.end`**有且只能存在一个**，在其后面也不允许再进行操作

#### 网络模块有两种使用方式

+ 作为**服务端**使用，**创建一个HTTP服务器，监听HTTP客户端请求并返回响应**
+ 作为**客户端**使用，**发起一个HTTP客户端请求，获取服务端响应**

---
title: Express
tags: [Express, Node.js, 后端]
pubDate: 2026-06-17
description: Express快速入门笔记，涵盖路由基础、中间件机制、请求与响应处理等核心概念。
source: express.md
---

# Express

## 简介

> Express 是最流行的 Node 框架，是许多其他流行的 Node 框架的底层库。Express 是一个快速、简单的 Node 应用开发框架。通过它，可以快速地构建各种 Web 应用。

- 接口服务
- 传统的 Web 网站
- 开发工具集成
- ...

### Express 的特性

- 简单易学
- 丰富的 API 支持
- 强大的路由功能
- 灵活的中间件
- 高性能
- 非常稳定
- 视图系统支持 14 个以上的主流模板引擎

> Express 本身是极简的，仅仅只提供了 Web 开发的基础功能，但是它通过**中间件**的方式集成了许许多多外部插件来处理 HTTP 请求。

- **body-parser**：解析 HTTP 请求体
- **compression**：压缩 HTTP 响应
- **cookie-parser**：解析 cookie 数据
- **cors**：处理跨域资源请求
- **morgan**：HTTP 请求日志记录
- ...

Express 的中间件特性固然强大，但是也有它的弊端：

- 弊端在于虽然一些中间件包可以解决几乎一切问题和需求，但是如何挑选到合适的包有时候会是一个问题。

## 起步

### Hello World

```js
//引入express
const express = require('express')
//挂载express
const app = express()
//配置路由
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//设置监听服务端的模块
app.listen(3000, () => {
    console.log('正在监听 3000端口');
})
```

### 路由基础

路由是指**确定应用程序如何响应客户端对特定端点的请求**，该特定端点由 URL 路径和特定的 HTTP 请求方法（GET、POST 等）组成。

每个路由可以具有一个或多个处理程序函数，这些**函数在匹配该路由时执行**。

**路由定义**结构：

```js
app.Method(Path, (req, res) => {Handler})
```

- **app** 是 **Express 实例**
- **Method** 是指 **HTTP 请求方法**
- **Path** 是指**服务器路径**
- **req**、**res** 是 request 和 response 的缩写，指**请求对象和响应对象**
- **Handler** 是**路由匹配成功时所执行的函数**

------

注意：可以用 ApiPost 或是 Postman 等工具，来快速地查看路由响应的结果。

#### 响应对根路径的 `POST` 请求

```js
app.post('/', (req, res) => {
    res.send('这是一个POST请求方法')
})
```

#### 对 /user 路径的 PUT 请求

```js
app.put('/user', (req, res) => {
    res.send('对/user的put请求')
})
```

#### 对 /user 路径的 DELETE 请求

```js
app.delete('/user', (req, res) => {
    res.send('对/user的delete请求')
})
```

### 请求和响应

Express 使用路由回调函数的参数 **`request`** 和 **`response`** 对象来处理请求和响应的数据。

#### 请求对象

```js
app.get('/', (req, res) => {
    //与请求相关的信息都在请求对象req里面
    //这几个是node就有的，express没有对node进行二次抽象，所以node有的express可以直接拿来用
    console.log(req.url); //打印请求地址
    console.log(req.method); //请求方法
    console.log(req.headers); //请求头
    //这是express对node的扩展
    //req.query ---> 接收传递过来的参数
    console.log('请求参数：', req.query);
    res.send('Hello World!')
})
```

#### 响应对象

```js
app.post('/', (req, res) => {
    //所以响应回来的信息都在响应对象res里面
    //设置响应状态码
    res.statusCode = 201
    //结束响应，end也是可以输出数据的，作用类似于send(send是express扩展的内容，send的功能更为强大)
    // res.end('Hello World')
    //send可以传递对象（send内部将其转换成了字符串进行发送）
    // res.send({
    //     number: 1
    // })
    //send支持链式调用
    res.status(201).send('ok')
})
```

## 中间件

### 概念

Express 的最大特色也是最重要的设计，就是**中间件**。一个 Express 的运行，是由许许多多个中间件来完成的。

每一个中间件就是一个处理环节，完成某些功能，这样做的目的是**既提高了生产效率同时保证了可维护性**。

> Express 中间件和 AOP（面向切面编程）是同一个思想，都是需要经过一些步骤，可以实现**不去修改自己的代码，而能扩展或者实现某些功能**。在 AOP 里面切面通常是一个类，而在 Express 里面，一个切面就是一个中间件。

> AOP：利用一种称为"横切"的技术，剖解开封装对象的内部，**将影响多个类的公共行为封装到一个可重用的模块中**，并将其命名为 `Aspect` 切面。所谓的切面，**简单来说就是与业务无关，却为业务模块所共同调用的逻辑**，将其封装起来便于减少系统的重复代码，**降低模块的耦合度**，**提高可操作性和可维护性**。

<!-- TODO: migrate image from C:\Users\BBD\AppData\Roaming\Typora\typora-user-images\image-20220714103536698.png -->
![image-20220714103536698](C:\Users\BBD\AppData\Roaming\Typora\typora-user-images\image-20220714103536698.png)

注意：中间件的定义顺序很重要！因为它是按顺序执行的。

总结：不管是 AOP 还是中间件，核心思想都是**在程序生命周期或者横向流程中`加入/减去`一个或多个切面（中间件），不会影响整个程序**。

### 中间件函数

#### 功能

+ 执行任何代码
+ 修改 request、response 对象里面的数据
+ 结束请求响应周期
+ 调用下一个中间件

注意：如果当前的中间件功能中没有结束请求响应周期，则**必须要调用 next() 将控制权交给下一个中间件**，否则**服务端会一直处于等待响应状态**，造成卡死。

#### 一个示例

```js
//三个内置参数
//req：请求对象
//res：响应对象
//next：下一个中间件
//在所有请求之前，都会执行这个中间件里面的函数
//这个中间件的功能就是，在请求的时候打印请求日志
app.use((req, res, next) => {
    //打印请求日志
    console.log(req.method, req.url, Date.now());
    //预防服务端挂起，所以要交出执行权，使其向后继续执行
    next()
})
```

### 中间件分类

#### 应用程序级别中间件

**不做任何限定**的中间件 ---> 对后续代码都产生影响：

```js
app.use((req,  res, next) => {
    console.log('Time:', Date.now());
    //结束响应
    next()
})
```

**限定请求的路径**，只有对应的路径才会进入该中间件：

```js
app.use('/user/:id', (req,  res, next) => {
    console.log('request/baseUrl:', req.baseUrl);
    //结束响应
    next()
})
```

其实**路由**，就是**限定了请求路径和请求方法的一种特殊的中间件**：

```js
app.get('/', (req, res) => {
    res.send('Hello World!')
})
```

跳过路由：**`next('route')`** 固定写法：

```js
app.get('/user/:id', (req, res, next) => {
    // res.send('get /user/:id')
    //如果满足条件，则跳过该路由进入下一个路由（注意：这两个路由请求方法和请求路径要一致）
    if(req.params.id === '0') next('route')
    else next()
},(req, res, next) => {
    res.send('这里是get请求一')
})

app.get('/user/:id', (req, res, next) => {
    //当id为0的时候，会直接跳到这里
    res.send('这里是get请求二')
})
```

#### 路由器级别中间件

路由器级别中间件与应用程序中间件工作方式相同，只不过它绑定到的实例是 **`express.Router()`**：

```js
const router = express.Router()
```

使用 **`router.use()`** 和 **`router.Method()`** 函数加载路由器级别中间件。

##### 创建路由器级别中间件的步骤

1. 创建路由实例：

```js
const express = require('express')
const router = express.Router()
```

2. 配置路由：

简单来说，这里的区别就是**挂载的对象不同**，之前是 Express 实例，现在是 router 实例。这样做的**好处**是：可以把所有与路由相关的操作提取出来放在一个单独的页面，降低耦合度，方便后续管理。

```js
router.get('/home', function(req, res) {
    console.log('/home get');
    res.send('home')
})
```

3. 导出路由实例（遵循 CommonJS 规范）：

```js
module.exports = router
```

4. 将路由挂载集成到 Express 实例应用中（引用）：

```js
const  router  = require('./router')
const express = require('express')

const app = express()
app.use(router)

app.listen(3000, () => {
    console.log('正在监听 3000端口');
})
```

#### 错误处理中间件

与其他中间件不同，错误处理中间件拥有**四个参数**（**`err`**、**`req`**、**`res`**、**`next`**），且**必须始终带有这四个参数**，即使不需要使用 next 对象，也必须带上。否则该错误处理中间件会被当作常规中间件进行处理。

错误处理中间件一般**挂载在所有中间件之后**。

+ 挂载错误处理中间件：

```js
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})
```

+ 设置 next，让其在触发时直接进入错误处理中间件。将任何参数传递给 **`next()`** 函数（route 除外），Express 都会将其视为错误，并且将**跳过所有剩余的无错误的路由和中间件**：

```js
   try {
        //读取成功
        res.status(200).json(db.todos)
    } catch (error) {
        next(err)
    }
```

#### 内置中间件

Express 为我们提供以下五个内置中间件：

+ **`express.json()`**：解析服务端传输过来的 **`application/json`** 格式的数据
+ **`express.urlencoded()`**：解析服务端传输过来的 **`application/x-www-form-urlencoded`** 格式的数据
+ **`express.raw()`**：解析服务端传输过来的 **`application/octet-stream`** 格式的数据
+ **`express.text()`**：解析服务端传输过来的 **`text/plain`** 格式的数据
+ **`express.static()`**：托管静态资源文件

#### 第三方中间件

其实早期 Express 内置了很多中间件，远不止上面说的那五个。后来为了保持 Express 本身极简的特性，在 **Express 4.x** 之后，官方把这些功能性的中间件**以包的形式单独提取出来**，开发人员需要根据实际情况去灵活使用。

使用第三方中间件的时候，去查找官方文档即可。

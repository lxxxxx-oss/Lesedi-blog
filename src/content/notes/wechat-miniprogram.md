---
title: 小程序简介
category: 前端
tags: [微信小程序]
pubDate: 2026-06-17
description: 微信小程序开发全览：项目结构、WXML/WXSS模板、组件、API、导航与生命周期
source: 微信小程序.md
---

# 小程序简介

## 小程序与普通网页开发的区别

- **运行环境**不同
  - **网页**是运行在**浏览器环境**中
  - **小程序**是运行在**微信环境**中
- **API**不同
  - 由于运行环境不同，所有**小程序无法调用DOM和BOM的API**
  - 但是小程序中可以调用**微信环境提供的各种API**
    - 地理位置
    - 扫码支付
- **开发模式**不同
  - 网页的开发模式：浏览器+代码编辑器
  - 小程序的开发模式
    - **申请小程序开发账号**
    - **安装小程序开发者工具**
    - **创建和配置小程序项目**

## 小程序项目构成

### 项目的基本组成结构

- **pages用来存放所有小程序的页面**
- utils用来存放工具性质的模块（例如：格式化时间的自定义模块）
- **app.js小程序项目的入口文件**
- **app.json小程序项目的全局配置文件**
- app.wxss小程序项目的全局样式文件
- project.config.json项目的配置文件
- sitemap.json用来配置小程序及其页面是否允许被微信索引

#### json配置文件

- **app.json**是小程序的**全局配置**，位于文件的根目录，里面有四个默认的配置项
  - **pages**：用来记录当前小程序所有页面的路径
  - **window**：全局定义小程序所有页面的背景色、文字颜色等
  - **style**：全局定义小程序组件所使用的样式版本
  - **tabBar**：设置小程序窗口的外观
  - sitemapLocation：用来指明sitemap.json的位置
- **project.config.json**是项目配置文件，用来记录我们对小程序开发工具所做的个性化的配置
  - **setting**中保存了**编译相关的配置**。其实就是**本地设置**里面我们勾选的内容的体现
  - projectname中保存的是项目名称
  - **appid**中保存的是**小程序的账号ID**

- **sitemap.json**用来配置小程序页面**是否允许被微信索引**。所谓微信索引就是**在微信中搜索**，效果类似于PC端的网页的SEO
  - 当开发者允许微信索引时，微信会通过**爬虫**的形式，为小程序页面内容建立索引。当**用户的搜索关键字和页面索引匹配成功**时，小程序就可能会被展示在搜索结果中

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220406164920192.png -->
![image-20220406164920192](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220406164920192.png)

注意：**allow即代表允许**，若是不允许改为disallow即可。***则代表所有页面**

- **页面的.json**配置文件，小程序的每个页面，都可以使用.json文件来**对本页面的窗口外观进行配置**，**页面中的配置项会覆盖全局的配置文件**app.json的window中的相同的配置项会被覆盖

### 认识小程序页面

#### 新建小程序页面

只需在**app.json**下的**pages**配置项中**新增页面的存放路径**即可。开发工具会自动帮我们创建对应的文件目录

#### 修改项目首页

只需在**app.json**下的**pages**配置项中将页面路径的前后顺序进行修改即可。开发工具会**将排在第一的页面**，**当作项目的首页**进行渲染

### WXML模板

**WXML**（WeiXin Markup Language）是**小程序框架设计**的一套**标签语言**，**用来构建小程序页面的结构**，其作用类似于网页开发中的HTML

#### WXML和HTML的区别

- **内置的标签名称不同**
  - HTML: div、span、img、a...
  - WXML: view、text、image...
- **属性节点不同**

比如有些在HTML中是href，但在WXML是url。意思是一个意思但表现方式不同

- WXML**提供了**类似Vue的**模板语言**
  - 数据绑定
  - 列表渲染
  - 条件渲染

### WXSS样式

WXSS是一套设计小程序特有的**样式语言**,用于**描述WXML的组件样式** ，类似于CSS

#### WXSS和CSS的区别

- **新增了rpx尺寸单位**
  - **WXSS**在底层支持新的尺寸单位rpx，**在不同大小的屏幕上小程序会自动进行换算**
- **提供了全局和局部样式**
  - 项目根目录下的**app.wxss**会**作用于所有小程序页面**
  - 局部页面的**.wxss**样式**会覆盖全局的样式**，但**只对当前页面生效**
- WXSS仅支持部分CSS选择器，如：
  - .class、#id、element、并集选择器、后代选择器、::after、::before等伪类选择器

## 小程序的宿主环境

宿主环境指的是**程序运行所必须依赖的环境**

**小程序的宿主环境**就是**手机微信**

### 宿主环境包含的内容

- 通信模型
- 运行机制
- 组件
- API

## 组件

小程序的组件也是**宿主环境提供**的

### 视图容器类组件

- **view**
  - **普通的视图区域**
  - 类似于HTML的div，是一个块级元素
  - 常用来实现页面的布局效果
- **scroll-view**
  - **可滚动的视图区域**
  - 常用来实现滚动列表效果

- **swiper**和**swiper-item**
  - **轮播图**容器组件和轮播图item组件

### 基础内容组件

- **text**
  - **文本组件**
  - 类似于HTML的span标签，是一个行内元素
- **rich-text**
  - **富文本组件**
  - 支持把HTML字符串渲染为WXML结构

### 其他常用组件

- **button**
  - **按钮组件**
  - 功能比HTML中的按钮要丰富许多
  - 通过**open-type**属性可以**调用微信提供的各种功能**（**客服**、**转发**、获取用户授权、获取用户信息等）
- **image**
  - **图片组件**
  - 该组件有默认的宽约为300px和高约为240px

- **navigator**
  - **页面导航组件**
  - 类似于HTML中的超链接a

### API

#### API概述

**小程序的API是宿主环境提供**的，通过这些丰富的小程序API，开发者可以方便的**调用微信提供的各种功能**，例如**获取用户信息**、**本地存储**、**支付功能**等

#### 小程序中API的分类

- **事件监听API**
  - 特点：**以on开头**，用来**监听某些事件的触发**
  - 举例：wx.**on**WindowResize(function callback)监听窗口尺寸变化的事件
- **同步API**
  - 特点：
    - **以Sync结尾**
    - 同步API的执行结果，可以**通过函数返回值直接获取**，如果执行出错会抛出异常
  - 举例：wx.setStorage**Sync**('key','value')想本地存储写入内容
- **异步API**
  - 特点：类似于jQuery中的**$.ajax(options)**函数，需要通过success、fail、complete接受调用结果
  - 举例：wx.**request**()发起网络数据请求，通过success回调函数接受数据

## 模板与配置

### 模板语法

#### 数据绑定

- 在data中定义数据
- 在WXML中使用数据

#### 事件绑定

事件是**渲染层到逻辑层的通讯方式**。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务处理

常用事件

|  类型  |         绑定方式          |            事件描述             |
| :----: | :-----------------------: | :-----------------------------: |
|  tap   |    bindtap或者bind:tap    | 手指触摸后离开，类似于click事件 |
| input  |  bindinput或者bind:input  |        文本框的输入事件         |
| change | bindchange或者bind:change |         状态改变时触发          |

##### bindtap

在小程序中不存在onclick事件，通过**tap事件**来**响应用户的触摸行为**

```html
<button type="primary" bindtap="btnTapHandler">按钮</button>
```

在页面的js文件中定义事件的处理函数，事件参数通过形参event（一般简写为e）来接收：

```javascript
page({
	//按钮的tap事件的处理函数
	btnTapHandler(e){
		//打印事件参数对象e
		console.log(e)
	}
})
```

##### bindinput

在小程序中，通过**input事件**来**响应文本框的输入事件。**

```html
<button type="primary" bindinput="inputHandler">按钮</button>
```

在页面的js文件中，定义事件处理函数

```js
inputHandler(e) {
  //e.detail.value是文本框输入的最新的值
	console.log(e.detail.value)
}
```

**在事件处理函数中为data数据赋值**

必须要通过**this.setData({})方法**，才能**修改data中的数据的值**

```javascript
Page({
    data: {
        count: 0,
    },
    //+1按钮的处理函数
    CountChange() {
        //修改data里面的count的值
       this.setData({
        count: this.data.count +1
       }) 
    }
})
```

```html
<button type="primary" bindtap="CountChange">按钮</button>
```

#### 事件传参

小程序的事件传参比较特殊，**不能在绑定事件的同时为事件处理函数传递参数**

在小程序中，为事件传参可以为组件提供**data-\***自定义属性传参，**其中\*代表的是参数的名字**

```html
<button bindtap="btnHandler" data-info="{{ 2 }}"></button>
```

以上代码：

- info会被解析成**参数的名字**
- 而插值表达式里面的2就是info这个**参数的值**

在事件处理函数中，通过**event.target.dataset.参数名**，即可获取到具体的**参数的值**。

注意：当你的形参将event**简写为e**时，**获取参数也要用e代替event**

```html
//设置手指触碰事件，并传递一个参数
<button type="warn" bindtap="btntap2" data-info = "{{ 2 }}">按钮</button>
```

```javascript
btntap2(e) {
  let a = e.target.dataset.info
  console.log(a)	//2
},
```

#### 双向绑定

**实现步骤**

- **定义数据**

```js
data: {
  count: 0,
  msg: '你好！！！'
},
```

- **渲染结构**

```html
<input type="text" bindinput="inputHandler" value="{{msg}}"/>
```

- **绑定input事件处理函数**

```js
inputHandler(e) {
  this.setData({
    msg: e.detail.value
  }) 
},
```

#### 条件渲染

**wx:if**，在小程序中**wx:if="{{ 判断条件 }}"**来判断是否需要渲染该代码块

```html
//渲染
<view wx:if="{{ true }}">111</view>
//不渲染
<view wx:if="{{ false }}">111</view>
```

注意：**wx:if** 可以搭配 **wx:elif** **wx:else**使用

**结合\<block>使用wx:if**

如果要**一次性控制多个组件的显示和隐藏**，可以**使用block标签**将多个组件包装起来，并在block标签上使用wx:if控制多个组件的显示

注意：\<block>**并不是一个组件**，它只是一个包裹性质的容器，**不会在页面做任何渲染**。这也是为什么不再用一个view将多个组件包裹起来的原因，虽然是隐藏了，但页面还是渲染了。

#### 列表渲染

**wx:for**,通过wx:for**可以根据指定数组**，**循环渲染重复的组件结构**

```html
<view wx:for="{{ array }}">
   {{index+1}}: {{ item }}
</view>
//index代表索引，item代表元素
//这里默认是写定了的，但是可以修改---> wx:for-index="修改的名字"，wx:for-item=""
```

**wx:key**的使用

类似于Vue列表渲染的**:key**，小程序在列表渲染时，也建议为渲染出来的列表项**指定唯一的key值**，从而**提高渲染的效率**

```html
<view wx:for="{{ arrKey }}" wx:key="id">
    {{ item.name }}
</view>
```

注意：**指定key值时，不用加插值表达式**

### 模板样式

#### 关于WXSS

WXSS(WeiXin Style Sheets)是一套**样式语言**，用于美化WXML的组件样式，类似于网页开发中的CSS

WXSS具有CSS大部分特性，同时，WXSS还**对CSS进行了扩充以及修改**，以适应微信小程序的开发

#### 关于rpx

rpx是微信小程序特有的，用于**解决屏适配的尺寸单位**

##### rpx的实现原理

鉴于不同设备屏幕的大小不同，为了**实现屏幕的自动适配**，rpx将所有设备的屏幕，在宽度上等分为750份，即**当前屏幕的总宽度为750rpx**

- 在**较小**的设备上，**1rpx所代表的宽度较小**
- 在**较大**的设备上，**1rpx所代表的宽度较大**

总之，**宽度是自适应的**

在不同设备上运行时，会**自动把rpx样式单位换算成对应的像素单位**进行渲染，从而实现屏幕适配

#### rpx的使用技巧

在iPhone6上，屏幕宽度为375px，共有750个物理像素，等分为750rpx。则

**750rpx = 375px = 750物理像素**

**1rpx = 0.5px = 1物理像素**

**官方建议**：开发微信小程序时，设计师可以用**iPhone6**作为**视觉稿的标准**

因为在iPhone6中，**rpx和px的倍数关系是整数**，在开发过程中会方便许多

**开发举例**：在iPhone6上如果要绘制**宽100px，高20px**的盒子，换算成rpx单位，宽高分别**200rpx**和**40rpx**

#### 关于样式导入

使用WXSS提供的**@import**语法，可以**导入外联的样式表**

```css
@import "***.wxss"
```

### 全局配置

#### 关于全局配置文件

前面我们了解到，app.json有如下几个配置项：pages、**window**、**tabBar**、style

##### 小程序窗口的组成部分-window

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412100701922.png -->
<img src="C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412100701922.png" alt="image-20220412100701922" style="zoom: 67%;" />

从上到下，整个窗口被分为了**三个部分**。前面两个部分的全局样式都可以通过**window节点**来设置

##### window节点常见的配置项

![img](https://img2022.cnblogs.com/blog/2086354/202203/2086354-20220308171301241-70709351.png)

注意：在window节点中设置背景颜色，只能用**十六进制颜色码（HexColor）**

**navigationBarTextStyle**的可选值只有**black**和**white**

##### tabBar

tabBar是移动端应用常见的页面效果，用于**实现多页面的快速切换**。通常分为

- 底部tabBar
- 顶部tabBar

注意：

- tabBar中只能配置**最少2个，最多5个**的tab标签
- 当渲染**顶部tabBar**时，**不显示icon**（图标），只显示文本

##### tabBar节点的配置项

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412120500931.png -->
![image-20220412120500931](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412120500931.png)

注意：这些配置项中，**list是必填属性**，其他的可以根据需要选取

##### 关于list配置项

list配置项是**对象类型**，它也有自己的一些配置项

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412120643739.png -->
![image-20220412120643739](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220412120643739.png)

其中，**跳转后的页面路径**和**提示文本**是**必填**项

```json
//这就是一个最简单的tabBar的配置
"tabBar": {
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "index"
            },
            {
                "pagePath": "pages/list/list",
                "text": "list"
            }
        ]
    },
```

注意：**tabBar页签**在app.json -> pages中配置时，**必须在最前面**，不然无法正常渲染出来

#### 关于页面配置文件

小程序中，每个页面都有自己的.json配置文件，用来对**当前页面**的**窗口外观**、**页面效果**等进行配置

###### 页面配置和全局配置的关系

小程序中，app.json中的window节点，可以**全局配置**小程序中**每个页面的窗口表现**

如果某些小程序页面**想要拥有特殊的窗口表现**，此时，"**页面级别的.json配置文件**"就可以实现这种需求

注意：当页面配置与全局配置**冲突**时，根据就近原则，页面的配置效果会覆盖掉全局的配置，最终的效果**以页面配置为准**

#### 网络数据请求

出于**安全性**考虑。小程序官方对**数据接口的请求**做出了如下的两个限制

- 只能请求**HTTPS**类型的接口
- 必须将**接口域名**添加到**信任列表**中

##### 配置request合法域名

需求描述：假设在自己的微信小程序中，希望请求https://www.escook.cn/域名下的接口

配置步骤：登录微信小程序**管理后台** ->开发 ->开发设置 ->服务器域名 ->添加需要请求的request域名

注意事项：

1. 域名**只支持https**协议
2. 域名**不能使用IP地址**或**localhost**
3. 域名**必须经过ICP备案**
4. 服务器域名一月内最多可申请五次修改

##### 发起get请求

调用微信小程序提供的**wx.request()**方法，可以**发起GET数据请求**

```html
<button bindtap="getRequest">GET请求</button>
```

```javascript
 getRequest() {
        wx.request({
          url: 'https://www.escook.cn/api/get',
          method: 'GET',
          data: {
              name: 'LX',
              age: '20'
          },
          success: (res) => {
              console.log(res.data);
          }
        })     
    },
```

post请求与get请求基本一致，就是method改为post即可，不再赘述

##### 在页面刚加载时请求数据

在很多情况下， 我们需要**在页面刚加载的时候**，**自动请求一些初始化数据**。此时需要在页面的**onLoad**事件中调用获取数据的函数

```js
/*这个事件是页面js帮我们创建好了的，我们直接在里面调用获取数据函数即可*/
/**
* 生命周期函数--监听页面加载
*/
onLoad(options) {
  this.getRequest(),
  this.postRequest()
},
//在这里面调用了这两个函数后，在页面加载时就会自动的请求数据
```

## 视图与逻辑

### 页面导航

页面导航指的是**页面之间的相互跳转**

#### 两种方式

1. **声明式导航**
   - 在页面上**声明**一个\<navigator>**导航组件**
   - **通过点击**\<navigator>组件**实现页面跳转**
2. **编程式导航**
   - **调用**小程序的导航**API**，实现页面跳转

#### 声明式导航

###### 导航到tabBar页面

**tabBar页面**就是配置到tabBar的页面

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220413160708119.png -->
![image-20220413160708119](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220413160708119.png)

如上图，就是三个tabBar页面

在使用\<navigator>组件跳转到指定的tabBar页面时，需要指定url属性和open-type属性

- **url**表示要跳转的tabBar页面地址。**必须以/开头**
- **open-type**表示跳转方式，**必须为switchTab**

```html
<navigator url="/pages/contact/contact" open-type="switchTab">跳转到联系我们</navigator>
```

##### 导航到非tabBar页面

大体上和上面一致，只需**改变open-type 为 navigate**即可

```html
<navigator url="/pages/info/info" open-type="navigate">跳转到info</navigator>
```

注意：其实**open-type的默认值就是navigate**，所以在向非tabBar页面跳转时，open-type属性**可以省略**

##### 后退（回退）导航

如果要后退到上一页或多页，则需要指定open-type属性和delta属性

- **open-type**的值必须是**navigateBack**，表示要进行后退导航
- **delta**的值必须是**数字**，表示要**后退的层级**

#### 编程式导航

##### 导航到tabBar页面

调用**wx.switchTab**(Object object)方法，可以跳转到tabBar页面。其中Object**参数对象**属性列表如下

| 属性     | 类型     | 必填   | 说明                                                  |
| :------- | :------- | :----- | :---------------------------------------------------- |
| **url**  | string   | **是** | 需要**跳转的 tabBar 页面的路径** ，路径后不能带参数。 |
| success  | function | 否     | 接口调用成功的回调函数                                |
| fail     | function | 否     | 接口调用失败的回调函数                                |
| complete | function | 否     | 接口调用结束的回调函数（调用成功、失败都会执行）      |

```html
//页面结构
<button bindtap="gotoContact">编程式导航1</button>
```

```js
/*相关函数*/
gotoContact() {
  wx.switchTab({
    url: '/pages/contact/contact',
  })
},
```

##### 导航到非tabBar页面

调用navigateTo(Object object)方法，可以跳转到非tabBar页面。其中Object**参数对象**属性列表如下

| 属性     | 类型     | 必填   | 说明                                                     |
| :------- | :------- | :----- | :------------------------------------------------------- |
| **url**  | string   | **是** | 需要**跳转的应用内非 tabBar 的页面的路径**               |
| events   | Object   | 否     | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。 |
| success  | function | 否     | 接口调用成功的回调函数                                   |
| fail     | function | 否     | 接口调用失败的回调函数                                   |
| complete | function | 否     | 接口调用结束的回调函数（调用成功、失败都会执行）         |

```html
//页面结构
<button bindtap="gotoInfo">编程式导航2</button>
```

```js
/*函数*/
gotoInfo() {
  wx.navigateTo({
    url: '/pages/info/info'
  })
}
```

##### 后退导航

调用wx.navigateBack(Object object)方法，可以返回上一页或多页。其中Object**参数对象**属性列表如下

|   属性    |   类型   | 默认值 | 必填 |                          说明                           |
| :-------: | :------: | :----: | :--: | :-----------------------------------------------------: |
| **delta** |  number  |   1    |  否  | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 |
|  success  | function |        |  否  |                 接口调用成功的回调函数                  |
|   fail    | function |        |  否  |                 接口调用失败的回调函数                  |
| complete  | function |        |  否  |    接口调用结束的回调函数（调用成功、失败都会执行）     |

```html
//页面结构
<button bindtap="Back">回退</button>
```

```js
/*相关函数*/
Back() {
  wx.navigateBack({
    delta: 1,
  })
},
```

### 导航传参

#### 声明式导航传参

navigator组件的**url**属性用来**指定将要跳转的页面的路径**，同时**路径的后面还可以携带参数**

- **参数**与**路径**之间使用**？**分隔
- **参数键**与**参数值**用=相连
- **不同参数**用**&**分割

```html
<navigator url="/pages/info/info?name=LX&age=18 ">跳转并携带参数</navigator>
```

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220413174955809.png -->
![image-20220413174955809](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220413174955809.png)

**页面参数可以这样查看**

编程式传参与之类似，不再赘述

#### 在onLoad中接收参数

通过声明式导航传参和编程式导航传参所**携带的参数**，可以直接在**onLoad**事件中获取到

```js
//在接收页面的onLoad事件中，可以直接输出参数
/**
* 生命周期函数--监听页面加载
*/
onLoad(options) {
  console.log(options);
  //将option暴露出来，这样在其他页面也可以调用
  //query是在data中定义的一个空对象
  this.setData({
    query: options
  })
},
```

### 页面事件

##### 关于下拉刷新

**下拉刷新**是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而**加载页面数据**的行为

在小程序中，下拉刷新**默认是关闭**的，需要我们手动开启

全局设置：app.json -> **window** -> **enablePullDownRefresh: true**

局部设置：在页面的json配置文件中，将**enablePullDownRefresh**设置为**true**

注意：

- 只有在**开启**了**下拉刷新**时，**backgroundColor才会生效**

- 在实际开发中，推荐使用第二种方式，**为需要开启下拉刷新的页面单独开启**

**设置下拉刷新的loading**

**backgroundTextStyle**设置下拉loading的样式，仅支持**dark/light**

**监听下拉刷新**

在页面的js文件中，通过**onPullDownRefresh()函数**即可监听当前页面的下拉刷新事件

```js
/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {
  console.log('触发了下拉刷新');
},
```

**停止下拉刷新的效果**

当处理完下拉刷新后，下拉刷新的loading效果会一直显示，不会主动消失，所以需要手动隐藏。此时，调用wx.stopPullDownRefresh()可以停止当前页面的下拉刷新

##### 关于上拉触底

**上拉触底**同样是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为

**设置步骤**：app.json -> window -> **onReachBottomDistance 新的数值**

在小程序中，**默认**的上拉触底距离是**50px**，若没特殊需求，一般使用默认值即可

**监听上拉触底事件**

在页面的js文件中，通过**onReachBottom()**函数即可监听当前页面的上拉触底事件

```js
/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {
  console.log('触发了上拉触底事件');
},
```

注意：页面上要有**超过页面高度的元素**存在，才会触发上拉触底事件

**配置上拉触底距离**

上拉触底距离指的是**触发上拉触底事件时，滚动条距离页面底部的距离**，默认是50px

**对上拉触底进行节流处理**

- 在**data**中定义**isloading节流阀**（其实就是定义一个标识值）

```js
data: {
  ...
  isloading: true
},
```

- 在**自己定义的上拉事件函数**中**修改节流阀**的值

  - 在**刚调用事件函数**的时候将节流阀设置为**false**

  ```js
  //定义获取随机颜色的方法
  getColors() {
    //正在数据请求时，将标识置为false，阻止发起下一次数据请求
    this.setData({
      isloading: false
  	})
  	...
  }	
  ```

  - 在**网络请求**的**complete回调函数**中，将节流阀重置为**true**

  ```js
  complete: () => {
  	...
    this.setData({
      //当一次数据请求结束时，将标识置为true，允许发起下一次数据请求
      isloading: true
    })
  }
  ```

- 在**onReachBottom**上拉事件处理函数中**判断节流阀的值**，从而对数据请求进行节流处理

  - 如果节流阀的值为**true**，则**发起当前请求**
  - 如果节流阀的值为**false**，则**阻止数据请求**

  ```js
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom() {
    //如果标识为true则允许数据请求
    if(this.data.isloading) {
      this.getColors()
    }
  },
  ```

### 生命周期

**生命周期**（Life Cycle）是指一个对象从**创建** ---》 **运行** ---》**销毁**的整个阶段，**强调的是一个时间段**

#### 分类

在小程序中，生命周期分为两类

- **应用生命周期**
  - 指的是小程序从启动 ->运行 ->销毁的过程
- **页面生命周期**
  - 指的是每个页面的加载 ->渲染 ->销毁的过程

其中，**页面**的生命周期**范围较小**，**应用程序**的生命周期**范围较大**（可以看作全局和局部？？）

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220414230133359.png -->
![image-20220414230133359](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220414230133359.png)

#### 生命周期函数

**生命周期函数**：是有小程序框架提供的**内置函数**，**会伴随生命周期，自动按次序执行**

举例：如**onLoad**：监听页面加载、**onPullDownRefresh**：监听用户下拉动作 等等

作用：生命周期函数允许我们**在特定的时间点，执行特定的操作**

```js
//如这里onLoad的作用就是在首次加载页面的时候，就调用这个方法
onLoad(options) {
  this.getColors()
},
```

##### 应用生命周期函数

小程序的**应用周期函数**需要在**app.js**中进行声明

```js
// app.js
App({
	//当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {},

	//当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function (options) {},

	//当小程序从前台进入后台，会触发 onHide
  onHide: function () {},

	//当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function (msg) {}
})
```

##### 页面生命周期函数

小程序的**页面生命周期函数**需要在页面的**.js文件**中进行声明

```js
//页面的.js文件
Page({
		//生命周期函数--监听页面加载
    onLoad(options) {},

		//生命周期函数--监听页面初次渲染完成
    onReady() {},

		//生命周期函数--监听页面显示
    onShow() {},

		//生命周期函数--监听页面隐藏
    onHide() {},

		//生命周期函数--监听页面卸载
    onUnload() {},
})
```

## 基础加强

### 自定义组件

#### 创建与引用

##### 创建组件

- 在项目的根目录中，创建**components -> test**文件夹
- 在新建的components -> test文件夹上，鼠标右键，点击**新建Component**
- 创建成功后，会自动生成组件对应的四个文件

**注意**：为了保证目录结构的清晰，建议把不同组件，存放在单独的目录中

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220416204206225.png -->
![image-20220416204206225](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220416204206225.png)

##### 引用组件

**局部引用**

组件**只能在当前被引用的页面使用**

在页面的**.json配置文件**中**引用组件**，就是**局部引用**

```js
//在页面的.json 文件中，引用组件的格式
{
  "usingComponents": {
    "test": "../components/test/test"
  }
}  
```

```html
//在页面的.wxml文件中，使用被引用组件
<test></test>
```

**全局引用**

组件**可以在每个小程序页面使用**

在**app.json**全局配置文件中**引用组件**的方式，叫做"全局引用"

```js
//在app.json文件中，引用组件
{
    "pages": [...],
    "window": {...},
    "usingComponents": {
        "test2": "/components/test2/test2"
    },
}
```

```html
//在页面的.wxml文件中，使用被引用组件
<test2></test2>
```

#### 数据、方法和属性

##### data数据

在小程序组件中**，用于组件模板渲染**的**私有数据**，需要定义到**data节点**中

```js
//这是在组件的.js文件中
//组件的初始数据
//这里的count就是组件的私有数据
data: {
  count: 0
},
```

##### methods方法

在小程序组件中，**事件处理函数**和**自定义方法**，需要定义到**methods节点**中

```js
//这是在组件的.js文件中
//组件的方法列表
methods: {
  //事件处理函数
  addCount() {
    this.setData({
      count: this.data.count + 1
    })
  }
}
```

```html
//在组件的.wxml文件中
<button bindtap="addCount">+1</button>
<view>{{ count }}</view>
```

##### properties属性

在小程序组件中，properties是组件对外属性，用来**接收外界传递到组件中的数据**

这里设置的数据，可以**给methods的方法添加判断条件**

如设置一个最大值，数字不能超过这个最大值

```js
//组件的属性列表
properties: {
  //第一种:简化的方式 -> 缺点：无法指定默认值
  max: Number
  //第二种:完整的定义方式 -> 缺点：不够简洁
  max: {
    type: Number,
    value: 10 //默认值
  }
},
methods: {
  addCount() {
    //如果数字大于最大值时，则不再对count + 1
    if(this.data.count < this.properties.max){
      this.setData({
        count: this.data.count + 1
      })
    }
  }
}
```

```html
//在使用组件的页面的.wxml中
//使用组件的同时，可以指定max的值，这个值会覆盖默认的值
<test max="100"></test>
```

##### data与properties比较

在小程序组件中，properties属性和data数据用法相同，都是可读可写的。**本质上**properties和data**没有区别**，所以data能做的，properties也能做。但是：

- data更倾向于**存储组件的私有数据**
- properties更倾向于**存储外界传递到组件中的数据**

#### 数据监听器

数据监听器用于**监听**和**响应**任何**属性和数据字段的变化**，从而**执行特定的操作**。它的作用类似于vue中的watch侦听器

##### 监听字段的变化

语法格式：

```js
observers: {
	'字段A, 字段B': function(字段A的新值, 字段B的新值) {
			//做一些事情
			...
	}
}
```

注意

- 数据监听器监听的是 **setData 涉及到的数据字段**，即使这些数据字段的值没有发生变化，数据监听器依然会被触发。
- 如果在数据监听器函数中**使用 setData 设置本身监听的数据字段**，**可能会导致死循环**，需要特别留意。
- 数据监听器和属性的 observer 相比，数据监听器更强大且通常具有更好的性能。

示例：用数据监听器实现`this.data.sum` 永远是 `this.data.numberA` 与 `this.data.numberB` 的和

```js
//组件的.js文件
Component({
   	//组件的初始数据
    data: {
        n1: 0,
        n2: 0,
        sum: 0
    },

    //数据监听器
    observers: {
        'n1, n2': function (Newn1, Newn2) {
           this.setData({
               sum : Newn1 + Newn2
           })
        }
    },
  	//组件的方法列表
    methods: {
        addN1() {
            this.setData({
                n1: this.data.n1 + 1
            })
        },
        addN2() {
            this.setData({
                n2: this.data.n2 + 1
            })
        }
    }
})

```

```html
//组件的.wxml文件
<view>{{ n1 }} + {{ n2 }} = {{ sum }}</view>
<button size="mini" bindtap="addN1">n1自增</button>
<button size="mini" bindtap="addN2">n2自增</button>
```

##### 监听对象属性的变化

数据监听器支持监听对象中**单个**或**多个属性**的变化

语法格式

```js
observers: {
	'对象.属性A, 对象.属性B': function(属性A的新值, 属性B的新值) {
		//触发此监听器的三种情况
		//1.为属性A赋新值，使用setData设置this.data.对象.属性A 时触发
		//2.为属性B赋新值，使用setData设置this.data.对象.属性B 时触发
		//3.直接为对象赋值(添加新的属性) 
    //做一些事情
    ...
	}
}
```

##### 监听对象中所有属性的变化

如果某个对象中需要被监听的对象太多，为了方便，可以使用**通配符\*\***来**监听对象中所有属性的的变化**

### 纯数据字段

纯数据字段指的是那些**不用于界面渲染**的**data字段**

应用场景：在有些情况下，某些data中的字段**既不会展示在界面上**，**也不会传递给其他组件**，仅仅在当前组件内部使用。那么这些字段就适合被设置为纯数据字段

好处：纯数据字段有利于**提升页面更新的性能**

#### 使用规则

在**options节点**中，指定**pureDataPattern**的值为一个**正则表达式**，凡是**符合这个正则表达式的字段**，将**被当作纯数据字段**

```js
options: {
	pureDataPattern: /^_/
},
data: {
	a: true,	//普通字段
	_b: true,	//纯数据字段
}
```

### 组件的生命周期函数

小程序组件可用的**全部生命周期函数**如下表：

|   生命周期   |      参数      |                   描述                   |
| :----------: | :------------: | :--------------------------------------: |
| **created**  |     **无**     |      **在组件实例刚刚被创建时执行**      |
| **attached** |     **无**     |    **在组件实例进入页面节点树时执行**    |
|    ready     |       无       |       在组件在视图层布局完成后执行       |
|    moved     |       无       | 在组件实例被移动到节点树另一个位置时执行 |
| **detached** |     **无**     |  **在组件实例被从页面节点树移除时执行**  |
|    error     | `Object Error` |        每当组件方法抛出错误时执行        |

#### 常用的三个生命周期函数

- **created**：组件实例**刚被创建好**的时候，created生命周期函数会被**触发**
  - 此时还**不能调用setData**
  - 通常在这个生命周期函数中，只应该用于给组件的this添加一些自定义的属性字段

- **attached**：在组件完全**初始化完毕**、**进入页面节点树后**，attached生命周期函数会被触发
  - 此时，this.data已被初始化完毕
  - 绝大多数初始化的工作可以在这个时机进行（例如**发请求获取初始数据**）
- **detached**：在组件**离开页面节点树**后，detached生命周期函数会被触发
  - **退出一个页面**时，**会触发页面内每个自定义组件的detached函数**
  - 此时适合做一些清理性质的工作

#### lifetimes节点

组件的的生命周期也可以在 `lifetimes` 字段内进行声明（这是推荐的方式，其优先级最高）

```js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      //做一些事情
      ...
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      //做一些事情
      ...
    },
  },
  // ...
})
```

### 插槽

在自定义组件的wxml结构中，可以提供一个<slot>节点，用于**承载组件使用者提供的wxml结构**

简单来说，<slot>节点就是一个**占位符**

#### 单个插槽

在小程序中，**默认**每个自定义组件**只允许使用一个**<slot>节点进行占位，这种在个数上的限制叫做**单个插槽**

#### 多个插槽

在小程序中，**默认是不支持**使用多个<slot>节点的，可以在**组件的js文件**中，通过如下的方式进行启用

```js
Component({
    options: {
        //启用多插槽支持
        multipleSlots: true
    },
)}
```

**使用多个插槽**

```html
//在组件的wxml中
//通过name属性来区分不同插槽
<view>
    <view>这里是组件的内部结构</view>
    <slot name="before"></slot>
    <slot name="after"></slot> 
</view>

//在使用组件的页面的wxml中
//通过slot属性，来对应不同的插槽
<test4>
    <view slot="before">这是通过插槽填充的内容1</view>
    <view slot="after">这是通过插槽填充的内容2</view>
</test4>
```

### 父子组件的通信

#### 三种方式

- 属性绑定
  - 用于**父组件向子组件**的指定属性设置数据，**仅能设置JSON兼容的数据**
- 事件绑定
  - 用于**子组件向父组件**传递数据，可以传递**任意数据**
- 获取组件实例
  - **父组件**还可以通过**this.selectComponent()**获取子组件实例对象
  - 这样就可以直接访问子组件的**任意数据和方法**

###### 属性绑定

属性绑定用于**父向子传值**，而且**只能传递普通类型的数据**，无法将方法传递给子组件

```js
//父级的js文件中设置所需传递的值
data: {
	count: 0
}
```

```html
<!-- 父级的wxml文件 -->
<view>在父组件中，count的值： {{ count }}</view>
<view>-----------------</view>
<!-- 通过属性绑定给子组件传值 -->
<test5 count="{{ count }}"></test5>
```

```js
//子组件的js文件中接收父组件传递过来的值
properties: {
	count: Number
}
```

###### 事件绑定

事件绑定用于**实现子向父传值**，**可以传递任何类型的数据**。

事件系统是组件间通信的主要方式之一。自定义组件可以触发任意的事件，引用组件的页面可以监听这些事件

步骤一：在**父组件**的js文件中，**定义一个函数**，这个函数通过自定义事件的形式，传递给子组件

```js
//在父组件中，定义一个方法
//这个方法会被传递给子组件
syncCount() {
	console.log('syncCount');
},
```

步骤二：在**父组件**的wxml中，通过**自定义事件**的形式，将步骤一定义的函数传递给子组件

```html
<!-- 使用bind: 自定义事件的名称 -->
<test5 count="{{ count }}" bind:sync="syncCount"></test5>
```

步骤三：在**子组件**的js文件中，通过调用**this.triggerEvent('自定义事件名称',{参数对象 (可选) })**，将数据发送到父组件

```js
//子组件的js文件代码
methods: {
  addCount() {
    this.setData({
      count: this.properties.count + 1
 	 }),
  //触发自定义事件，将数值同步给父组件
  this.triggerEvent('aync',{ value: this.properties.count })
  }
}
```

步骤四：在**父组件**的js文件中，通过**e.detail**获取到子组件传递过来的数据

```js
//步骤一所定义的方法
//通过形参e来接收子组件传递过来的参数对象
syncCount(e) {
	//console.log('syncCount');
	//console.log(e.detail.value);
	this.setData({
		count: e.detail.value
	})
},
```

###### 获取组件实例

可以在**父组件**中调用**this.selectComponent("id或class选择器")**，**获取子组件的实例对象**，从而直接访问子组件的任意数据和方法，调用时需要传入一个**选择器**

```html
//父组件的wxml
<test5 count="{{ count }}" class="childClass" id="childId"></test5>
<button bindtap="getChild">获取子组件实例</button>
```

```js
//父组件的js
//按钮的tap事件处理函数
getChild() {
	//切记下面的参数不能传递标签选择器"test5",否则返回的是null
	const child = this.selectComponent('.childClass') //也可以传递id选择器 -> #childId
	child.setData({
		//调用子组件的setData方法，修改子组件的数据
		count: child.properties.count + 1
	})
	//也可以直接调用子组件的事件处理函数
	...
}
```

### behaviors

###### 什么是behaviors？

behaviors是小程序中，**用于实现组件间代码共享**

###### behaviors的工作方式

每个behaviors可以包含一组**属性、数据、生命周期函数和方法**。组件**引用它**，它的属性、数据和方法**会被合并到组件中**

每个组件可以引用多个behavior，behavior也可以引用其他behavior

###### 创建behavior

调用**Behavior方法**即可创建一个**共享的behavior实例对象**，供所有组件使用

```js
//调用Behavior()方法，创建实例对象
//并使用module.exports将behavior实例对象共享出去
module.exports = Behavior({
		//私有数据节点
    data: {
        name: Lx
    },
    //属性节点
    properties: {},
    //事件处理函数节点
    methods: {},
    //其他节点
    ...
})
```

###### 导入并使用behavior

在组件中，使用**require()方法**导入需要的behavior，**挂载后即可访问behavior中的数据和方法**

```js
//导入外部的behavior
const myBehavior = require('../../behaviors/my-behavior')

// components/test5/test5.js
Component({
    behaviors: [myBehavior]
    ...
)}
```

成功挂载后，**behavior**里面的**属性和方法**，**都可以在引用behavior的组件中使用**

### API Promise化

指的是**通过额外的配置**，将官方提供的、**基于回调函数的异步API，升级改造成基于Promise的异步API**，从而提高代码的可读性、维护性，避免回调地狱的问题

##### 实现API Promise化

在小程序中，实现API Promise化主要依赖于**miniprogram-api-promise**这个第三方npm包

它的安装步骤如下

```bash
npm install --save miniprogram-api-promise@1.0.4
```

```js
//在小程序入口文件(app.js),只需调用一次promisifyAll()方法
//即可实现异步API的promise化
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx, wxp)

App({ ... )}
```

##### 调用promise化后的API

```js
//页面的js文件
async getInfo() {
  const res = await wx.p.request({
    url: 'https://www.escook.cn/api/get',
    method: 'GET',
    data: {
      name: 'LX',
      age: 20
    }
  })
  console.log(res);
}
```

```html
//页面的wxml文件
<van-button type="primary" bindtap="getInfo">按钮</van-button>
```

打印出来的结果

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420150812316.png -->
![image-20220420150812316](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420150812316.png)

### 全局数据共享

**全局数据共享**又叫状态管理是为了解决**组件之间数据共享**的问题

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420151104302.png -->
![image-20220420151104302](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420151104302.png)

#### 小程序中的全局数据共享

在小程序中，可使用mobx-miniprogram配合mobx-miniprogram-bindings实现全局数据共享

- mobx-miniprogram用来**创建Store实例对象**
- mobx-miniprogram-bindings用来**把Store中共享的数据或方法，绑定到组件或页面中使用**

##### 安装MobX相关的包

在命令终端运行如下命令

```bash
npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

#### 创建MobX的Store实例对象

在**page**文件夹**平级**，创建一个**store文件夹**，在这个文件夹里面新建一个**store.js文件**。

**在这个js文件中，专门来创建Store实例对象**

```js
import { observable } from 'mobx-miniprogram'

export const store = observable({
	//需要共享的数据和方法
})
```

### 分包

分包指的是**把一个完整的小程序项目，按照需求划分为不同的子包**，在构建时打包成不同的分包，用户在使用时**按需进行加载**

#### 分包的好处

- 可以**优化小程序首次启动的下载时间**
- 在**多团队共同开发**时可以更好的**解耦协作**

#### 分包的加载规则

- 在小程序启动时，**默认**会**下载主包并启动主包的页面**
  - **tabBar页面需放在主包**
- 当用户进入分包内某个页面时**，客户端会把对应的分包下载下来**，下载完成后再进行展示
  - 非tabBar页面可以按照功能不同，划分为不同的分包之后，进行**按需下载**

#### 使用分包

配置方法

<!-- TODO: migrate image from C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420160029222.png -->
![image-20220420160029222](C:\Users\黎\AppData\Roaming\Typora\typora-user-images\image-20220420160029222.png)

#### 打包原则

1. 小程序会按**subpackages**的配置进行打包，subpackages之外的目录被打包到主包中
2. **最外层的pages存放的是主包的页面**
3. **tabBar必须在主包里面**
4. 分包之间**不能互相嵌套**

#### 引用原则

1. 主包**无法引用**分包内的私有资源
2. 分包之间**不能相互引用**私有资源
3. 分包**可以引用**主包内的公共资源

#### 分包预下载

分包预下载指的是：在进入小程序的某个页面时，**由框架自动预下载可能需要的分包**，从而提升进入后续分包页面时的启动速度

#### 配置分包预下载

**预下载分包的行为，会在进入指定页面时触发**。在**app.json**中，使用**preloadRule节点**定义分包的预下载规则

```js
//定义分包预下载规则的节点
"preloadRule": {
	//触发分包预下载的页面路径
  "pages/contact/contact": {
  	//network表示在指定的网络模式下进行预下载
  	//可选值为：all(不限网络)，wifi(仅在wifi模式下进行预下载)
  	//默认值是 wifi
    "network": "all",
    //packages表示进入页面后，预下载的那些分包
    //可以通过页面的root和name指定
    "packages": ["packageA"]
  }
},
//综上，这里定义的节点的含义是：在进入contact页面时，预下载分包"packageA"
```

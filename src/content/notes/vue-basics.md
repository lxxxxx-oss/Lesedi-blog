---
title: Vue基础
category: 前端
tags: [Vue]
pubDate: 2026-06-17
description: Vue2基础语法、组件化开发、路由、Vuex状态管理与axios网络请求笔记
source: Vue基础.md
---

# Vue基础

## 一、Vue基础

### Vue简介

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。

### Vue是一个渐进式的框架

1. 渐进式意味着你可以将Vue作为你应用的一部分嵌套其中
2. Vue的核心库以及其生态系统
3. Core + Vue-router + Vuex

### Vue特点和Web开发常见高级功能

1. 解耦视图和数据
2. 可复用的组件
3. 前端路由技术
4. 状态管理
5. 虚拟DOM

### Vue安装方式

**方式一: 直接CDN引入**

可以选择引入开发环境版本 / 生产环境版本

```html
<!-- 开发环境版本, 包含了帮助的命令行警告 -->
<script src='https://cdn.jsdeliver.net/npm/vue/dist/vue.js'></script>
<!-- 生产环境版本, 优化了尺寸和速度 -->
<script src='https://cdn.jsdeliver.net/npm/vue'></script>
```

**方式二：下载和引入**

```html
<!-- 开发环境 -->
https://vuejs.org/js/vue.js
<!-- 生产环境 -->
https://vuejs.org/js/vue.min.js
```

**方式三. NPM安装**

通过webpack和CLI的使用

### Vue的MVVM

#### M：Model 数据模型

**数据层**

数据可能是固定的死数据, 更多的是来自服务器, 从网络上请求下来的数据

#### V: View 视图模板

**视觉层**

在前端开发中, 通常是DOM层

作用: 是给用户展示各种信息

#### VM：View-Model 视图模型

**视图模型层**

ViewModel是Vue.js的核心，它是一个Vue实例

是View和Model沟通的桥梁

### 动态绑定Class，v-bind

#### 1.对象语法

我们可以给v-bind:class 一个对象，以动态地切换class。注意：v-bind指令可以与普通的class共存

动态切换也就是**动态绑定**

```html
<!--  布尔值的真假，决定了该类是否被添加到标签上去-->
<!--  <h2 :class="{类名一:布尔值，类名二:布尔值}">{{ message }}</h2>-->
  <h2 :class="{active:isActive}">{{ message }}</h2>
```

```js
el: '#app',
data:{
  message:'你好',
  isActive:true,  //根据这里的真假，来决定是否添加该类，这里也可以在后面methods进行更改，是动态的
},
```

#### 2.数组语法

```html
<!--这里的active和line都是提前定义好了的类-->
<!-- 这里的类不能动态改变，是写定了的，所以和普通的class相比没啥差别，不太常用-->
<h2 :class="['active','line']">{{ message }}</h2>
```

### 动态绑定style

**v-bind:style** 或者 语法糖形式 **:style**
可以绑定数据的方式有：
1）对象
2）数组
3）方法（方法返回对象或者数组）

大体上与动态绑定class相同

```html
<!--  <h2 :style="{css属性名:'属性值'}"></h2>-->
<!--  50px必须加上单引号，否则会被当成变量解析，会报错-->
<!--  然而这里的属性还是相当于固定的，没有意义，所以属性值这里通常是变量-->
  <h2 :style="{fontSize:'50px'}">{{ message }}</h2>
<!--  当属性值是变量时，就不用加单引号，因为会默认当作变量解析-->
  <h2 :style="{fontSize:changeSize}">{{ message }}</h2>
```

```js
el: '#app',
data:{
  message:'你好',
  changeSize:'100px'
},
```

### v-show和v-if

作用都是根据**布尔值的真假控制显示和隐藏**上

v-show严格意义上说是"**条件隐藏**"。浏览器首先不管三七二十一，把**HTML元素先渲染起来，符合条件就显示，不符合条件display就为none，不显示，但是元素还在那。**

v-if是真正意义上的"**条件渲染**"。浏览器先判断符不符合条件， **符合了再渲染，否则不渲染DOM，浏览器中找不到这个DOM** 。

### v-on

作用是**监听 DOM 事件，并在触发时运行一些 JavaScript 代码，也可以监听组件间的自定义事件（子传父）。**，语法糖形式  **"@"**

一些常见的事件

鼠标事件：onclick ondblclick onmouseenter onmouseleave onmouseover onmousedown等等

键盘事件：onkeyup onkeydown onkeypress oninput 等等

- 没有参数的情况下, 可以不写(); 如果方法本身有一个参数, 会默认将原生事件event参数传递进去
- 如果传入某个参数, 同时需要event时, 可以通过$event传入事件

#### v-on修饰符的使用

- .stop，用于阻止事件冒泡的一个修饰符（事件冒泡就是指子元素发生的事件，会冒泡到父元素身上）
- .keyup，用于监听键盘事件
- .prevent，用于阻止浏览器的默认提交
- .once,用于限制函数的执行次数，顾名思义once是只执行一次

### v-for

作用是**基于一个数组来渲染一个列表**

#### 用 v-for 把一个数组对应为一组元素

```html
<ul>
<!--    item对应的是数组里的每一项，如果不输入item列表里面是空的，这个item可以修改，前后对应即可,in是关键字不能少（in可以被替换为of），最后是数组的名字-->
  <li v-for="item in arr">
    祝您{{item}}
  </li>
<!--        v-for在使用时也可以调用数据的索引-->
  <li v-for="(item,index) in arr">
    {{index+1}}
  </li>
</ul>
<!--     v-for在对象数组里的使用-->
<h3 v-for="(items,index) in animals">
<!--        用点语法（.对象名）的方式进行一个数据的获取-->
  {{index+1}}:{{items.name}}
</h3>
```

```js
el:"#app",
data:{
  arr:["早安","午安","晚安"],
  animals:[
    {name:"panda"},
    {name:"monkey"},
    {name:"horse"},
  ]
},
```

#### 在v-for里使用对象

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```js
el: '#v-for-object',
data: {
  object: {
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2022-04-10'
  }
}
```

你也可以提供第二个的参数为 property 名称 (也就是键名)：

```html
<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>
```

还可以用第三个参数作为索引：

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

### v-model

作用是**实现表单元素和数据**的**双向绑定**

这里所说的双向绑定，一定不能跟数据响应原理混为一谈，因为数据响应式是通过数据的改变去驱动视图渲染，而双向绑定除了可以数据驱动DOM渲染，DOM的变化反过来也可以影响数据，是一个双向的关系

```html
<div id="app">
  <input type="text" v-model="message" id="model">
  <label for="model">{{ message }}</label>
</div>
```

```js
data:{
  message:'这里是表单的绑定',
},
```

v-model还可以结合radio、checkbox（复选框）、select使用

### 计算属性

#### 何为计算属性

计算属性就是当其依赖属性的值发生变化时，这个属性的值会自动更新，与之相关的DOM部分也会同步自动更新。

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

所以，对于任何复杂逻辑，都应当使用**计算属性**

#### 完整的计算属性

完整的计算属性应该是包含set和get方法的。

不过我们一般不采用计算属性的set方法，只有get方法，称之为**只读属性**

```js
computed: {
   fullName:{
     get:function (){
     return this.firstName + ' ' + this.lastName;
     }
   }
   //这个函数其实就是上面的简写形式，fullName在这里被当作属性，所以在调用的时候不用加括号
   // fullName(){
   //     return this.firstName + ' ' + this.lastName;
   //   }
}
```

#### 计算属性的缓存

与methods相比，计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage计算属性会立即返回之前的计算结果，而不必再次执行函数。而方法却会执行

## 二、Vue的组件化开发（重点）

### 什么是组件化

组件化其实是开发的一种思想，当我们处理复杂逻辑时或大量逻辑全部放在一起时，会显得非常复杂，不利于后期维护与扩展。而**组件化的思想就像将一个复杂的系统拆分成一个个小的组件，每个组件独立完成一部分功能**，再将它们集成在一起，这样不仅有利于开发，在后期维护和扩展的时候也变得非常容易。

### Vue的组件化思想

- 它是抽象的，让我们可以开发出一个个**独立可复用的小组件**来组成我们的应用。
- 任何应用都会被**抽象成一个组件树**（类似于DOM树）。

**启示**：在以后的开发中要充分利用组件化的思想，尽可能将页面拆分成一个个小的、可复用的组件

### 注册组件的基本步骤

- 创建组件构造器 : 调用**Vue.extend（）**方法创建**组件构造器**

```js
// 创建组件构造器对象
const cnpConstructor = Vue.extend({
  template:''
})
//简单来说组件构造器就是创建一个模板，在后面使用到这个组件的时候就显示模板的内容
```

- 注册组件 ：调用**Vue.component（）**方法**注册组件**

```js
//注册组件,需要两个参数，第一个表示以后调用时的标签名。第二个是传递组件构造器的对象的名字
Vue.component('my-cpn',cnpConstructor);
```

调用Vue.component（）是将刚才的组件构造器注册为一个组件，并且给它起一个**组件的标签名**。在需要调用组件的时候使用的就是标签名。

- 使用组件 ：在**Vue实例的作用范围**使用组件

```html
<div id="app">
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
</div>
<my-cpn></my-cpn>
```

这里看似使用了三次组件，但第三次并没有被渲染出来，因为它没有在Vue的实例的作用范围内使用。

**注意**：在调用组件的标签里面添加的内容是不会被渲染到DOM上面的

### 全局组件和局部组件

全局组件:意味着可以在**多个Vue实例中使用**。

局部组件：只能在**注册局部组件的Vue实例**内使用。

两者在创建上略有不同。不同之处在于第二步，第二步注册时，在**Vue实例外**注册的是全局组件；在**Vue实例内作为属性来注册**的时候是局部组件,

```js
//全局组件：
//注册组件，当组件注册在Vue实例外面的时候就是全局组件
// Vue.component('my-cpn',cnpConstructor);
```

```js
//局部组件
const app = new Vue({
  el: '#app',
  //组件也可以作为Vue实例的属性来被注册，这样注册的组件就只能被该实例调用，这就是局部组件
  //相当于全局和局部的区别就是第二步注册的区别，第一步创建构造器还是不变
  components:{
    //使用组件时候的标签名-cpn,组件构造器的名字-cpnConstructor
    cpn:cnpConstructor
  }
})
```

### 父组件和子组件

在一个组件构造器里面注册另一个组件时，**被注册的称为子组件**。**Vue实例是root（根）组件**，是所有组件的父组件

父组件和子组件是一种**层级关系**

#### 父子组件的模板

```js
const cpnC1 = Vue.extend({
  template:`
    <div>
      <h2>我是第一个模板</h2>
    </div>
  `,
})
//此处用到了第三种注册组件的方法，在创建的组件构造器里面注册.
//在构造器cpnC2里面注册cpnC1，所以cpnC2是父组件，被注册的是子组件
//这里不能在cpnC1里面注册cpnC2，因为代码是从上到下解析的，在1出现前2还没被创建，所以如果1来当父组件的话会出错
//在使用组件2时，会将1的内容也渲染到DOM上。
const cpnC2 = Vue.extend({
  template:`
    <div>
      <h2>我是第二个模板</h2>
      <cpn1></cpn1>
    </div>
  `,
  components:{
    cpn1:cpnC1
  }
})
```

#### 父子组件容易混淆的地方

- 以子组件的标签名在Vue实例中使用
  - 在子组件注册到父组件内时，Vue会编译好父组件的模块
  - 该模块的内容已经决定了父组件将要渲染的HTML（相当于是父组件已经包含了子组件的内容了）
  - 所以子组件是只能在父组件内才会被识别的，直接用子标签的话是会被浏览器忽略的

#### 注册组件的语法糖

语法糖主要是**省去了调用Vue.extend()**的步骤，**直接用一个对象来代替**

```js
// 语法糖的格式注册全局组件
Vue.component('cpn1',{
  template:`
   <div>
    <h2>这是用语法糖注册的全局组件</h2>
   </div>
  `
})
```

```js
//语法糖格式注册局部组件
const app = new Vue({
  el: '#app',
  data:{
  },
  components:{
    'cpn2':{
      template:`
       <div>
        <h2>这是用语法糖注册的局部组件</h2>
       </div>
      `
    }
  }
})
```

### 组件中的data

首先要知道，**组件内部是不能访问Vue实例里面的数据的**。

- 组件是一个单独功能模块的封装
  - 这个模块是属于自己的HTML模板，也应该有属性自己的数据data
  - Vue实例的data是**对象类型**，而组件是函数类型，而且**这个函数返回一个对象，对象内部保存着数据**
  - 不难看出组件很像一个Vue实例，其实组件就是指向Vue的

#### 为什么组件中的data只能是函数？

是为了避免多次使用组件时data中的数据互相干扰。使其组件拥有独立的对象数据，若不是函数则会共用一个对象，不具有独立性

### 父子组件的通信

我们知道组件之间是不能直接访问数据的(参见组件中的data)，那如何进行父子组件的通信呢？

- 通过**props**向子组件传递数据
- 通过**事件events** 向父组件发送信息

#### 父传子：props的基本用法

在组件中，使用props来声明需要从父组件接收到的数据

props的值有两种方式

- **字符串数组**：数组中的字符串就是传递时的名称
- **对象**：对象可以设置传递时的类型，也可以设置默认值等

```html
<div id="app">
<!--子组件必须在父组件的实例范围使用才能接收到父组件传过来的值，且要在这个标签内进行绑定.前面（cinfo）是子组件接收变量的名字，后面（info）是父组件要传递的变量的名字 -->
  <cpn :cinfo="info"></cpn>
</div>
<template id="cpn">
<!--  接收到父组件的时候，就可以在子组件内进行使用，不过这个时候需要使用插值表达式的形式，就类似于将这个组件看成一个vue实例-->
    <h2>{{ cinfo }}</h2>
  <ul>
    <li v-for="items in cinfo">{{ items }}</li>
  </ul>
</template>
```

```js
const cpn = {
  template:'#cpn',
  // 这里props使用的是数组形式，也可以使用对象
  // props:['cmovies'],
  // 下面是对象形式，相较来说，对象形式在开发中更为常用.
  props:{
    //使用对象形式，还可以给变量指定类型(自己设置的类型也是可以的)，必须按数据类型来传递数据（限制类型）
    // cmovies:Array,
    //还可以把这个变量当成对象，可以设置很多东西（设置默认值，设置必传值）
    cmovies:{
      //限制类型
      type:Array,
      //设置默认值，也就是当没传值过来时显示的值
      default:[1,2,3],
      //这是一个布尔值，为true时代表传值是必须有这个变量，也就是cmovies，不然就要报错
      require:true,
    }
  },
}
```

#### 子传父：emit的使用

子组件中需要以某种方式的方法来**触发一个自定义事件**（例如点击事件）

子组件使用 **this.$emit** 方法，第一个参数为父组件定义的方法名称 **event**，第二个参数为传递的值

在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听（**event="Event"**），**Event(data)** 可以接收传过来的参数

子组件设置**click**点击事件，**$emit**设置通道后传参，父组件在**methods**接收

- 子组件：this.$emit('自定义事件名称', 数据) 。子组件标签上绑定@自定义事件名称 = '回调函数'
- 父组件：methods: { 回调函数() { //逻辑处理 } }

```html
<div id="app">
<!-- 父组件在这里监听刚刚在子组件发射过来的事件，名称就是自己取的那一个。后面在跟上需要响应的操作（方法），这个方法在父组件内定义（Vue实例中）-->
  <cpn @item-click="cpnClick"></cpn>
</div>
```

```js
const cpn = {
  template:'#cpn',
  data (){
    return{
    }
  },
  methods:{
    btnClick(items){
      //如果我们希望触发点击事件的时候给父组件传递信息的话，可以这样做
      //自定义事件：前者是我们取的名称，后者是我们传递过去的参数.(后者可以省略)
      this.$emit('item-click',items)
      //有个问题：这里命名不能是驼峰标识，具体原因不详
    }
  }
}
```

```js
//父组件methods接收并进行逻辑处理
const app = new Vue({
  el: '#app',
  methods:{
    cpnClick(items){
      console.log('111',items);
    }
  },
  components:{
    cpn
  }
})
```

## 三、前端模块化

### ES模块化

ES6新增了两个关键字，**export（导出）**和**import**（导入）

## 四、Webpack详解

### 什么是Webpack

官方解释：从本质上来讲，webpack是一个现代的JavaScript应用的**静态模块**打包工具

那何为**模块**和**打包**？

就目前浏览器支持度来看，**前端模块化方案**我们只能采用ES6。还有一些其他方案：AMD、CMD、CommonJS等等。

但是在webpack里面上面不能支持的方案就能支持了。

webpack会将其他方案打包成浏览器能够支持的方案，所以在使用webpack开发的时候我们就可以采用其他方案开发，webpack相当于一个**转化工具**。

webpack会帮助我们**处理**模块之间的**依赖关系**。

webpack不仅仅是JavaScript文件，我们的css、图片、json文件等等在webpack中都可以被当作模块来使用。这就是webpack的模块化概念

**打包**就是将webpack中的各种资源模块进行打包合并成一个或多个包（Bundle）。

在打包过程中，还可以**对资源进行处理**，比如压缩图片，将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作

### Webpack安装

为了webpack能够正常运行，必须**依赖于node环境**。node环境为了可以正常执行很多代码，必须包含很多包，这些包手动管理是很麻烦的，所以需要**npm**（node packages manager）软件包管理工具，这是node自带的。

全局安装webpack（这里安装的是3.6.0版本，根据教程来的，于现在而言版本可能有点老了）

```bash
npm install webpack@3.6.0 -g
```

### Webpack的使用

1.首先用任意**前端模块化规范**书写代码

2.在命令终端进入编写代码文件所在位置，对代码进行各种操作

```bash
# 执行打包的指令
webpack .\src\main.js .\dist\bundle.js
```

（**cd+文件名** 代表进入该文件夹；**cd+..** 代表回到上层文件夹  **webpack+文件名1+文件名2** 代表对文件1进行打包，保存在文件2）

3.在最小的子文件处，一般有**src**和**dist**两个文件夹，src存放最初编写的代码也就是**源文件**，dist存放通过webpack**打包后的代码**

4.最后在给用户展示的HTML页面上**引用打包好的文件**即可

注意：每次修改代码时，需在最初那个文件里修改后，重新打包一次。

### Webpack的配置

通过**配置webpack**，达到**快捷打包**的目的。首先要创建一个`webpack.config.js`文件（以目前的水平来说，这个文件是固定的，只要想要配置webpack就必须是这个名字）

通过初始化npm（**npm init**），得到**package.json**文件，在此文件里面有一个script，这代表**脚本**，可以在里面定义自己的执行脚本`"build": "webpack"`。这代表在使用`npm build run`这串代码的时候就相当于在终端输入"webpack"，并且它会优先寻找本地webpack（局部）。

### Webpack中使用css文件

对于webpack本身来说，它只能对js代码进行处理，但我们在开发的时候还有css、图片等等，所以我们需要对webpack进行扩展使用对应的**loader**就可以了。

#### loader的使用过程

步骤一：通过**npm**安装所需要的**loader**

在**webpack官网**查找相关信息，这里css的loader的安装代码如下

```bash
npm install --save-dev css-loader	# 开发时依赖
npm install style-loader --save-dev
```

注意点：由于学习的教程版本和如今官网上的版本不一样，所以和跟着教程下载的webpack版本不一致，会导致错误，**要注意这个loader的版本要被webpack所支持**。教程里面css-loader是（**2.0.2**），style-loader是（**0.23.1**），webpack是（**3.6.0**）。自己操作时就在官网下载最新的即可

步骤二：在**webpack.config.js**中的**module**关键字下进行配置

同样是在webpack官网查找，如下

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

#### loader的作用

把css文件也**当成一个模块**，和js一起打包，就避免了有很多css代码要一个一个引用的麻烦。

## 五、Vue CLI 脚手架

在开发**大型项目**时，必然需要用到Vue CLI。

注意：教程教的是**CLI2、CLI3**，不过如今已经更新到了**CLI4**了。

### 何为CLI

- CLI是Command-Line Interface，翻译为命令行界面，俗称**脚手架**。
- Vue CLI是官方发布的vue.js项目脚手架
- 使用vue-cli可以**快速搭建**Vue开发环境以及对应的webpack配置

### 使用脚手架的前提

- **安装Node.js**
  - 直接在官网下载安装
  - 网址：http://nodejs.cn/download/
- **检测安装的版本**
  - Node环境要求8.9以上或者更高版本

### Vue CLI的使用

- **安装脚手架**

```bash
npm install -g @vue/cli	# 这里安装的是CLI3
```

- **注意**：上面安装的是Vue CLI3的版本，而需要使用CLI2要**拉取CLI2的模板**

```bash
npm install -g @vue/cli-init
```

- **Vue CLI2初始化项目**

```bash
vue init webpack my-project(项目的名称)
```

- **Vue CLI3初始化项目**

```bash
vue create my-project
```

### Vue CLI2的使用

在初始化项目后，会**生成一个模板**，然后进行下面一系列操作

```
模板需要命名一个名字 Project name  //不能包含大写
给项目添加描述 Project description  //不能包含大写
作者的名字 Author
构建项目的方式 Vue build Runtime或者Runtime-only
是否下载路由 Install vue-router(Y/N)
是否使用ES限制(规范ES语法)  Use ESLint to lint your code? (Y/N)
是否设置单元测试  Set up unit tests (Y/N)
是否设置端到端测试 Setup e2e tests with Nightwatch? (Y/N)
最后就是选择使用npm还是yarn
//npm run dev //运行程序
```

在初始化完成后，会生成一个文件夹，里面包含一大堆东西。

### CLI2的目录结构解析

通常是从`package.json`开始读，package.json里面我们主要关注`script`脚本里面的内容。在上面的那一系列操作后，生成以下代码：

```json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",	//这行代码就相当于在终端直接输入"npm run dev"
  "build": "node build/build.js"	//打包我们的项目
},
```

生成的那个自己命名的大文件夹下面还有许多小文件夹，`build`和`config`文件夹负责webpack相关的配置，`node_modules`存放node相关的包，`src`就是我们自己写代码的地方，`static`文件夹负责存放一些静态的资源。

除了文件夹，还有一些和文件夹同级的独立文件。`.babelrc`负责转化ES代码。`.editorconfig`对代码的风格进行统一。`.gitignore`在上传时对某些文件忽略， 也就是这些文件不上传。`.postcssrc.js`针对css转化的一些东西。`index.html`首页模板。`README.md`主要针对开源的项目

### Runtime-compiler和Runtime-only比较

**runtime-compiler**的运行步骤

```
template -> ast（抽象语法树 abstract syntax tree） -> render（渲染） -> virtual dom（虚拟DOM） -> UI
```

**runtime-only**的运行步骤

```
render -> v-dom -> UI
```

由于only的运行步骤更小，所以它性能更高，vue代码量更少，更轻巧。

两者的差别就在于，**runtime-only**用一个**render函数**，将template直接编译成render，跳过了前面两个步骤。

### 认识Vue CLI3

- vue-cli3和2的区别
  - vue-cli3是基于**webpack4**开发的，vue-cli2还是webpack3
  - vue-cli3的设计原则是"**0配置**"，移除了配置文件根目录下的build和config等目录
  - vue-cli3提供了vue ui命令，提供了**可视化配置**，更加人性化
  - 移除了static文件夹，新增了**public文件夹**，并且**index.html**移动到了public中

### Vue CLI3的使用

```bash
vue create my-project	# 初始化cli3项目
```

在初始化项目后，同样会**生成一个模板**，然后进行下面一系列操作

```
Please pick a preset:	//从下面两个里面选择一个配置方案
Default (Vue 3) ([Vue 3] babel, eslint)	//默认的配置
Manually select features	//手动选择一些特性
//当选择默认的配置的时候，会直接生成一系列配置
//如果选择手动的话，就需要自己对一些特性进行选择。例如是否使用Typescript、是否使用Router等等
//注意：在手动选择的时候，是用空格来进行选择而不是回车，回车代表所有特性选择完毕进入下一步。
Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
In dedicated config files	//专用的配置文件中
In package.json	//放在package.json里面
//意思是把配置好的文件放在哪里
//一般来说，为了便于后期修改，会将其放在一个专门的配置文件里面
Save this as a preset for future projects? (y/N)	//是否将这次的配置单独保存，意思就是如果选择保存在下次使用cli3初始化的时候，第一步的选择就会多出一个，就是这次保存的配置方案
如果选择保存后面就会要求你取一个名字
最后和cli2一样，会询问你选择使用npm还是yarn
//npm run serve //运行程序
```

### 向GitHub上传文件的几个指令

```bash
git clone <你的仓库地址>
git init  # 初始化
git add .    # 注意：add和.之间有一个空格
git commit -m '这里面可以填写一些备注'
git push <地址>
git --help  # 相当于一个git指令的说明书
```

不用拷贝的方式

```bash
git remote add origin <仓库地址>  # 仅需在第一次和仓库建立连接的时候
git branch -M main
git push -u origin main
```

## 六、vue-router 路由

### 什么是路由

路由是一个网络工程里面的术语，路由就是**通过互联的网络把信息从源地址传输到目的地址**的活动

路由和路由器有着千丝万缕的关系

路由器提供了两种机制：**路由**和**转送**

- **路由**决定数据包从**来源到目的地的路径**
- **转送**将**输入端的数据转移到合适的输出端**

路由中有一个非常重要的概念叫**路由表**

- 路由表本质上就是一个**映射表**，决定了**数据包的指向**

### 发展史

后端路由--->前后端分离--->单页面富应用阶段（SPA）

这里后端路由不做过多叙述，只需知道这种方式弊端很多。

**前后端分离**

- 前后端分离是随着**Ajax**的出现而出现的
- 后端只**提供API来返回数据**，前端**通过Ajax获取数据**，并且可以通过**Javascript将数据渲染到页面**中
- 这样做的优点是**前后端责任清晰**，后端专注数据，前端专注交互和可视化
- 并且当移动端（IOS/Android）出现后，后端不需要进行任何处理，依然可以使用同一套API。

**单页面富应用阶段（SPA）**

- SPA最主要的特点就是在前后端分离的基础上**加了一层前端路由**
- 也就是**前端来维护一套路由规则**

### URL的hash

- URL的hash也就是锚点(#)，本质上是改变**window.location**的href属性
- 我们可以通过直接赋值location.hash来改变href，但**页面不用刷新**

### 安装和使用vue-router

**安装vue-router**

```bash
npm install vue-router --save
```

然后：在模块化工程中使用它（因为是一个插件，所以可以通过Vue.use()来安装路由功能）

- 第一步：**导入**路由对象，并且**调用Vue.use(VueRouter)**
- 第二步：创建**路由实例**，并且**传入路由映射配置**
- 第三步：在**Vue实例**中**挂载**创建的**路由实例**

**使用vue-router**

第一步：**创建路由组件**

第二步：配置路由映射：**组件和路径映射关系**

```js
//此代码写在/router/index.js中
//引用组件，才能在后续配置映射关系的时候使用
import Home from '../components/Home'
import About from "../components/About";
//创建vue-router对象并导出
export default new Router({
//配置路由和组件之间的映射关系
//一个映像就是一个对象，由path+component组成，所有映像组成映射关系
routes: [
  {
    path: '/About',
    component: About
  },
  {
    path:'/Home',
    component: Home
  }
]
})
```

第三步：使用路由：通过**<router-link>、<router-view>**

```html
<!--此代码写在文件App.vue中-->
<!--这两个标签是vue-router内置的-->
<template>
  <div id="app">
    <router-link to="/Home">首页</router-link>
    <router-link to="/About">关于</router-link>
    <router-view></router-view>
  </div>
</template>
<!-- <router-link>标签会被渲染成一个a标签的样式，当点击时，网站的href就会发生改变，但网站本身不刷新 -->
<!-- <router-view>标签会根据当前的路径，动态渲染出不同的组件。它同时也是一个占位的标签，决定切换组件后的内容显示在什么地方 -->
<!-- 当路由切换时，切换的是<router-view>挂载的组件，其他的内容不会发生变化，这也是网站不会刷新的原因 -->
```

### 配置路径的默认值

通常情况下，我们需要把首页率先展示给用户，所以我们希望<router-view>在默认情况下，渲染的是首页的内容。所以我们需要在配置里面**多设置一个映射**

```js
{
  //配置路由的默认值
  path:'/',
  //redirect 重定向
  redirect:'/Home'
},
```

### 关于router-link的其他属性补充

- **tag**：tag可以**指定渲染**成什么组件，默认是渲染成a标签

```html
<!-- 这行代码就表示<router-link>会被渲染成按钮 -->
<router-link to="/Home" tag="button">首页</router-link>
```

- **replace**：replace**不会留下history记录**，所以指定replace的情况下，后退键**不能返回**到上一个页面

```html
<!-- replace属性没有赋值 -->
<router-link to="/About" replace>关于</router-link>
```

### 动态路由

在某些情况下，一个页面的**path路径**可能是**不确定**的，比如我们进入用户界面时，希望路径后面跟上用户的ID。这就被称之为**动态路由**

### 路由懒加载

**为什么需要懒加载？**

通常情况下，我们会在路由中定义很多不同的页面，这些**页面都被打包在同一个js文件**中(**app.js**)。这么多页面在同一个文件中，会导致这个**文件非常大**，一次性从服务器请求这么大的文件是比较**耗时**的。这时我们就需要路由懒加载来避免这种情况。

**路由懒加载做了什么？**

- 路由懒加载的主要作用就是**将路由对应的组件打包成一个个js代码块**
- 只有在这个路由**被访问时**，才**加载对应组件**。

**懒加载的使用**

```js
//不使用路由懒加载的情况（引用后再使用）。这个时候打包后的文件就会放在同一个js文件中
import Home from '../components/Home'
Vue.use(Router)
routes: [
    {
      path:'/Home',
      component: Home
    },

//懒加载的使用,每多一个懒加载的使用，在打包时就会多一个js文件对应一个路由（动态的加载）
//下面的两种方式都是可以的
方式一：
routes: [
  {
    path:'/home',
    component:() => import('../components/Home')
  }
]
方式二：
const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')
routes:[
  {
    path:'/home',
    component:home
  }
]
```

### 嵌套路由

- 路由的嵌套是一个很常见的功能
  - 比如在home页面，我们希望通过/home/news或者是/home/message访问一些内容
  - 也就是说，可以在这两个路径访问到两个首页的子组件

#### 实现路由嵌套的步骤

- **创建**对应的**子组件**，并且在路由映射中**配置对应的子路由**
- 在组件内部使用<router-view>、<router-link>标签。在父组件的内部使用

### 参数的传递

#### 传递参数的方式

传递参数主要有两种类型:params和query

- **params**类型(传递**单一数据**)

  - 配置路由格式：/router/:id
  - 传递的方式:在path后面跟上对应的值

  ```html
  <router-link v-bind:to="'/User/'+userId">用户</router-link>
  ```

  - 传递后形成的URL：/router/...

- **query**类型(传递**大量数据**)

  - 配置路由格式：/router，也就是普通配置
  - 传递的方式: **对象**中使用query的key作为传递方式

  ```html
  <router-link :to="{path:'/Profile',query:{name:'Lx',age:20}}">我的</router-link>
  ```

  - 传递后形成的URL：/router?id=...

### keep-alive

keep-alive是**Vue内置**的一个组件，可以使被包含的组件**保留状态**，或**避免重新渲染**

它有两个非常重要的属性

- include，只缓存被匹配组件
- exclude，不缓存匹配的组件

特殊情况，当**router-view**被包含在**keep-alive**里面时，所路径匹配的视图都会被缓存

```html
<keep-alive>
  <router-view/>
</keep-alive>
```

## 七、Vuex详解

Vuex是一个专门为Vue.js应用程序开发的**状态管理模式**，可以方便的实现组件之间的**数据共享**

- 它采用**集中式存储**管理应用的**所有组件**的状态，并以相应的规则保证状态以一种可预测的方式发生变化
- Vuex也集成到Vue的官方调试工具**devtools extension**
- 它还给我们提供了一个最大的便利---**响应式**，能够实现保持数据和页面的同步

### 何为状态管理

- 简单来看，就是把多个组件**共享的变量**全部**存储在一个对象**里面
- 然后将这个对象放在顶层的Vue实例中，让其他组件可以使用

### 应用场景

- 一般情况下，只有**组件之间共享或者说是共同需要的数据**，才有必要存储到vuex中，对于组件的私有数据，依旧存储在自身的data即可。
  - 有什么状态需要我们在多个组件间共享呢
    - 常见的是**多个页面间的共享问题**
    - 比如用户的登录状态、用户名称、头像、地理位置信息等等
    - 比如商品的收藏、购物车中的物品
    - 这些都是可以放在同一个地方，对他们进行统一的保存和管理，而且它们是响应式的

### 主要属性

#### State

State提供**唯一的公共数据源**，**所有共享的数据**都要统一放到Store的State中存储

```js
//创建store数据源，提供唯一的公共数据
const store = new Vuex.Store({
  state: {count: 0}
})
```

```js
//组件中访问State中数据的第一种方式
this.$store.state.数据名称(count)

//组件中访问State中数据的第二种方式
//1.在需要访问的组件中从vuex中按需导入mapState函数
import { mapState } from 'vuex'

//2.将全局数据，映射为当前组件的计算属性
//映射完成后，count就可以被当成计算属性来使用
computed: {
  //...是展开运算符
  ...mapState(['count'])
}
```

**注意：组件在访问state里面的共享数据时，不能对共享数据进行修改。**

当涉及到数据的修改时，就需要用到vuex中的**Mutation**属性

#### Mutations

Mutation用于**修改Store中的数据**。

- 虽然通过这种方式修改数据略显繁琐，但是可以**监控到所有数据的变化**（可以直接找到修改数据的组件，方便后期维护）。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      //修改数据，变更状态
      state.count++
    }
  }
})
```

```js
//触发mutations
methods: {
  handle1() {
    //触发mutations的第一种方式
    this.$store.commit('add')
  }
}
```

**注意：mutation里面不能写异步的代码，比如定时器。**

当涉及到异步的时候，就需要vuex的另一个属性**action**

#### Actions

Action专门用于**处理异步操作**

当通过异步操作变更数据的时候，必须使用action，但是在action中变更数据还是需要用到mutation的函数。换句话说，**mutation不能直接用于异步时的变更数据操作，action也不能直接修改数据**

```js
//定义actions
const store = new Vuex.Store({
  //省略了state和mutation的定义,与前面的例子一致
  actions: {
    addAsync(context) {
      setTimeout(() => {
        //这里的commit就是在调用mutations的add函数
        context.commit('add')
      },1000)
    }
  }
})
```

```js
//触发actions
methods: {
  handle() {
    //触发actions的第一种方式
    this.$store.dispatch('addAsync')
  }
}
```

#### Getters

Getter用于对Store中的**数据进行加工处理形成新的数据**。

它不会修改state中的数据，只会起到一个包装的作用

## 八、网络模块-axios

### 为什么选择axios

在前端开发中，可供选择**网络模块**有许多，包括传统的Ajax、jQuery-Ajax、vue-resource等等，那我们为什么要选择axios呢？它有以下特点

- 在**浏览器中**发送**XMLHttpRequests**请求
- 在**node.js**中发送**http**请求
- **支持Promise API**
- **拦截请求和响应**
- **转换请求**和**数据**

### axios的基本使用

1.安装axios

```bash
npm install --save axios
```

2.引用axios

```js
import axios from 'axios'
```

3.(1)axios的一种**请求方式**axios(config) :

**config**是一个**对象**

```js
//axios(config)最简单的使用，省略的get和post请求
axios({
  url: ''
}).then(res => {
  console.log(res);
})

axios({
  url: '',
  //专门针对get请求的参数拼接
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})
```

(2).发送并发请求

```js
axios.all([axios({
  url: ''
}),axios({
  url: '',
  params: {
    type: 'pop',
    page: 1
  }
})])
   .then(results => {
     console.log(results);
   })
```

### axios的全局配置

我们在实际开发项目中，有许多代码是重复的，在axios里面的话，如**网址的根路径**、**超时时间**(timeout)。这个时候我们可以进行一些抽取，也可以利用axios 的全局配置

```js
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000
```

### 创建axios实例

在实际开发中，某些功能的数据和全局配置的会有差异，所以我们在使用时会有时不太方便。这个时候我们可以创建axios实例来管理每一个具有相同模块的功能

```js
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
})

instance1({
  url: 'home/multidata'
}).then(res => {
  console.log(res);
})

//当我们需要再增加其他实例时，再创建一个instance2等等即可
```

## 九、关于开发一个新项目

1.划分目录结构

因为使用vue cli构建的模板，所以有一些我们不需要的文件或代码，我们要删除。我们主要划分的是src里面的结构，它已经默认有了两个文件夹分别是assets(资源)和components(组件)。我们在assets里面创建css和img两个文件夹，负责存放css文件和图片。在components里面创建common和content两个文件夹，负责存放一些公共组件，再在assets同层级创建一个views文件夹负责存放大的视图，创建一个router文件夹存放路由相关的东西，创建一个network文件夹存放网络相关的东西

2.引用了两个css文件

分别是normalize.css和base.css前者是在GitHub上直接下载来用的，后者是根据自己的需要自行编写的。

3.起别名

创建一个vue.config.js文件，给文件夹的路径起别名，在引用的时候更加方便，示例如下

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}
```

注意：在使用别名的时候，前面要加上"~"这个符号

4.对代码进行规范

创建.editorconfig文件，对代码的缩进，空行、换行的进行具体的规范，一般的项目最好都有一个这个文件。在vuecli2的时候自带有一个，vuecli3需要自行创建

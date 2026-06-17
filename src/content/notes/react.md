---
title: React 入门
category: 前端
tags: [React, Hooks]
pubDate: 2026-06-17
description: React核心概念与实践，涵盖JSX、Hooks、组件通信、Redux和React Router
source: React.md
---

# React 入门

## 开发环境的搭建

### 使用 create-react-app 快速搭建开发环境

create-react-app 是一个**快速创建 React 开发环境**的工具，底层由 Webpack 构建，封装了配置细节，开箱即用。

执行命令：

```bash
npx create-react-app react-basic
# npx 是 Node.js 工具命令，查找并执行后续包命令
# create-react-app 核心包（固定写法），用于创建 React 项目
# react-basic React 项目的名称（可以自定义）
```

### 使用 Vite 构建

1. 在 cmd 中执行命令：

```bash
npm init vite
# 输入项目名称
# 选择环境为 React
```

2. 在编译器中下载依赖：

```bash
npm install
```

## JSX 基础

### 概念和基础

**概念**：JSX 是 JavaScript 和 XML 的缩写，表示在 **JS 代码中编写 HTML 模板结构**，它是 React 编写 UI 模板的方式。

**优势**：

1. HTML 的声明式模板写法
2. JS 的可编程能力

**本质**：JSX 并不是标准的 JS 语法，它是 **JS 语法的扩展**，浏览器本身不能识别，需要通过**解析工具做解析**之后才能在浏览器中运行。

### 识别 JS 表达式

方法：在 JSX 中可以通过**大括号语法 `{}`** 识别 JavaScript 中的表达式，如常见的变量、函数调用、方法调用等等。

```jsx
// 项目的根组件，一切组件的根基
// App 被引入到 index.js 然后 index.js 将内容渲染到 index.html

const count = 100;

function getName() {
  return 'Lesedi'
}

function App() {
  return (
    <div className="App">
      This is App
      {/* 使用引号传递字符串 */}
      {'this is message'}

      {/* 使用 {} 传递变量 */}
      {count}

      {/* 函数调用 */}
      {getName()}

      {/* 方法调用 */}
      <button onClick={() => { console.log('click') }}>Click</button>
    </div>
  );
}
export default App;
```

### 实现列表渲染

语法：在 JSX 中可以使用原生 JS 中的 **map 方法**遍历渲染整个列表。

```jsx
const list = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]
function App() {
  return (
    <div className="App">
      {/* 渲染列表 */}
      <ul>
        {/* 用 JS 原生的 map 标签进行遍历 */}
        {/* 每个 li 标签需要一个独一无二的 key，通常是 id */}
        {/* Key 的作用是 React 框架内部用来提升更新性能 */}
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
export default App;
```

### 实现条件渲染

#### 简单的条件渲染

语法：可以通过**逻辑与 `&&`、三元表达式 `?:`** 在 React 中实现基础的条件渲染。

```jsx
const isLogin = true;
const isLoading = false;

function App() {
  return (
    <div className="App">
      {/* 条件渲染 */}
      {/* 逻辑与 && 。为 true 就显示后面的内容，否则不显示 */}
      {isLogin && <h1>欢迎回来</h1>}
      {/* 三元运算符 ?: 为 true 则显示前面的，否则显示后面的 */}
      {isLoading ? <h1>加载中...</h1> : <h1>加载完成</h1>}
    </div>
  );
}

export default App;
```

#### 复杂的条件渲染

解决方案：**自定义函数 + if 判断语句**。

```jsx
// 定义图片类型
const articleType = 3;

// 定义核心函数（根据不同的条件返回不同的 JSX 模板，从而达到控制复杂条件渲染的目的）
function getArticleType() {
  if (articleType === 0) {
    return <div>文章类型0</div>
  } else if (articleType === 1) {
    return <div>文章类型1</div>
  } else {
    return <div>文章类型2</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 调用函数渲染不同的模板 */}
      {getArticleType()}
    </div>
  );
}
export default App;
```

### 事件绑定

语法：**on + 事件名称 = {事件处理程序}**，整体遵循驼峰命名法。

```jsx
function App() {
  // 基础绑定
  // const Click = () => {
  //   console.log("点击事件");
  // }

  // 传递参数 e
  // const Click = (e) => {
  //   console.log('点击事件', e);
  // }

  // 传递自定义参数
  const Click = (name, e) => {
    console.log('点击事件', name, e);
  }

  return (
    <div className="App">
      {/* 注意箭头函数的用法，当事件需要传递自定义参数的时候就需要箭头函数 */}
      <button onClick={(e) => Click('Lesedi', e)}>点击</button>
    </div>
  );
}

export default App;
```

### 组件的基础使用

概念：在 React 中，一个组件就是**首字母大写的函数**，内部存放了组件的逻辑和视图 UI，渲染组件只需要把组件**当成标签书写即可**。

```jsx
// 定义组件
function Button() {
  // 业务逻辑（组件逻辑）
  return <button>click now！</button>
}

function App() {
  return (
    <div className="App">
      {/* 渲染组件 */}
      {/* 自闭合标签 */}
      <Button />
      {/* 成对标签 */}
      <Button></Button>
    </div>
  );
}
export default App;
```

## React Hooks 基础使用

### useState

作用：useState 是一个 React Hook（函数），它允许我们向组件添加一个**状态变量**，从而控制影响组件的渲染结果。

本质：和普通 JS 变量不同的是，状态变量一旦发生变化，组件的视图 UI 也会跟着发生变化。这就是所谓的**数据驱动视图**。

#### 控制状态变量

```jsx
// 用 useState 实现一个计数器
// useState 是一个 hook，只能在函数组件中使用，用于给组件添加状态变量
import { useState } from "react";

function App() {
  // 调用 useState 给组件添加一个状态变量
  // count 在这里就表示状态变量
  // setCount 是一个函数，用于更新状态变量
  // count 的变化会影响视图的变化，数据驱动视图
  const [count, setCount] = useState(0);

  // 每次点击按钮，都会调用这个函数
  const handleClick = () => {
    // 作用1、用传入的新值修改 count
    // 2、重新使用新的 count 渲染页面
    setCount(count + 1);
  }
  return (
    <div className="App">
      {/* 绑定事件 */}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
export default App;
```

规则：状态被认为是只读的，我们应该始终去替换它而不是修改它，直接修改状态不能引发视图的更新，也就违背了 React 数据驱动视图的原则。

```jsx
import { useState } from "react";

function App() {
  let [count, setCount] = useState(0);

  const handleClick = () => {
    // 直接修改的后果是视图不会更新
    // 它的值会变化，但是视图不会重新渲染
    count++;
    console.log(count);
  }
  return (
    <div className="App">
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
export default App;
```

#### 表单受控绑定

概念：使用 React 组件的状态（useState）控制表单状态，类似于 Vue 的双向绑定。

![受控表单绑定](/notes-images/受控表单绑定.png)

```jsx
import { useState } from "react";

function App() {
  // 声明一个 react 状态
  const [value, setValue] = useState('');

  // 核心绑定流程
  // 1. 通过 value 属性绑定 react 状态
  // 2. 通过 onChange 事件监听 input 的变化，通过事件参数 e 拿到输入框最新的值，反向修改到 react 状态
  return (
    <div className="App">
      <input
         value={value}
         onChange={(e) => setValue(e.target.value)}
         type="text" />
    </div>
  );
}
export default App;
```

### useRef

作用：用来**获取 DOM 节点**。

步骤：
1. 使用 useRef 创建 ref 对象，并与 JSX 绑定
2. 在 DOM 可用时，通过 `inputRef.current` 拿到 DOM 对象

```jsx
// React 中获取 DOM
import { useRef } from "react";

// 1. useRef 生成 ref 对象，绑定 DOM 节点上，即可对该 DOM 进行操作
// 2. DOM 可用时，ref.current 指向该 DOM 节点
// 3. ref 对象在组件生命周期内保持不变
// 注意：渲染完毕之后，也就是 DOM 生成之后才可用

function App() {
  const getDOM = useRef();
  const showDOM = () => {
    console.dir(getDOM.current);
  }
  return (
    <div className="App">
      <h1 ref={getDOM}>hello react</h1>
      <button onClick={showDOM}>获取DOM</button>
    </div>
  );
}
export default App;
```

### useEffect

概念：用于在 React 组件中创建不是由事件引起（如：用户点击、输入等）而是由**渲染本身引起的操作**，如：页面完成渲染后即刻调用 useEffect、发送 AJAX 请求等。简单来说，**就是 useEffect 何时调用只取决于代码的编写，不会被用户在页面进行的操作所影响。**

示例：

```jsx
useEffect(() => {}, [])
// 参数1是一个函数，可以把它叫做副作用函数，在函数内部放置要执行的操作，这一项是必须要有的。
// 参数2是一个数组，在数组中放置依赖项，不同依赖项会影响第一个参数函数的执行。
// 参数2可以为空，当参数2是一个空数组时，副作用函数只会在组件渲染完毕之后执行一次；
// 也可以不传，不传时，函数会在初始和组件更新时执行。
```

```jsx
import { useEffect, useState } from "react";
// 黑马网课的接口
const URL = 'https://geek.itheima.net/v1_0/channels'

function App() {
  // 创建一个状态变量，用于接收接口返回的数据，并将其实时渲染到页面上
  const [list, setList] = useState([]);
  useEffect(() => {
    // 参数1是一个函数，可以把它叫做副作用函数，在函数内部放置要执行的操作
    // 参数2是一个数组，当数组中的变量发生变化时，会重新执行副作用函数
    // 当参数2是一个空数组时，副作用函数只会在组件渲染完毕之后执行一次
    async function getList() {
      const res = await fetch(URL);
      const data = await res.json();
      console.log(data);
      setList(data.data.channels);
    }
    getList()
  }, [])
  return (
    <div className="App">
      {/* 将接口返回的数据，用列表渲染显示到页面上 */}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
export default App;
```

```jsx
import { useEffect, useState } from "react";

function Son() {
  // 1. 渲染时开启一个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("定时器开启")
    }, 1000)

    return () => {
      // 清除副作用
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <h1>Hi I am son</h1>
    </div>
  )
}

function App() {
  // 通过一个简单的条件渲染，模拟组件卸载
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      {/* 条件渲染 */}
      {show && <Son />}
      <button onClick={() => setShow(false)}>
        点击卸载组件
      </button>
    </div>
  );
}
export default App;
```

### 自定义 Hook 函数

概念：自定义 Hook 是**以 use 开头的函数**，通过自定义 Hook 函数实现**逻辑的封装和复用**。

使用规则：

1. 只能在组件中或者其他自定义 Hook 函数中调用，不能在组件外使用
2. 只能在组件的顶层调用，不能嵌套在 if、for、其他函数中

```jsx
import { useState } from "react";
// 需求：通过布尔的切换，实现对组件的显示和隐藏
// 问题：实现逻辑与组件耦合度太高，不利于复用
// 解决思路：通过自定义 Hook 实现复用

// 以 use 开头的函数
function useToggle() {
  // 可复用的逻辑代码
  const [isShow, setIsShow] = useState(true);

  const toggle = () => {
    setIsShow(!isShow);
    console.log('切换成功');
  }

  // 哪些状态和回调函数需要在其他组件使用，就将哪些通过 return 暴露出去
  // 注意：这里用 [] 和 {} 来包裹都可以（也就是用数组和对象都可以），
  // 但是要注意的是在调用这个解构出来的函数时，这里用什么包裹，解构出来时就要用什么
  return [isShow, toggle];
}

function App() {
  // 调用自定义 Hook
  const [isShow, toggle] = useToggle();
  return (
    <div className="App">
      {isShow && <h1>自定义Hook</h1>}
      <button onClick={toggle}>点击切换</button>
    </div>
  );
}
export default App;
```

## 组件通信

### 父组件传递到子组件

概念：组件通信就是**组件之间的数据传递**，根据组件嵌套关系的不同，有不同的通信方法。

步骤：
1. 父组件传递数据 --- 在子组件标签上**绑定属性**
2. 子组件接收数据 --- 子组件通过 **props 参数**接收数据

```jsx
function Son(props) {
  // 这里 props 输出的就是绑定在 Son 标签上的属性的值
  console.log(props)
  return (
    <div>
      {/* {props.name} 就可以获取到父组件的内容 */}
      {props.name}
      <h1>这是Son组件</h1>
    </div>
  )
}
function App() {
  const msg = "这里是父组件";
  return (
    <div className="App">
      <Son
        // 这就是绑定属性
        name={msg}
      />
    </div>
  );
}
export default App;
```

### props 说明

1. props **可以传递任意类型的数据**，包括：数字、字符串、布尔值、数组、对象、函数、JSX
2. props 是**只读对象**：意思是子组件**只能通过 props 读取到父组件的数据，但是不能对其进行修改**。父组件的数据只能由父组件进行修改。

### 子组件传递到父组件

思路：在子组件中调用父组件中的函数并传递参数。

```jsx
import { useState } from "react";

// 子组件通过调用父组件的函数，向父组件传递参数
// 通过解构赋值，将父组件的函数传递给子组件
function Son({ onGetMsg }) {
  // Son 组件中的数据，将其传递给父组件
  const sonMsg = "这是子组件传递过去的信息"
  const Click = () => {
    // 执行父组件的函数，将子组件的数据传递给父组件
    onGetMsg(sonMsg)
    console.log("子组件向父组件通信成功")
  }
  return (
    <div>
      <button onClick={Click}>
        点击向父组件通信
      </button>
    </div>
  )
}
function App() {
  // 通过 useState 来定义一个状态，初始值为: 这是父组件的初始信息
  // 当子组件成功传递数据给父组件后，父组件的状态会更新，同时更新视图
  const [message, setMessage] = useState("这是父组件的初始信息");
  const GetMsg = (msg) => {
    setMessage(msg)
  }
  return (
    <div className="App">
      <h1>{message}</h1>
      <Son onGetMsg={GetMsg} />
    </div>
  );
}
export default App;
```

### 使用状态提升实现兄弟组件通信

解释：所谓状态提升就是通过**父组件进行兄弟组件之间的数据传递**。

步骤：
1. A 组件先把数据传递给共同的父组件
2. 再从父组件通过父传子传递给兄弟组件 B 组件

### 使用 Context 机制跨层级组件通信

步骤：
1. 使用 createContext 方法创建一个上下文对象 ctx
2. 在顶层组件中通过 **ctx.Provider 组件提供数据**
3. 在底层组件中，通过 **useContext 钩子函数**获取顶层组件的数据

注意：只要不是父子或者兄弟之间的组件通信，都属于跨层通信，都需要通过这个步骤来传递信息。

```jsx
// 实现跨层组件之间的通信。如爷孙组件之间的通信
import { createContext, useContext } from "react";

// 1. createContext 方法创建一个上下文对象
const MsgContext = createContext();
// 2. 在顶层组件中，使用 Provider 组件包裹住需要共享数据的组件
// 3. 在底层组件中，使用 useContext 方法来获取上下文对象中的数据

function A() {
  return (
    <div>
      this is A component
      <B />
    </div>
  )
}

function B() {
  // 这里就拿到顶层组件的信息
  const msg = useContext(MsgContext);
  return (
    <div>
      this is B component, {msg}
    </div>
  )
}
function App() {
  const msg = "hello world"
  return (
    <div className="App">
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  );
}

export default App;
```

## Redux

### 什么是 Redux

概念：Redux 是 React 最常用的**集中状态管理工具，可以独立于框架运行。** 意味着 Redux 可以独立运行。

作用：通过集中管理的方式管理应用的状态。

三大核心：**state**、**action**、**reducer**

- **state**：一个对象，存放着我们管理的数据状态
- **action**：一个对象，用于描述需要怎样修改数据
- **reducer**：一个函数，根据 action 的描述，生成一个新的 state

```html
<!-- 用纯粹的 Redux 实现计数器的功能 -->
<button id="decrement">-</button>
<span id="count">0</span>
<button id="increment">+</button>

<!-- 通过 CDN 引入 Redux -->
<script src="https://unpkg.com/redux@4.2.0/dist/redux.min.js"></script>

<script>
  // 1、定义 reducer 函数
  // 内部主要的工作是根据不同的 action 返回不同的 state
  // state：管理数据的初始状态
  // action：包含对象 type，标记当前想要对状态进行什么样的修改
  function counterReducer (state = { count: 0 }, action) {
    // 根据 action 对象中的 type 属性，判断当前想要对状态进行什么样的修改
    // 数据不可变:必须基于原始状态，创建新的状态对象返回
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 }
      case 'DECREMENT':
        return { count: state.count - 1 }
      default:
        return state
    }
  }
  // 2、使用 reducer 函数生成 store 实例
  const store = Redux.createStore(counterReducer)

  // 3、通过 store 实例的 subscribe 订阅数据变化
  // 这个回调函数会在 state 发生变化的时候自动执行
  store.subscribe(() => {
    console.log(store.getState())
    document.getElementById('count').innerText = store.getState().count
  })
  // 4、点击按钮 通过专门的 dispatch 函数 提交 action 对象 实现数据更新
  // dispatch 函数是 Redux 体系中，唯一可以修改 state 的函数
  // 增
  const inBtn = document.getElementById('increment')
  inBtn.addEventListener('click', () => {
    store.dispatch({
      type: 'INCREMENT'
    })
  })
  // 减
  const dBtn = document.getElementById('decrement')
  dBtn.addEventListener('click', () => {
    store.dispatch({
      type: 'DECREMENT'
    })
  })
</script>
```

### 在 React 中使用 Redux

配套工具：在 React 中使用 Redux，官方要求安装两个插件 --- **Redux Toolkit** 和 **react-redux**

- **Redux Toolkit（RTK）**：官方推荐的编写 Redux 逻辑的方式，是一套工具的集合，**简化了 Redux 的编写方式**。
- **react-redux**：用来**链接 Redux 和 React 组件**的中间件。

## React Router

### 一个最简单的路由实例

概念：一个路径 path 对应一个组件 component，当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染。

```jsx
// 一个最简单的路由实例
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 创建 router 实例对象并配置路由对应关系
const router = createBrowserRouter([
  {
    path: '/login',
    element: <h1>我是登录页</h1>
  },
  {
    path: '/article',
    element: <h1>我是文章页</h1>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 路由绑定 */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

注意：上面的实例只是为了理解路由的使用，通常在实际开发中 router 配置有所不同。

### 实际开发中的 router 配置

步骤：

1. 在 src 目录下创建 page 文件夹，有几个路由，就在 page 文件夹中创建几个子目录
2. 同样在 src 目录下新建一个 router 模块，在 router 中引入组件配置
3. 在应用入口文件（index.js）中渲染，注入 router 实例

> 注：原始笔记中目录结构截图未能迁移（来自 Typora 用户目录），建议在 page 文件夹下按路由名称建立子目录，每个子目录包含对应的组件文件。

### 路由导航

作用：路由系统中的多个路由之间需要进行**路由跳转**，并且在跳转的同时有可能需要**传递参数进行通信**。

#### 声明式导航

写法：声明式导航是指通过在模板中通过 **`<Link/>`** 组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行。

```jsx
// 跳转到文章页
<Link to="/article">跳转到文章页</Link>
```

说明：通过给组件的 **to 属性指定要跳转到的路由 path**，组件会被渲染为浏览器支持的超链接，如果需要传参直接**通过字符串拼接**的方式拼接参数即可。

#### 编程式导航

写法：通过 **`useNavigate`** 钩子得到导航方法，然后通过**调用方法以命令式的形式**进行路由跳转，比如想在登录请求完毕之后进行跳转就可以选这种方式，更加灵活。

```jsx
import { useNavigate } from "react-router-dom"

const Article = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Article</h1>
            <p>Article content goes here</p>
            {/* 参数为 -1 就是跳转到上一级页面 */}
            <button onClick={() => navigate(-1)}>Go Back</button>
            {/* 参数为组件名，则跳转到组件对应的页面 */}
            <button onClick={() => navigate('/Login')}>Login</button>
        </div>
    )
}
export default Article
```

### 路由导航传参

#### searchParams 传参

语法：组件名后加 `?`，问号后面跟需要传的参数，有多个参数的话用 `&` 连接。

```jsx
{/* 带参数跳转 */}
<button onClick={() => navigate('/Login?id=1&name=Lesedi')}>带参数跳转</button>
```

```jsx
// 接收参数
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
const Login = () => {
  // 获取传递过来的参数
  const [params] = useSearchParams()
  // params 里面有个固定的 get 方法，传递过来的参数就是 get 方法的属性
  const id = params.get('id')
  const name = params.get('name')
  return (
      <div>
          <h1>Login页</h1>
          <p>Login content goes here</p>
          <Link to={'/article'}>跳转到文章页</Link>
          <p>第一个参数是:{id}</p>
          <p>第二个参数是:{name}</p>
      </div>
  )
}
export default Login
```

#### params 传参

```jsx
{/* 注意!! 这种参数传递需要在 router 里面加占位符 */}
<button onClick={() => navigate('/Login/100/Lesedi')}>params传参</button>
```

```jsx
// 接收 params 传参过来的参数
const params = useParams()
let id = params.id
let name = params.name
```

```jsx
{
    // 路径
    // 占位符
    path: "/Login/:id/:name",
    // 组件名
    element: <Login />
},
```

### 嵌套路由

实现步骤：

1. 使用 **children 属性**配置路由嵌套关系
2. 使用 `<Outlet/>` 组件配置二级路由渲染位置

```jsx
// 嵌套路由
{
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/board",
            element: <Board />
        },
        {
            path: "/about",
            element: <About />
        }
    ]
},
```

```jsx
import { Link, Outlet } from 'react-router-dom'
// 配置一级路由
const Layout = () => {
  return (
    <div>
      <h1>这是一级路由layout页</h1>
      <Link to="/board">面板页</Link>
      <Link to="/about">关于页</Link>
      {/* 二级路由出口 */}
      <Outlet />
    </div>
  )
}

export default Layout
```

#### 默认二级路由

方法：当访问的是一级路由时，要使默认二级路由可以得到渲染，只需要**在二级路由的位置去掉 path，设置 index 属性为 true**。

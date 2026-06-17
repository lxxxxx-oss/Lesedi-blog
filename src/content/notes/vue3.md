---
title: Vue3笔记
tags: [Vue, Vue3, 前端]
pubDate: 2026-06-17
description: Vue3组合式API、响应式基础、组件通信与生命周期全面笔记
source: Vue3.md
---

# Vue3笔记

## 1、快速上手

```vue
<template>（骨架区）： 这里面写 HTML。你可以直接把它当成普通的 HTML 文件来写。

<script setup>（灵魂区）： 这里面写 JS 逻辑。注意那个 setup 标志！这就是 Vue 3 最核心的"组合式 API"标志。你在这里定义的任何变量和函数，<template> 里都可以直接拿来用，无需导出，极其爽快！

<style scoped>（皮肤区）： 这里写 CSS。加上 scoped 就像给这个房间上了锁，这里写的样式只对当前这个组件生效，绝不会污染别的页面。
```

## 2、模板语法

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

### 文本插值

最基本的数据绑定形式是文本插值，它使用的是"Mustache"语法 (即双大括号)：

```vue
<span>Message: {{ msg }}</span>
```

只要是在两个 HTML 标签**中间**的文本区域，你想塞入 JS 变量，就直接用 `{{ }}` 把变量名包起来。这就相当于开了一个传送门，把你 `<script>` 里的数据直接传送到页面上。

注意：`{{ }}` 只能用在标签**外面**（也就是纯文本区域）。一旦你进入了 HTML 标签的**内部**（比如 `src=""`、`id=""`、`class=""` 这些属性里），HTML 的解析器会直接把它当成普通的乱码字符。

### 属性绑定

双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个属性，应该使用**v-bind**指令

```vue
// 完整写法
<div v-bind:id="dynamicId"></div>
// 简写
<div :id="dynamicId"></div>
```

## 3、响应式基础

### 声明响应式状态

```js
ref()

import { ref } from 'vue'
//括号里的这个 0，是这个响应式变量的初始值。
const count = ref(0)

//ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref 对象中返回：

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

## 4、计算属性

模板中的表达式虽然方便，但是遇到复杂问题，在模板中进行太多逻辑运算，会让模板变得臃肿、难以维护，这就需要使用到**计算属性**来描述依赖响应式状态的复杂逻辑。

```vue
<script setup>
// computed 接收一个带 return 的回调函数。它会在内部把你 return 的结果，重新包装成一个只能看、不能改的只读 ref
import { ref, computed } from 'vue'

// 1. 原始数据
const birthYear = ref(1998)

// 2. 派生数据（计算属性）：它是基于 birthYear 算出来的值！
const currentAge = computed(() => {
  const currentYear = new Date().getFullYear() // 拿到今年（比如 2026）
  // 这里的birthYear就是响应式依赖
  return currentYear - birthYear.value // 必须写 return，吐出加工后的结果！
})
</script>

<template>
  <p>出生年份：{{ birthYear }}</p>
  <p>今年年龄：{{ currentAge }} 岁</p>
</template>
```

### 计算属性和方法

其实计算属性能做到的方法也能做到，那为什么我们需要计算属性呢？核心在于，**计算属性的值会被缓存，只有在其响应式依赖更新时才会计算**，而方法是只要页面上有任何风吹草动（哪怕是跟其毫不相干的其他数据变了）导致页面重新渲染，这个函数就会被**无脑地重新执行一遍**。如果这个计算极其复杂（比如遍历了一万条数据），你的页面直接卡死。

注意：这里的响应式依赖通俗来讲就是指**计算属性在它的函数里，带有 `ref/reactive`的数据。**

### 可写的计算属性

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到"可写"的属性，你可以通过同时提供 getter 和 setter 来创建。

```vue
<script setup>
import { ref, computed } from 'vue'

// 1. 响应式依赖
const firstName = ref('张')
const lastName = ref('三')

// 2. 可写的计算属性：不仅能读，还能写！
const fullName = computed({

  // get 抽屉：当页面需要显示全名时，Vue 自动调用它（正向计算）
  get() {
    return firstName.value + lastName.value
  },

  // set 抽屉：当你强行执行 fullName.value = '李四' 时，Vue 会立刻触发它！
  // 并且把 '李四' 作为 newValue 传进来。
  set(newValue) {
    // 收到 '李四' 后，我们自己写逻辑把它拆开！
    // 假设第一个字是姓，后面的全是名
    firstName.value = newValue.charAt(0) // 提取出 '李'
    lastName.value = newValue.slice(1)   // 提取出 '四'
  }
})

// 不会报错，引擎直接把 '王大锤' 扔进了 set(newValue) 抽屉里
fullName.value = '王大锤'

console.log(firstName.value) // 瞬间变成了 '王'！
console.log(lastName.value)  // 瞬间变成了 '大锤'！
</script>

<template>
  <input v-model="fullName" placeholder="修改全名">
  <input v-model="firstName" placeholder="修改姓氏">
  <input v-model="lastName" placeholder="修改名字">
</template>
```

## 5、类与样式绑定

数据绑定的一个常见需求场景是操纵元素的 CSS class 列表和内联样式。

### 绑定HTML class

#### 绑定对象

我们可以给 `:class` (`v-bind:class` 的缩写) 传递一个对象来动态切换 class：

```vue
// 当isActive为真时，div就存在active这个样式，反之，则不存在
<div :class="{ active: isActive }"></div>
```

也可以在同一个对象中，使用多个字段，来控制多个样式

```vue
<script setup>
  const isActive = ref(true)
  const hasError = ref(false)
<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
</template>

// 由于isActive为真，而hasError为假，所有这段代码的渲染结果如下：
<div class="static active"></div>
```

当然绑定的对象并不一定需要写成内联字面量的形式，也可以直接绑定一个对象

```vue
<script setup>
  const classObject = reactive({
    'active': true,
    'text-danger': false
  })
<template>
  <div :class="classObject"></div>
</template>

// 由于active为真，而text-danger为假，所有这段代码的渲染结果如下：
<div class="active"></div>
```

#### 绑定数组

我们可以给 `:class` 绑定一个数组来渲染多个 CSS class

```vue
<script setup>
  const activeClass = ref('active')
  const errorClass = ref('text-danger')
<template>
  <div :class="[activeClass, errorClass]"></div>
</template>

// 渲染的结果是：
<div class="active text-danger"></div>
```

也可以在数组中有条件的渲染某个class，采用三元运算符的方式

```vue
// 这段代码表示，errorClass会一直存在，而当isActive为真时，activeClass才会存在
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

## 6、条件渲染

### v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
```

### v-else

也可以使用 `v-else` 为 `v-if` 添加一个"else 区块"

```vue
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no</h1>
```

### `<template>` 上的 `v-if`

因为 `v-if` 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 `<template>` 元素上使用 `v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-show

另一个可以用来按条件显示一个元素的指令，其用法基本和v-if一样

```vue
<h1 v-show="ok">Hello!</h1>
```

### v-if 和 v-show的区别和联系

| **比较维度**              | **v-if (暴力拆迁队)**                                      | **v-show (隐身斗篷)**                                      |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **核心联系 (共同点)**     | 接收 `true/false`，控制元素在页面上的显示与隐藏。            | 接收 `true/false`，控制元素在页面上的显示与隐藏。            |
| **底层原理 (本质区别)**   | **操作 DOM 节点。** 直接在 HTML 树里把元素物理销毁或重新创建。 | **操作 CSS 样式。** 元素一直都在，只是加上了 `display: none;`。 |
| **初始加载性能**          | **极好（惰性）。** 如果初始是 `false`，压根就不干活，连代码都不渲染。 | **较差（急躁）。** 不管真假，先把元素老老实实渲染进 DOM 里，再穿隐身衣。 |
| **频繁切换性能**          | **极差。** 反复创建和销毁节点，非常消耗 CPU，页面容易卡顿。  | **极好。** 只是极其丝滑地改个样式，不费吹灰之力。            |
| **搭配兄弟指令**          | 支持 `v-else-if` 和 `v-else`，可以打出一套组合拳。     | 不支持。只能单干，没有 else。                          |
| **`<template>` 标签支持** | 支持。可以用在虚拟的包装盒上，完美隐藏一组元素。       | 不支持。如果写在 template 上，会被浏览器直接无视。     |
| **最佳适用场景**        | **"百年不遇的切换"。** 例如：VIP 专属功能按钮、管理员权限菜单。 | **"疯狂高频的切换"。** 例如：下拉菜单、手风琴折叠面板、Tab 标签页切换。 |

## 7、列表渲染

`v-for` 基于一个数组（或对象）来渲染一个列表。它会根据底层数据的数量，自动在 DOM 树中生成对应数量的 HTML 元素。

**数组遍历：** `v-for="(当前项, 索引) in 数组" :key="唯一标识"`

**对象遍历：** `v-for="(值, 键, 索引) in 对象" :key="唯一标识"`

```vue
<script setup>
    import { ref } from 'vue'

    // 一个极其简单的字符串数组
    const skills = ref(['HTML', 'CSS', 'JavaScript'])
</script>

<template>
  <h3>前端基础技能：</h3>
  <ul>
    <li v-for="(item, index) in skills" :key="index">
      第 {{ index + 1 }} 项：{{ item }}
    </li>
  </ul>
</template>
```

注意：这里为了极简演示，暂时使用了 `index` 作为 key，但在实际的复杂项目中这是极其危险的，一般需要后端专门设置一个唯一的字段来作为key标识

## 8、事件处理

我们可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。

用法：`v-on:click="handler"` 或 `@click="handler"`。

事件处理器 (handler) 的值可以是：

1. **内联事件处理器**：事件被触发时执行的内联 JavaScript 语句 (适合极简的一句话逻辑)。
2. **方法事件处理器**：一个指向组件上定义的方法的属性名或是路径。（适合复杂函数调用逻辑）

```vue
<script setup>
import { ref } from 'vue'

const likes = ref(0) // 记录点赞数

// 复杂的射击逻辑（函数）
function showThanks() {
  alert(`感谢您的 ${likes.value} 次点赞！`)
}
</script>

<template>
  //内联事件处理器
  <button @click="likes++">点赞 ({{ likes }})</button>
  //方法事件处理器
  <button @click="showThanks">查看致谢</button>
</template>
```

### 在内联事件处理器中访问事件参数

有时候我们需要在内联事件处理器中访问原生DOM事件。可以向该处理器方法传入一个特殊的 `$event` 变量，或者使用内联箭头函数。

```vue
<script setup>

  function warn(message, event) {
    // 这里可以访问原生事件
    // 极其核心的作用：阻止浏览器的默认行为！
    // 比如：如果这是一个 <form> 里的提交按钮，点击默认会刷新整个网页！
    // 这句话一执行，网页就被死死按住了，绝对不刷新！
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
</script>

<template>
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
</template>
```

### 事件修饰符

在处理事件时调用 `event.preventDefault()` 或 `event.stopPropagation()` 是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。为解决这一问题，Vue 为 `v-on` 提供了**事件修饰符**。

语法：在事件名的后面加个英文句号 `.`，然后跟上修饰符的名字：`@click.修饰符="函数"`

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

注意：修饰符是可以**链式调用**的，所以使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为**，而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。

| **修饰符**     | **官方解释**                                              | **实战场景**                                               |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`.stop`**    | 等同于调用 `event.stopPropagation()`。 **阻止事件冒泡**，事件不会再向外层父元素传递。 | **卡片里的删除按钮：** 整个商品卡片点击会跳转到详情页，但卡片右下角有个"删除"按钮。给按钮加 `@click.stop`，点击删除时，绝不会触发外层卡片的跳转事件！ |
| **`.prevent`** | 等同于调用 `event.preventDefault()`。 **阻止浏览器的默认行为**（如表单刷新、链接跳转）。 | **拦截表单提交：** 写了一个登录表单 `<form>`，点击"登录"按钮默认会刷新网页。加个 `@submit.prevent`，网页死死定住不刷新，乖乖等你的 JS 去发 Ajax 登录请求。 |
| **`.once`**    | 底层在触发一次后，立刻调用 `removeEventListener` 将事件解绑。 **该事件最多只会触发一次。** | **防手抖的神器：** "确认支付"或"抽奖"按钮。加上 `@click.once`，无论用户手速多快、疯狂狂点鼠标，你的 JS 函数永远只执行一次，彻底杜绝重复扣款或重复发请求！ |
| **`.self`**    | 底层会判断 `event.target === event.currentTarget`。 **只有点在元素自身上（而非它的子元素）时，才触发事件。** | **弹窗的遮罩层：** 写了一个全屏的半透明黑色弹窗遮罩，中间有个白色的内容框。给黑背景加 `@click.self="close"`。此时你点白框内部绝不会关闭弹窗，只有精确点到外面的黑背景，弹窗才会关！ |
| **`.capture`** | 底层在 `addEventListener` 时传入 `{ capture: true }`。 **事件捕获模式**（事件从最外层往下传递时，先于内部元素被触发）。 | **埋点与数据监控：** 页面里有很多复杂的按钮，你想统计用户所有的点击行为。直接在最外层的 `<div>` 上加 `@click.capture="打点记录"`。无论用户点里面什么，最外层的监听器都能"抢先一步"抓取到动作。 |
| **`.passive`** | 底层在 `addEventListener` 时传入 `{ passive: true }`。 **告诉浏览器"我绝对不会拦截默认滚动"，从而极大提升滚动性能。** | **丝滑的移动端长列表：** 在手机端监听 `@touchmove`（手指滑动）或 `@scroll` 时。加了 `.passive`，浏览器就不需要等你的 JS 执行完再渲染滚动画面，列表滑动会变得如同德芙巧克力一般丝滑，告别卡顿。 |

### 按键和鼠标修饰符

| **修饰符**                     | **官方解释**                                               | **实战场景**                                               |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`.enter`**                   | 监听回车键 (`Enter`)。                                       | **全局通用搜索框：** 用户打完字，习惯性敲一下回车。直接写 `@keyup.enter="search"`，瞬间省去了再拿鼠标去点"搜索"按钮的麻烦！ |
| **`.esc`**                     | 监听退出键 (`Escape`)。                                      | **无缝关闭弹窗：** 打开了一个满屏的图片预览组件。给整个页面加上 `@keyup.esc="closeModal"`，用户不想看了按一下 `Esc` 直接关掉，体验极度丝滑。 |
| **`.delete`**                   | **(细节神坑！)** 它同时监听 `Backspace` (退格) 和 `Delete` (删除) 两个键！ | **清空输入框 / 删除卡片：** 用户选中了购物车里的一件商品，直接按下键盘上的删除键，触发 `@keyup.delete="remove"` 把商品踢出购物车。 |
| **`.space`**                   | 监听空格键 (`Space`)。                                       | **视频/音乐播放器：** 像 B 站或 YouTube 一样，用户看视频时按下空格键 `@keyup.space="togglePlay"`，立刻暂停或继续播放。 |
| `.up` `.down` `.left` `.right` | 监听四个方向键。                                             | **下拉菜单的键盘导航：** 用户用方向键上下移动，高亮显示搜索联想词汇。或者自己写一个贪吃蛇小游戏控制方向！ |

| **修饰符**                      | **官方解释**                                               | 实战场景                                                   |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `.ctrl` `.alt` `.shift` `.meta` | 监听系统修饰键。(`meta` 在 Mac 上是 `Command` 键，在 Windows 上是 `Win` 键) | **仿微信的发消息操作：** 需求是"按住 Ctrl 加回车才能发送"。直接打出绝美连招：`@keyup.ctrl.enter="sendMessage"`。 |
| `.left` `.right` `.middle`      | 专门配合鼠标点击事件，限制必须是**鼠标的特定按键**点击才触发。 | **自定义电脑右键菜单：** 你想屏蔽浏览器自带的右键菜单，弹出一个你手写的超酷菜单。连招：`@mousedown.right.prevent="showMyMenu"` (右键点击 + 阻止浏览器默认菜单出场)！ |
| **`.exact`**                   | 允许控制触发事件所需的**精确系统键组合**。多按一个不行，少按一个也不行。 | **严谨的后台操作：** 如果你写了 `@click.ctrl="delete"`，用户按住 `Ctrl+Shift` 去点击也会触发删除！ 如果你改成 `@click.ctrl.exact="delete"`，Vue 保安就只认纯粹的 `Ctrl+点击`，多掺杂任何一个键都绝对不放行！ |

## 9、表单的输入绑定

v-model可以简化前端处理表单的相关操作，`v-model` 还可以用于各种不同类型的输入，`<textarea>`、`<select>` 元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合。

语法：`<表单元素 v-model="响应式变量">`

## 10、侦听器

它之所以叫侦听器，是因为它可以侦听一个或多个响应式数据源数据，并在数据源变化时调用所给的回调函数。 就是你传给watch侦听器一个响应式变量，然后当这个变量变化时，自动触发一个你定义的函数， 就像一个人被监控了一样，只要这个人一动，摄像头就会报警.

## 11、组件基础

### 定义一个组件

当使用构建步骤时，我们一般会将 Vue 组件定义在一个单独的 `.vue` 文件中，这被叫做[单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html) (简称 SFC)。

```vue
<script setup>
    import { ref } from 'vue'
    const count = ref(0) // 这个组件自己内部的独立数据
</script>

<template>
  <button class="fancy-btn" @click="count++">
    我是一个自定义按钮！被点了 {{ count }} 次
  </button>
</template>

<style scoped>
  /* scoped 极其重要！它保证这里的样式只对当前这个按钮生效，绝不污染别的组件！ */
  .fancy-btn { background: blue; color: white; border-radius: 8px; }
</style>
```

### 使用组件

当我们使用一个组件的时候，我们需要在父组件中导入它。假设我们把这个按钮组件放在了一个叫做 `MyBtn.vue` 的文件中，这个组件将会以默认导出的形式被暴露给外部。

```vue
<!-- <script setup> 中的顶层的导入、声明的变量和函数可在同一组件的模板中直接使用。你可以理解为模板是在同一作用域内声明的一个 JavaScript 函数——它自然可以访问与它一起声明的所有内容。 -->
<script setup>
  import MyBtn from './components/MyBtn.vue'

</script>

<template>
  <MyBtn />
  <MyBtn />
  <MyBtn />
</template>
```

值得注意的是，每当点击这些按钮的时候，每一个组件都维护着自己的状态，是不同的`MyBtn.vue`。这是因为每当你使用一个组件，就创建一个新的`实例`

### 传递props

在实际的应用场景中，我们常常需要在相同的视觉布局下，使用不同的内容。要实现这种需求，我们必须要向组件`传递数据`，我们就需要用到`Props`

Props是一种特别的属性，我们可以在组件上声明注册。比如我们要传递给博客文章这个组件一个标题，我们必须在组件的props列表中声明它。这里就需要用到`defineProps`宏。

子组件：`ArticleCard.vue`

```vue
<script setup>
// 极其核心：defineProps！
// 它相当于这个组件对外界大喊："我想工作，但我需要你给我提供 title 和 author 这两个材料！"
defineProps({
  title: String,
  author: String
})
</script>

<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>作者：{{ author }}</p>
  </div>
</template>
```

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props。

父组件：`App.vue`

```vue
<script setup>
import { ref } from 'vue'
import ArticleCard from './ArticleCard.vue' // 引入组件

// 后端传来的真实文章数组
const articles = ref([
  { id: 1, title: 'Vue 3 核心揭秘', author: '尤雨溪' },
  { id: 2, title: '零基础学前端', author: '张三' },
  { id: 3, title: '大厂面试指南', author: '李四' }
])
</script>

<template>
  <ArticleCard
    v-for="item in articles"
    :key="item.id"
    :title="item.title"
    :author="item.author"
  />
</template>
```

父组件只管负责处理数组逻辑，子组件只管负责长什么样。

### 组件事件

正常情况下，`子组件绝对不允许直接修改父组件传进来的Props`，因为如果子组件能够随意对props进行修改的话，一旦出了bug，将会非常难以调试，这种架构叫做`单向数据流`，数据只能从上方流出，下方只能看不能改。

如果子组件一定要对父组件的某些元素进行修改，就需要用到组件事件（Emit）。

```vue
// 子组件
<script setup>
// 向 Vue 报备：我拥有一个叫 'finishTask' 的对讲机频段，这里必须要提前声明！
const emit = defineEmits(['finishTask'])

// 子组件的内部逻辑（函数）是绝对私密的，只有发射出去的"字符串暗号（自定义事件名）"才是对外的公共接口。
function doWork() {
  console.log('自己在偷偷努力...')

  // 注意：这里传的还是那个字符串频段名，对于父组件来说，它完全不知道里面有个函数叫 doWork，它只认那个对外字符串 'finishTask'！
  emit('finishTask')
}
</script>
```

```vue
<script setup>
import { ref } from 'vue'
import MyWorker from './MyWorker.vue'

const taskCount = ref(0) // 父组件的账本

// 父组件内部执行的函数
function updateLedger() {
  taskCount.value++
  console.log('父组件收到汇报，账本已更新！')
}
</script>

<template>
  <h2>公司总计完成任务：{{ taskCount }}</h2>

  <MyWorker @finishTask="updateLedger" />
</template>
```

注意：只要你想使用组件事件emit，就必须先在顶层用字符串数组声明！

## 12、生命周期

每个Vue组件实例在创建时都需要经历一系列的初始化步骤，比如编译模板、挂载实例以及当数据改变的时候更新DOM等。在此过程中，它会运行被称为生命周期的钩子函数，让开发者有机会在`特定的阶段`进行某些操作。

| **生命周期API**                               | **通俗比喻 / 触发时机**                                    | **语法演示**                                        | **核心使用场景 **                                          |
| --------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| **`setup` 顶层** *(本质上就是生命周期的起点)* | **娘胎发育：** 组件实例刚被创建，响应式数据刚配好，但真实的 HTML 页面还没开始画。 | `const data = ref([])` `fetchData()`                  | 1. 声明所有的响应式变量和函数。 2. **极其推荐：** 在这里直接发起初始的 Ajax 网络请求，越早发越好！ |
| **`onBeforeMount`**                           | **准备登台：** 马上要把数据填进 HTML 模板了，但此时真实的 DOM 还没生成。 | `onBeforeMount(() => { ... })`                        | **几乎不用。** 这个阶段极度尴尬，既拿不到初始数据（不如 setup 早），也拿不到真实的 DOM 节点（不如 onMounted 稳），直接无视它。 |
| **`onMounted`**                               | **闪亮登场：** 极其重要！组件已经完完整整地被画到了真实屏幕上！ | `onMounted(() => {` `chart.init(myDiv.value)` `})`    | 1. **获取真实 DOM 节点**（结合上一节的模板引用 `ref`）。 2. 接入第三方需要原生 DOM 的库（如 ECharts 图表、高德地图）。 3. 绑定全局级别的原生事件（如 `window.addEventListener`）。 |
| **`onBeforeUpdate`**                          | **准备换衣：** 响应式数据发生了变化，Vue 马上要去更新页面了，但此时页面上还是旧的画面。 | `onBeforeUpdate(() => { ... })`                       | **极少使用。** 偶尔用于在页面更新前，手动记录一下当前的滚动条高度，等更新完再滚回去。 |
| **`onUpdated`**                               | **换衣完毕：** 数据变了，且页面上的 HTML 已经彻底被更新成了最新状态。 | `onUpdated(() => { ... })`                            | **危险动作！** 可以在这里基于更新后的新 DOM 进行操作。但绝对不能在这里修改响应式数据，否则会触发无限死循环刷新！ |
| **`onBeforeUnmount`**                         | **办理离职：** 组件马上要被干掉了，但此时它还活着，数据和 DOM 都还健在。 | `onBeforeUnmount(() => {` `clearInterval(timer)` `})` | **极其重要（擦屁股阶段）！** 1. 清理你在 `onMounted` 里开启的 `setInterval` 定时器。 2. 解绑全局事件 `window.removeEventListener`。 防止内存泄漏！ |
| **`onUnmounted`**                             | **魂飞魄散：** 组件已经被彻底从页面上物理抹除，所有子组件也死光了。 | `onUnmounted(() => { ... })`                          | 作用与 `onBeforeUnmount` 类似，用于彻底清理善后工作。        |

初始发请求找 `setup`，操作真实 DOM 找 `onMounted`，清理内存垃圾找 `onUnmounted`

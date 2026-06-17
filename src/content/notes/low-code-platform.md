---
title: 低代码平台设计与实现
category: 前端
tags: [Vue, 低代码]
pubDate: 2026-06-17
description: 低代码可视化设计平台中 JSON Schema 数据结构、Pinia 状态流转、拖拽嵌套优化、撤销重做及源码生成等核心设计。
source: 低代码平台.md
---

# 低代码平台设计与实现

## 1、JSON Schema 的底层设计与 Pinia 状态流转机制

首先，低代码平台最核心的思想就是数据驱动视图。在我的项目中，整个中间画布其实就是一个纯粹的渲染引擎，它本身不关心具体要画什么，只认一份核心数据，也就是 `JSON Schema`。我把整个页面的结构抽象成了一棵嵌套的对象树。树上的每一个节点都有一个唯一的 `id`，一个代表组件类型的 `type`，一个存放样式的 `props` 对象，以及用来实现容器嵌套的 `children` 数组。所以，当我们在左侧面板拖拽一个组件到画布时，本质上就是在往这棵树里面插入一个新的对象节点。

```js
// JSON Schema 节点结构示例
{
  id: "node-uuid-001",
  type: "el-button",
  props: { text: "提交", size: "medium", type: "primary" },
  children: []
}
```

在这个基础上，为了解决左侧物料、中间画布和右侧属性面板这三个平级的兄弟组件之间的通信问题，我引入了 Pinia 作为全局的唯一数据源。在 Store 的设计上，我遵循了极其克制和数据扁平化的原则。整个状态仓库里，我只维护了两个最核心的响应式变量：一个是全量的组件树大数组，用来保存整个画布的结构；另一个是一个简单的字符串变量，用来记录当前被鼠标点击激活的那个组件的 `id`。这样设计可以最大程度避免存储冗余的对象数据，从根源上杜绝了数据不同步的隐患。

```js
// Pinia Store 核心变量
import { defineStore } from 'pinia'

export const useBuilderStore = defineStore('builder', () => {
  const componentTree = ref([])        // 全量画布结构
  const activeComponentId = ref('')    // 当前激活的组件 ID

  const activeComponent = computed(() => {
    // 深度遍历 componentTree，返回匹配 activeComponentId 的节点引用
    return findNodeById(componentTree.value, activeComponentId.value)
  })

  return { componentTree, activeComponentId, activeComponent }
})
```

至于这三个区域是如何做到实时并且丝滑同步的，这是整个设计的精髓所在。具体的过程是这样的：当我们在中间画布点击某个组件时，Pinia 会记录下这个组件的 `id`。接着，我在 Pinia 里编写了一个计算属性，这个计算属性的职责就是拿着当前的激活 `id`，去全量的组件树里面进行深度遍历。一旦找到匹配的节点，它并不会克隆一份新的数据，而是直接把那个真实节点对象的内存引用地址返回给右侧的属性面板。

因为右侧面板拿到的是源数据对象的内存地址指针，而且整个组件树在 Vue3 中是被 `Proxy` 深度代理过的。所以，当用户在右侧属性栏里修改文字或者改变颜色时，底层其实是直接穿透修改了源数据树里的真实属性。Vue3 的响应式系统会立刻拦截到这个属性的变更，然后自动通知中间的画布去进行精准的局部重绘。整个流转过程非常自然，我完全不需要编写任何额外的自定义事件去手动分发或同步数据，这不仅彻底解耦了三个面板，还保证了单向数据流的绝对清晰。

## 2、关于 vuedraggable 多层级嵌套的痛点与防卡顿优化

vuedraggable 的底层是基于业界非常著名的 Sortable.js 封装的 Vue 组件。在开发低代码平台初期，如果直接使用原生的 HTML5 拖放 API 从零手写，不仅要处理极其繁琐的原生事件，还要手动去计算鼠标的落点位置和 DOM 的插入节点。更致命的是，Vue 的核心思想是数据驱动视图，原生拖拽直接操作 DOM 会破坏 Vue 的响应式数据流。而 vuedraggable 最强大的地方在于，它完美地把视觉上的 DOM 拖拽动作，隐式地转化为了对底层绑定数组的增删改查操作。我只需要把我的 `JSON Schema` 数组传给它，用户在画布上拖拽组件进行上下排序时，底层数组就会自动同步，这极大地简化了我的架构复杂度。

但在享受了这种便利之后，当我们把业务复杂度提升到多层级嵌套容器时，真正的痛点就出现了。这就来到了您刚才问的第一点——物理交互层面的拖拽冲突。当用户在画布里嵌套了多层容器，比如一个大表单里面嵌套了分栏，分栏里面又嵌套了卡片，用户拖着一个组件经过这个区域时，由于浏览器默认的 DOM 事件流机制是事件冒泡，拖放动作会从最内层的容器一直向上冒泡到最外层的画布。这会导致系统根本不知道你想把组件放在哪一层，很容易出现组件被错误扔到外层容器的 Bug。为了解决这个问题，我利用了 vuedraggable 底层的 `group` 属性，将左侧物料区和画布内所有的嵌套容器都划分到同一个拖拽组里。最关键的是，我在处理组件拖拽放下和经过事件时，严格使用了 Vue 的事件修饰符来阻止冒泡：`.stop`。一旦鼠标悬停在最内层容器上，我立刻切断事件向父级传播，从而实现了让组件精确落入鼠标所指的那个唯一层级，大大提升了嵌套拖拽时的丝滑手感。

接着是第二点，深层嵌套带来的 Vue3 响应式性能卡顿。整个画布的结构是我设计的一套统一的树形 `JSON Schema`。在 Vue3 中，如果我们直接用 `reactive` 去包装这个庞大的嵌套对象树，Vue 默认会进行深度的递归遍历，给树上的每一个属性都挂载 `Proxy` 代理。当嵌套了十几层、画布里有上百个组件时，拖拽引发的依赖追踪开销是极其恐怖的，直接表现就是页面掉帧卡顿。为了优化性能，我跳出了 Vue 默认的深度响应式陷阱。**对于左侧物料栏的原始组件模板配置**，或者存入内存中的历史操作快照这种不需要实时驱动视图更新的庞大静态数据，我坚决放弃使用 `reactive`，而是改用 `shallowRef` 这种浅层代理。它只劫持对象最外层引用的变化，完全跳过了内部深层属性的递归 `Proxy` 劫持，直接省下了海量的内存开销。同时，在往画布真正添加新节点时，我严格使用 Lodash 的 `cloneDeep` 进行深拷贝，切断新组件与原始模板的引用联系。这种对事件流的精准控制和对响应式深度的克制使用，就是我的画布在复杂嵌套下依然保持高性能的根本原因。

### 2.1、vuedraggable 属性是怎么用的

> 在使用 vuedraggable 处理跨区域、多层级的拖拽时，其底层的 `group` 属性起到了决定性作用。
>
> 默认情况下，vuedraggable 的拖拽排序仅仅局限于单一的 DOM 列表内部。为了打通左侧物料区、中间画布以及画布内部无限嵌套的容器，我为这三者绑定了同一个 `group` 名称，将它们强行纳入了同一个拖拽上下文。
>
> 但更关键的是，为了满足低代码编辑器的特殊业务逻辑，我没有简单地传入一个字符串，而是将 `group` 配置成了对象形式，进行了极其精细的**权限管控**。

```js
// vuedraggable group 权限配置
// 左侧物料菜单
const materialGroup = {
  name: 'builder-components',
  pull: 'clone',   // 拖出时克隆，不移除源物料
  put: false        // 禁止将画布组件拖回物料区
}

// 画布及其嵌套容器
const canvasGroup = {
  name: 'builder-components',
  pull: true,       // 允许在画布内自由拖拽
  put: true         // 允许放入来自同组的组件
}
```

> 针对左侧的物料菜单，我将其 `pull` 属性设置为 `'clone'`，这就保证了当用户往外拖拽时，触发的是深度克隆，而不是把物料源给移走了；同时我把它的 `put` 属性设为 `false`，彻底封死了用户将画布内的组件反向拖回菜单的 Bug 路径。
>
> 反之，对于中间的画布和它内部所有的嵌套容器，它们的 `put` 和 `pull` 权限是完全放开的。配合前面提到的 `.stop` 阻止冒泡机制，这才真正实现了组件在任意嵌套层级之间的自由穿梭和无缝放置。

### 2.2、reactive 和 shallowRef 有什么区别和联系

首先说它们的联系。无论是 `ref` 还是 `shallowRef`，它们的设计初衷都是为了让数据具备响应式能力。在使用方式上它们是完全一致的，返回的都是一个包含 `.value` 属性的响应式引用对象。我们在 JavaScript 代码中读取或者修改数据时，都必须通过 `.value` 去操作。并且，只要我们直接给这个 `.value` 整体赋予一个全新的值，也就是改变了它的内存地址，无论是 `ref` 还是 `shallowRef`，都能被 Vue 的响应式系统拦截到，从而触发页面的视图重绘。

但它们的根本区别，在于对"深层复杂对象"的处理机制截然不同。

当我们使用 `ref` 去包装一个多层嵌套的复杂对象时，Vue 的底层是非常勤奋的。它不仅会拦截最外层的 `.value` 赋值，还会自动调用 `reactive` 方法，去递归遍历这个对象里面的每一个嵌套属性，给所有的深层节点都加上 `Proxy` 代理。这就意味着，哪怕这个对象嵌套了十层，只要我们通过 `.value.a.b` 修改了最里面的一个小字段，Vue 也能精准捕捉到，并驱动视图刷新。这在日常的普通表单绑定或者数据交互中是非常方便和省心的。

然而，这种勤奋在遇到海量数据时会变成巨大的性能负担。这就引出了 `shallowRef`。顾名思义，它只做"浅层"的响应式代理。当我们给 `shallowRef` 传入一个超大对象时，Vue 底层变得非常克制，它绝对不会去递归遍历对象内部的属性，内部的数据依然是普通的原生 JavaScript 对象。它只死死盯住最外层的那个 `.value` 属性。如果我们去修改 `shallowRef` 内部的深层字段，比如改变了某一个嵌套的颜色值，Vue 是完全感知不到的，页面绝对不会更新。只有当我们直接把整个 `.value` 重新赋值为一个全新的对象时，才会触发响应。

```js
import { ref, shallowRef } from 'vue'

// ref：深度响应式，递归 Proxy 代理所有嵌套属性
const deepData = ref({ a: { b: { color: 'red' } } })
deepData.value.a.b.color = 'blue'  // ✅ 触发视图更新

// shallowRef：浅层响应式，仅监听 .value 整体替换
const shallowData = shallowRef({ a: { b: { color: 'red' } } })
shallowData.value.a.b.color = 'blue'  // ❌ 不会触发视图更新
shallowData.value = { a: { b: { color: 'blue' } } }  // ✅ 触发视图更新
```

这就解释了为什么在我的低代码平台项目中，对于左侧几百个组件的物料配置数据，我坚决抛弃了 `ref` 而选择了 `shallowRef`。因为这些物料配置极其庞大，而且在整个生命周期中是纯静态的，用户只会把它拖拽出来复制，绝对不可能去修改物料内部的深层默认属性。如果用 `ref`，Vue 就会白白创建成千上万个毫无意义的 `Proxy` 代理，直接导致编辑器初始化时主线程卡死。而使用 `shallowRef`，直接绕过了底层的深层代理，极大地节省了内存和 CPU 开销，这是 Vue3 处理大型只读数据结构时最标准的一种性能优化手段。

## 3、关于历史记录栈——撤销与重做功能的设计，以及如何防止本地缓存和内存溢出

在低代码平台中，用户的误操作是非常高频的，所以撤销和重做功能是绝对的刚需。从底层数据结构上来说，我把它设计成了一个"带指针的时光机"。具体在代码里，我在状态管理中维护了两个核心变量：一个是名为 `history` 的数组，用来按顺序存放每一次画布操作后的 JSON 快照；另一个是一个整数游标 `cursor`，用来充当历史记录的指针。

```js
// 撤销/重做 时光机模型
const history = ref([])   // 历史快照栈
const cursor = ref(-1)    // 当前指针位置

// 记录快照
function pushSnapshot(schema) {
  // 如果指针不在栈顶，截断废弃的未来快照（时间线分支处理）
  history.value = history.value.slice(0, cursor.value + 1)
  history.value.push(cloneDeep(schema))
  cursor.value++
}

// 撤销
function undo() {
  if (cursor.value > 0) {
    cursor.value--
    componentTree.value = cloneDeep(history.value[cursor.value])
  }
}

// 重做
function redo() {
  if (cursor.value < history.value.length - 1) {
    cursor.value++
    componentTree.value = cloneDeep(history.value[cursor.value])
  }
}
```

它的运转逻辑是这样的：当用户每完成一次关键操作，我就会把当前的整个画布树深拷贝一份，推入 `history` 数组，同时游标往前走一步。如果用户点击了"撤销"，我不需要去做复杂的逆向计算，而是直接让游标后退一步，然后从 `history` 数组中取出游标指向的那一份历史快照，直接整体替换当前的画布数据。反过来，点击"重做"就是游标前进一步。这里有一个非常关键的业务边界处理：如果用户撤销了几步回到了过去，紧接着他又往画布里拖了一个新组件，这就意味着"时间线被改变了"。此时，我必须把 `history` 数组里游标当前位置之后的那些"作废的未来快照"全部通过截断丢弃掉，然后再推入新的快照。

但是，如果仅仅是这样实现，面试官您刚才提到的内存爆炸问题就必然会出现。当画布里嵌套了上百个组件，并且用户操作了几百步之后，无论是浏览器的运行内存，还是我用来做持久化保存的 `localStorage`，都会瞬间被庞大的 JSON 字符串撑爆。为了解决这个致命的性能瓶颈，我做了两层非常极端的优化拦截。

第一层优化是快照生成的防抖控制。如果在用户拖拽组件滑动的过程中，或者在右侧输入框连续敲击键盘修改文字时，每一毫秒都去深度拷贝并生成快照，那是绝对不可接受的。所以我严格控制了快照的入栈时机。只有当拖拽动作彻底结束触发了结束事件，或者用户修改属性停顿超过 500 毫秒之后，我才会生成一张快照并存入本地缓存。这直接拦截了绝大部分无意义的中间态记录。

第二层优化是限制历史栈的最大容量。系统不可能提供无限回溯的能力，所以我给 `history` 数组设定了一个最大长度——20 步。每次往数组里推入新快照前，我都会判断一下长度，如果超标了，我就调用数组的 `shift()` 方法把最老的那一张快照踢出去。通过这种类似队列先进先出的截断机制，配合我前面提到的跳过深层响应式代理的策略，彻底保证了系统的内存占用永远处于一个极其健康的阈值内。

## 4、在低代码平台中，如何实现纯前端解析 Excel 文件并将其数据动态渲染成 ECharts 可视化图表

在开发这个功能时，考虑到图表生成需要所见即所得的极速反馈，并且不想给后端服务器增加额外的解析压力，我决定将整个文件解析和数据清洗的链路完全放在纯前端闭环完成。这里我主要依赖了前端生态中非常著名的 `xlsx`（也就是 SheetJS）库来处理文件，以及 ECharts 来处理渲染。

整个功能的实现可以清晰地拆分为三个步骤：读取解析、数据清洗映射、以及响应式渲染。

首先是第一步，文件的读取与解析。在页面上，我使用了 Element UI 的上传组件，但我拦截了它向后端发请求的默认行为，仅仅是为了拿到用户在本地选中的那个 `File` 对象。拿到文件后，我实例化了浏览器原生的 `FileReader` API，调用它的 `readAsArrayBuffer` 方法，将复杂的 Excel 文件在内存中转化为二进制数据流。当数据读取完毕触发 `onload` 回调时，我将这段二进制数据直接喂给 `xlsx` 库的 `read` 方法。它会帮我解析出一个完整的工作簿对象（`Workbook`）。通常用户的有效数据都存放在第一个工作表里，所以我提取出 `Sheet1`，然后调用 `xlsx` 库里一个极其好用的工具函数 `sheet_to_json`。这一步非常关键，它直接把原本晦涩的表格行与列，扁平化转换成了我们前端最熟悉的、由一个个对象组成的 JSON 数组。

```js
// Excel 解析流程
import * as XLSX from 'xlsx'

function parseExcelFile(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]       // 取第一个工作表
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)  // 转为 JSON 数组
    processChartData(jsonData)
  }
  reader.readAsArrayBuffer(file)
}
```

接下来是第二步，也是连接表格与图表的桥梁：数据的清洗与映射。拿到 JSON 数组后，不能直接扔给 ECharts，因为 ECharts 的 `option` 配置项有着非常严格的结构要求。以生成一个常规的柱状图或折线图为例，ECharts 至少需要两个一维数组：一个是 X 轴的类目标签（比如月份、产品名），另一个是具体的数值序列（也就是 `series` 里的 `data`）。所以，我写了一个转换逻辑，遍历刚才解析出的 JSON 数组，利用 JavaScript 数组的 `map` 方法，把每一行数据里的"维度字段"单独抽离出来，拼接成一个新数组赋值给 `xAxis.data`；同时把"指标字段"抽离出来，赋值给 `series` 数组中对应对象的 `data` 属性。

```js
// 数据清洗与映射
function processChartData(jsonData) {
  const xAxisData = jsonData.map(row => row.name)      // 维度字段 → X 轴
  const seriesData = jsonData.map(row => row.value)     // 指标字段 → 数据序列

  chartOption.value = {
    xAxis: { type: 'category', data: xAxisData },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: seriesData }]
  }
}
```

最后是第三步，与 Vue3 结合的响应式渲染。在数据组装完成后，我得到了一个完整的、符合 ECharts 规范的 `option` 对象。由于这是在 Vue3 的环境下，我将这个 `option` 对象保存在了一个响应式变量中。当用户上传新文件、或者在右侧属性面板切换图表类型（比如把柱状图改成折线图）时，这个 `option` 对象会被重新计算或修改。我在封装的 ECharts 组件内部，使用了 Vue 的 `watch` 去深度监听这个 `option`，一旦捕捉到数据变化，就立刻调用 ECharts 实例的 `setOption` 方法。

```js
// Vue3 响应式驱动 ECharts 渲染
import { watch } from 'vue'

watch(chartOption, (newOption) => {
  myChart.setOption(newOption, true)  // true 表示不合并，直接替换
}, { deep: true })
```

通过这套纯前端的完整链路，用户只需要点一下上传，干瘪的 Excel 文件就能瞬间转化为画布上生动且可以交互的可视化图表，不仅响应极快，而且极大地降低了非技术人员的使用门槛。

## 5、一键生成标准 Vue 源码的实现原理

关于为什么要在这套系统里做源码生成，这其实是出于对实际业务流转的考量。低代码平台虽然能快速搭建出栅格布局或者表单，但很难去覆盖极度复杂的定制化业务接口和底层逻辑。为了让专业的前端开发人员能接手后续的工作，系统必须把搭建好的页面，翻译成一份干净、标准且可以直接扔进脚手架里运行的代码。

它的底层原理听起来似乎很神奇，但本质上，就是一个基于抽象语法树思维的"字符串拼接编译引擎"。就像我们在第一个问题中探讨的，整个画布的数据底座是一棵庞大的嵌套 JSON 树。生成源码的过程，其实就是对这棵树进行一次深度的递归遍历，并按规则翻译成字符串。

```js
// 代码生成核心——递归遍历 JSON Schema 树
function generateTemplate(node) {
  const tag = componentTagMap[node.type]                // 映射组件标签
  const attrs = generateAttrs(node.props)               // 生成属性字符串
  const children = (node.children || [])
    .map(child => generateTemplate(child))               // 递归生成子组件
    .join('\n')

  return `<${tag}${attrs}>\n${children}\n</${tag}>`
}

// 输出示例
// <el-button type="primary" size="medium">提交</el-button>
```

具体来说，标准的 Vue 单文件组件是由 `<template>` 模板、`<script setup>` 逻辑和 `<style scoped>` 样式这三个大块组成的，我的代码生成器也是分三步去构建这三个部分。

首先最核心的是构建 `<template>` 模板层。我编写了一个递归遍历函数，从 JSON 树的根节点开始一层层往下扫描。每遇到一个数据节点，我就会根据它的组件类型属性，映射出对应的 UI 组件标签。比如检测到类型是按钮，我就在内存里拼接一段 `<el-button` 的字符串。紧接着，我会去遍历这个节点身上的配置属性，把它们转化成标签上的属性字符串。如果这个节点包含 `children` 嵌套数组，那这个递归函数就会自己调用自己，继续向深层钻，等子组件的字符串全拼接完了，再把它们塞回父级标签的闭合标签之内。

其次是构建 `<script setup>` 逻辑层。在刚才遍历树的过程中，我并不仅仅是拼接标签，我还会顺手做一个"依赖收集"的工作。我会记录下这个页面到底用到了哪些 Element UI 组件库的特殊组件或者 ECharts 图表模块，然后在内存里把对应的 `import` 导入语句组装起来，放进 `<script setup>` 标签的字符串块里。

最后是构建 `<style scoped>` 样式层。如果在 JSON 数据里解析到了针对某个组件自定义的尺寸或颜色配置，为了保持代码的优雅，我不会去写密密麻麻的内联样式，而是统一把它们提取出来，自动生成带有唯一哈希值的 CSS 类名字符串，最后塞进 `<style scoped>` 标签里。

```js
// 最终拼接输出 .vue 文件
function generateVueFile(schema) {
  const template = `<template>\n${generateTemplate(schema)}\n</template>`
  const script = `<script setup>\n${collectImports(schema)}\n</script>`
  const style = `<style scoped>\n${generateStyles(schema)}\n</style>`
  return `${template}\n\n${script}\n\n${style}\n`
}

// 浏览器端触发下载
function downloadSourceCode(code, filename = 'generated-page.vue') {
  const blob = new Blob([code], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
```

当这三大部分的字符串全部准备就绪后，我按照标准 Vue 文件的物理结构，把它们合并成一个超级长的完整字符串。最后，我利用浏览器底层的 `Blob` 对象，把这段长字符串转换成 `text/plain` 类型的文件数据流，然后通过前端动态创建一个隐藏的 `<a>` 标签，利用 `URL.createObjectURL` 生成下载链接并触发模拟点击。这样，一份所见即所得的 `.vue` 源码文件就直接下载到用户的本地了。

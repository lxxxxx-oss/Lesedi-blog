---
title: CSS
tags: [CSS, 前端, 编程基础]
pubDate: 2026-06-17
description: CSS选择器、Flex布局与Box-sizing等核心样式知识笔记
source: CSS.md
---

# CSS

## CSS简介

CSS（**Cascading Style Sheets**，**层叠样式表**），是一种用来为HTML、XML文件添加样式的计算机语言。

CSS主要由两个部分组成：**选择器**以及一条或多条**声明**。

```css
div {
  color: red;
  font-size: 20px;
}
```

选择器通常是需要设置样式的HTML元素，这里的示例的选择器就是div，每条声明由一个属性和一个值组成，属性和值之间用冒号分隔，分号结尾。

## 选择器

### 基本选择器

#### 元素选择器

根据**元素名称**来选择页面中的元素。

```css
/*
  元素选择器例子
  语法：标签名 {}
*/
div {}
p {}
```

#### id选择器

根据元素的**id属性**来选中具体的一个元素（id是唯一的）。

```css
/*
  id选择器例子
  语法： #id {}
*/
#p1 {}
```

#### class选择器

根据元素的**class属性**选中属性（class不唯一），可以多个元素指定为同一个class，也可以为同一个类指定多个class。

```html
<!-- class选择器示例 -->
<p class="p1 p2">class选择器示例111<p>
<p class="p1">class选择器示例222<p>
```

```css
/*
  class选择器例子
  语法：.class {}
*/
.p1 {
    color: red;
}
.p2 {
    font-size: 20px;
}
```

#### 属性选择器

匹配那些具有特定属性或属性值的元素。

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /*
          语法: [元素的属性] {}
        */
        /* 属性选择器 */
        /* 存在title属性的元素 */
        [title] {
            color: blue;
        }
         /* 交集选择器：选中同时符合多个选择器要求的元素。a[title]就代表选择即是a标签同时还有title属性的元素 */
        /* 存在 title 属性的 <a> 元素 */
        a[title] {
            color: red;
            font-size: 50px;
        }

        /* 存在 href 属性并且属性值匹配"https://example.org"的 <a> 元素 */
        /* 当两个属性选择器匹配到同一个元素,同时这两个属性选择器都对同一个样式进行了设置,那么处于后面的选择器的样式会覆盖掉前面的样式 */
        a[href="www.baidu.com"]
        {
            color: green;
        }
    </style>
</head>
<body>
    <p title="示例">这是属性选择器的示例</p>
    <a href="www.baidu.com" title="baidu">跳转百度</a>
</body>
</html>
```

#### 通配选择器

选中页面的所有元素，给所有元素进行样式的设置。

```css
/*
  通配选择器例子
  语法：* {}
*/

* {
    color: red;
}
```

## CSS3

### 背景属性

### Flex--弹性布局

#### 布局原理

flex是flexible Box的缩写，意为"**弹性布局**"，用来为盒状模型提供最大的灵活性，**任何一个盒子都可以指定为flex布局**

- 当我们把父盒子设置为flex布局后，子元素的float、clear和vertical-align将失效
- **父盒子**被称为Flex容器（flex container），简称**容器**。它的所有**子元素**自动成为容器成员，成为Flex项目，简称**项目**
- 简单来说，flex布局原理就是通过**给父盒子添加flex属性**，来**控制子元素的位置和排列方式**

### flex布局如何使用

**任何一个盒子**都可以设置为flex布局

- 当我们把父盒子设置为flex时，子元素的float、clear等将失效
- 当父盒子被指定为flex时，则它称为容器container，它的子元素则称为项目
- 通过给父盒子添加flex属性，来控制子盒子的位置和排列方式
- 因为flex属性**默认是不换行**的。当flex属性的父盒子在同一行摆不开所有子盒子时，它会**修改所有子盒子的宽度**达到让所有在同一行的目的。这种修改是均匀的（当不希望有这种操作的时候也可以通过属性修改）

#### 主轴和侧轴（flex-direction）

在flex布局中，分为主轴和侧轴两个方向，也被叫做：行和列、x轴和y轴

**元素是根据主轴来排列的**

- 默认的主轴方向是x轴的正方向即：水平向右
- 默认的侧轴方向是y轴的负方向即：垂直向下

不过主轴和侧轴的方向是**可以通过设置元素属性来改变的**（flex-direction）

```css
/* 当把主轴设置为x轴时，侧轴就是y轴 */
flex-direction: row;
/* reverse代表翻转，即本来是从左到右翻转为从右到左 */
flex-direction: row-reverse;
/* 当把主轴设置为y轴时，侧轴就是x轴 */
flex-direction: column;
```

#### 常见的容器（父元素）属性

- flex-direction：设置主轴方向
- justify-content：设置主轴上的子元素排列方式
- flex-wrap：设置子元素是否换行
- align-content：设置侧轴上的子元素的排列方式（多行）
- align-item：设置侧轴上的子元素的排列方式（单行）
- flex-flow：复合属性，相当于同时设置了flex-direction和flex-wrap

##### justify-content

设置**主轴**上**子元素**的对齐方式

注意：**使用这个属性之前必须确定好主轴的方向**。

- **space-between**：两边**靠边线对齐**，剩下的平分中间。（常用）
- space-around：项目均匀分布，每一个项目两侧有相同的留白空间，相邻项目之间的距离是两个项目之间留白的和
- center：整体居中对齐
- flex-start：**默认值**，从头部开始对齐
- flex-end：排列到尾部为止，与reverse略有不同。

##### align-items

设置**侧轴上的子元素排列方式**（单行）

- flex-start：**默认值**，从上到下
- flex-end：从下到上
- center：整体居中对齐（**常用来设置垂直居中**）
- stretch：拉伸，不要给子元素设置高度，不然这个属性不起作用（了解）

##### align-content

设置**侧轴上的子元素排列方式**（多行），用于子项**出现换行**的情况时（一般配合flex-wrap：wrap使用）。

- flex-start：**默认值**，从侧轴头部开始排列
- flex-end：从侧轴尾部开始排列
- center：在侧轴中间显示
- **space-between**：两边**靠边线对齐**，剩下的平分中间。（常用）
- space-around：项目均匀分布，每一个项目**两侧有相同的留白空间**，相邻项目之间的距离是两个项目之间留白的和
- stretch：设置子元素高度平分父元素高度

##### flex-wrap

该属性可以**控制子元素是否换行**。flex默认是不换行的

**flex-wrap**：换行 	flex-nowrap：默认值，不换行

### 常见的项目（子元素）属性

#### flex

flex属性定义**子项目分配剩余空间**，用flex来表示占多少份数。如果每个子元素都没有固定宽高，直接设置的flex值，那么就会把每个子元素的flex值加起来，比上那个元素的flex值就是那个子元素占整个父盒子的宽高的比例。

**注意**：是分配**剩余空间** 如果**两侧盒子有固定的宽度了**，那么**剩余空间就是两个盒子之间的空**间，这时的flex为1就是占满这个剩余空间。

应用：**圣杯布局**

#### order

默认值，Flex项目是按照在代码中出现的先后顺序排列的。然而**order**属性可以**控制项目在容器中的先后顺序。**

按**order**值**从小到大顺序排列**，可以为负值，默认为0

#### align-self

控制子项

### Box-sizing

该属性有三个可取的值，如下：

```css
box-sizing: content-box|border-box|inherit;
```

#### content-box（默认）

当设置为这个值的时候，元素在设置内边距的时候会在基础的高度上绘制。

此时元素的高度 = width + padding + border （宽度同理）

#### border-box (重点)

设置为**border-box** 值之后，对元素设置内边距和边框不会影响元素的宽高。**也就是说为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制**。

值得注意的是：**当内边距大于宽高的一半时，还是会影响到宽高**。

此时元素的高度 = width （宽度同理）

#### inherit

从父元素继承box-sizing 属性的值，若父元素未设置，则默认为 content-box

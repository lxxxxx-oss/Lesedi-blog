---
title: TypeScript
tags: [TypeScript, JavaScript, 前端, 编程基础]
pubDate: 2026-06-17
description: TypeScript类型系统、接口、泛型、类与枚举等核心特性全面笔记
source: TypeScript.md
---

# TypeScript

## 起步

### TypeScript的特性

TS两个最重要的特性 --**类型系统**、**适用于任何规模**

#### 类型系统

从TS的名字可以看出，「**类型**」是其最核心的特性。

**TypeScript是静态类型**

类型系统按照「**类型检查的时机**」来分类，可以分为静态类型和动态类型

TS是**静态类型**，JS是**动态类型**

**静态类型**是指**编译阶段就能确定每个变量的类型**，在**定义变量的时候，就必须指定变量的类型**，

虽然TS有any类型（就相当于JS最普通的变量），但就算是any也是需要在定义变量的时候明确的指定出来的，TS还提供了一个类型推断的机制，但最好还是要在定义变量的时候就明确指出变量的数据类型。这种语言的类型错误往往会导致语法错误。**TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查**，所以 TypeScript 是静态类型

**动态类型**是**指在运行的时候才会进行类型检查**，在**定义变量的时候，不用指定变量的类型**，而是根据后续给变量的赋值来判断变量的类型。动态类型的好处在于非常灵活，而坏处也很明显---代码质量参差不齐，后期维护成本高。

**TypeScript是弱类型**

类型系统按照「**是否允许隐式类型转换**」来分类，可以分为强类型和弱类型。

TS和JS都是弱类型，Python是强类型

### 第一个TypeScript实例

```typescript
const hello : string = "Hello World!"
console.log(hello)
```

### 安装TypeScript

TypeScript 的命令行工具安装方法如下：

```bash
npm install -g typescript
# 在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。
```

运行TS文件有两种方式

- 第一种

  - 先创建一个.ts文件，然后通过**tsc**命令编译

  ```bash
  # 编译ts文件
  tsc test.ts
  # 通过上面的编译，会得到一个和ts同名的js文件
  ```

  - 最后通过node来运行这个js文件

  ```bash
  node test.js
  ```

  关于**tsc**命令需要特别说明一下：

  ```bash
  tsc --init
  # 生成一个名为tsconfig.json的ts配置文件
  # 这个配置文件是对整个项目都生效的，不只限于某个文件
  ```

- 第二种

  - 先下载两个插件

  ```bash
  npm install @types/node --save-dev
  npm install ts-node -g
  ```

  - 就可以直接用node运行.ts文件

  ```bash
  ts-node 文件名.ts
  ```

### TS的基础规则

TS是一门**面向对象**的语言

- 面向对象主要有两个概念：**对象和类**
  - 对象：**对象就是类的一个实例**，有**状态**和**行为**。
    - let 对象的名字 = new 类的名字 （实例化 ---> 用类创建对象）
  - 类：**类就是一个模板**，它描述了一类具有共同特性的类的行为和状态
  - 方法：方法是类的操作的实现步骤

```typescript
//一个简单的实例
class Site {
   name():void {
      console.log("TypeScript")
   }
}
let obj = new Site();
obj.name();
```

TS是**大小写敏感**的

TS的每行代码的最后的**分号是可选**的。当几个指令都处于同一行的时候，就必须要用分号分隔

## 基础

### 数据类型分类

|  数据类型  |  关键字   |                             描述                             |
| :--------: | :-------: | :----------------------------------------------------------: |
|  任意类型  |    any    |           声明为 any 的变量可以赋予任意类型的值。            |
|  数字类型  |  number   |        双精度 64 位浮点值。它可以用来表示整数和分数。        |
| 字符串类型 |  string   | 一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（\`）,来定义多行文本和内嵌表达式。 |
|  布尔类型  |  boolean  |                 表示逻辑值：true 和 false。                  |
|  数组类型  |    无     | 声明变量为数组。` 在元素类型后面加上[] let arr: number[] = [1, 2];  或者使用数组泛型 let arr: Array<number> = [1, 2];` |
|    元组    |    无     | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。 |
|    枚举    |   enum    |                  枚举类型用于定义数值集合。                  |
|    void    |   void    |       用于标识方法返回值的类型，表示该方法没有返回值。       |
|    null    |   null    |                       表示对象值缺失。                       |
| undefined  | undefined |                用于初始化变量为一个未定义的值                |
|   never    |   never   | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

### 原始数据类型

JavaScript 的类型分为两种：**原始数据类型**和**对象类型**。

原始数据类型包括：**布尔值**、**数值**、**字符串**、**null**、**undefined** 以及 ES6 中的新类型 **Symbol** 和 ES10 中的新类型 **BigInt**。

布尔值、数值、字符串类型差距不大，这里就拿布尔值举例：

```typescript
//使用boolean定义布尔值的类型
//最基础的定义变量的格式
//let 变量名 : 数据类型 = 变量取值
let isBoolean : boolean = false;
```

```typescript
//注意，使用构造函数 Boolean 创造的对象不是布尔值：
//let Boolean : boolean = new Boolean(1);
//new Boolean()返回的其实是一个对象，所以这里会报错
let BooleanObj : object = new Boolean(1)
//指定它的数据类型为object就能通过编译
```

```typescript
//直接调用 Boolean 可以返回一个 boolean 类型：
let createdByBoolean: boolean = Boolean(1);
```

#### void（空值）

JavaScript 没有空值（Void）的概念，而在 TypeScript 中，可以用 `void` 表示**没有任何返回值的函数**。

```typescript
function alertName(): void {
    console.log('My name is Lesedi!!!');
}
alertName()
```

单独声明一个变量为void意义不大，因为它只能被赋值成**Null**或**undefined**

#### Null和Undefined

在TS中，可以使用**Null**和**Undefined**作为数据类型来定义变量

```typescript
let u : undefined = undefined;
let n : null = null;
```

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

```typescript
//当禁用 即--strictNullChecks false（严格的空校验）后,这样不会报错
//注意：当启用，即--strictNullChecks true时，下面这两个变量的命名是会报错的
let num1 : number = undefined;
let num2 : number = null;
```

而 `void` 类型的变量不能赋值给 `number` 类型的变量

```typescript
let u: void;
let num: number = u;
// 报错：Type 'void' is not assignable to type 'number'.
```

### 任意值（Any）

任意值用来表示**允许变量被赋值为任意类型**

注意：尽量少用这个数据类型，避免给后续的开发带来困扰

- any类型会**跳过类型检查**，可能会在项目中带来一些问题
- any类型的对象会导致后续的**属性**、**方法**的**类型都会变成any** --- **类型污染**
- 使用不存在的属性和方法不会报错

在 TypeScript 中，**任何类型的值都可以赋值给 any，any 也可以赋值给任意类型**，因此，any 类型通常也被称为**top type**

未解决的：

```typescript
//理论上来说，any类型是允许调用任何方法的，哪怕那个方法不存在。所以理论上下面的代码是不会报错的
//可是运行的时候会报错：TypeError: anyThing is not a function
//严格模式关了也同样会报错
let anyThing: any = 'Tom';
anyThing.setName('Lesedi');
anyThing.setName('Lesedi').sayHello();
anyThing.myName.setFirstName('Cat');
```

### 类型推论

如果**没有明确的指定类型**，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

- **在定义的时候**，没指定类型，但是赋值了 --- 会报错

```typescript
let myFavoriteNumber = 'eight';
myFavoriteNumber = 8;
//报错：Type 'number' is not assignable to type 'string'
```

- **在定义的时候**，没指定类型，同时也没有赋值  --- **变量会被推断为any类型**，而完全不被类型检查

```typescript
let myFavoriteNumber
myFavoriteNumber = 'eight'
myFavoriteNumber = 8;
//通过编译
```

### 联合类型

联合类型（Union Types）表示变量的数据类型为定义的多种数据类型中的一种

```typescript
let union : string | number | boolean
union = '这是一个联合数据类型'
union = 123
union = true
```

联合类型使用  `|` 分隔每个类型

#### 访问联合类型的属性和方法

当TypeScript不确定联合类型的变量到底是哪个类型的时候，我们**只能访问联合类型里面的所有类型共有的属性和方法**。

```typescript
function getLength(something : string | number) : number {
    return something.length
}
//因为number没有length属性，所以length不是它们的共有属性。会报错
```

```typescript
function getString(something: string | number): string {
    return something.toString();
}
//访问string和number共有的属性或方法是没有问题的
```

### 数组

定义一个数组：`let 数组名称 : 类型[] = [数组元素...]`

TS的数组与JS有所不同，`TypeScript`**数组中的元素不允许出现多种类型，但如果数组是any类型就可以，any表示数组中允许出现任意类型**

```typescript
let arr : number[] = [1,'111',true]
//报错
//Type '(string | number | boolean)[]' is not assignable to type 'number'. ---> 这些类型，不能赋值给数组

let arr1 : any = [1,'111',true]
//通过编译
```

数组的一些**方法的参数**也会根据数组在定义时**约定的类型进行限制**

```typescript
let arr3 : number[] = [1, 2, 3]
arr3.push('8')
//报错：Argument of type 'string' is not assignable to parameter of type 'number' ---> 类型为"string"的参数不能赋值给类型为"number"的参数。
arr3.push(4) //通过编译
```

#### 用接口来表示数组

```typescript
//这个接口表示：只要索引的类型是数字，那么值的类型也要是数字
interface NumberArray {
    [index: number]: number;
}
let InterfaceArr: NumberArray = [1, 1, 2, 3, 5];
```

不过这种方法过于繁琐，一般不用。但有种情况例外，那就是表示类数组的时候。

#### 类数组（Array-like Object）

类数组形似数组，但**不是数组类型**

```typescript
function sum() {
    let args: number[] = arguments;
}
```

类数组不能用普通数组的方式来定义，而应该用**接口**

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection`

```typescript
//这个接口约束当索引的类型是数字时，数组的值的类型必须是数字之外，也约束了它必须包含length 和 callee 两个属性
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
//IArguments其实是TS内置对象，所以开发过程中直接用即可，这里只是为了方便理解
//有了接口后，就可以这样定义类数组
function sum() {
    let args: IArguments = arguments;
}
```

### 函数（懵懵懂懂）

JavaScript是世界上最流行的**函数式编程语言**

> 函数是JavaScript中的一等公民

#### 函数声明

在 JavaScript 中，有两种常见的定义函数的方式——**函数声明**（Function Declaration）和**函数表达式**（Function Expression）

```typescript
//函数声明（Function Declaration）
function mysum(x, y) {
    return x + y;
}

//函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
}
//这两个函数是完全等价的
```

在TypeScript中，函数的输出和输入都会进行类型约束。也就是说，**TS传递的参数和返回的值，都会提前进行类型定义**。这也是TS的优势所在，在定义时就规定好数据类型，虽然没有JS方便，但是给后续开发维护带来的好处是更大的

```typescript
//一个TS中的简单的函数定义 ---> 这里是函数声明式
//约束了传递的参数和返回值都必须是数字类型
//这里也可以用泛型来定义
function sum(x: number, y: number): number {
    return x + y;
}
```

注意：**输入多余的（或者少于要求的）参数，是不被允许的**，（在JS中是无所谓的）

```typescript
...
//承接上面的函数定义
sum(1, 2, 3);
//报错：Supplied parameters do not match any signature of call target
//所提供的参数与调用目标的不匹配
sum(1);
//报错：Supplied parameters do not match any signature of call target
```

### 类型断言（似懂非懂）

类型断言（Type Assertion）可以用来**手动指定一个值的类型**

#### 语法

```typescript
值 as 类型
//or
<类型>值
```

#### 类型断言的作用

##### 将联合类型指定为确定的类型

之前在联合类型那里说过，在TS中，当**不确定联合类型的变量的类型**时，就**只能访问此联合变量的所有类型的共有方法和属性**

而有时候我们又需要在还未确定类型的时候，就访问其中一个类型的特有属性或方法，这就可以使用类型断言

```typescript
interface chengDu {
    work(): void
}
interface chongQi {
    study(): void
}
function isWork(City: chengDu | chongQi) {
    if (typeof (City as chongQi).study === 'function') {
        return true;
    }
    return false;
}
```

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

##### 将父类断言为更具体的子类

##### 将任意类型断言为any

##### 将any断言为任意类型

##### 双重断言（慎用）

#### 对比

##### 类型断言 VS 类型转换

类型断言只会影响TypeScript编译时的类型，**类型断言语句在编译结束后，会被删除**。所以类型断言**不会真正改变元素的数据类型**；要想改变元素数据类型，还得类型转换

```typescript
function toBoolean(something: any) {
    return something as Boolean
}
console.log(toBoolean(1));  //1

function toBoolean2(something: any) {
    return Boolean(something)
}
console.log(toBoolean2(1)) //true
```

##### 类型断言VS类型声明（定义）

```typescript
let man: Human = sayHi('Lesedi') //类型声明
//等价于
let man = sayHi('Lesedi') as Human //类型断言
```

简而言之，**类型声明比类型断言更为严格**，所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的语法更为优雅

### 内置对象

内置对象是指**根据标准在全局作用域上存在的对象**。这里的标准是指ECMAScript和其他环境（比如DOM）的标准

#### ECMAScript的内置对象

包括但不限于：`Boolean`、`Error`、`Date`、`RegExp`

我们可以在 TypeScript 中将变量定义为这些类型：

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
//这里的变量类型都属于对象
```

#### DOM和BOM的内置对象

包括但不限于：`Document`、`HTMLElement`、`Event`、`NodeList`

在TypeScript也经常使用到

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

## 进阶

### Type

Type是TypeScript中的一个关键字，主要有两个作用

- **类型别名** --- 用来给一个类型起个名字，多用于联合类型

  ```typescript
  type Name = Name | NameResolver;
  //相当于联合类型 Name | NameResolver 就可以用 Name来表示
  ```

- **字符串字面量** --- 用来约束取值只能是给定的字符串中的一个

  ```typescript
  type EventNames = 'click' | 'scroll' | 'mousemove';
  function handleEvent(ele: Element, event: EventNames) {
      // do something
  }

  handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
  handleEvent(document.getElementById('world'), 'dblclick');
  // 报错，event也就是EventNames 不能为 'dblclick'
  ```

### 元组（Tuple）

TypeScript里的元组和 Python里面的元组有所不同。Python里面的元组用`()`创建，且一旦创建就不可修改。而`TypeScript`中的元组就只是一个**可以多个数据类型并存的数组，当然，存在的数据类型也是要提前定义的，类似于联合类型**

**一个简单的元组创建**

```typescript
let name: [string, number] = ['Tom', 25];
//注意：这里只给了两个元素的类型，所以元组里面只能有两个元素（但是后续可以向数组中push新元素，新元素的类型被限制为元组所定义的类型），且这两个元素的数据类型是string和number，同时要一一对应，第一个是string，第二个是number，否则会报错
```

### 枚举（Enum）

枚举被用于**取值被限定在一定范围内的场景**，比如一年只有四季、人的性别等等

#### 语法

```typescript
enum Year {spring, summer, autumn, winter}
//用enum关键字定义，元素用大括号包裹起来，名称与大括号之间什么都没有
```

枚举成员**会被赋值为从 0 开始递增的数字**，同时也会对枚举值到枚举名进行反向映射。也就是说，访问枚举成员，就是数组索引的方式访问，不过要注意枚举成员也是可以手动赋值的

```typescript
//默认情况，可以按照从0递增的索引访问
//注意：枚举没有length属性
for(let i = 0; i < 4; i++) {
    console.log(Year[i]);
    //spring
    //summer
    //autumn
    //winter
}
```

#### 手动赋值

```typescript
enum Year {spring = 5, summer = 1, autumn, winter}
for(let i = 0; i < 4; i++) {
    console.log(Year[i]);
    //undefined
    //summer
    //autumn
    //winter
}
//未手动赋值的枚举项会接着上一个枚举项递增，步长为1
```

#### 常数项和计算所得项

常数项：**未手动赋值或赋值的是一个常数的元素**，称为常数项

计算所得项：**手动赋值的是一个需要计算的式子**，这种称为计算所得项

```typescript
enum Color {Red, Green, Blue = "blue".length};
console.log(Color["Blue"]); //4
console.log(Color[4]); //Blue
```

注意：**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**

```typescript
enum Color {Red, Green, Blue = "blue".length, Yellow};
//报错：Enum member must have initializer
//Enum成员必须有初始值
```

### 类（Class）

类定义了**一件事物的抽象特点**，包含它的属性和方法

#### 与类相关的术语及其定义

- 对象（Object）：**类的实例**，通过`new`实例化后生成
- 面向对象的三大特性：`封装`、`继承`、`多态`
  - 封装：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用时不需要也无法知道细节，就能通过提供的接口来访问该对象，同时也保证了内部数据的独立、完整
  - 继承（**extends**）：子类继承父类，子类拥有父类的所有特性（方法、属性），在此基础上，还有一些更细化的特性
  - 多态：由继承而产生的相关但不同的类，它们对同一个方法可以有不同的响应状态
- 抽象类：提供给其他类继承的祖宗类，**抽象类不允许被实例化**。抽象类中的抽象方法必须在子类中实现
- 接口：不同类之间共同包含的公共属性或方法，可以将其抽象成一个接口。接口可以被类实现（**implements**）。一个类只能继承一个类，但能同时实现多个接口
- 修饰符：修饰符是一些**关键字**，用于**限定成员或类型的性质**。比如`public`表示该属性或方法是公共的

#### 继承

在TypeScript里，我们可以使用常用的**面向对象模式**。 基于类的程序设计中一种最基本的模式是**允许使用继承来扩展现有的类**

```typescript
class Animal {
    move(distanceMeters: number = 0) {
        console.log(`Animal moved ${distanceMeters}米.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
    move(distanceMeters = 45) {
        console.log("Galloping...");
        super.move(distanceMeters);
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);

// Woof! Woof!
// Galloping...
// Animal moved 10米.
```

这个例子展示了最基本的继承：**类从父类中继承了属性和方法**。**子类还可以重写父类的方法**，这里`Dog`重写了从`Animal`继承来的`move`方法，使得`move`方法根据不同的类而具有不同的功能

#### 修饰符

##### public

`public`是**默认值**，用public修饰的属性或方法，是公有的，可以被我们自由的访问

##### private

用`private`标记的成员，是私有的，它就**不能在除了声明它的类的其他地方访问了**

```typescript
class Human {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Human("Lesedi").name;
//Property 'name' is private and only accessible within class 'Human'
//大意为：name是私有的，这是非法访问
```

##### protected

`protected`修饰符与`private`修饰符的行为很相似，但有一点不同，`protected`成员在子类是可以被访问的

##### readonly

readonly关键字将属性设置为**只读**的。只读属性**必须在声明时或构造函数里被初始化，且只读属性不允许在已经初始化后再进行修改**

#### 存取器

TypeScript支持通过`getters`/`setters`来截取对对象成员的访问。它能帮助我们有效的控制对对象成员的访问

```typescript
class Employee {
    private _fullName: string;

    //修改私有变量_fullName的值，也就是更新员工的名字
    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        //验证密码是否正确
        if (passcode && passcode == "secret passcode") {
            //密码正确，则用更改后的名字替换之前的名字
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

这段代码的作用是：根据密码的正确与否，来判断是否有权限去修改员工名。密码正确则输出更改后的员工名，密码错误则打印错误信息

#### 静态属性

前面我们只讨论了**类的实例成员**，也就是**那些在实例化的时候才会被初始化的属性**。其实类还拥有**静态成员**，这些属性**存在于类的本身上，而不是类的实例上**。

```typescript
class Grid {
    //静态属性origin
    static origin = {x: 1, y: 1};
    //一个方法
    DistanceFromOrigin(point: {x: number; y: number;}) {
        //Grid.origin.x访问静态属性的语法格式 ---> 类名.静态属性名.键
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return xDist * xDist + yDist * yDist
    }
}
//实例化对象
let grid1 = new Grid();
let grid2 = new Grid();

console.log(grid1.DistanceFromOrigin({x: 10, y: 10}));	//162
console.log(grid2.DistanceFromOrigin({x: 9, y: 8}));	//128
```

在这个例子中，我们使用`static`关键字定义了`origin`。每个实例想要访问这个属性的时候，都要在origin前面加上类名 ---> `Grid.origin`

##### 应用场景

当一个属性是一个类的**所有实例化对象都需要用到**的时候，这个属性就可以被定义成静态属性。

#### 抽象类

抽象类做为其它派生类的基类使用。 它们**一般不会直接被实例化**。 不同于接口，**抽象类可以包含成员的实现细节**。 `abstract`关键字是用于定义抽象类和在抽象类内部定义**抽象方法**。

```typescript
abstract class City {
    //抽象类中的抽象方法，必须在子类中实现，类似与接口
    abstract makeMoney(): void;
    //抽象类中的普通方法，则没这个规则
    move(): void {
        //抽象类中的方法可以包含成员实现的细节，这是接口所不能实现的
        console.log("城市的发展很快...");
    }
}

class modelCity extends City {
    makeMoney() {
        console.log("makeMoney day by day~~~");
    }

}

let chengDu = new modelCity
chengDu.move()
chengDu.makeMoney()
```

注意：抽象类中的抽象方法和接口一样，是不能包含具体实现细节的。

```typescript
abstract makeMoney(): void;
//如果试图给抽象类的抽象方法添加具体实现，会报错
// Method 'makeMoney' cannot have an implementation because it is marked abstract
//大意是：这个方法是抽象方法，是不能包含具体实现的
```

#### 构造函数(没咋理解)

构造函数 ，是一种特殊的方法。主要用来在**创建对象时初始化对象， 即为对象成员变量赋初始值**。构造方法**只在实例化的时候调用，并且只调用一次**

```typescript
class bicycle {
    //当构造函数有参数的时候，在实例化的时候也需要有与之对应的实参
    constructor(public name: string, public distance: number) {
        console.log(this.name + '骑了' + this.distance + '公里');
    }
    cateGory() {
        console.log('摩拜','美团','哈罗');
    }
}

let travel = new bicycle('lesedi',3.8)
travel.cateGory()
```

注意：构造函数中的属性必须给予**修饰符**（public、private...）

### 接口（Interface）

接口**是一系列抽象方法的声明，是一些方法特征的集合**，这些方法都应该是抽象的，需要由具体的类去实现

通俗来讲，接口有两个作用

- 用于对「**对象的形状**（Shape）」进行描述
- 另一个作用，对**类的一部分行为进行抽象**

接口是具有**约束作用**的，定义的类或是变量，比接口少了、多了一些方法或是属性都是不被允许的

#### 接口的属性分类

##### 可选属性

属性名字定义的后面加一个`?`符号，该属性即被定义为了可选属性

可选属性的好处之一是可以**对可能存在的属性进行预定义**，好处之二是**可以捕获引用了不存在的属性时的错误**

```typescript
interface Human {
    //？表示该属性是可选的
    Height? : number
    weight? : number
}
```

##### 只读属性

一些对象属性**只能在对象刚刚创建的时候修改其值，称之为只读属性**。 你可以在属性名前用`readonly`来指定只读属性

```typescript
interface Human {
    Height? : number
    weight? : number
    //readonly代表该属性为只读属性
    readonly age : number
}
```

```typescript
let Lesedi : Human = {
    Height: 1.88,
    //name：xxx, //接口不存在的属性，定义是不被允许的
    age: 21
}
Lesedi.age = 18
//如果在创建过后，再度修改只读属性的值的话，会报错
//Cannot assign to 'age' because it is a read-only property.
```

### 泛型（Generics）

泛型是强类型语言中比较重要的概念，使用泛型可以帮助我们**提高代码的复用性**。泛型是通过`<>`尖括号来表示的。尖括号中的字符被称为**类型变量**，用来表示类型。它的官方解释为：

> 泛型允许程序员在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明类型

注意：泛型不同于any（任意类型）用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的，泛型可以**控制返回值的类型与传入参数的类型是相同的，不会丢失信息**。

```typescript
//一个简单的泛型函数
// T在这里仅仅是个占位符，只不过大家都约定俗成的用T来占位
function identity<T>(arg: T): T {
    return arg;
}

let p = identity('111')
let p1 = identity(111)
let p2 = identity(true)
console.log(typeof(p), typeof(p1), typeof(p2));
//string number boolean
```

代码中的类型T，在没有调用identity函数的时候是不确定的，只有在调用方法之后，我们才能明确知道T代表的是什么类型，**我们给他传入什么类型，它就给我们返回什么类型**，这样数据就可以对应上了

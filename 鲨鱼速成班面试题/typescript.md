
[TOC]

***

目录

***

### 一、TypeScript 是什么

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。下图显示了 TypeScript 与 ES5、ES2015 和 ES2016 之间的关系：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c94329b2784b30bcc3c7bf429dd2d5\~tplv-k3u1fbpfcp-zoom-1.image)

#### 为什么需要TypeScript?

简单来说就是因为JavaScript是弱类型, 很多错误只有在运行时才会被发现
而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误

#### 1.1 TypeScript 与 JavaScript 的区别

| TypeScript                    | JavaScript                   |
| ----------------------------- | ---------------------------- |
| JavaScript 的超集用于解决大型项目的代码复杂性  | 一种脚本语言，用于创建动态网页。             |
| 可以在编译期间发现并纠正错误                | 作为一种解释型语言，只能在运行时发现错误         |
| 强类型，支持静态和动态类型                 | 弱类型，没有静态类型选项                 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用                  |
| 支持模块、泛型和接口                    | 不支持模块，泛型或接口                  |
| 支持 ES3，ES4，ES5 和 ES6 等        | 不支持编译其他 ES3，ES4，ES5 或 ES6 功能 |
| 社区的支持仍在增长，而且还不是很大             | 大量的社区支持以及大量文档和解决问题的支持        |

#### 1.2 获取 TypeScript

命令行的 TypeScript 编译器可以使用 Node.js 包来安装。

**1.安装 TypeScript**

    $ npm install -g typescript  // 全局安装 ts

不记得自己是否已经安装过 typescript 的，可以使用以下命令来验证：

    tsc -v 

如果出现版本，则说明已经安装成功

    Version 4.9.4

**2.编译 TypeScript 文件**

生成 tsconfig.json 配置文件

    tsc --init

执行命令后我们就可以看到生成了一个 tsconfig.json 文件，里面有一些配置信息，我们暂时先按下不表

在我们`helloworld.ts`文件中,随便写点什么

    const s:string = "彼时彼刻，恰如此时此刻";
    console.log(s);

控制台执行 `tsc helloworld.ts` 命令，目录下生成了一个同名的 helloworld.js 文件，代码如下

    var s = "彼时彼刻，恰如此时此刻";
    console.log(s);

通过tsc命令，发现我们的typescript代码被转换成了熟悉的js代码

我们接着执行

    node helloworld.js

即可看到输出结果

当然，对于刚入门 TypeScript 的小伙伴，也可以不用安装 `typescript`，而是直接使用线上的 TypeScript Playground 来学习新的语法或新特性。

> TypeScript Playground：<https://www.typescriptlang.org/play/>

备注：

1.  定义任何东西的时候要注明类型
2.  调用任何东西的时候要检查类型

#### 1.3.安装ts-node

那么通过我们上面的一通操作，我们知道了运行tsc命令就可以编译生成一个js文件，但是如果每次改动我们都要手动去执行编译，然后再通过 node命令才能查看运行结果岂不是太麻烦了。

而 ts-node 正是来解决这个问题的

    npm i -g ts-node // 全局安装ts-node

有了这个插件，我们就可以直接运行.ts文件了

    ts-node index.ts 

### 二、基本类型

*   类型：

    |    类型   |        例子        |        描述        |
    | :-----: | :--------------: | :--------------: |
    |  number |    1, -33, 2.5   |       任意数字       |
    |  string | 'hi', "hi", `hi` |       任意字符串      |
    | boolean |    true、false    |   布尔值true或false  |
    |   字面量   |        其本身       |  限制变量的值就是该字面量的值  |
    |   any   |        \*        |       任意类型       |
    | unknown |        \*        |     类型安全的any     |
    |   void  |   空值（undefined）  |  没有值（或undefined） |
    |  never  |        没有值       |      不能是任何值      |
    |  object |   {name:'孙悟空'}   |      任意的JS对象     |
    |  array  |     \[1,2,3]     |      任意JS数组      |
    |  tuple  |      \[4,5]      | 元素，TS新增类型，固定长度数组 |
    |   enum  |    enum{A, B}    |    枚举，TS中新增类型    |

#### 2.1 Number 类型

    let count: number = 10;
    // ES5：var count = 10;

#### 2.2 String 类型

    let str: string = "hi";
    // ES5：var str = 'hi';

#### 2.3 Boolean 类型

    let isDone: boolean = false;
    // ES5：var isDone = false;

#### 2.4 字面量 类型

也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

    let color: 'red' | 'blue' | 'black';
    let num: 1 | 2 | 3 | 4 | 5;

#### 2.5 any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型.

如果是一个普通类型，在赋值过程中改变类型是不被允许的：

    let a: string = 'seven';
    a = 7;
    // TS2322: Type 'number' is not assignable to type 'string'.

但如果是 `any` 类型，则允许被赋值为任意类型。

    let a: any = 666;
    a = "Semlinker";
    a = false;
    a = 66
    a = undefined
    a = null
    a = []
    a = {}

在any上访问任何属性都是允许的,也允许调用任何方法.

    let anyThing: any = 'hello';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName);
    let anyThing: any = 'Tom';
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
    anyThing.myName.setFirstName('Cat');

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**：

    let something;
    something = 'seven';
    something = 7;

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，`any 是魔鬼！`尽量不要用any。

为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。

#### 2.6 unknown 类型

`unknown`与`any`一样，所有类型都可以分配给`unknown`:

    let notSure: unknown = 4;
    notSure = "maybe a string instead"; // OK
    notSure = false; // OK

`unknown`与`any`的最大区别是： 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。`unknown` 任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`

    let notSure1: unknown = 4;
    let uncertain1: any = notSure1; // OK
    
    let notSure2: any = 4;
    let uncertain2: unknown = notSure2; // OK
    
    let notSure3: unknown = 4;
    let uncertain3: number = notSure3; // Error
    
    let notSure4: any = 4;
    let uncertain4: number = notSure4; // OK

如果不缩小类型，就无法对`unknown`类型执行任何操作：

    function getDog() {
     return '123'
    }
     
    const dog: unknown = {hello: getDog};
    dog.hello(); // Error

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用`typeof`、`类型断言`等方式来缩小未知范围：

    function getDogName() {
     let x: unknown;
     return x;
    };
    const dogName = getDogName();
    // 直接使用
    const upName = dogName.toLowerCase(); // Error
    // typeof
    if (typeof dogName === 'string') {
      const upName = dogName.toLowerCase(); // OK
    }
    // 类型断言 
    const upName = (dogName as string).toLowerCase(); // OK

#### 2.7 void  类型

void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void

声明一个 void 类型的变量没有什么作用，因为它的值只能为 `undefined` 或 `null`（在`strictNullChecks`未指定为true时）, 一般也只有在函数没有返回值时去声明

```
let unusable: void = undefined;
let a: void; 
let b: number = a; // Error

let c:void = undefined // 编译正确
let d:void = null // 编译错误

// 声明函数返回值为void  
function warnUser(): void {  
  console.log("This is my warning message");  
}

// 方法没有返回值将得到`undefined`，但是我们需要定义成`void`类型，而不是`undefined`类型。否则将报错
function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error

```

#### 2.8 Never 类型

`never` 类型表示的是那些永不存在的值的类型。 例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
      throw new Error(message);
    }
    
    function infiniteLoop(): never {
      while (true) {}
    }

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

    type Foo = string | number;
    
    function controlFlowAnalysisWithNever(foo: Foo) {
      if (typeof foo === "string") {
        // 这里 foo 被收窄为 string 类型
      } else if (typeof foo === "number") {
        // 这里 foo 被收窄为 number 类型
      } else {
        // foo 在这里是 never
        const check: never = foo;
      }
    }

注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：

    type Foo = string | number | boolean;

然而他忘记同时修改 `controlFlowAnalysisWithNever` 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 `boolean` 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保`controlFlowAnalysisWithNever` 方法总是穷尽了 Foo 的所有可能类型。 通过这个示例，我们可以得出一个结论：**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**

#### 2.9  Null 和 Undefined 类型

TypeScript 里，`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`。

    let u: undefined = undefined;
    let n: null = null;

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。**然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。**

#### 2.10 Array 类型

```
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];

// 定义联合类型数组
let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr = [1, 'b', 2, 'c'];

// 定义指定对象成员的数组：
// interface是接口,后面会讲到
interface Arrobj{
    name:string,
    age:number
}
let arr:Arrobj[]=[{name:'jimmy',age:22}]

```

#### 2.11 元组 Tuple 类型

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
元组最重要的特性是可以限制`数组元素的个数和类型`，它特别适合用来实现多值返回。

    let x: [string, number]; 
    // 类型必须匹配且个数必须为2
    
    x = ['hello', 10]; // OK 
    x = ['hello', 10,10]; // Error 
    x = [10, 'hello']; // Error

#### 2.12 object  类型

*   object object 类型用于表示所有的非原始类型，即我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。



    let object: object;
    object = 1; // 报错
    object = "a"; // 报错
    object = true; // 报错
    object = null; // 报错
    object = undefined; // 报错
    object = {}; // 编译正确

*   Object

大 Object 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)

    let bigObject: Object;
    object = 1; // 编译正确
    object = "a"; // 编译正确
    object = true; // 编译正确
    object = null; // 报错
    ObjectCase = undefined; // 报错
    ObjectCase = {}; // ok
    复制代码

*   {}

{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合

#### 2.13 Enum 类型

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript 支持数字的和基于字符串的枚举。

**1.数字枚举**

NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3

    enum Direction {
      NORTH,
      SOUTH,
      EAST,
      WEST,
    }
    
    let dir: Direction = Direction.NORTH;

**2.字符串枚举**

在 TypeScript 2.4 版本，允许我们使用字符串枚举。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

    enum Direction {
      NORTH = "NORTH",
      SOUTH = "SOUTH",
      EAST = "EAST",
      WEST = "WEST",
    }

**3.异构枚举**

异构枚举的成员值是数字和字符串的混合：

    enum Enum {
      A,
      B,
      C = "C",
      D = "D",
      E = 8,
      F,
    }

### 三、类型推论

    {
      let str: string = 'this is string';
      let num: number = 1;
      let bool: boolean = true;
    }
    {
      const str: string = 'this is string';
      const num: number = 1;
      const bool: boolean = true;
    }

看着上面的示例，可能你已经在嘀咕了：定义基础类型的变量都需要写明类型注解，TypeScript 太麻烦了吧？在示例中，使用 let 定义变量时，我们写明类型注解也就罢了，毕竟值可能会被改变。可是，使用 `const` 常量时还需要写明类型注解，那可真的很麻烦。

实际上，TypeScript 早就考虑到了这么简单而明显的问题。

在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解。因此，上面的示例可以简化为如下所示内容：

    {
      let str = 'this is string'; // 等价 let str: string = 'this is string'; 下面类似
      let num = 1; // 等价
      let bool = true; // 等价
    }
    {
      const str = 'this is string'; // 不等价
      const num = 1; // 不等价
      const bool = true; // 不等价
    }
    复制代码

我们把 TypeScript 这种基于赋值表达式推断类型的能力称之为`类型推断`。

在 TypeScript 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。比如我们能根据 return 语句推断函数返回的类型，如下代码所示：

    {
      /** 根据参数的类型，推断出返回值的类型也是 number */
      function add1(a: number, b: number) {
        return a + b;
      }
      const x1= add1(1, 1); // 推断出 x1 的类型也是 number
      
      /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
      function add2(a: number, b = 1) {
        return a + b;
      }
      const x2 = add2(1);
      const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
    }
    复制代码

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：

    let myFavoriteNumber;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;

指编程语言中能够自动推导出值的类型的能力 它是一些强静态类型语言中出现的特性 定义时未赋值就会推论成 `any` 类型 如果定义的时候就赋值就能利用到类型推论

    let flag; //推断为any
    let count = 123; //为number类型
    let hello = "hello"; //为string类型
    复制代码

### 四、 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种 未赋值时联合类型上只能访问两个类型共有的属性和方法

    let name: string | number;
    console.log(name.toString());
    name = 1;
    console.log(name.toFixed(2));
    name = "hello";
    console.log(name.length);
    复制代码

### 五、 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译（这一招很关键 有时候可以帮助你解决很多编译报错）

类型断言有两种形式：

    // 尖括号 语法
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    
    // as 语法
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    复制代码

> 以上两种方式虽然没有任何区别，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。

**非空断言** 在上下文中当类型检查器无法断定类型时 一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 `null` 和非 `undefined` 类型

    let flag: null | undefined | string;
    flag!.toString(); // ok
    flag.toString(); // error
    复制代码

### 六、字面量类型

在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。 目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：

    let flag1: "hello" = "hello";
    let flag2: 1 = 1;
    let flag3: true = true;
    复制代码

### 七、 类型别名

类型别名用来给一个类型起个新名字

    type flag = string | number;
    
    function hello(value: flag) {}
    复制代码

### 八、 交叉类型

交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

    type Flag1 = { x: number };
    type Flag2 = Flag1 & { y: string };
    
    let flag3: Flag2 = {
      x: 1,
      y: "hello",
      henb,
    };
    复制代码

### 九、 类型保护

类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型 其主要思想是尝试检测属性、方法或原型，以确定如何处理值

**typeof 类型保护**

    function double(input: string | number | boolean) {
      if (typeof input === "string") {
        return input + input;
      } else {
        if (typeof input === "number") {
          return input * 2;
        } else {
          return !input;
        }
      }
    }
    复制代码

**in 关键字**

    interface Bird {
      fly: number;
    }
    
    interface Dog {
      leg: number;
    }
    
    function getNumber(value: Bird | Dog) {
      if ("fly" in value) {
        return value.fly;
      }
      return value.leg;
    }
    复制代码

**instanceof 类型保护**

    class Animal {
      name!: string;
    }
    class Bird extends Animal {
      fly!: number;
    }
    function getName(animal: Animal) {
      if (animal instanceof Bird) {
        console.log(animal.fly);
      } else {
        console.log(animal.name);
      }
    }
    复制代码

**自定义类型保护**

通过 `type is xxx`这样的类型谓词来进行类型保护

例如下面的例子 `value is object`就会认为如果函数返回 true 那么定义的 value 就是 object 类型

    function isObject(value: unknown): value is object {
      return typeof value === "object" && value !== null;
    }
    
    function fn(x: string | object) {
      if (isObject(x)) {
        // ....
      } else {
        // .....
      }
    }
    复制代码

### 十、函数

#### 函数声明

    function add(x: number, y: number): number {
      return x + y;
    }


    function hello(name: string): void {
      console.log("hello", name);
    }

#### 函数表达式

    const add = function(x: number, y: number): number {
      return x + y;
    }
    复制代码

#### 接口定义函数

    interface Add {
      (x: number, y: number): number;
    }
    复制代码

#### 可选参数

    function add(x: number, y?: number): number {
      return y ? x + y : x;
    }
    复制代码

#### 默认参数

    function add(x: number, y: number = 0): number {
      return x + y;
    }
    复制代码

#### 剩余参数

    function add(...numbers: number[]): number {
      let sum = 0;
      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    }
    复制代码

#### 函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

    function add(x: number, y: number): number;
    function add(x: string, y: string): string;
    function add(x: any, y: any): any {
      return x + y;
    }

上面示例中，我们给同一个函数提供多个函数类型定义，从而实现函数的重载

需要注意的是:

> 函数重载真正执行的是同名函数最后定义的函数体 在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型

### 十一、类

##### 4.1 类的定义

在 TypeScript 中，我们可以通过 `Class` 关键字来定义一个类

    class Person {
      name!: string; //如果初始属性没赋值就需要加上!
      constructor(_name: string) {
        this.name = _name;
      }
      getName(): void {
        console.log(this.name);
      }
    }
    let p1 = new Person("hello");
    p1.getName();
    复制代码

当然 如果我们图省事 我们也可以把属性定义直接写到构造函数的参数里面去(不过一般不建议这样写 因为会让代码增加阅读难度)

    class Person {
      constructor(public name: string) {}
      getName(): void {
        console.log(this.name);
      }
    }
    let p1 = new Person("hello");
    p1.getName();
    复制代码

> 注意：当我们定义一个类的时候,会得到 **2 个类型** 一个是构造函数类型的函数类型(当做普通构造函数的类型) 另一个是类的实例类型（代表实例）

具体看例子

    class Component {
      static myName: string = "静态名称属性";
      myName: string = "实例名称属性";
    }
    //ts 一个类型 一个叫值
    //放在=后面的是值
    let com = Component; //这里是代表构造函数
    //冒号后面的是类型
    let c: Component = new Component(); //这里是代表实例类型
    let f: typeof Component = com;
    复制代码

##### 4.2 存取器

在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为

    class User {
      myname: string;
      constructor(myname: string) {
        this.myname = myname;
      }
      get name() {
        return this.myname;
      }
      set name(value) {
        this.myname = value;
      }
    }
    
    let user = new User("hello");
    user.name = "world";
    console.log(user.name);
    复制代码

其实我们可以看看翻译成 es5 的代码 原理很简单 就是使用了 Object.defineProperty 在类的原型上面拦截了属性对应的 get 和 set 方法

    var User = /** @class */ (function () {
      function User(myname) {
        this.myname = myname;
      }
      Object.defineProperty(User.prototype, "name", {
        get: function () {
          return this.myname;
        },
        set: function (value) {
          this.myname = value;
        },
        enumerable: false,
        configurable: true,
      });
      return User;
    })();
    var user = new User("hello");
    user.name = "world";
    console.log(user.name);
    复制代码

##### 4.3 readonly 只读属性

readonly 修饰的变量只能在**构造函数**中初始化 TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly readonly 实际上只是在编译阶段进行代码检查。

    class Animal {
      public readonly name: string;
      constructor(name: string) {
        this.name = name;
      }
      changeName(name: string) {
        this.name = name; //这个ts是报错的
      }
    }
    
    let a = new Animal("hello");
    复制代码

##### 4.4 继承

子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性

将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑

super 可以调用父类上的方法和属性

在 TypeScript 中，我们可以通过 extends 关键字来实现继承

    class Person {
      name: string; //定义实例的属性，默认省略public修饰符
      age: number;
      constructor(name: string, age: number) {
        //构造函数
        this.name = name;
        this.age = age;
      }
      getName(): string {
        return this.name;
      }
      setName(name: string): void {
        this.name = name;
      }
    }
    class Student extends Person {
      no: number;
      constructor(name: string, age: number, no: number) {
        super(name, age);
        this.no = no;
      }
      getNo(): number {
        return this.no;
      }
    }
    let s1 = new Student("hello", 10, 1);
    console.log(s1);
    复制代码

##### 4.5 类里面的修饰符

**public** 类里面 子类 其它任何地方外边都可以访问 **protected** 类里面 子类 都可以访问,其它任何地方不能访问 **private** 类里面可以访问，子类和其它任何地方都不可以访问

    class Parent {
      public name: string;
      protected age: number;
      private car: number;
      constructor(name: string, age: number, car: number) {
        //构造函数
        this.name = name;
        this.age = age;
        this.car = car;
      }
      getName(): string {
        return this.name;
      }
      setName(name: string): void {
        this.name = name;
      }
    }
    class Child extends Parent {
      constructor(name: string, age: number, car: number) {
        super(name, age, car);
      }
      desc() {
        console.log(`${this.name} ${this.age} ${this.car}`); //car访问不到 会报错
      }
    }
    
    let child = new Child("hello", 10, 1000);
    console.log(child.name);
    console.log(child.age); //age访问不到 会报错
    console.log(child.car); //car访问不到 会报错
    复制代码

##### 4.6 静态属性 静态方法

类的静态属性和方法是直接定义在类本身上面的 所以也只能通过直接调用类的方法和属性来访问

    class Parent {
      static mainName = "Parent";
      static getmainName() {
        console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
        return this.mainName;
      }
      public name: string;
      constructor(name: string) {
        //构造函数
        this.name = name;
      }
    }
    console.log(Parent.mainName);
    console.log(Parent.getmainName());
    复制代码

##### 4.7 抽象类和抽象方法

抽象类，无法被实例化，只能被继承并且无法创建抽象类的实例 子类可以对抽象类进行不同的实现

抽象方法只能出现在抽象类中并且抽象方法不能在抽象类中被具体实现，只能在抽象类的子类中实现（必须要实现）

使用场景： 我们一般用抽象类和抽象方法抽离出事物的共性 以后所有继承的子类必须按照规范去实现自己的具体逻辑 这样可以增加代码的可维护性和复用性

使用 `abstract` 关键字来定义抽象类和抽象方法

    abstract class Animal {
      name!: string;
      abstract speak(): void;
    }
    class Cat extends Animal {
      speak() {
        console.log("喵喵喵");
      }
    }
    let animal = new Animal(); //直接报错 无法创建抽象类的实例
    let cat = new Cat();
    cat.speak();
    复制代码

> 思考 1:重写(override)和重载(overload)的区别

**重写**是指子类重写继承自父类中的方法 **重载**是指为同一个函数提供多个类型定义

    class Animal {
      speak(word: string): string {
        return "动物:" + word;
      }
    }
    class Cat extends Animal {
      speak(word: string): string {
        return "猫:" + word;
      }
    }
    let cat = new Cat();
    console.log(cat.speak("hello"));
    // 上面是重写
    //--------------------------------------------
    // 下面是重载
    function double(val: number): number;
    function double(val: string): string;
    function double(val: any): any {
      if (typeof val == "number") {
        return val * 2;
      }
      return val + val;
    }
    
    let r = double(1);
    console.log(r);
    复制代码

> 思考 2:什么是**多态**

在父类中定义一个方法，在子类中有多个实现，在程序运行的时候，根据不同的对象执行不同的操作，实现运行时的绑定。

    abstract class Animal {
      // 声明抽象的方法，让子类去实现
      abstract sleep(): void;
    }
    class Dog extends Animal {
      sleep() {
        console.log("dog sleep");
      }
    }
    let dog = new Dog();
    class Cat extends Animal {
      sleep() {
        console.log("cat sleep");
      }
    }
    let cat = new Cat();
    let animals: Animal[] = [dog, cat];
    animals.forEach((i) => {
      i.sleep();
    });
    复制代码

### 十二、接口

接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

#### 1 对象的形状

    //接口可以用来描述`对象的形状`
    //接口可以用来描述`对象的形状`
    interface Speakable {
      speak(): void;
      readonly lng: string; //readonly表示只读属性 后续不可以更改
      name?: string; //？表示可选属性
    }
    
    let speakman: Speakable = {
      //   speak() {}, //少属性会报错
      name: "hello",
      lng: "en",
      age: 111, //多属性也会报错
    };
    复制代码

#### 2 行为的抽象

接口可以把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类

一个类可以实现多个接口，一个接口也可以被多个类实现

我们用 `implements`关键字来代表 实现

    //接口可以在面向对象编程中表示为行为的抽象
    interface Speakable {
      speak(): void;
    }
    interface Eatable {
      eat(): void;
    }
    //一个类可以实现多个接口
    class Person implements Speakable, Eatable {
      speak() {
        console.log("Person说话");
      }
      //   eat() {} //需要实现的接口包含eat方法 不实现会报错
    }
    复制代码

#### 3 定义任意属性

如果我们在定义接口的时候无法预先知道有哪些属性的时候,可以使用 `[propName:string]:any`,propName 名字是任意的

    interface Person {
      id: number;
      name: string;
      [propName: string]: any;
    }
    
    let p1 = {
      id: 1,
      name: "hello",
      age: 10,
    };
    复制代码

这个接口表示 必须要有 id 和 name 这两个字段 然后还可以新加其余的未知字段

#### 4 接口的继承

我们除了类可以继承 接口也可以继承 同样的使用 `extends`关键字

    interface Speakable {
      speak(): void;
    }
    interface SpeakChinese extends Speakable {
      speakChinese(): void;
    }
    class Person implements SpeakChinese {
      speak() {
        console.log("Person");
      }
      speakChinese() {
        console.log("speakChinese");
      }
    }
    复制代码

##### 5 函数类型接口

可以用接口来定义函数类型

    interface discount {
      (price: number): number;
    }
    let cost: discount = function (price: number): number {
      return price * 0.8;
    };
    复制代码

#### 6 构造函数的类型接口

使用特殊的 new()关键字来描述类的构造函数类型

    class Animal {
      constructor(public name: string) {}
    }
    //不加new是修饰函数的,加new是修饰类的
    interface WithNameClass {
      new (name: string): Animal;
    }
    function createAnimal(clazz: WithNameClass, name: string) {
      return new clazz(name);
    }
    let a = createAnimal(Animal, "hello");
    console.log(a.name);
    复制代码

其实这样的用法一般出现在 当我们需要把一个类作为参数的时候 我们需要对传入的类的构造函数类型进行约束 所以需要使用 new 关键字代表是类的构造函数类型 用以和普通函数进行区分

***

> 思考：接口和类型别名的区别 这个题目是经典的 **ts 面试题**

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

1.基础数据类型 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组

    // primitive
    type Name = string;
    
    // union
    type PartialPoint = PartialPointX | PartialPointY;
    
    // tuple
    type Data = [number, string];
    
    // dom
    let div = document.createElement("div");
    type B = typeof div;
    复制代码

2.重复定义

接口可以定义多次 会被自动合并为单个接口 类型别名不可以重复定义

    interface Point {
      x: number;
    }
    interface Point {
      y: number;
    }
    const point: Point = { x: 1, y: 2 };
    复制代码

3.扩展 接口可以扩展类型别名，同理，类型别名也可以扩展接口。但是两者实现扩展的方式不同

接口的扩展就是继承，通过 extends 来实现。类型别名的扩展就是交叉类型，通过 & 来实现。

    // 接口扩展接口
    interface PointX {
      x: number;
    }
    
    interface Point extends PointX {
      y: number;
    }
    // ----
    // 类型别名扩展类型别名
    type PointX = {
      x: number;
    };
    
    type Point = PointX & {
      y: number;
    };
    // ----
    // 接口扩展类型别名
    type PointX = {
      x: number;
    };
    interface Point extends PointX {
      y: number;
    }
    // ----
    // 类型别名扩展接口
    interface PointX {
      x: number;
    }
    type Point = PointX & {
      y: number;
    };
    复制代码

4.实现 这里有一个特殊情况 类无法实现定义了联合类型的类型别名

    type PartialPoint = { x: number } | { y: number };
    
    // A class can only implement an object type or
    // intersection of object types with statically known members.
    class SomePartialPoint implements PartialPoint {
      // Error
      x = 1;
      y = 2;
    }

### 十三、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

为了更好的了解泛型的作用 我们可以看下面的一个例子

    function createArray(length: number, value: any): any[] {
      let result = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }
    
    createArray(3, "x"); // ['x', 'x', 'x']
    复制代码

上述这段代码用来生成一个长度为 length 值为 value 的数组 但是我们其实可以发现一个问题 不管我们传入什么类型的 value 返回值的数组永远是 any 类型 如果我们想要的效果是 我们预先不知道会传入什么类型 但是我们希望不管我们传入什么类型 我们的返回的数组的指里面的类型应该和参数保持一致 那么这时候 泛型就登场了

使用**泛型**改造

    function createArray<T>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }
    
    createArray<string>(3, "x"); // ['x', 'x', 'x']
    复制代码

我们可以使用<>的写法 然后再面传入一个变量 T 用来表示后续函数需要用到的类型 当我们真正去调用函数的时候再传入 T 的类型就可以解决很多预先无法确定类型相关的问题

#### 6.1 多个类型参数

如果我们需要有多个未知的类型占位 那么我们可以定义任何的字母来表示不同的类型参数

    function swap<T, U>(tuple: [T, U]): [U, T] {
      return [tuple[1], tuple[0]];
    }
    
    swap([7, "seven"]); // ['seven', 7]
    复制代码

#### 6.2 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

    function loggingIdentity<T>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
    
    // index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
    复制代码

上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是**泛型约束**

    interface Lengthwise {
      length: number;
    }
    
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
    复制代码

> 注意：我们在泛型里面使用`extends`关键字代表的是泛型约束 需要和类的继承区分开

#### 6.3 泛型接口

定义接口的时候也可以指定泛型

    interface Cart<T> {
      list: T[];
    }
    let cart: Cart<{ name: string; price: number }> = {
      list: [{ name: "hello", price: 10 }],
    };
    console.log(cart.list[0].name, cart.list[0].price);
    复制代码

我们定义了接口传入的类型 T 之后返回的对象数组里面 T 就是当时传入的参数类型

#### 6.4 泛型类

    class MyArray<T> {
      private list: T[] = [];
      add(value: T) {
        this.list.push(value);
      }
      getMax(): T {
        let result = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] > result) {
            result = this.list[i];
          }
        }
        return result;
      }
    }
    let arr = new MyArray();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    let ret = arr.getMax();
    console.log(ret);
    复制代码

上诉例子我们实现了一个在数组里面添加数字并且获取最大值的泛型类

#### 6.5 泛型类型别名

    type Cart<T> = { list: T[] } | T[];
    let c1: Cart<string> = { list: ["1"] };
    let c2: Cart<number> = [1];
    复制代码

##### 6.6 泛型参数的默认类型

我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用

    function createArray<T = string>(length: number, value: T): Array<T> {
      let result: T[] = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }

### 十四、 实用技巧

##### 7.1 typeof 关键词

`typeof` 关键词除了做类型保护 还可以从实现推出类型，

    //先定义变量，再定义类型
    let p1 = {
      name: "hello",
      age: 10,
      gender: "male",
    };
    type People = typeof p1;
    function getName(p: People): string {
      return p.name;
    }
    getName(p1);
    复制代码

上面的例子就是使用 typeof 获取一个变量的类型

##### 7.2 keyof 关键词

`keyof` 可以用来取得一个对象接口的所有 key 值

    interface Person {
      name: string;
      age: number;
      gender: "male" | "female";
    }
    //type PersonKey = 'name'|'age'|'gender';
    type PersonKey = keyof Person;
    
    function getValueByKey(p: Person, key: PersonKey) {
      return p[key];
    }
    let val = getValueByKey({ name: "hello", age: 10, gender: "male" }, "name");
    console.log(val);
    复制代码

##### 7.3 索引访问操作符

使用 \[] 操作符可以进行索引访问

    interface Person {
      name: string;
      age: number;
    }
    
    type x = Person["name"]; // x is string
    复制代码

##### 7.4 映射类型 in

在定义的时候用 in 操作符去批量定义类型中的属性

    interface Person {
      name: string;
      age: number;
      gender: "male" | "female";
    }
    //批量把一个接口中的属性都变成可选的
    type PartPerson = {
      [Key in keyof Person]?: Person[Key];
    };
    
    let p1: PartPerson = {};
    复制代码

##### 7.5 infer 关键字

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
    复制代码

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

##### 7.6 内置工具类型

1.  Exclude\<T,U> 从 T 可分配给的类型中排除 U



    type Exclude<T, U> = T extends U ? never : T;
    
    type E = Exclude<string | number, string>;
    let e: E = 10;
    复制代码

1.  Extract\<T,U> 从 T 可分配给的类型中提取 U



    type Extract<T, U> = T extends U ? T : never;
    
    type E = Extract<string | number, string>;
    let e: E = "1";
    复制代码

1.  NonNullable 从 T 中排除 `null` 和 `undefined`



    type NonNullable<T> = T extends null | undefined ? never : T;
    
    type E = NonNullable<string | number | null | undefined>;
    let e: E = null;
    复制代码

1.  ReturnType `infer` 最早出现在此 PR 中，表示在 `extends` 条件语句中待推断的类型变量



    type ReturnType<T extends (...args: any[]) => any> = T extends (
      ...args: any[]
    ) => infer R
      ? R
      : any;
    function getUserInfo() {
      return { name: "hello", age: 10 };
    }
    
    // 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
    type UserInfo = ReturnType<typeof getUserInfo>;
    
    const userA: UserInfo = {
      name: "hello",
      age: 10,
    };
    复制代码

可见 该工具类型主要是获取函数类型的返回类型

1.  Parameters 该工具类型主要是获取函数类型的参数类型



    type Parameters<T> = T extends (...args: infer R) => any ? R : any;
    
    type T0 = Parameters<() => string>; // []
    type T1 = Parameters<(s: string) => void>; // [string]
    type T2 = Parameters<<T>(arg: T) => T>; // [unknown]
    复制代码

1.  Partial Partial 可以将传入的属性由非可选变为可选



    type Partial<T> = { [P in keyof T]?: T[P] };
    interface A {
      a1: string;
      a2: number;
      a3: boolean;
    }
    type aPartial = Partial<A>;
    const a: aPartial = {}; // 不会报错
    复制代码

1.  Required Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。



    interface Person {
      name: string;
      age: number;
      gender?: "male" | "female";
    }
    /**
     * type Required<T> = { [P in keyof T]-?: T[P] };
     */
    let p: Required<Person> = {
      name: "hello",
      age: 10,
      gender: "male",
    };
    复制代码

1.  Readonly Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。



    interface Person {
      name: string;
      age: number;
      gender?: "male" | "female";
    }
    //type Readonly<T> = { readonly [P in keyof T]: T[P] };
    let p: Readonly<Person> = {
      name: "hello",
      age: 10,
      gender: "male",
    };
    p.age = 11; //error
    复制代码

1.  Pick\<T,K> Pick 能够帮助我们从传入的属性中摘取某些返回



    interface Todo {
      title: string;
      description: string;
      done: boolean;
    }
    /**
     * From T pick a set of properties K
     * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
     */
    type TodoBase = Pick<Todo, "title" | "done">;
    
    // =
    type TodoBase = {
      title: string;
      done: boolean;
    };
    复制代码

1.  Record\<K,T> 构造一个类型，该类型具有一组属性 K，每个属性的类型为 T。可用于将一个类型的属性映射为另一个类型。Record 后面的泛型就是对象键和值的类型。

简单理解：K 对应对应的 key，T 对应对象的 value，返回的就是一个声明好的对象 但是 K 对应的泛型约束是`keyof any` 也就意味着只能传入 `string|number|symbol`

    // type Record<K extends keyof any, T> = {
    // [P in K]: T;
    // };
    type Point = "x" | "y";
    type PointList = Record<Point, { value: number }>;
    const cars: PointList = {
      x: { value: 10 },
      y: { value: 20 },
    };
    复制代码

1.  Omit\<K,T> 基于已经声明的类型进行属性剔除获得新类型



    // type Omit=Pick<T,Exclude<keyof T,K>>
    type User = {
    id: string;
    name: string;
    email: string;
    };
    type UserWithoutEmail = Omit<User, "email">;// UserWithoutEmail ={id: string;name: string;}
    };
    复制代码

### 十五、 TypeScript 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为

常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器

装饰器的写法分为普通装饰器和装饰器工厂

使用@装饰器的写法需要把 tsconfig.json 的 `experimentalDecorators` 字段设置为 true

##### 8.1 类装饰器

类装饰器在类声明之前声明，用来监视、修改或替换类定义

    namespace a {
      //当装饰器作为修饰类的时候，会把构造器传递进去
      function addNameEat(constructor: Function) {
        constructor.prototype.name = "hello";
        constructor.prototype.eat = function () {
          console.log("eat");
        };
      }
      @addNameEat
      class Person {
        name!: string;
        eat!: Function;
        constructor() {}
      }
      let p: Person = new Person();
      console.log(p.name);
      p.eat();
    }
    
    namespace b {
      //还可以使用装饰器工厂 这样可以传递额外参数
      function addNameEatFactory(name: string) {
        return function (constructor: Function) {
          constructor.prototype.name = name;
          constructor.prototype.eat = function () {
            console.log("eat");
          };
        };
      }
      @addNameEatFactory("hello")
      class Person {
        name!: string;
        eat!: Function;
        constructor() {}
      }
      let p: Person = new Person();
      console.log(p.name);
      p.eat();
    }
    
    namespace c {
      //还可以替换类,不过替换的类要与原类结构相同
      function enhancer(constructor: Function) {
        return class {
          name: string = "jiagou";
          eat() {
            console.log("吃饭饭");
          }
        };
      }
      @enhancer
      class Person {
        name!: string;
        eat!: Function;
        constructor() {}
      }
      let p: Person = new Person();
      console.log(p.name);
      p.eat();
    }
    复制代码

##### 8.2 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入 2 个参数 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象 第二个参数是属性的名称

    //修饰实例属性
    function upperCase(target: any, propertyKey: string) {
      let value = target[propertyKey];
      const getter = function () {
        return value;
      };
      // 用来替换的setter
      const setter = function (newVal: string) {
        value = newVal.toUpperCase();
      };
      // 替换属性，先删除原先的属性，再重新定义属性
      if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true,
        });
      }
    }
    
    class Person {
      @upperCase
      name!: string;
    }
    let p: Person = new Person();
    p.name = "world";
    console.log(p.name);
    复制代码

##### 8.3 方法装饰器

方法装饰器顾名思义，用来装饰类的方法。它接收三个参数： target: Object - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象 propertyKey: string | symbol - 方法名 descriptor: TypePropertyDescript - 属性描述符

    //修饰实例方法
    function noEnumerable(
      target: any,
      property: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("target.getName", target.getName);
      console.log("target.getAge", target.getAge);
      descriptor.enumerable = false;
    }
    //重写方法
    function toNumber(
      target: any,
      methodName: string,
      descriptor: PropertyDescriptor
    ) {
      let oldMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        args = args.map((item) => parseFloat(item));
        return oldMethod.apply(this, args);
      };
    }
    class Person {
      name: string = "hello";
      public static age: number = 10;
      constructor() {}
      @noEnumerable
      getName() {
        console.log(this.name);
      }
      @toNumber
      sum(...args: any[]) {
        return args.reduce((accu: number, item: number) => accu + item, 0);
      }
    }
    let p: Person = new Person();
    for (let attr in p) {
      console.log("attr=", attr);
    }
    p.getName();
    console.log(p.sum("1", "2", "3"));
    复制代码

##### 8.4 参数装饰器

参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：

target: Object - 被装饰的类 propertyKey: string | symbol - 方法名 parameterIndex: number - 方法中参数的索引值

    function Log(target: Function, key: string, parameterIndex: number) {
      let functionLogged = key || target.prototype.constructor.name;
      console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
    	been decorated`);
    }
    
    class Greeter {
      greeting: string;
      constructor(@Log phrase: string) {
        this.greeting = phrase;
      }
    }
    复制代码

以上代码成功运行后，控制台会输出以下结果： `"The parameter in position 0 at Greeter has been decorated"`

##### 8.5 装饰器执行顺序

有多个参数装饰器时：从最后一个参数依次向前执行

方法和方法参数中参数装饰器先执行。 方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行

类装饰器总是最后执行

    function Class1Decorator() {
      return function (target: any) {
        console.log("类1装饰器");
      };
    }
    function Class2Decorator() {
      return function (target: any) {
        console.log("类2装饰器");
      };
    }
    function MethodDecorator() {
      return function (
        target: any,
        methodName: string,
        descriptor: PropertyDescriptor
      ) {
        console.log("方法装饰器");
      };
    }
    function Param1Decorator() {
      return function (target: any, methodName: string, paramIndex: number) {
        console.log("参数1装饰器");
      };
    }
    function Param2Decorator() {
      return function (target: any, methodName: string, paramIndex: number) {
        console.log("参数2装饰器");
      };
    }
    function PropertyDecorator(name: string) {
      return function (target: any, propertyName: string) {
        console.log(name + "属性装饰器");
      };
    }
    
    @Class1Decorator()
    @Class2Decorator()
    class Person {
      @PropertyDecorator("name")
      name: string = "hello";
      @PropertyDecorator("age")
      age: number = 10;
      @MethodDecorator()
      greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) {}
    }
    
    /**
    name属性装饰器
    age属性装饰器
    参数2装饰器
    参数1装饰器
    方法装饰器
    类2装饰器
    类1装饰器
     */
    复制代码

### 9 编译

##### 9.1 tsconfig.json 的作用

*   用于标识 TypeScript 项目的根路径；
*   用于配置 TypeScript 编译器；
*   用于指定编译的文件。

##### 9.2 tsconfig.json 重要字段

*   files - 设置要编译的文件的名称；
*   include - 设置需要进行编译的文件，支持路径模式匹配；
*   exclude - 设置无需进行编译的文件，支持路径模式匹配；
*   compilerOptions - 设置与编译流程相关的选项。

##### 9.3 compilerOptions 选项

    {
      "compilerOptions": {
    
        /* 基本选项 */
        "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
        "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
        "lib": [],                             // 指定要包含在编译中的库文件
        "allowJs": true,                       // 允许编译 javascript 文件
        "checkJs": true,                       // 报告 javascript 文件中的错误
        "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
        "declaration": true,                   // 生成相应的 '.d.ts' 文件
        "sourceMap": true,                     // 生成相应的 '.map' 文件
        "outFile": "./",                       // 将输出文件合并为一个文件
        "outDir": "./",                        // 指定输出目录
        "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
        "removeComments": true,                // 删除编译后的所有的注释
        "noEmit": true,                        // 不生成输出文件
        "importHelpers": true,                 // 从 tslib 导入辅助工具函数
        "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.
    
        /* 严格的类型检查选项 */
        "strict": true,                        // 启用所有严格类型检查选项
        "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
        "strictNullChecks": true,              // 启用严格的 null 检查
        "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
        "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
    
        /* 额外的检查 */
        "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
        "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
        "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
        "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
    
        /* 模块解析选项 */
        "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
        "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
        "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
        "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
        "typeRoots": [],                       // 包含类型声明的文件列表
        "types": [],                           // 需要包含的类型声明文件名列表
        "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
    
        /* Source Map Options */
        "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
        "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
        "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
        "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    
        /* 其他选项 */
        "experimentalDecorators": true,        // 启用装饰器
        "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
      }
    }
    复制代码

### 十六、 模块和声明文件

##### 10.1 全局模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中

使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块

foo.ts

    const foo = 123;
    复制代码

bar.ts

    const bar = foo; // allowed
    复制代码

##### 10.2 文件模块

*   文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域
*   模块是 TS 中外部模块的简称，侧重于代码和复用
*   模块在其自身的作用域里执行，而不是在全局作用域里
*   一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
*   如果想要使用一个模块里导出的变量，则需要导入

foo.ts

    const foo = 123;
    export {};
    复制代码

bar.ts

    const bar = foo; // error
    复制代码

##### 10.3 声明文件

*   我们可以把类型声明放在一个单独的类型声明文件中
*   文件命名规范为\*.d.ts
*   查看类型声明文件有助于了解库的使用方式

typings\jquery.d.ts

    declare const $: (selector: string) => {
      click(): void;
      width(length: number): void;
    };
    复制代码

##### 10.4 第三方声明文件

*   可以安装使用第三方的声明文件
*   @types 是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
*   JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
*   内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
*   这些内置对象的类型声明文件，就包含在 TypeScript 核心库的类型声明文件中,具体可以查看[ts 核心声明文件](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Ftree%2Fmain%2Fsrc%2Flib "https://github.com/Microsoft/TypeScript/tree/main/src/lib")

##### 10.5 查找声明文件

*   如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别
*   给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
*   在项目根目录下，编写一个 index.d.ts 文件
*   针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件



    {
        "name": "myLib",
        "version": "1.0.0",
        "main": "lib/index.js",
        "types": "myLib.d.ts",
    }
    复制代码

查找过程如下：

1.先找 myLib.d.ts

2.没有就再找 index.d.ts

3.还没有再找 lib/index.d.js

4.还找不到就认为没有类型声明了

### 十七、编译上下文

#### 14.1 tsconfig.json 的作用

*   用于标识 TypeScript 项目的根路径；
*   用于配置 TypeScript 编译器；
*   用于指定编译的文件。

#### 14.2 tsconfig.json 重要字段

*   files - 设置要编译的文件的名称；
*   include - 设置需要进行编译的文件，支持路径模式匹配；
*   exclude - 设置无需进行编译的文件，支持路径模式匹配；
*   compilerOptions - 设置与编译流程相关的选项。

#### 14.3 compilerOptions 选项

compilerOptions 支持很多选项，常见的有 `baseUrl`、 `target`、`baseUrl`、 `moduleResolution` 和 `lib` 等。

compilerOptions 每个选项的详细说明如下：

    {
      "compilerOptions": {
    
        /* 基本选项 */
        "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
        "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
        "lib": [],                             // 指定要包含在编译中的库文件
        "allowJs": true,                       // 允许编译 javascript 文件
        "checkJs": true,                       // 报告 javascript 文件中的错误
        "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
        "declaration": true,                   // 生成相应的 '.d.ts' 文件
        "sourceMap": true,                     // 生成相应的 '.map' 文件
        "outFile": "./",                       // 将输出文件合并为一个文件
        "outDir": "./",                        // 指定输出目录
        "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
        "removeComments": true,                // 删除编译后的所有的注释
        "noEmit": true,                        // 不生成输出文件
        "importHelpers": true,                 // 从 tslib 导入辅助工具函数
        "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.
    
        /* 严格的类型检查选项 */
        "strict": true,                        // 启用所有严格类型检查选项
        "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
        "strictNullChecks": true,              // 启用严格的 null 检查
        "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
        "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
    
        /* 额外的检查 */
        "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
        "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
        "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
        "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
    
        /* 模块解析选项 */
        "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
        "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
        "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
        "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
        "typeRoots": [],                       // 包含类型声明的文件列表
        "types": [],                           // 需要包含的类型声明文件名列表
        "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
    
        /* Source Map Options */
        "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
        "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
        "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
        "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    
        /* 其他选项 */
        "experimentalDecorators": true,        // 启用装饰器
        "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
      }
    }


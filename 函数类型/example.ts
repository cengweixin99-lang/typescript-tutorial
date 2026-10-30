// 1.函数类型表达式
function greeter(fn: GreetFunction) {
    fn("hello,world");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole);

// 类型别名
type GreetFunction = (a: string) => void;

// 2.调用签名
// 在 javascript 中，函数除了可以被调用外，还可以拥有属性。然而，函数类型表达式的语法并不允许声明属性。
// 如果我们想描述一个可以调用且带有属性的东西，可以在对象中写一个调用签名
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}

myFunc.description = "default description";
doSomething(myFunc);

// 3.构造签名
// js 函数可以用 new 运算符调用。ts将这些称为构造函数，因为它们通常会创建一个新对象。
// 你可以通过在调用签名前加上 new 关键字来编写 构造签名
type SomeConstructor = {
    new(s: string): Object;
};
function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

// 一些对象，比如 js 的 Date 对象，可以带或者不带 new 调用。你可以在同一个类型中任意组合调用签名和构造签名

interface CallOrConstruct {
    (n?: number): string;
    new(s: string): Date;
}

function fn1(ctor: CallOrConstruct) {
    console.log(ctor(10));
    console.log(new ctor("10"));
}
fn1(Date)

// 4.范型函数
// 编写一个函数时，输入的类型与输出的类型相关，或者两个输入的类型以某种方式相关，这是很常见的。
// 让我们暂时考虑一下返回第一个元素的函数
// function firstElement(arr: any[]) {
//     return arr[0];
// }
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

const s1 = firstElement(["a", "b", "c"]);
const n2 = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
// 4.1 推断
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// 4.2 约束条件
// 我们编写了一些通用函数，可以处理任何类型的值。
// 有时候我们想要关联两个值，但是只能对某个特定子集的值进行操作，
// 在这种情况下，我们可以使用约束来限制类型参数可以接受的类型种类
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOk = longest({ length: 100, name: "test" }, { length: 32, name: "fdsfaf" });

// 4.3 处理受限值
// function minimunLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
//     if (obj.length >= minimum) {
//         return obj;
//     } else {
//         return { length: minimum };
//     }
// }

// 4.4 指定类型参数
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
const arr3 = combine<string | number>([1, 2, 3], ["hello"]);

// 4.5 编写优秀范型函数的指南
// 4.5.1 向下推送类型参数
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const a1 = firstElement2([1, 2, 3]);

// 4.5.2 使用更少的类型参数
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
): Type[] {
    return arr.filter(func);
}
// 4.5.3 类型参数出现两次
//有时我们忘记了函数可能不需要是范型的：
// function greet<Str extends string>(s: Str) {
//     console.log("Hello, " + s);
// }
greet("world");

function greet(s: string) {
    console.log("Hello " + s);
}

// 5. 可选参数
// js 中的函数通常可以接受可变数量的参数，例如，number 的 toFixed 方法可以接受一个可选的数字位数
function f(n: number) {
    console.log(n.toFixed());
    console.log(n.toFixed(3));
}

// ts 可以用 ？ 将参数标记为 可选,x 为 undefined ｜ number
function f1(x?: number) {
    // ...
}
f1();
f(10);
// 也可以给一个默认值,默认值只是模拟一个“缺失”的参数
function f2(x = 10) {
    //...
}
f2();
f2(undefined);
f2(10);

// 回调中的可选参数
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

myForEach([1, 2, 3], (a, i) => {
    console.log(i?.toFixed());
})

// 6.函数重载
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(123456789);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

// 6.1 重载签名与实现签名
// function fnn(x: string): void;
// function fnn() {} // 
// fnn();

// 6.2 编写良好的重载
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
    return x.length;
}

len(""); // ok
len([0]); //ok
// len(Math.random() > 0.5 ? "hello" : [0]); //error 
function len1(x: any[] | string) {
    return x.length;
}

// 7.在函数中声明 this
const user: User = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    }
}
type User = {
    id: number;
    admin: boolean;
    becomeAdmin: () => void;
}
interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}
// const db = getDB();
// const admins = db.filterUsers(() => this.admin);

// 其他需要了解的类型

// void 表示没有返回值的函数的返回值类型
function noop() {
    return;
}
// 在 ts 中，void 和undefined不是一回事

// object，指的是任何非原始类型的值，这与控对象类型{}不同，也与全局类型 Object 不同，很可能永远不会使用Object

// unknown 类型表示任何值，这与any类型相似，但更安全，因为对 unknown值进行任何操作都是不合法的
// function f1(a: any) {
//     a.b(); // OK
// }
// function f2(a: unknown) {
//     a.b();
// }
function safeParse(s: string): unknown {
    return JSON.parse(s);
}

const obj = safeParse("someRandomString");

// never
function fail(msg: string): never {
    throw new Error(msg);
}
// never 类型表示永远不会被观察到的值。在返回类型中，这意味着函数会抛出异常或终止程序执行
// never 也会在 TypeScript 判断联合类型中没有剩余类型时出现
function fp(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; // has type 'never' !
    }
}

// Function
// 全局类型 Function 描述了 JS 中所有函数值上存在的属性，例如 bind、call、apply 等。
// 它还有一个特殊属性，即类型为 Function 等值始终可以被调用；这些调用返回 any
function doSomething1(f: Function) {
    // return fp(1, 2, 3);
}

// 剩余参数和实参
function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}
const mtp = multiply(10, 1, 2, 3, 4);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

const args = [8, 5] as const;
const angle = Math.atan2(...args);

// 参数解构
function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

type ABC = { a: number; b: number; c: number };

// 函数的可赋值性

// 返回类型 void
type voidFunc = () => void;
const fv: voidFunc = () => {
    return true;
}
const fv1: voidFunc = () => true;
const fv2: voidFunc = function () {
    return true;
};

const v1 = fv();
const v2 = fv1();
const v3 = fv2();

const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));

// function f11(): void {
//     return true;
// }
// const f111 = function (): void {
//     return true;
// }
// ts 常用类型：string、number、boolean、Arrays、any
let s: string = "hello,world";
let n: number = 1;
let b: boolean = false;
let arr: Array<number> = [1, 2, 3, 4, 5];
let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n1: number = obj;

// Function
// 1.参数类型注解
// function greet(name: string) {
//     console.log("Hello, " + name.toUpperCase() + "!!");
// }
// 2.返回类型注解
function getFavoriteNumber(): number {
    return 23;
}
async function getFn(): Promise<number> {
    return 24;
}
// 3.匿名函数
const names = ["Alice", "Bob", "Eve"];
names.forEach(function (s) {
    console.log(s.toUpperCase());
});

// Object Types
function printCoord(pt: { x: number, y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
// 可选属性
// function printName(obj: { first: string, last?: string }) {
//     // ...
// }
// printName({ first: "Bob" });
// printName({ first: "Alice", last: "Alisson" });

// 读取不存在的属性
function printName(obj: { first: string, last?: string }) {
    if (obj.last !== undefined) {
        console.log(obj.last.toUpperCase());
    }
    console.log(obj.last?.toUpperCase());
}
// 联合类型

function printId(id: number | string) {
    // console.log("Your ID is: " + id);
    // console.log(id.toUpperCase());// 联合类型中，只能用联合类型中的所有类型都有的方法
    // 可以使用 if 判断类型，缩小类型范围
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        // Here, id is of type 'number'
        console.log(id);
    }

}
// ok
printId(101);
printId("202");
// Error
// printId({myId: 2304});

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello," + x.join(" and "));
    } else {
        console.log("Welcome lone traveler " + x);
    }
}

// 类型别名
type Point = {
    x: number;
    y: number;
}

function printPoint(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printPoint({ x: 100, y: 100 });

type ID = number | string;

type UserInputSanitizedString = string;

interface Animal {
    name: string;
}
interface Bear extends Animal {
    honey: boolean;
}


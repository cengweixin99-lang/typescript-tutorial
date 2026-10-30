"use strict";
// 函数类型表达式
function greeter(fn) {
    fn("hello,world");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);

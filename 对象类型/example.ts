// readonly
interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);

// 索引签名
interface StringArray {
    [index: number]: string;
}

// const myArray: StringArray = 


// 溢出属性检查：
// 对象被分配类型的地点和方式会被类型系统产生影响。其中一个关键示例是在多余属性检查中，当对象在创建时被创建并分配给某个对象类型时，这会更彻底地验证对象
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    }
}


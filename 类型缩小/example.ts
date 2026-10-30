function padLeft(padding: number | string, input: string): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}

function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here;"
}

function multipyAll(values: number[] | undefined, factor: number): number[] | undefined {
    if (!values) {
        return values;
    } else {
        return values.map((x) => x * factor);
    }
}



let x = Math.random() < 0.5 ? 10 : "Hello";
function example() {
    let x: string | number | boolean;

    x = Math.random() < 0.5;
    console.log(x);

    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
    } else {
        x = 100;
        console.log(x);
    }
    return x;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
function getSmallPet(): (Fish | Bird) {
    let n = 1;
    if (n > 0) {
        return { swim: "", name: "" };
    } else {
        return { fly: "", name: "" };
    }
}
type Fish = { swim: string, name: string }
type Bird = { fly: string, name: string };
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return false;
    return isFish(pet);
})


// interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
// }


// function handleShape(shape: Shape) {
//     if (shape.kind === 'rect') {

//     }
// }

// function getArea(shape: Shape) {
//     if (shape.kind === "circle") {

//         return Math.PI shape.radius! ** 2;
//     }
// }

interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch(shape.kind) {
        case "circle": 
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}



// never

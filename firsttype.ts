//type 키워드
type World = "world" | "hell";
const bb: World = "world";

const cc = `hello ${bb}`;

// type Greeting = "hello world"
type Greeting = `hello ${World}`; //타입이 합쳐진다.
const dd: Greeting = "hello hell";

let tarr: string[] = [];
let tarr2: Array<string> = [];

// function rest(...args: string[]) {}
// function rest(...args: string[]) {
//   console.log(args); // [1,2,3]
// }
function rest(a: number, ...args: string[]) {
  console.log(a, args); // 1, [2,3]
}
rest(1, "2", "3");

const tuple: [string, number] = ["1", 1];
//! tuple[2] = "hello"; //이건 에러
tuple.push("hello"); // 이건 허용

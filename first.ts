//! JS에 변수, 매개변수, 리턴값에 타입을 정해주는게 타입스크립트다.
const a = 5; //* O
const b: string = "5"; //* X
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
//? const f: symbol = Symbol.for('abc');
//? const g: bigint = 1000000n; 이런것디 있다 정도
const f: any = "123"; //* 걍 자바스크립트가 됨 타입스크립트의 주 목적은 any를 사용하지 않는것!이라고 생각하면 됨

//* 마우스 올려서 타입잡혀있으면 굳이 타입 잡을 필요 없음;;
//* 괜한 손찌검(?)으로 타입스크립트를 바보로 만듬 ㅋㅋ

// function add(x: number, y: number): number { return x + y }
//? 함수(매개변수): 리턴값 {}
type Add = (x: number, y: number) => number;
// const add: (x: number, y: number) => number = (x, y) => x + y;
//? 함수: (매개변수) => 리턴값 = () => ; 매개변수는 꼭 타이핑 해줄 것.
const add: Add = (x, y) => x + y;
//? 타입을 지워도 말이되는 JS코드 여야 한다.
const result = add(1, 2);

interface Add2 {
  //* 인터페이스 통해서 함수 타입 만들기
  (x: number, y: number): number;
}

const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

const arr: string[] = ["abc", "def"]; //? | 파이프라고 함
// const arr2: number[] = [123, 456];
const arr2: Array<number> = [123, 456];
//! 튜플! : 길이가 고정된 배열
const arr3: [number, number, string] = [123, 456, "hello"]; //* 에러메시지 꼼꼼하게 읽어라 ^^;

/*
! 추론이 잘되었다면 타이핑하지말고 타입스크립트에 맡겨라
! 타입은 최대한 좁게 작성할 것

? type Add = () => number;
? interface Minus {}
? Array<string>
? 상기 세가지 코드는 JS 변환 시 사라진다.(매개변수: 타입 도 사라짐)
*/

/* 심화과정 */
function func(x: number, y: number): number; // 사라지는 부분
function func(x, y) {
  return x + y;
}

let aa = 123;
aa = "hello" as unknown as number; //억지로 바꿈 사실 바꿀일이 잘 있진 않음(근데 가끔 나는 저렇게 쓰는듯 ㅎㅎ;)
//! as 는 앞의 타입을 강제로 바꿔준다 <- 얘도 사라짐

//* never
//? never가 오면 아것도 할 수 없다.
try {
  const array: string[] = [];
  //! 타입을 지정해줘야 값을 할당해 넣을수 있다.
  array.push("hello");
} catch (error) {
  error;
}

//* !가 있음
const head = document.querySelector("#head"); // 타입스크립트는 설명서
head.innerHTML = "ddd";
//? !의 역할 무조건 존재한다를 보증함 !가있으면 null이 없어짐
//! 그러나 비추천... 절대는 존재할수 없다 대신 if (head) {...} 를 쓰자

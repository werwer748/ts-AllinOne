const enum EDirection { //* enum 자주쓰이진 않는다. 변수들을 하나의 그룹으로 묶고싶을때 사용함
  Up,
  Down,
  Left,
  RIght,
} //! JS되면 사라짐

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const; //!as 부분 사라짐
//? readonly 직접 써도 됨

const ea = EDirection.Up;
const ec = EDirection.Left;

function walk(dir: EDirection) {} //? enum 타입으로 쓸 수 있음! 4개중에 하나여야 한다는 뜻

const eObj = { a: "123", b: "hello", c: "world" };
//? type Key = typeof eObj; // a: stirng, b: string, c: string...
type Key = keyof typeof eObj; // a, b, c
//? type Key = typeof eObj[keyof typeof eObj]; // value 고정 값으로 쓰고 싶을 때 (as const 써야 함)

// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection]; // 값만 가져 올 때
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);

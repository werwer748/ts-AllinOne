interface IForEach<T> { //? 타입의 자리만 T로 대체 함. T에 뭐가 올지 모르기 때문에
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  //* map<U>(callbackfn: (value: number, index: number, array: number[]) => string, thisArg?: any): string[];
  //? map 함수 전체의 리턴값은 U
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
  //* filter<S extends number>(predicate: (value: number, index: number, array: number[]) => value is number, thisArg?: any): number[];
  //* filter<S extends (string | number))>(predicate: (value: (string | number), index: number, array: (string | number)[]) => value is S, thisArg?: any): string[];
  //? 이 경우 string[], number[] 로 받을 수 있다.

  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
  //* filter(predicate: (value: number, index: number, array: number[]) => unknown, thisArg?: any): number[];
  //* filter(predicate: (value: (string | number), index: number, array: (string | number)[]) => unknown, thisArg?: any): (string | number)[];
  //? 이 경우 (string | number)[] 로 고정 되어 버림. 타입 추론을 제대로 해줄 수 없다.
}

//* type A<T> {}
//* class A<T> = {}
//? 상기 코드들 처럼 type, class에도 제네릭을 쓸 수 있다.(이름<제네릭>)

//! filter 관련
const filterPredicate = (value: string | number): value is string => typeof value === 'string';
const filteredPredicateCorrect = ['1', 2, '3', 4, '5'].filter(filterPredicate); //! 원하는 값 ['1', '3', '5'] string[] 이 됨
//? 가능한 이유는 제네릭 을 통해 강제 형 변환을 했기 때문에. & string extends string | number <- 이게 가능하기 때문

const filtered = [1, 2, 3, 4, 5].filter((value) => value % 2);
const filtered2 = ['1', 2, '3', 4, '5'].filter((value) => typeof value === 'string'); //! 원하는 값 ['1', '3', '5'] string[] 근데 값 못찾음

// const anyfilterTest = ['1', 2].filter<string extends string | number>((value) => typeof value === 'string');
//! value is string이 형식 조건자인데 이 부분 때문에 에러가 난다. 커스텀 타입가드가 아니기 때문에.

//! map 관련
const mapArray = [1, 2, 3].map((item) => item.toString()); //* ['1', '2', '3'] string[]
const mapArray2 = [1, 2, 3].map((item) => item + 1); //* [2, 3, 4] number[]

//! forEach 관련
const numberArray: IForEach<number> = [1, 2, 3];
numberArray.forEach((value) => { console.log(value)});
['1', '2', '3'].forEach((value) => { console.log(value)});
[true, false, true].forEach((value) => { console.log(value)});
['123', 123, true].forEach((value) => { console.log(value)});
//? 타입을 정확히 추론해낸다. 제네릭 덕분에!

/*
  ? 그래서 다시 생각해 볼 수 있는 이전 시간 예제
  * function add<T>(x: T, y: T) {}
  * add('1', 2); <- 이런게 허용 되면 안됨
  * add(1, '2'); <- 이런게 허용 되면 안됨
  * <이 자리에 타입을 넣어주는 경우 강제 타입 지정>add<number <- 이자리에 타입을 직접 지정해 줄 수 있다.(타입스크립트가 타입을 추론하지 못할 때)>(1, 2);
  * add('1', '2');
  * add(true, false);
*/

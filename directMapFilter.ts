interface dirMapArr<T> {
  //! <T, S>로 사용할 수도 있지만 map에 뭐가 올지 알지 못하는데 S를 받겠다고 하는건 위험하다.
  forEach(callback: (item: T, index: number) => void): void;
  //* 1. 함수부터 만들기 -> map(): void;
  //* 2. 타입이 void가 되면 안되니까 콜백 타이핑 -> map(callback: (v: T) => T): T[];
  //* 3. 리턴값이 다른 타입일 수 있다. -> map<S>(callback: (v: T) => S): S[];
  //* 4. index 추가 시 -> map<S>(callback: (v: T, i: number) => S): S[];
  map<S>(callback: (v: T, i: number) => S): S[];

  //* 1. 함수부터 만들기 -> filter(): void;
  //* 2. 콜백 타이핑 -> filter(callback: () => void): void
  //* 3. callback 매개변수, 리턴값에 타이핑 -> filter(callback: (v: T) => void): T[]
  //* 4. 도저히 타입이 안맞음 새로운 타입을 추가해야겠다! -> filter<S>(callback: (v: T) => v is S): S[]
  //* 5. S와 T가 관련이 없다는 에러가 뜨네? -> filter<S extends T>(callback: (v: T) => v is S): S[];
  filter<S extends T>(callback: (v: T) => v is S): S[];
  //* S는 T에 부분집합이다.
  //* is를 통한 커스텀 타입 가드!
}

const dirMap: dirMapArr<number> = [1, 2, 3];
const dirMap2 = dirMap.map((v, i) => v + 1); // [2, 3, 4]
const dirMap3 = dirMap.map((v, i) => v.toString()); // ['1', '2', '3']; string[];
const dirMap4 = dirMap.map((v, i) => v % 2 === 0); // [false, true, false]; boolean[]

const dirMap5: dirMapArr<string> = ["1", "2", "3"];
const dirMap6 = dirMap5.map((v) => +v);

const dirFilter: dirMapArr<number> = [1, 2, 3];
const dirFilter2 = dirFilter.filter((v): v is number => v % 2 === 0); // [2] number[]

const dirFilter3: dirMapArr<number | string> = [1, '2', 3, '4', 5];
const dirFilter4 = dirFilter3.filter((v): v is string => typeof v === 'string'); // ['2', '4'] string[]

const dirFilterPredicate = (v: string | number): v is number => typeof v === 'number';
const dirFilter5 = dirFilter3.filter(dirFilterPredicate); // [1, 3, 4] number[]
const dirFilter6 = dirFilter3.filter((v): v is number => typeof v === 'number'); // [1, 3, 4] number[]
//! 형식 조건자 v is number

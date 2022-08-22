interface dirMapArr<T> { //! <T, S>로 사용할 수도 있지만 map에 뭐가 올지 알지 못하는데 S를 받겠다고 하는건 위험하다.
    forEach(callback: (item: T, index: number) => void): void;
    //* 1. 함수부터 만들기 -> map(): void;
    //* 2. 타입이 void가 되면 안되니까 콜백 타이핑 -> map(callback: (v: T) => T): T[];
    //* 3. 리턴값이 다른 타입일 수 있다. -> map<S>(callback: (v: T) => S): S[];
    //* 4. index 추가 시 -> map<S>(callback: (v: T, i: number) => S): S[];
    map<S>(callback: (v: T, i: number) => S): S[];
}

const dirMap: dirMapArr<number> = [1, 2, 3];
const dirMap2 = dirMap.map((v, i) => v + 1); // [2, 3, 4]
const dirMap3 = dirMap.map((v, i) => v.toString()); // ['1', '2', '3']; string[];
const dirMap4 = dirMap.map((v, i) => v % 2 === 0); // [false, true, false]; boolean[]

const dirMap5: dirMapArr<string> = ['1', '2', '3'];
const dirMap6 = dirMap5.map((v) => +v);

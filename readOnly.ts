//* 짧지만 자주 쓰이는 것들 세가지

interface RA {
    readonly a: string;
    b: string;
}
const aaaa: RA = { a: 'hello', b: 'world' }
//* aaaa.a = '123'; // 바뀌면 안되는데 바뀌는 경우가 있음 그걸 막기위해 사용하는 듯?

type RAA = { [key: string]: number }; //? <- 인데스드 시그니처 
 //* 지금 RAA 뜻: 모든 키값은 string이고 값은 숫자
const aaaa2: RAA = { a: 3, b: 5, c: 5, d: 123};

type RB = 'Human' | 'Mammal' | 'Animal';
/*
* type RAAA = { [key in RB]: number };
* const aaaa3: RAAA = { Human: 3, Mammal: 12, Animal: 30 };
*/
type RAAA = { [key in RB]: RB }; //? <- 맵드 타입스
const aaaa3: RAAA = { Human: 'Human', Mammal: 'Mammal', Animal: 'Animal' };
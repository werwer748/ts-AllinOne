// function addG(x: string | number, y: string | number): string | number { return x + y }; //! 잘못된 타이핑

//function addG(x: string, y: string): string { return x + y };
//function addG(x: number, y: number): number { return x + y }; //* <- 바디가 선언된 함수를 2개써서 에러가 난다

// function addG(x: string, y: string): string;
// function addG(x: number, y: number): number;
// function addG(x: string | number, y: string | number) { //* 이러면 원래 문제로 돌아간다.
//     return x + y;
// }

//TODO 그래서 나온게 제네릭
function addG<T extends string | number>(x: T, y: T): T {
    return x + y;
};
/*
function addG<T extends number, K extends string>(x: T, y: K): T {
    return x + y;
};
*/

addG(1, 2); // 3
addG('1', '2'); // '12'
//? 제니릭은 선언부가 아닌 사용 할 때 타입이 지정 된다.
addG(true, false); //! 이런 것 허용 되버림.

addG(1, '2'); // 이런 가능성을 배제시키지 못했기 때문에 잘못된 타이핑 '12'
addG('1', 2); // '12'

function addTM<T extends { a: string }>(x: T): T { return x };
addTM({ a: 'hello' });
function addTM2<T extends string[]>(x: T): T { return x };
addTM2(['1', '2', '3']);
function addTM3<T extends (a: string) => number>(x: T): T { return x };
addTM3((a) => +a);
function addTM4<T extends abstract new (...args: any) => any>(x: T): T { return x };
class addTMClass {}
addTM4(addTMClass);

// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수 제한이 없는 경우는 any써도 무방하다.
// <T extends abstract new (...args: any) => any> // 생성자 타입 class 자체가 타입 constructor의 타입을 이런식으로 쓴다
// <T extends keyof any> // string | number | symbol

//* function addG2<T>(x: T, y: T): T { return x + y };
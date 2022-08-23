//? 공변성과 반공병성
//말이 어렵다... 함수간에 서로 대입할 수 있냐 없냐 이걸 따지는 거라고 함.

function varA(x: string): number {
    return +x;
}
// varA('1'); // 1
// function varA(x: string): number | string{ //? (x: string) => string | (x: string) => number
//     return +x;
// }

type varTypeB = (x: string) => number | string; //? 리턴값은 더 넓은 타입에 대입 가능하다.
// type varTypeB = (x: string) => number; //? 함수보다 리턴값 범위가 좁아져서 대응 안됨.
const varB: varTypeB = varA; // 뭔...?

function varA2(x: string | number): number { 
    //? (x: string) => number | (x: number) => number 둘다 대입이 된다고? -> 매개변수에서는 이렇게 생각하면 안된다.
    //? 매개변수에서는 string | number 하나로 보고? 좁은 타입을 대입된다. 리턴 타입값과는 반대다 라고 생각하면 편하다고...
    return 0;
}

type varTypeB2 = (x: string) => number;
let varB2: varTypeB2 = varA2;

function varA3(x: string | number): number { 
    //? (x: string) => number | (x: number) => number 둘다 대입이 된다고? -> 매개변수에서는 이렇게 생각하면 안된다.
    //? 매개변수에서는 string | number 하나로 보고? 좁은 타입을 대입된다. 리턴 타입값과는 반대다 라고 생각하면 편하다고...
    return 0;
}
type varTypeB3 = (x: string) => number | string;
let varB3: varTypeB3 = varA3; //*그래서 이게 가능함
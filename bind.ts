/*
* bind 에 대해 아라보자.(객체를 매개변수로 이용할 때 this가 사라지는 현상을 막기위해 사용)
? type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
* this를 추론해 낸다.
? type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
* 컨디셔널 타입이 두번 중첩되어있다.

? bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
* bind를 쓰면 this가 없는 원래 함수를 반환.
bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;

//* this를 지워보면 그냥 매개변수 갯수만 늘어남.
bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;
! 이렇게 오버로딩된 이유를 알기위해 예제로 알아보자
*/

//* 예제전 설명 부
function bindA(this: Window | typeof bindObj) {
    console.log(this.name);
}

const bindObj = { name: 'hugo' }
const bindB = bindA.bind(bindObj);
bindB(); // 'hugo';

type bindT = ThisParameterType<typeof bindA> //this를 추출해낼 수 있다.
type bindNoThis = OmitThisParameter<typeof bindA> // this만 제거한 함수가 나옴

//* 실제 예제부
const bindHugo = {
    name: 'hugo',
    sayHello(this: { name: string }) {
        console.log(`Hi, ${this.name}`);
    }
};

const sayHello = bindHugo.sayHello;
const sayHi = bindHugo.sayHello.bind({ name: 'jugo' }); // bind를 통해서 this를 바꿔주는 예제
// OmitThisParameter -> 통해서 this를 없앰
// ThisParameterType -> 통해서 추론함
sayHi();

function bindAdd(a: number, b: number, c: number, d: number, e: number, f: number) {
    return a + b + c + d + e + f;
}

const bindAdd1 = bindAdd.bind(null); // null은 this자리
bindAdd1(1, 2, 3, 4, 5, 6);

const bindAdd2 = bindAdd.bind(null, 1); // 1은 매개변수자리에 가져다 주는 거
//* bind<T, A0, A extends any[], R>(this: (this: null, arg0: 1, ...args: 1 제외한 나머지) => R, thisArg: null, arg0: 1): (...args: A) => R;
bindAdd2(2, 3, 4, 5, 6);

const bindAdd3 = bindAdd.bind(null, 1, 2);
bindAdd3(3, 4, 5, 6);

const bindAdd4 = bindAdd.bind(null, 1, 2, 3);
bindAdd4(4, 5, 6);

const bindAdd5 = bindAdd.bind(null, 1, 2, 3, 4);
bindAdd5(5, 6);

const bindAdd6 = bindAdd.bind(null, 1, 2, 3, 4, 5);
/*
* 매개변수가 4개일때 까지는 만들어 놓음, 그 이상은 만들어놓지 않았다.
bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
? 매개변수 많이 쓰는 경우가 드물기 때문에 이 이상은 안쓰겠지..? 라는 마인드로 이만큼만 만들어놨다고... <- 문법적 한계
? 그 이상일 경우 bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R; <- 이걸로 퉁친다.
*/
bindAdd6(5, 6);



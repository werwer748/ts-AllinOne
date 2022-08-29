function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean} {
    return { x, y, z};
}

// type dirParameters<T extends keyof any> = {};
type dirParameters<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A: never;
//* infer는 extends에서만 사용이 가능함.
//* infer -> 추론하다.
//* 매개변수 자리를 추론해라~

type dirParametersReturn<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A: never; //! <- 이게 ReturnType이라고 존재한다.
//* infer의 위치를 바꿔서 리턴값을 가져 옴
//* 잘 활용하면 원하는 값을 뜯어올 수 있다.

type Params = Parameters<typeof zip> //? [x: number, y: string, z: boolean] -> 배열로 나옴. 튜플?: 길이가 고정된 배열
type ParamTest = Params[1]; // string index로 타입에 접근할 수 있다.
type Params2 = dirParameters<typeof zip>;
type ParamTest2 = Params2[2];
type Params3 = dirParametersReturn<typeof zip>;
type ParamTest3 = Params3;

//* ConstructorParameters, InstanceType
/*
    * type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

    * type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
*/

class cttpClass {
    a: string;
    b: number;
    c: boolean;
    constructor(a: string, b: number, c: boolean) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

const cttp1 = new cttpClass('123', 456, true);
type cttpType1 = ConstructorParameters<typeof cttpClass>; //? 튜플로 들어옴, class constructor의 파라미터 값. typeof 클래스가 생성자
type itType1 = InstanceType<typeof cttpClass>; //? class가 그대로 들어옴

//* Class는 타입으로 쓸 수 있다. (javascript가 되어도 사라지지 않는다 였음)
const cttpC: cttpClass = new cttpClass('123', 456, false); //! 인스턴스(new)
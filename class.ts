class CLA {
    a: string = '123';
    b: number = 123; //? <- constructor type을 타이핑 그러나 constructor를 생략하고 이같이 사용 가능하다.
    // constructor() {
    //     this.a = '123';
    //     this.b = 123;
    // }
}
class CLA2 {
    a: string;
    b: number;
    constructor(a: string, b: number = 123) {
        this.a = a;
        this.b = b;
    }

    method() {}
}
const cla2 = new CLA2('123', 456);

type CLAA = CLA2; //?  new CLA2() 
const claa: CLA2 = new CLA2('123')
const clb: typeof CLA2 = CLA2; //  CLA2 자체를 가리키는 타입은 typeof CLA2

class privateClass {
    private a: string = '123'; // typescript private <- 이거를 쓰는걸 추천 (protected의 지원 여부)
    #b: number = 123; // javascript private

    method() {
        console.log(this.a, this.#b);
    }
}

type privateA = privateClass;
const private_a: privateClass =  new privateClass();

//* private, protected, implements
interface Benz {
    readonly a: string;
    b: string;
}

class BMW implements Benz { //? implements: 구현하다. -> class에 interface를 구현한다. class가 interface 규칙을 따라야 함.
    // private a: string = '123'; //* private readonly 로 복합적으로 사용 가능
    readonly a: string = '123';
    b: string = 'world';
    // protected b: string = 'world';
    c: string = 'wow'; //* public은 기본이기 때문에 안써줘도 됨

    method() {
        console.log(this.a) //! private 안에서만 접근 가능함.
        console.log(this.b) //! protected 안에서만 접근 가능함.
        console.log(this.c) //! public 안, 밖 전부 접근 가능함.
    }
} //* 굳이 class에 interface 할 필요 없음...? 추상개념에 좀 더 치중한다면 interface javascript단에서 남아있는게 중요하다면 class
/*
    ! 근데 class 에도 abstract 쓰면 추상 개념 사용이 가능
    ! abstract를 쓰면 상속받는 경우 꼭 명시해서 사용해 줘야 함.
*/
class Audi extends BMW {
    method() {
        console.log(this.a) //! private 다른 클래스에서 만들어져서 상속 받더라도 접근 불가능.
        console.log(this.b) //! BMW를 상속 받았기 때문에 접근이 가능
        console.log(this.c) //! public 안, 밖 전부 접근 가능함.
    }
}
new Audi().a; //! private 속성은 밖에서 접근이 불가능
new Audi().b; //! protected 속성은 밖에서 접근이 불가능
new Audi().c;
/*
*                        public               protected                   private
*클래스내부                    O                     O                           O
*인스턴스(new Class())        O                     X                           X
*상속클래스                   O                     O                            X

TODO 문제는 자바스크립트가 되면 없어짐
*/

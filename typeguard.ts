// 타입가드, 타입 좁히기 (기술)

function numOrStr(a: number | string) {
    if (typeof a === 'string') {
        a.split(',');
    } else { //? typescript는 else까지 파악을 해줌.
        a.toFixed(1);
    } //? 이게 타입 가드라는 기법
    if (typeof a === 'string') {
        a.charAt(3);
    }
    if (typeof a === 'boolean') {
        // a.toString(); //! never가 되어서 사용할 수 없다.
    }

    // a.toFixed(1);
    //* (a as number).toFixed(1); 위험한 코드: 내가 실수할 수 있기 때문에. 따라서 unknown 때 빼고는 as 하지마 그냥
    //? a는 넘버일 수도 있지만 스트링일 수 도 있어서 빨간줄~
}
numOrStr('123');
numOrStr(1);

function numOrNumArray(a: number | number[]) { //? | 은 자주 나오고 & 는 거의 안나옴 그래서 | 나왔을 때 분기로 가르는게 중요
    if (Array.isArray(a)) { // number[] 배열인지 아닌지는 이렇게 검사
        a.concat(4); //.찍으면 쓸 수 있는 함수들이 알아서 걸러져서 뜬다... Goooat....
    } else { // number
        a.toFixed(3);
    }
}

numOrNumArray(123);
numOrNumArray([1, 2, 3]);

class GA {
    aaa() {}
}
//? 클래스 자체의 타입은 typeof 클래스 (typeof A) 임.
class GB {
    bbb() {}
}
function aOrB(param: GA | GB) {
    if (param instanceof GA) { // class GA이기 때문에 aaa 함수를 불러온다.
        param.aaa(); //* class간에는 instanceof로 구별을 한다.
    }
}

aOrB(new GA()); // 클래스를 선언하는 거라서 똑같이 new 가 필요함
aOrB(new GB());

type GBB = { type: 'b', bbb: string };
type GCC = { type: 'c', ccc: string };
type GDD = { type: 'd', ddd: string };
// type GDD = { type: 'c', ddd: string };

type GAA = GBB | GCC | GDD;

function typeCheck(a: GAA) { //? GBB | GCC | GDD <- 내부 속성 만으로도 검사를 해준다.
    // if (a.type === 'b') {
    //     a.bbb;
    // } else if (a.type === 'c') {
    //     a.ccc; //? GDD도 타입 c 일 때 -> GCC | GDD
    // } else {
    //     a.ddd; //? never 위에서 해당사항이 모두 걸러졌음
    // } 타입으로 검사할 때
    if ('bbb' in a) {
        a.type;
    } else if ('ccc' in a) {
        a.ccc;
    } else {
        a.ddd; //? never 위에서 해당사항이 모두 걸러졌음
    } //? 속성으로 검사하는 방법
}

//* 객체를 만들때 들이면 좋은 습관 (typescript를 위해서)
const man = { type: 'man' }; //? 타입을 넣어주는 습관
const dog = { type: 'dog' };
const cat = { type: 'cat' };
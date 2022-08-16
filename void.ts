// function va(() => void): void { // 매게변수르 선언한 void
function va(): void {
 
} // 함수에 void를 선언한것

const vb = va();
/*
? void 형식에 리턴값이 있으면 빨간줄(리턴값 넣으면 안됨)
* undefined는 됨
*/

interface VHuman {
  talk: () => void; // 메서드로 선언할 때의 void
}

const vhuman: VHuman = {
  talk() { return "abc"; }, //! 원칙적으로 리턴값을 안써주는게 맞지만 예외상황을 생각해 무시해버리는 것
};
//* 강제 변환 방법 as unkwoun as 'type';

//? 실전예제
declare function forEach(arr: number[], callback: (el: number) => void):void; //함수를 body없이 선언할 수 있지만 바로 밑에 실제 구현부를 만들어 줘야한다.
//!function forEach() {} 이거(구현부) 해주기 싫을때 declare : 이렇게 타입만 만들어둔다.
//* el => number 해주면 에러가 안난다 undefind인경우 당연히 에러 그런데 void 써주면 에러가 안남
//* return void의 의미는 실제 리턴값이 뭐든 상관하지 않겠다 라고 한다.
//! undefind 는 void에 할당 가능

let vTarget: number[] = [];
forEach([1, 2, 3], el => { vTarget.push(el) });
//! void는 number형식에 할당할 수 없다.
forEach([1, 2, 3], el => vTarget.push(el));
//* 둘 다 정상적인 코드

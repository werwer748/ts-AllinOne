type A = { a: string };
const ua: A = { a: "hello" };
//? const ua: { a: string } = { a: "hello" }; 이렇게 써도 됨

interface B {
  a: string;
}
const ub: B = { a: "hello" };

//* 간단한건 타입, 객체지향하고싶으면 interface 라고 생각해두자

//* | union 이라고 부름
function uAdd(x: string | number, y: string | number): string | number {
  //! 여기때문에 줄줄이 꼬일 수 있다.
  return x + y;
}
uAdd(1, 2);
uAdd("1", "2");
uAdd(1, "2");
const uResult: string | number = uAdd(1, 2); //! 타입스크립트가 타입을 잘못 인지함

//* intersection &
type AA = { hello: "world" } & { hugo: "kang" };
//? type AA = { hello: "world" } | { hugo: "kang" };
//! | 도 되긴하지만 의미가 완전 다르다. if 랑 비슷한 느낌?
//* & 일때는 모든 속성이 다 있어야 한다. | 그 중에 하나만 있으면 된다.
const uaa: AA = { hello: "world", hugo: "kang" };

//* 실전 예시
type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };
//? 상속의 개념

interface Ani {
  breath: true;
}
interface Ani {
  breat: true;
}
interface Ani {
  brea: true;
}
interface Ani {
  // 중복 가능 선언할 때 마다 합쳐짐
  bre: true;
}
//? 타입을 extends 할 수도 있음
interface Po extends Ani {
  //상속보다는 확장 강사는 인터페이스를 더 많이 쓴다고 함
  breed: true;
}

const hugoK: Po = {
  breath: true,
  breed: true,
  breat: true,
  bre: true,
  brea: true,
};

const hugo: Human = { breath: true, breed: true, think: true };

//* 따라서 나온 약속
/*
    interface는 I
    type 은 T
    enum은 E
*/
//* 근데 요즘 잘 안씀

/*
? 타입을 집합으로 생각하기
! any는 전체집합, never는 공집합 으로 생각하면 이해가 쉬움
* type A = string | number; 집합 범위 : 넓음
* type B = string; 집합 범위: 좁음

* type C = string & number; 집합 범위: 더 좁음

? 객체를 활용한 예시
* type A = { name: string };
* type B = { age: number };
* type C = { name: string, age: number }; <- type C = A & B;
! 누가 더 넓은 타입이고 누가 더 좁은 타입인가? A, B가 넓은 타입. 속성이 적을수록 넓다 속성이 구체적일수록 좁은 타입

* type AB = A | B; |관계는 넓은 타입임
? 예시
* const ab: AB = { name: 'hugoK' }; 넓은 타입, 숫자만, 나이만 써도 됨 
* const c: C = { name: 'hugo', age: 30 }; 좁은타입 숫자 나이 모두 써야함 c = ab가 성립되지 않는다. ab: AB = c 는 성립.
? 타입범위 검사뿐만아니라 리터럴 검사(잉여 속성검사) 라는 걸 함
* const c: C = { name: 'hugo', age: 30, married: true }; 했을 때 married에 빨간 줄(선언한 속성에 없음)
* const obj = { name: 'hugo', age: 30, married: true };
* const c: C = obj; 하면 먹힘
*/

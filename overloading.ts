declare function overAdd(x: number, y: number): number
//* 사실 가장 좋은 방법은 declare function overAdd(x: number, y: number, z?: number): number <- 옵셔널
// declare function overAdd(x: string, y: string): string
declare function overAdd(x: number, y: number, z: number): number
//! declare쓰면 함수 타입 정의만 하고 함수는 다른데 있다고 타입스크립트를 속일 수 있다.
declare function overAdd(x: string, y: string): string
// function overAdd(x: number | string, y: number | string) {
//     return x + y;
// }

overAdd(1, 2); //* z없는거 한번, z 있는거 한번
overAdd(2, 3, 4); //? 이렇게 두개를 한번에 타이핑 하고 싶을 때 잘 모르면 상기 내용처럼 작성하면 된다.
overAdd('1', '2'); //? 걱정말고 하나 더 만들면 됨.

interface IOverAdd {
    (x: number, y: number): number;
    (x: string, y: string): string;
}
const overAddconst: IOverAdd = (x: any, y: any) => x + y; //! 오버로딩을 사용한 경우 실 구현부에 any를 써도 크게 문제가 없을 것.
//? 타입스크립트가 알아서 오버로딩을 파악한다.

class classOverAdd {
    add(x: number, y: number): number;
    add(x: string, y: string): string; //* 여기까지만 오버로딩으로 침.
    add(x: any, y: any) { //* any는 알아서 거른다.
        return x + y;
    };
}

const overAddconst2 = new classOverAdd().add('1', '2');
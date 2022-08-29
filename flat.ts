//* 머리를 터뜨려버리기 위한 추가강의 flat!
/*
flat<A, D extends number = 1>(
    this: A,
    depth?: D
): FlatArray<A, D>[]

type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr> //* <- 요소의 타입을 추론해라.(뭉뚱그려서 추론한다음 재귀로 다시 추론)
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        *뎁스를 1씩 낮춰줌. 그래서 뎁스가 25일 경우 표현할수 없음. 언어적 한계 ㅠㅜ (But! 20차원 배열 이상 쓸일이 없기때문에...)
        * type 선언시 - 같은걸 쓸수가 없음 그래서 저렇게 구현
        : Arr
}[Depth extends -1 ? "done" : "recur"];

interface ReadonlyArray<T> {

     flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
        thisArg?: This
    ): U[]

    flat<A, D extends number = 1>(
        this: A,
        depth?: D
    ): FlatArray<A, D>[]
  }
*/
//? flat을 쓰면 배열들을 하나씩 낮춘다. 1차원 그대로 2차원 1차원으로 3차원 2차원으로
const FlatA = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1, 2, 3, 1, 2, [1], [2]];
const FlatB = [1, 2, 3, [1, 2]].flat(); // [1, 2, 3, 1, 2];

type FlatAtype = {
    name: string,
    age: number,
};
type FlatBtype = FlatAtype['1' extends number ? 'age' : 'name'];

const FlatC = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // [1, 2, 3, 1, 2, 1, 2];
//* FlatArray<(number[] | number[] | number[][][]), 2>[]
//* FlatArray<(number | number[] | number[][]), 1>[] 
//* FlatArray<(number | number[]), 0>[]
//* FlatArray<number, -1>[]
//* number[]
const promise1 = Promise.resolve(1).then((a) => a + 1).then((a) => a + 1).then((a) => a.toString());
//* then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
//* Promise<number>, Promise<number>, Promise<number>, Promise<string>
const promise2 = Promise.resolve(2); //* Promise<number>
const promise3 = new Promise((res, rej) => { //* Promise<unknown>
    setTimeout(res, 1000); //! value를 넣지않고 resolve하는 것.
});
//* new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

Promise.all([promise1, promise2, promise3]).then((result) => {
    //? { '0': promise1, '1': promise2, '2': promise3, length: 3 }
    console.log(result); // ['3', 2, undefined]
});

//* all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

//? T = [promise1, promise2, promise3] { '0': promise1, '1': promise2, '2': promise3, length: 3 }
//? keyof T = '0' | '1' | '2' | 'length'
const promiseArr = [1, 2, 3] as const;
type PromiseArr = keyof typeof promiseArr;
const propmiseKey: PromiseArr = 5; // '3'은 안됨

/*
? await 타입
type Awaited<T> =
    T extends null | undefined ? T : //! 사실 필요 없음
        T extends object & { then(onfulfilled: infer F): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
        ? 왜 Promise<>를 쓰지 않고 then을 썻냐 -> Promise에도 then이 있으므로 typescript가 같은걸로 취급해줌(Duck Typing)
        ? then(onfulfilled: infer F): any 이게 Promise의 모양이다.
        ? V와 F라는 새로운 타입을 생성.
            F extends ((value: infer V, ...args: any) => any) ? // if the argument to `then` is callable, extracts the first argument
                Awaited<V> : //? 재귀
                never : // the argument to `then` was not callable
        T; // non-object or non-thenable
? 상기 과정으로 타입을 추론해 내는 부분을 인지하고있어야할 듯.
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}
*/

//* Awaited 잘 활용하는 방법?
type awaitResult = Awaited<Promise<Promise<Promise<number>>>>;
//! 중첩된 Promise에서 최종 타입을 추론해 준다.

//* then이 있는 객체를 이렇게 활용할 수 도 있다.
type thenableType = Awaited<{ then(onfulfilled: (v: number) => number): any}>; //thenable
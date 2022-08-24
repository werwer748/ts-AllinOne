interface recordObj {
    [key: string]: number;
}

type dirRecord<T extends keyof any, S> = { // extends keyof any 생각보다 중요하네?
    [Key in T]: S;
};

const recordA: recordObj = { a: 3, b: 5, c: 7};
const recordB: Record<string, number> = { a: 3, b: 5, c: 7}; //? recordObj의 형태를 이런식으로 만들어 쓸 수 있게 한 것.

//* NonNullable Key에 적용 됨.
type nonNullableTest = string | null | undefined | boolean | number;
type nonnullableA = NonNullable<nonNullableTest>; //! null, undefined가 빠진다.

type dirNNA<T> = T extends null | undefined ? never : T;
type nonnullableB = dirNNA<nonNullableTest>; // string | boolean | number
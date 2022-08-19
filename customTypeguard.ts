interface Cat { meow: number }
interface Dog { bow: number }

function catOrDog(a: Cat | Dog): a is Dog { //? return 값에 is 를 쓸 수 있다. (타입을 구분해주는 커스텀 함수를 직접 만들 수 있다.)
    //* 타입 판별은 직접 만든다.
    //? a가 강이지 임을 직접 찾아내는 함수를 만든다.
    if ((a as Cat).meow) { return false }
    return true;
} //* 타입가드를 직접 만들어 봤다.
//? is 가 있으면 커스텀 타입가드 함수 -> if문 안에 써서 타입스크립트에게 정확한 타입이 뭔지 알려주는거
//! 간단한 타입의 경우 in typeof instanceof 를 쓰지만 복잡한 경우 is가 아니면 타입 추론이 안 되는 경우도 있다.
function pet(a: Cat | Dog) {
    if (catOrDog(a)) { // catOrDog가 true니까 bow가 존재함
        console.log(a.bow);
    }
    if ('meow' in a) {
        console.log(a.meow);
    }
}

const catt: Cat | Dog = { meow: 3 }
if (catOrDog(catt)) {
    console.log(catt.meow);
}
if ('meow' in catt) {
    console.log(catt.meow)
}

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => {
    return input.status === 'rejected'
};
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => {
    return input.status === 'fulfilled'
};
/*
? Promise 기본 지식
* Promise -> Pending -> Settled(Resolved, Rejected)
* promises.then().catch() <-Settled

? PromiseSettledResult 안에는 PromiseRejectedResult 와 PromiseFulfilledResult 가 있다.
*/
const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]); //! 이것만 보면 성공여부를 알 수 없다.( 타입이 PromiseSettledResult 로 잡힘)
//* const errors = promises.filter((promise) => promise.status === 'rejected'); //javascript에서 실패한 것만 모아놓음. 근데 아직도 타입은 PromiseSettledResult
//? 그래서 이떄 쓰는게 is 이거랑 isRejected랑 결국 같은 함수지만 is가 있냐없냐의 차이
const errors = promises.filter(isRejected);
//* 그래서 결론은 이렇게 쓰니까 타입이 PromiseRejectedResult로 고정이 됨.

export {};
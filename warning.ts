//TODO 타입스크립트 사용 시 주의사항.
interface Axios {
    get(): void;
}
/*
javascript error
name: string;
message: string;
stack?: string;
*/

// interface CustomError extends Error {
//     response?: {
//         data: any;
//     }
// }
//! interface면 자바스크립트에서 사라짐

class CustomError extends Error {
    response?: {
        data: any;
    }
}
//! javascript에서 남아있으면서 interface와 비슷한 역할을 해준다.

declare const axios: Axios;

(async () => {
    try {
        await axios.get();
    } catch (err: unknown) {
        /*
        //console.error((err as CustomError).response?.data); //! <- 일회성
        const customError = err as CustomError; //* 타입스크립트는 건망증이 심하기 때문에 변수에 담아준다. as는 unknown일때 써야한다.
        console.error(customError.response?.data);
        // err.response?.data 바로 위에서 똑같이 썻는데 에러가 뜸
        customError.response?.data;
        ! 실제로 이렇게 쓰면 에러가 난다. 설명을 위한 예시
        */
       if (err instanceof CustomError) { //? as를 쓰지 않아도 된다. 가장 좋은방법
            // const customError = err;
            console.error(err.response?.data);
            err.response?.data;
       }
    }
})();
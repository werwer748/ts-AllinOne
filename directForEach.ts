interface dirFEArr<T> { //? 제네릭 위치가 헷갈릴 때는 가까운 위치부터 안 -> 밖으로 넣어보자.
    forEach(callback: (item: T, index: number) => void): void;
    //forEach(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): void; // 정답
    //? 정답은 직접 만들기 어렵다 : index, array(원본배열)을 쓰기가 어렵기 때문
    //! 조금씩 만들어 나가야 한다. 처음부터 모든 경우를 예상해서 타입을 작성하기는 어렵다.
    //! 따라서 처음부터 모든 타입을 작성하려하지말고 에러가 없는 선에서 코드가 고도화되는데 따라서 조금씩 추가해서 작성.
}

const dirFE: dirFEArr<number> = [1, 2, 3];

dirFE.forEach((item, index) => {
    console.log(item, index);
    item.toFixed(1);
});

dirFE.forEach((item) => {
    console.log(item);
    return '3';
});

const dirFE2: dirFEArr<string> = ['1', '2', '3'];

dirFE2.forEach((item) => {
    console.log(item);
    item.charAt(3);
});

dirFE2.forEach((item) => {
    console.log(item);
    return '3';
});

//? 타입 딴에서 에러가나면 정상적으로 돌악는 가는데 나중에야 발견되는 경우가 있다.
//? 이럴때는 발견 했을 때 그때 그때 고친다!
const basic = (b: number = 3, c: number = 5) => { // 기본값 많이들 헷갈려한다고...
    return '3';
}

const basic2 = (b: { children: string } = { children: 'hugoKang' }) => { //이건 나도 헷갈림
}
//? 매개변수에 기본값있을때 위치하 헷갈릴 수 있으니 주의!!

//* JSX의 경우
//* 타입스크립트가 뷰 딴 과 헷갈려 오류가 뜨는것, T에 기본값을 줘서 해결
const addBasic = <T = unknown>(x: T, y: T) => ({ x, y});
//? const addBasic = <T extends unknown>(x: T, y: T) => ({ x, y});
//? const addBasic = <T,>(x: T, y: T) => ({ x, y}); 이런 것도 된다고 합니다...
const addBasicResult = addBasic(1, 2);
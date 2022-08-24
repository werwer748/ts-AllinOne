interface Profile {
    name: string;
    age: number;
    married: boolean;
}

type utilP<T> = {
    //? [Key: string]: string; //인덱스 시그니쳐
    //? [Key in keyof T]: string; // 어떤 값이 오든 그걸 키값으로 쓰는 것
    //? [Key in keyof Profile]?: string; // 이렇게 하면 모든 키가 옵셔널이 된다.
    [Key in keyof T]?: T[Key]; // 해당 키의 타입들을 가져올 수 있다.
    //* Partial을 구현 함
}
/*
    * utilP해석
    utilP<Profile> {
      name?: string,
      age?: number,
      married?: boolean,
    }
*/

const utilHugo: Profile = {
    name: 'hugo',
    age: 30,
    married: true,
}

const newUtilHugo: Partial<Profile> = { //? Partial 필수 값이었던 것들을 옵셔널로 바꿔줌
  name: 'hugo',
  age: 30,
}
//* 하지만 Partial이 되면 모든 값을 넣지 않아도 되게 되는데 이게 문제.

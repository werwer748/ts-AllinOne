interface Profile {
    name: string;
    age: number;
    married: boolean;
}

type pickP<T, S extends keyof T> = { //! 제네릭에 재한 조건을 먼저 준다. 여기서는 S와 T를 연결
    [Key in S]?: T[Key]; 
}

const pickugo: Profile = {
    name: 'hugo',
    age: 30,
    married: true,
}

const newPickHugo: pickP<Profile, 'name' | 'age'> = {
    name: 'hugo',
    age: 30,
}
/*
    ? Pick: 필요한 키만 쓸 수 있게 해준다.
    ? Omit: 옵셔널로 받을 키를 정한다.
    * interface에 적용됨
*/

const newPickHugo2: Omit<Profile, 'married'> = {
    name: 'hugo',
    age: 30,
}
const newPickHugo3: Pick<Profile, Exclude<keyof Profile, 'married'>> = { //? 이게 Omit
    name: 'hugo',
    age: 30,
}
type directOmit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>> //! extends keyof any -> S는 string | number | simbol 이 되야하기 때문.
const newPickHugo4: directOmit<Profile, 'married'> = { //? Omit 직접 구현해 타이핑
    name: 'hugo',
    age: 30,
}
/*
? 오밋을 알기 위해
    * type Exclude<T, U> = T extends U ? never : T;

    * type Extract<T, U> = T extends U ? T : never;

    * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
    ? Pick 과 Exclude를 섞어서 만들었다.
*/
type excludeAnimal = 'Cat' | 'Dog' | 'Human';
//? Exclude 필요 없는것만 제외해 줌.
type excludeMammal = Exclude<excludeAnimal, 'Human'>;
//* Exclude<excludeAnimal, 'Human'> = <'Cat' | 'Dog' | 'Human'> extends 'Human' ? -> <'Cat' | 'Dog' | never(안쓰는거니까 버림)>

type excludeTest = Exclude<keyof Profile, 'married'>

//? Extract 필요한 것만 뽑아 줌.
type extractHuman = Extract<excludeAnimal, 'Human'>
//* Extract<excludeAnimal, 'Cat' | 'Dog'> = <'Cat' | 'Dog' | 'Human'> extends 'Human' ? -> <never(안쓰는거니까 버림) | never(안쓰는거니까 버림) | 'Human'>
//! Exclude, Extract는 Key에 적용 됨
interface requiredProfile {
    name?: string;
    age?: number;
    married?: boolean;
}

type required<T> = {
    [Key in keyof T]-?: T[Key];
    //* ?만 하면 전부다 옵셔널
    //* -? 하면 모든 물음표를 제거해라. 모디파이어?
};

const requiredHugo: required<requiredProfile> = { //? Required는 키값들을 필수값으로 바꾼다.
    name: 'Kang',
    age: 30,
    married: true,
};

type dirReadOnly<T> = {
    readonly [Key in keyof T]: T[Key];
    //* -readonly [Key in keyof T]: T[Key]; -이런식으로 활용 가능 ㅋ.ㅋ
}

const readOnlyHugo: dirReadOnly<requiredProfile> = { //? 모든 키값을 읽기전용으로 바꾼다.
    name: 'Kang',
    age: 30,
    married: true,
};

readOnlyHugo.age = 20; // 읽기전용이 되어 수정불가
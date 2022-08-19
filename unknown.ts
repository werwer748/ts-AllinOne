interface UnA {
  talk: () => void;
}
const una: UnA = {
  talk() { return 3; },
};
const unb = una.talk() as unknown as number;
// (unb as UnA).talk();
unb.toString();

//! any 쓸꺼면 그냥 unknown 쓴다 라고 생각
//? any는 타입스크립트가 타입 검사를 포기함
//? unknown은 당장 타입에 대한 확신이 없을때 나중에 타입을 지정해서 쓸 수 있다.

//* try { } catch (error) {}
//* 사용시 에러는 unknown 임 그래서 (error as AxiosError) 같은걸 사용 함

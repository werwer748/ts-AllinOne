tsc: 타입스크립트 컴파일러
- 역할: 
1. 타입스크립트 파일을 JS파일로 변환
2. 타입을 추론(명확하게 타입을 명시해주면 타입을 기억함)

But! 두가지 기능은 따로 작동함
-타입스크립트에서 에러가 나도 JS파일로 변환은 가능하다

결국 짜는 코드는 JS기 때문에 JS를 항상 염두해 둘것!

에디터가 필수 임(vscode, webstorm은 playground의 역할을 해주기 때문에)

프로젝트 생성시

npm init -y -> package.json 생성
npm i typescript -> npx tsc --init -> tsconfig.json 을 생성
두 파일이 타입스크립트 프로젝트의 핵심

npx tsc 에러가 있어도 JS파일로 변환해 줌
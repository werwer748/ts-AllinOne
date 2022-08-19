function abc(a: number, b?:number, c?: number) {} //? b? 는 있어도 되고 없어도 된다
//* function abc(...args: number[]) {} 전부다 받아 갯수 상관없이

abc(1)
abc(1, 2)
abc(1, 2, 3)
//* abc(1, 2, 3, 6) <- function abc(...args: number[]) {}

let dada: { a: string, b?: string } = { a: "show me the", b: "money"} //? b는 있어도 그만 없어도그만 c...은 있으면 안됨
dada = { a: 'show me the' };
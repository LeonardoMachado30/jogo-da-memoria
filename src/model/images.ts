const fruits = [
  { src: 'fruits/abacaxi.png', alt: 'abacaxi' },
  { src: 'fruits/banana.png', alt: 'banana' },
  { src: 'fruits/beterraba.png', alt: 'beterraba' },
  { src: 'fruits/carambola.png', alt: 'carambola' },
  { src: 'fruits/cereja.png', alt: 'cereja' },
  { src: 'fruits/kiwi.png', alt: 'kiwi' },
  { src: 'fruits/laranja.png', alt: 'laranja' },
  { src: 'fruits/limao.png', alt: 'limao' },
  { src: 'fruits/manga.png', alt: 'manga' },
  { src: 'fruits/melancia.png', alt: 'melancia' },
  { src: 'fruits/mixirica.png', alt: 'mixirica' },
  { src: 'fruits/morango.png', alt: 'morango' },
  { src: 'fruits/pera.png', alt: 'pera' },
  { src: 'fruits/pessego.png', alt: 'pessego' },
  { src: 'fruits/pitaia.png', alt: 'pitaia' },
  { src: 'fruits/tamarindo.png', alt: 'tamarindo' },
  { src: 'fruits/uva.png', alt: 'uva' },
  { src: 'fruits/uva_roxa.png', alt: 'uva roxa' },
  { src: 'fruits/uva_verde.png', alt: 'uva verde' },
  { src: 'fruits/jabuticaba.png', alt: 'jabuticaba' },
  { src: 'fruits/maca_verde.png', alt: 'maca_verde' },
  { src: 'fruits/melancia_cortada.png', alt: 'melancia cortada' },
  { src: 'fruits/goiaba.png', alt: 'goiaba cortada' },
  { src: 'fruits/lichia.png', alt: 'lichia' },
];

const emojis = [
  { src: 'emojis/amorzinho1.png', alt: 'amorzinho1' },
  { src: 'emojis/amorzinho2.png', alt: 'amorzinho2' },
  { src: 'emojis/amorzinho3.png', alt: 'amorzinho3' },
  { src: 'emojis/diabinho.png', alt: 'diabinho' },
  { src: 'emojis/dinheiro.png', alt: 'dinheiro' },
  { src: 'emojis/dinheiro-1.png', alt: 'dinheiro-1' },
  { src: 'emojis/feliz.png', alt: 'feliz' },
  { src: 'emojis/feliz2.png', alt: 'feliz2' },
  { src: 'emojis/feliz3.png', alt: 'feliz3' },
  { src: 'emojis/feliz4.png', alt: 'feliz4' },
  { src: 'emojis/feliz5.png', alt: 'feliz5' },
  { src: 'emojis/feliz6.png', alt: 'feliz6' },
  { src: 'emojis/feliz7.png', alt: 'feliz7' },
  { src: 'emojis/feliz8.png', alt: 'feliz8' },
  { src: 'emojis/feliz9.png', alt: 'feliz9' },
  { src: 'emojis/feliz10.png', alt: 'feliz10' },
  { src: 'emojis/feliz12.png', alt: 'feliz12' },
  { src: 'emojis/feliz13.png', alt: 'feliz13' },
  { src: 'emojis/feliz14.png', alt: 'feliz14' },
  { src: 'emojis/feliz15.png', alt: 'feliz15' },
  { src: 'emojis/feliz16.png', alt: 'feliz16' },
  { src: 'emojis/feliz17.png', alt: 'feliz17' },
  { src: 'emojis/nojinho1.png', alt: 'nojinho1' },
  { src: 'emojis/nojinho2.png', alt: 'nojinho2' },
  { src: 'emojis/raivoso1.png', alt: 'raivoso1' },
  { src: 'emojis/raivoso2.png', alt: 'raivoso2' },
  { src: 'emojis/raivoso3.png', alt: 'raivoso3' },
  { src: 'emojis/raivoso4.png', alt: 'raivoso4' },
  { src: 'emojis/raivoso5.png', alt: 'raivoso5' },
  { src: 'emojis/triste1.png', alt: 'triste1' },
  { src: 'emojis/triste2.png', alt: 'triste2' },
  { src: 'emojis/triste3.png', alt: 'triste3' },
  { src: 'emojis/triste4.png', alt: 'triste4' },
  { src: 'emojis/triste5.png', alt: 'triste5' },
  { src: 'emojis/triste6.png', alt: 'triste6' },
  { src: 'emojis/triste7.png', alt: 'triste7' },
  { src: 'emojis/triste8.png', alt: 'triste8' },
  { src: 'emojis/triste9.png', alt: 'triste9' },
  { src: 'emojis/triste10.png', alt: 'triste10' },
  { src: 'emojis/triste11.png', alt: 'triste11' },
  { src: 'emojis/triste12.png', alt: 'triste12' },
  { src: 'emojis/triste13.png', alt: 'triste13' },
  { src: 'emojis/triste14.png', alt: 'triste14' },
  { src: 'emojis/triste15.png', alt: 'triste15' },
];

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [newArr[i] as any, newArr[j] as any] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const randomImagesEmojis = shuffleArray(emojis);
export const randomImagesFruits = shuffleArray(fruits);

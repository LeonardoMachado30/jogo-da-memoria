import gsap from 'gsap';

export function distributeCardsAnimation(
  { card, index, containerRect, centerX, centerY }: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  callbackAnimation: () => void,
) {
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;

  const deltaX = centerX - cardCenterX;
  const deltaY = centerY - cardRect.top;

  gsap.fromTo(
    card,
    {
      x: deltaX,
      y: deltaY,
      rotation: gsap.utils.random(-45, 45),
      scale: 0.3,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.08,
      ease: 'back.out(1.2)',
      onComplete: () => {
        callbackAnimation();
      },
    },
  );
}

export function flipCardAnimation(
  callback?: () => void,
  onStartCallback?: () => void,
  onEndCallback?: () => void,
  tempoVirada: number = 6000,
) {
  // Seleciona todas as cartas com a classe 'card-wrapper'
  const cards = document.querySelectorAll<HTMLElement>('.card-wrapper');

  let cartasAnimadas = 0;
  const totalCartas = cards.length;

  if (totalCartas === 0) {
    if (callback) callback();
    return;
  }

  // Armazena as animações para poder dar reverse depois
  const animacoes: any = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  cards.forEach((card) => {
    const anim = gsap.to(card, {
      rotateY: 180,
      duration: 0.5,
      delay: 0,
      ease: 'power2.inOut',
      onStart: () => {
        card.classList.add('flipped');
        if (onStartCallback) onStartCallback();
      },
      onComplete: () => {
        cartasAnimadas++;
        if (cartasAnimadas === totalCartas) {
          setTimeout(() => {
            let cartasDesviradas = 0;
            cards.forEach((carta, idx) => {
              animacoes[idx].reverse();
              carta.classList.remove('flipped');
              if (onEndCallback) onEndCallback();
              cartasDesviradas++;
              if (cartasDesviradas === totalCartas && callback) {
                callback();
              }
            });
          }, tempoVirada);
        }
      },
    });
    animacoes.push(anim);
  });
}

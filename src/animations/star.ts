import gsap from 'gsap';

export function starAnimation(
  { star, index }: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const tl = gsap.timeline();

  tl.fromTo(
    star,
    {
      opacity: 0,
      y: -80,
      scale: 0,
      rotation: -180,
    },
    {
      opacity: 1,
      y: index + 1 === 2 ? -20 : 0,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      delay: index * 0.35,
      ease: 'back.out(2)',
    },
  )
    // Animação do "pulinho" (scale)
    .to(star, {
      scale: 1.4,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(star, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.in',
    });
}

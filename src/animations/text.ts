import gsap from 'gsap';

export function titleAnimation(tl: any) {
  if (!tl) {
    tl = gsap.timeline();
  }
  tl.fromTo(
    '.title',
    { y: 700, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' },
  );
}

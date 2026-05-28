import { detectPwaBrowser } from 'src/utils/pwa-browser';

/** Dispositivo com entrada touch ou viewport estreita (celular/tablet). */
export function isMobileGameDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
  const touchPoints = navigator.maxTouchPoints > 0;

  return coarsePointer || narrowViewport || touchPoints;
}

export function isSafariBrowser(): boolean {
  const family = detectPwaBrowser();
  return family === 'safari-ios' || family === 'safari-macos';
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Efeitos visuais pesados (vídeo, blend, GSAP em massa) desligados ou simplificados. */
export function shouldUseLiteEffects(): boolean {
  return prefersReducedMotion() || isMobileGameDevice() || isSafariBrowser();
}

/** Flip 3D (`preserve-3d`) é caro no Safari mobile — usar transição 2D por opacidade. */
export function shouldUseLiteCardFlip(): boolean {
  return shouldUseLiteEffects();
}

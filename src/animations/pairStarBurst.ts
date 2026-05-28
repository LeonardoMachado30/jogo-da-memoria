import gsap from 'gsap';
import { prefersReducedMotion, shouldUseLiteEffects } from 'src/utils/performance';

const STAR_VIDEO_SRC = '/star.webm';
const MAX_STARS = 5;
const LITE_MAX_STARS = 2;
const STAR_SIZE_PX = 40;
export const PAIR_STAR_BURST_LAYER_CLASS = 'pair-star-burst-layer';
const BURST_LAYER_CLASS = PAIR_STAR_BURST_LAYER_CLASS;
const STAR_CLASS = 'pair-star-burst__star';
const BURST_STYLES_ID = 'pair-star-burst-styles';

type BorderSide = 'top' | 'right' | 'bottom' | 'left';

function ensureBurstStyles(lite: boolean): void {
  if (document.getElementById(BURST_STYLES_ID)) return;

  const blendRule = lite
    ? ''
    : `
      mix-blend-mode: screen;
      -webkit-mix-blend-mode: screen;
    `;

  const style = document.createElement('style');
  style.id = BURST_STYLES_ID;
  style.textContent = `
    .${BURST_LAYER_CLASS} {
      background: transparent !important;
    }
    .${STAR_CLASS} {
      background: transparent !important;
      background-color: transparent !important;
      object-fit: contain;
      border: none;
      box-shadow: none;
      ${blendRule}
    }
    .${STAR_CLASS}--lite {
      font-size: ${STAR_SIZE_PX}px;
      line-height: 1;
      filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.85));
      will-change: transform, opacity;
    }
  `;
  document.head.appendChild(style);
}

interface SpawnPoint {
  x: number;
  y: number;
  endX: number;
  endY: number;
}

function getCardWrapperByIndex(index: number): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.card-wrapper[data-card-index="${index}"]`);
}

function randomBorderSpawn(rect: DOMRect): SpawnPoint {
  const sides: BorderSide[] = ['top', 'right', 'bottom', 'left'];
  const side = sides[Math.floor(Math.random() * sides.length)] as BorderSide;
  const edgeOffset = gsap.utils.random(0.15, 0.85);
  const margin = 6;
  const burstDistance = gsap.utils.random(55, 115);

  let x = 0;
  let y = 0;
  let normalX = 0;
  let normalY = 0;

  switch (side) {
    case 'top':
      x = rect.left + rect.width * edgeOffset;
      y = rect.top - margin;
      normalX = 0;
      normalY = -1;
      break;
    case 'bottom':
      x = rect.left + rect.width * edgeOffset;
      y = rect.bottom + margin;
      normalX = 0;
      normalY = 1;
      break;
    case 'left':
      x = rect.left - margin;
      y = rect.top + rect.height * edgeOffset;
      normalX = -1;
      normalY = 0;
      break;
    case 'right':
      x = rect.right + margin;
      y = rect.top + rect.height * edgeOffset;
      normalX = 1;
      normalY = 0;
      break;
  }

  const angle = Math.atan2(normalY, normalX) + gsap.utils.random(-0.75, 0.75);
  const endX = x + Math.cos(angle) * burstDistance;
  const endY = y + Math.sin(angle) * burstDistance;

  return { x, y, endX, endY };
}

function createStarVideoElement(): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = STAR_VIDEO_SRC;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.autoplay = true;
  video.className = STAR_CLASS;
  video.setAttribute('aria-hidden', 'true');
  Object.assign(video.style, {
    width: `${STAR_SIZE_PX}px`,
    height: `${STAR_SIZE_PX}px`,
    background: 'transparent',
    backgroundColor: 'transparent',
    objectFit: 'contain',
    mixBlendMode: 'screen',
    border: 'none',
    boxShadow: 'none',
  });
  void video.play().catch(() => undefined);
  return video;
}

function createLiteStarElement(): HTMLSpanElement {
  const star = document.createElement('span');
  star.textContent = '⭐';
  star.className = `${STAR_CLASS} ${STAR_CLASS}--lite`;
  star.setAttribute('aria-hidden', 'true');
  return star;
}

function distributeStarCounts(total: number, slots: number): number[] {
  const counts = Array.from({ length: slots }, () => 0);
  for (let i = 0; i < total; i += 1) {
    const slot = i % slots;
    counts[slot] = (counts[slot] ?? 0) + 1;
  }
  return counts;
}

function runBurstAnimation(
  wrappers: HTMLElement[],
  lite: boolean,
): void {
  ensureBurstStyles(lite);

  const existingLayer = document.querySelector(`.${BURST_LAYER_CLASS}`);
  existingLayer?.remove();

  const layer = document.createElement('div');
  layer.className = BURST_LAYER_CLASS;
  Object.assign(layer.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '10000',
    overflow: 'visible',
  });
  document.body.appendChild(layer);

  const maxStars = lite ? LITE_MAX_STARS : MAX_STARS;
  const starCounts = distributeStarCounts(maxStars, wrappers.length);
  const timeline = gsap.timeline({
    onComplete: () => {
      layer.remove();
    },
  });

  wrappers.forEach((wrapper, cardIdx) => {
    const rect = wrapper.getBoundingClientRect();
    const starsForCard = starCounts[cardIdx] ?? 0;

    for (let i = 0; i < starsForCard; i += 1) {
      const spawn = randomBorderSpawn(rect);
      const star = lite ? createLiteStarElement() : createStarVideoElement();

      gsap.set(star, {
        position: 'absolute',
        left: 0,
        top: 0,
        x: spawn.x,
        y: spawn.y,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-180, 180),
        transformOrigin: '50% 50%',
        force3D: true,
      });

      layer.appendChild(star);

      const moveDuration = lite ? 0.45 : gsap.utils.random(0.55, 0.9);

      timeline.to(
        star,
        {
          x: spawn.endX,
          y: spawn.endY,
          scale: lite ? 1 : gsap.utils.random(0.85, 1.25),
          opacity: 1,
          rotation: lite ? 0 : `+=${gsap.utils.random(-120, 120)}`,
          duration: moveDuration,
          ease: lite ? 'power2.out' : 'power3.out',
        },
        cardIdx * 0.04 + i * 0.06,
      );

      timeline.to(
        star,
        {
          opacity: 0,
          scale: lite ? 0.5 : gsap.utils.random(0.2, 0.45),
          duration: lite ? 0.25 : 0.35,
          ease: 'power2.in',
          onComplete: () => {
            if (star instanceof HTMLVideoElement) {
              star.pause();
            }
            star.remove();
          },
        },
        '>-0.12',
      );
    }
  });
}

/**
 * Explosão de estrelas ao acertar par. Em mobile/Safari usa emoji + menos partículas (sem WebM/blend).
 */
export function pairCorrectStarBurst(firstIndex: number, secondIndex: number): void {
  if (prefersReducedMotion()) return;

  const wrappers = [firstIndex, secondIndex]
    .map(getCardWrapperByIndex)
    .filter((el): el is HTMLElement => el !== null);

  if (wrappers.length === 0) return;

  const lite = shouldUseLiteEffects();

  requestAnimationFrame(() => {
    runBurstAnimation(wrappers, lite);
  });
}

/** Remove camada e tweens de estrelas (ex.: ao sair da rota de partida). */
export function clearPairStarBurstEffects(): void {
  document.querySelectorAll(`.${BURST_LAYER_CLASS}`).forEach((layer) => {
    gsap.killTweensOf(layer.querySelectorAll('*'));
    layer.remove();
  });
}

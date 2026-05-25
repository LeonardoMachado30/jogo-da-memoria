import gsap from 'gsap';

const STAR_VIDEO_SRC = '/star.webm';
const MAX_STARS = 5;
const STAR_SIZE_PX = 40;
export const PAIR_STAR_BURST_LAYER_CLASS = 'pair-star-burst-layer';
const BURST_LAYER_CLASS = PAIR_STAR_BURST_LAYER_CLASS;
const STAR_CLASS = 'pair-star-burst__star';
const BURST_STYLES_ID = 'pair-star-burst-styles';

type BorderSide = 'top' | 'right' | 'bottom' | 'left';

function ensureBurstStyles(): void {
  if (document.getElementById(BURST_STYLES_ID)) return;

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
      mix-blend-mode: screen;
      -webkit-mix-blend-mode: screen;
      border: none;
      box-shadow: none;
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

  const angle =
    Math.atan2(normalY, normalX) + gsap.utils.random(-0.75, 0.75);
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

function distributeStarCounts(total: number, slots: number): number[] {
  const counts = Array.from({ length: slots }, () => 0);
  for (let i = 0; i < total; i += 1) {
    const slot = i % slots;
    counts[slot] = (counts[slot] ?? 0) + 1;
  }
  return counts;
}

/**
 * Explosão de estrelas (star.webm) saindo das bordas dos dois cards do par correto.
 */
export function pairCorrectStarBurst(firstIndex: number, secondIndex: number): void {
  ensureBurstStyles();

  const wrappers = [firstIndex, secondIndex]
    .map(getCardWrapperByIndex)
    .filter((el): el is HTMLElement => el !== null);

  if (wrappers.length === 0) return;

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

  const starCounts = distributeStarCounts(MAX_STARS, wrappers.length);
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
      const star = createStarVideoElement();

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
      });

      layer.appendChild(star);

      timeline.to(
        star,
        {
          x: spawn.endX,
          y: spawn.endY,
          scale: gsap.utils.random(0.85, 1.25),
          opacity: 1,
          rotation: `+=${gsap.utils.random(-120, 120)}`,
          duration: gsap.utils.random(0.55, 0.9),
          ease: 'power3.out',
        },
        cardIdx * 0.04 + i * 0.06,
      );

      timeline.to(
        star,
        {
          opacity: 0,
          scale: gsap.utils.random(0.2, 0.45),
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            star.pause();
            star.remove();
          },
        },
        '>-0.12',
      );
    }
  });
}

/** Remove camada e tweens de estrelas (ex.: ao sair da rota de partida). */
export function clearPairStarBurstEffects(): void {
  document.querySelectorAll(`.${BURST_LAYER_CLASS}`).forEach((layer) => {
    gsap.killTweensOf(layer.querySelectorAll('*'));
    layer.remove();
  });
}

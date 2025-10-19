<template>
  <q-page class="level-selector-page">
    <!-- Background animado -->
    <div class="cyber-grid"></div>
    <div class="glow-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="content-wrapper">
      <!-- Título -->
      <div class="title-container">
        <h1 class="main-title">
          <span class="title-letter" v-for="(letter, i) in 'MEMORIX'" :key="`letter-${i}`">
            {{ letter }}
          </span>
        </h1>
        <div class="subtitle">SELECIONE SEU DESAFIO</div>
        <div class="title-underline"></div>
      </div>

      <!-- Tilemap de níveis -->
      <div class="tilemap-container">
        <div class="tilemap-grid" v-if="levelsConfig.length > 0">
          <div
            v-for="(level, index) in levelsConfig"
            :key="level.level"
            class="tile-wrapper"
            :class="`tile-pos-${index}`"
            :style="getTilePosition(index)"
          >
            <div
              class="level-tile"
              :class="[`level-${level.level}`, { 'tile-locked': isLevelLocked(level.level) }]"
              @click="!isLevelLocked(level.level) && selectLevel(level.level)"
              @mouseenter="hoverTile(level.level)"
              @mouseleave="unhoverTile()"
            >
              <!-- Hexágono de fundo -->
              <svg class="tile-hexagon" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    :id="`tileGrad-${level.level}`"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" :style="`stop-color:${getTileColor(level.color)}`" />
                    <stop offset="100%" :style="`stop-color:${getTileColor(level.color)}`" />
                  </linearGradient>
                </defs>
                <polygon
                  class="hex-bg"
                  points="50,5 90,25 90,65 50,85 10,65 10,25"
                  :fill="`url(#tileGrad-${level.level})`"
                  opacity="0.2"
                />
                <polygon
                  class="hex-border"
                  points="50,5 90,25 90,65 50,85 10,65 10,25"
                  fill="none"
                  :stroke="getTileColor(level.color)"
                  stroke-width="2"
                />
              </svg>

              <!-- Conteúdo do tile -->
              <div class="tile-content">
                <div class="level-number">{{ level.level }}</div>
                <div class="level-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      v-if="level.deck === 'default'"
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke-width="2"
                    />
                    <path v-else d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" />
                  </svg>
                </div>
                <div class="level-pairs">{{ level.pairs }} PARES</div>
              </div>

              <LockOverlay v-if="isLevelLocked(level.level)" />

              <!-- Efeito de brilho -->
              <div class="tile-shine"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info do nível selecionado -->
      <transition name="fade">
        <div class="level-info" v-if="hoveredLevel">
          <div class="info-card">
            <div class="info-label">NÍVEL {{ hoveredLevel }}</div>
            <div class="info-stats">
              <span
                >Grid: {{ getLevelConfig(hoveredLevel)?.gridSize }}x{{
                  getLevelConfig(hoveredLevel)?.gridSize
                }}</span
              >
              <span>•</span>
              <span
                >Modo: {{ getLevelConfig(hoveredLevel)?.deck === 'hard' ? 'HARD' : 'NORMAL' }}</span
              >
            </div>
          </div>
        </div>
      </transition>

      <!-- Aviso de login -->
      <div v-if="user" class="login-warning">
        <svg class="warning-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
        <span>LOGIN NECESSÁRIO PARA CONTABILIZAR CONQUISTAS</span>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGameStore } from 'stores/game-store';
import { useUserStore } from 'stores/user-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAudio } from 'src/composables/useAudio';
import LockOverlay from 'src/components/atoms/LockOverlay.vue';

import gsap from 'gsap';

const router = useRouter();
const useGame = useGameStore();
const useUser = useUserStore();
const { audioClick } = useAudio();

const { game, levelsConfig } = storeToRefs(useGame);
const { user } = storeToRefs(useUser);
const hoveredLevel = ref<number | null>(null);
const animationTimeline = ref<GSAPTimeline | null>(null);

// Simula níveis desbloqueados (ajuste conforme sua lógica)
const unlockedLevels = ref(10); // Todos desbloqueados para demo

// Mapeia cores do Quasar para hexadecimal
const colorMap: Record<string, string> = {
  'green-6': '#43a047',
  'amber-6': '#ffb300',
  'red-6': '#e53935',
  'blue-6': '#1e88e5',
  'purple-6': '#8e24aa',
  'deep-orange-6': '#f4511e',
  'teal-6': '#00897b',
  'indigo-6': '#3949ab',
  'pink-6': '#d81b60',
  black: '#000000',
};

function getTileColor(color: string): string {
  return colorMap[color] || '#00f5ff';
}

function isLevelLocked(level: number): boolean {
  return level > unlockedLevels.value;
}

function getLevelConfig(level: number) {
  return levelsConfig.value.find((l) => l.level === level);
}

function getTilePosition(index: number) {
  const cols = 4;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const offset = row % 2 === 1 ? 50 : 0;

  return {
    '--tile-col': col,
    '--tile-row': row,
    '--tile-offset': `${offset}px`,
  };
}

function hoverTile(level: number) {
  hoveredLevel.value = level;

  gsap.to(`.level-${level}`, {
    scale: 1.15,
    duration: 0.3,
    ease: 'back.out(2)',
  });

  gsap.to(`.level-${level} .hex-border`, {
    strokeWidth: 4,
    duration: 0.2,
  });
}

function unhoverTile() {
  if (hoveredLevel.value) {
    gsap.to(`.level-${hoveredLevel.value}`, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(`.level-${hoveredLevel.value} .hex-border`, {
      strokeWidth: 2,
      duration: 0.2,
    });
  }

  hoveredLevel.value = null;
}

function selectLevel(level: number) {
  audioClick();

  const tl = gsap.timeline();

  // Animação de saída
  tl.to(`.level-${level}`, {
    scale: 0.8,
    opacity: 0,
    duration: 0.2,
  })
    .to(
      '.level-tile',
      {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.in(2)',
      },
      '-=0.1',
    )
    .to(
      '.main-title',
      {
        y: -100,
        opacity: 0,
        duration: 0.3,
      },
      '-=0.3',
    );

  tl.eventCallback('onComplete', () => {
    game.value.currentLevel = level;
    void router.push(`/partida?level=${level}`);
  });
}

function initAnimations() {
  // Limpa animações anteriores
  if (animationTimeline.value) {
    animationTimeline.value.kill();
  }

  const tl = gsap.timeline();
  animationTimeline.value = tl;

  // Define estado inicial dos tiles
  gsap.set('.level-tile', {
    scale: 0,
    opacity: 0,
    rotation: 360,
  });

  gsap.set('.title-letter', {
    y: -100,
    opacity: 0,
    rotation: -180,
  });

  gsap.set('.subtitle', {
    opacity: 0,
    scale: 0,
  });

  gsap.set('.title-underline', {
    width: 0,
  });

  // Animação do título
  tl.to('.title-letter', {
    y: 0,
    opacity: 1,
    rotation: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'back.out(1.7)',
  })
    .to(
      '.subtitle',
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2)',
      },
      '-=0.3',
    )
    .to(
      '.title-underline',
      {
        width: '100%',
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.2',
    );

  // Animação dos tiles
  tl.to(
    '.level-tile',
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        from: 'start',
        ease: 'power2.out',
      },
      ease: 'back.out(1.5)',
    },
    '-=0.4',
  );

  // Animação de flutuação contínua
  gsap.to('.level-tile', {
    y: '+=10',
    duration: 2,
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // Pulso de brilho nos tiles
  gsap.to('.tile-shine', {
    opacity: 0.6,
    duration: 1.5,
    stagger: 0.3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  // Animação das orbs
  gsap.to('.orb-1', {
    x: 100,
    y: 50,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.orb-2', {
    x: -80,
    y: -60,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.orb-3', {
    x: 60,
    y: -80,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

onMounted(async () => {
  unlockedLevels.value = await useGame.getUserCurrentLevelUnlock();

  void nextTick().then(() => {
    setTimeout(() => {
      initAnimations();
    }, 50);
  });
});

onBeforeUnmount(() => {
  if (animationTimeline.value) {
    animationTimeline.value.kill();
  }
  gsap.killTweensOf('.level-tile, .tile-shine, .orb-1, .orb-2, .orb-3, .cyber-grid');
});
</script>

<style scoped lang="scss">
.level-selector-page {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.cyber-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.glow-orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #00f5ff, transparent);
  top: 10%;
  left: 20%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ff00ff, transparent);
  bottom: 10%;
  right: 15%;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #7000ff, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-wrapper {
  position: relative;
  z-index: 1;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 3vh, 2rem) clamp(1rem, 3vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
  gap: clamp(1rem, 2vh, 2rem);
}

.title-container {
  text-align: center;
  flex-shrink: 0;
  z-index: 2;
}

.main-title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: center;
  gap: clamp(0.2rem, 1vw, 0.5rem);
}

.title-letter {
  display: inline-block;
  background: linear-gradient(135deg, #00f5ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
  filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.3));
}

.subtitle {
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  color: #00f5ff;
  letter-spacing: 0.3em;
  margin-top: 0.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}

.title-underline {
  height: 3px;
  background: linear-gradient(90deg, transparent, #00f5ff, #ff00ff, transparent);
  margin: 1rem auto 0;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}

.tilemap-container {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 0;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;
}

.tilemap-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 2vw, 2rem);
  max-width: 900px;
  width: 100%;
  padding: 1rem;
}

.tile-wrapper {
  position: relative;
  aspect-ratio: 1;
  z-index: 2;
}

.level-tile {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(.tile-locked) {
    filter: drop-shadow(0 0 20px currentColor);
  }

  &.tile-locked {
    cursor: not-allowed;
    opacity: 0.4;
  }
}

.tile-hexagon {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hex-bg {
  transition: opacity 0.3s;
}

.hex-border {
  transition: stroke-width 0.2s;
  filter: drop-shadow(0 0 5px currentColor);
}

.tile-content {
  position: absolute;
  inset: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.2rem, 1vw, 0.5rem);
  color: white;
}

.level-number {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 900;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.8);
}

.level-icon {
  width: clamp(1.2rem, 2.5vw, 2rem);
  height: clamp(1.2rem, 2.5vw, 2rem);
  color: #00f5ff;
  filter: drop-shadow(0 0 5px currentColor);
}

.level-pairs {
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  letter-spacing: 0.1em;
  font-weight: 600;
  opacity: 0.8;
}

.tile-shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  pointer-events: none;
  border-radius: 10%;
}

.level-info {
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
}

.info-card {
  background: rgba(10, 14, 39, 0.95);
  border: 2px solid #00f5ff;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
}

.info-label {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 700;
  color: #00f5ff;
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.info-stats {
  display: flex;
  gap: 0.8rem;
  color: white;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  align-items: center;
  justify-content: center;
}

.login-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 69, 0, 0.2);
  border: 2px solid #ff4500;
  border-radius: 8px;
  color: #ff6347;
  font-weight: 600;
  font-size: clamp(0.65rem, 1.5vw, 0.85rem);
  text-align: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.3);
  flex-shrink: 0;
  z-index: 3;
}

.warning-icon {
  width: clamp(1rem, 3vw, 1.5rem);
  height: clamp(1rem, 3vw, 1.5rem);
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .tilemap-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .tilemap-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }

  .content-wrapper {
    gap: 0.8rem;
  }
}

@media (max-height: 700px) {
  .content-wrapper {
    gap: 0.5rem;
    padding: 0.5rem 1rem;
  }

  .tilemap-grid {
    gap: 0.8rem;
    padding: 0.5rem;
  }

  .title-container {
    margin-bottom: 0;
  }
}

@media (max-height: 600px) {
  .main-title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.6rem;
  }

  .tilemap-grid {
    gap: 0.5rem;
  }
}
</style>

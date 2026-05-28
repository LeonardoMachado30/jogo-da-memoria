<script setup lang="ts">
import { computed } from 'vue';
import { useAudio } from 'src/composables/useAudio';
import { useGameStore } from 'src/stores/game-store';
import { shouldUseLiteCardFlip } from 'src/utils/performance';

interface Card {
  src: string;
  alt: string;
  id: number;
}

const props = defineProps<{
  card: Card;
  index: number;
  cardColor?: string;
}>();

const useGame = useGameStore();
const { audioCard } = useAudio();
const liteFlip = shouldUseLiteCardFlip();

const faceUp = computed(() => {
  if (useGame.initialFlip) return true;
  if (useGame.flippedStatus[props.index]) return true;
  return useGame.revealedSlots[props.index] === true;
});

const flipClass = computed<string>(() => (faceUp.value ? 'flip-up' : 'flip-down'));

function toggleFlip(): void {
  if (!useGame.canFlipCard(props.index)) return;

  audioCard();
  useGame.onCardClick(props.index);
}
</script>

<template>
  <div
    class="card-container"
    :class="[flipClass, { 'card-container--lite': liteFlip }]"
    @click="toggleFlip"
  >
    <div class="card-inner">
      <div class="card-face card-back" :class="props.cardColor"></div>
      <div class="card-face card-front">
        <img
          :src="props.card.src"
          :alt="props.card.alt"
          class="card-img full-width full-height"
          loading="eager"
          decoding="async"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  cursor: pointer;
  aspect-ratio: 1/1;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  contain: layout style;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: translateZ(0);
  will-change: transform;
}

.flip-up .card-inner {
  transform: rotateY(180deg) translateZ(0);
}

.flip-down .card-inner {
  transform: rotateY(0deg) translateZ(0);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
}

.card-back {
  background: #0284c7;
}

.card-front {
  transform: rotateY(180deg);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img {
  max-width: 60%;
  max-height: 60%;
  pointer-events: none;
  user-select: none;
}

/* Safari mobile: flip 2D por opacidade (sem preserve-3d) */
.card-container--lite {
  perspective: none;
}

.card-container--lite .card-inner {
  transform-style: flat;
  transition: none;
  will-change: auto;
}

.card-container--lite .card-face {
  backface-visibility: visible;
  -webkit-backface-visibility: visible;
  transition: opacity 0.22s ease;
}

.card-container--lite .card-front {
  transform: none;
}

.card-container--lite.flip-down .card-front {
  opacity: 0;
  visibility: hidden;
}

.card-container--lite.flip-down .card-back {
  opacity: 1;
}

.card-container--lite.flip-up .card-front {
  opacity: 1;
  visibility: visible;
}

.card-container--lite.flip-up .card-back {
  opacity: 0;
  visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .card-inner,
  .card-container--lite .card-face {
    transition: none;
  }
}
</style>

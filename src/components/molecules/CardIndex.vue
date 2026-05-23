<script setup lang="ts">
import { computed } from 'vue';
import { useAudio } from 'src/composables/useAudio';
import { useGameStore } from 'src/stores/game-store';

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

const faceUp = computed(() => useGame.isCardFaceUp(props.index));
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
    :class="[flipClass]"
    @click="toggleFlip"
    style="border: 5px; border-color: blue"
  >
    <div class="card-inner">
      <div class="card-face card-back" :class="props.cardColor"></div>
      <div class="card-face card-front">
        <img
          :src="props.card.src"
          :alt="props.card.alt"
          class="card-img full-width full-height"
          loading="lazy"
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
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-up .card-inner {
  transform: rotateY(180deg);
}

.flip-down .card-inner {
  transform: rotateY(0deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
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
}
</style>

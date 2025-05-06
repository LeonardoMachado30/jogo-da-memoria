<script setup lang="ts">
import { ref, computed, watch, defineExpose } from 'vue';

interface Card {
  src: string;
  alt: string;
}

const props = defineProps<{
  card: Card;
  index: number;
  flippedExternally: boolean | undefined;
  locked: boolean;
}>();

const emit = defineEmits<{
  (e: 'flip', payload: { index: number; alt: string }): void;
}>();

const flipped = ref<boolean>(false);

watch(
  () => props.flippedExternally,
  (newVal) => {
    flipped.value = newVal;
  },
);

const flipClass = computed<string>(() => (flipped.value ? 'flip-up' : 'flip-down'));

function toggleFlip(): void {
  if (props.locked || flipped.value) return;
  flipped.value = true;
  emit('flip', { index: props.index, alt: props.card.alt });
}

defineExpose({
  flipDown: (): void => {
    flipped.value = false;
  },
});
</script>

<template>
  <div
    class="card-container"
    :class="flipClass"
    @click="toggleFlip"
    style="min-height: 80px; min-width: 80px"
  >
    <div class="card-inner">
      <div class="card-face card-back"></div>
      <div class="card-face card-front">
        <img
          :src="props.card.src"
          :alt="props.card.alt"
          class="card-img"
          width="80"
          height="80"
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
  width: 100%;
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
}
</style>

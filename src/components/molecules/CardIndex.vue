<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAudio } from 'src/composables/useAudio';

interface Card {
  src: string;
  alt: string;
}

const props = defineProps<{
  card: Card;
  index: number;
  flippedExternally: boolean;
  locked: boolean;
}>();

const emit = defineEmits<{
  (e: 'flip', payload: { index: number; alt: string }): void;
}>();

const { audioCard } = useAudio();

const flipped = ref<boolean>(false);

watch(
  () => props.flippedExternally,
  (newVal) => {
    flipped.value = newVal;
  },
  { immediate: true },
);

const flipClass = computed<string>(() => (flipped.value ? 'flip-up' : 'flip-down'));

function toggleFlip(): void {
  if (props.locked || flipped.value) return;
  flipped.value = true;
  audioCard();
  emit('flip', { index: props.index, alt: props.card.alt });
}

defineExpose({
  flipDown: (): void => {
    audioCard();
    flipped.value = false;
  },
});
</script>

<template>
  <div
    class="card-container"
    :class="flipClass"
    @click="toggleFlip"
    style="border: 5px; border-color: blue"
  >
    <div class="card-inner">
      <div class="card-face card-back"></div>
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

// src/composables/useLevel.ts
import { ref, computed } from 'vue';

interface Fruit {
  src: string;
  alt: string;
}

const baseFruits: Fruit[] = [
  { src: '/fruits/melancia.png', alt: 'melancia' },
  { src: '/fruits/morango.png', alt: 'morango' },
  { src: '/fruits/maca.png', alt: 'maça' },
  { src: '/fruits/laranja.png', alt: 'laranja' },
  { src: '/fruits/banana.png', alt: 'banana' },
  { src: '/fruits/uva.png', alt: 'uva' },
  { src: '/fruits/cereja.png', alt: 'cereja' },
  { src: '/fruits/abacaxi.png', alt: 'abacaxi' },
  { src: '/fruits/kiwi.png', alt: 'kiwi' },
  { src: '/fruits/limao.png', alt: 'limão' },
  { src: '/fruits/goiaba.png', alt: 'goiaba' },
  { src: '/fruits/manga.png', alt: 'manga' },
  { src: '/fruits/pera.png', alt: 'pera' },
  { src: '/fruits/figo.png', alt: 'figo' },
  { src: '/fruits/ameixa.png', alt: 'ameixa' },
  { src: '/fruits/tamarindo.png', alt: 'tamarindo' },
  { src: '/fruits/framboesa.png', alt: 'framboesa' },
  { src: '/fruits/maracuja.png', alt: 'maracujá' },
];

const levelsConfig = [
  { level: 1, gridSize: 4, pairs: 8 }, // 4x4 = 16 cartas
  { level: 2, gridSize: 6, pairs: 18 }, // 6x6 = 36 cartas
  { level: 3, gridSize: 8, pairs: 24 }, // 6x8 = 48 cartas
  { level: 4, gridSize: 8, pairs: 32 }, // 6x10 = 64 cartas
];

const currentLevel = ref(1);

const currentConfig = computed(
  () => levelsConfig.find((cfg) => cfg.level === currentLevel.value) || levelsConfig[0],
);

const gridSize = computed(() => currentConfig.value?.gridSize);
const totalCards = computed(() => (currentConfig.value?.pairs as number) * 2);

const levelCardSet = computed(() => {
  const selected = baseFruits.slice(0, currentConfig.value?.pairs);
  return [...selected, ...selected];
});

function nextLevel() {
  const maxLevel = levelsConfig.length;
  if (currentLevel.value < maxLevel) {
    currentLevel.value++;
  }
}

function resetLevel() {
  currentLevel.value = 1;
}

export default function useLevel() {
  return {
    currentLevel,
    gridSize,
    totalCards,
    levelCardSet,
    nextLevel,
    resetLevel,
    baseFruits,
    levelsConfig,
  };
}

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from 'stores/game-store';
import { formattedTime, formattedTimeStart, isTimeOver } from 'src/composables/useTimer';
import CardIndex from 'components/molecules/CardIndex.vue';
import ModalFailedGame from 'components/organisms/ModalFailedGame.vue';
import ModalNextLevel from 'components/organisms/ModalNextLevel.vue';

interface Card {
  src: string;
  alt: string;
}

const useGame = useGameStore();
const {
  initialFlip,
  currentScore,
  gridSize,
  levelCardSet,
  currentLevel,
  totalCards,
  lockBoard,
  attemptCounter,
  flippedStatus,
  cardRefs,
} = storeToRefs(useGame);

const showModalEnd = ref<boolean>(false);
const isOneMinuteAlert = ref(false);
const pulseKey = ref(0);
const modalFailedGame = ref(false);

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [newArr[i] as any, newArr[j] as any] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const fruits = ref<Card[]>(shuffleArray([...levelCardSet.value]));

watch(formattedTime, (newTime) => {
  useGame.pulseTimerList.forEach((time) => {
    if (newTime === time) {
      isOneMinuteAlert.value = true;
      setTimeout(() => {
        isOneMinuteAlert.value = false;
      }, 2000);
    }
  });
});

watch(levelCardSet, (newCards) => {
  fruits.value = shuffleArray([...newCards]);
  flippedStatus.value.splice(0, flippedStatus.value.length, ...Array(newCards.length).fill(false));
});

watch(
  () => flippedStatus.value,
  async (newValue) => {
    if (newValue.every((val) => val)) {
      showModalEnd.value = true;

      await useGame.endGame();
    }
  },
  { deep: true },
);

watch(initialFlip, (val) => {
  if (val) {
    const interval = setInterval(() => {
      pulseKey.value++;
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  }
});

watch(isTimeOver, (val) => {
  if (val && !showModalEnd.value) {
    modalFailedGame.value = !modalFailedGame.value;
  }
});

onMounted(() => {
  useGame.startGameEffects();
});
</script>

<template>
  <q-page class="--container">
    <section>
      <div
        class="--grid"
        :style="{ gridTemplateColumns: `repeat(${gridSize}, minmax(20px, 1fr))` }"
      >
        <template v-for="(total, index) in totalCards" :key="index">
          <CardIndex
            :index="index"
            :card="fruits[index] ?? { src: '', alt: '' }"
            :flipped-externally="initialFlip || flippedStatus[index]"
            :locked="lockBoard"
            @flip="useGame.onFlip"
            ref="cardRefs"
          />
        </template>
      </div>

      <div class="flex justify-between text-principal q-pt-md">
        <p>Nivel: {{ currentLevel }}</p>
        <p>Pontuação: {{ currentScore }}</p>
        <p>Tentativas: {{ attemptCounter }}</p>
        <transition name="time-pulse" mode="out-in">
          <p :key="initialFlip ? 'pulse-' + pulseKey : formattedTime" class="text-bold">
            {{ initialFlip ? formattedTimeStart : formattedTime }}
          </p>
        </transition>
      </div>
    </section>

    <ModalNextLevel v-model:showModal="showModalEnd" />

    <ModalFailedGame v-model="modalFailedGame" />
  </q-page>
</template>

<style scoped lang="scss">
.--container {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 1rem 0 1rem;
}

.--grid {
  display: grid;
  grid-gap: 8px;
}

.time-pulse-enter-active,
.time-pulse-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.time-pulse-enter-from,
.time-pulse-leave-to {
  transform: scale(1.4);
  opacity: 0.6;
}

.time-pulse-enter-to,
.time-pulse-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>

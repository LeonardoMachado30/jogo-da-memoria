<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import CardIndex from 'components/molecules/CardIndex.vue';
import initTimer, { formattedTime, resetTimer } from 'src/composable/stopwatch';
import { useScoreStore } from 'src/stores/score-store';
import { storeToRefs } from 'pinia';
import useLevel from 'src/composable/useLevel';
import ModalNextLevel from 'components/organisms/ModalNextLevel.vue';

const { gridSize, levelCardSet, resetLevel, currentLevel, totalCards } = useLevel();

interface Card {
  src: string;
  alt: string;
}

interface FlippedCard {
  index: number;
  alt: string;
}

interface CardRef {
  flipDown: () => void;
}

initTimer();

const scoreStore = useScoreStore();
const { currentScore } = storeToRefs(scoreStore);

const flippedCards = ref<FlippedCard[]>([]);
const flippedStatus = reactive<boolean[]>(Array(totalCards.value).fill(false));
const cardRefs = ref<(CardRef | null)[]>([]);
const lockBoard = ref<boolean>(false);
const showModalEnd = ref<boolean>(false);
const isOneMinuteAlert = ref(false);

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

function onFlip({ index, alt }: FlippedCard): void {
  if (lockBoard.value) return;

  flippedCards.value.push({ index, alt });

  if (flippedCards.value.length === 2) {
    lockBoard.value = true;
    const [first, second] = flippedCards.value;

    if (first && second) {
      if (first.alt === second.alt) {
        flippedStatus[first.index] = true;
        flippedStatus[second.index] = true;
        flippedCards.value = [];
        lockBoard.value = false;
        resetTimer();
      } else {
        setTimeout(() => {
          cardRefs.value[first.index]?.flipDown();
          cardRefs.value[second.index]?.flipDown();
          flippedCards.value = [];
          lockBoard.value = false;
        }, 1000);
      }
    }
  }
}

watch(formattedTime, (newTime) => {
  scoreStore.pulseTimerList.forEach((time) => {
    if (newTime != time) {
      return;
    }

    isOneMinuteAlert.value = true;
    setTimeout(() => {
      isOneMinuteAlert.value = false;
    }, 2000);
  });

  scoreStore.incrementScore(formattedTime.value);
});

watch(levelCardSet, (newCards) => {
  fruits.value = shuffleArray([...newCards]);
  flippedStatus.splice(0, flippedStatus.length, ...Array(newCards.length).fill(false));
});

watch(flippedStatus, () => {
  if (flippedStatus.every((val) => val)) {
    console.log('aqui carai');
    showModalEnd.value = true;
  }
});
</script>

<template>
  <q-page class="--container">
    <section>
      <h1 class="text-h2 text-center text-cyan-9 text-bold q-ma-none q-pt-xl">Escolha uma carta</h1>

      <div class="flex justify-between text-cyan-9">
        <p>Nivel: {{ currentLevel }}</p>
        <p>Pontuação: {{ currentScore }}</p>
        <transition name="time-pulse" mode="out-in">
          <p
            :key="formattedTime === '01:30' && isOneMinuteAlert ? 'alert' : 'normal'"
            class="text-bold"
          >
            {{ formattedTime }}
          </p>
        </transition>
      </div>

      <div class="--grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
        <template v-for="(total, index) in totalCards" :key="index">
          <CardIndex
            :index="index"
            :card="fruits[index] ?? { src: '', alt: '' }"
            :flipped-externally="flippedStatus[index]"
            :locked="lockBoard"
            @flip="onFlip"
            ref="cardRefs"
          />
        </template>
      </div>
    </section>

    <ModalNextLevel
      v-model:showModal="showModalEnd"
      v-model:currentLevel="currentLevel"
      @on-next-level="currentLevel = currentLevel + 1"
      @on-reset-level="resetLevel"
    />
  </q-page>
</template>

<style scoped lang="scss">
.--container {
  max-width: 720px;
  margin: 0 auto;
}

.--grid {
  display: grid;
  //grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
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

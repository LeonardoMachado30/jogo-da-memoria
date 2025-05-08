<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import {
  formattedTime,
  formattedTimeStart,
  resetTimer,
  isTimeOver,
} from 'src/composable/stopwatch';
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';
import { useBackgroundMusic } from 'src/composable/useBackgroundMusic';
import CardIndex from 'components/molecules/CardIndex.vue';
import ModalFailedGame from 'components/molecules/ModalFailedGame.vue';
import ModalNextLevel from 'components/organisms/ModalNextLevel.vue';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';

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

const router = useRouter();

const gameStore = useGameStore();
const { initialFlip } = storeToRefs(gameStore);
const {
  currentScore,
  gridSize,
  levelCardSet,
  currentLevel,
  totalCards,
  lockBoard,
  attemptCounter,
} = storeToRefs(gameStore);

const useUser = useUserStore();

const { audioCongratulation, audioPair } = useBackgroundMusic();

const flippedCards = ref<FlippedCard[]>([]);
const flippedStatus = reactive<boolean[]>(Array(totalCards.value).fill(false));
const cardRefs = ref<(CardRef | null)[]>([]);

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

function onFlip({ index, alt }: FlippedCard): void {
  if (lockBoard.value) return;

  flippedCards.value.push({ index, alt });

  if (flippedCards.value.length === 2) {
    attemptCounter.value = attemptCounter.value + 1;
    lockBoard.value = true;
    const [first, second] = flippedCards.value;

    if (first && second) {
      if (first.alt === second.alt) {
        flippedStatus[first.index] = true;
        flippedStatus[second.index] = true;
        flippedCards.value = [];
        lockBoard.value = false;
        gameStore.incrementScore(formattedTime.value);
        resetTimer();
        audioPair();
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
  gameStore.pulseTimerList.forEach((time) => {
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
  flippedStatus.splice(0, flippedStatus.length, ...Array(newCards.length).fill(false));
});

watch(flippedStatus, async () => {
  if (flippedStatus.every((val) => val)) {
    showModalEnd.value = true;
    audioCongratulation();
    await gameStore.endGame();
  }
});

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

onMounted(async () => {
  if (useUser.getUser) {
    gameStore.startGameEffects();
  } else {
    await router.push('/');
  }
});
</script>

<template>
  <q-page class="--container">
    <section>
      <div class="flex justify-between text-cyan-9">
        <p>Nivel: {{ currentLevel }}</p>
        <p>Pontuação: {{ currentScore }}</p>
        <p>Tentativas: {{ attemptCounter }}</p>
        <transition name="time-pulse" mode="out-in">
          <p :key="initialFlip ? 'pulse-' + pulseKey : formattedTime" class="text-bold">
            {{ initialFlip ? formattedTimeStart : formattedTime }}
          </p>
        </transition>
      </div>

      <div class="--grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
        <template v-for="(total, index) in totalCards" :key="index">
          <CardIndex
            :index="index"
            :card="fruits[index] ?? { src: '', alt: '' }"
            :flipped-externally="initialFlip || flippedStatus[index]"
            :locked="lockBoard"
            @flip="onFlip"
            ref="cardRefs"
          />
        </template>
      </div>
    </section>

    <ModalNextLevel
      v-model:showModal="showModalEnd"
      @on-next-level="currentLevel = currentLevel + 1"
      @on-reset-level="gameStore.resetLevel"
    />

    <ModalFailedGame v-model="modalFailedGame" />
  </q-page>
</template>

<style scoped lang="scss">
.--container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
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

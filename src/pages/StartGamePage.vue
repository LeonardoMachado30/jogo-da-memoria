<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from 'stores/game-store';
import { formattedTime, formattedTimeStart, isTimeOver } from 'src/composables/useTimer';
import CardIndex from 'components/molecules/CardIndex.vue';
import ModalFailedGame from 'components/organisms/ModalFailedGame.vue';
import ModalNextLevel from 'components/organisms/ModalNextLevel.vue';
import gsap from 'gsap';

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
    [newArr[i] as any, newArr[j] as any] = [newArr[j], newArr[i]]; // eslint-disable-line @typescript-eslint/no-explicit-any
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

// watch(initialFlip, (val) => {
//   if (val) {
//     const interval = setInterval(() => {
//       pulseKey.value++;
//     }, 30000);

//     setTimeout(() => {
//       clearInterval(interval);
//     }, 10000);
//   }
// });

watch(isTimeOver, (val) => {
  if (val && !showModalEnd.value) {
    modalFailedGame.value = !modalFailedGame.value;
  }
});

onMounted(() => {
  // Animação de cartas sendo jogadas
  setTimeout(() => {
    const cards = document.querySelectorAll('.card-wrapper');
    const gridContainer = document.querySelector('.--grid');

    if (!gridContainer || cards.length === 0) return;

    const containerRect = gridContainer.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = window.innerHeight;

    gsap.fromTo(
      '.time-pulse-enter-active',
      { y: window.screenY, opacity: 0 },
      { y: 0, opacity: 1, duration: 30, ease: 'elastic.out(1,0.9)' },
    );

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;

      const deltaX = centerX - cardCenterX;
      const deltaY = centerY - cardRect.top;

      gsap.fromTo(
        card,
        {
          x: deltaX,
          y: deltaY,
          rotation: gsap.utils.random(-45, 45),
          scale: 0.3,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'back.out(1.2)',
          onComplete:
            index === cards.length - 1
              ? () => {
                  // Executa apenas quando a última carta terminar de animar
                  useGame.startGameEffects();
                }
              : undefined,
        },
      );
    });
  }, 200);

  const interval = setInterval(() => {
    pulseKey.value++;
  }, 30000);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
});
</script>

<template>
  <q-page class="--container">
    <div class="flex justify-around text-blue text-weight-bolder text-body1 q-px-md q-mb-xl row">
      <p
        style="
          background-color: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 2px 0px 6px #000;
        "
      >
        Nivel: {{ currentLevel }}
      </p>
      <p
        style="
          background-color: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 2px 0px 6px #000;
        "
      >
        Pontuação: {{ currentScore }}
      </p>
      <p
        style="
          background-color: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 2px 0px 6px #000;
        "
      >
        Tentativas: {{ attemptCounter }}
      </p>
      <p
        :key="pulseKey"
        style="
          background-color: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 2px 0px 6px #000;
        "
      >
        {{ initialFlip ? formattedTimeStart : formattedTime }}
      </p>
    </div>

    <div class="--grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, minmax(20px, 1fr))` }">
      <template v-for="(total, index) in totalCards" :key="index">
        <div class="card-wrapper">
          <CardIndex
            :index="index"
            :card="fruits[index] ?? { src: '', alt: '' }"
            :flipped-externally="initialFlip || flippedStatus[index]"
            :locked="lockBoard"
            @flip="useGame.onFlip"
            ref="cardRefs"
          />
        </div>
      </template>
    </div>

    <ModalNextLevel v-model:showModal="showModalEnd" />

    <ModalFailedGame v-model="modalFailedGame" />
  </q-page>
</template>

<style scoped lang="scss">
.--container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0px 1rem 0 1rem;
}

.--grid {
  display: grid;
  grid-gap: 8px;
}

.card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
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

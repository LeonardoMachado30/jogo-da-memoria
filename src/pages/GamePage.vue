<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from 'stores/game-store';
import { formattedTime, formattedTimeStart, isTimeOver } from 'src/composables/useTimer';
import CardIndex from 'components/molecules/CardIndex.vue';
import ModalFailedGame from 'components/organisms/ModalFailedGame.vue';
import ModalNextLevel from 'components/organisms/ModalNextLevel.vue';
import { useRoute } from 'vue-router';
import { distributeCardsAnimation } from 'src/animations/card';
import LockOverlay from 'src/components/atoms/LockOverlay.vue';

const useGame = useGameStore();
const route = useRoute();

const {
  initialFlip,
  currentScore,
  // gridSize,
  getLevel,
  game,
  cards,
  lockBoard,
  attemptCounter,
  flippedStatus,
  cardRefs,
  currentConfig,
} = storeToRefs(useGame);

const showModalEnd = ref<boolean>(false);
const isOneMinuteAlert = ref(false);
const pulseKey = ref(0);
const modalFailedGame = ref(false);
const levelNotUnlocked = ref(false);

// ----- Adjusted Spinner Counter -----
const startStartCounter = ref(true);
const spinnerCount = ref(3); // Mostrar 3,2,1 (pode ajustar)
let spinnerInterval: any = null;
// ------------------------------------

// Inicializa o nível baseado na query string
watch(
  () => route.query.level,
  async (val) => {
    const level = Number(val) || 1;
    await useGame.initializeLevel(level);
  },
  { immediate: true },
);

// Alerta de tempo
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

// Detecta quando o nível foi completado
const isProcessingEnd = ref(false);

watch(
  () => flippedStatus.value,
  async (newValue) => {
    if (isProcessingEnd.value) return;

    if (newValue.length > 0 && newValue.every((val) => val)) {
      isProcessingEnd.value = true;
      showModalEnd.value = true;

      await useGame.endGame();

      // opcional: atraso para resetar flag
      setTimeout(() => {
        isProcessingEnd.value = false;
      }, 500);
    }
  },
  { deep: true },
);

// Detecta quando o tempo acabou
watch(isTimeOver, (val) => {
  if (val && !showModalEnd.value) {
    modalFailedGame.value = true;
  }
});

// Watch para mudanças de nível
watch(
  () => game.value.currentLevel,
  async () => {
    await nextTick();
    void startLevelSequence();
  },
);

/**
 * Sequência de início do nível com animações
 */
async function startLevelSequence() {
  // Aguarda inicialização do store
  await useGame.startGameSequence();

  await nextTick();

  const cardsElements = document.querySelectorAll('.card-wrapper');
  const gridContainer = document.querySelector('.--grid');

  if (!gridContainer || cards.value.length === 0 || cardsElements.length === 0) {
    console.warn('Elementos não encontrados para animação');
    return;
  }

  const containerRect = gridContainer.getBoundingClientRect();
  const centerX = containerRect.width / 2;
  const centerY = window.innerHeight;

  // Anima distribuição das cartas
  cardsElements.forEach((card, index) => {
    distributeCardsAnimation({ card, containerRect, index, centerY, centerX }, () => {
      // Quando a última carta terminar a animação
      if (index === cardsElements.length - 1) {
        // Inicia a fase de memorização
        setTimeout(() => {
          useGame.startMemorizationPhase();
        }, 300);
      }
    });
  });

  // Pulso do timer
  const interval = setInterval(() => {
    pulseKey.value++;
  }, 30000);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

onMounted(async () => {
  const currentLevelUnlock = await useGame.getUserCurrentLevelUnlock();

  if (currentLevelUnlock < Number(route.query.level)) {
    startStartCounter.value = false;
    levelNotUnlocked.value = true;
    return;
  }

  startStartCounter.value = true;
  spinnerCount.value = 3;

  // void nextTick().then(() => {
  //   // Opcional animar o número (usando gsap se quiser)
  // });

  spinnerInterval = setInterval(() => {
    if (spinnerCount.value > 1) {
      spinnerCount.value -= 1;
    } else {
      startStartCounter.value = false;
      clearInterval(spinnerInterval);
      void startLevelSequence();
    }
  }, 1000);
});
</script>

<template>
  <q-page class="--container">
    <LockOverlay v-if="levelNotUnlocked" />

    <div v-if="startStartCounter" class="backdrop-counter spinner-backdrop">
      <div class="spinner-container">
        <div class="custom-spinner"></div>
        <span class="spinner-count">{{ spinnerCount }}</span>
      </div>
    </div>

    <div class="flex justify-around items-center text-blue text-weight-bolder text-body1 row">
      <p class="stat-box">Nivel: {{ game.currentLevel }}</p>
      |
      <p class="stat-box">Pontuação: {{ currentScore }}</p>
      |
      <p class="stat-box">Tentativas: {{ attemptCounter }}</p>
    </div>
    <p :key="pulseKey" class="stat-box text-center text-weight-bolder text-h4">
      {{ initialFlip ? formattedTimeStart : formattedTime }}
    </p>

    <div
      class="--grid"
      :style="{ gridTemplateColumns: `repeat(auto-fill, ${getLevel < 12 ? '17%' : '14%'})` }"
    >
      <template v-for="(card, index) in cards" :key="`${game.currentLevel}-${index}`">
        <div :class="['card-wrapper']">
          <CardIndex
            :index="index"
            :card="card"
            :flipped-externally="!!initialFlip || !!flippedStatus[index]"
            :locked="lockBoard"
            @flip="useGame.onFlip"
            ref="cardRefs"
            :card-color="`bg-${currentConfig.color}`"
          />
        </div>
      </template>
    </div>

    <ModalNextLevel v-if="showModalEnd" v-model:showModal="showModalEnd" :stars-count="3" />
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
  place-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.--flex {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  place-content: center;
  align-items: center;
  justify-content: center;
}

.card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  // max-width: 60px;
}

.--max-w-sm {
  max-width: 70px;
}

.--max-w-md {
  max-width: 80px;
}

.--max-w-lg {
  max-width: 100px;
}

.stat-box {
  color: white;
  border-radius: 4px;
  // box-shadow: 2px 0px 6px #000;
}

/* --- Spinner Backdrop --- */
.spinner-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.24);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- Spinner and Counter --- */
.spinner-container {
  position: relative;
  width: 144px;
  height: 144px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-spinner {
  border: 8px solid rgba(60, 60, 170, 0.14);
  border-top: 8px solid #2196f3;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spinner-rotate 1s linear infinite;
}

@keyframes spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-count {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 600;
  color: #2196f3;
  letter-spacing: -2px;
  text-shadow: 0 1px 8px rgba(15, 23, 42, 0.18);
  z-index: 2;
  user-select: none;
}

.counter {
  opacity: 0;
  max-width: 900px;
  max-height: 300px;
  width: 100%;
}
</style>

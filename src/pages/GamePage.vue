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
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import gsap from 'gsap';

const useGame = useGameStore();
const route = useRoute();

const {
  initialFlip,
  currentScore,
  gridSize,
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
const startStartCounter = ref(false);
// Inicializa o nível baseado na query string
watch(
  () => route.query.level,
  (val) => {
    const level = Number(val) || 1;
    useGame.initializeLevel(level);
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
watch(
  () => flippedStatus.value,
  async (newValue) => {
    if (newValue.length > 0 && newValue.every((val) => val)) {
      showModalEnd.value = true;
      await useGame.endGame();
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

onMounted(() => {
  startStartCounter.value = true;
  void nextTick().then(() => {
    const counter = document.querySelectorAll('.counter');
    if (counter.length > 0) {
      gsap.fromTo(
        counter,
        {
          opacity: 1,
          scale: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          scale: 1,
          delay: 0.08,
          ease: 'back.out(1.2)',
        },
      );
    }
  });

  setTimeout(() => {
    startStartCounter.value = false;
    void startLevelSequence();
  }, 5000);
});
</script>

<template>
  <q-page class="--container">
    <div
      v-if="startStartCounter"
      class="backdrop-counter"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        /* background: rgba(0, 0, 0, 0.2); */
        transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <DotLottieVue
        class="q-pa-md counter"
        autoplay
        loop
        src="https://lottie.host/918e79fb-3b81-48f7-8fdb-88edf2b6ea8b/l4xpZZV5VP.lottie"
      />
    </div>

    <div class="flex justify-around text-blue text-weight-bolder text-body1 q-px-md q-mb-xl row">
      <p class="stat-box">Nivel: {{ game.currentLevel }}</p>
      <p class="stat-box">Pontuação: {{ currentScore }}</p>
      <p class="stat-box">Tentativas: {{ attemptCounter }}</p>
      <p :key="pulseKey" class="stat-box">
        {{ initialFlip ? formattedTimeStart : formattedTime }}
      </p>
    </div>

    <div class="--grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, minmax(20px, 1fr))` }">
      <template v-for="(card, index) in cards" :key="`${game.currentLevel}-${index}`">
        <div class="card-wrapper">
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
}

.card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.stat-box {
  background-color: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 2px 0px 6px #000;
}

.counter {
  opacity: 0;
  max-width: 900px;
  max-height: 300px;
  width: 100%;
}
</style>

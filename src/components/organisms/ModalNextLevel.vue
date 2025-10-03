<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from 'src/stores/game-store';
import { storeToRefs } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import gsap from 'gsap';

const modelValue = defineModel('showModal', { default: false });

// Props
const props = defineProps({
  starsCount: {
    type: Number,
    default: 3,
    validator: (value: number) => value >= 1 && value <= 3,
  },
});

const { audioCongratulation } = useAudio();
const useGame = useGameStore();
const { currentScore, game, attemptCounter, gameEndTime, gameStartTime } = storeToRefs(useGame);

const starsArray = ref<number[]>([]);
const showStars = ref(true);

function resetLeve() {
  audioCongratulation().pause();
  useGame.startGameEffects();
}

function nextLevel() {
  audioCongratulation().pause();
  game.value.currentLevel = game.value.currentLevel + 1;
  useGame.startGameEffects();
}

function animateStars() {
  // Aguarda um pouco para garantir que os elementos estão no DOM
  setTimeout(() => {
    const starsItem = document.querySelectorAll('.star-item');

    if (starsItem.length === 0) {
      console.warn('Nenhuma estrela encontrada no DOM');
      return;
    }

    starsItem.forEach((star, index) => {
      const tl = gsap.timeline();

      tl.fromTo(
        star,
        {
          opacity: 0,
          y: -80,
          scale: 0,
          rotation: -180,
        },
        {
          opacity: 1,
          y: index + 1 === 2 ? -20 : 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.35,
          ease: 'back.out(2)',
        },
      )
        // Animação do "pulinho" (scale)
        .to(star, {
          scale: 1.4,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(star, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.in',
        });
    });
  }, 150);
}

onMounted(() => {
  starsArray.value = [];

  audioCongratulation();

  starsArray.value = Array.from({ length: props.starsCount }, (_, i) => i + 1);

  animateStars();
});
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title=""
    icon=""
    classContainer="q-pa-lg"
    styleContainer="border-radius: 16px"
    class-body="flex column items-center text-center"
    class-actions="flex justify-center"
  >
    <template #default>
      <!-- Container das estrelas -->
      <div class="full-width flex justify-center items-center q-mb-md" style="min-height: 120px">
        <div v-if="showStars" class="stars-container flex justify-center items-center">
          <div v-for="star in starsArray" :key="`star-${star}`" class="star-wrapper">
            <q-img
              src="star.gif"
              :alt="`Star ${star}`"
              class="star-item"
              fit="contain"
              no-spinner
            />
          </div>
        </div>
      </div>

      <p class="text-h4 text-bold text-principal q-mb-md">Parabéns!</p>
      <p class="text-h5 text-bold text-principal q-px-lg q-mb-md">
        Você conquistou o nível {{ game.currentLevel }}
      </p>

      <div class="flex justify-center gap-2 q-mt-md flex-wrap q-px-md">
        <q-chip color="cyan" text-color="black" icon="stars">
          {{ currentScore }}
        </q-chip>
        <q-chip color="yellow" text-color="black" icon="refresh">
          Tentativas: {{ attemptCounter }}
        </q-chip>
        <q-chip color="green" text-color="black" icon="schedule">
          {{ useGame.gameTimeConvertForMinutes(gameStartTime, gameEndTime) }}
        </q-chip>
      </div>
    </template>

    <template #actions>
      <q-btn
        label="Jogar novamente"
        text-color="white"
        icon="replay"
        @click="resetLeve"
        v-close-popup
        flat
        class="rounded-lg full-width q-pa-lg q-mb-sm"
      />
      <q-btn
        v-if="game.currentLevel < 3"
        label="Próximo Nível"
        text-color="black"
        color="white"
        icon="arrow_forward"
        @click="nextLevel"
        v-close-popup
        class="rounded-lg full-width"
      />
    </template>
  </ModalDefault>
</template>

<style scoped>
.stars-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 100px;
}

.star-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}

.star-item {
  width: 80px !important;
  height: 80px !important;
  max-width: 80px;
  max-height: 80px;
  transform-origin: center center;
  display: block;
}

.star-item :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

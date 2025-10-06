<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from 'src/stores/game-store';
import { storeToRefs } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { starAnimation } from 'src/animations/star';
import { useRoute, useRouter } from 'vue-router';
import levelsConfig from 'src/utils/levelsConfig';

const router = useRouter();
const route = useRoute();

const modelValue = defineModel('showModal', { default: false });

const props = defineProps({
  starsCount: {
    type: Number,
    default: levelsConfig.length,
    validator: (value: number) => value >= 1 && value <= levelsConfig.length,
  },
});

const { audioCongratulation } = useAudio();
const useGame = useGameStore();
const { currentScore, game, attemptCounter } = storeToRefs(useGame);

const starsArray = ref<number[]>(Array.from({ length: props.starsCount }, (_, i) => i + 1));

async function nextLevel() {
  audioCongratulation().pause();
  useGame.nextLevel();
  await router.push({
    path: route.path,
    query: {
      level: game.value.currentLevel,
    },
  });
}

function animateStars() {
  setTimeout(() => {
    const starsItem = document.querySelectorAll('.star-item');

    if (starsItem.length === 0) {
      return;
    }

    starsItem.forEach((star, index) => {
      starAnimation({ star, index });
    });
  }, 300);
}

onMounted(() => {
  audioCongratulation();

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
    persistent
  >
    <template #default>
      <!-- Container das estrelas -->
      <div class="full-width flex justify-center items-center q-mb-md" style="min-height: 120px">
        <div class="stars-container flex justify-center items-center">
          <div v-for="star in starsArray" :key="`star-${star}`" class="star-wrapper">
            <q-img
              src="/star.gif"
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
          {{ useGame.gameTimeConvertForMinutes(game.startTime, game.endTime) }}
        </q-chip>
      </div>
    </template>

    <template #actions>
      <q-btn
        label="Jogar novamente"
        text-color="white"
        icon="replay"
        @click="nextLevel"
        v-close-popup
        flat
        class="rounded-lg full-width q-pa-lg q-mb-sm"
      />
      <q-btn
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
  width: 100px;
  height: 100px;
}

.star-item {
  width: 100px !important;
  height: 100px !important;
  max-width: 100px;
  max-height: 100px;
  transform-origin: center center;
  display: block;
  opacity: 0;
}

.star-item :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from 'src/stores/game-store';
import { storeToRefs } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { starAnimation } from 'src/animations/star';
import { useRoute, useRouter } from 'vue-router';
import PlayAgainButton from 'components/atoms/PlayAgainButton.vue';

const useGame = useGameStore();
const { currentScore, game, attemptCounter, showModalEnd } = storeToRefs(useGame);

const router = useRouter();
const route = useRoute();

const starsCount = ref(3);

const { audioCongratulation } = useAudio();

const starsArray = ref<number[]>(Array.from({ length: starsCount.value }, (_, i) => i + 1));

const pauseCelebration = () => {
  audioCongratulation().pause();
};

const onPlayAgain = () => {
  pauseCelebration();
};

const goToNextLevel = async () => {
  pauseCelebration();
  showModalEnd.value = false;
  await useGame.nextLevel();

  await router.push({
    path: route.path,
    query: {
      level: game.value.currentLevel,
    },
  });

};

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
    v-model="showModalEnd"
    title=""
    icon=""
    classContainer="modal-next-level"
    class-body="flex column items-center text-center modal-next-level__body"
    class-actions="flex column justify-center modal-next-level__actions"
    persistent
  >
    <template #default>
      <div class="stars-stage full-width flex justify-center items-center">
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

      <p class="modal-next-level__title text-bold text-principal">Parabéns!</p>
      <p class="modal-next-level__subtitle text-bold text-principal">
        Você conquistou o nível {{ game.currentLevel }}
      </p>

      <div class="modal-next-level__chips flex justify-center flex-wrap">
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
      <PlayAgainButton
        flat
        color="transparent"
        text-color="white"
        btn-class="rounded-lg full-width modal-next-level__btn"
        @before-restart="onPlayAgain"
      />
      <q-btn
        label="Próximo Nível"
        text-color="black"
        color="white"
        icon="arrow_forward"
        @click="goToNextLevel"
        v-close-popup
        class="rounded-lg full-width"
      />
    </template>
  </ModalDefault>
</template>

<style scoped lang="scss">
.modal-next-level__body {
  padding-top: clamp(0.25rem, 1.5vw, 0.75rem);
  padding-bottom: clamp(0.25rem, 1.5vw, 0.5rem);
}

.stars-stage {
  min-height: clamp(4.5rem, 22dvh, 7.5rem);
  margin-bottom: clamp(0.25rem, 2vw, 0.75rem);
}

.stars-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.35rem, 2.5vw, 1rem);
}

.star-wrapper {
  --star-size: clamp(3.25rem, 16vw, 5.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--star-size);
  height: var(--star-size);
  flex-shrink: 0;
}

.star-item {
  width: var(--star-size) !important;
  height: var(--star-size) !important;
  max-width: var(--star-size);
  max-height: var(--star-size);
  transform-origin: center center;
  display: block;
  opacity: 0;
}

.star-item :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
}

.modal-next-level__title {
  font-size: clamp(1.15rem, 5vw, 2rem);
  line-height: 1.15;
  margin: 0 0 clamp(0.2rem, 1.5vw, 0.5rem);
}

.modal-next-level__subtitle {
  font-size: clamp(0.95rem, 4vw, 1.35rem);
  line-height: 1.2;
  margin: 0 0 clamp(0.35rem, 2vw, 0.75rem);
  padding-inline: clamp(0.25rem, 2vw, 1rem);
}

.modal-next-level__chips {
  gap: clamp(0.25rem, 1.5vw, 0.5rem);
  margin-top: clamp(0.15rem, 1.5vw, 0.5rem);
}

.modal-next-level__chips :deep(.q-chip) {
  font-size: clamp(0.7rem, 2.8vw, 0.85rem);
  height: auto;
  min-height: 1.65rem;
  padding: 0.2rem 0.45rem;
}

.modal-next-level__actions :deep(.modal-next-level__btn) {
  padding-block: clamp(0.45rem, 2vw, 0.65rem);
}
</style>

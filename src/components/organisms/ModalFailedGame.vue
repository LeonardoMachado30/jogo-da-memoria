<script setup lang="ts">
import { useAudio } from 'src/composables/useAudio';
import { watch } from 'vue';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import PlayAgainButton from 'components/atoms/PlayAgainButton.vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from 'src/stores/game-store';

const useGame = useGameStore();
const { modalFailedGame } = storeToRefs(useGame);
const { audioGameOver } = useAudio();

watch(
  modalFailedGame,
  (isOpen) => {
    if (isOpen) {
      audioGameOver();
    }
  },
  { immediate: true },
);
</script>

<template>
  <ModalDefault
    v-model="modalFailedGame"
    class-body="flex column items-center text-center modal-failed__body"
    class-actions="flex justify-center"
    persistent
  >
    <template #default>
      <div class="modal-failed__lottie" aria-hidden="true">
        <DotLottieVue
          autoplay
          loop
          src="https://lottie.host/ac583ecd-c675-4ccf-b37e-bfc772635f0f/D1Bln89bQe.lottie"
        />
      </div>
      <p class="modal-failed__title text-bold text-red-8">O TEMPO ACABOU</p>
      <p class="modal-failed__message text-bold text-principal">
        Mas não desanime, você pode tentar novamente!
      </p>
    </template>

    <template #actions>
      <PlayAgainButton
        label="Jogar Novamente"
        icon="history"
        color="white"
        text-color="black"
        btn-class="rounded-lg full-width q-mb-sm"
      />

      <q-btn
        to="/"
        label="Selecionar Nível"
        text-color="black"
        color="cyan-6"
        icon="menu"
        v-close-popup
        class="rounded-lg full-width"
      />
    </template>
  </ModalDefault>
</template>

<style scoped lang="scss">
.modal-failed__body {
  padding-block: clamp(0.35rem, 2vw, 0.75rem);
}

.modal-failed__lottie {
  width: min(12.5rem, 58vw);
  height: clamp(6.5rem, 28dvh, 10rem);
  flex-shrink: 0;
  margin: 0 auto clamp(0.25rem, 2vw, 0.75rem);
}

.modal-failed__lottie :deep(canvas),
.modal-failed__lottie :deep(svg) {
  width: 100% !important;
  height: 100% !important;
}

.modal-failed__title {
  font-size: clamp(1.1rem, 5vw, 2rem);
  line-height: 1.15;
  margin: 0 0 clamp(0.25rem, 1.5vw, 0.5rem);
}

.modal-failed__message {
  font-size: clamp(0.8rem, 3.2vw, 0.95rem);
  line-height: 1.35;
  margin: 0;
}
</style>

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
    class-body="flex column items-center text-center q-px-lg bg-transparent"
    class-actions="flex justify-center"
    persistent
  >
    <template #default>
      <DotLottieVue
        autoplay
        loop
        src="https://lottie.host/ac583ecd-c675-4ccf-b37e-bfc772635f0f/D1Bln89bQe.lottie"
      />
      <p class="text-h4 text-bold text-red-8">O TEMPO ACABOU</p>
      <p class="text-body2 text-bold text-principal">
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

<style scoped></style>

<script setup lang="ts">
import { useAudio } from 'src/composables/useAudio';
import { watch } from 'vue';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { useGameStore } from 'stores/game-store';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const modelValue = defineModel({ default: false });
const { audioGameOver, audioCongratulation } = useAudio();
const useGame = useGameStore();

function resetLeve() {
  audioCongratulation().pause();
  useGame.resetLevelState();
}

watch(
  modelValue,
  (newValue) => {
    if (newValue) {
      audioGameOver();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    class-body="flex column items-center text-center q-px-lg"
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
      <q-btn
        to="/"
        label="Selecionar Nível"
        text-color="black"
        color="cyan-6"
        icon="reset_settings"
        @click="resetLeve"
        v-close-popup
        class="rounded-lg full-width q-mb-sm"
      />

      <q-btn
        label="Jogar Novamente"
        text-color="black"
        color="white"
        icon="reset"
        @click="resetLeve"
        v-close-popup
        class="rounded-lg full-width"
      />
    </template>
  </ModalDefault>
</template>

<style scoped></style>

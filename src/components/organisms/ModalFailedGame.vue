<script setup lang="ts">
import { useAudio } from 'src/composables/useAudio';
import { watch } from 'vue';
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { useGameStore } from 'stores/game-store';

const modelValue = defineModel({ default: false });
const { audioGameOver, audioCongratulation } = useAudio();
const useGame = useGameStore();

function resetLeve() {
  audioCongratulation().pause();
  useGame.startGameEffects();
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
    class-actions="flex justify-center q-pa-lg"
  >
    <template #default>
      <q-img
        srcset="failedGame.gif"
        alt="Happy Birthday"
        width="140"
        height="140"
        class="full-width full-height"
        style="max-width: 140px; max-height: 140px"
      />
      <p class="text-h4 text-bold text-red-8">Você falhou!</p>
      <p class="text-body2 text-bold text-principal">
        Mas não desanime, você pode tentar novamente!
      </p>
    </template>

    <template #actions>
      <q-btn label="menu principal" color="cyan-6" to="/" v-close-popup></q-btn>

      <q-btn label="jogar novamente" color="amber-7" @click="resetLeve" v-close-popup></q-btn>
    </template>
  </ModalDefault>
</template>

<style scoped></style>

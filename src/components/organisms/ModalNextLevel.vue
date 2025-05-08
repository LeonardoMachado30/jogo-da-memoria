<script setup lang="ts">
import { useGameStore } from 'src/stores/game-store';
import { storeToRefs } from 'pinia';
import { useAudio } from 'src/composable/useAudio';
import { watch } from 'vue';
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel('showModal', { default: false });

const { audioCongratulation } = useAudio();
const useGame = useGameStore();
const { currentScore, currentLevel, attemptCounter, gameEndTime, gameStartTime } =
  storeToRefs(useGame);

function resetLeve() {
  audioCongratulation().pause();
  useGame.startGameEffects();
}

function nextLevel() {
  audioCongratulation().pause();
  currentLevel.value = currentLevel.value + 1;
  useGame.startGameEffects();
}

watch(modelValue, (newValue) => {
  if (newValue) {
    audioCongratulation();
  }
});
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title=""
    icon=""
    class-body="flex column items-center text-center q-px-lg"
    class-actions="flex justify-center q-pa-lg"
  >
    <template #default>
      <q-img
        srcset="happy_birthday.gif"
        alt="Happy Birthday"
        width="360"
        height="360"
        class="full-width full-height"
        style="max-width: 250px; max-height: 250px"
      />
      <p class="text-h4 text-bold text-principal">Parabéns!</p>
      <p class="text-h5 text-bold text-principal q-px-lg">
        Você conquistou o nível {{ currentLevel }}
      </p>
      <div class="flex justify-center" style="gap: 10px">
        <p>Pontuação: {{ currentScore }}</p>
        <p>Tentivas: {{ attemptCounter }}</p>
        <p>inicio: {{ gameStartTime }}</p>
        <p>fim: {{ gameEndTime }}</p>
      </div>
    </template>

    <template #actions>
      <q-btn
        label="Jogar novamente"
        color="amber-7"
        text-color="black"
        @click="resetLeve"
        v-close-popup
      ></q-btn>
      <q-btn
        v-if="currentLevel < 3"
        label="Proximo Nivel"
        color="cyan-6"
        @click="nextLevel"
        v-close-popup
      ></q-btn>
    </template>
  </ModalDefault>
</template>

<style scoped></style>

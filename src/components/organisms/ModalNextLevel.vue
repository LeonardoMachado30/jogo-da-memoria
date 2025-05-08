<script setup lang="ts">
import { useGameStore } from 'src/stores/game-store';
import { storeToRefs } from 'pinia';

const showModalEnd = defineModel('showModal', { default: false });
const useGame = useGameStore();
const { currentScore, currentLevel, attemptCounter, gameEndTime, gameStartTime } =
  storeToRefs(useGame);

const emit = defineEmits(['onNextLevel', 'onResetLevel']);
</script>

<template>
  <q-dialog
    v-model="showModalEnd"
    persistent
    backdrop-filter="blur(8px)"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
  >
    <q-card class="full-width q-py-md" style="max-width: 620px">
      <q-card-section class="text-center">
        <q-img
          srcset="/happy_birthday.gif"
          alt="Happy Birthday"
          width="360"
          height="360"
          class="full-width full-height"
          style="max-width: 250px; max-height: 250px"
        />
        <p class="text-h4 text-bold text-cyan-8">Parabéns!</p>
        <p class="text-h5 text-bold text-cyan-8 q-px-lg">
          Você conquistou o nível {{ currentLevel }}
        </p>
        <div class="flex justify-center" style="gap: 10px">
          <p>Pontuação: {{ currentScore }}</p>
          <p>Tentivas: {{ attemptCounter }}</p>
          <p>inicio: {{ gameStartTime }}</p>
          <p>fim: {{ gameEndTime }}</p>
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center items-center">
        <q-btn
          label="Jogar novamente"
          color="amber-7"
          text-color="black"
          @click="emit('onResetLevel')"
          v-close-popup
        ></q-btn>
        <q-btn
          label="Proximo Nivel"
          color="cyan-7"
          @click="emit('onNextLevel')"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

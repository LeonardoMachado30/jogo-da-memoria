<script setup lang="ts">
import { useAudio } from 'src/composable/useAudio';
import { watch } from 'vue';

const modelValue = defineModel({ default: false });
const { audioGameOver } = useAudio();
const emit = defineEmits(['onResetLevel']);

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
  <q-dialog
    v-model="modelValue"
    persistent
    backdrop-filter="blur(8px)"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
  >
    <q-card class="full-width q-py-md" style="max-width: 620px">
      <q-card-section class="text-center">
        <q-img
          srcset="failedGame.gif"
          alt="Happy Birthday"
          width="140"
          height="140"
          class="full-width full-height"
          style="max-width: 140px; max-height: 140px"
        />
        <p class="text-h4 text-bold text-red-8">Você falhou!</p>
        <p class="text-body2 text-bold text-cyan-8">
          Mas não desanime, você pode tentar novamente!
        </p>
      </q-card-section>
      <q-card-actions class="flex justify-center items-center">
        <q-btn label="menu principal" color="cyan-7" to="/" v-close-popup></q-btn>

        <q-btn
          label="jogar novamente"
          color="amber-7"
          @click="emit('onResetLevel')"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

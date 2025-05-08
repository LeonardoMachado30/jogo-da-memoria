<script setup lang="ts">
import { useAudio } from 'src/composable/useAudio';
import { watch } from 'vue';

const openDialog = defineModel({ default: false });

const { pauseMusic, playMusic, isPlaying, audioClick } = useAudio();

const changeVolume = () => {
  if (isPlaying.value) {
    pauseMusic();
  } else {
    playMusic();
  }
};

watch(openDialog, () => {
  if (openDialog.value) {
    audioClick();
  }
});
</script>

<template>
  <q-dialog v-model="openDialog">
    <q-card class="full-width" style="max-width: 400px">
      <q-card-section class="bg-cyan-7 text-white flex items-center" style="gap: 6px">
        <q-icon name="settings" size="1rem" class="no-margin"></q-icon>
        <p class="text-bold text-h6 no-margin">Configurações</p>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-btn
          @click="changeVolume"
          :icon="isPlaying ? 'volume_up' : 'volume_down'"
          round
          color="amber-7"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

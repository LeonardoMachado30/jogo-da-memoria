<script setup lang="ts">
import { useAudio } from 'src/composable/useAudio';
import { Dark } from 'quasar';
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel({ default: false });

const { pauseMusic, playMusic, isPlaying } = useAudio();

const changeVolume = () => {
  if (isPlaying.value) {
    pauseMusic();
  } else {
    playMusic();
  }
};

const toggleDark = () => {
  Dark.toggle();
};
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title="Configuraçõoes"
    icon="settings"
    classBody="flex justify-center gap-4"
  >
    <q-btn
      @click="changeVolume"
      :icon="isPlaying ? 'volume_up' : 'volume_down'"
      round
      color="amber-6"
    />
    <q-btn
      :icon="Dark.isActive ? 'dark_mode' : 'light_mode'"
      round
      color="amber-6"
      @click="toggleDark"
    />
  </ModalDefault>
</template>

<style scoped></style>

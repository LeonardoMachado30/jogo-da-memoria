<script setup lang="ts">
import { useAudio } from 'src/composables/useAudio';
// import { useGameStore } from 'src/stores/game-store';
// import { useRoute, useRouter } from 'vue-router';
// import { Dark } from 'quasar';
// import ModalDefault from 'components/organisms/ModalDefault.vue';

// const modelValue = defineModel({ default: false });
// const gameStore = useGameStore();
// const router = useRouter();
// const route = useRoute();
const { pauseMusic, playMusic, isPlaying } = useAudio();

const changeVolume = () => {
  if (isPlaying.value) {
    pauseMusic();
  } else {
    playMusic();
  }
};
// const toggleDark = () => {
//   Dark.toggle();
// };
</script>

<template>
  <!-- <ModalDefault
    v-model="modelValue"
    title="Configuraçõoes"
    icon="settings"
    classBody="flex justify-center gap-4"
  > -->
  <q-btn
    @click="changeVolume"
    :icon="isPlaying ? 'volume_up' : 'volume_down'"
    round
    color="black"
    class="q-mr-md"
  />
  <!-- <q-btn
    :icon="Dark.isActive ? 'dark_mode' : 'light_mode'"
    round
    color="black"
    @click="toggleDark"
  /> -->
  <!-- </ModalDefault> -->
</template>

<style scoped></style>

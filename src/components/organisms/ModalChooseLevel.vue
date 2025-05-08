<script setup lang="ts">
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const modelValue = defineModel({ default: false });

const router = useRouter();
const useGame = useGameStore();
const { currentLevel } = storeToRefs(useGame);

async function goToLevel(level: number) {
  currentLevel.value = level;
  await router.push('/partida');
}
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title="Selecione o nível"
    class-body="flex column gap-4 q-px-lg"
  >
    <q-btn label="Nível 1 (4x4)" @click="goToLevel(1)" color="cyan-6"></q-btn>
    <q-btn label="Nível 2 (6x6)" @click="goToLevel(2)" color="amber-6"></q-btn>
    <q-btn label="Nível 3 (8x6)" @click="goToLevel(3)" color="red-6"></q-btn>
  </ModalDefault>
</template>

<style scoped></style>

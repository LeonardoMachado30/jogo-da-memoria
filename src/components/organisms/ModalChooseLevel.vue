<script setup lang="ts">
import ModalDefault from 'components/organisms/ModalDefault.vue';
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user-store';

const modelValue = defineModel({ default: false });

const router = useRouter();
const useGame = useGameStore();
const useUser = useUserStore();

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
    <p class="text-red" v-if="!useUser.getUser">
      ATENÇÂO: Seus pontos não são salvos e você não podera ver as classificações.
    </p>

    <div class="flex justify-center items-center gap-4">
      <q-btn label="Nível 1 (4x4)" @click="goToLevel(1)" color="green-6" text-color="black"></q-btn>
      <q-btn label="Nível 2 (6x6)" @click="goToLevel(2)" color="amber-6" text-color="black"></q-btn>
      <q-btn label="Nível 3 (8x6)" @click="goToLevel(3)" color="red-6" text-color="black"></q-btn>
    </div>
  </ModalDefault>
</template>

<style scoped></style>

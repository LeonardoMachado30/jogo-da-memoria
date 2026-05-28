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

const { game } = storeToRefs(useGame);

async function goToLevel(level: number) {
  game.value.currentLevel = level;
  await router.push('/partida');
}
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title="Selecione o nível"
    class-body="flex column modal-choose-level__body"
  >
    <p class="text-red" v-if="!useUser.isLoggedIn">
      Seu progresso é salvo localmente neste dispositivo. A classificação global fica disponível após
      entrar com Google.
    </p>

    <div class="flex justify-center items-center gap-4">
      <q-btn label="Nível 1 (4x4)" @click="goToLevel(1)" color="green-6" text-color="black"></q-btn>
      <q-btn label="Nível 2 (6x6)" @click="goToLevel(2)" color="amber-6" text-color="black"></q-btn>
      <q-btn label="Nível 3 (8x6)" @click="goToLevel(3)" color="red-6" text-color="black"></q-btn>
    </div>
  </ModalDefault>
</template>

<style scoped lang="scss">
.modal-choose-level__body {
  gap: clamp(0.5rem, 2.5vw, 1rem);
  font-size: clamp(0.75rem, 3vw, 0.95rem);
  line-height: 1.35;
}

.modal-choose-level__body :deep(.q-btn) {
  font-size: clamp(0.72rem, 2.8vw, 0.875rem);
  min-height: 2.35rem;
  padding-inline: clamp(0.5rem, 2.5vw, 0.75rem);
}
</style>

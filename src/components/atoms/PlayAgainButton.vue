<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from 'src/stores/game-store';

const props = withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    color?: string;
    textColor?: string;
    flat?: boolean;
    btnClass?: string;
  }>(),
  {
    label: 'Jogar novamente',
    icon: 'replay',
    color: 'white',
    textColor: 'black',
    flat: false,
    btnClass: 'rounded-lg full-width',
  },
);

const emit = defineEmits<{
  beforeRestart: [];
}>();

const useGame = useGameStore();
const loading = ref(false);

const onPlayAgain = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    emit('beforeRestart');
    await useGame.restartRound();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-btn
    :label="props.label"
    :icon="props.icon"
    :color="props.color"
    :text-color="props.textColor"
    :flat="props.flat"
    :class="props.btnClass"
    :loading="loading"
    :disable="loading"
    v-close-popup
    @click="onPlayAgain"
  />
</template>

<script setup lang="ts">
const showModalEnd = defineModel('showModal', { default: false });
const currentLevel = defineModel('currentLevel', { default: 1 });

const emit = defineEmits(['onNextLevel', 'onResetLevel']);

function reset() {
  showModalEnd.value = false;
  emit('onResetLevel');
}

function nextLevel() {
  showModalEnd.value = false;
  emit('onNextLevel');
}
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
      </q-card-section>
      <q-card-actions class="flex justify-center items-center">
        <q-btn label="Jogar novamente" color="amber-7" text-color="black" @click="reset"></q-btn>
        <q-btn label="Proximo Nivel" color="cyan-7" @click="nextLevel"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

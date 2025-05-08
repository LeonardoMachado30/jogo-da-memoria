<script setup lang="ts">
import { ref } from 'vue';
import BtnModalTutorial from 'components/molecules/BtnModalTutorial.vue';
import ModalSettings from 'components/molecules/ModalSettings.vue';

const openDialog = ref(false);
const openDialogTutorial = ref(false);
</script>

<template>
  <div class="flex column items-center" style="gap: 10px">
    <BtnModalTutorial v-model="openDialogTutorial" :show-btn="true" />
    <q-btn icon="settings" color="amber-7" round @click="openDialog = !openDialog"></q-btn>
  </div>
  <ModalSettings v-model="openDialog" />
</template>

<style scoped></style>

<script setup lang="ts">
// import { onMounted } from 'vue';
// import { MemoryGameService } from 'src/services/MemoryGameService';
//
// const service = new MemoryGameService();
//
// onMounted(async () => {
//   const games = await service.getGames();
//   console.log('Partidas:', games);
// });
</script>

<template>
  <q-page class="flex column items-center justify-center">
    <h1 class="text-cyan-6 text-bold m-none">Jogo da memoria</h1>

    <div class="flex column">
      <q-btn label="Iniciar Jogo Anonimamente" class="bg-cyan-6 text-white q-mb-sm" to="/partida" />
      <q-btn label="Entrar com Google" class="bg-white" icon="img:icons/google.svg" to="/partida" />
    </div>
  </q-page>
</template>

<style scoped></style>

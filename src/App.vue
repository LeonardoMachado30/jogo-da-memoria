<template>
  <router-view />

  <PwaInstallPrompt />
  <PwaUpdatePrompt />
</template>

<script setup lang="ts">
import PwaInstallPrompt from 'src/components/molecules/PwaInstallPrompt.vue';
import PwaUpdatePrompt from 'src/components/molecules/PwaUpdatePrompt.vue';
</script>

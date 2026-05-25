<template>
  <p class="progress-summary text-white text-caption q-mb-sm no-margin text-center">
    Nível {{ progress.currentLevel }} · {{ progress.score }} pts
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { loadLocalProgress } from 'src/services/guest-storage';

const props = defineProps<{
  refreshKey?: number;
}>();

const progress = computed(() => {
  void props.refreshKey;
  return loadLocalProgress();
});
</script>

<style scoped>
.progress-summary {
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
</style>

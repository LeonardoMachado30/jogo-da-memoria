<script setup lang="ts">
import { watch } from 'vue';
import { useAudio } from 'src/composables/useAudio';

const modelValue = defineModel({ default: false });

const props = defineProps<{
  icon?: string;
  title?: string;
  classBody?: string;
  classActions?: string;
  classContainer?: string;
  styleContainer?: string;
  persistent?: boolean;
}>();

const { audioClick } = useAudio();

watch(modelValue, () => {
  if (modelValue.value) {
    audioClick();
  }
});
</script>

<template>
  <q-dialog v-model="modelValue" backdrop-filter="blur(6px)" :persistent="persistent">
    <q-card :class="props.classContainer" :style="styleContainer">
      <q-card-section
        v-if="props.icon || props.title"
        class="bg-cyan-6 text-white flex items-center gap-4"
      >
        <q-icon
          v-if="props.icon"
          :name="props.icon"
          size="1.4rem"
          class="no-margin q-pt-sm material-icons-outlined"
        ></q-icon>
        <p class="text-bold text-h5 no-margin">{{ props.title }}</p>
      </q-card-section>
      <q-card-section v-if="$slots.default" :class="props.classBody">
        <slot></slot>
      </q-card-section>
      <q-card-actions v-if="$slots.actions" :class="props.classActions">
        <slot name="actions"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

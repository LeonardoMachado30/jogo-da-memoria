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
  <q-dialog
    v-model="modelValue"
    backdrop-filter="blur(6px)"
    :persistent="persistent"
    class="modal-default-dialog"
  >
    <q-card :class="['modal-default', props.classContainer]" :style="styleContainer">
      <q-card-section
        v-if="props.icon || props.title"
        class="modal-default__header bg-cyan-6 text-white flex items-center gap-4"
      >
        <q-icon
          v-if="props.icon"
          :name="props.icon"
          class="modal-default__header-icon no-margin material-icons-outlined"
        />
        <p class="modal-default__title text-bold no-margin">{{ props.title }}</p>
      </q-card-section>
      <q-card-section
        v-if="$slots.default"
        :class="['modal-default__body', props.classBody]"
      >
        <slot />
      </q-card-section>
      <q-card-actions v-if="$slots.actions" :class="['modal-default__actions', props.classActions]">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.modal-default {
  width: min(100%, 28rem);
  max-height: calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 1rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
}

.modal-default__header {
  flex-shrink: 0;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem);
}

.modal-default__header-icon {
  font-size: clamp(1.1rem, 4vw, 1.4rem) !important;
}

.modal-default__title {
  font-size: clamp(1rem, 4.2vw, 1.5rem);
  line-height: 1.2;
}

.modal-default__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  padding: clamp(0.75rem, 3vw, 1.25rem);
}

.modal-default__actions {
  flex-shrink: 0;
  padding: clamp(0.5rem, 2.5vw, 0.75rem) clamp(0.75rem, 3vw, 1rem);
  gap: 0.5rem;
}

.modal-default__actions :deep(.q-btn) {
  min-height: 2.5rem;
  font-size: clamp(0.8rem, 3.2vw, 0.95rem);
}
</style>

<style lang="scss">
.modal-default-dialog .q-dialog__inner {
  padding: max(0.5rem, env(safe-area-inset-top, 0px))
    max(0.5rem, env(safe-area-inset-right, 0px))
    max(0.5rem, env(safe-area-inset-bottom, 0px))
    max(0.5rem, env(safe-area-inset-left, 0px));
  max-height: 100dvh;
  overflow: hidden;
}

.modal-default-dialog .q-dialog__inner > .q-card.modal-default {
  margin: 0 auto;
}
</style>

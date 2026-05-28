<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ranking } from 'src/stores/user-store';
import { useUserStore } from 'src/stores/user-store';
import { useAudio } from 'src/composables/useAudio';
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel({ default: false });

const useUser = useUserStore();
const { audioClick } = useAudio();

const rankingRaw = ref<Ranking[]>([]);

onMounted(async () => {
  rankingRaw.value = await useUser.getTop10Ranking();
});

watch(modelValue, () => {
  if (modelValue.value) {
    audioClick();
  }
});
</script>

<style scoped></style>

<template>
  <ModalDefault
    v-model="modelValue"
    title="Classificação"
    icon="leaderboard"
    class-body="modal-ranking__body"
  >
    <ol class="list-numeric modal-ranking__list">
      <li
        class="modal-ranking__item text-principal flex items-center justify-between rounded-borders shadow-1"
        v-for="(rank, index) in rankingRaw"
        :key="index"
      >
        <div class="flex items-center" style="gap: 10px">
          <q-icon
            v-if="index === 0 || index === 1 || index === 2"
            name="trophy"
            class="material-symbols-outlined modal-ranking__trophy"
            :class="
              index === 0
                ? 'text-yellow'
                : index === 1
                  ? 'text-grey-6'
                  : index === 2
                    ? 'text-brown-7'
                    : ''
            "
          />
          <p v-else class="modal-ranking__position no-margin text-bold">{{ index + 1 }}</p>
          <q-img
            v-if="rank.photoURL"
            :srcset="rank?.photoURL"
            class="modal-ranking__avatar q-btn--rounded"
          />
          <p class="modal-ranking__name no-margin text-bold">{{ rank.nome }}</p>
        </div>

        <div class="modal-ranking__stats flex column">
          <p class="no-margin text-bold">Tent.: {{ rank.attemptCounter }}</p>
          <p class="no-margin text-bold">Pts: {{ rank?.score }}</p>
        </div>
      </li>
    </ol>
  </ModalDefault>
</template>

<style scoped lang="scss">
.modal-ranking__body {
  padding-top: clamp(0.35rem, 2vw, 0.75rem);
  padding-bottom: clamp(0.35rem, 2vw, 0.75rem);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.list-numeric {
  list-style: none;
  counter-reset: my-counter;
  padding-left: 0;
  margin: 0;
}

.modal-ranking__list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.2rem, 1.2vw, 0.5rem);
}

.modal-ranking__item {
  counter-increment: my-counter;
  padding: clamp(0.25rem, 1.5vw, 0.5rem) clamp(0.35rem, 2vw, 0.75rem);
  gap: clamp(0.25rem, 2vw, 0.75rem);
}

.modal-ranking__trophy {
  font-size: clamp(1.25rem, 5vw, 2rem) !important;
}

.modal-ranking__position {
  font-size: clamp(0.95rem, 4vw, 1.5rem);
  padding-right: clamp(0.15rem, 1vw, 0.5rem);
}

.modal-ranking__avatar {
  width: clamp(2rem, 9vw, 3.125rem);
  height: clamp(2rem, 9vw, 3.125rem);
  flex-shrink: 0;
}

.modal-ranking__name {
  font-size: clamp(0.72rem, 2.9vw, 1rem);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: clamp(4.5rem, 28vw, 9rem);
}

.modal-ranking__stats {
  font-size: clamp(0.65rem, 2.6vw, 0.85rem);
  line-height: 1.25;
  flex-shrink: 0;
  text-align: right;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ranking } from 'src/stores/user-store';
import { useUserStore } from 'src/stores/user-store';
import { useAudio } from 'src/composable/useAudio';

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
  <q-dialog v-model="modelValue" backdrop-filter="blur(6px)">
    <q-card class="full-height full-width" style="max-height: 400px; max-width: 600px">
      <q-card-section
        class="bg-cyan-7 text-white flex items-center justify-center"
        style="gap: 6px"
      >
        <q-icon name="trophy" class="material-symbols-outlined" size="2rem"></q-icon>
        <p class="text-bold text-h6 no-margin">CLASSIFICAÇÃO</p>
      </q-card-section>
      <q-card-section>
        <ol class="list-numeric">
          <li
            class="text-cyan-6 q-py-sm q-px-lg flex items-center justify-between rounded-borders shadow-1"
            v-for="(rank, index) in rankingRaw"
            :key="index"
          >
            <div class="flex items-center" style="gap: 10px">
              <q-icon
                v-if="index === 0 || index === 1 || index === 2"
                name="trophy"
                class="material-symbols-outlined"
                :class="
                  index === 0
                    ? 'text-yellow'
                    : index === 1
                      ? 'text-grey-6'
                      : index === 2
                        ? 'text-brown-7'
                        : ''
                "
                size="2rem"
              />
              <p v-else class="text-h4 no-margin text-bold">{{ index + 1 }}</p>
              <q-img
                v-if="rank.photoURL"
                :srcset="rank?.photoURL"
                width="50px"
                height="50px"
                class="q-btn--rounded"
              />
              <p class="no-margin text-body1 text-bold">{{ rank.nome }}</p>
            </div>

            <div class="flex column">
              <p class="no-margin text-bold">Tentativas: {{ rank.attemptCounter }}</p>
              <p class="no-margin text-bold">Pontuação: {{ rank?.score }}</p>
            </div>
          </li>
        </ol>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style>
.list-numeric {
  list-style: none;
  counter-reset: my-counter;
  padding-left: 0;

  & li {
    counter-increment: my-counter;
    margin-bottom: 8px;
    position: relative;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ranking} from 'src/stores/user-store';
import { useUserStore } from 'src/stores/user-store';

const modelValue = defineModel({ default: false });

const useUser = useUserStore();
const rankingRaw = ref<Ranking[]>([]);

onMounted(async () => {
  rankingRaw.value = await useUser.getTop10Ranking();
});
</script>

<style scoped></style>

<template>
  <q-dialog v-model="modelValue" backdrop-filter="blur(6px)">
    <q-card class="full-height full-width" style="max-height: 400px; max-width: 600px">
      <q-card-section class="bg-cyan-7 text-white flex items-center" style="gap: 6px">
        <q-icon name="trophy" class="material-symbols-outlined" size="2rem"></q-icon>
        <p class="text-bold text-h6 no-margin">Classificação</p>
      </q-card-section>
      <q-card-section>
        <ol class="list-numeric">
          <li
            class="bg-cyan-7 q-py-md q-px-sm flex items-center justify-between rounded-borders text-white"
            v-for="(rank, index) in rankingRaw"
            :key="index"
          >
            <div class="flex items-center" style="gap: 10px">
              <q-img
                v-if="rank.photoURL"
                :srcset="rank?.photoURL"
                width="50px"
                height="50px"
                class="q-btn--rounded"
              />
              <p class="no-margin text-h6">{{ rank.nome }}</p>
            </div>

            <div class="flex column">
              <p class="no-margin">Tentativas: {{ rank.attemptCounter }}</p>
              <p class="no-margin">Pontuação: {{ rank?.score }}</p>
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
    padding-left: 30px;

    &::before {
      padding: 10px;
      content: counter(my-counter) '';
      position: absolute;
      left: 0;
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>

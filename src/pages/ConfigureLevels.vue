<template>
  <q-page class="q-pa-lg">
    <h2 class="text-h4 q-mb-lg text-center">Configurar Níveis</h2>

    <!-- Tabela somente em telas médias para cima, cards na mobile -->
    <div class="q-mb-xl">
      <q-table
        v-if="!isMobile"
        :rows="levelsConfig"
        :columns="columns"
        row-key="level"
        dense
        flat
        bordered
        :loading="loading"
        :no-data-label="loading ? 'Carregando...' : 'Nenhum nível encontrado.'"
        @row-click="onEditLevel"
        :pagination="pagination"
      >
        <template v-slot:body-cell-actions="props">
          <q-td align="center">
            <q-btn
              icon="edit"
              size="sm"
              color="primary"
              flat
              @click.stop="onEditLevel(props.row)"
            />
          </q-td>
        </template>
      </q-table>

      <!-- Cards para mobile -->
      <div v-else>
        <q-card
          v-for="level in levelsConfig"
          :key="level.level"
          class="q-mb-md"
          bordered
          style="cursor: pointer"
          @click="onEditLevel(level)"
        >
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-subtitle1">Nível {{ level.level }}</div>
                <div class="text-subtitle2">
                  <span
                    ><strong>Cor:</strong>
                    <span :style="{ color: level.color }">{{ level.color }}</span></span
                  ><br />
                  <span
                    ><strong>Cor Texto:</strong>
                    <span :style="{ color: level.textColor }">{{ level.textColor }}</span></span
                  ><br />
                  <span><strong>Deck:</strong> {{ level.deck }}</span
                  ><br />
                  <span><strong>Grade:</strong> {{ level.gridSize }}</span
                  ><br />
                  <span><strong>Pares:</strong> {{ level.pairs }}</span>
                </div>
              </div>
              <div>
                <q-btn
                  icon="edit"
                  size="sm"
                  color="primary"
                  flat
                  @click.stop="onEditLevel(level)"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div v-if="!levelsConfig.length && !loading" class="text-center text-grey">
          Nenhum nível encontrado.
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass size="50px" color="primary" />
        </q-inner-loading>
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card style="min-width: 350px; width: 90vw; max-width: 600px">
        <q-card-section>
          <div class="text-h6">Editar Nível {{ editedLevel?.level }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="saveLevel">
            <q-input
              v-model.number="editedLevel.level"
              label="Nível"
              type="number"
              dense
              readonly
            />
            <q-input v-model="editedLevel.color" label="Cor" dense />
            <q-input v-model="editedLevel.textColor" label="Cor do Texto" dense />
            <q-input v-model="editedLevel.deck" label="Deck" dense />
            <q-input
              v-model.number="editedLevel.gridSize"
              label="Tamanho da Grade"
              type="number"
              dense
            />
            <q-input v-model.number="editedLevel.pairs" label="Pares" type="number" dense />
            <div class="q-mt-md flex justify-end">
              <q-btn label="Cancelar" flat @click="dialog = false" class="q-mr-sm" />
              <q-btn label="Salvar" color="primary" type="submit" :loading="saving" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useQuasar, QSpinnerHourglass } from 'quasar';
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';

const $q = useQuasar();
const gameStore = useGameStore();
const { levelsConfig } = storeToRefs(gameStore);

const loading = ref(false);
const saving = ref(false);
const levels = ref<any[]>([]);
const dialog = ref(false);
const editedLevel = reactive<any>({});

const isMobile = ref(false);

// Detecta mobile via window.matchMedia
function detectMobile() {
  isMobile.value = window.matchMedia('(max-width: 600px)').matches;
}
onMounted(() => {
  detectMobile();
  window.addEventListener('resize', detectMobile);
});

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
});

const columns = [
  { name: 'level', label: 'Nível', field: 'level', sortable: true },
  { name: 'color', label: 'Cor', field: 'color' },
  { name: 'textColor', label: 'Cor Texto', field: 'textColor' },
  { name: 'deck', label: 'Deck', field: 'deck' },
  { name: 'gridSize', label: 'Grade', field: 'gridSize' },
  { name: 'pairs', label: 'Pares', field: 'pairs' },
  { name: 'actions', label: 'Ações', field: 'actions' },
];

async function fetchLevels() {
  loading.value = true;
  try {
    const data = await gameStore.getLevels();
    levels.value = data;
  } finally {
    loading.value = false;
  }
}

function onEditLevel(level: any) {
  Object.assign(editedLevel, JSON.parse(JSON.stringify(level)));
  dialog.value = true;
}

async function saveLevel() {
  saving.value = true;
  try {
    await gameStore.updateSingleLevel(editedLevel.level, { ...editedLevel });
    $q.notify({ type: 'positive', message: 'Nível atualizado!' });
    dialog.value = false;
    await fetchLevels();
  } catch (err) {
    console.log(err);
    $q.notify({ type: 'negative', message: 'Erro ao atualizar nível.' });
  } finally {
    saving.value = false;
  }
}
</script>

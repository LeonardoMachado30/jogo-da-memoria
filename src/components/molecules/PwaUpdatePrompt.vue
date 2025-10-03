<template>
  <q-dialog v-model="showUpdate" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="system_update" color="primary" text-color="white" />
        <span class="q-ml-sm">Nova versão disponível!</span>
      </q-card-section>

      <q-card-section>
        Uma atualização do aplicativo está disponível. Deseja atualizar agora?
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Depois" color="grey" @click="showUpdate = false" />
        <q-btn label="Atualizar" color="primary" @click="updateApp" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showUpdate = ref(false);
let registration: ServiceWorkerRegistration | null = null;

onMounted(() => {
  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdate.value = true;
              registration = reg;
            }
          });
        }
      });
    });
  }
});

function updateApp() {
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    void window.location.reload();
  }
}
</script>

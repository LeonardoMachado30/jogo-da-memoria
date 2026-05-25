<template>
  <q-dialog v-model="showInstallPrompt">
    <q-card style="min-width: 320px; max-width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="download" color="primary" text-color="white" />
        <span class="q-ml-sm text-h6">Instalar Memorix</span>
        <q-space />
        <q-btn icon="close" flat round dense @click="dismissPrompt" aria-label="Fechar" />
      </q-card-section>

      <q-card-section>
        <p class="q-mb-sm">{{ installHint }}</p>
        <p v-if="browserFamily === 'chromium'" class="text-caption text-grey-7 q-mb-none">
          Compatível com Chrome, Edge, Opera e Brave.
        </p>
        <p v-else-if="browserFamily === 'firefox'" class="text-caption text-grey-7 q-mb-none">
          No Firefox desktop o atalho de instalação fica no menu do navegador.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Agora não" color="grey" @click="dismissPrompt" />
        <q-btn
          v-if="canNativeInstall"
          label="Instalar"
          color="primary"
          icon="download"
          @click="onInstall"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePwaInstall } from 'src/composables/usePwaInstall';

const {
  showInstallPrompt,
  browserFamily,
  canNativeInstall,
  installHint,
  installApp,
  dismissPrompt,
} = usePwaInstall();

async function onInstall() {
  await installApp();
}
</script>

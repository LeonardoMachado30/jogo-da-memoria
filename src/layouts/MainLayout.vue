<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-cyan-9 q-py-md">
      <div
        class="flex items-center mx-auto"
        :class="[isHome ? 'justify-end' : 'justify-between']"
        style="max-width: 900px"
      >
        <div v-if="!isHome" class="flex" style="gap: 10px">
          <q-btn icon="arrow_back" round color="amber-7" to="/" />
          <q-btn
            icon="settings"
            round
            color="amber-7"
            @click="showModalSettings = !showModalSettings"
          />
          <q-btn
            icon="school"
            round
            color="amber-7"
            @click="showModalSettings = !showModalSettings"
          />
        </div>
        <div v-if="getUser" class="flex items-center self-end" style="gap: 10px">
          <q-img
            v-if="getUser.photoURL"
            :srcset="getUser?.photoURL"
            width="50px"
            height="50px"
            class="q-btn--rounded"
          />
          <p class="no-margin">{{ getUser.nome }}</p>
        </div>
      </div>
    </q-header>

    <q-page-container class="bg-amber-2">
      <router-view />
    </q-page-container>

    <ModalSettings v-model="showModalSettings" />
  </q-layout>
</template>

<script setup lang="ts">
import { useBackgroundMusic } from 'src/composable/useBackgroundMusic';
import { useUserStore } from 'stores/user-store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import ModalSettings from 'components/molecules/ModalSettings.vue';

const route = useRoute();
const useUser = useUserStore();
const { getUser } = storeToRefs(useUser);

const { playMusic, pauseMusic } = useBackgroundMusic();

const showModalSettings = ref(false);

const isHome = computed(() => route.fullPath === '/');

function clickPage() {
  const isPauseMusic = localStorage.getItem('isPauseMusic');
  if (!isPauseMusic) {
    playMusic();
  }
}

onMounted(() => {
  document.addEventListener('click', clickPage, { once: true });

  window.addEventListener('focus', playMusic);

  window.addEventListener('blur', pauseMusic);

  useUser.loadUserFromStorage();
});

onUnmounted(() => {
  window.removeEventListener('focus', playMusic);
  window.removeEventListener('blur', pauseMusic);
});
</script>

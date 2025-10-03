<script setup lang="ts">
import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'stores/user-store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import ModalSettings from 'components/organisms/ModalSettings.vue';
import ModalTutorial from 'components/organisms/ModalTutorial.vue';

const route = useRoute();
const useUser = useUserStore();
const { getUser } = storeToRefs(useUser);

const { playMusic, pauseMusic } = useAudio();

const showModalSchool = ref(false);

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
});

onUnmounted(() => {
  window.removeEventListener('focus', playMusic);
  window.removeEventListener('blur', pauseMusic);
});
</script>

<template>
  <q-layout
    view="lHh Lpr lFf"
    :style="
      isHome
        ? `
        background: url('background/tela-inicial.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: fixed;
        inset: 0;
        overflow: hidden;
      `
        : `
        background: url('background/tela-inicial.png');
        background-size: 90vh;
        background-repeat: no-repeat;
        background-position: center;
        position: fixed;
        inset: 0;
        overflow: hidden;
        /* O scale do background é feito pelo background-size acima */
      `
    "
  >
    >
    <q-header class="bg-transparent text-principal q-py-md q-px-lg">
      <div
        class="flex items-center mx-auto"
        :class="[isHome ? 'justify-end' : 'justify-between']"
        style="max-width: 900px"
      >
        <div v-if="!isHome" class="flex" style="gap: 10px">
          <q-btn icon="arrow_back" round color="black" to="/" />
        </div>

        <q-btn round push v-if="getUser?.photoURL">
          <q-avatar size="42px">
            <img :src="getUser.photoURL" />
          </q-avatar>

          <q-popup-proxy>
            <div class="row bg-white q-pa-sm flex gap-4" inline-actions>
              <q-btn icon="logout" round color="red" @click="useUser.logout" />
              <ModalSettings></ModalSettings>
              <q-btn
                icon="school"
                round
                color="black"
                @click="showModalSchool = !showModalSchool"
              />
            </div>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <ModalTutorial v-model="showModalSchool" />
  </q-layout>
</template>

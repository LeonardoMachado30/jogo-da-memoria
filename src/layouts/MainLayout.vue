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
  if (isPauseMusic == 'false') {
    playMusic();
  } else {
    pauseMusic();
  }
}

onMounted(() => {
  document.addEventListener('click', clickPage);

  // window.addEventListener('focus', clickPage);

  // window.addEventListener('blur', clickPage);
});

onUnmounted(() => {
  // window.removeEventListener('focus', clickPage);
  // window.removeEventListener('blur', clickPage);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="main-layout-blur">
    <!-- Camada de background com blur -->
    <q-img
      src="background/tela-inicial.png"
      class="background-blur"
      :class="{ 'background-blur--home': isHome, 'background-blur--other': !isHome }"
    ></q-img>

    <!-- Conteúdo principal acima do background -->
    <div class="main-layout-content">
      <q-header class="bg-transparent text-principal q-py-md q-px-lg">
        <div
          class="flex items-center mx-auto"
          :class="[isHome ? 'justify-end' : 'justify-between']"
          style="max-width: 900px"
        >
          <div v-if="!isHome" class="flex" style="gap: 10px">
            <q-btn icon="arrow_back" round color="black" to="/" />
          </div>

          <ModalSettings></ModalSettings>

          <q-btn round push v-if="getUser?.photoURL">
            <q-avatar size="42px">
              <img :src="getUser.photoURL" />
            </q-avatar>

            <q-popup-proxy>
              <div class="row bg-white q-pa-sm flex gap-4" inline-actions>
                <q-btn icon="logout" round color="red" @click="useUser.logout" />
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
    </div>
  </q-layout>
</template>

<style scoped>
.main-layout-blur {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.background-blur {
  position: fixed;
  inset: 0;
  z-index: 0;
  filter: blur(5px) brightness(0.95);
  width: 100vw;
  height: 100vh;
}

.background-blur--home,
.background-blur--other {
  width: 100vw;
  height: 100vh;
}

.background-blur--home q-img,
.background-blur--other q-img {
  width: 100vw !important;
  height: 100vh !important;
  object-fit: cover !important;
}

.background-blur--other {
  background-size: cover;
}

.main-layout-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100vw;
}
</style>

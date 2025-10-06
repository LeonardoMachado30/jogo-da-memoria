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
const isParty = computed(() => route.query.level);

function clickPage() {
  const isPauseMusic = localStorage.getItem('isPauseMusic');
  if (isPauseMusic == 'false') {
    playMusic();
  } else {
    pauseMusic();
  }
}

function resetLevel() {
  window.location.reload();
}

onMounted(() => {
  document.addEventListener('click', clickPage);
});

onUnmounted(() => {
  document.removeEventListener('click', clickPage);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="main-layout-blur">
    <q-img
      src="background/tela-inicial.png"
      class="background-blur"
      :class="{ 'background-blur--home': isHome, 'background-blur--other': !isHome }"
      alt="tela de fundo"
      fetchpriority="high"
      no-spinner
    ></q-img>

    <div class="main-layout-content">
      <q-header class="bg-transparent text-principal q-py-md q-px-lg">
        <div
          class="flex items-center mx-auto"
          :class="[isHome ? 'justify-end' : 'justify-between']"
          style="max-width: 900px"
        >
          <q-btn v-if="!isHome" icon="arrow_back" round color="black" to="/" />

          <div>
            <q-btn
              v-if="isParty"
              icon="history"
              round
              color="black"
              @click="resetLevel"
              class="q-mr-md"
            />
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
  filter: blur(1px) brightness(1);
  object-fit: cover !important;
  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.background-blur--home {
  transform: scale(2.3);
}

.background-blur--other {
  transform: scale(1);
}

.main-layout-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100vw;
}
</style>

<template>
  <q-layout view="lHh Lpr lFf" class="main-layout-blur">
    <!-- Transição de background usando GSAP -->
    <div ref="backgroundRef" class="background-blur" alt="tela de fundo"></div>

    <div class="main-layout-content">
      <q-header class="bg-transparent text-principal q-py-md q-px-lg">
        <div
          class="flex items-center mx-auto"
          :class="[isHome ? 'justify-end' : 'justify-between']"
          style="max-width: 900px"
        >
          <q-btn
            v-if="!isHome"
            icon="keyboard_arrow_left"
            round
            color="white"
            text-color="black"
            to="/"
          />

          <div>
            <q-btn
              v-if="isParty"
              icon="history"
              round
              @click="resetLevel"
              class="q-mr-md"
              color="white"
              text-color="black"
            />
            <ModalSettings></ModalSettings>

            <q-btn round push v-if="getUser?.photoURL">
              <q-avatar size="42px">
                <img :src="getUser.photoURL" />
              </q-avatar>

              <q-popup-proxy>
                <div class="row bg-white q-pa-sm flex gap-4" inline-actions>
                  <q-btn icon="logout" round color="red" @click="logout" />
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
<script setup lang="ts">
// import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'stores/user-store';
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch, nextTick, onMounted } from 'vue';
import ModalSettings from 'components/organisms/ModalSettings.vue';
import ModalTutorial from 'components/organisms/ModalTutorial.vue';
import gsap from 'gsap';
import { shouldUseLiteEffects } from 'src/utils/performance';

const route = useRoute();
const router = useRouter();
const useUser = useUserStore();
const useGame = useGameStore();
const { getUser } = storeToRefs(useUser);

// const { playMusic, pauseMusic } = useAudio();

const showModalSchool = ref(false);

const isHome = computed(() => route.fullPath === '/');
const isParty = computed(() => route.query.level);

const backgroundRef = ref<HTMLElement | null>(null);

// Função para animar o background usando GSAP
function animateBackground(isHomeValue: boolean) {
  if (!backgroundRef.value) return;

  const lite = shouldUseLiteEffects();
  const inGame = !isHomeValue;

  gsap.to(backgroundRef.value, {
    scale: isHomeValue ? 1 : lite ? 1.15 : 30,
    filter: isHomeValue
      ? 'blur(1px) brightness(1)'
      : lite
        ? 'blur(2px) brightness(0.92)'
        : 'blur(8px) brightness(0.7)',
    duration: lite ? 0.6 : 1.6,
    ease: lite ? 'power2.out' : 'power3.inOut',
    borderRadius: isHomeValue ? '0%' : lite ? '0%' : '30%',
    boxShadow:
      isHomeValue || lite
        ? '0 0 0px 0px rgba(0,0,0,0)'
        : '0 0 120px 40px rgba(0,0,0,0.25)',
    force3D: inGame && lite,
  });

  if (lite && inGame) {
    backgroundRef.value.style.willChange = 'auto';
  }
}

// Observa mudanças de rota para animar a transição do background
watch(isHome, async (novo) => {
  await nextTick();
  animateBackground(novo);
});

// Garante que ao montar já esteja no estado correto
onMounted(async () => {
  await useGame.getLevels();

  const uid = getUser.value?.uid;
  if (uid) {
    await useUser.hydrateLocalProgressFromFirebase(uid);
  }

  animateBackground(isHome.value);
});

function resetLevel() {
  window.location.reload();
}

const logout = async () => {
  try {
    await useUser.logout();
    if (router.currentRoute.value.fullPath !== '/') {
      await router.push('/');
    }
  } catch (e) {
    console.error(e);
  }
};
</script>
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
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(/background/tela-inicial.png);
  will-change: auto;
  /* O scale será controlado pelo GSAP */
  /* Transições suaves e metamórficas via GSAP */
}

.main-layout-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100vw;
}
</style>

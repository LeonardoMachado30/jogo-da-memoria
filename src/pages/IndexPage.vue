<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useAudio } from 'src/composables/useAudio';
import gsap from 'gsap';
import { useRouter } from 'vue-router';
const BtnLoginGoogle = defineAsyncComponent(() => import('components/atoms/BtnLoginGoogle.vue'));
const ModalSettings = defineAsyncComponent(() => import('components/organisms/ModalSettings.vue'));
const ModalRanking = defineAsyncComponent(() => import('components/organisms/ModalRanking.vue'));
const ModalTutorial = defineAsyncComponent(() => import('components/organisms/ModalTutorial.vue'));
const ModalCredits = defineAsyncComponent(() => import('components/organisms/ModalCredits.vue'));

const { audioMouseHover, audioClick } = useAudio();
const useUser = useUserStore();
const router = useRouter();
const modalSettings = ref(false);
const modalRanking = ref(false);
const modalSchool = ref(false);
const modalCredits = ref(false);

const tl = gsap.timeline();

function onStartGame() {
  audioClick();

  if (tl) {
    tl.reverse();
    tl.eventCallback('onReverseComplete', () => {
      router.push('/escolher-nivel').catch((e) => console.error(e));
    });
  }
}

onMounted(() => {
  tl.fromTo(
    '.title',
    { y: 700, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' },
  );

  tl.fromTo(
    '.animate-button',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.6, stagger: 0.2, ease: 'elastic.out(1,0.4)' },
    '-=0.5',
  );

  tl.fromTo(
    '.createdBy',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.3)' },
    '-=0.8',
  );
});
</script>

<template>
  <q-page class="flex column items-center justify-center">
    <!-- Tela inicial -->
    <div class="flex column justify-center items-center">
      <h1 class="text-white text-bold m-none text-center text-h4 md:text-h2 title">
        Jogo da memória
      </h1>

      <div class="animate-button">
        <q-btn
          icon="play_arrow"
          class="bg-cyan-6 text-white q-mb-sm rounded-full"
          style="width: 100px; height: 100px"
          size="xl"
          rounded
          @click="onStartGame"
          @mouseenter="audioMouseHover()"
        />
      </div>

      <div v-if="useUser.getUser == null" class="flex column gap-4 q-my-xl">
        <div class="animate-button">
          <BtnLoginGoogle />
        </div>
      </div>

      <section style="max-width: 200px" class="flex justify-center items-center">
        <div class="animate-button">
          <q-btn
            label="Tutorial"
            rounded
            icon="school"
            class="bg-cyan-6 text-white q-mb-sm full-width"
            @click="modalSchool = !modalSchool"
            @mouseenter="audioMouseHover()"
          />
        </div>

        <div class="animate-button">
          <q-btn
            label="configurações"
            rounded
            icon="settings"
            class="bg-cyan-6 text-white q-mb-sm full-width"
            @click="modalSettings = !modalSettings"
            @mouseenter="audioMouseHover()"
          />
        </div>

        <template v-if="useUser.getUser !== null">
          <div class="animate-button">
            <q-btn
              rounded
              class="bg-cyan-6 text-white q-mb-sm full-width"
              @click="modalRanking = !modalRanking"
              @mouseenter="audioMouseHover()"
            >
              <div class="flex items-center" style="gap: 10px">
                <q-icon name="leaderboard" size="1.5rem"></q-icon>
                <p class="no-margin">classificação</p>
              </div>
            </q-btn>
          </div>
        </template>

        <div class="animate-button">
          <q-btn
            icon="copyright"
            label="Créditos"
            rounded
            class="bg-cyan-6 text-white q-mb-sm full-width"
            @click="modalCredits = !modalCredits"
            @mouseenter="audioMouseHover()"
          />
        </div>
      </section>

      <p class="createdBy font-black text-white text-bold fixed-bottom-right q-ma-md">
        Created by: Flávio Leonardo
      </p>
    </div>

    <!-- Outros modais ainda funcionam -->
    <ModalSettings v-if="modalSettings" v-model="modalSettings" />
    <ModalRanking v-if="modalRanking" v-model="modalRanking" />
    <ModalTutorial v-if="modalSchool" v-model="modalSchool" />
    <ModalCredits v-if="modalCredits" v-model="modalCredits" />
  </q-page>
</template>

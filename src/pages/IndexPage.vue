<template>
  <q-page class="flex column items-center justify-center">
    <!-- Tela inicial -->
    <div class="flex column items-center" style="margin-top: -200px">
      <h1 class="text-blue-3 m-none text-center title bunguee-regular text-shadow">MEMORIX</h1>

      <q-btn
        icon="play_arrow"
        class="bg-cyan-3 text-black q-mb-xl rounded-full shadow-sm animate-button"
        style="width: 100px; height: 100px"
        size="xl"
        rounded
        @click="onStartGame"
        @mouseenter="audioMouseHover()"
      />

      <div v-if="useUser.getUser == null" class="animate-button">
        <BtnLoginGoogle />
      </div>

      <q-btn
        label="Tutorial"
        rounded
        icon="school"
        class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        @click="modalSchool = !modalSchool"
        @mouseenter="audioMouseHover()"
      />

      <q-btn
        v-if="useUser.getUser !== null"
        rounded
        class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        @click="modalRanking = !modalRanking"
        @mouseenter="audioMouseHover()"
      >
        <div class="flex items-center" style="gap: 10px">
          <q-icon name="leaderboard" size="1.5rem"></q-icon>
          <p class="no-margin">classificação</p>
        </div>
      </q-btn>

      <q-btn
        icon="copyright"
        label="Créditos"
        rounded
        class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        @click="modalCredits = !modalCredits"
        @mouseenter="audioMouseHover()"
      />

      <template v-if="useUser.getUser?.permission === 'ADMIN'">
        <p class="createdBy">ADMINISTRADOR</p>
        <q-btn
          label="Todas as cartas"
          to="/todas-as-cartas"
          rounded
          icon="list"
          class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        />

        <q-btn
          label="Usuarios"
          to="/todos-os-usuarios"
          rounded
          icon="group"
          class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        />
        <q-btn
          label="Configurar nivel"
          to="/configurar-niveis"
          rounded
          icon="group"
          class="bg-cyan-3 text-black q-mb-sm full-width shadow-sm animate-button"
        />
      </template>

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

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useAudio } from 'src/composables/useAudio';
import gsap from 'gsap';
import { useRouter } from 'vue-router';
// import { titleAnimation } from 'src/animations/text';
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
  // titleAnimation(tl);
  const title = document.querySelectorAll('.title');

  // const titleRect = title.
  tl.fromTo(
    title,
    { y: 100, opacity: 0, scale: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.6,
      scale: 1,
      ease: 'elastic.out(1,0.4)',
    },
  );

  tl.fromTo(
    '.animate-button',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'elastic.out(1,0.4)' },
  );

  tl.fromTo(
    '.createdBy',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1,0.3)' },
  );

  // gsap.fromTo('.background-blur', { scale: 1 }, { scale: 50 });
});
</script>

<style scoped lang="scss">
.title {
  font-size: 4rem;

  @media only screen and (max-width: 900px) {
    font-size: 3rem;
  }
}
</style>

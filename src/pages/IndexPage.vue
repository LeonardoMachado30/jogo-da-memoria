<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useAudio } from 'src/composable/useAudio';

const BtnLoginGoogle = defineAsyncComponent(() => import('components/atoms/BtnLoginGoogle.vue'));
const ModalSettings = defineAsyncComponent(() => import('components/organisms/ModalSettings.vue'));
const ModalRanking = defineAsyncComponent(() => import('components/organisms/ModalRanking.vue'));
const ModalTutorial = defineAsyncComponent(() => import('components/organisms/ModalTutorial.vue'));
const ModalCredits = defineAsyncComponent(() => import('components/organisms/ModalCredits.vue'));
const ModalChooseLevel = defineAsyncComponent(
  () => import('components/organisms/ModalChooseLevel.vue'),
);

const { audioMouseHover, audioClick } = useAudio();
const useUser = useUserStore();

const modalSettings = ref(false);
const modalRanking = ref(false);
const modalSchool = ref(false);
const modalCredits = ref(false);
const modalChooseLevel = ref(false);

function onStartGame() {
  modalChooseLevel.value = !modalChooseLevel.value;
  audioClick();
}
</script>

<template>
  <q-page class="flex column items-center justify-center">
    <h1 class="text-principal text-bold m-none text-center text-h2">Jogo da memória</h1>

    <div v-if="useUser.getUser == null" class="flex column gap-4">
      <BtnLoginGoogle />
    </div>

    <section style="max-width: 200px">
      <q-btn
        :label="useUser.getUser ? 'Iniciar jogo' : 'Jogar sem conta'"
        rounded
        icon="play_arrow"
        class="bg-cyan-6 text-white q-mb-sm full-width"
        @click="onStartGame"
        @mouseenter="audioMouseHover()"
      />
      <q-btn
        label="Tutorial"
        rounded
        icon="school"
        class="bg-cyan-6 text-white q-mb-sm full-width"
        @click="modalSchool = !modalSchool"
        @mouseenter="audioMouseHover()"
      />
      <q-btn
        label="configurações"
        rounded
        icon="settings"
        class="bg-cyan-6 text-white q-mb-sm full-width"
        @click="modalSettings = !modalSettings"
        @mouseenter="audioMouseHover()"
      />
      <template v-if="useUser.getUser !== null">
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
      </template>

      <q-btn
        icon="copyright"
        label="Créditos"
        rounded
        class="bg-cyan-6 text-white q-mb-sm full-width"
        @click="modalCredits = !modalCredits"
        @mouseenter="audioMouseHover()"
      />
    </section>

    <p>Created by: Flávio Leonardo</p>

    <ModalSettings v-if="modalSettings" v-model="modalSettings" />

    <ModalRanking v-if="modalRanking" v-model="modalRanking" />

    <ModalTutorial v-if="modalSchool" v-model="modalSchool" />

    <ModalCredits v-if="modalCredits" v-model="modalCredits" />

    <ModalChooseLevel v-if="modalChooseLevel" v-model="modalChooseLevel" />
  </q-page>
</template>

<style scoped></style>

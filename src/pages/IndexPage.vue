<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useAudio } from 'src/composable/useAudio';
import BtnLoginGoogle from 'components/atoms/BtnLoginGoogle.vue';
import ModalSettings from 'components/organisms/ModalSettings.vue';
import ModalRanking from 'components/organisms/ModalRanking.vue';
import ModalTutorial from 'components/organisms/ModalTutorial.vue';
import ModalCredits from 'components/organisms/ModalCredits.vue';
import ModalChooseLevel from 'components/organisms/ModalChooseLevel.vue';

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
    <h1 class="text-principal text-bold m-none text-center">Jogo da memória</h1>

    <template v-if="useUser.getUser == null">
      <div class="flex column">
        <BtnLoginGoogle />
      </div>
    </template>

    <section v-else style="max-width: 200px">
      <q-btn
        label="Iniciar jogo"
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

    <ModalSettings v-model="modalSettings" />

    <ModalRanking v-model="modalRanking" />

    <ModalTutorial v-model="modalSchool" />

    <ModalCredits v-model="modalCredits" />

    <ModalChooseLevel v-model="modalChooseLevel" />
  </q-page>
</template>

<style scoped></style>

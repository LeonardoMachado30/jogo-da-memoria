<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useAudio } from 'src/composable/useAudio';
import BtnLoginGoogle from 'components/atoms/BtnLoginGoogle.vue';
import ModalSettings from 'components/organisms/ModalSettings.vue';
import ModalRanking from 'components/organisms/ModalRanking.vue';

const { audioMouseHover } = useAudio();
const useUser = useUserStore();
const modalSettings = ref(false);
const modalRanking = ref(false);
</script>

<template>
  <q-page class="flex column items-center justify-center">
    <h1 class="text-cyan-6 text-bold m-none">Jogo da memória</h1>

    <template v-if="useUser.getUser == null">
      <div class="flex column">
        <q-btn
          label="Iniciar Jogo Anonimamente"
          class="bg-cyan-6 text-white q-mb-sm"
          to="/partida"
          @mouseenter="audioMouseHover()"
        />
        <BtnLoginGoogle />
      </div>
    </template>

    <template v-else>
      <q-btn
        label="Iniciar jogo"
        square
        icon="play_arrow"
        class="bg-cyan-6 text-white q-mb-sm"
        to="/partida"
        @mouseenter="audioMouseHover()"
      />
      <q-btn
        label="configurações"
        square
        icon="settings"
        class="bg-cyan-6 text-white q-mb-sm"
        @click="modalSettings = !modalSettings"
        @mouseenter="audioMouseHover()"
      />
      <q-btn
        square
        class="bg-cyan-6 text-white q-mb-sm"
        @click="modalRanking = !modalRanking"
        @mouseenter="audioMouseHover()"
      >
        <div class="flex items-center" style="gap: 10px">
          <q-icon name="trophy" class="material-symbols-outlined" size="2rem"></q-icon>
          <p class="no-margin">classificação</p>
        </div>
      </q-btn>
    </template>

    <ModalSettings v-model="modalSettings" />

    <ModalRanking v-model="modalRanking" />
  </q-page>
</template>

<style scoped></style>

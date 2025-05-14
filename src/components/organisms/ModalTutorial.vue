<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAudio } from 'src/composables/useAudio';
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel({ default: false });

const { audioClick } = useAudio();

const slide = ref('1');

watch(modelValue, () => {
  if (modelValue.value) {
    audioClick();
  }
});
</script>

<template>
  <ModalDefault v-model="modelValue" title="Instruções" icon="school">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="black"
      arrows
      height="300px"
      class="full-width q-px-md"
    >
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <q-card-section class="q-pa-none">
          <p class="text-body1 text-bold text-principal q-mb-none">
            Objetivo do Jogo Combine todos os pares de cartas com o menor número de tentativas
            possível.
          </p>

          <p class="text-h6 text-bold text-principal">Como Jogar</p>

          <ul>
            <li>Clique em uma carta para virá-la e revelar a imagem.</li>
            <li>Clique em uma segunda carta para tentar encontrar o par correspondente.</li>
            <li>Se as cartas forem iguais, elas permanecem viradas.</li>
            <li>Se forem diferentes, elas serão ocultadas novamente após alguns segundos.</li>
          </ul>
        </q-card-section>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-card-section class="q-pa-none">
          <p class="text-h6 text-bold text-principal">Dicas</p>
          <ul>
            <li>Preste atenção nas imagens reveladas e tente lembrar da posição de cada uma.</li>
            <li>A cada novo nível, o número de cartas aumenta, tornando o desafio maior!</li>
          </ul>
        </q-card-section>
        <q-card-actions>
          <q-btn label="fechar" color="amber-7" @click="modelValue = !modelValue"></q-btn>
        </q-card-actions>
      </q-carousel-slide>
    </q-carousel>
  </ModalDefault>
</template>

<style scoped></style>

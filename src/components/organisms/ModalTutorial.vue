<script setup lang="ts">
import { ref } from 'vue';

const modelValue = defineModel({ default: false });

const slide = ref('1');
</script>

<template>
  <q-dialog v-model="modelValue" backdrop-filter="blur(6px)">
    <q-card class="full-width" style="max-width: 600px">
      <q-card-section class="bg-cyan-7 text-white flex items-center" style="gap: 6px">
        <q-icon name="school" size="2rem" class="no-margin"></q-icon>
        <p class="text-bold text-h4 no-margin">Instruçõoes</p>
      </q-card-section>
      <q-card-section class="q-pa-none">
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
              <p class="text-body1 text-bold text-cyan-9 q-mb-none">
                Objetivo do Jogo Combine todos os pares de cartas com o menor número de tentativas
                possível.
              </p>

              <p class="text-h6 text-bold text-cyan-9">Como Jogar</p>

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
              <p class="text-h6 text-bold text-cyan-9">Dicas</p>
              <ul>
                <li>
                  Preste atenção nas imagens reveladas e tente lembrar da posição de cada uma.
                </li>
                <li>A cada novo nível, o número de cartas aumenta, tornando o desafio maior!</li>
              </ul>
            </q-card-section>
            <q-card-actions>
              <q-btn label="fechar" color="amber-7" @click="modelValue = !modelValue"></q-btn>
            </q-card-actions>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

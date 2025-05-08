<script setup lang="ts">
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel({ default: false });
</script>

<template>
  <ModalDefault v-model="modelValue" title="Créditos" icon="copyright">
    <p class="text-center text-bold">Audio e efeitos sonoros</p>

    <p>Perdeu o jogo: https://freesound.org/people/themusicalnomad/sounds/253886/</p>
    <p>hover botões: https://freesound.org/people/deathbyfairydust/sounds/658431/</p>
    <p>clicou no botão: https://freesound.org/people/deathbyfairydust/sounds/658431/</p>
    <p>cartas: https://pixabay.com/sound-effects/card-sounds-35956/</p>
    <p>ganhou o jogo: https://pixabay.com/pt/sound-effects/crowd-cheer-ii-6263/</p>
    <p>Música de fundo: https://pixabay.com/pt/music/batidas-lofi-coffee-332824/</p>
    <p>Par de cartas feito: https://pixabay.com/pt/sound-effects/success-1-6297/</p>
  </ModalDefault>
</template>

<style scoped></style>

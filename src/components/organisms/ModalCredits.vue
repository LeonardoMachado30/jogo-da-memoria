<script setup lang="ts">
import ModalDefault from 'components/organisms/ModalDefault.vue';

const modelValue = defineModel({ default: false });
</script>

<template>
  <ModalDefault
    v-model="modelValue"
    title="Créditos"
    icon="copyright"
    class-body="modal-credits__body"
  >
    <p class="text-center text-bold modal-credits__heading">Audio e efeitos sonoros</p>

    <p>Perdeu o jogo: https://freesound.org/people/themusicalnomad/sounds/253886/</p>
    <p>hover botões: https://freesound.org/people/deathbyfairydust/sounds/658431/</p>
    <p>clicou no botão: https://freesound.org/people/deathbyfairydust/sounds/658431/</p>
    <p>cartas: https://pixabay.com/sound-effects/card-sounds-35956/</p>
    <p>ganhou o jogo: https://pixabay.com/pt/sound-effects/crowd-cheer-ii-6263/</p>
    <p>Música de fundo: https://pixabay.com/pt/music/batidas-lofi-coffee-332824/</p>
    <p>Par de cartas feito: https://pixabay.com/pt/sound-effects/success-1-6297/</p>

    <p>Imagens de emojis:</p>
    <a
      class="text-white"
      href="https://br.freepik.com/vetores-gratis/conjunto-de-emoticons-tristes-e-felizes_9650747.htm#fromView=keyword&page=1&position=0&uuid=b716e7f2-5614-4332-ae4d-531d7496c50a&query=Emoticons"
      >Imagem de pch.vector no Freepik</a
    >
  </ModalDefault>
</template>

<style scoped lang="scss">
.modal-credits__body {
  font-size: clamp(0.68rem, 2.7vw, 0.875rem);
  line-height: 1.35;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.modal-credits__body p,
.modal-credits__body a {
  margin: 0 0 clamp(0.2rem, 1.2vw, 0.4rem);
  word-break: break-word;
}

.modal-credits__heading {
  font-size: clamp(0.8rem, 3.2vw, 1rem);
  margin-bottom: clamp(0.35rem, 2vw, 0.65rem) !important;
}
</style>

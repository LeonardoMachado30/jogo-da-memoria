<script setup lang="ts">
import { useGameStore } from 'stores/game-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useAudio } from 'src/composables/useAudio';
import gsap from 'gsap';

const router = useRouter();
const useGame = useGameStore();
const { audioClick } = useAudio();

const { currentLevel } = storeToRefs(useGame);

const tl = gsap.timeline();

function goToLevel(level: number) {
  currentLevel.value = level;
  audioClick();

  if (tl) {
    tl.reverse();
    tl.eventCallback('onReverseComplete', () => {
      router.push('/partida').catch((e) => console.error(e));
    });
  }
}

onMounted(() => {
  tl.fromTo(
    '.title',
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' },
  );

  tl.fromTo(
    '.level1',
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' },
  );

  tl.fromTo(
    '.level2',
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.4)' },
    '-=0.5',
  );

  tl.fromTo(
    '.level3',
    { y: 200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.3)' },
    '-=0.5',
  );

  // Animação de chacoalhar/vibrar
  setInterval(() => {
    tl.to('.title', {
      x: -10,
      duration: 0.05,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1,
    })
      .to('.title', {
        x: 10,
        duration: 0.05,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      })
      .to('.title', {
        x: -8,
        duration: 0.05,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      })
      .to('.title', {
        x: 8,
        duration: 0.05,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      })
      .to('.title', {
        x: -5,
        duration: 0.05,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      })
      .to('.title', {
        x: 5,
        duration: 0.05,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      })
      .to('.title', {
        x: 0,
        duration: 0.05,
        ease: 'power1.inOut',
      });
  }, 12000);
});
</script>

<template>
  <q-page class="flex column items-center justify-center gap-6">
    <h2 class="text-white text-h3 title">Selecione o nível</h2>

    <a href="/" class="text-red title q-mb-md">LOGIN NECESSARIO PARA CONTABILIZAR PONTOS</a>

    <div class="flex column justify-center items-center gap-4 full-width">
      <q-btn
        label="Nível 1"
        @click="goToLevel(1)"
        color="green-6"
        text-color="white"
        class="q-py-lg level1 full-width"
        style="max-width: 400px"
      />
      <q-btn
        label="Nível 2"
        @click="goToLevel(2)"
        rounded
        color="amber-6"
        text-color="white"
        class="q-py-lg level2 full-width"
        style="max-width: 400px"
      />
      <q-btn
        label="Nível 3"
        @click="goToLevel(3)"
        glossy
        color="red-6"
        text-color="white"
        class="q-py-lg level3 full-width"
        style="max-width: 400px"
      />
    </div>
  </q-page>
</template>

<style scoped>
.level1,
.level2,
.level3 {
  opacity: 0;
}
</style>

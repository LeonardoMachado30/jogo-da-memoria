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

const { game, levelsConfig } = storeToRefs(useGame);

const tl = gsap.timeline();

function goToLevel(level: number) {
  game.value.currentLevel = level;
  audioClick();

  if (tl) {
    tl.reverse();
    tl.eventCallback('onReverseComplete', () => {
      void router.push('/partida');
    });
  }
}

onMounted(() => {
  const levelsContainer = document.querySelectorAll('.level');

  levelsContainer.forEach((level) => {
    tl.fromTo(
      level,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.1,
        delay: 0.2,
        ease: 'elastic.out(1,0.1)',
      },
    );
  });

  tl.to('.title', {
    x: -10,
    duration: 0.05,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1,
  });

  // Animação de chacoalhar/vibrar
  setTimeout(() => {
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
  <q-page
    class="flex column items-center gap-6 q-px-sm"
    style="max-width: 900px; margin: 0 auto; bottom: 40px"
  >
    <h2 class="text-red text-h3 text-weight-bolder">Selecione o nível</h2>

    <div class="flex justify-center items-center gap-4 full-width">
      <q-btn
        v-for="value in levelsConfig"
        :key="value.level"
        :label="`Nível ${value.level}`"
        @click="goToLevel(1)"
        :color="value.color"
        :text-color="value.textColor"
        class="q-py-lg level text-weight-bolder full-width"
        :class="`level${value.level}`"
        style="max-width: 200px; height: 200px"
      />
    </div>

    <a
      href="/"
      class="text-black bg-red rounded-md shadow-lg text-bold title fixed-bottom text-center"
      style="max-width: 400px; margin: 0 auto; bottom: 40px"
      >LOGIN NECESSARIO PARA CONTABILIZAR CONQUISTAS</a
    >
  </q-page>
</template>

<style scoped>
.level1,
.level2,
.level3 {
  opacity: 0;
}
</style>

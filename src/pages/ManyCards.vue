<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="all-cards-wrapper">
      <h2 class="text-h4 text-center q-mb-lg tagesschrift-regular">Todas as Cartas do Jogo</h2>

      <div class="nav-menu-fixed">
        <q-btn
          label="Frutas"
          color="primary"
          class="q-mr-sm"
          @click="scrollTo('frutas')"
          icon="local_grocery_store"
          rounded
        />
        <q-btn
          label="Emojis"
          color="secondary"
          @click="scrollTo('emojis')"
          icon="emoji_emotions"
          rounded
        />
      </div>

      <div class="cards-grid">
        <h2 :id="'frutas'" class="grid-columns-full text-center text-h4">Frutas</h2>
        <div v-for="(card, id) in allCardsFruits" :key="id" class="card-container">
          <img :src="card.src" :alt="card.alt" class="game-card" />
          <div class="card-name text-center q-mt-xs">{{ card.alt }}</div>
        </div>

        <h2 :id="'emojis'" class="grid-columns-full text-center text-h4">Emojis</h2>
        <div v-for="(card, id) in allCardsEmojis" :key="id" class="card-container">
          <img :src="card.src" :alt="card.alt" class="game-card" />
          <div class="card-name text-center q-mt-xs">{{ card.alt }}</div>
        </div>
      </div>

      <q-btn
        v-if="showToTop"
        class="go-to-top-btn"
        color="primary"
        icon="arrow_upward"
        round
        size="lg"
        @click="scrollToTop"
        aria-label="Ir para o topo"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { randomImagesFruits, randomImagesEmojis } from 'src/model/images';

const allCardsFruits = ref(randomImagesFruits);
const allCardsEmojis = ref(randomImagesEmojis);

// Função para navegar até âncora na página
function scrollTo(section: string) {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Controle do botão "voltar ao topo"
const showToTop = ref(false);

function handleScroll() {
  showToTop.value = window.scrollY > 200;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.all-cards-wrapper {
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}

.grid-columns-full {
  grid-column-start: 1;
  grid-column-end: -1;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-card {
  height: min(120px);
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: 2px solid #dbeafe;
  padding: 20px;
}

.card-name {
  font-size: 1rem;
  color: #333;
  background: #e3f2fd;
  border-radius: 6px;
  margin-top: 8px;
  padding: 2px 8px;
  min-width: 80px;
  word-break: break-word;
}

/* Fixed navigation menu styling */
.nav-menu-fixed {
  position: sticky;
  right: 0px;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  gap: 12px;
  max-width: 300px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

/* Botão para ir ao topo fixo na tela */
.go-to-top-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1200;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  transition: opacity 0.2s;
}

/* No mobile, botão um pouco mais próximo */
@media (max-width: 600px) {
  .nav-menu-fixed {
    top: 12px;
    right: 8px;
    flex-direction: row;
    gap: 8px;
  }
  .go-to-top-btn {
    bottom: 16px;
    right: 16px;
  }
}
</style>

<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="all-users-wrapper">
      <h2 class="text-h4 text-center q-mb-lg tagesschrift-regular">Todos os Usuários</h2>

      <div class="users-grid">
        <div v-for="user in users" :key="user.uid" class="user-card-container">
          <q-avatar :size="'100px'" :color="'grey-2'" :text-color="'primary'" class="user-avatar">
            <img
              v-if="user.photoURL"
              :src="user.photoURL"
              :alt="user.nome ?? user.email ?? 'Usuário'"
            />
            <span v-else>
              {{ user.nome ? user.nome[0] : user.email ? user.email[0] : '?' }}
            </span>
          </q-avatar>
          <div class="user-info">
            <div class="user-name text-center q-mt-xs">{{ user.nome || 'Sem nome' }}</div>
            <div class="user-email text-center">
              <q-icon name="email" size="16px" class="q-mr-xs" />
              {{ user.email || 'Sem e-mail' }}
            </div>
            <div class="user-uid text-caption text-grey-8 q-mt-xs">UID: {{ user.uid }}</div>
            <div v-if="user.permission" class="user-permission text-caption q-mt-xs">
              Permissão: <b>{{ user.permission }}</b>
            </div>
            <!-- Exibir informações de ranking caso existam -->
            <template v-if="user.score !== undefined">
              <div class="user-score text-caption text-start q-mt-xs">
                Pontuação: <b>{{ user.score }}</b>
              </div>
              <div class="user-attempts text-caption q-mt-xs">
                Tentativas: <b>{{ user.attemptCounter }}</b>
              </div>
              <div class="user-games text-caption q-mt-xs">
                Tempo de jogo:
                <p class="text-bold">
                  {{
                    user.gameTotal !== undefined
                      ? (Math.floor(user.gameTotal / 3600) > 0
                          ? Math.floor(user.gameTotal / 3600) + 'h '
                          : '') +
                        (Math.floor((user.gameTotal % 3600) / 60) > 0
                          ? Math.floor((user.gameTotal % 3600) / 60) + 'm '
                          : '') +
                        (user.gameTotal % 60) +
                        's'
                      : '0s'
                  }}
                </p>
              </div>
            </template>
          </div>
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
import { useUserStore } from 'src/stores/user-store';
import type { User } from 'src/stores/user-store';
import type { Ranking } from 'src/stores/user-store';

type UserWithRank = User & Partial<Ranking>;

const users = ref<UserWithRank[]>([]);
const showToTop = ref(false);

const userStore = useUserStore();

async function fetchUsersAndRanks() {
  const [usersList, ranks] = await Promise.all([
    userStore.getAllUsers(),
    userStore.getAllRankings(),
  ]);

  // Cria um dicionario com os ranks pelo uid
  const ranksByUid: Record<string, Ranking> = {};
  for (const rank of ranks) {
    ranksByUid[rank.uid] = rank;
  }

  // Mescla cada usuario com o rank correspondente (se existir)
  users.value = usersList.map((u) => {
    const rank: any = ranksByUid[u.uid] || {};
    // Concatena os dados do ranking ao usuário
    return {
      ...u,
      score: rank.score,
      attemptCounter: rank.attemptCounter,
      gameTotal: rank.gameTotal,
    };
  });
}

// Controle do botão "voltar ao topo"
function handleScroll() {
  showToTop.value = window.scrollY > 200;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(async () => {
  await fetchUsersAndRanks();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.all-users-wrapper {
  width: 100%;
  max-width: 1000px;
  position: relative;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 32px 24px;
}

.user-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7fafc;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(20, 60, 100, 0.09);
  padding: 30px 18px 18px 18px;
  min-height: 240px;
  position: relative;
  transition: box-shadow 0.2s;
}

.user-card-container:hover {
  box-shadow: 0 6px 32px rgba(20, 60, 100, 0.14);
}

.user-avatar {
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(85, 85, 85, 0.06);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.user-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #16639b;
}

.user-email {
  font-size: 0.98rem;
  word-break: break-all;
  color: #425466;
  margin-top: 2px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.user-uid {
  font-size: 0.88rem;
  word-break: break-all;
}

.user-permission {
  font-size: 0.9rem;
  color: #357c20;
  margin-top: 6px;
}

.user-score,
.user-attempts,
.user-games {
  font-size: 0.92rem;
  margin-top: 4px;
  color: #1475a6;
}

.go-to-top-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1200;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  transition: opacity 0.2s;
}

@media (max-width: 600px) {
  .users-grid {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 18px;
  }
  .go-to-top-btn {
    bottom: 16px;
    right: 16px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';

const useUser = useUserStore();

const loading = ref(false);

const loginWithGoogle = async () => {
  loading.value = true;
  try {
    await useUser.loginWithGoogle();
  } catch (error) {
    console.error('Erro no login com Google:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-btn
    class="bg-white google-login-btn"
    icon="img:icons/google.svg"
    @click="loginWithGoogle"
    :disabled="loading"
  >
    <span>{{ loading ? 'Entrando...' : 'Entrar com Google' }}</span>
  </q-btn>
</template>

<style scoped>
.google-login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.google-login-btn:hover {
  background-color: #f1f1f1;
}

.google-login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>

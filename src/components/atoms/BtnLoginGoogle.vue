<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useAudio } from 'src/composables/useAudio';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const useUser = useUserStore();
const { audioMouseHover } = useAudio();

const loading = ref(false);

const loginWithGoogle = async () => {
  loading.value = true;
  try {
    await useUser.loginWithGoogle();
  } catch (error) {
    $q.notify({ message: 'Erro ao fazer login com Google', color: 'negative', icon: 'warning' });
    console.error('Erro no login com Google:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-btn
    class="google-login-btn text-black text-bold q-my-sm"
    icon="img:icons/google.svg"
    @click="loginWithGoogle"
    :disabled="loading"
    rounded
    @mouseenter="audioMouseHover()"
  >
    {{ loading ? 'Entrando...' : 'Entrar com Google' }}
  </q-btn>
</template>

<style scoped lang="scss">
.google-login-btn {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>

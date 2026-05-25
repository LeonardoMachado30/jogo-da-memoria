import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  detectPwaBrowser,
  getInstallHint,
  isDisplayStandalone,
  supportsBeforeInstallPrompt,
  type PwaBrowserFamily,
} from 'src/utils/pwa-browser';

export const PWA_INSTALL_DISMISSED_KEY = 'memorix_pwa_install_dismissed';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePwaInstall() {
  const showInstallPrompt = ref(false);
  const browserFamily = ref<PwaBrowserFamily>('other');
  const canNativeInstall = ref(false);
  const installHint = computed(() => getInstallHint(browserFamily.value));
  const showManualInstallHint = computed(
    () => !canNativeInstall.value && !isDisplayStandalone() && browserFamily.value !== 'other',
  );

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  function shouldShowPrompt(): boolean {
    if (isDisplayStandalone()) return false;
    if (localStorage.getItem(PWA_INSTALL_DISMISSED_KEY) === 'true') return false;
    return canNativeInstall.value || showManualInstallHint.value;
  }

  function evaluateVisibility() {
    showInstallPrompt.value = shouldShowPrompt();
  }

  const onBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    canNativeInstall.value = true;
    evaluateVisibility();
  };

  const onAppInstalled = () => {
    deferredPrompt = null;
    canNativeInstall.value = false;
    showInstallPrompt.value = false;
    localStorage.setItem(PWA_INSTALL_DISMISSED_KEY, 'true');
  };

  onMounted(() => {
    browserFamily.value = detectPwaBrowser();

    if (supportsBeforeInstallPrompt(browserFamily.value)) {
      window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    } else if (!isDisplayStandalone()) {
      evaluateVisibility();
    }

    window.addEventListener('appinstalled', onAppInstalled);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.removeEventListener('appinstalled', onAppInstalled);
  });

  async function installApp(): Promise<void> {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      canNativeInstall.value = false;
      showInstallPrompt.value = false;
    }
  }

  function dismissPrompt(): void {
    localStorage.setItem(PWA_INSTALL_DISMISSED_KEY, 'true');
    showInstallPrompt.value = false;
  }

  return {
    showInstallPrompt,
    browserFamily,
    canNativeInstall,
    installHint,
    showManualInstallHint,
    installApp,
    dismissPrompt,
  };
}

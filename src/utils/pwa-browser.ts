export type PwaBrowserFamily =
  | 'chromium'
  | 'firefox'
  | 'safari-ios'
  | 'safari-macos'
  | 'samsung'
  | 'other';

export function detectPwaBrowser(): PwaBrowserFamily {
  const ua = navigator.userAgent;

  if (/SamsungBrowser/i.test(ua)) {
    return 'samsung';
  }

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    return 'safari-ios';
  }

  const isMacSafari =
    /Macintosh/.test(ua) &&
    /Safari/.test(ua) &&
    !/Chrome|Chromium|Edg|OPR|Firefox|FxiOS/.test(ua);

  if (isMacSafari) {
    return 'safari-macos';
  }

  if (/Firefox|FxiOS/i.test(ua)) {
    return 'firefox';
  }

  if (/Chrome|Chromium|Edg|OPR|Brave|CriOS/i.test(ua)) {
    return 'chromium';
  }

  return 'other';
}

/** Chrome, Edge, Opera, Brave, Samsung Internet (Chromium) */
export function supportsBeforeInstallPrompt(family: PwaBrowserFamily): boolean {
  return family === 'chromium' || family === 'samsung';
}

export function isDisplayStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function getInstallHint(family: PwaBrowserFamily): string {
  switch (family) {
    case 'chromium':
      return 'Toque em Instalar ou use o menu do navegador (ícone de instalação na barra de endereços) para adicionar o Memorix.';
    case 'firefox':
      return 'No Firefox: abra o menu ☰ e escolha "Instalar…" ou "Instalar este site como aplicativo" (se disponível).';
    case 'samsung':
      return 'No Samsung Internet: menu ⋮ → "Adicionar página a" → "Tela inicial" ou use o botão Instalar quando aparecer.';
    case 'safari-ios':
      return 'No iPhone ou iPad: toque em Compartilhar e depois em Adicionar à Tela de Início.';
    case 'safari-macos':
      return 'No Safari (Mac): menu Compartilhar → "Adicionar ao Dock" ou Arquivo → "Adicionar ao Dock".';
    default:
      return 'Use a opção de instalar aplicativo ou adicionar à tela inicial do seu navegador, se disponível.';
  }
}

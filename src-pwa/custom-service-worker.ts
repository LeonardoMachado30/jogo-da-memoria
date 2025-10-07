/*
 * Service Worker customizado do Quasar
 * Ativo apenas se `pwa > workboxMode` estiver como "InjectManifest"
 */

/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope &
  typeof globalThis & {
    skipWaiting: () => void;
    __WB_MANIFEST: any;
    clients: Clients;
  };

import { clientsClaim } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

/* 🚀 Força o service worker a ser ativado imediatamente após instalação */
self.addEventListener('install', () => {
  console.log('[SW] Instalando nova versão...');
  self.skipWaiting();
});

/* 🚀 Garante que o novo SW assume controle das abas imediatamente */
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[SW] Ativo! Limpando caches antigos...');
  event.waitUntil(self.clients.claim());
});

/* 🔄 Escuta mensagens vindas do app (frontend) para atualização manual */
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && (event.data as any).type === 'SKIP_WAITING') {
    console.log('[SW] Forçando atualização via mensagem...');
    self.skipWaiting();
  }
});

clientsClaim();

/* 💾 Pré-cache automático dos assets gerados pelo Quasar */
void precacheAndRoute(self.__WB_MANIFEST);

/* 🧹 Remove caches antigos */
void cleanupOutdatedCaches();

/* 🌐 Fallback para index.html (modo SPA) */
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  const route = new NavigationRoute(createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML), {
    denylist: [new RegExp(process.env.PWA_SERVICE_WORKER_REGEX), /workbox-(.)*\.js$/],
  });

  registerRoute(route);
}

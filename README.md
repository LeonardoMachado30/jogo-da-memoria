# 🧠 Jogo da Memória - Vue 3 + Quasar + Firebase

Bem-vindo ao **Jogo da Memória**, uma aplicação web desenvolvida com Vue 3 e Quasar Framework, estruturada com o padrão
**Atomic Design** e integração com o **Firebase Realtime Database** para persistência de dados e ranking dos jogadores.

---

## 🚀 Tecnologias Utilizadas

- **[Vue 3](https://vuejs.org/)** — Framework progressivo para interfaces modernas.
- **[Quasar Framework](https://quasar.dev/)** — Interface responsiva com componentes poderosos.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática opcional.
- **[Firebase Realtime Database](https://firebase.google.com/products/realtime-database)** — Backend em tempo real para
  ranking e dados de usuários.
- **[Firebase Authentication](https://firebase.google.com/products/realtime-database)** — Autenticação pelo google.
- **[Cypress](https://www.cypress.io/)** — Testes de componentes e integração.
- **[Vite](https://vitejs.dev/)** — Empacotador moderno e rápido.
- **Atomic Design** — Arquitetura baseada em componentes reutilizáveis.

---

## 📁 Estrutura do Projeto

```bash
src/
├── assets/
├── components/
│ ├── atoms/
│ ├── molecules/
│ └── organisms/
├── composable/
├── pages/
├── services/ # Integração com Firebase
├── stores/ # Pinia
├── App.vue
├── main.ts
cypress/
│ └── component/
│ └── molecules/
│ └── CardIndex.cy.ts
```

> 🔬 **Atomic Design**: Os componentes são organizados como átomos, moléculas e organismos, facilitando a reutilização e
> escalabilidade do código.

---

## 🔥 Firebase

A aplicação utiliza **Firebase Realtime Database** com duas coleções principais:

- `users`: Armazena informações básicas do jogador.
- `ranking`: Associado ao UUID do jogador e salva a pontuação.

Integração com Firebase via SDK e uso do `localStorage` para persistência do UUID do jogador logado.

Exemplo de estrutura:

```json
{
  "ranking": {
    "user-uuid": {
      "points": 80,
      "timestamp": 1715000000
    }
  },
  "users": {
    "user-uuid": {
      "name": "Flávio",
      "avatar": "url..."
    }
  }
}
```

## 📌 INSTALAÇÃO E CONFIGURAÇÕES DO PROJETO

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```
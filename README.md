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
├── boot/
├── components/
│ ├── __tests__/
│ ├── atoms/
│ ├── molecules/
│ └── organisms/
├── composable/
├── css/
├── layouts/
├── pages/
├── router/
├── stores/ # Pinia
├── App.vue
test/
│ └── cypress/
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

PREFERIVEL USAR O QUASAR CLI GLOBAL

```bash
npm i -g @quasar/cli
# or
yarn global add @quasar/cli
```

### Iniciar projeto no modo dev (hot-code reloading, error reporting, etc.)

Sem quasar CLI Global
```bash
npm run dev
```

Com Quasar Cli Global
```bash
quasar dev
```

### Contruir o app para proudção

Sem quasar CLI Global
```bash
npm run build
```

Com Quasar Cli Global
```bash
quasar build
```

### Testing

```bash
npm run test:component
```

### Principais decisões técnicas

Por que Quasar Framework?

O projeto foi realizado com o Quasar Framework devido ao meus conhecimento previo avançado sobre a tecnologia e suas facilidades de integração com outras tecnologias.
Foi utilizado o firebase para a API pois e gratuito e já vem com integrações funcionais rapidas e praticas, também oferece suporte a dados em tempo real sem a necessidade de configurar WebSocket.

Imagens da API

As imagens que deveriam estar na API estão diretamente no projeto, pois, o meu bucket do firebase estava solicitando pagando por eu já ter usado uma grande parte do bucket, também não foi possivel achar um bucket gratuito com qualidade é velocidade, 
então foi preferivel da minha parte manter as imagens nos arquivos locais, também foi o único requisito do case que não consegui seguir a risca por motivos financeiro.

Jogar sem logar

Eu decidi colocar um modo de jogo sem o login do google, pois, acredito que a acessibilidade ao conteúdo seja bastante importante e torna o sistema mais convidativo.

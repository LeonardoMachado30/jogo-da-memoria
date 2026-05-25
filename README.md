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

### Desenvolvimento com Docker (hot reload)

Requisitos: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Compose).

1. Crie o arquivo `.env` a partir do exemplo (variáveis do Firebase — ver link na seção `.env` abaixo):

```bash
cp .env.example .env
```

2. Suba o ambiente de desenvolvimento:

```bash
npm run docker:dev
```

3. Acesse [http://localhost:8080](http://localhost:8080). Alterações em `src/`, `public/` e arquivos de configuração recarregam automaticamente (HMR).

Para encerrar:

```bash
npm run docker:dev:down
```

O `node_modules` fica em um volume nomeado do Docker (binários Linux), evitando conflito com dependências instaladas no Windows.

### Dev Container (editar dentro do Docker no Cursor/VS Code)

Requisitos: Docker Desktop + extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

1. Crie o `.env` (mesmo passo da seção Docker acima).
2. **Command Palette** (`Ctrl+Shift+P`) → **Dev Containers: Reopen in Container**.
3. O editor abre em `/app` (Linux), com `node_modules` do volume, ESLint/TypeScript/Volar usando o ambiente do container.
4. Na primeira conexão, o `postAttachCommand` sobe o `quasar dev`; acesse [http://localhost:8080](http://localhost:8080).

Se o container já estiver rodando via `npm run docker:dev`, use **Dev Containers: Attach to Running Container…** e escolha `jogo-da-memoria-dev-1`.

Para voltar ao ambiente local: **Dev Containers: Reopen Folder Locally**.

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

O jogo funciona **offline ou online** sem login Google. O progresso (níveis desbloqueados, pontuação, tentativas e tempo acumulado) é salvo no **localStorage** deste dispositivo.

### Chaves no localStorage

| Chave | Conteúdo |
|-------|----------|
| `memorix_guest_progress` | Progresso do convidado: `score`, `gameTotal`, `attemptCounter`, `currentLevel` |
| `memorix_levels_cache` | Cache da configuração de níveis vinda do Firebase (fallback offline) |
| `user` | Sessão do jogador logado (perfil Google) |
| `isPauseMusic` | Preferência de música |

### Sincronização no login

Ao entrar com Google, os dados de `memorix_guest_progress` são enviados ao Firebase (`ranking/{uid}`) e a chave local é removida:

- **Nível desbloqueado:** maior valor entre local e nuvem
- **Pontuação e tentativas:** soma dos dois
- **Tempo total (`gameTotal`):** soma dos tempos em formato `MM:SS`

Se o login falhar (rede, popup bloqueado), o progresso local é **mantido**.

### Níveis offline

Ordem de carregamento dos níveis: Firebase → cache local → `src/model/levels.ts` (embutido no app).

.env

O projeto foi projetado com o .env protegendo os dados de conexão do firebase, caso precise acesse esse link:
https://drive.google.com/file/d/1EFK5mJW9K0Z0hJNHyCVmayugsi9ub7V1/view?usp=sharing

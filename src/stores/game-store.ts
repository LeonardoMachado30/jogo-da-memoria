// game-store.ts
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'src/stores/user-store';
import timer, { formattedTime, resetTimer, resetTimerStart } from 'src/composables/useTimer';
import { randomImagesEmojis, randomImagesFruits } from 'src/model/images';
import { ref as dbRef, get, set, update } from 'firebase/database';
import { db } from 'src/boot/firebase';
import { balancedLevels } from 'src/model/levels';
import { clearPairStarBurstEffects, pairCorrectStarBurst } from 'src/animations/pairStarBurst';

interface Images {
  src: string;
  alt: string;
  category: string;
  id: number;
}

export interface Level {
  level: number;
  gridSize: number;
  pairs: number;
  color: string;
  textColor: string;
  deck: string;
  allowEqualCards?: number;
}

const MISMATCH_HIDE_DELAY_MS = 1000;

/** Rota única da partida em andamento. */
export const GAME_ROUTE_PATH = '/partida';

export function isGameRoute(path: string): boolean {
  return path === GAME_ROUTE_PATH || path.startsWith(`${GAME_ROUTE_PATH}/`);
}

interface Game {
  currentLevel: number;
  currentScore: number;
  startTime: number;
  endTime: number;
  acumulativeAccepts: number;
  isAdvancing: boolean;
}

interface State {
  currentScore: number;
  pulseTimerList: string[];
  attemptCounter: number;
  initialFlip: boolean;
  usedCardsIndices: Set<number>;
  availableCards: Images[];
  levelsConfig: Level[] | [];
  game: Game;
  flippedStatus: boolean[];
  lockBoard: boolean;
  flippedCards: FlippedCard[];
  cards: Images[];
  isGameInitialized: boolean;
  gameRoundId: number;
  showModalEnd: boolean;
  modalFailedGame: boolean;
  isProcessingEnd: boolean;
  restartSignal: number;
  isRestarting: boolean;
}

export interface FlippedCard {
  index: number;
  alt: string;
  id: number;
}

export const useGameStore = defineStore('game', {
  state: (): State => ({
    currentScore: 0,
    pulseTimerList: ['01:30', '01:00', '00:30'],
    attemptCounter: 0,
    initialFlip: false,
    lockBoard: false,
    flippedStatus: [],
    flippedCards: [],
    usedCardsIndices: new Set<number>(),
    availableCards: [...randomImagesEmojis],
    isGameInitialized: false,
    gameRoundId: 0,
    showModalEnd: false,
    modalFailedGame: false,
    isProcessingEnd: false,
    restartSignal: 0,
    isRestarting: false,
    levelsConfig: [],
    game: {
      currentLevel: 1,
      currentScore: 0,
      startTime: 0,
      endTime: 0,
      acumulativeAccepts: 0,
      isAdvancing: false,
    },
    cards: [],
  }),

  getters: {
    currentConfig(state): Level {
      const found = state.levelsConfig.find((cfg: any) => cfg.level === state.game.currentLevel);
      return found ?? (state.levelsConfig[0] as Level);
    },

    gridSize(state): number {
      return state.levelsConfig.find((cfg) => cfg.level === state.game.currentLevel)?.gridSize || 4;
    },
    getPairs(state): number {
      return state.levelsConfig.find((cfg) => cfg.pairs === state.game.currentLevel)?.pairs || 4;
    },
    getLevel(state): number {
      return state.levelsConfig.find((cfg) => cfg.level === state.game.currentLevel)?.level || 4;
    },
    totalCards(state): number {
      const pairs =
        state.levelsConfig.find((cfg) => cfg.level === state.game.currentLevel)?.pairs || 8;
      return pairs * 2;
    },

    gameDuration(state): number | null {
      if (state.game.startTime !== null && state.game.endTime !== null) {
        return state.game.endTime - state.game.startTime;
      }
      return null;
    },

    isLevelComplete(state): boolean {
      const total = state.cards.length;
      if (total === 0) return false;
      return (
        state.flippedStatus.length === total &&
        state.flippedStatus.every((status) => status === true)
      );
    },

    /** Carta virada para cima: memorização, par encontrado ou seleção temporária. */
    isCardFaceUp: (state) => (index: number): boolean => {
      if (state.initialFlip) return true;
      if (state.flippedStatus[index]) return true;
      return state.flippedCards.some((card) => card.index === index);
    },

    /** Permite clicar para revelar (regras de tabuleiro travado / fim de jogo). */
    canFlipCard: (state) => (index: number): boolean => {
      if (state.lockBoard || state.initialFlip) return false;
      if (state.showModalEnd || state.modalFailedGame) return false;
      if (state.flippedStatus[index]) return false;
      if (state.flippedCards.some((card) => card.index === index)) return false;
      if (state.flippedCards.length >= 2) return false;
      return index >= 0 && index < state.cards.length;
    },

    isPairMatch: () => (first: FlippedCard, second: FlippedCard): boolean => {
      return first.id === second.id;
    },
  },

  actions: {
    /**
     * Embaralha um array (Fisher–Yates)
     */
    shuffleArray<T>(array: T[]): T[] {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i] as any, arr[j] as any] = [arr[j], arr[i]];
      }
      return arr;
    },

    /**
     * Gera e embaralha pares de cartas para o nível atual
     */
    async generateLevelCards(): Promise<Images[]> {
      await this.getLevels();

      // Usa sempre randomImagesEmojis para montar os pares
      const deckChoose = this.currentConfig;
      const selectDeck = deckChoose.deck === 'easy' ? randomImagesFruits : randomImagesEmojis;
      const pairs = deckChoose.pairs;

      // Pega um subconjunto aleatório para os pares
      const baseCards = this.shuffleArray(selectDeck).slice(0, pairs);

      // Duplicar cada carta para formar os pares
      const cards: Images[] = [];
      for (const card of baseCards) {
        cards.push({ ...card }, { ...card });
      }

      // Embaralha o baralho final de cartas
      const gameCards = this.shuffleArray(cards);
      this.cards = gameCards;
      this.flippedStatus = Array(gameCards.length).fill(false);
      this.flippedCards = [];

      return gameCards;
    },

    /**
     * Reseta o estado interno da rodada (cartas, pontuação, timers).
     * Preferir `restartRound()` para reiniciar a partida a partir da UI.
     */
    async resetGame() {
      resetTimerStart();
      resetTimer();
      timer().unmountedStart();

      this.currentScore = 0;
      this.attemptCounter = 0;
      this.flippedCards = [];
      this.initialFlip = false;
      this.lockBoard = true;
      this.isGameInitialized = false;
      this.game.acumulativeAccepts = 0;
      this.game.startTime = 0;
      this.game.endTime = 0;

      await this.generateLevelCards();
      this.gameRoundId += 1;
    },

    closeModals() {
      this.showModalEnd = false;
      this.modalFailedGame = false;
    },

    /**
     * Encerra o contexto da partida (ao sair de /partida). Idempotente: pode ser chamado várias vezes.
     * Não gera novo baralho — use `resetGame()` / `restartRound()` ao iniciar uma rodada.
     */
    resetSession(): void {
      resetTimerStart();
      resetTimer();
      timer().unmountedStart();
      clearPairStarBurstEffects();

      this.closeModals();
      this.isProcessingEnd = false;
      this.isRestarting = false;
      this.restartSignal = 0;

      this.currentScore = 0;
      this.attemptCounter = 0;
      this.flippedCards = [];
      this.flippedStatus = [];
      this.cards = [];
      this.initialFlip = false;
      this.lockBoard = false;
      this.isGameInitialized = false;
      this.usedCardsIndices = new Set<number>();

      this.game.acumulativeAccepts = 0;
      this.game.startTime = 0;
      this.game.endTime = 0;
      this.game.isAdvancing = false;
    },

    /**
     * Reinicia a partida no nível atual: fecha modais, zera estado e sinaliza nova rodada.
     */
    async restartRound() {
      if (this.isRestarting) return;

      this.isRestarting = true;
      try {
        this.closeModals();
        this.isProcessingEnd = false;
        await this.resetGame();
        this.restartSignal += 1;
      } finally {
        this.isRestarting = false;
      }
    },

    async handleLevelComplete() {
      if (this.isProcessingEnd || !this.isLevelComplete) return;

      this.isProcessingEnd = true;
      this.showModalEnd = true;
      await this.endGame();

      setTimeout(() => {
        this.isProcessingEnd = false;
      }, 500);
    },

    handleTimeOver() {
      if (this.showModalEnd) return;

      this.lockBoard = true;
      this.flippedCards = [];
      this.modalFailedGame = true;
    },

    onCardClick(index: number): void {
      const card = this.cards[index];
      if (!card || !this.canFlipCard(index)) return;

      this.onFlip({ index, alt: card.alt, id: card.id });
    },

    markPairMatched(first: FlippedCard, second: FlippedCard): void {
      this.game.acumulativeAccepts = 0;
      this.flippedStatus[first.index] = true;
      this.flippedStatus[second.index] = true;
      this.flippedCards = [];
      this.lockBoard = false;
      this.incrementScore(formattedTime.value);
      useAudio().audioPair();
      pairCorrectStarBurst(first.index, second.index);
      timer().mounted();

      if (this.isLevelComplete) {
        void this.handleLevelComplete();
      }
    },

    markPairMismatched(): void {
      this.game.acumulativeAccepts = this.game.acumulativeAccepts + 1;

      setTimeout(() => {
        this.flippedCards = [];
        this.lockBoard = false;
      }, MISMATCH_HIDE_DELAY_MS);
    },

    /**
     * Inicializa o jogo para o nível atual
     */
    setLevel(level: number) {
      this.game.currentLevel = level;
    },

    /**
     * Inicia a fase de memorização (flip inicial)
     */
    startMemorizationPhase() {
      const { audioCard } = useAudio();

      this.game.startTime = Date.now();
      audioCard();
      this.initialFlip = true;
      timer().mountedStart();

      // Após 5 segundos, volta as cartas e inicia o jogo
      setTimeout(() => {
        this.endMemorizationPhase();
      }, 5000);
    },

    /**
     * Termina a fase de memorização e inicia o jogo
     */
    endMemorizationPhase() {
      const { audioCard } = useAudio();

      audioCard();
      this.initialFlip = false;
      timer().unmountedStart();
      timer().mounted();
      this.lockBoard = false;
    },

    /**
     * Próximo nível
     */
    async nextLevel() {
      if (this.game.isAdvancing) return;

      const nextLevelNum = this.game.currentLevel + 1;
      if (nextLevelNum > this.levelsConfig.length) {
        console.log('🎉 Todos os níveis concluídos!');
        return;
      }

      try {
        this.game.isAdvancing = true;
        await this.updateUserCurrentLevelIfAdvance(nextLevelNum);
        this.game.currentLevel = nextLevelNum;
      } catch (error) {
        console.error('Erro ao avançar de nível:', error);
      } finally {
        this.game.isAdvancing = false;
      }
    },

    async endGame() {
      const useUser = useUserStore();
      if (useUser.getUser) {
        this.game.endTime = Date.now();
        const totalTime = this.gameTimeConvertForMinutes(this.game.startTime, this.game.endTime);

        if (useUser.getUser?.uid) {
          await useUser.updateRanking(useUser.getUser.uid, {
            score: this.currentScore,
            gameTotal: totalTime,
            attemptCounter: this.attemptCounter,
            ...useUser.getUser,
          });
        }
      }
    },

    incrementScore(formattedTime: string) {
      const points = this.calculateScore(formattedTime);
      this.currentScore += points;
    },

    calculateScore(formattedTime: string): number {
      if (this.game.acumulativeAccepts) {
        return 10;
      }

      if (formattedTime >= '00:50') return 5;
      if (formattedTime >= '00:40') return 4;
      if (formattedTime >= '00:30') return 3;
      if (formattedTime >= '00:20') return 2;
      if (formattedTime >= '00:05') return 1;

      return 0;
    },

    onFlip({ index, alt, id }: FlippedCard): void {
      if (!this.canFlipCard(index)) return;

      this.flippedCards.push({ index, alt, id });

      if (this.flippedCards.length < 2) return;

      this.attemptCounter += 1;
      this.lockBoard = true;

      const [first, second] = this.flippedCards;
      if (!first || !second) return;

      if (this.isPairMatch(first, second)) {
        this.markPairMatched(first, second);
      } else {
        this.markPairMismatched();
      }
    },

    gameTimeConvertForMinutes(startTime: number, endTime: number): string {
      const diferencaMs = endTime - startTime;
      const totalSeconds = Math.floor(diferencaMs / 1000);
      const minutos = Math.floor(totalSeconds / 60);
      const segundos = totalSeconds % 60;
      return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    },

    async postAllLevel() {
      const levelsObject = balancedLevels.reduce(
        (acc, level) => {
          acc[level.level] = level;
          return acc;
        },
        {} as Record<number, (typeof this.levelsConfig)[0]>,
      );

      // Agora pode salvar no Firebase
      await set(dbRef(db, 'levels'), levelsObject);
      console.log('level criado com sucesso');
    },

    async getLevels(): Promise<Level[]> {
      try {
        const snapshot = await get(dbRef(db, 'levels'));

        if (snapshot.exists()) {
          const levelsData = snapshot.val() as Record<string, Level>;
          const levelArr = Object.values(levelsData).sort((a, b) => a.level - b.level);
          this.levelsConfig = levelArr;
          return levelArr;
        } else {
          console.warn('Nenhum level encontrado no Firebase');
          return [];
        }
      } catch (error) {
        console.error('Erro ao obter levels:', error);
        return [];
      }
    },
    async updateLevels(levels: Level[]) {
      try {
        // Converte array para objeto com level como chave
        const levelsObject = levels.reduce(
          (acc, level) => {
            acc[level.level] = level;
            return acc;
          },
          {} as Record<number, Level>,
        );

        await set(dbRef(db, 'levels'), levelsObject);
        console.log('Levels atualizados com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar levels:', error);
        throw error;
      }
    },

    // Ou se quiser atualizar um level específico
    async updateSingleLevel(levelNumber: number, levelData: Level) {
      try {
        const singleLevelRef = dbRef(db, `levels/${levelNumber}`);
        await set(singleLevelRef, levelData);
        console.log(`Level ${levelNumber} atualizado com sucesso`);
      } catch (error) {
        console.error(`Erro ao atualizar level ${levelNumber}:`, error);
        throw error;
      }
    },

    // Ou se quiser fazer update parcial (sem sobrescrever tudo)
    async patchLevel(levelNumber: number, partialData: Partial<Level>) {
      try {
        const singleLevelRef = dbRef(db, `levels/${levelNumber}`);
        await update(singleLevelRef, partialData);
        console.log(`Level ${levelNumber} atualizado parcialmente`);
      } catch (error) {
        console.error(`Erro ao atualizar level ${levelNumber}:`, error);
        throw error;
      }
    },

    // async updateAllRankingsCurrentLevelTo10() {
    //   try {
    //     const rankingsRef = dbRef(db, 'ranking');
    //     // Busca todos os registros do ranking
    //     const snapshot = await get(rankingsRef);

    //     if (!snapshot.exists()) {
    //       console.log('Nenhum registro de ranking encontrado.');
    //       return;
    //     }

    //     const updates: Record<string, any> = {};
    //     const rankings = snapshot.val();

    //     // Para cada usuário, adiciona ou atualiza o campo currentLevel para 10
    //     Object.keys(rankings).forEach((uid) => {
    //       updates[`${uid}/currentLevel`] = 10;
    //     });

    //     // Aplica atualização em lote
    //     await update(rankingsRef, updates);
    //     console.log('Todos os rankings atualizados para currentLevel = 10');
    //   } catch (error) {
    //     console.error('Erro ao atualizar currentLevel no ranking:', error);
    //     throw error;
    //   }
    // },

    async getUserCurrentLevelUnlock(uid?: string): Promise<number> {
      try {
        const useUser = useUserStore();
        const getUid = uid ?? useUser.getUser.uid;

        const userRankingRef = dbRef(db, `ranking/${getUid}/currentLevel`);
        const snapshot = await get(userRankingRef);

        if (!snapshot.exists()) {
          return 0;
        }

        return snapshot.val();
      } catch (error) {
        console.error(`Erro ao buscar currentLevel do usuário ${uid}:`, error);
        throw error;
      }
    },

    async updateUserCurrentLevelIfAdvance(nextLevel: number, uid?: string): Promise<void> {
      try {
        const useUser = useUserStore();
        const getUid = uid ?? useUser.getUser.uid;
        if (nextLevel > this.game.currentLevel) {
          await update(dbRef(db, `ranking/${getUid}`), { currentLevel: nextLevel });
        }
      } catch (error) {
        console.error(`Erro ao atualizar currentLevel do usuário ${uid}:`, error);
        throw error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

// game-store.ts
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'src/stores/user-store';
import timer, { formattedTime, resetTimer, resetTimerStart } from 'src/composables/useTimer';
import { randomImagesEmojis, randomImagesFruits } from 'src/model/images';
import levelsConfig from 'src/utils/levelsConfig';

interface Images {
  src: string;
  alt: string;
}

interface LevelConfig {
  level: number;
  gridSize: number;
  pairs: number;
  color: string;
  textColor: string;
  deck: string;
}

interface CardRef {
  flipDown: () => void;
}

interface State {
  currentScore: number;
  pulseTimerList: string[];
  attemptCounter: number;
  initialFlip: boolean;
  usedCardsIndices: Set<number>;
  availableCards: Images[];
  levelsConfig: LevelConfig[];
  game: {
    currentLevel: number;
    currentScore: number;
    startTime: number;
    endTime: number;
  };
  flippedStatus: boolean[];
  lockBoard: boolean;
  flippedCards: FlippedCard[];
  cardRefs: (CardRef | null)[];
  cards: Images[];
  isGameInitialized: boolean;
}

export interface FlippedCard {
  index: number;
  alt: string;
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
    cardRefs: [],
    usedCardsIndices: new Set<number>(),
    availableCards: [...randomImagesEmojis],
    isGameInitialized: false,
    levelsConfig: levelsConfig,
    game: {
      currentLevel: 1,
      currentScore: 0,
      startTime: 0,
      endTime: 0,
    },
    cards: [],
  }),

  getters: {
    currentConfig(state): LevelConfig {
      const found = state.levelsConfig.find((cfg) => cfg.level === state.game.currentLevel);
      return found ?? (state.levelsConfig[0] as LevelConfig);
    },

    gridSize(state): number {
      return state.levelsConfig.find((cfg) => cfg.level === state.game.currentLevel)?.gridSize || 4;
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
      return state.flippedStatus.every((status) => status === true);
    },
  },

  actions: {
    /**
     * Embaralha um array usando o algoritmo Fisher-Yates
     */
    shuffleArray<T>(array: T[]): T[] {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [newArr[i] as any, newArr[j] as any] = [newArr[j], newArr[i]];
      }
      return newArr;
    },

    /**
     * Cria pares de cartas aleatórias
     */
    createRandomPairs(allCards: Images[], numberOfPairs: number): Images[] {
      const shuffledOriginalCards = this.shuffleArray(allCards);
      const selectedCards = shuffledOriginalCards.slice(0, numberOfPairs);
      const pairedCards = selectedCards.flatMap((card) => [card, card]);
      return this.shuffleArray(pairedCards);
    },

    /**
     * Gera o conjunto de cartas para o nível atual
     */
    generateLevelCards(): Images[] {
      const deckChoose = this.currentConfig;
      const selectDeck = deckChoose.deck === 'hard' ? randomImagesEmojis : randomImagesFruits;
      const gameCards = this.createRandomPairs(selectDeck, deckChoose.pairs);
      this.cards = gameCards;
      return gameCards;
    },

    /**
     * Reseta completamente o estado do nível
     */
    resetLevelState() {
      // Reset timers
      resetTimerStart();
      resetTimer();

      // Reset game state
      this.currentScore = 0;
      this.attemptCounter = 0;
      this.flippedCards = [];
      this.cardRefs = [];
      this.initialFlip = false;
      this.lockBoard = true;
      this.game.startTime = 0;
      this.game.endTime = 0;

      // Gera novas cartas
      this.generateLevelCards();

      // Reset flipped status baseado no novo total de cartas
      this.flippedStatus = Array(this.totalCards).fill(false);

      this.isGameInitialized = false;
    },

    /**
     * Inicializa o jogo para o nível atual
     */
    initializeLevel(level: number) {
      this.game.currentLevel = level;
      this.resetLevelState();
    },

    /**
     * Inicia o jogo com animações e timers
     */
    async startGameSequence() {
      const { playMusic } = useAudio();

      // Garante que o jogo está resetado
      if (!this.isGameInitialized) {
        this.lockBoard = true;
        this.initialFlip = false;
        playMusic();

        // Aguarda um frame para garantir que o DOM foi atualizado
        await new Promise((resolve) => setTimeout(resolve, 100));

        this.isGameInitialized = true;
      }
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
    nextLevel() {
      const nextLevel = this.game.currentLevel + 1;
      if (nextLevel <= this.levelsConfig.length) {
        this.initializeLevel(nextLevel);
      }
    },

    /**
     * Reinicia o nível atual
     */
    restartLevel() {
      this.initializeLevel(this.game.currentLevel);
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
      if (formattedTime >= '00:50') return 5;
      if (formattedTime >= '00:40') return 4;
      if (formattedTime >= '00:30') return 3;
      if (formattedTime >= '00:20') return 2;
      if (formattedTime >= '00:05') return 1;
      return 0;
    },

    onFlip({ index, alt }: FlippedCard): void {
      if (this.lockBoard) return;

      this.flippedCards.push({ index, alt });

      if (this.flippedCards.length === 2) {
        this.attemptCounter = this.attemptCounter + 1;
        this.lockBoard = true;

        const [first, second] = this.flippedCards;

        if (first && second) {
          if (first.alt === second.alt) {
            // Par encontrado
            this.flippedStatus[first.index] = true;
            this.flippedStatus[second.index] = true;
            this.flippedCards = [];
            this.lockBoard = false;
            this.incrementScore(formattedTime.value);
            resetTimer();
            useAudio().audioPair();
          } else {
            // Par errado
            setTimeout(() => {
              this.cardRefs[first.index]?.flipDown();
              this.cardRefs[second.index]?.flipDown();
              this.flippedCards = [];
              this.lockBoard = false;
            }, 1000);
          }
        }
      }
    },

    gameTimeConvertForMinutes(startTime: number, endTime: number): string {
      const diferencaMs = endTime - startTime;
      const totalSeconds = Math.floor(diferencaMs / 1000);
      const minutos = Math.floor(totalSeconds / 60);
      const segundos = totalSeconds % 60;
      return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

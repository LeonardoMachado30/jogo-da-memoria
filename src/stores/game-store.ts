import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAudio } from 'src/composable/useAudio';
import { useUserStore } from 'src/stores/user-store';
import timer, { formattedTime, resetTimer, resetTimerStart } from 'src/composable/useTimer';

interface Fruit {
  src: string;
  alt: string;
}

interface LevelConfig {
  level: number;
  gridSize: number;
  pairs: number;
}

interface CardRef {
  flipDown: () => void;
}

interface State {
  currentScore: number;
  pulseTimerList: string[];
  attemptCounter: number;
  currentLevel: number;
  initialFlip: boolean;
  baseFruits: Fruit[];
  levelsConfig: LevelConfig[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  flippedStatus: boolean[];
  lockBoard: boolean;
  flippedCards: FlippedCard[];
  cardRefs: (CardRef | null)[];
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
    currentLevel: 1,
    gameStartTime: null,
    gameEndTime: null,
    initialFlip: false,
    lockBoard: false,
    flippedStatus: [],
    flippedCards: [],
    cardRefs: [],
    baseFruits: [
      { src: 'fruits/abacaxi.png', alt: 'abacaxi' },
      { src: 'fruits/banana.png', alt: 'banana' },
      { src: 'fruits/beterraba.png', alt: 'beterraba' },
      { src: 'fruits/carambola.png', alt: 'carambola' },
      { src: 'fruits/cereja.png', alt: 'cereja' },
      { src: 'fruits/kiwi.png', alt: 'kiwi' },
      { src: 'fruits/laranja.png', alt: 'laranja' },
      { src: 'fruits/limao.png', alt: 'limao' },
      { src: 'fruits/manga.png', alt: 'manga' },
      { src: 'fruits/melancia.png', alt: 'melancia' },
      { src: 'fruits/mixirica.png', alt: 'mixirica' },
      { src: 'fruits/morango.png', alt: 'morango' },
      { src: 'fruits/pera.png', alt: 'pera' },
      { src: 'fruits/pessego.png', alt: 'pessego' },
      { src: 'fruits/pitaia.png', alt: 'pitaia' },
      { src: 'fruits/tamarindo.png', alt: 'tamarindo' },
      { src: 'fruits/uva.png', alt: 'uva' },
      { src: 'fruits/uva_roxa.png', alt: 'uva roxa' },
      { src: 'fruits/uva_verde.png', alt: 'uva verde' },
      { src: 'fruits/jabuticaba.png', alt: 'jabuticaba' },
      { src: 'fruits/maca_verde.png', alt: 'maca_verde' },
      { src: 'fruits/melancia_cortada.png', alt: 'melancia cortada' },
      { src: 'fruits/goiaba.png', alt: 'goiaba cortada' },
      { src: 'fruits/lichia.png', alt: 'lichia' },
    ],
    levelsConfig: [
      { level: 1, gridSize: 4, pairs: 8 },
      { level: 2, gridSize: 6, pairs: 18 },
      { level: 3, gridSize: 8, pairs: 24 },
    ],
  }),

  getters: {
    currentConfig(state): LevelConfig {
      const found = state.levelsConfig.find((cfg) => cfg.level === state.currentLevel);
      return found ?? (state.levelsConfig[0] as LevelConfig);
    },
    gridSize(state): number {
      return state.levelsConfig.find((cfg) => cfg.level === state.currentLevel)?.gridSize || 4;
    },
    totalCards(state): number {
      const pairs = state.levelsConfig.find((cfg) => cfg.level === state.currentLevel)?.pairs || 8;
      return pairs * 2;
    },
    levelCardSet(state): Fruit[] {
      const pairs = state.levelsConfig.find((cfg) => cfg.level === state.currentLevel)?.pairs || 8;
      const selected = state.baseFruits.slice(0, pairs);
      return [...selected, ...selected];
    },
    gameDuration(state): number | null {
      if (state.gameStartTime !== null && state.gameEndTime !== null) {
        return state.gameEndTime - state.gameStartTime;
      }
      return null;
    },
  },

  actions: {
    startGameEffects() {
      const { audioCard, playMusic } = useAudio();
      playMusic();

      this.resetLevel();

      this.initialFlip = false;
      this.lockBoard = true;
      setTimeout(() => {
        this.gameStartTime = Date.now();
        audioCard();
        this.initialFlip = true;
        timer().mountedStart();

        setTimeout(() => {
          audioCard();
          this.initialFlip = false;
          timer().mounted();
          this.lockBoard = false;
        }, 5000);
      }, 600);
    },

    async endGame() {
      const useUser = useUserStore();
      this.gameEndTime = Date.now();

      if (useUser.getUser?.uid) {
        await useUser.updateRanking(useUser.getUser.uid, {
          score: this.currentScore,
          gameTotal: this.gameDuration,
          attemptCounter: this.attemptCounter,
          ...useUser.getUser,
        });
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

    resetLevel() {
      this.currentScore = 0;
      this.attemptCounter = 0;
      this.currentScore = 0;
      resetTimer();
      resetTimerStart();
      this.setFlippedStatus();
    },

    setFlippedStatus() {
      this.flippedStatus = Array(this.totalCards).fill(false);
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
            this.flippedStatus[first.index] = true;
            this.flippedStatus[second.index] = true;
            this.flippedCards = [];
            this.lockBoard = false;
            this.incrementScore(formattedTime.value);
            resetTimer();
            useAudio().audioPair();
          } else {
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

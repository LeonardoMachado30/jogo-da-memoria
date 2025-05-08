import { defineStore, acceptHMRUpdate } from 'pinia';
import timer from 'src/composable/stopwatch';
import { useBackgroundMusic } from 'src/composable/useBackgroundMusic';
import { useUserStore } from 'stores/user-store';

interface Fruit {
  src: string;
  alt: string;
}

interface LevelConfig {
  level: number;
  gridSize: number;
  pairs: number;
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
  lockBoard: boolean;
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
    baseFruits: [
      { src: '/fruits/melancia.png', alt: 'melancia' },
      { src: '/fruits/morango.png', alt: 'morango' },
      { src: '/fruits/maca.png', alt: 'maça' },
      { src: '/fruits/laranja.png', alt: 'laranja' },
      { src: '/fruits/banana.png', alt: 'banana' },
      { src: '/fruits/uva.png', alt: 'uva' },
      { src: '/fruits/cereja.png', alt: 'cereja' },
      { src: '/fruits/abacaxi.png', alt: 'abacaxi' },
      { src: '/fruits/kiwi.png', alt: 'kiwi' },
      { src: '/fruits/limao.png', alt: 'limão' },
      { src: '/fruits/goiaba.png', alt: 'goiaba' },
      { src: '/fruits/manga.png', alt: 'manga' },
      { src: '/fruits/pera.png', alt: 'pera' },
      { src: '/fruits/figo.png', alt: 'figo' },
      { src: '/fruits/ameixa.png', alt: 'ameixa' },
      { src: '/fruits/tamarindo.png', alt: 'tamarindo' },
      { src: '/fruits/framboesa.png', alt: 'framboesa' },
      { src: '/fruits/maracuja.png', alt: 'maracujá' },
    ],
    levelsConfig: [
      { level: 1, gridSize: 4, pairs: 8 },
      { level: 2, gridSize: 6, pairs: 18 },
      { level: 3, gridSize: 8, pairs: 24 },
      { level: 4, gridSize: 8, pairs: 32 },
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
  },

  actions: {
    startGameEffects() {
      const { audioCard } = useBackgroundMusic();
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
      }, 2000);
    },
    incremetAttemptCounter() {
      this.attemptCounter += 1;
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
    resetScore() {
      this.currentScore = 0;
    },
    nextLevel() {
      const maxLevel = this.levelsConfig.length;
      if (this.currentLevel < maxLevel) {
        this.currentLevel++;
      }
    },
    resetLevel() {
      this.currentScore = 0;
      this.resetScore();
      this.startGameEffects();
    },
    async endGame() {
      console.log('start end game');
      const useUser = useUserStore();
      this.gameEndTime = Date.now();
      console.log(useUser.getUser?.uid);

      if (useUser.getUser?.uid) {
        await useUser.updateRanking(useUser.getUser.uid, {
          score: this.currentScore,
          gameTotal: this.attemptCounter,
          attemptCounter: this.attemptCounter,
          ...useUser.getUser,
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

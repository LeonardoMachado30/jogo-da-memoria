// game-store.ts
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'src/stores/user-store';
import timer, { formattedTime, resetTimer, resetTimerStart } from 'src/composables/useTimer';
import { randomImagesEmojis, randomImagesFruits } from 'src/model/images';

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
  deck: 'default' | 'hard';
}

interface CardRef {
  flipDown: () => void;
}

interface State {
  currentScore: number;
  pulseTimerList: string[];
  attemptCounter: number;
  initialFlip: boolean;
  currentGameCards: Images[];
  usedCardsIndices: Set<number>;
  availableCards: Images[];
  levelsConfig: LevelConfig[];
  game: { currentLevel: number };
  gameStartTime: number;
  gameEndTime: number;
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
    gameStartTime: 0,
    gameEndTime: 0,
    initialFlip: false,
    lockBoard: false,
    flippedStatus: [],
    flippedCards: [],
    cardRefs: [],
    currentGameCards: [],
    usedCardsIndices: new Set<number>(),
    availableCards: [...randomImagesEmojis],
    levelsConfig: [
      {
        level: 1,
        gridSize: 4,
        pairs: 8,
        color: 'green-6',
        textColor: 'white',
        deck: 'default',
      },
      {
        level: 2,
        gridSize: 4,
        pairs: 10,
        color: 'amber-6',
        textColor: 'white',
        deck: 'default',
      },
      {
        level: 3,
        gridSize: 5,
        pairs: 10,
        color: 'red-6',
        textColor: 'white',
        deck: 'default',
      },
      {
        level: 4,
        gridSize: 5,
        pairs: 12,
        color: 'blue-6',
        textColor: 'white',
        deck: 'default',
      },
      {
        level: 5,
        gridSize: 6,
        pairs: 12,
        color: 'purple-6',
        textColor: 'white',
        deck: 'default',
      },
      {
        level: 6,
        gridSize: 5,
        pairs: 15,
        color: 'deep-orange-6',
        textColor: 'white',
        deck: 'hard',
      },
      {
        level: 7,
        gridSize: 6,
        pairs: 15,
        color: 'teal-6',
        textColor: 'white',
        deck: 'hard',
      },
      {
        level: 8,
        gridSize: 6,
        pairs: 18,
        color: 'indigo-6',
        textColor: 'white',
        deck: 'hard',
      },
      {
        level: 9,
        gridSize: 4,
        pairs: 12,
        color: 'pink-6',
        textColor: 'white',
        deck: 'hard',
      },
      {
        level: 10,
        gridSize: 6,
        pairs: 18,
        color: 'black',
        textColor: 'yellow-4',
        deck: 'hard',
      },
    ],
    game: {
      currentLevel: 1,
    },
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

    levelCardSet(state): Images[] {
      return state.currentGameCards;
    },

    gameDuration(state): number | null {
      if (state.gameStartTime !== null && state.gameEndTime !== null) {
        return state.gameEndTime - state.gameStartTime;
      }
      return null;
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
     * Seleciona cartas únicas que não foram usadas anteriormente
     */
    selectUniqueCards(pairsNeeded: number): Images[] {
      // Se não há cartas disponíveis suficientes, reseta o pool
      if (this.availableCards.length < pairsNeeded) {
        this.resetCardPool();
      }

      // Pega as primeiras N cartas disponíveis
      const selectedCards = this.availableCards.slice(0, pairsNeeded);

      // Remove as cartas selecionadas do pool disponível
      this.availableCards = this.availableCards.slice(pairsNeeded);

      return selectedCards;
    },

    /**
     * Reseta o pool de cartas disponíveis e embaralha
     */
    resetCardPool(): void {
      this.availableCards = this.shuffleArray([...randomImagesEmojis]);
      this.usedCardsIndices.clear();
    },

    // 2. Função Principal: Cria Pares de Cartas Aleatórias
    createRandomPairs(allCards: Images[], numberOfPairs: number): Images[] {
      // Passo 1: Seleção Aleatória de Cartas (Sem Repetição)
      // Faz uma cópia do array de cartas e o embaralha
      const shuffledOriginalCards = this.shuffleArray(allCards);

      // Pega o número necessário de cartas do topo (as primeiras 'numberOfPairs' cartas)
      // Isso garante que são cartas únicas e aleatórias
      const selectedCards = shuffledOriginalCards.slice(0, numberOfPairs);

      // Passo 2: Criação dos Pares
      // Duplica cada carta selecionada
      const pairedCards = selectedCards.flatMap((card) => [card, card]);

      // Passo 3: Embaralhamento Final
      // Embaralha o array de pares para garantir que não estejam em ordem previsível
      const finalShuffledPairs = this.shuffleArray(pairedCards);

      return finalShuffledPairs;
    },

    /**
     * Gera o conjunto de cartas para o nível atual
     */
    generateLevelCards(): void {
      const deckChoose = this.currentConfig;
      let selectDeck = randomImagesFruits;

      if (deckChoose.deck === 'hard') {
        selectDeck = randomImagesEmojis;
      }

      const gameCards = this.createRandomPairs(selectDeck, deckChoose.pairs);
      this.currentGameCards = gameCards;
    },

    /**
     * Troca o tema de cartas (frutas/emojis)
     */
    changeCardTheme(theme: 'emojis' | 'fruits'): void {
      const sourceCards = theme === 'emojis' ? randomImagesEmojis : randomImagesFruits;
      this.availableCards = this.shuffleArray([...sourceCards]);
      this.usedCardsIndices.clear();
      this.generateLevelCards();
    },

    startGameEffects() {
      const { audioCard, playMusic } = useAudio();
      playMusic();
      this.resetLevel();

      // Gera as cartas para o nível atual
      this.generateLevelCards();

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
          setTimeout(() => {
            this.lockBoard = false;
          }, 1000);
        }, 5000);
      }, 600);
    },

    async endGame() {
      const useUser = useUserStore();
      if (useUser.getUser) {
        this.gameEndTime = Date.now();
        const totalTime = this.gameTimeConvertForMinutes(this.gameStartTime, this.gameEndTime);

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

    resetLevel() {
      this.currentScore = 0;
      this.attemptCounter = 0;
      this.flippedCards = [];
      this.cardRefs = [];
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

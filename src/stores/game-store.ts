// game-store.ts
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAudio } from 'src/composables/useAudio';
import { useUserStore } from 'src/stores/user-store';
import timer, { formattedTime, resetTimer, resetTimerStart } from 'src/composables/useTimer';
import { randomImagesEmojis, randomImagesFruits } from 'src/model/images';
import { ref as dbRef, get, set, update } from 'firebase/database';
import { db } from 'src/boot/firebase';
import { balancedLevels } from 'src/model/levels';

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
  levelsConfig: Level[] | [];
  game: {
    currentLevel: number;
    currentScore: number;
    startTime: number;
    endTime: number;
    acumulativeAccepts: number;
    isAdvancing: boolean;
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
    cardRefs: [],
    usedCardsIndices: new Set<number>(),
    availableCards: [...randomImagesEmojis],
    isGameInitialized: false,
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
      return state.flippedStatus.every((status) => status === true);
    },
  },

  actions: {
    groupCardsByCategory(cards: Images[]): Map<string, Images[]> {
      const groups = new Map<string, Images[]>();

      for (const card of cards) {
        const category = card.category;

        if (!groups.has(category)) groups.set(category, []);
        groups.get(category)!.push(card);
      }

      return groups;
    },

    /**
     * Seleciona cartas garantindo diversidade e/ou similaridade conforme o nível
     */
    selectBalancedCards(
      allCards: Images[],
      numberOfPairs: number,
      allowEqualCards: number = 0,
    ): Images[] {
      const cardGroups = this.groupCardsByCategory(allCards);
      const selectedCards: Images[] = [];
      let pairsAdded = 0;

      // 1. Separa os grupos
      const similarGroups: Images[][] = []; // Grupos com 2+ cartas (ex: [apple1, apple2])
      const identicalGroups: Images[][] = []; // Grupos com 1 carta (ex: [banana])

      for (const group of cardGroups.values()) {
        if (group.length > 1) {
          similarGroups.push(group);
        } else if (group.length === 1) {
          identicalGroups.push(group);
        }
      }

      // Embaralha as listas de grupos para aleatoriedade
      const shuffledSimilarGroups = this.shuffleArray(similarGroups);
      const shuffledIdenticalGroups = this.shuffleArray(identicalGroups);

      // --- ETAPA 1: Adiciona Pares Similares ---
      // Adiciona o máximo de pares "similares" permitido e disponível
      const similarPairsToTry = Math.min(
        allowEqualCards,
        numberOfPairs,
        shuffledSimilarGroups.length,
      );

      for (let i = 0; i < similarPairsToTry; i++) {
        if (pairsAdded >= numberOfPairs) break; // Para se já atingimos o limite

        const group = shuffledSimilarGroups.pop(); // Pega um grupo do final
        if (group) {
          // Pega duas cartas distintas da mesma categoria
          const pair = this.shuffleArray(group).slice(0, 2);
          selectedCards.push(...pair);
          pairsAdded++;
        }
      }

      // --- ETAPA 2: Adiciona Pares Idênticos (de grupos únicos) ---
      // Preenche os pares restantes usando os grupos de carta única
      while (pairsAdded < numberOfPairs && shuffledIdenticalGroups.length > 0) {
        const group = shuffledIdenticalGroups.pop(); // Pega um grupo do final
        if (group && group[0]) {
          const card = group[0];
          selectedCards.push(card, card); // Duplica a carta
          pairsAdded++;
        }
      }

      // --- ETAPA 3: Fallback (Se ainda faltarem pares) ---
      // Se acabaram os grupos "únicos" mas ainda faltam pares,
      // usamos os grupos "similares" restantes, mas criando pares IDÊNTICOS.
      // (ex: usamos [apple1, apple1] mesmo que apple2 exista)
      while (pairsAdded < numberOfPairs && shuffledSimilarGroups.length > 0) {
        const group = shuffledSimilarGroups.pop(); // Pega um grupo similar restante
        if (group && group[0]) {
          const card = group[0]; // Pega apenas a primeira carta
          selectedCards.push(card, card); // E duplica ela
          pairsAdded++;
        }
      }

      // --- Verificação Final ---
      if (pairsAdded < numberOfPairs) {
        console.error(
          `[MemoryGame Store] Alerta: Não foi possível gerar ${numberOfPairs} pares. O baralho só tem ${pairsAdded} categorias únicas.`,
        );
      }

      return selectedCards; // Retorna a lista [a1, a2, b, b, c1, c1]
    },

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
     * Cria pares de cartas de forma balanceada e embaralhada
     */
    createRandomPairs(
      allCards: Images[],
      numberOfPairs: number,
      allowEqualCards: number = 0,
    ): Images[] {
      const selectedCards = this.selectBalancedCards(allCards, numberOfPairs, allowEqualCards);

      // embaralhar novamente para garantir que os pares não fiquem lado a lado
      return this.shuffleArray(selectedCards);
    },

    /**
     * Gera o conjunto de cartas para o nível atual
     */
    async generateLevelCards(): Promise<Images[]> {
      await this.getLevels();

      const deckChoose = this.currentConfig;
      const selectDeck = deckChoose.deck === 'hard' ? randomImagesEmojis : randomImagesFruits;
      const allowEqual = deckChoose.allowEqualCards || 0;

      const gameCards = this.createRandomPairs(selectDeck, deckChoose.pairs, allowEqual);
      this.cards = gameCards;

      return gameCards;
    },

    /**
     * Reseta completamente o estado do nível
     */
    async resetLevelState() {
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
      await this.generateLevelCards();

      // Reset flipped status baseado no novo total de cartas
      this.flippedStatus.splice(
        0,
        this.flippedStatus.length,
        ...Array(this.totalCards).fill(false),
      );

      this.isGameInitialized = false;
    },

    /**
     * Inicializa o jogo para o nível atual
     */
    async initializeLevel(level: number) {
      this.game.currentLevel = level;
      await this.resetLevelState();
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
    async nextLevel() {
      if (this.game.isAdvancing) return;

      try {
        this.game.isAdvancing = true;

        const nextLevel = this.game.currentLevel + 1;

        await this.updateUserCurrentLevelIfAdvance(nextLevel);

        if (nextLevel <= this.levelsConfig.length) {
          await this.initializeLevel(nextLevel);
        } else {
          console.log('🎉 Todos os níveis concluídos!');
        }
      } catch (error) {
        console.error('Erro ao avançar de nível:', error);
      } finally {
        this.game.isAdvancing = false;
      }
    },

    async restartLevel() {
      await this.initializeLevel(this.game.currentLevel);
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
      if (this.lockBoard) return;

      this.flippedCards.push({ index, alt, id });

      if (this.flippedCards.length === 2) {
        this.attemptCounter = this.attemptCounter + 1;
        this.lockBoard = true;

        const [first, second] = this.flippedCards;

        if (first && second) {
          if (first.id === second.id) {
            // Par encontrado
            this.game.acumulativeAccepts = 0;
            this.flippedStatus[first.index] = true;
            this.flippedStatus[second.index] = true;
            this.flippedCards = [];
            this.lockBoard = false;
            this.incrementScore(formattedTime.value);
            useAudio().audioPair();

            timer().mounted();
          } else {
            this.game.acumulativeAccepts = this.game.acumulativeAccepts + 1;
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

    async setLevel() {
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

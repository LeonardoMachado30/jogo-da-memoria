export interface ImageItem {
  src: string;
  alt: string;
}

export interface GameConfig {
  level: number;
  gridSize: number;
  pairs: number;
}

export interface CardRef {
  flipDown: () => void;
}

export interface FlippedCard {
  index: number;
  alt: string;
}

export type GameMode = 'emojis' | 'fruits';

export interface GameState {
  currentLevel: number;
  gameMode: GameMode;
  isGameStarted: boolean;
  gameStartTime: number;
  gameEndTime?: number;
  currentScore: number;
  attemptCounter: number;
  lockBoard: boolean;
  flippedCards: FlippedCard[];
  flippedStatus: boolean[];
  cardRefs: (CardRef | null)[];
}

export interface TimerState {
  isRunning: boolean;
  currentTime: string;
  elapsedTime: number;
  pulseTimerList: string[];
  shouldPulse: boolean;
}

export interface TimeScore {
  score: number;
  time: string;
}

export interface LevelProgress {
  level: number;
  score: number;
  time: string;
  attempts: number;
}

export interface GameScore {
  totalScore: number;
  totalTime: string;
  totalAttempts: number;
  levelsProgress: LevelProgress[];
}

import { defineStore, acceptHMRUpdate } from 'pinia';

interface State {
  currentScore: number;
  pulseTimerList: string[];
}

export const useScoreStore = defineStore('score', {
  state: (): State => ({
    currentScore: 0,
    pulseTimerList: ['01:30', '01:00', '00:30'],
  }),

  getters: {},

  actions: {
    incrementScore(formattedTime: string) {
      const points = this.calculateScore(formattedTime);
      this.currentScore += points;
    },

    calculateScore(formattedTime: string): number {
      if (formattedTime >= '01:30') return 5;
      if (formattedTime >= '01:00') return 4;
      if (formattedTime >= '00:30') return 3;
      return 0;
    },

    resetScore() {
      this.currentScore = 0;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScoreStore, import.meta.hot));
}

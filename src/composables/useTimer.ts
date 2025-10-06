import { ref, computed } from 'vue';

export const TOTAL_TIME = 60;
export const TOTAL_TIME_START = 5;

export const timeLeft = ref(TOTAL_TIME);
export const timeLeftStart = ref(TOTAL_TIME_START);

export const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

export const formattedTimeStart = computed(() => {
  const seconds = timeLeftStart.value % 60;
  return `${String(seconds).padStart(2, '0')}`;
});

export const isTimeOver = computed(() => timeLeft.value <= 0);

let timeOut: ReturnType<typeof setInterval> | null = null;
let timerStart: ReturnType<typeof setInterval> | null = null;

export const resetTimer = () => {
  clearInterval(timeOut as NodeJS.Timeout);
  timeLeft.value = TOTAL_TIME;
};

export const resetTimerStart = () => {
  clearInterval(timerStart as NodeJS.Timeout);
  timeLeftStart.value = TOTAL_TIME_START;
};

export default function timer() {
  const mounted = () => {
    resetTimer(); // Garante que reinicia corretamente
    timeOut = setInterval(() => {
      if (timeLeft.value >= 0) {
        timeLeft.value--;
      } else {
        clearInterval(timeOut as NodeJS.Timeout);
      }
    }, 1000);
  };

  const mountedStart = () => {
    resetTimerStart(); // Garante reinício da contagem inicial
    timerStart = setInterval(() => {
      if (timeLeftStart.value > 0) {
        timeLeftStart.value--;
      } else {
        clearInterval(timerStart as NodeJS.Timeout);
      }
    }, 1000);
  };

  const unmountedStart = () => {
    clearInterval(timeOut as NodeJS.Timeout);
    clearInterval(timerStart as NodeJS.Timeout);
  };

  return { mounted, mountedStart, unmountedStart, isTimeOver };
}

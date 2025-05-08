import { ref, computed } from 'vue';

const totalTime = 60;
const totalTimeStart = 5;
const timeLeft = ref(totalTime);
const timeLeftStart = ref(totalTimeStart);

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

export const resetTimer = () => {
  timeLeft.value = totalTime;
};

export default function timer() {
  let timer: ReturnType<typeof setInterval> | null = null;
  let timerStart: ReturnType<typeof setInterval> | null = null;

  const mounted = () => {
    timer = setInterval(() => {
      if (timeLeft.value >= 0) {
        timeLeft.value--;
      } else if (timer) {
        clearInterval(timer);
      }
    }, 500);
  };

  const mountedStart = () => {
    timerStart = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeftStart.value--;
      } else if (timerStart) {
        clearInterval(timerStart);
      }
    }, 1000);
  };

  const unmounted = () => {
    if (timer) clearInterval(timer);
  };

  return { mounted, unmounted, mountedStart, isTimeOver };
}

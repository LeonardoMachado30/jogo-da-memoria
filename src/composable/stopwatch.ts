import { ref, computed, onMounted, onUnmounted } from 'vue';

const totalTime = 120;
const timeLeft = ref(totalTime);

export const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

export const resetTimer = () => {
  timeLeft.value = totalTime;
};

export default function initTimer() {
  let timer: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else if (timer) {
        clearInterval(timer);
      }
    }, 1000);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });
}

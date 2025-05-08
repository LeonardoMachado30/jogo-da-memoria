import { ref } from 'vue';

const audioBackground = new Audio('/audio/lofi-coffee-332824.mp3');
audioBackground.loop = true;

const isPauseMusicStorage = localStorage.getItem('isPauseMusic');
const isPlaying = ref(!!isPauseMusicStorage);
const volume = ref(0.5);
audioBackground.volume = volume.value;

function playMusic() {
  audioBackground
    .play()
    .then(() => {
      isPlaying.value = true;
      localStorage.removeItem('isPauseMusic');
    })
    .catch((err) => {
      console.warn('Autoplay bloqueado:', err);
    });
}

function pauseMusic() {
  audioBackground.pause();
  isPlaying.value = false;
  localStorage.setItem('isPauseMusic', String(true));
}

function toggleMusic() {
  if (isPlaying.value) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function setVolume(newVolume: number) {
  volume.value = newVolume;
  audioBackground.volume = newVolume;
}

function audioCreate(audioPath: string, isPlay = true) {
  const audio = new Audio(audioPath);
  if (isPlay) {
    audio
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((err) => {
        console.warn('Audio play blocked:', err);
      });
  } else {
    audio.pause();
  }
}

function audioCard() {
  audioCreate('/audio/card-sounds-35956.mp3');
}

function audioCongratulation() {
  audioCreate('/audio/crowd-cheer-ii-6263.mp3');
  pauseMusic();

  setTimeout(() => {
    playMusic();
  }, 2000);
}

function audioPair() {
  audioCreate('/audio/success-1-6297.mp3');
}

function audioMouseHover() {
  audioCreate('/audio/658431__deathbyfairydust__pop.wav');
}

function audioClick() {
  audioCreate('/audio/801967__sadiquecat__kid-fingersnap-3.wav');
}

function audioGameOver() {
  audioCreate('/audio/253886__themusicalnomad__negative_beeps.wav');
  pauseMusic();

  // setTimeout(() => {
  //   playMusic();
  // }, 2000);
}

export function useBackgroundMusic() {
  return {
    isPlaying,
    volume,
    playMusic,
    pauseMusic,
    toggleMusic,
    setVolume,
    audioCard,
    audioCongratulation,
    audioPair,
    audioMouseHover,
    audioClick,
    audioGameOver,
  };
}

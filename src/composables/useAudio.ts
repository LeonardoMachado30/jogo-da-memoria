import { ref } from 'vue';

const audioBackground = new Audio('audio/lofi-coffee-332824.mp3');
audioBackground.loop = true;

const isPauseMusicStorage = localStorage.getItem('isPauseMusic');
const isPlaying = ref(!!isPauseMusicStorage);
const volume = ref(0.04);
audioBackground.volume = volume.value;

// Armazena os áudios para controle individual (pausar, continuar)
const audioMap = new Map<string, HTMLAudioElement>();

function playMusic() {
  audioBackground
    .play()
    .then(() => {
      isPlaying.value = true;
      localStorage.setItem('isPauseMusic', 'false');
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
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isPlaying.value ? pauseMusic() : playMusic();
}

function setVolume(newVolume: number) {
  volume.value = newVolume;
  audioBackground.volume = newVolume;

  for (const audio of audioMap.values()) {
    audio.volume = newVolume;
  }
}

function audioCreate(audioPath: string, autoPlay = true): HTMLAudioElement {
  let audio = audioMap.get(audioPath);

  if (!audio) {
    audio = new Audio(audioPath);
    audio.volume = volume.value;
    audioMap.set(audioPath, audio);
  }

  if (autoPlay) {
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn('Audio play blocked:', err);
    });
  }

  return audio;
}

// 🎵 Funções para efeitos sonoros:

function audioCard() {
  audioCreate('audio/card-sounds-35956.mp3');
}

function audioCongratulation() {
  const audio = audioCreate('audio/crowd-cheer-ii-6263.mp3');
  return audio;
}

function audioPair() {
  audioCreate('audio/success-1-6297.mp3');
}

function audioMouseHover() {
  audioCreate('audio/658431__deathbyfairydust__pop.wav');
}

function audioClick() {
  audioCreate('audio/801967__sadiquecat__kid-fingersnap-3.wav');
}

function audioGameOver() {
  audioCreate('audio/253886__themusicalnomad__negative_beeps.wav');
  pauseMusic();
}

// Exporta o composable
export function useAudio() {
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
    audioMap, // caso queira acessar diretamente algum áudio no seu componente
  };
}

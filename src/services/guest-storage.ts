import type { GuestProgress } from 'src/types/game';
import type { Level } from 'src/stores/game-store';

export const GUEST_PROGRESS_KEY = 'memorix_guest_progress';
export const LEVELS_CACHE_KEY = 'memorix_levels_cache';

export function getDefaultGuestProgress(): GuestProgress {
  return {
    score: 0,
    gameTotal: '00:00',
    attemptCounter: 0,
    currentLevel: 1,
  };
}

export function loadGuestProgress(): GuestProgress {
  const raw = localStorage.getItem(GUEST_PROGRESS_KEY);
  if (!raw) {
    return getDefaultGuestProgress();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<GuestProgress>;
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultGuestProgress();
    }

    return {
      score: Number(parsed.score) || 0,
      gameTotal: typeof parsed.gameTotal === 'string' ? parsed.gameTotal : '00:00',
      attemptCounter: Number(parsed.attemptCounter) || 0,
      currentLevel: Math.max(1, Number(parsed.currentLevel) || 1),
    };
  } catch {
    return getDefaultGuestProgress();
  }
}

export function saveGuestProgress(progress: GuestProgress): void {
  localStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(progress));
}

export function clearGuestProgress(): void {
  localStorage.removeItem(GUEST_PROGRESS_KEY);
}

export function hasGuestProgress(): boolean {
  return localStorage.getItem(GUEST_PROGRESS_KEY) !== null;
}

export function loadLevelsCache(): Level[] | null {
  const raw = localStorage.getItem(LEVELS_CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Level[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function saveLevelsCache(levels: Level[]): void {
  localStorage.setItem(LEVELS_CACHE_KEY, JSON.stringify(levels));
}

/** Soma dois tempos no formato MM:SS. */
export function addGameTotalTimes(a: string, b: string): string {
  const parse = (time: string): number => {
    const parts = time.split(':').map(Number);
    if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) {
      return 0;
    }
    const [min, sec] = parts as [number, number];
    return min * 60 + sec;
  };

  const totalSeconds = parse(a) + parse(b);
  const minutos = Math.floor(totalSeconds / 60);
  const segundos = totalSeconds % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

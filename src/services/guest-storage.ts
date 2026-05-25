import type { LocalProgress } from 'src/types/game';
import type { Level } from 'src/stores/game-store';
import type { Ranking } from 'src/stores/user-store';

export const GUEST_PROGRESS_KEY = 'memorix_guest_progress';
export const LEVELS_CACHE_KEY = 'memorix_levels_cache';

export function getDefaultLocalProgress(uid?: string): LocalProgress {
  return {
    score: 0,
    gameTotal: '00:00',
    attemptCounter: 0,
    currentLevel: 1,
    ...(uid ? { uid } : {}),
  };
}

/** @deprecated Use getDefaultLocalProgress */
export const getDefaultGuestProgress = getDefaultLocalProgress;

export function loadLocalProgress(): LocalProgress {
  const raw = localStorage.getItem(GUEST_PROGRESS_KEY);
  if (!raw) {
    return getDefaultLocalProgress();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LocalProgress>;
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultLocalProgress();
    }

    return {
      score: Number(parsed.score) || 0,
      gameTotal: typeof parsed.gameTotal === 'string' ? parsed.gameTotal : '00:00',
      attemptCounter: Number(parsed.attemptCounter) || 0,
      currentLevel: Math.max(1, Number(parsed.currentLevel) || 1),
      ...(parsed.uid ? { uid: parsed.uid } : {}),
    };
  } catch {
    return getDefaultLocalProgress();
  }
}

/** @deprecated Use loadLocalProgress */
export const loadGuestProgress = loadLocalProgress;

export function saveLocalProgress(progress: LocalProgress): void {
  localStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(progress));
}

/** @deprecated Use saveLocalProgress */
export const saveGuestProgress = saveLocalProgress;

export function clearLocalProgress(): void {
  localStorage.removeItem(GUEST_PROGRESS_KEY);
}

/** @deprecated Use clearLocalProgress */
export const clearGuestProgress = clearLocalProgress;

export function hasLocalProgress(): boolean {
  return localStorage.getItem(GUEST_PROGRESS_KEY) !== null;
}

/** @deprecated Use hasLocalProgress */
export const hasGuestProgress = hasLocalProgress;

export function rankingToLocalProgress(ranking: Ranking, uid: string): LocalProgress {
  return {
    score: ranking.score ?? 0,
    gameTotal: typeof ranking.gameTotal === 'string' ? ranking.gameTotal : '00:00',
    attemptCounter: ranking.attemptCounter ?? 0,
    currentLevel: Math.max(1, ranking.currentLevel ?? 1),
    uid,
  };
}

export function mergeLocalWithRanking(local: LocalProgress, remote: Ranking): LocalProgress {
  return {
    uid: local.uid ?? remote.uid,
    currentLevel: Math.max(local.currentLevel, remote.currentLevel ?? 1),
    score: Math.max(local.score, remote.score ?? 0),
    attemptCounter: Math.max(local.attemptCounter, remote.attemptCounter ?? 0),
    gameTotal:
      parseTimeToSeconds(local.gameTotal) >=
      parseTimeToSeconds(typeof remote.gameTotal === 'string' ? remote.gameTotal : '00:00')
        ? local.gameTotal
        : typeof remote.gameTotal === 'string'
          ? remote.gameTotal
          : '00:00',
  };
}

function parseTimeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return 0;
  const [min, sec] = parts as [number, number];
  return min * 60 + sec;
}

export function accumulateLocalProgress(
  current: LocalProgress,
  delta: { score: number; gameTotal: string; attemptCounter: number; currentLevel?: number },
  uid?: string,
): LocalProgress {
  const resolvedUid = uid ?? current.uid;
  const base: LocalProgress = {
    score: current.score + delta.score,
    gameTotal: addGameTotalTimes(current.gameTotal, delta.gameTotal),
    attemptCounter: current.attemptCounter + delta.attemptCounter,
    currentLevel: delta.currentLevel
      ? Math.max(current.currentLevel, delta.currentLevel)
      : current.currentLevel,
  };
  return resolvedUid ? { ...base, uid: resolvedUid } : base;
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

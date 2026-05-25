import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  ref as dbRef,
  get,
  query,
  orderByChild,
  limitToLast,
  set,
  update,
  getDatabase,
  ref,
} from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { db } from 'src/boot/firebase';
import {
  loadGuestProgress,
  clearGuestProgress,
  hasGuestProgress,
  addGameTotalTimes,
} from 'src/services/guest-storage';
import type { GuestProgress } from 'src/types/game';

export interface User {
  nome: string | null;
  email: string | null;
  photoURL?: string | null;
  uid: string;
  permission?: string;
}

interface UserState {
  user: User | null;
}

export interface Ranking extends User {
  attemptCounter: number;
  gameTotal: string;
  score: number;
  currentLevel?: number;
}

const usersRef = (uid: string) => dbRef(db, `users/${uid}`);
const rankingRef = dbRef(db, 'ranking');

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  getters: {
    getUser: (state) => {
      if (state.user) {
        return state.user;
      }

      const raw = localStorage.getItem('user');
      if (!raw) {
        return null;
      }

      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        console.error('Erro ao fazer parse do usuário:', e);
        return null;
      }
    },
  },
  actions: {
    setUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    },

    async addUser(uid: string, user: User) {
      try {
        await set(usersRef(uid), user);
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    },

    async getUserData(uid: string) {
      try {
        const snapshot = await get(usersRef(uid));
        return snapshot.exists() ? snapshot.val() : null;
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
        return null;
      }
    },

    async getTop10Ranking(): Promise<Ranking[]> {
      try {
        const rankingQuery = query(rankingRef, orderByChild('score'), limitToLast(10));
        const snapshot = await get(rankingQuery);

        if (snapshot.exists()) {
          const rankingData = snapshot.val() as Record<string, Ranking>;

          return Object.entries(rankingData)
            .map(([id, rank]) => ({
              ...rank,
              id,
            }))
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        } else {
          return [];
        }
      } catch (error) {
        console.error('Erro ao obter ranking:', error);
        return [];
      }
    },

    async getAllUsers(): Promise<User[]> {
      try {
        const db = getDatabase();
        const usersPathRef = ref(db, 'users');
        const snapshot = await get(usersPathRef);
        if (snapshot.exists()) {
          const usersData = snapshot.val() as Record<string, User>;
          return Object.entries(usersData).map(([uid, user]) => ({
            ...user,
            uid,
          }));
        } else {
          return [];
        }
      } catch (error) {
        console.error('Erro ao obter todos os usuários:', error);
        return [];
      }
    },

    async getAllRankings(): Promise<Ranking[]> {
      try {
        const db = getDatabase();
        const rankingsRef = ref(db, 'ranking');
        const snapshot = await get(rankingsRef);

        if (snapshot.exists()) {
          const rankingsData = snapshot.val() as Record<string, Ranking>;
          return Object.entries(rankingsData).map(([uid, ranking]) => ({
            ...ranking,
            uid,
          }));
        } else {
          return [];
        }
      } catch (error) {
        console.error('Erro ao obter todos os rankings:', error);
        return [];
      }
    },

    mergeGuestWithRanking(remote: Ranking, guest: GuestProgress): Partial<Ranking> {
      return {
        currentLevel: Math.max(remote.currentLevel ?? 1, guest.currentLevel),
        score: (remote.score ?? 0) + guest.score,
        attemptCounter: (remote.attemptCounter ?? 0) + guest.attemptCounter,
        gameTotal: addGameTotalTimes(
          typeof remote.gameTotal === 'string' ? remote.gameTotal : '00:00',
          guest.gameTotal,
        ),
      };
    },

    async syncGuestProgressToAccount(uid: string, user: User): Promise<boolean> {
      if (!hasGuestProgress()) {
        return false;
      }

      const guest = loadGuestProgress();
      const rankingUserRef = dbRef(db, `ranking/${uid}`);
      const snapshot = await get(rankingUserRef);

      if (!snapshot.exists()) {
        await this.addRaking(uid, {
          ...guest,
          ...user,
        });
      } else {
        const remote = snapshot.val() as Ranking;
        await update(rankingUserRef, this.mergeGuestWithRanking(remote, guest));
      }

      clearGuestProgress();
      return true;
    },

    async loginWithGoogle(): Promise<{ synced: boolean }> {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user: User = {
          nome: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        };

        const existingUser = await this.getUserData(result.user.uid);
        const guest = loadGuestProgress();
        const guestHasData = hasGuestProgress();

        if (!existingUser) {
          await this.addUser(result.user.uid, user);
          await this.addRaking(result.user.uid, {
            score: guestHasData ? guest.score : 0,
            gameTotal: guestHasData ? guest.gameTotal : '00:00',
            attemptCounter: guestHasData ? guest.attemptCounter : 0,
            currentLevel: guestHasData ? guest.currentLevel : 1,
            ...user,
          });
          if (guestHasData) {
            clearGuestProgress();
          }
          this.setUser(user);
          return { synced: guestHasData };
        }

        if (existingUser.permission) {
          user.permission = existingUser.permission;
        }
        this.setUser(user);

        const synced = await this.syncGuestProgressToAccount(result.user.uid, user);
        return { synced };
      } catch (error) {
        console.error('Erro no login com Google:', error);
        throw error;
      }
    },

    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);

        this.user = null;
        localStorage.removeItem('user');

        return;
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    },

    async addRaking(uid: string, ranking: Ranking) {
      try {
        await set(dbRef(db, `ranking/${uid}`), ranking);
      } catch (error) {
        console.error('Erro ao adicionar ranking:', error);
      }
    },

    async updateRanking(uid: string, newData: Partial<Ranking>) {
      try {
        const rankingRef = dbRef(db, `ranking/${uid}`);

        const snapshot = await get(rankingRef);
        const ranking = snapshot.exists() ? snapshot.val() : null;

        const rankingConcat = {
          attemptCounter: (ranking.attemptCounter ?? 0) + (newData.attemptCounter ?? 0),
          gameTotal: addGameTotalTimes(
            typeof ranking.gameTotal === 'string' ? ranking.gameTotal : '00:00',
            newData.gameTotal ?? '00:00',
          ),
          score: (ranking.score ?? 0) + (newData.score ?? 0),
        };

        await update(rankingRef, rankingConcat);
      } catch (error) {
        console.error('Erro ao atualizar ranking:', error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

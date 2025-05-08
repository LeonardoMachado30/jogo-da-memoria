import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  ref as dbRef,
  get,
  query,
  orderByChild,
  limitToLast,
  set,
  update,
} from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { db } from 'src/boot/firebase';
import { useRouter } from 'vue-router';

interface User {
  nome: string | null;
  email: string | null;
  photoURL?: string | null;
  uid: string;
}

interface UserState {
  user: User | null;
}

export interface Ranking extends User {
  attemptCounter: number;
  gameTotal: number;
  score: number;
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

          // Transforma em array e ordena manualmente do maior para o menor
          return Object.entries(rankingData)
            .map(([id, rank]) => ({
              ...rank,
              id,
            }))
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0)); // Score descendente
        } else {
          return [];
        }
      } catch (error) {
        console.error('Erro ao obter ranking:', error);
        return [];
      }
    },

    async loginWithGoogle() {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const user = {
          nome: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        };

        const existingUser = await this.getUserData(result.user.uid);

        if (!existingUser) {
          await this.addUser(result.user.uid, user);
          await this.addRaking(result.user.uid, {
            score: 0,
            gameTotal: 0,
            attemptCounter: 0,
            ...user,
          });
        }

        this.setUser(user);
      } catch (error) {
        console.error('Erro no login com Google:', error);
      }
    },

    async logout() {
      const router = useRouter();
      try {
        const auth = getAuth();
        await signOut(auth);

        this.user = null;
        localStorage.removeItem('user');
        await router.push('/');
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
          attemptCounter: ranking.attemptCounter + newData.attemptCounter,
          gameTotal: ranking.gameTotal + newData.gameTotal,
          score: ranking.score + newData.score,
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

import { defineBoot } from '#q-app/wrappers';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VueFire, VueFireAuth } from 'vuefire';
import { getDatabase } from 'firebase/database';
import { useUserStore, type User } from 'src/stores/user-store';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Boot que instala o VueFire com VueFireAuth
export default defineBoot(({ app }) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });

  const userStore = useUserStore();
  userStore.hydrateFromLocalStorage();

  onAuthStateChanged(auth, (firebaseUser) => {
    if (!firebaseUser) {
      userStore.clearSession();
      return;
    }

    void userStore.getUserData(firebaseUser.uid).then((existing) => {
      const user: User = {
        nome: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      };
      if (existing?.permission) {
        user.permission = existing.permission;
      }
      userStore.setUser(user);
    });
  });
});

export { firebaseApp, db, auth };

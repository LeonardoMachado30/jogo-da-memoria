import { defineBoot } from '#q-app/wrappers';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { VueFire, VueFireAuth } from 'vuefire';
import { getDatabase } from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDvaHnSU29r9zc29QkuMsG5A-s2dqPbsIg',
  authDomain: 'jogo-da-memoria-278bd.firebaseapp.com',
  projectId: 'jogo-da-memoria-278bd',
  storageBucket: 'jogo-da-memoria-278bd.appspot.com',
  messagingSenderId: '1063068944629',
  appId: '1:1063068944629:web:005f10ea128e68d9245dbc',
});

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Boot que instala o VueFire com VueFireAuth
export default defineBoot(({ app }) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  });
});

export { firebaseApp, db, auth };

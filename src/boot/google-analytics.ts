import { defineBoot } from '#q-app/wrappers';
import { createGtag } from 'vue-gtag';

export default defineBoot(({ router }) => {
  if (process.env.NODE_ENV === 'production') {
    createGtag({
      tagId: import.meta.env.VITE_GTAG,
      pageTracker: {
        router,
      },
    });
  }
});

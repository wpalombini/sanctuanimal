import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

export { createEmotionServer };

export const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

import { insertStyles } from './../../node_modules/@emotion/utils/src/index';
import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({
    key: "mui-style",
    insertionPoint,
  });
}

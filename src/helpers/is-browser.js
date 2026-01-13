/**
 * Shim for #is-browser module used by @emotion/utils
 * This resolves the package.json imports field issue
 */
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
export default isBrowser;


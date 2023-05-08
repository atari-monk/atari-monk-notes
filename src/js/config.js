const IS_IN_PROD = false;
export let CONNECTION;
export let DEBUG;
export let HOME;
export const SYSTEM = {
  Unknown: 'Unknown',
  Android: 'Android',
  Windows: 'Windows',
};
if (IS_IN_PROD) {
  CONNECTION = 'https://atari-monk.github.io/atari-monk-notes/db/json-v2/';
  DEBUG = false;
  HOME = 'https://atari-monk.github.io/atari-monk-notes/';
} else {
  CONNECTION = 'http://127.0.0.1:5501/db/json-v2/';
  DEBUG = true;
  HOME = '/';
}

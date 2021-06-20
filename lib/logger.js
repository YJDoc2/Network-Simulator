import { writable } from 'svelte/store';

const log = writable(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => {
    return `Log ${a} ${Math.random()} ${Math.random()}`;
  })
);

export const Logger = {
  log: (str) => {
    log.update((l) => {
      l.push(str);
      return l;
    });
  },
  clear: () => {
    log.set([]);
  },
  subscribe: log.subscribe,
};

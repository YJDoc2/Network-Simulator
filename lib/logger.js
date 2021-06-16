import { writable } from 'svelte/store';

const log = writable([]);

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

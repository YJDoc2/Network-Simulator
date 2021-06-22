import { writable } from 'svelte/store';

const _packets = writable([]);

export const Packets = {
  add: (p) => {
    _packets.update((_p) => {
      _p.push(JSON.stringify(p));
      return _p;
    });
  },
  clear: () => {
    _packets.set([]);
  },
  subscribe: _packets.subscribe,
};

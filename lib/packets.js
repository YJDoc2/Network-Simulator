import { writable } from 'svelte/store';

const _packets = writable([]);

export const Packets = {
  add: (p) => {
    _packets.update((_p) => {
      _p.push(p);
      return _p.sort((p1, p2) => {
        return p1.id > p2.id;
      });
    });
  },
  clear: () => {
    _packets.set([]);
  },
  subscribe: _packets.subscribe,
};

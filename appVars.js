export const proto = document.querySelector('.proto');

export const app = {
  count: 100,
  enableApp: true,
  frame: null,
  movers: [],
  incrementor: 100,
  bodySize: document.body.getBoundingClientRect(),
  ballSize: proto.getBoundingClientRect(),
  maxHeight: null
};

export const maxWidth = 97; // 100vw - width of square (3vw)

export const distance = 3;
export const add = document.querySelector('.add');

import node from 'rollup-plugin-node-resolve';

export default [{
  input: 'main.js',
  output: {
    dir: './',
    name: 'Main',
    format: 'iife',
    entryFileNames: 'main.min.js'
  },
  plugins: [node()]
}, {
  input: 'optimized.js',
  output: {
    dir: './',
    name: 'Optimized',
    format: 'iife',
    entryFileNames: 'optimized.min.js'
  },
  plugins: [node()]
}];

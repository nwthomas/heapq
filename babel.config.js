export default {
  // Sets up support for TypeScript language features in Jest tests
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
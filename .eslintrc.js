export default {
    env: {
      node: true,  // or browser, depending on your environment
      mocha: true, // Enable Mocha globals (before, after, it, etc.)
    },
    extends: [
      'eslint:recommended',
      'plugin:mocha/recommended', // Enable Mocha linting rules
    ],
    plugins: ['mocha', 'sinon'],  // Enable plugins for Mocha and Sinon
    globals: {
      sinon: 'readonly',  // Ensure Sinon globals are recognized
    },
  };
  
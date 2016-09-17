/*eslint no-ignore*/

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  plugins: [
    'mocha'
  ],

  extends: '../.eslintrc.js',

  globals: {
    describe: true,
    it: true
  },

  rules: {
    'no-unused-expressions': OFF,

    'mocha/no-exclusive-tests': ERROR,
    'mocha/no-global-tests': ERROR,
    'mocha/no-pending-tests': ERROR,
    'mocha/no-skipped-tests': ERROR
  }
}

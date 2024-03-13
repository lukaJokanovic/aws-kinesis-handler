require('dotenv').config({ path: './.testenv' });

module.exports = {
  'require': 'ts-node/register',
  'color': true,
  'parallel': false,
  'ui': 'bdd',
  'watch-files': ['src/**/*.ts'],
  'watch-ignore': ['src/test/**'],
  'reporter': 'spec',
  'timeout': '5000',
};

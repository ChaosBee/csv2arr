module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'standard',
  env: {
    browser: true,
  },
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

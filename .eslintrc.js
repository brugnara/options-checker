module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: [
    'standard'
  ],
  rules: {
    'array-bracket-spacing':
      [
        'error',
        'never'
      ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

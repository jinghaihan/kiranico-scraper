import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
)

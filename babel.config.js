module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'module-resolver',
      'babel-plugin-styled-components',
      [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathSuffix: './src',
              rootPathPrefix: '~/',
            },
            {
              rootPathSuffix: './assets',
              rootPathPrefix: 'assets/',
            },
          ],
        },
      ],
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.svg'],
        },
      ],
      'react-native-reanimated/plugin',
    ]
  }
};

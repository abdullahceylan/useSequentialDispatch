const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.min.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    // fix for 'window is undefined' error
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: ['redux', 'react', 'react-redux'],
};

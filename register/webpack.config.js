const webpack = require('webpack');

module.exports = {
  // ...existing webpack configuration...
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};

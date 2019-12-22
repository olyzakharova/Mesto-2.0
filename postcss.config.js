/* eslint-disable global-require */
module.exports = {
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('autoprefixer'),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('cssnano')({
      preset: 'default',
    }),
  ],
};

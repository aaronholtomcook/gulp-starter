'use strict';

const gulp = require('gulp');
const {colors, log} = require('gulp-util');
const livereload = require('gulp-livereload');
const notifier = require('node-notifier');
const paths = require('../../config/paths');
const webpack = require('../../config/webpack');
const config = {
  webpack: require(paths.config.webpack)
};

gulp.task('scripts', (cb) => {
  let flag = true;

  return webpack(config.webpack, (err, stats) => {
    if (err || stats.compilation.errors.length > 0) {
      stats.compilation.errors.forEach((error) => log('[Webpack: Error]', error.hasOwnProperty('message') ? error.message : error));

      notifier.notify({
        message: stats.compilation.errors[0].hasOwnProperty('message') ? stats.compilation.errors[0].message : stats.compilation.errors[0],
        sound: true,
        title: '[Webpack: Error]',
        type: 'error'
      });

      if (flag) {
        flag = false;

        cb();
      }
    } else {
      log('[Webpack: Build]', stats.toString({
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: colors.supportsColor
      }));

      if (flag) {
        flag = false;

        cb();
      } else {
        livereload.reload();
      }
    }
  });
});

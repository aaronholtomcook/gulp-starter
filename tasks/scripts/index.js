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

gulp.task('scripts', (cb) => webpack(config.webpack, (err, stats) => {
  const multi = stats.hasOwnProperty('stats');
  let errorFlag = false;
  let flag = true;

  if (multi) {
    stats.stats.forEach(
      (instance) => {
        if (instance.compilation.errors.length > 0) {
          errorFlag = true;
        }
      }
    );
  } else {
    errorFlag = stats.compilation.errors.length > 0;
  }

  if (err || errorFlag) {
    if (multi) {
      stats.stats.forEach(
        (instance) => {
          instance.compilation.errors.forEach(
            (error) => log('[Webpack: Error]', error.hasOwnProperty('message') ? error.message : error)
          );

          notifier.notify({
            message: instance.compilation.errors[0].hasOwnProperty('message') ? instance.compilation.errors[0].message : instance.compilation.errors[0],
            sound: true,
            title: '[Webpack: Error]',
            type: 'error'
          });
        }
      );
    } else {
      stats.compilation.errors.forEach((error) => log('[Webpack: Error]', error.hasOwnProperty('message') ? error.message : error));

      notifier.notify({
        message: stats.compilation.errors[0].hasOwnProperty('message') ? stats.compilation.errors[0].message : stats.compilation.errors[0],
        sound: true,
        title: '[Webpack: Error]',
        type: 'error'
      });
    }

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
}));

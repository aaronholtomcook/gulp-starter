'use strict';

const gulp = require('gulp');
const {colors, log} = require('gulp-util');
const livereload = require('gulp-livereload');
const webpack = require('webpack');
const {notify} = require('node-notifier');
const paths = require('../../config/paths');
const config = {
  webpack: require(paths.config.webpack)
};

gulp.task('scripts', (cb) => {
  let flag = true;

  webpack(config.webpack, (err, stats) => {
    if (err || stats.compilation.errors.length > 0) {
      log('[Webpack: Error]', stats.compilation.errors);

      notify({
        message: stats.compilation.errors[0].message,
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
      }

      livereload();
    }
  });
});

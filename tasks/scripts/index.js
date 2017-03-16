'use strict';

const gulp = require('gulp');
const {log} = require('gulp-util');
const livereload = require('gulp-livereload');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const {notify} = require('node-notifier');
const paths = require('../../config/paths');
const config = {
  webpack: require(paths.config.webpack)
};

gulp.task('scripts', (cb) => {
  let flag = true;

  return webpackStream(config.webpack, webpack, (err, stats) => {
    if (err || stats.compilation.errors.length > 0) {
      log('[Webpack: Error]', stats.compilation.errors);

      notify({
        title: '[Webpack: Error]',
        message: stats.compilation.errors[0].message,
        sound: true,
        type: 'error'
      });

      if (flag) {
        flag = false;

        return cb();
      }
    } else {
      log('[Webpack: Build]', stats.toString({
        colors: gutil.colors.supportsColor,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: false,
        chunkOrigins: false
      }));

      if (flag) {
        flag = false;

        if (config.webpack.watch) {
          return cb();
        }
      } else {
        livereload();
      }
    }
  });
});

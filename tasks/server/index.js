'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = {
  nodemon: require('../../config/nodemon')
};

gulp.task('server', (cb) => {
  let started = false;

  return nodemon(config.nodemon).on('start', () => {
    if (!started) {
      cb();

      started = true;
    }
  });
});

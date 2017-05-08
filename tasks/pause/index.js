'use strict';

const gulp = require('gulp');
const config = {
  pause: require('../../config/pause')
};

gulp.task('pause', (callback) => setTimeout(callback, config.pause));

'use strict';

const gulp = require('gulp');
const sizereport = require('gulp-sizereport');
const {join} = require('path');
const paths = require('../../config/paths');
const config = {
  sizereport: require('../../config/sizereport')
};

gulp.task('size-report', () => gulp
  .src(join(paths.dest.base, '**/*'))
  .pipe(sizereport(config.sizereport)));

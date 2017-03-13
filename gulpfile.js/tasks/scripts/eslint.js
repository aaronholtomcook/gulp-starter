'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const mkdirp = require('mkdirp');
const {writeFileSync} = require('fs');
const {dirname} = require('path');
const paths = require('../../config/paths');

gulp.task('scripts:eslint', () => gulp
  .src(paths.src.scripts.files)
  .pipe(eslint(paths.lint.js))
  .pipe(eslint.format())
  .pipe(eslint.format('checkstyle', (results) => mkdirp(dirname(paths.reports.js), () => writeFileSync(paths.reports.js, results))))
  .pipe(gulpIf(process.env.NODE_ENV === 'production', eslint.failAfterError())));

'use strict';

const settings = require('../../config/settings');

if (settings.scripting === 'ts') {
  const gulp = require('gulp');
  const tslint = require('gulp-tslint');
  const reporter = require('gulp-tslint-jenkins-reporter');
  const paths = require('../../config/paths');
  const config = {
    tslint: require('../../config/tslint')
  };

  gulp.task('scripts:tslint', () => gulp
    .src(paths.src.scripts)
    .pipe(tslint(config.tslint.config))
    .pipe(tslint.report(config.tslint.report))
    .pipe(reporter(config.tslint.reporter)));
}

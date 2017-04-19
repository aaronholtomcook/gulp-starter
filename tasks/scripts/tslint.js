'use strict';

const settings = require('../../config/settings');

if (settings.scripting === 'ts') {
  const gulp = require('gulp');
  const linter = require('gulp-tslint');
  const reporter = require('gulp-tslint-jenkins-reporter');
  const typescript = require('typescript');
  const tslint = require('tslint');
  const paths = require('../../config/paths');
  const config = {
    tslint: require('../../config/tslint')
  };

  gulp.task('scripts:tslint', () => {
    const program = tslint.Linter.createProgram(paths.lint.ts, '.');

    typescript.getPreEmitDiagnostics(program);

    return gulp
      .src(paths.src.scripts, {
        base: '.'
      })
      .pipe(linter({
        program
      }))
      .pipe(linter.report(config.tslint.report))
      .pipe(reporter(config.tslint.reporter));
  });
}

'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const nunjucks = require('gulp-nunjucks-render');
const livereload = require('gulp-livereload');
const {readFileSync} = require('fs');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const settings = require('../../config/settings');
const config = {
  htmlmin: require('../../config/htmlmin'),
  inlinesource: require('../../config/inlinesource'),
  nunjucks: require('../../config/nunjucks')
};

gulp.task('templates', () => gulp
  .src(paths.src.templates.pages)
  .pipe(data(JSON.parse(readFileSync(paths.src.templates.data, 'utf8'))))
  .pipe(nunjucks(config.nunjucks))
  .pipe(inlinesource(config.inlinesource))
  .pipe(gulpIf(process.env.NODE_ENV === 'production' && settings.htmlmin, htmlmin(config.htmlmin))) // Minify html for production if enabled
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.base))
  .pipe(livereload()));

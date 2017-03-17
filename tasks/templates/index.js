'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const nunjucks = require('gulp-nunjucks-render');
const livereload = require('gulp-livereload');
const {readFileSync} = require('fs');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const settings = require('../../config/settings');
const config = {
  htmlmin: require('../../config/htmlmin'),
  nunjucks: require('../../config/nunjucks')
};

gulp.task('templates', () => gulp
  .src(paths.src.templates.pages)
  .pipe(data(JSON.parse(readFileSync(paths.src.templates.data, 'utf8'))))
  .on('error', errorHandler)
  .pipe(nunjucks(config.nunjucks))
  .on('error', errorHandler)
  .pipe(gulpIf(process.env.NODE_ENV === 'production' && settings.htmlmin, htmlmin(config.htmlmin))) // Minify html for production if enabled
  .pipe(gulp.dest(paths.dest.base))
  .on('end', livereload));

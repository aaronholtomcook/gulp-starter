'use strict';

const gulp = require('gulp');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const config = {
  iconfont: require('../../config/iconfont')
};

gulp.task('icons', () => gulp
  .src(paths.src.icons.svg)
  .pipe(iconfont(config.iconfont))
  .on('glyphs', (glyphs, options) => gulp
    .src(paths.src.icons.template)
    .pipe(consolidate('lodash', {
      codepoints: glyphs.map((glyph) => glyph
        .codepoint
        .toString(16)
        .toUpperCase()),
      fontName: options.fontName
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.src.icons.stylesheet)))
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.fonts)));

'use strict';

const gulp = require('gulp');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');
const {join} = require('path');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const config = {
  iconfont: require('../../config/iconfont')
};

gulp.task('icons', () => gulp
  .src(paths.src.icons.svg)
  .pipe(errorHandler())
  .pipe(iconfont(config.iconfont))
  .on('glyphs', (glyphs) => gulp
    .src(paths.src.icons.template)
    .pipe(errorHandler())
    .pipe(consolidate('lodash', {
      cssClass: 'icon',
      fontName: config.iconfont.fontName,
      fontPath: join(paths.dest.fonts.replace(paths.dest.base, ''), '/'),
      glyphs: glyphs.map((glyph) => ({
        codepoint: glyph.unicode[0].charCodeAt(0),
        name: glyph.name
      }))
    }))
    .pipe(gulp.dest(paths.src.icons.stylesheet)))
  .pipe(gulp.dest(paths.dest.fonts)));

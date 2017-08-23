'use strict';

const gulp = require('gulp');
const sasslint = require('gulp-sass-lint');
const mkdirp = require('mkdirp');
const {writeFile} = require('fs');
const {Writable} = require('stream');
const {dirname} = require('path');
const paths = require('../../config/paths');
const config = {
  sasslint: require('../../config/sasslint')
};
const highWaterMark = require('../../utilities/highWaterMark');

gulp.task('styles:lint', (cb) => {
  if (process.env.NODE_ENV === 'production') {
    return mkdirp(dirname(paths.reports.sass), () => {
      const file = Writable();
      let data = '';

      file._write = (chunk, encoding, next) => {
        data += chunk;

        next();
      };

      return gulp
        .src(paths.src.sass)
        .pipe(sasslint(config.sasslint))
        .pipe(sasslint.format(file))
        .pipe(highWaterMark())
        .on('finish', () => {
          data = data.replace(/<\?xml version="\d\.\d" encoding="utf-8"\?><checkstyle version="\d\.\d">/g, '');
          data = data.replace(/<\/checkstyle>/g, '');
          data = `<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3">${data}</checkstyle>`;

          writeFile(paths.reports.sass, data, () => cb());
        });
    });
  }

  return gulp
    .src(paths.src.sass)
    .pipe(sasslint(config.sasslint))
    .pipe(sasslint.format())
    .pipe(highWaterMark());
});

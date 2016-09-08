var gulp = require('gulp');
var paths = require('../../config/paths');
var eslint = require('gulp-eslint');

var config = {
  eslint: require('../../linting/.eslintrc')
};

function task () {
  return gulp.src([paths.src.js].concat(paths.server.lint))
    .pipe(eslint(config.eslint))
    .pipe(eslint.format())
    .pipe(eslint.format('checkstyle', function (output) {
      mkdirp(paths.reports.js, function() {
        fs.writeFileSync(paths.reports.js, output);
      });
    }));
}

gulp.task('lint-js', task);
module.exports = task;

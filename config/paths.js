'use strict';

var path = require('path');

module.exports = {
  node_modules: path.resolve('./node_modules'),
  package: path.resolve('./package.json'),
  src: {
    fonts: path.resolve('./src/fonts/**/*.+(eot|woff2|woff|ttf|svg)'),
    icons: path.resolve('./src/icons/**/*.svg'),
    images: path.resolve('./src/img/**/*.+(gif|jpg|jpeg|png)'),
    js: path.resolve('./src/js/**/*.js'),
    sass: path.resolve('./src/scss/**/*.+(scss|sass)'),
    ts: path.resolve('./src/ts/**/*.ts')
  },
  dest: {
    css: path.resolve('./dist/assets/css'),
    fonts: path.resolve('./dist/assets/fonts'),
    images: path.resolve('./dist/assets/img'),
    js: path.resolve('./dist/assets/js')
  },
  reports: {
    js: path.resolve('./reports/js/checkstyle.xml'),
    sass: path.resolve('./reports/sass/checkstyle.xml'),
    ts: path.resolve('./reports/ts/checkstyle.xml')
  },
  lint: {
    js: path.resolve(__dirname, '../linting/.eslintrc'),
    sass: path.resolve(__dirname, '../linting/.scss-lint.yml'),
    ts: path.resolve(__dirname, '../linting/tslint.json')
  }
};

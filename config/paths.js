'use strict';

var path = require('path');
var _ = require('lodash');
var config = require(path.resolve('./gulp.config.js')).paths;

var defaults = {
  config: {
    karma: path.resolve('./karma.conf.js'),
    protractor: path.resolve('./protractor.conf.js')
  },
  src: {
    copy: path.resolve('./src/copy/**/*.*'),
    favicons: {
      icon: path.resolve('./src/favicons/favicon.+(gif|jpg|jpeg|png)'),
      output: path.resolve('./src/html/partials/favicons.html')
    },
    fonts: path.resolve('./src/fonts/**/*.+(eot|woff2|woff|ttf|svg)'),
    icons: path.resolve('./src/icons/**/*.svg'),
    images: path.resolve('./src/img/**/*.+(gif|jpg|jpeg|png)'),
    js: {
      entry: {
        app: path.resolve('./src/js/index.js')
      },
      e2e: path.resolve('./src/js/**/*.e2e-spec.js'),
      scripts: path.resolve('./src/js/**/*.js'),
      unit: path.resolve('./src/js/**/*.spec.js'),
      watch: path.resolve('./src/js/**/*')
    },
    packages: {
      bower_components: path.resolve('./bower_components'),
      node_modules: path.resolve('./node_modules')
    },
    sass: path.resolve('./src/scss/**/*.+(scss|sass)'),
    templates: {
      data: path.resolve('./src/html/data/global.json'),
      manifest: path.resolve('./src/html/data/rev-manifest.json'),
      pages: path.resolve('./src/html/pages/**/*.html'),
      root: path.resolve('./src/html')
    },
    ts: {
      entry: {
        app: path.resolve('./src/ts/index.ts')
      },
      e2e: path.resolve('./src/ts/**/*.e2e-spec.ts'),
      scripts: path.resolve('./src/ts/**/*.ts'),
      unit: path.resolve('./src/ts/**/*.spec.ts'),
      watch: path.resolve('./src/ts/**/*')
    }
  },
  dest: {
    assets: path.resolve('./dist/assets'),
    base: path.resolve('./dist'),
    css: path.resolve('./dist/assets/css'),
    favicons: path.resolve('./dist/assets/favicons'),
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
    sass: path.resolve(__dirname, '../linting/.sass-lint.yml'),
    ts: path.resolve(__dirname, '../linting/tslint.json')
  }
};

module.exports = _.defaultsDeep(config, defaults);

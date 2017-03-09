'use strict';

const {join, resolve} = require('path');
const settings = require('./settings');
const config = require('../utilities/config');

const dist = (path = '') => join(resolve('./dist', path));
const reports = (path = '') => join(resolve('./reports', path));
const src = (path = '') => join(resolve('./src', path));
const temp = (path = '') => join(resolve('./temp', path));

const defaults = {
  config: {
    karma: resolve('./karma.conf.js'),
    protractor: resolve('./protractor.conf.js'),
    webpack: resolve('./webpack.config.js')
  },
  dest: {
    assets: dist('assets'),
    base: dist(),
    css: dist('assets/css'),
    favicons: dist('assets/favicons'),
    fonts: dist('assets/fonts'),
    images: dist('assets/img'),
    js: dist('assets/js')
  },
  lint: {
    js: resolve('./.eslintrc'),
    sass: resolve('./.sass-lint.yml'),
    ts: resolve('./tslint.json')
  },
  reports: {
    js: reports('js/checkstyle.xml'),
    sass: reports('sass/checkstyle.xml'),
    ts: reports('ts/checkstyle.xml')
  },
  revisions: temp('rev-manifest.json'),
  server: resolve(__dirname, '../utilities/server.js'),
  src: {
    copy: src('copy/**/*.*'),
    favicons: {
      icon: src('favicons/favicon.{gif|jpg|jpeg|png}'),
      output: src('html/partials/favicons.html')
    },
    fonts: src('fonts/**/*.{eot|woff2|woff|ttf|svg}'),
    icons: src('icons/**/*.svg'),
    images: src('img/**/*.{gif|jpg|jpeg|png|svg}'),
    packages: {
      npm: resolve('./node_modules')
    },
    sass: src('scss/**/*.{scss|sass}'),
    scripts: {
      entry: {
        app: src(`${settings.scripting}/index.${settings.scripting}`)
      },
      scripts: src(`${settings.scripting}/**/*.${settings.scripting}`),
      specs: {
        e2e: src(`${settings.scripting}/**/*.e2e-spec.${settings.scripting}`),
        unit: src(`${settings.scripting}/**/*.spec.${settings.scripting}`)
      },
      watch: src(`${settings.scripting}/**/*`)
    },
    templates: {
      data: src('html/data/global.json'),
      pages: src('html/pages/**/*.html'),
      root: src('html')
    }
  },
  temp: temp()
};

module.exports = config(defaults, 'paths');

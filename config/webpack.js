'use strict';

var webpack = require('webpack');
var paths = require('./paths');
var settings = require('./settings');

var config = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

// Scripting specific options
if (settings.scripting === 'ts') {
  // Typescript loader
  config.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', settings.angular2 ? 'angular2-template-loader' : null] // Use angular2-template-loader for angular 2 inline templates
  });
} else if (settings.scripting === 'es6') {
  // Babel loader for ES6
  config.module.loaders.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      presets: ['es2015']
    }
  });
}

// Angular specific options
if (settings.angular1) {
  // ng-annotate + template loader for angular 1
  config.module.loaders.push({
    test: /\.js$/,
    loader: 'ng-annotate'
  });
  config.module.loaders.push({
    test: /\.html$/,
    loader: 'ngtemplate?relativeTo=' + paths.src[settings.scripting === 'ts' ? 'ts' : 'js'].watch.replace('/**/*', '') + '/!html'
  });
} else if (settings.angular2) {
  // Template loader for angular 2
  config.module.loaders.push({
    test: /\.html$/,
    loader: 'html'
  });
}

// Environment options
if (process.env.NODE_ENV === 'development') {
  // Watch and add sourcemaps whilst developing
  config.watch = true;
  config.devtool = 'inline-source-map';
} else {
  // Uglify for production builds
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true
    },
    comments: false
  }));

  // No errors
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;

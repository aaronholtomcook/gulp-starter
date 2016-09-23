'use strict';

var webpack = require('webpack');
var path = require('path');
var paths = require('./paths');
var settings = require('./settings');
var scripting = settings.scripting === 'ts' ? 'ts' : 'js';

var config = {
  entry: paths.src[scripting].entry,
  output: {
    filename: '[name].js'
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

// Grab entry point names and determine if we need to dedupe
var entry = [];

for (var name in paths.src[scripting].entry) {
  entry.push(name);
}

// Dedupe if multiple entry points are being used
if (entry.length > 1) {
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: entry
  }));
}

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
    loader: 'ngtemplate?relativeTo=' + paths.src[scripting].watch.replace('/**/*', '') + '/!html'
  });
} else if (settings.angular2) {
  // Template loader for angular 2
  config.module.loaders.push({
    test: /\.html$/,
    loader: 'html'
  });
  config.htmlLoader = {
    minimize: true
  };
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

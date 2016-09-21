'use strict';

var webpack = require('webpack');
var settings = require('./settings');

var config = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

// Typescript loader
if (settings.scripting === 'ts') {
  config.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', settings.angular2 ? 'angular2-template-loader' : null] // Use angular2-template-loader for angular 2 inline templates
  });
}

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

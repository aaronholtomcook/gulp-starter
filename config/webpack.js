'use strict';

var webpack = require('webpack');
var path = require('path');
var paths = require('./paths');
var settings = require('./settings');
var scripting = settings.scripting === 'ts' ? 'ts' : 'js';
var root = paths.src[scripting].watch.replace('/**/*', '');

function includeClientPackages(packages, localModule) {
  return function(context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }

    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }

    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }

    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }

    return cb();
  };
}

var server = {
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      paths.src.packages.node_modules
    ]
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      },
      comments: false
    }),
    new webpack.NoErrorsPlugin()
  ],
  watch: process.env.NODE_ENV === 'development',
  entry: paths.src.server[scripting],
  output: {
    filename: 'www',
    libraryTarget: 'commonjs2'
  },
  node: {
    global: true,
    crypto: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: true
  },
  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  )
};

// Scripting specific options
if (settings.scripting === 'ts') {
  // Typescript loader
  server.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', 'angular2-template-loader'],
    exclude: [
      /\.e2e-spec\.ts$/
    ]
  });
} else if (settings.scripting === 'es6') {
  // Babel loader for ES6
  server.module.loaders.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      presets: ['es2015']
    }
  });
}

var client = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      paths.src.packages.node_modules
    ]
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

if (process.env.NODE_ENV === 'test') {
  // Overwrite tconfig to write sourcemaps for Istanbul to read
  client.ts = {
    compilerOptions: {
      sourceMap: false,
      inlineSourceMap: true
    }
  };

  // Make sure output plays nice with Istanbul
  client.module.postLoaders = [{
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: root,
    exclude: [
      /\.(e2e-spec|spec)\.ts$/,
      /node_modules/
    ]
  }];
} else {
  // Set entry point and output if we're not testing
  client.entry = paths.src[scripting].entry;
  client.output = {
    filename: '[name].js'
  };

  // Grab entry point names and determine if we need to dedupe
  var entry = [];

  for (var name in paths.src[scripting].entry) {
    if (paths.src[scripting].entry.hasOwnProperty(name)) {
      entry.push(name);
    }
  }

  // Dedupe if multiple entry points are being used
  if (entry.length > 1) {
    client.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: entry
    }));
  }
}

// Scripting specific options
if (settings.scripting === 'ts') {
  // Typescript loader
  client.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', settings.angular2 ? 'angular2-template-loader' : null], // Use angular2-template-loader for angular 2 inline templates
    exclude: [
      /\.e2e-spec\.ts$/
    ]
  });
} else if (settings.scripting === 'es6') {
  // Babel loader for ES6
  client.module.loaders.push({
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
  client.module.loaders.push({
    test: /\.js$/,
    loader: 'ng-annotate'
  });
  client.module.loaders.push({
    test: /\.html$/,
    loader: 'ngtemplate?relativeTo=' + root + '/!html'
  });
} else if (settings.angular2) {
  // Template loader for angular 2
  client.module.loaders.push({
    test: /\.html$/,
    loader: 'html-loader',
    options: {
      caseSensitive: true,
      minimize: true,
      removeAttributeQuotes: false
    }
  });
}

// Environment options
if (process.env.NODE_ENV === 'development') {
  // Watch and add sourcemaps whilst developing
  client.watch = true;
  client.devtool = 'inline-source-map';
} else if (process.env.NODE_ENV === 'test') {
  // Configure for testing
  client.devtool = 'inline-source-map';
} else {
  // Uglify for production builds
  client.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true
    },
    comments: false
  }));

  // No errors
  client.plugins.push(new webpack.NoErrorsPlugin());
}

exports.client = client;
exports.server = server;

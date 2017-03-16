'use strict';

const gulp = require('gulp');
const {log} = require('gulp-util');
const {spawn} = require('child_process');

gulp.task('scripts', (cb) => {
  const webpack = spawn('webpack');

  webpack.stdout.on('data', (data) => log(`stdout: ${data}`));

  webpack.stderr.on('data', (data) => log(`stderr: ${data}`));

  webpack.on('close', () => cb());
});

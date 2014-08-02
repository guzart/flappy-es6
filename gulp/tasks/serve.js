'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './dist/',
    },
    port: 8000
  });
});

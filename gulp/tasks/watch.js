'use strict';

var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.watch('./assets/audio/**/*', ['build-audio']);
  gulp.watch('./assets/fonts/**/*', ['build-fonts']);
  gulp.watch(['./assets/*.jpg', './assets/*.png'], ['build-images']);

  gulp.watch('./src/*.jade', ['build-markup']);
  gulp.watch('./src/scripts/**/*.js', ['build-scripts']);
  gulp.watch('./src/stylesheets/*.scss', ['build-stylesheets']);
});

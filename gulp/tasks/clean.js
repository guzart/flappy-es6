'use strict';

var clean = require('gulp-rimraf');
var gulp = require('gulp');

gulp.task('clean-all', [
  'clean-assets', 'clean-markup', 'clean-scripts', 'clean-stylesheets',
  'clean-uglified', 'clean-vendors'
]);

gulp.task('clean-assets', ['clean-audio', 'clean-fonts', 'clean-images']);

gulp.task('clean-audio', function () {
  gulp.src('./dist/assets/audio/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-fonts', function () {
  gulp.src('./dist/assets/fonts/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-images', function () {
  gulp.src(['./dist/assets/*.jpg', './dist/assets/*.png'], {read: false})
    .pipe(clean());
});

gulp.task('clean-markup', function () {
  gulp.src('./dist/*.html', {read: false})
    .pipe(clean());
});

gulp.task('clean-scripts', function () {
  gulp.src('./dist/js/game.js', {read: false})
    .pipe(clean());
});

gulp.task('clean-stylesheets', function () {
  gulp.src('./dist/css/*.css', {read: false})
    .pipe(clean());
});

gulp.task('clean-uglified', function () {
  gulp.src('dist/js/game.min.js', {read: false})
    .pipe(clean());
});

gulp.task('clean-vendors', function () {
  gulp.src('dist/js/phaser*', {read: false})
    .pipe(clean());
});

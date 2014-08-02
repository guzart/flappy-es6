'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');

var DEBUG = process.env.NODE_ENV === 'dev';

gulp.task('build', ['build-all']);

gulp.task('build-all', [
  'build-assets', 'build-markup', 'build-scripts', 'build-stylesheets',
  'build-vendors'
]);

gulp.task('build-assets', ['build-audio', 'build-fonts', 'build-images']);

gulp.task('build-audio', ['clean-audio'], function () {
  gulp.src('./assets/audio/**/*')
    .pipe(gulp.dest('./dist/assets/audio/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('build-fonts', ['clean-fonts'], function () {
  gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./dist/assets/fonts'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

var imagemin = require('gulp-imagemin');
gulp.task('build-images', ['clean-images'], function () {
  gulp.src(['./assets/**/*.jpg', './assets/**/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

var jade = require('gulp-jade');
var cfg = require('../../config');
gulp.task('build-markup', ['clean-markup'], function () {
  gulp.src('./src/*jade')
    .pipe(jade({
      pretty: DEBUG,
      data: {
        name: cfg.name,
        debug: DEBUG
      }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}));
});

var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');
gulp.task('build-scripts', ['lint', 'clean-scripts'], function () {
  browserify('./src/scripts/main.js', {debug: DEBUG})
    .transform(es6ify)
    .bundle()
    .on('error', function (err) {
      gutil.log(err.message);
    })
    .pipe(source('game.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

var sass = require('gulp-sass');
gulp.task('build-stylesheets', ['clean-stylesheets'], function () {
  gulp.src('./src/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

var ignore = require('gulp-ignore');
gulp.task('build-vendors', ['clean-vendors'], function () {
  gulp
    .src([
      './bower_components/traceur-runtime/traceur-runtime.min*',
      './bower_components/phaser-official/build/phaser*'
    ])
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./dist/js/'));
});

var linter = require('gulp-jshint');
gulp.task('lint', function () {
  gulp.src('./src/scripts/**/*.js')
    .pipe(linter())
    .pipe(linter.reporter('jshint-stylish'));
});

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
gulp.task('uglify', ['clean-uglified'], function () {
  gulp.src('./dist/js/game.js')
    .pipe(rename('game.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

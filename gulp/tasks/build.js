'use strict';

var browserSync = require('browser-sync');
var browserify = require('browserify');
var es6ify = require('es6ify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var ignore = require('gulp-ignore');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var linter = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var cfg = require('../../config');

var DEBUG = process.env.NODE_ENV === 'dev';

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

gulp.task('build-images', ['clean-images'], function () {
  gulp.src(['./assets/*.jpg', './assets/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

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

gulp.task('build-stylesheets', ['clean-stylesheets'], function () {
  gulp.src('./src/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build-vendors', ['clean-vendors'], function () {
  gulp
    .src([
      './bower_components/traceur-runtime/traceur-runtime.min*',
      './bower_components/phaser-official/build/phaser*'
    ])
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('lint', function () {
  gulp.src('./src/scripts/**/*.js')
    .pipe(linter())
    .pipe(linter.reporter('jshint-stylish'));
});

gulp.task('uglify', ['clean-uglified'], function () {
  gulp.src('./dist/js/game.js')
    .pipe(rename('game.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

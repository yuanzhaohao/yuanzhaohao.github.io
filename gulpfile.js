var gulp = require('gulp');
var code = require('gulp-code');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var open = require('gulp-open');
var less = require('gulp-less');
var del = require('del');
var path = require('path');

gulp.task('clean', function (cb) {
  del(['css'], cb);
});

gulp.task('less', function () {
  return gulp.src(['less/index.less'])
    .pipe(less())
    .pipe(code.lint())
    .pipe(gulp.dest('css'));
});
gulp.task('css', ['clean', 'less'], function () {
  return gulp.src(['css/index.css'])
    .pipe(code.lint())
    .pipe(rename(function (path) {
        path.basename = path.basename + '.min';
    }))
    .pipe(code.minify())
    .pipe(gulp.dest('css'));
});

gulp.task('connect', function () {
  return connect.server({
    root: ['./'],
    livereload: true,
    port: '3000'
  });
});
gulp.task('open', function () {
  return gulp.src('./index.html').pipe(open('', { url: 'http://localhost:3000'}));
});

gulp.task('default', ['clean', 'less', 'css']);
gulp.task('server', ['connect', 'open']);

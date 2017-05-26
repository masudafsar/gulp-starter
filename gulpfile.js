'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('default', [], function () {
    // write default tasks here
});

gulp.task('server', ['watch'], function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('build:css', [], function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('watch', [
    'watch:css'
]);

gulp.task('watch:css', [], function () {
    gulp.watch('./src/scss/**/*.scss', ['build:css']);
});

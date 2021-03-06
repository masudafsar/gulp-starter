'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');

gulp.task('default', [], function () {
    // write default tasks here
});

gulp.task('server', ['build', 'watch'], function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('build', [
    'build:css',
    'build:js',
    'build:html'
]);

gulp.task('build:css', [], function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('build:js', [], function () {});

gulp.task('build:html', [], function () {
    gulp.src('./pages/*.ejs')
        .pipe(ejs(null, null, {
            ext: '.html'
        }).on('error', gutil.log))
        .pipe(gulp.dest('./demo'))
        .pipe(connect.reload());
});

gulp.task('watch', [], function () {
    gulp.watch('./src/scss/**/*.scss', ['build:css']);
    gulp.watch('./src/js/**/*.js', ['build:js']);
    gulp.watch('./pages/**/*.ejs', ['build:html']);
});

gulp.task('clean', [
    'clean:demo',
    'clean:dist'
]);

gulp.task('clean:demo', [], function () {
    gulp.src([
        './demo/*',
        '!./demo/**/.keep'
    ], {read: false})
        .pipe(clean());
});

gulp.task('clean:dist', [], function () {
    gulp.src([
        './dist/css/*',
        './dist/font/*',
        './dist/js/*',
        '!./dist/**/.keep'
    ], {read: false})
        .pipe(clean());
});
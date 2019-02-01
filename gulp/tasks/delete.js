var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-cssnano'),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    sassLint    = require('gulp-sass-lint'),
    browserSync = require('browser-sync'),
    filter      = require('gulp-filter'),
    uglify      = require('gulp-uglify'),
    del         = require('del'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps');
runSequence = require('run-sequence');

//Deletes the dist folder at the start of the task
gulp.task('deletedist', function () {
    return del([
        'dist'
    ]);
});



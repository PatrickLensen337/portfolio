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



//Script Merges all the JS files in the assets JS folder, plugins and theme.js
gulp.task('scripts', function () {
    return gulp.src('assets/source/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
});

//moveVendor moves the files in assets/vendor
gulp.task('moveVendor', ['scripts'],  function () {
    return gulp.src('assets/js/vendor/*.js')
        .pipe(gulp.dest('dist/js'))
});


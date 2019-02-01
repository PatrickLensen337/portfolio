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
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    gulpSeq     =require('gulp-sequence');


//Runs the browserSync
gulp.task('server', ['deleteCSSDuplicates', 'moveVendor'],  function () {
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });

    gulp.watch('assets/source/scss/**/*.scss', ['styles']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['server']);

gulp.task('fireUpServer', function (cb) {
    gulpSeq('deletedist', 'styles', 'black', 'scripts', 'deleteCSSDuplicates', 'moveVendor', 'server');
});



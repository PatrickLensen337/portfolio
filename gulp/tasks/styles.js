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
//Saved Options

var sassOptions = {
    outputStyle: 'expanded'
};

var prefixerOptions = {
    browsers: ['last 2 versions']
};


//Styles task Generates SCSS into CSS and minify
gulp.task('styles', ['deletedist'], function () {
    return gulp.src('assets/source/scss/style.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(prefix(prefixerOptions))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())

});

//Black Task Generates minified version of the stylefont stylesheet
gulp.task('black', ['styles'], function () {
    return gulp.src('assets/fonts/icomoon/style.css')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(prefix(prefixerOptions))
        .pipe(rename('stylefont.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())

});

//deleteCSSDuplicates Deletes the duplicate stylesheets
gulp.task('deleteCSSDuplicates', ['black'], function () {
    return del ([
        'dist/css/stylefont.css', "dist/css/style.css", "dist/js/scripts.js"
    ]);
});


//Display Error during taskrunning
var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin.error.bold + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber.bold;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Basso"
    })(err);
    this.emit('end');
};
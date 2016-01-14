var gulp = require('gulp');
var del = require('del');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('clean', function (cb) {
    del([
        'build'
    ], cb);
});

gulp.task('sass',  function () {
    gulp.src('./app/all.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('webserver',  function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/app/index.html"
        }));
});

gulp.task('dev', ['clean', 'webserver', 'sass']);
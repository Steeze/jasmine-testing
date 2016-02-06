var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src('jasmine/spec/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('jasmine/spec/js/*.js', ['open']);
});

gulp.task('open', function() {
    gulp.src('')
        .pipe(server({
            livereload: false,
            directoryListing: false,
            open: true,
            port:8888
        }));
});

gulp.task('default', ['lint','open', 'watch']);
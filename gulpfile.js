var gulp = require('gulp');    
var concat = require('gulp-concat'); 
var react = require('gulp-react');
var moment = require('moment');
var sass = require('gulp-sass');

 

gulp.task('scripts', function() {  
    gulp.src(['src/*.js'])
	.pipe(react())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('build'))
})

gulp.task('styles', function() {
    gulp.src(['src/*.scss'])
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./css/'));
});

gulp.task('default', function() {  
    gulp.run('scripts');
    gulp.run('styles');

    gulp.watch('src/*.js', function(event) {
        gulp.run('scripts');
    });
    gulp.watch('src/*.scss', ['styles']);
})
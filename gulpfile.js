
var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');

var doctorMark = require('./index.js');

gulp.task('default', function() {
  gulp.src('./README.md')
    .pipe(doctorMark())
    .pipe(rename('test.html'))
    .pipe(gulp.dest('.'));
});



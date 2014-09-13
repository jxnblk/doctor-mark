
var gulp = require('gulp');
var rename = require('gulp-rename');

var mk = require('./mk');
var include = require('./lib/include');
var nav = require('./nav2');

var browserSync = require('browser-sync');

// For testing
var inject = require('gulp-inject');
var toc = require('gulp-toc');

gulp.task('default', function() {
  gulp.src('./**/README.md')
    .pipe(mk())
    .pipe(include())
    .pipe(nav())
    .pipe(rename(function(path) {
      path.dirname = path.dirname;
      path.basename = 'index';
      path.extname = '.html';
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
});

    //.pipe(mk({ cssLink: 'http://d2v52k3cl9vedd.cloudfront.net/basscss.min.css.gz' }))
 
// Test mustache style nav thing
//gulp.task('nav', function() {
//  gulp.src('./**/*.md')
//    .pipe(nav({ baseurl: '/base' }))
//    .pipe(rename('nav2.html'))
//    .pipe(gulp.dest('.'));
//});


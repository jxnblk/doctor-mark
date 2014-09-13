
var gulp = require('gulp');
var args = require('yargs').argv;
var rename = require('gulp-rename');
var drmk = require('./src/drmk');

// New version
gulp.task('default', function() {
  console.log(args.derp);
  gulp.src('./README.md')
    .pipe(drmk())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});


// Old version

//var connect = require('gulp-connect');

//var fs = require('fs');
//var markdown = require('gulp-markdown');
//var header = require('gulp-header');
//var footer = require('gulp-footer');
//var cheerio = require('gulp-cheerio');
//var toc = require('gulp-toc');

  // This is for HTML files
  //var pygmentize = require('./docs/gulp/pygments');

  //var markdownOptions = require('./gulp/markdown-options');
  //var include = require('./gulp/doctor-include');
  //var nav = require('./gulp/doctor-nav');


//gulp.task('markdown', function() {
//
//  gulp.src(['./**/*.md', '!./node_modules/**/*'])
//    .pipe(markdown(markdownOptions))
//    .pipe(header( fs.readFileSync('./docs/partials/header.html', 'utf8')))
//    .pipe(footer( fs.readFileSync('./docs/partials/footer.html', 'utf8')))
//    .pipe(toc())
//    .pipe(cheerio(include))
//    .pipe(rename(function(path) {
//      path.dirname = path.dirname;
//      path.basename = 'index';
//      path.extname = '.html';
//    }))
//    .pipe(gulp.dest('.'));
//
//});
//
//gulp.task('watch-markdown', ['markdown'], function() {
//  gulp.watch(['./**/*.md', './docs/partials/**/*.html', '!./node_modules/**/*'], ['markdown']);
//});
//
//
//gulp.task('serve', ['markdown'], function() {
//  connect.server();
//});
//
//gulp.task('default', ['watch-markdown', 'serve']);



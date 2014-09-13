// Create a nav based on all files in stream
// Replaces <!-- nav --> with links
// WIP

var through = require('through2');
var gutil = require('gulp-util');

var marked = require('marked');
var renderer = new marked.Renderer();
var cheerio = require('cheerio');
var fs = require('fs');
var pygmentize = require('pygmentize-bundled');

renderer.code = function(code, lang) { return code; };
//renderer.heading = '';
marked.highlight = function(code, lang, cb) {
  pygmentize({ lang: lang, format: 'html' }, code, function(err, result) {
    cb(err, result.toString());
  });
};

module.exports = function (options) {

  var options = options || {};
  var baseurl = options.baseurl || '.';
  var placeholder = options.placeholder || /<!--\s*nav\s*-->/gi;

  var cssurl = options.css || './src/basscore.min.css';

  var transform = function (file, enc, cb) {

    var self = this;

    var filestring = String(file.contents);
    var header = fs.readFileSync('./gulp/header.html', 'utf8');
    var footer = fs.readFileSync('./gulp/footer.html', 'utf8');
    var css = fs.readFileSync(cssurl);
    console.log(css);
    css = '<style>' + css + '</style>';

    html = marked(filestring);
    html = header + '\n' + html + '\n' + footer;

    var $ = cheerio.load(html);
    var title = $('h1').first().text();
    $('title').html(title);
    $('head').append(css);
    var $includes = $('[data-include]');
    $includes.each(function(i, elem) {
      var partial = $(this).attr('data-include');
    });
    file.contents = new Buffer($.html());
    self.push(file);
    cb();

    //cheerio.load(html, function($, done) {
    //  console.log('cheerio function');
    //  var $ = cheerio.load(html);
    //  var title = $('h1').first().text();
    //  $('title').html(title);
    //  $('head').append(css);

    //  var $includes = $('[data-include]');
    //  var isIncluded = 0;

    //  $includes.each(function(i, elem) {
    //    console.log('include');
    //    var partial = $(this).attr('data-include');
    //    var contents = fs.readFileSync(partial, 'utf8');
    //  });

    //  file.contents = new Buffer($.html());
    //  self.push(file);
    //  cb();
    //});

  };

  var flush = function(cb) {
    cb();
  };

  return through.obj(transform, flush);

};


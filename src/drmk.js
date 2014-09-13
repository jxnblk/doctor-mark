// Create html page from markdown with custom CSS
// and HTML example includes

var through = require('through2');
var gutil = require('gulp-util');

var marked = require('marked');
var renderer = new marked.Renderer();
var cheerio = require('cheerio');
var fs = require('fs');
var pygmentize = require('pygmentize-bundled');

renderer.code = function(code, lang) {
  return code + 'derpderp';
};
//renderer.heading = '';

//marked.setOptions({
//  highlight: function(code, lang, cb) {
//    pygmentize({ lang: lang, format: 'html' }, code, function(err, result) {
//      //return result.toString();
//      cb(err, result.toString());
//    });
//  }
//});

module.exports = function (options) {

  var options = options || {};
  var baseurl = options.baseurl || '.';
  //var placeholder = options.placeholder || /<!--\s*nav\s*-->/gi;

  var cssurl = options.css || './src/basscore.min.css';

  var transform = function (file, enc, cb) {

    var self = this;

    var filestring = String(file.contents);
    var header = fs.readFileSync('./gulp/header.html', 'utf8');
    var footer = fs.readFileSync('./gulp/footer.html', 'utf8');
    var css = fs.readFileSync(cssurl, 'utf8');
    css = '<style>' + css + '</style>';

    html = marked(filestring);
    html = header + '\n' + html + '\n' + footer;

    var $ = cheerio.load(html);
    var title = $('h1').first().text();
    $('title').html(title);
    $('head').append(css);
    var $includes = $('[data-include]');
    var isIncluded = 0;

    $includes.each(function(i, elem) {
      var $self = $(this);
      var partial = $(this).attr('data-include');
      var contents = fs.readFileSync(partial, 'utf8');
      console.log('contents ' + i, contents);
      var isHighlighted = typeof $(this).data('include-code') !== 'undefined';
      if (isHighlighted) {
        var div = $('<div></div>');
        pygmentize({ lang: 'html', format: 'html' }, contents, function(err, result) {
          var code = result.toString();
          $(div).append(contents).append(code);
          $self.html(div);
          isIncluded++;
          check();
        });
      } else {
        $(this).html(contents);
        isIncluded++;
        check();
      }
    });

    function check() {
      console.log(isIncluded);
      if (isIncluded < $includes.length) return false;
      console.log('all included');
      file.contents = new Buffer($.html());
      self.push(file);
      cb();
    };

  };

  var flush = function(cb) {
    cb();
  };

  return through.obj(transform, flush);

};


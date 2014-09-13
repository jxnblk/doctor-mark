
var through = require('through2');
var util = require('gulp-util');
var fs = require('fs');

var cheerio = require('cheerio');
var pygmentize = require('pygmentize-bundled');

module.exports = function(options) {

  return through.obj(function(file, enc, cb) {

    var self = this;
    var $ = cheerio.load(file.contents.toString());
    var $includes = $('[data-include]');
    var isIncluded = 0;

    function check() {
      if (isIncluded >= $includes.length) {
        console.log(typeof($.html()));
        file.contents = new Buffer($.html());
        self.push(file);
        cb();
      }
    };

    $includes.each(function(i) {

      var $self = $(this);
      var path = $(this).data('include');
      var partial = fs.readFileSync(path, 'utf8');
      var isHighlighted = typeof $(this).data('highlight') !== 'undefined';

      if (isHighlighted) {
        pygmentize({ lang: 'html', format: 'html' }, partial, function(err, result) {
          var div = $('<div></div>');
          $(div).addClass('dm-include-example').append('\n' + partial);
          var code = $(result.toString());
          $(code).addClass('dm-include-code');
          $self.before('\n').html('').append('\n' + div).append('\n' + code).addClass('dm-include');
          isIncluded++;
          check();
        });
      } else {
        $(this).html(partial);
        isIncluded++;
        check();
      }

    });

  });

};


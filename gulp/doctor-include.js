// Cheerio function to replace elements with data-include attributes
// with HTML code snippets and highlighted code block

// TO DO: Make this a standalone gulp plugin

var fs = require('fs');
var pygmentize = require('pygmentize-bundled');
var gutil = require('gulp-util');

module.exports = function($, done) {

  var $includes = $('[data-include]');
  var isIncluded = 0;

  if (!$includes.length) {
    done();
  }

  var checkIfDone = function() {
    isIncluded++;
    if (isIncluded >= $includes.length) {
      done();
    }
  };

  var highlight = function(html, cb) {
    pygmentize({ lang: 'html', format: 'html' }, html, function(err, result) {
      if (err) { 
        gutil.log(gutil.colors.red(err));
        return;
      }
      cb(result.toString());
    });
  };


  $includes.each(function(i, elem) {

    var partial = $(this).attr('data-include');
    var html = fs.readFileSync(partial, 'utf8')
    var isHighlighted = typeof $(this).data('highlight') !== 'undefined';
    var $self = $(this);

    if (isHighlighted) {
      var div = $('<div></div>');
      $(div).addClass('dr-include-example')
        .append(html);
      highlight(html, function(code) {
        var $code = $(code).addClass('dr-include-code');
        $self.html(div)
          .append($code)
          .addClass('dr-include');
        checkIfDone();
      });
    } else {
      $self.html(html);
      checkIfDone();
    }

  });


};


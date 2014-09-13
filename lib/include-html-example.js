
var fs = require('fs');
var cheerio = require('cheerio');
var pygmentize = require('pygmentize-bundled');

module.exports = function(string, options, callback) {
  
  var $ = cheerio.load(string);
  var $includes = $('[data-include-example]');
  var isIncluded = 0;

  function finish() {
    if (isIncluded >= $includes.length) {
      callback($.html());
    }
  }

  $includes.each(function(i) {

    var $self = $(this);
    var path = $(this).data('include-example');
    var partial = fs.readFileSync(path, 'utf8');

    pygmentize({ lang: 'html', format: 'html' }, partial, function(err, result) {

      var div = $('<div></div>');
      var code = $(result.toString());

      $(div).addClass('DM-example_rendered')
        .append('\n' + partial);
      $(code).addClass('DM-example_code');
      $self.before('\n')
        .html('')
        .append('\n' + div)
        .append('\n' + code)
        .addClass('DM-example');

      isIncluded++;
      finish();

    });

  });

};


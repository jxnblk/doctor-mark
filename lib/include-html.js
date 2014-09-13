
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = function(string, options) {

  var $ = cheerio.load(string);
  var $includes = $('[data-include]');

  $includes.each(function(i) {
    var path = $(this).data('include');
    var partial = fs.readFileSync(path, 'utf8');
    $(this).html(partial);
  };

  return $.html();

};


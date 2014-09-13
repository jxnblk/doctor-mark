
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(html, options) {

  var $ = cheerio.load(html);

  var options = options || {};
  var css = options.styles || __dirname + '/basscore.min.css';
  var cssURL = options.stylesheet || null;

  if (!cssURL) {
    var style = fs.readFileSync(css, 'utf8');
    style = $( '<style>' + style + '</style>' );
    $('head').append( '  ' + style + '\n' );
  }

  if (cssURL) {
    var link = $('<link rel="stylesheet">');
    $(link).attr('href', cssURL);
    $('head').append( '  ' + link + '\n' );
  }
 
  return $.html();

};


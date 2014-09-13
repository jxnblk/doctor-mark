/*
  
   Doctor Mark
   Recipe for converting Markdown strings to simple HTML
   pages for documentation

*/

var fs = require('fs');
var marked = require('marked');
var cheerio = require('cheerio');

var include = require('./lib/include');
var example = require('./lib/include-example');
var css = require('./lib/include-css');

marked.setOptions(require('./lib/marked-options');

module.exports = function(string, options) {

  var options = options || {};
  var header = fs.readFileSync('lib/header.html');
  var footer = fs.readFileSync('lib/footer.html');

  marked(string, function(err, html) {

    html = header + '\n' + html + '\n' + footer;
    html = css(html, options);

    var $ = cheerio.load(html);
    var title = $('h1').first().text();
    $('title').html(title);

    return $.html();

  });

};


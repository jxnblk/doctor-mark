/*
  
   Doctor Mark

   *WIP*
   For converting Markdown strings to simple HTML
   pages for documentation

*/

var fs = require('fs');
var path = require('path');
var through = require('through2');
var marked = require('marked');
var cheerio = require('cheerio');

var include = require('./lib/include-html');
var example = require('./lib/include-html-example');
var css = require('./lib/include-css');
var header = fs.readFileSync('lib/header.html', 'utf8');
var footer = fs.readFileSync('lib/footer.html', 'utf8');


marked.setOptions(require('./lib/marked-options'));

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, enc, callback) {

    var self = this;
    var string = file.contents.toString();

    var html = marked(string);
    html = header + '\n' + html + '\n' + footer;
    html = include(html);
    html = css(html, options);

    var $ = cheerio.load(html);
    var title = $('h1').first().text();
    $('title').html(title);


    example($.html(), {}, function(result) {
      file.contents = new Buffer(result);
      var filename =  path.basename(file.path, path.extname(file.path)) + '.html';
      file.path = path.join(path.dirname(file.path), filename);
      self.push(file);
      callback();
    });

  });

};

// Options for gulp markdown

var marked = require('marked');
var pygmentize = require('pygmentize-bundled');

var renderer = new marked.Renderer();

renderer.code = function(code, lang) { return code; };

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return '<h' + level + ' id="' + escapedText + '"><a href="#' + escapedText + '">' + text + '</a></h' + level + '>';
};


module.exports = {
  highlight: function (code, lang, callback) {
    pygmentize({ lang: lang, format: 'html' }, code, function(err, result) {
      callback(err, result.toString());
    });
  },
  renderer: renderer
};


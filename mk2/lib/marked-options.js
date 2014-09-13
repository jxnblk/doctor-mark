
var marked = require('marked');
var pygmentize = require('pygmentize-bundled');

var renderer = new marked.Renderer();

renderer.code = function(code, lang) {
  code = '\n' + code + '\n';
  return code;
};

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return '<h' + level + ' id="' + escapedText + '"><a href="#' + escapedText + '">' + text + '</a></h' + level + '>\n';
};

module.exports = {

  renderer: renderer,

  highlight: function(code, lang, callback) {
    pygmentize({ lang: lang, format: 'html' }, code, function(err, result) {
      if (callback && result) {
        callback(err, result.toString());
      } 
    });
  }

};


/*
  
   Doctor Mark

   For converting Markdown strings to simple HTML
   pages for documentation

*/

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var markedExample = require('marked-example');

var renderer = new marked.Renderer();

module.exports = function(md, options) {

  var options = _.defaults(options, {
    template: fs.readFileSync('', 'utf8'),
  });

};

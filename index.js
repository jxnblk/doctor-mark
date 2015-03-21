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
var toc = require('markdown-toc');
var mdast = require('mdast');


var renderer = new marked.Renderer();
renderer.code = markedExample({
  classes: {
    container: 'mb2 bg-darken-1 rounded',
    rendered: 'p2',
    code: 'm0 p2 bg-darken-1 rounded-bottom'
  }
});

renderer.heading = function (text, level) {
  var name = _.kebabCase(text);
  var result;
  if (level < 4) {
    result =
      '<h' + level + ' id="' + name + '">'+
        '<a href="#' + name + '">'+ text + '</a>'+
      '</h' + level + '>';
  } else {
    result = '<h' + level + '>' + text + '</h' + level + '>';
  }
  return result;
}


module.exports = function(src, options) {

  var options = _.defaults(options, {
    template: fs.readFileSync(path.join(__dirname, './template.html'), 'utf8'),
    stylesheets: ['http://d2v52k3cl9vedd.cloudfront.net/bassdock/1.2.1/bassdock.min.css'],
    javascripts: [],
    base_url: '/',
    title: false,
    name: '',
    author: '',
    version: '',
    description: '',
    keywords: [],
    homepage: false,
    npm: true,
    stripHeader: true,
    // header: '',
    // footer: '',
  });
  var tpl;
  var html;


  tpl = _.template(options.template);

  function getFirst(type, root) {
    var index = _.findIndex(root.children, { type: type });
    var first = root.children.splice(index, 1)[0];
    var md = mdast.stringify(first);
    var html = marked(md);
    return html;
  }


  options.title = options.title || _.capitalize(options.name);
  options.ast = mdast.parse(src);
  options.firstHeading = getFirst('heading', options.ast);
  options.firstParagraph = getFirst('paragraph', options.ast);
  // JSON helper function
  options.json = function(obj) {
    return JSON.stringify(obj, null, 2);
  };
  options.toc = toc(src).json;

  if (options.stripHeader) {
    src = mdast.stringify(options.ast);
  }

  options.content = marked(src, { renderer: renderer });

  function html() {
    return tpl(options);
  }

  return {
    html: html,
    content: options.content,
  }

};


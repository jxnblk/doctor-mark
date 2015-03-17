/*
  
   Doctor Mark

   For converting Markdown strings to simple HTML
   pages for documentation

*/

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var markedExample = require('marked-example');

var Remarkable = require('remarkable');
var md = new Remarkable({
  html: true,
  linkify: true,
  highlight: markedExample({
    classes: {
      container: 'mb2 bg-darken-1 rounded',
      rendered: 'p2',
      code: 'm0 p2 bg-darken-1 rounded-bottom'
    }
  }),
});


// Marked
var marked = require('marked');
var renderer = new marked.Renderer();
renderer.code = markedExample({
  classes: {
    container: 'mb2 bg-darken-1 rounded',
    rendered: 'p2',
    code: 'm0 p2 bg-darken-1 rounded-bottom'
  }
});
renderer.heading = function (text, level) {
  var name = text.toLowerCase().replace(/[^\w]+/g, '-');
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
    homepage: '',
    npm: true,
  });
  var tpl;
  var html;

  var markedOptions = {
    renderer: renderer,
  };

  options.title = options.title || _.capitalize(options.name);

  tpl = _.template(options.template);
  options.content = marked(src, markedOptions);

  // Testing remarkable
  //options.content = md.render(src);
  // issues:
  // - linkify does not work
  // - wraps all code blocks in code tag - doesn't work with marked-example

  html = tpl(options);

  return html;

};


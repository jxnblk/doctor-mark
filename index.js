/*
  
   Doctor Mark

   For converting Markdown strings to simple HTML
   pages for documentation

*/

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Remarkable = require('remarkable');
var toc = require('markdown-toc');

var example = require('./lib/remarkable-example');
var headings = require('./lib/headings');

var md = new Remarkable({
    html: true,
    linkify: true,
  })
  //.use(headings)
  .use(example);


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

  options.title = options.title || _.capitalize(options.name);

  tpl = _.template(options.template);

  options.toc = toc(src).json;

  // Remarkable
  options.content = md.render(src)
  html = tpl(options);
  return html;

};


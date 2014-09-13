
var through = require('through2');
var util = require('gulp-util');
var fs = require('fs');
var marked = require('marked');
var cheerio = require('cheerio');

var markedOptions = require('./lib/marked-options');
var css = require('./lib/include-css');

marked.setOptions(markedOptions);


module.exports = function(options) {

  var options = options || {};

  var header = fs.readFileSync('lib/header.html', 'utf8');
  var footer = fs.readFileSync('lib/footer.html', 'utf8');

  return through.obj(function(file, enc, cb) {

    var self = this;

    if (file.isNull()) {
      cb(null, file);
      return;
    }

    marked(file.contents.toString(), function(err, html) {
      html = header + '\n' + html + '\n' + footer;
      html = css(html, options);
      
      var $ = cheerio.load(html);
      var title = $('h1').first().text();
      $('title').html(title);

      file.contents = new Buffer($.html());
      file.path = util.replaceExtension(file.path, '.html');
      self.push(file);
      cb();

    });

  });

};


// Create a nav based on all files in stream
// Replaces <!-- nav --> with links
// WIP

var through = require('through2');
var gutil = require('gulp-util');
var cheerio = require('cheerio');
var replacestream = require('replacestream');

var config = require('./config');


module.exports = function (options) {

  var files = [];
  var html = '';
  var defaults = options || {};
  var placeholder = defaults.placeholder || /<!--\s*nav\s*-->/gi;

  var transform = function (file, enc, cb) {

    var filestring = String(file.contents);
    var $ = cheerio.load(filestring);
    var title = $('h1').first().text();

    var path = config.baseurl + '/' + file.relative.substring(0, file.relative.lastIndexOf('/'));
    html += '<a href="' + path + '">' + title + '</a>\n';

    files.push(file);
    cb();

  };

  var flush = function(cb) {

    gutil.log(gutil.colors.magenta('Nav created'));

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var isStream = file.contents && typeof file.contents.on === 'function' && typeof file.contents.pipe === 'function';
      var isBuffer = file.contents instanceof Buffer;
      if (isBuffer) {
        file.contents = new Buffer(String(file.contents).replace(placeholder, html));
      } else {
        gutil.log(gutil.colors.red('idk'));
      }
      this.push(file);
    };

    cb();

  };

  return through.obj(transform, flush);

};


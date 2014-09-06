// WIP
// This does not work yet

var through = require('through2');
var gutil = require('gulp-util');
var cheerio = require('cheerio');
var replacestream = require('replacestream');

var config = require('./config');


module.exports = function (options) {

  var files = [];
  var html = '';
  var defaults = options || {};
  var placeholder = defaults.placeholder || /<!--\s*drdiv\s*-->/gi;

  var transform = function (file, enc, cb) {

    var filestring = String(file.contents);
    var $ = cheerio.load(filestring);
    var title = $('h1').first().text();

    var test = 'derp';

    file.contents = new Buffer(String(file.contents).replace(placeholder, test));

    this.push(file);
    cb();

  };

  return through.obj(transform);

};


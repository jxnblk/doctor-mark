
var through = require('through2');
var util = require('gulp-util');
var fs = require('fs');

var cheerio = require('cheerio');
//var mustache = require('mustache');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, enc, cb) {

    var string = file.contents.toString();
    var path = '/' + file.relative.substring(0, file.relative.lastIndexOf('/'));
    var $ = cheerio.load(string);

    var $navitems = $('[data-nav-item]');
    $navitems.each(function(i, $navitem) {
      var href = $(this).attr('href');
      console.log('navitem', path, href, path == href);
      if (path == href) {
        $(this).addClass('active');
      }
    });

    file.contents = new Buffer($.html());
    this.push(file);
    cb();

  }, function(cb){


  });

};



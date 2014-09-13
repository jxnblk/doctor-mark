
var through = require('through2');
var util = require('gulp-util');
var fs = require('fs');

var cheerio = require('cheerio');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, enc, cb) {

    var string = file.contents.toString();


    //file.contents = new Buffer(string);
    this.push(file);
    cb();

  });

};



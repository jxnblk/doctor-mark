
var through = require('through2');
var util = require('gulp-util');
var fs = require('fs');

//var cheerio = require('cheerio');

module.exports = function(options) {

  var options = options || {};

  return through.obj(function(file, enc, cb) {

    var string = file.contents.toString();

    var bars = string.match(/{{\s*[\w\.]+\s*}}/g);
    if (!bars) {
      cb();
      return;
    }
    bars.map(function(bar) {
      var x = bar.match(/[\w\.]+/)[0];
      var value = options[x] || null;
      if (x == 'isactive') {
        console.log('isactive', file.base);
        var path = file.relative.substring(0, file.relative.lastIndexOf('/'));
        console.log('path', path);
      } else {
        if (!value) return;
        string = string.replace(x, value);
      }
    });

    file.contents = new Buffer(string);
    this.push(file);
    cb();


  });

};



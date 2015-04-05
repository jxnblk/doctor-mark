#!/usr/bin/env node

var _ = require('lodash');
var program = require('commander');
var doctor = require('..');
var fs = require('fs');
var path = require('path');

var version = require('../package.json').version;
var config = {};


program
  .version(version)
  .option('[src] [dest]', 'Source folder and destination folder')
  .parse(process.argv);

function writeFile(html, dest) {
  fs.writeFileSync(dest + '/index.html', html);
  console.log('File written to ' + dest);
}

function readSource(src) {
  var readme = fs.readFileSync(path.join(src, '/README.md'), 'utf8');
  if (fs.existsSync(path.join(src, 'package.json'))) {
    var pkg = JSON.parse( fs.readFileSync(path.join(src, '/package.json'), 'utf8') );
  } else {
    var pkg = {};
  }
  return {
    readme: readme,
    pkg: pkg
  };
}


if (program.args) {
  var src = program.args[0] || '.';
  var dest = program.args[1] || '.';
  var content = readSource(src);
  var readme = content.readme;
  var data = content.pkg;

  if (data.doctor_mark) {
    _.assign(data, data.doctor_mark);
  }
  if (fs.existsSync(path.join(src, data.template))) {
    data.template = fs.readFileSync(path.join(src, data.template), 'utf8');
  }

  try {
    var html = doctor(readme, data).html();
    writeFile(html, dest);
  } catch(e) {
    console.error(e);
  }
}


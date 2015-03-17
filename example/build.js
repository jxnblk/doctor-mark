// Example build script

var fs = require('fs');
var path = require('path');
var doctorMark = require('..');
var pkg = require('../package.json');
var readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');

var html = doctorMark(readme, pkg);

fs.writeFileSync('./index.html', html);


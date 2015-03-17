# Doctor Mark

An Automatic Page Generation Tool http://jxnblk.com/doctor-mark

```bash
npm install doctor-mark
```

## Features
- Converts markdown to HTML
- Includes `marked-example` to convert HTML code blocks to live examples with rendered HTML
- Linkable headings
- TOC
- Custom template option using lodash templates
- Custom stylesheets and script tag options
- Use `package.json` as a data source for:
  - Page title
  - Meta description
  - Meta author
  - Meta keywords
  - Github link
  - NPM link

## Getting Started

Create a custom build script in your repo, requiring doctor-mark.

```js
// build.js
var fs = require('fs');
var path = require('path');
var doctorMark = require('doctor-mark');
var pkg = require('./package.json');
var readme = fs.readFileSync(path.join(__dirname, './README.md'), 'utf8');

var html = doctorMark(readme, pkg);
fs.writeFileSync('./index.html', html);
```

Add an NPM run script to package.json

```json
"scripts": {
  "start": "node build"
}
```

## HTML Example Demo

```html
<h1 class="h2">Hamburger</h1>
<p>This will be converted to a live code example.</p>
```


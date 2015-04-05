# Doctor Mark

An Automatic Page Generation Tool <http://jxnblk.com/doctor-mark>

## Features
- Converts markdown to a full templated HTML page
- Includes `marked-example` to convert HTML code blocks to live examples with rendered HTML
- Linkable headings
- TOC
- Custom template option using lodash templates
- Custom stylesheets and script tag options
- Uses `package.json` as a data source for:
  - Page title
  - Meta description
  - Meta author
  - Meta keywords
  - GitHub link
  - npm link

## Getting Started

### Install

```bash
npm install doctor-mark
```

### CLI

```bash
doctor-mark ./src ./dest
```

If source and destination folder arguments are omitted, the `README.md` and `package.json` files in the current folder will be read, and `index.html` will be rendered to the same folder.

```bash
doctor-mark
```

Options can be added to `package.json` in a `doctor-mark` object.


### Javascript

Create a custom build script in your repo, requiring doctor-mark.

```js
// build.js
var fs = require('fs');
var path = require('path');
var doctorMark = require('doctor-mark');
var pkg = require('./package.json');
var readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');

var html = doctorMark(readme, pkg).html();
fs.writeFileSync('./index.html', html);
```

Optionally add an npm run script to package.json

```json
"scripts": {
  "start": "node build"
}
```

## HTML Example Demo

```html
<h1 class="h1">Hamburger</h1>
<p>This will be converted to a live code example.</p>
```

## Options

### template
Lodash template string – will be converted to a template function.

### stylesheets
Array of stylesheets to be inserted into the head element. Defaults to [Bassdock](http://jxnblk.com/bassdock) CDN.

### javascripts
Array of scripts to be inserted at the end of the body element.

### base_url
Base URL path for links.

### title
Humanized title for the title element.

### name
Hyphenated name of the module/repo.

### author
Author to be inserted in a meta tag.

### version
Version to be rendered in the footer.

### description
Description to be inserted in a meta tag.

### keywords
Keywords to be inserted in a meta tag.

### homepage
GitHub repo URL to be inserted in the header and footer.

### npm
(*boolean*) Creates an npm link in the header and footer based on `name`.
Defaults to `true`.

### stripHeader
(*boolean*)
Removes the first heading and paragraph from the main content area to be used in the header.
Defaults to `true`.


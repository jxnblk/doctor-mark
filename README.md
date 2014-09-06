# Doctor Mark

A Gulp-Powered Automatic Page Generation Tool

_Work in Progress_

---

**Table of Contents**

<!-- toc -->

---

Doctor Mark takes README.md files and creates styled pages for use on gh-pages branches.

## Features
- Custom header and footers
- Table of contents generator
- Include HTML files inline
- Include HTML code examples

---

## Highlighted Code Examples

By including a bit of markup in your README.md, you can include live HTML code examples.
Take a look at the README.md file on Github to see how it works

<div data-include="docs/examples/highlight.html" data-highlight>
  <a href="docs/examples/headings.html">Fallback Link to Headings Example</a>
</div>

### Example
<div data-include="docs/examples/headings.html" data-highlight></div>

## HTML Partial Include
Include HTML partials without highlighted code by omitting the `data-highlight` attribute.

<div data-include="docs/examples/headings.html"></div>


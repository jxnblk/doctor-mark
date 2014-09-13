# Doctor Mark

A Gulp-Powered Automatic Page Generation Tool

_Work in Progress_

---

<!-- toc -->

Doctor Mark takes README.md files and creates styled pages for use on gh-pages branches.

## Features
- Custom header and footers
- Table of contents generator
- Include HTML files inline
- Include HTML code examples

---

```html
<div>Just some code block in markdown</div>
```

## Highlighted Code Examples

By using a bit of markup in your README.md, you can include live HTML code examples.
Take a look at the README.md file on Github to see how it works

<!--
<div data-include="docs/examples/highlight.html" data-include-code>
  <a href="docs/examples/headings.html">Fallback Link to Headings Example</a>
</div>
-->

### Example
<div data-include="docs/examples/headings.html" data-include-code></div>

## HTML Partial Include
Include HTML partials without highlighted code by omitting the `data-highlight` attribute.

<div data-include="docs/examples/headings.html"></div>

---

# Options Notes
- `css` - file path to inline styles
- `cssURL` - url for stylesheet link tag

---

# To Do
- Styles for DM-example component
- Style for TOC
- Add themes option


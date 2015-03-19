// Attempt to make remarkable plugin

var markedExample = require('marked-example');

var exampleOptions = {
  classes: {
    container: 'mb2 bg-darken-1 rounded',
    rendered: 'p2',
    code: 'm0 p2 bg-darken-1 rounded-bottom'
  }
};

module.exports = function(md) {
  md.renderer.rules.fence = function(tokens, idx, options, env, self) {
    var token = tokens[idx];
    var fenceName = token.params.split(/\s+/g)[0];
    var highlighted = markedExample(exampleOptions)(token.content, fenceName);
    return highlighted;
  };
};


// Example code from https://github.com/jonschlinkert/remarkable/issues/58
// module.exports = function(self) {
//   self.inline.ruler.after(your_rule_fn);
//   self.renderer.rules.mention = your_render_fn;
// }
//

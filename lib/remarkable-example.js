// HTML Code Example Plugin

var markedExample = require('marked-example');

var exampleOptions = {
  classes: {
    container: 'mb2 bg-darken-1 rounded',
    rendered: 'p2',
    code: 'm0 p2 bg-darken-1 rounded-bottom'
  }
};

module.exports = function(self) {

  function highlight(tokens, idx, options, env, self) {
    var token = tokens[idx];
    var fenceName = token.params.split(/\s+/g)[0];
    var highlighted = markedExample(exampleOptions)(token.content, fenceName);
    return highlighted;
  }

  self.renderer.rules.fence = highlight;
};



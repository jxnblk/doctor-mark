// Linked Headings Plugin


module.exports = function(self) {

  function headingLinkOpen(tokens, idx, options, env, self) {
    var token = tokens[idx];
    var text = tokens[idx + 1];
    tokens[idx + 1] = '<a href="#">' + text + '</a>'
    console.log('content', text);
    return '<h' + token.hLevel + '>';
  }

  function headingLinkClose(tokens, idx, options, env, self) {
    var token = tokens[idx];
    return '</h' + token.hLevel + '>';
  }

  self.renderer.rules.heading_open = headingLinkOpen;
  self.renderer.rules.heading_close = headingLinkClose;

};


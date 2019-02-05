const tags = require('../../routes/tags/all')
module.exports = class {
  onInput(input, out) {
    input.tags = tags;

  }

}

const tags = require('../../routes/tags')
module.exports = class {
  onInput(input, out) {
    input.tags = tags;

  }

}

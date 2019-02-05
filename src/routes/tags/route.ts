import * as path from "path"
let tags = require('../tags/all');
exports.path = '/tags/:tag';

exports.params = Object.keys(tags).map((item) => { return { tag: item } });

exports.handler = (input, out) => {
    const template = require(path.resolve(__dirname, 'index.marko'));
    template.render({ talks: tags[input.params.tag] || [], title: input.params.tag }, out);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
let tags = require('../tags');
exports.path = '/tags/:tag';
exports.params = Object.keys(tags).map((item) => { tag: item; });
exports.handler = (input, out) => {
    const template = require(path.resolve(__dirname, 'index.marko'));
    template.render({ tags: tags, talks: tags[input.params.tag] || [], title: input.params.tag }, out);
};

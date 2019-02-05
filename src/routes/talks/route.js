"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const dirPath = "drafts";
let venuePaths = fs.readdirSync(path.join(__dirname, dirPath));
// let paths = require.resolve(paths);
let paramsFromDirectory = [];
for (let venue of venuePaths) {
    let p = path.join(__dirname, dirPath, venue);
    let talkPaths = fs.lstatSync(p).isDirectory() ? fs.readdirSync(p) : [];
    for (let talk of talkPaths) {
        talk.endsWith('.marko') && paramsFromDirectory.push({ venue: venue, title: talk.replace(".marko", "") });
    }
}
exports.path = '/talks/:venue/:title';
exports.params = paramsFromDirectory;
exports.handler = (input, out) => {
    let { venue, title } = input.params;
    let tags = require('../tags');
    const template = require(path.resolve(__dirname, dirPath, input.params.venue, input.params.title.toLowerCase() + '.marko'));
    template.render({ venue, title, tags }, out);
};

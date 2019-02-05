"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const dirPath = "drafts";
let draftsPath = path.join(__dirname, '..', 'talks', dirPath);
let venuePaths = fs.readdirSync(draftsPath);
// let paths = require.resolve(paths);
venuePaths = venuePaths.filter((item) => !item.startsWith('.'));
let tags = {};
var extract_tags = (file_at_path) => {
    let content = fs.readFileSync(file_at_path, 'utf8');
    let array = content.match(/\<@tags\>(.*)\<\/@tags\>/);
    let matchString = array && (array.length >= 2) ? array[1] : '';
    return matchString.split(',');
};
for (let venue of venuePaths) {
    let p = path.join(draftsPath, venue);
    let talkPaths = fs.lstatSync(p).isDirectory() ? fs.readdirSync(p) : [];
    for (let talk of talkPaths) {
        let talk_template_path = path.resolve(p, talk);
        let tagMap = talk.endsWith('.marko') ? extract_tags(talk_template_path).reduce((map, item) => {
            map[item] = map[item] || [];
            map[item].push({ title: talk.replace(".marko", ""), path: talk_template_path, venue: venue });
            return map;
        }, Object.assign({}, tags)) : Object.assign({}, tags);
        tags = Object.assign({}, tags, tagMap);
    }
}
module.exports = tags;

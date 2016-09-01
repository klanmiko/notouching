var fs = require('fs');
var idgen = require('shortid');
var Parser = require('xml2js').Parser;
var parser = new Parser();
function getMask(mask){
    switch (mask) {
        default:
            return "./res/masks/white.mask";
        case "black":
            return "./res/masks/black.mask";
    }
}
function getIcon(icon){
    switch (icon) {
        default:
            return "./res/icons/default.svg";
    }
}
module.exports.list = function listResources(callback){
    var output;
    output.masks = [];
    output.icons = [];
    var done = false;
    fs.readdir("./res/masks", function (err, files) {
        if (done) {
            callback(err,output);
        }
        done = true;
    });
    fs.readdir("./res/icons", function (err, files) {
        if (done) {
            callback(err, output);
        }
        done = true;
    });
}
module.exports.Icon = function icon(id, width, height, mask, icon){
    this.id = id | idgen.generate();
    this.mask = mask | "white";
    this.icon = icon | "default";
    this.width = width | 50;
    this.heigh = height | 50;
}
module.exports.getSVG = function getSVG(icon,callback){
    var mask;
    fs.readFile(getMask(icon.mask), function (err, data) {
        parser.parseString(data, function (err, result) {
            mask = result;
            fs.readFile(getIcon(icon.icon), function (err, data) {
                parser.parseString(data, function (err, result) { 
                    console.dir(result);
                });
            });
        });
    });
}
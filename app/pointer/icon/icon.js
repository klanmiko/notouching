var fs = require('fs');
var Parser = require('xml2js').Parser;
var parser = new Parser();
function getMask(mask){
    switch (mask) {
        case "white":
            return "./res/masks/white.mask";
        case "black":
            return "./res/masks/black.mask";
    }
}
function getIcon(icon){
    switch (icon) {
        case "default":
            return "./res/icons/default.svg";
    }
}
function listResources(callback){
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
function icon(mask, icon){
    mask = mask | "white";
    icon = icon | "default";
    this.mask = getMask(mask);
    this.base = getIcon(icon);
}
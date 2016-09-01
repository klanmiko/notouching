var Icon = require('./icon.js');
module.exports.get = function (req, res){
    var icon = new Icon.Icon(0, req.param('width'), req.param('height'), req.param('mask'), req.param('icon'));
    var svh = JSON.stringify(Icon.getSVG(icon));
    res.set('Content-Type', 'image/svg+xml');
    res.send(svh);
}
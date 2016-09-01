var cradle = require('cradle');
var Connection = new (cradle.Connection)();
var players = c.database("players");
players.exists(function (err, exists) {
    if (!exists) {
        players.create();
    }
});
module.exports.db = players;
var cradle = require('cradle');
var Icon = require('../app/pointer/icon/icon.js');
var Connection = new (cradle.Connection)();
var players = c.database("players");
players.exists(function (err, exists) {
    if (!exists) {
        players.create();
    }
});
players.save('_design/icons', {
    views: {
        byID: {
            map: function (doc){
                if (doc.id) {
                    emit(doc.id, doc);
                }
            }
        }
    }
});
players.save('_design/player', {
    views: {
        byID: {
            map: function (doc) {
                if (doc.id) {
                    emit(doc.id, doc);
                }
            }
        },
        byName: {
            map: function (doc){
                if (doc.name) {
                    emit(doc.name, doc);
                }
            }
        }
    }
});
module.exports.db = players;
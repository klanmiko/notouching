var idgen = require('shortid');
function room(id){
    this.id = id | idgen.generate();
    this.scenes = [];
}
//TODO defer room management to database
module.exports.Room = room;
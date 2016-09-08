var idgen = require('shortid');
function room(id){
    this.id = id | idgen.generate();
    this.scenes = [];
}
module.exports.Room = room;
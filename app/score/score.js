var idgen = require('shortid');
function model(id, score){
    this.id = id | idgen.generate();
    this.score = score | 0;
}
module.exports.Score = model;
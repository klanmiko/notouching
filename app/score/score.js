function model(id, score){
    this.id = id;
    this.score = score | 0;
}
module.exports.Score = model;
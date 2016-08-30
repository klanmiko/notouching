function model(id, x, y, [width], [height], [icon], [masking]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width|50;
    this.height = height|50;
    this.icon = icon;
    this.masking = masking;
}
module.exports.Pointer = model;
var assert = require('assert');
var Scene = require('./scene.js');
describe('Data Model', function () {
    describe('Player', function () {
        it('should create same objects for same fields', function () {
            assert.deepEqual(new Scene.Player("1", 10, 10, "john"), new Scene.Player("1", 10, 10, "john"));
        });
        it('should create different objects for empty fields', function () {
            assert.notEqual(new Scene.Player(), new Scene.Player());
        });
    });
    describe('isPlayer()', function () {
        it('should validate any new player', function () {
            var player1 = new Scene.Player();
            console.dir(player1);
            assert.ok(Scene.isPlayer(player1));
            var player2 = new Scene.Player("1", 10, 10, "john");
            console.dir(player2);
            assert.ok(Scene.isPlayer(player2));
        });
        it('should reject empty objects', function () {
            assert.ok(!Scene.isPlayer({ id: "1", y:10, x: 10, name: "john" }));
            assert.ok(!Scene.isPlayer({ id: "1" }));
        });
    });
});
describe('Jumping Algorithm', function () {
    it('')
});
﻿var socket = io.connect("http://localhost");
var scene;
var myID = Cookies.get('id');
var icon = new Image();
var ready = false;
icon.src = '/cursor.svg';
icon.onload = function (){
    ready = true;
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
function drawPointers(){
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(0,0,0)";
    for (var i = 0; i < scene.players.length; i++) {
        var player = scene.players[i];
        if (player.id != myID)
            ctx.drawImage(icon, player.x, player.y, 20, 20);
        ctx.fillText(player.name, player.x, player.y - 10);
    }
}
function drawButton(color, scale){
    if (scene&&scene.button) {
        scale = scale ? scale : { x: 1, y: 1 };
        color = color ? color : "rgb(0,0,200)";
        ctx.fillStyle = color;
        ctx.fillRect(scene.button.x, scene.button.y, scene.button.width * scale.x, scene.button.height * scale.y);
    }
}
function draw(buttoncolor,buttonscale){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawButton(buttoncolor,buttonscale);
    if (ready) {
        drawPointers();
    }
}
function onMove(event){
    socket.emit('move', { id: myID, x: event.clientX, y: event.clientY });
}
function onClick(event){
    socket.emit('click');
}
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('click', onClick);
socket.on('load', function (data) {
    scene = data;
    draw();
});
socket.on('move', function (data) {
    var player = getPlayerByID(data.id);
    player.x = data.x;
    player.y = data.y;
    draw();
});
socket.on('button-move', function (data) {
    scene.button = data;
    draw();
});
socket.on('button-shrink', function (button) {
    scene.button = button;
    draw();
});
socket.on('player-disconnect', function (id) {
    removePlayer(id);
    draw();
});
function removePlayer(id) {
    for (var i = 0; i < scene.players.length; i++) {
        if (scene.players[i].id == id) {
            scene.players.splice(i);
        }
    }
}
function getPlayerByID(id) {
    for (var i = 0; i < scene.players.length; i++) {
        if (scene.players[i].id == id) {
            return scene.players[i];
        }
    }
}
draw();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var char = 5;
var x = canvas.width/5
var y = canvas.height-100;
var dx = 5;
var dy = -5;
var charHeight = 8.5;
var charWidth = 8.5;
var charX = (canvas.width-charWidth)/2;
var charY = (canvas.height-charHeight)/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var enemyRowCount = 1;
var enemyColumnCount = 1;
var enemyWidth = 5;
var enemyHeight = 5;
var enemyPadding = 10;
var allLines = {
  line1 : {strx: 120, stry: 10, width: 1000, height: 10},
  line2 : {strx: 1120, stry: 10, width: 10, height: 120},
  line3 : {strx: 1120, stry: 130, width: 100, height: 10},
  line4 : {strx: 1210, stry: 140, width: 10, height: 300},
  line5 : {strx: 1120, stry: 440, width: 100, height: 10},
  line6 : {strx: 1119, stry: 440, width: 10, height: 100},
}
function checkimpact(){
  for(key in allLines){
    var currline = allLines[key]
    // console.log(currline.strx, currline.stry, currline.width, currline.height)
    if(currline.strx < charX + charWidth &&
      currline.strx + currline.width > charX && 
      currline.stry < charY + charHeight &&
      currline.stry + currline.height > charY){
        preventmovement(/*can't touch this*/)
      }
  }
}

function preventmovement(){
  // console.log('hit')
}

function drawline(){
  for(key in allLines){
    //console.log(allLines[key].strx, allLines[key].stry, allLines[key].width, allLines[key].height)
    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.fillRect(allLines[key].strx, allLines[key].stry, allLines[key].width, allLines[key].height)
    ctx.stroke();
  }
 }

var enemy = [];
for(var c=0; c<enemyColumnCount; c++) {
  enemy[c] = [];
  for(var r=0; r<enemyRowCount; r++) {
    enemy[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.onkeydown = keyDownHandler
document.onkeyup = keyUpHandler
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  var relativeY = e.clientY - canvas.offsetTop;
  if(relativeX > 0 && relativeX < canvas.width) {
    charX = relativeX - charWidth;
  }
  if(relativeY > 0 && relativeY < canvas.height){
      charY = relativeY - charHeight;   
  }
}

function drawChar() {
  console.log(charX, charY)
    ctx.beginPath();
    ctx.rect(charX, charY, charWidth, charHeight);
    ctx.fillStyle = "#4169e1";
    ctx.fill();
    ctx.closePath();
  }
  function drawEnemy() {
    for(var c=0; c<enemyColumnCount; c++) {
      for(var r=0; r<enemyRowCount; r++) {
        if(enemy[c][r].status == 1) {
          var enemyX = (r*(enemyWidth+enemyPadding));
          var enemyY = (c*(enemyHeight+enemyPadding));
          enemy[c][r].x = enemyX;
          enemy[c][r].y = enemyY;
          ctx.beginPath();
          ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
          ctx.fillStyle = "#FF0000";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemy();
    drawChar();
    drawline();
    checkimpact();
    if(rightPressed && charX < canvas.width-charWidth) {
        charX += 1;
    }
    else if(leftPressed && charX > 0) {
        charX -= 1;
    }
    else if(upPressed && charY > 0){
        charY -= 1;
    }
    else if(downPressed && charY < canvas.height-charHeight){
        charY += 1;
    }
  }


var interval = setInterval(draw, 8.5);
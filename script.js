var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var char = 5;
var x = canvas.width/5
var y = canvas.height-100;
var dx = 5;
var dy = -5;
var charHeight = 9;
var charWidth = 9;
var charX = Math.round((canvas.width-charWidth)/2);
var charY = Math.round((canvas.height-charHeight)/2);
var rightImpact, leftImpact, upImpact, downImpact, rightPressed, leftPressed, upPressed, downPressed = false;
var enemyRowCount = 1;
var enemyColumnCount = 1;
var enemyWidth = 5;
var enemyHeight = 5;
var enemyPadding = 10;
var allLines = {
  line1 : {strx: 120, stry: 10, width: 1000, height: 10},
  line2 : {strx: 1120, stry: 10, width: 10, height: 120},
  line3 : {strx: 1120, stry: 130, width: 110, height: 10},
  line4 : {strx: 1220, stry: 140, width: 10, height: 300},
  line5 : {strx: 1120, stry: 440, width: 110, height: 10},
  line6 : {strx: 1120, stry: 440, width: 10, height: 110},
  line7 : {strx: 120, stry: 540, width: 650, height: 10},
  line8 : {strx: 880, stry: 540, width: 250, height: 10},
  line9 : {strx: 120, stry: 10, width: 10, height: 131},
  line10 : {strx: 10, stry: 131, width: 115, height: 10},
  line11 : {strx: 10, stry: 131, width: 10, height: 310},
  line12 : {strx: 10, stry: 436, width: 114, height: 10},
  line13 : {strx: 120, stry: 436, width: 10, height: 110},
  line14 : {strx: 60, stry: 214, width: 70, height: 10},
  line15 : {strx: 60, stry: 214, width: 10, height: 50},
  line16 : {strx: 60, stry: 330, width: 10, height: 50},
  line17 : {strx: 60, stry: 370, width: 70, height: 10},
  line18 : {strx: 1120, stry: 214, width: 60, height: 10},
  line19 : {strx: 1170, stry: 214, width: 10, height: 50},
  line20 : {strx: 1170, stry: 330, width: 10, height: 50},
  line21 : {strx: 1120, stry: 380, width: 60, height: 10},
  line22 : {strx: 500, stry: 320, width: 270, height: 10},
  line23 : {strx: 760, stry: 215, width: 10, height: 110},
  line24 : {strx: 500, stry: 215, width: 10, height: 110},
  line25 : {strx: 700, stry: 215, width: 60, height: 10},
  line26 : {strx: 500, stry: 215, width: 60, height: 10},
  line27 : {strx: 630, stry: 130, width: 10, height: 50},
  line28 : {strx: 500, stry: 130, width: 270, height: 10},
  line29 : {strx: 880, stry: 130, width: 170, height: 10},
  line30 : {strx: 210, stry: 130, width: 170, height: 10},
  line31 : {strx: 1040, stry: 130, width: 10, height: 100},
  line32 : {strx: 210, stry: 130, width: 10, height: 100},
  line33 : {strx: 1020, stry: 265, width: 60, height: 10},
  line34 : {strx: 180, stry: 265, width: 60, height: 10},
  line35 : {strx: 630, stry: 400, width: 10, height: 50},
  line36 : {strx: 500, stry: 440, width: 270, height: 10},
  line37 : {strx: 880, stry: 440, width: 170, height: 10},
  line38 : {strx: 210, stry: 440, width: 170, height: 10},
  line39 : {strx: 1040, stry: 370, width: 10, height: 80},
  line40 : {strx: 210, stry: 370, width: 10, height: 80},
  line41 : {strx: 1020, stry: 320, width: 60, height: 10},
  line42 : {strx: 180, stry: 320, width: 60, height: 10},
  line43 : {strx: 280, stry: 196, width: 10, height: 80},
  line44 : {strx: 280, stry: 320, width: 10, height: 80},
  line45 : {strx: 960, stry: 196, width: 10, height: 80},
  line46 : {strx: 960, stry: 320, width: 10, height: 80},
  line47 : {strx: 700, stry: 170, width: 170, height: 10},
  line48 : {strx: 860, stry: 170, width: 10, height: 107},
  line49 : {strx: 860, stry: 320, width: 10, height: 80},
  line50 : {strx: 700, stry: 390, width: 170, height: 10},
  line51 : {strx: 390, stry: 170, width: 170, height: 10},
  line52 : {strx: 390, stry: 180, width: 10, height: 95},
  line53 : {strx: 390, stry: 320, width: 10, height: 80},
  line54 : {strx: 390, stry: 390, width: 170, height: 10},
}
function checkimpact(){
  for(key in allLines){
    var currline = allLines[key]
    // console.log(currline.strx, currline.stry, currline.width, currline.height)
    if(currline.strx < charX + charWidth && // if the lines left is less than the characters right
      currline.strx + currline.width > charX && // and the lines right is greater thanthe characters left
      currline.stry < charY + charHeight && // if the lines top is less than the characters bottom
      currline.stry + currline.height > charY){ // if the lines bottom is greater than the lines top
        if(currline.strx == charX + charWidth){
          rightImpact = true
        }
        if(currline.strx + currline.width == charX){
          leftImpact = true
        }
        if(currline.stry + currline.height == charY){
          upImpact = true
        }
        if(currline.stry == charY + charHeight){
          downImpact = true
        }
    }
  }
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
function moveChar(){
  if(rightPressed && charX < canvas.width-charWidth && !rightImpact) {
    charX += 1;
    leftImpact = false
  }
  else if(leftPressed && charX > 0 && !leftImpact) {
    charX -= 1;
    rightImpact = false
  }
  else if(upPressed && charY > 0 && !upImpact){
    charY -= 1;
    downImpact = false
  }
  else if(downPressed && charY < canvas.height-charHeight && !downImpact){
    charY += 1;
    upImpact = false
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemy();
    checkimpact();
    moveChar();
    drawChar();
    drawline();
  }

var interval = setInterval(draw, 8.5);
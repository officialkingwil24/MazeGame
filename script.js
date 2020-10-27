document.getElementById('startGame').addEventListener('click', function startGame(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");  
  var maz = document.getElementById('maz')
  var mazz = document.getElementById('startGame')
  maz.removeChild(mazz)
  console.log("executed...")

  var char = 5;
  var x = canvas.width/5
  var y = canvas.height-100;
  var dx = 5;
  var dy = -5;
  var charHeight = 9;
  var charWidth = 9;
  var charX = Math.round((canvas.width-charWidth)/1);
  var charY = Math.round((canvas.height-charHeight)/1);
  var objRight, objLeft, objTop, objDown, rightPressed, leftPressed, upPressed, downPressed = false;
  var attempts = 0;
  var winBox = {
    x: canvas.width/2 -120,
    y: canvas.height/2 -60,
    w: 270,
    h: 100,
  } 
  let pause = false;
  var allEnemies = [
    { width: 20, height: 20, x: 25, y: 410, orientation: "up"}, 
    { width: 20, height: 20, x: 85, y: 230, orientation: "down"},
    { width: 20, height: 20, x: 135, y: 505, orientation: "right"},
    { width: 20, height: 20, x: 255, y: 150, orientation: "down"},
    { width: 20, height: 20, x: 330, y: 410, orientation: "up"},
    { width: 20, height: 20, x: 470, y: 290, orientation: "left"},
    { width: 20, height: 20, x: 600, y: 145, orientation: "left"},
    { width: 20, height: 20, x: 600, y: 410, orientation: "left"},
    { width: 20, height: 20, x: 650, y: 145, orientation: "right"},
    { width: 20, height: 20, x: 650, y: 410, orientation: "right"},
    { width: 20, height: 20, x: 780, y: 285, orientation: "right"},
    { width: 20, height: 20, x: 910, y: 145, orientation: "down"},
    { width: 20, height: 20, x: 980, y: 410, orientation: "up"},
    { width: 20, height: 20, x: 1090, y: 50, orientation: "down"},
    { width: 20, height: 20, x: 1140, y: 350, orientation: "up"},
    { width: 20, height: 20, x: 1190, y: 410, orientation: "up"},
  ];

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
    line54 : {strx: 390, stry: 390, width: 170, height: 10}
  }

  function moveEnemyXVal(enemy, speed){
    // move enemy check wall collision
    const didHit = enemyWallTouch(enemy);
    // if wall collision -> reverse course
    if(didHit){
      // set up flag for right and left -> similar flag for up & down
      enemy.orientation = enemy.orientation == "right" ? enemy.orientation = "left" : enemy.orientation = "right";
    }
    // move right
    if(enemy.orientation === "right"){
      // console.log(enemy, "enemy")
      enemy.x += speed;
    }
    // move left
    if(enemy.orientation === "left"){
      enemy.x -= speed;
    }
  }

  function moveEnemyYVal(enemy, speed){
    const didHit = enemyWallTouch(enemy);
    // if wall collision -> reverse course
    if(didHit){
      // set up flag for right and left -> similar flag for up & down
      enemy.orientation = enemy.orientation == "up" ? enemy.orientation = "down" : enemy.orientation = "up";
    }
    // move right
    if(enemy.orientation === "up"){
      // console.log(enemy, "enemy")
      enemy.y += speed;
    }
    // move left
    if(enemy.orientation === "down"){
      enemy.y -= speed;
    }
  }

  function drawlines(){
    for(key in allLines){
      ctx.fillStyle = "black"
      ctx.fillRect(allLines[key].strx, allLines[key].stry, allLines[key].width, allLines[key].height)
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
    else if(e.key.toLowerCase() == ' '){
      console.log("paused?")
      pause = !pause
    }
  }

  function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight"){
      rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
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
    ctx.beginPath();
    ctx.rect(charX, charY, charWidth, charHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  function updateAllEnemies(){
    for(var i=0; i<allEnemies.length; i++){
      var currentEnemy = allEnemies[i];
      if(currentEnemy.orientation == "right" || currentEnemy.orientation == "left"){
        moveEnemyXVal(currentEnemy, 2);

      } else if (currentEnemy.orientation == "up" || currentEnemy.orientation == "down"){
        moveEnemyYVal(currentEnemy, 2);
      }
      // updateEnemy(currentEnemy);
      drawEnemy(currentEnemy);
      impactEnemy(currentEnemy);
    }
  }
  // function updateEnemy(currentEnemy){
  //  // console.log(allEnemies)
  // }
  function drawEnemy(currentEnemy) {
    ctx.beginPath();
    ctx.rect(currentEnemy.x, currentEnemy.y, currentEnemy.width, currentEnemy.height);
    ctx.fillStyle = currentEnemy.color ? currentEnemy.color : "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  function drawWinBox() {
    ctx.beginPath();
    ctx.rect(winBox.x, winBox.y, winBox.w, winBox.h);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }

  function impactEnemy(currentEnemy){
    // compare char left to enemy left and right   OR   
    // compare char right to enemy left and right
    // &&
    // compare char top to enemy top and bottom   OR   
    // compare char bottom to enemy top and bottom
    if(((charX > currentEnemy.x && charX < currentEnemy.x + currentEnemy.width) || 
    (charX + charWidth > currentEnemy.x && charX + charWidth < currentEnemy.x + currentEnemy.width)) &&
    ((charY > currentEnemy.y && charY < currentEnemy.y + currentEnemy.height) || 
    (charY + charHeight > currentEnemy.y && charY + charHeight < currentEnemy.y + currentEnemy.height))){
      charX = Math.round((canvas.width-charWidth)/1);
      charY = Math.round((canvas.height-charHeight)/1);
      attempts++;
    }
  }

  function impactWin(){
    // compare char left to enemy left and right   OR   
    // compare char right to enemy left and right
    // &&
    // compare char top to enemy top and bottom   OR   
    // compare char bottom to enemy top and bottom
    if(((charX > winBox.x && charX < winBox.x + winBox.w) || 
    (charX + charWidth > winBox.x && charX + charWidth < winBox.x + winBox.w)) &&
    ((charY > winBox.y && charY < winBox.y + winBox.h) || 
    (charY + charHeight > winBox.y && charY + charHeight < winBox.y + winBox.h))){
      alert("YOU WON, IT TOOK YOU"+ attempts + "ATTEMPTS.")
      
      // alert("YOU LOST")
      //document.location.reload();
    }
  }

  const contactPointsObj = () => {
    const contactPoints = {};
    // O(n3)
    for(key in allLines){
    // Get All Y values
    for(let i = 0; i < allLines[key].height; i++){
    // Get y val -> iterate up (down-screen) via height -> strxY 
    for(let j = 0; j < allLines[key].width; j++){
    // X value -> width starts from left to right getting bigger;
    contactPoints[`${allLines[key].strx + j} ${allLines[key].stry + i}`] = 't';
    }
    }
    }
    return contactPoints;
  }

  const lineContactPoints = contactPointsObj();



  function enemyWallTouch(currentEnemy){
    for(let i = 0; i < currentEnemy.width; i++){
      for(let j = 0; j < currentEnemy.height; j++){
        if(lineContactPoints[`${currentEnemy.x + i} ${currentEnemy.y + j}`]){
          return true
        }
      }
    }
    return false;
  }

  function touchWall(){
    for(let line in allLines){  
      let currentWall = allLines[line];
      if(((charX >= currentWall.strx && charX <= currentWall.strx + currentWall.width) || 
        (charX + charWidth >= currentWall.strx && charX + charWidth <= currentWall.strx + currentWall.width)) &&
        ((charY >= currentWall.stry && charY <= currentWall.stry + currentWall.height) || 
        (charY + charHeight >= currentWall.stry && charY + charHeight <= currentWall.stry + currentWall.height))
        ){
        //console.log('hit wall')
        if(charX == currentWall.strx + currentWall.width){
        // console.log('wall on left')
          objLeft = true;
        }
        if(charX + charWidth == currentWall.strx){
        //  console.log('wall on right')
          objRight = true;
        }
        if(charY + charHeight == currentWall.stry){
        // console.log('wall on down')
          objDown = true;
        }
        if(charY == currentWall.stry + currentWall.height){
        //  console.log('wall on top')
          objTop = true;
        }
      }
    }
  }

  function moveChar(){
    if(rightPressed && charX < canvas.width-charWidth && !objRight) {
      charX += 1;
      //hitWall() ? charX -= 1 : null;
    }
    else if(leftPressed && charX > 0 && !objLeft) {
      charX -= 1;
    // hitWall() ? charX += 1 : null;
    }
    else if(upPressed && charY > 0 && !objTop){
      charY -= 1;
      //hitWall() ? charY += 1 : null;
    }
    else if(downPressed && charY < canvas.height-charHeight && !objDown){
      charY += 1;
      //hitWall() ? charY -= 1 : null;
    }
  }

  function drawAttempts(){
    ctx.font = "16px Arial";
    ctx.fillText(`losses: ${attempts}`, 15, 15)
  }

  function draw() {
    if(pause){
      console.log("paused")
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveChar();
    updateAllEnemies();
    touchWall();
    drawChar();
    drawWinBox();
    drawlines();
    drawAttempts();
    impactWin();
  }

  var interval = setInterval(draw, 8);
})
// startGame();
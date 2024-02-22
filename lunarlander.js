let starX = [];
let starY = [];
let starAlpha = [];
let spaceshipX = 50;
let spaceshipY = 750;
let spaceshipSpeed = 1;

let state = "start";
let gameTimer = 0;

function setup() {
  createCanvas(1000, 750);
  frameRate(30);
  for (let i = 0; i < 50; i++) {
    starX.push(random(width));
    starY.push(random(height));
    starAlpha.push(random(TWO_PI));
  }
}

// The style for the floating ufo on the start screen
function ufo() {
  push();
  fill(85, 107, 47);
  ellipse(spaceshipX, spaceshipY, 50, 55);

  fill(90, 90, 90);
  beginShape();
  vertex(spaceshipX - 20, spaceshipY - 5);
  bezierVertex(
    spaceshipX - 20,
    spaceshipY - 30,
    spaceshipX + 20,
    spaceshipY - 30,
    spaceshipX + 20,
    spaceshipY - 5
  );
  endShape(CLOSE);
  pop();
}

// START SCREEN
function startScreen() {
  background(0, 0, 0);

  // Spaceship floating diagonally across the startscreen
  spaceshipX += spaceshipSpeed;
  spaceshipY -= spaceshipSpeed;

  if (spaceshipX > width || spaceshipY < 0) {
    spaceshipX = 50;
    spaceshipY = height - 50;
  }

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);
    starAlpha[index] = starAlpha[index] + 0.02;
  }

  ufo();

  fill(255);
  textSize(50);
  text("Annie's Lunar Lander", 250, 250);
  textSize(20);
  text("PLAY", 450, 500);
}

// Style/animation for the game spaceship
function gameSpaceship(x, y) {
  push();
  translate(x, y);
  noStroke();

  if (startKeyPressed) {
    gameSpaceshipY = gameSpaceshipY + velocity;
    velocity = velocity + acceleration;
  }

  //spaceship
  fill(200);
  ellipse(142, 140, 90, 30);

  push();

  fill(120);
  beginShape();
  vertex(105, 140);
  bezierVertex(105, 100, 180, 100, 180, 140);
  endShape();
  pop();

  pop();
}

// MOON
function moon() {
  push();
  fill(128);
  ellipse(500, 800, 1200, 300);
  pop();
}

let gameSpaceshipY = 100;
let velocity = 3;
let acceleration = 0.2;
let isGameActive = false;
let startKeyPressed = false;

// GAME SCREEN
function gameScreen() {
  background(0, 0, 0);
  text("Press Down Arrow Key To Start", 350, 350);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);
    starAlpha[index] = starAlpha[index] + 0.02;
  }

  moon();

  if (isGameActive) {
    gameSpaceship(350, gameSpaceshipY);
    gameSpaceshipY = gameSpaceshipY + velocity;
    velocity = velocity + acceleration;
  }

  if (keyIsDown(40) && isGameActive) {
    velocity = velocity - 0.4;
  }

  // Checks for collision or successful landing
  if (gameSpaceshipY > 480 && velocity > 4) {
    isGameActive = false;
    state = "result";
    crashScreen();
  } else if (gameSpaceshipY > 480 && velocity < 4) {
    isGameActive = false;
    state = "result";
    winScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (isGameActive == false && state === "game") {
    state = "result";
    isGameActive = true;
    velocity = 2;
    gameSpaceshipY = 100;
  } else if (state === "result") {
    state = "game";
    isGameActive = true;
    velocity = 3;
    gameSpaceshipY = 100;
  }
}

// CRASH/SUCCESS SCREENS
function crashScreen() {
  textSize(30);
  text("Oh no you didn't make it... Try again!", 250, 300);
}

function winScreen() {
  textSize(40);
  text("YAAY", 400, 350);
  text("You landed safely!", 300, 400);
}

// Draws the screen based on current state
function draw() {
  if (state === "start") {
    startScreen();
  }

  if (isGameActive && state === "game") {
    gameScreen();
  } else if (isGameActive == false && state === "result") {
    gameScreen();
  }
}

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
  noStroke();
  fill(200);
  ellipse(spaceshipX, spaceshipY, 70, 20);

  fill(120);
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

  // Flames animation when pressing Down arrow
  if (keyIsDown(40) && isGameActive) {
    for (let i = 0; i < 5; i++) {
      let flameWidth = random(15, 30);
      let flameHeight = random(30, 60);

      let flameColors = [color(155, 165, 0), color(255, 255, 0)];

      let flameColor = random(flameColors);
      fill(flameColor);
      ellipse(142, 150 + 15, flameWidth, flameHeight);
    }
  }

  //spaceship
  fill(200);
  ellipse(142, 140, 100, 30);
  translate(10, -10);

  push();

  fill(120);
  beginShape();
  vertex(105, 140);
  bezierVertex(105, 100, 160, 100, 160, 140);
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

  // moon circles from the left
  push();
  noStroke();
  fill(50);
  rotate(radians(-8));
  ellipse(80, 730, 200, 50);
  pop();

  push();
  noStroke();
  fill(50);
  rotate(radians(5));
  ellipse(450, 720, 150, 60);
  pop();

  push();
  noStroke();
  fill(50);
  rotate(radians(4));
  ellipse(600, 650, 158, 50);
  pop();

  push();
  noStroke();
  fill(50);
  rotate(radians(8));
  ellipse(880, 610, 200, 50);
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

  if (!isGameActive) {
    textSize(20);
    fill(255);
    text("Press Down Arrow Key To Start", 350, 300);
  }

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);
    starAlpha[index] = starAlpha[index] + 0.02;
  }

  moon();

  if (isGameActive) {
    gameSpaceshipY = gameSpaceshipY + velocity;
    velocity = velocity + acceleration;

    // Checks for collision or successful landing
    if (gameSpaceshipY > 500 && velocity > 4) {
      isGameActive = false;
      state = "result";
      crashScreen();
    } else if (gameSpaceshipY > 500 && velocity < 4) {
      isGameActive = false;
      state = "result";
      winScreen();
    }

    if (gameSpaceshipY > 600) {
      isGameActive = false;
      state = "result";
      winScreen();
    }
    gameSpaceship(350, gameSpaceshipY);

    if (keyIsDown(40) && !isGameActive) {
      isGameActive = true;
      gameSpaceshipY = 100;
    }
  }
  //  velocity = velocity - 0.4;
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
    isGameActive = true;
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

let starX = [];
let starY = [];
let starAlpha = [];
let spaceshipX = 50;
let spaceshipY = 750;
let spaceshipSpeed = 1;

function setup() {
  createCanvas(1000, 750);
  frameRate(30);
  for (let i = 0; i < 50; i++) {
    starX.push(random(width));
    starY.push(random(height));
    starAlpha.push(random(TWO_PI));
  }
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

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
  text("START", 450, 500);
}

function gameSpaceship(x, y) {
  push();
  translate(x, y);
  noStroke();

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

function moon() {
  push();
  fill(128);
  ellipse(450, 780, 1200, 300);
  pop();
}

let gameSpaceshipY = 100;
let velocity = 3;
let acceleration = 0.2;

function gameScreen() {
  background(0, 0, 0);
  text("Press Down Arrow Key To Start", 350, 150);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);
    starAlpha[index] = starAlpha[index] + 0.02;
  }

  moon();

  gameSpaceship(300, gameSpaceshipY);
  gameSpaceshipY = gameSpaceshipY + velocity;
  velocity = velocity + acceleration;
  if (keyIsDown(40)) {
    velocity = velocity - 0.4;
  }
  if (gameSpaceshipY > 600 && velocity > 3) {
    // isGameActive = false;
    state = "result";
  }
}

function resultScreen() {
  background(255, 0, 0);
  text("Result", 200, 100);
}

let state = "start";
let gameTimer = 0;

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "game";
  }
}

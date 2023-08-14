let playerScore = 0;

let opponentScore = 0;

let player;

let opponent;

let ball;

function setup() {

  createCanvas(800, 400);

  player = new Paddle(20, height / 2);

  opponent = new Paddle(width - 20, height / 2);

  ball = new Ball(width / 2, height / 2);

}

function draw() {

  background(0);

  

  // Draw scores

  textSize(32);

  fill(255);

  text(playerScore, 200, 50);

  text(opponentScore, width - 220, 50);

  

  player.show();

  opponent.show();

  ball.show();

  

  player.update();

  opponent.update();

  

  if (keyIsDown(UP_ARROW)) {

    player.move(-5);

  }

  if (keyIsDown(DOWN_ARROW)) {

    player.move(5);

  }

  

  ball.update();

  

  if (ball.hits(player) || ball.hits(opponent)) {

    ball.bounceOff();

  }

  

  if (ball.offScreenLeft()) {

    opponentScore++;

    ball.reset();

  } else if (ball.offScreenRight()) {

    playerScore++;

    ball.reset();

  }

}

class Paddle {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.w = 10;

    this.h = 80;

    this.speed = 5;

  }

  

  show() {

    fill(255);

    rect(this.x, this.y, this.w, this.h);

  }

  

  move(step) {

    this.y += step;

    this.y = constrain(this.y, 0, height - this.h);

  }

  

  update() {

    // Optional: Add opponent AI here

    // For simplicity, we'll just move the opponent to follow the ball's y position

    opponent.y = ball.y - opponent.h/2;

  }

}

class Ball {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.r = 10;

    this.xSpeed = 5;

    this.ySpeed = 5;

  }

  

  show() {

    fill(255);

    ellipse(this.x, this.y, this.r * 2);

  }

  

  update() {

    this.x += this.xSpeed;

    this.y += this.ySpeed;

    

    // Bounce off top and bottom walls

    if (this.y - this.r < 0 || this.y + this.r > height) {

      this.ySpeed *= -1;

    }

  }

  

  bounceOff() {

    this.xSpeed *= -1;

  }

  

  reset() {

    this.x = width / 2;

    this.y = height / 2;

    this.xSpeed *= random() > 0.5 ? 1 : -1;

    this.ySpeed *= random() > 0.5 ? 1 : -1;

  }

  

  offScreenLeft() {

    return this.x - this.r > width;

  }

  

  offScreenRight() {

    return this.x + this.r < 0;

  }

  

  hits(paddle) {

    return (

      this.x - this.r < paddle.x + paddle.w &&

      this.x + this.r > paddle.x &&

      this.y - this.r < paddle.y + paddle.h &&

      this.y + this.r > paddle.y

    );

  }

}


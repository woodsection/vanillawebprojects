/* eslint-disable max-classes-per-file */
const ENTITY_COLOR = "#0095dd";

const PLAYGROUD_HEADER_MARGIN = 50;
const PLAYGROUD_PADDLE_MARGIN = 20;

const PLAYGROUD_WIDTH = 800;
const PLAYGROUD_HEIGHT = 600;
const PLAYGROUD_WIDTH_MARGIN = 40;
const PLAYGROUD_HEIGHT_MARGIN = 10;

const PADDLE_WIDTH = 200;
const PADDLE_HEIGTH = 10;
const PADDLE_SPEED = 10;

const BLOCK_X_START = PLAYGROUD_WIDTH_MARGIN;
const BLOCK_Y_START = PLAYGROUD_HEIGHT_MARGIN + PLAYGROUD_HEADER_MARGIN;
const BLOCK_COUNT_PER_LINE = 9;
const BLOCK_COUNT_LINE = 5;
const BLOCK_WIDTH = 75;
const BLOCK_HEIGTH = 20;
const BLOCK_WIDTH_MARGIN = 5;
const BLOCK_HEIGTH_MARGIN = 10;

const BALL_RADIUS = 10;
const BALL_SPEED = 6;

const pgEl = document.getElementById("play-ground");

class Ball {
  constructor(playground) {
    this.pg = playground;
    this.x = PLAYGROUD_WIDTH / 2;
    this.y = PLAYGROUD_HEIGHT / 2;
    this.r = BALL_RADIUS;
    this.dx = BALL_SPEED;
    this.dy = -BALL_SPEED;
  }

  isBumpBlock() {
    let isBump = false;
    this.pg.blocks.forEach(block => {
      if (block.isBump(this.x, this.y)) {
        isBump = true;
        this.pg.score += 1;
      }
    });
    return isBump;
  }

  isBumpPaddle() {
    let isBump = false;
    if (this.pg.paddle.isBump(this.x, this.y)) {
      isBump = true;
    }
    return isBump;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    const isReachXSide =
      this.x <= BALL_RADIUS / 2 || this.x + BALL_RADIUS / 2 >= PLAYGROUD_WIDTH;
    const isReachYSide =
      this.y <= BALL_RADIUS / 2 || this.y + BALL_RADIUS / 2 >= PLAYGROUD_HEIGHT;
    const isLose = this.y + BALL_RADIUS / 2 >= PLAYGROUD_HEIGHT;

    if (isReachXSide) this.dx = -this.dx;
    if (isReachYSide) this.dy = -this.dy;
    if (this.isBumpBlock()) this.dy = -this.dy;
    if (this.isBumpPaddle()) this.dy = -this.dy;
    if (isLose) this.pg.restartGame();
  }

  draw() {
    this.pg.ctx.beginPath();
    this.pg.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.pg.ctx.fillStyle = ENTITY_COLOR;
    this.pg.ctx.fill();
    this.pg.ctx.closePath();
  }
}

class Block {
  constructor(playground, x, y, w, h) {
    this.pg = playground;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.endX = x + w;
    this.endY = y + h;
    this.distory = false;
  }

  isBump(x, y) {
    if (this.distory) return false;
    const margin = this.h / 2;
    const isIncludeX = this.x <= x && x <= this.endX;
    const isIncludeY = this.y - margin <= y && y <= this.endY + margin;
    if (isIncludeX && isIncludeY) {
      this.distory = true;
      return true;
    }
    return false;
  }

  draw() {
    if (this.distory) return;
    this.pg.ctx.beginPath();
    this.pg.ctx.rect(this.x, this.y, this.w, this.h);
    this.pg.ctx.fillStyle = ENTITY_COLOR;
    this.pg.ctx.fill();
    this.pg.ctx.closePath();
  }
}

class Paddle {
  constructor(playground) {
    this.pg = playground;
    this.x = PLAYGROUD_WIDTH / 2 - PADDLE_WIDTH / 2;
    this.y = PLAYGROUD_HEIGHT - PLAYGROUD_PADDLE_MARGIN;
    this.w = PADDLE_WIDTH;
    this.h = PADDLE_HEIGTH;
    this.dx = 0;
    this.speed = PADDLE_SPEED;
    this.endX = this.x + this.w;
    this.endY = this.y + this.h;

    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") this.dx = -this.speed;
      else if (event.key === "ArrowRight") this.dx = this.speed;
    });
    document.addEventListener("keyup", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        this.dx = 0;
      }
    });
  }

  isBump(x, y) {
    const margin = this.h / 2;
    const isIncludeX = this.x <= x && x <= this.endX;
    const isIncludeY = this.y - margin <= y && y <= this.endY + margin;
    if (isIncludeX && isIncludeY) {
      return true;
    }
    return false;
  }

  update() {
    const nextX = this.x + this.dx;
    if (nextX < 0) {
      this.x = 0;
    } else if (nextX + this.w > PLAYGROUD_WIDTH) {
      this.x = PLAYGROUD_WIDTH - this.w;
    } else {
      this.x = nextX;
    }
    this.endX = this.x + this.w;
    this.endY = this.y + this.h;
  }

  draw() {
    this.pg.ctx.beginPath();
    this.pg.ctx.rect(this.x, this.y, this.w, this.h);
    this.pg.ctx.fillStyle = ENTITY_COLOR;
    this.pg.ctx.fill();
    this.pg.ctx.closePath();
  }
}

class PlayGround {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = PLAYGROUD_WIDTH;
    this.height = PLAYGROUD_HEIGHT;
    this.bgColor = "white";
    this.entityColor = ENTITY_COLOR;
    this.blocks = [];
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.score = 0;

    this.initBlock();
  }

  initBlock() {
    let bx = BLOCK_X_START;
    let by = BLOCK_Y_START;
    let line = 1;
    while (true) {
      if (line > BLOCK_COUNT_LINE) break;
      const block = new Block(this, bx, by, BLOCK_WIDTH, BLOCK_HEIGTH);
      this.blocks.push(block);
      bx = bx + BLOCK_WIDTH + BLOCK_WIDTH_MARGIN;
      if (bx + BLOCK_WIDTH >= PLAYGROUD_WIDTH) {
        bx = BLOCK_X_START;
        by = by + BLOCK_HEIGTH + BLOCK_HEIGTH_MARGIN;
        line += 1;
      }
    }
  }

  updateScore() {
    this.ctx.beginPath();
    this.ctx.fillStyle = ENTITY_COLOR;
    this.ctx.font = "normal normal 20px sans-serif";
    this.ctx.fillText(`Score: ${this.score}`, PLAYGROUD_WIDTH - 100, 30);
    this.ctx.closePath();
  }

  restartGame() {
    this.blocks.length = 0;
    this.score = 0;
    this.initBlock();
    this.updateScore();
  }

  drawBackGround() {
    this.ctx.beginPath();
    this.ctx.roundRect(0, 0, PLAYGROUD_WIDTH, PLAYGROUD_HEIGHT, 5);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    this.updateScore();
  }

  update() {
    this.ball.update();
    this.paddle.update();
  }

  draw() {
    this.drawBackGround();
    this.blocks.forEach(b => {
      b.draw();
    });
    this.paddle.draw();
    this.ball.draw();
  }

  start() {
    this.update();
    this.draw();
  }
}

pgEl.width = PLAYGROUD_WIDTH;
pgEl.height = PLAYGROUD_HEIGHT;
const pg = new PlayGround(pgEl);

function gameLoop() {
  pg.start();
  requestAnimationFrame(gameLoop);
}

gameLoop();

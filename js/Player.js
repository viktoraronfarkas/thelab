import CONFIG from './config.js';

class Player {
  constructor() {
    console.log("Player created!");

    this.x = 0;
    this.y = CONFIG.level.groundPosition - CONFIG.player.height;
    this.width = CONFIG.player.width;
    this.height = CONFIG.player.height;
    this.deltaX = 0; // +1 -> go right, -1 -> go left
    this.vY = 0; // y velocity
    this.currentKeys = []; // list of currently pressed keys
    this.speed = CONFIG.player.speed; // speed factor
    this.image = null;
    this.playerStill = null;
    this.walkingSprite = null;
    this.walking = null;
    this.running = null;
    this.isWalking = null;
    this.isRunning = false;
    this.isJumping = false;
    this.isFalling = false;
    this.facingLeft = false;
    this.ticks = 0;
    this.lastRenderedTime = null;
    this.runningSprite = null;

    this.init();
  }

  init() {
    // load image
    this.playerStill = new Image();
    this.walkingSprite = new Image();
    this.runningSprite = new Image();
    this.playerStill.src = 'assets/player_still.png';
    this.walkingSprite.src = 'assets/player_walking.png';
    this.runningSprite.src = 'assets/player_running.png';

    this.image = this.playerStill;

    // listen for keydown events
    document.addEventListener('keydown', (event) => {
      this.currentKeys[event.code] = true;
    });

    // listen for keyup events
    document.addEventListener('keyup', (event) => {
      this.currentKeys[event.code] = false;
    });
  }

  update() {
    if (this.currentKeys['ArrowRight'] === true || this.currentKeys['KeyD'] === true) {
      this.deltaX = 1;
      this.isWalking = true;
      this.facingLeft = false;
      this.image = this.walkingSprite;
    } else if (this.currentKeys['ArrowLeft'] === true || this.currentKeys['KeyA'] === true) {
      this.deltaX = -1;
      this.isWalking = true;
      this.facingLeft = true;
      this.image = this.walkingSprite;
    } else {
      this.deltaX = 0;
      this.image = this.playerStill;
      this.isWalking = false;
      this.isRunning = false;
    }

    // spacebar -> jump
    if (true === this.currentKeys['Space'] && false === this.isJumping) {
      this.vY -= 30;
      this.isJumping = true;
    }

    if (true === this.currentKeys['ShiftLeft'] && true === this.isWalking) {
      this.speed = CONFIG.player.speed * 2;
      this.image = this.runningSprite;
      this.isRunning = true;
    } else {
      this.speed = CONFIG.player.speed;
      this.isRunning = false;
    }

    // how many milliseconds have passed since the last render()
    let millisecondsSinceLastRender = performance.now() - this.lastRenderedTime;

    // how many pixels should the player move?
    let moveBy = millisecondsSinceLastRender * this.speed;

    this.vY += 1.5;
    this.x = this.x + this.deltaX * moveBy;
    this.y = this.y + this.vY;
    this.vY = this.vY * 0.9;

    // check for boundaries
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    }

    if (this.y + this.height / 2 > CONFIG.level.groundPosition && !this.isFalling) {
      this.y = CONFIG.level.groundPosition - this.height / 2;
      this.isJumping = false;
      this.vY = 0;
    } else if (this.isFalling && this.y + this.height / 2 > CONFIG.level.height + this.height) {
      this.y = 0;
      this.isJumping = false;
      this.isFalling = false;
    }
  }

  render(ctx) {
    let coords;
    let config;

    if (0 === this.deltaX) {
      config = CONFIG.sprite.idle;
    } else if (0 !== this.deltaX && false === this.isRunning) {
      config = CONFIG.sprite.walking;
    } else if (0 !== this.deltaX && true === this.isRunning) {
      config = CONFIG.sprite.running;
    }

    coords = this.getCurrentFrame(config);

    ctx.translate(this.x, this.y);

    if (true === this.facingLeft) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      this.image,
      coords.sX,
      coords.sY,
      coords.sWidth,
      coords.sHeight,
      -this.width / 2,
      -this.height / 2,
      coords.dWidth,
      coords.dHeight
    );

    ctx.resetTransform(); // <-- end transform matrix

    this.ticks++;

    this.lastRenderedTime = performance.now();
  }

  getCurrentFrame = (config) => {
    let frames = config.frames;

    // get the frame number
    let currentFrame = Math.floor(this.ticks * config.fpt % frames);
    let frameWidth = config.width / config.frames;

    let coords = {
      sX: currentFrame * frameWidth,
      sY: 0,
      sWidth: frameWidth,
      sHeight: config.height,
      dWidth: frameWidth,
      dHeight: this.height,
    }

    return coords;
  }
}

export default Player;

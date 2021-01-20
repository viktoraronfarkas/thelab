import CONFIG from './config.js';

class Player {
  constructor() {
    console.log("Player created!");

    this.x = 0;
    this.y = CONFIG.groundPosition - CONFIG.playerHeight;
    this.width = CONFIG.playerWidth;
    this.height = CONFIG.playerHeight;
    this.deltaX = 0; // +1 -> go right, -1 -> go left
    this.currentKeys = []; // list of currently pressed keys
    this.speed = CONFIG.playerSpeed; // speed factor
    this.image = null;

    this.init();
  }

  init() {
    // load image
    this.image = new Image();
    this.image.src = 'assets/player_still.png';

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
    } else if (this.currentKeys['ArrowLeft'] === true || this.currentKeys['KeyA'] === true) {
      this.deltaX = -1;
    } else {
      this.deltaX = 0;
    }

    // spacebar -> jump
    if (this.currentKeys['Space'] === true) {
      //TODO
    } else {
      //TODO
    }

    if (this.currentKeys['ShiftLeft'] === true) {
      this.speed = CONFIG.playerSpeed * 2;
    } else {
      this.speed = CONFIG.playerSpeed;
    }

    // set x to new values
    this.x = this.x + this.deltaX * this.speed;

    // check for boundaries
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    }
    if (this.y + this.height / 2 > CONFIG.groundPosition) {
      this.y = CONFIG.groundPosition - this.height / 2;
    }
  }

  render(ctx) {
    ctx.translate(this.x, 0);

    if (-1 === this.deltaX) {
      ctx.scale(-1, 1);
    }

    // draw image
    ctx.drawImage(this.image, -this.width/2, this.y, this.width, this.height);

    ctx.resetTransform(); // <-- end transform matrix
  }

}

export default Player;

import CONFIG from './config.js';

class Player {
  constructor() {
    console.log("Player created!");

    this.x = 150;
    this.y = 150;
    this.width = 150;
    this.height = 150;
    this.deltaX = 0; // +1 -> go right, -1 -> go left
    this.currentKeys = []; // list of currently pressed keys
    this.speed = CONFIG.playerSpeed; // speed factor
    this.image = null;

    this.init();
  }

  init() {

    // load image
    this.image = new Image();
    this.image.src = './player_still.png';

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
    if (this.currentKeys['ArrowRight'] === true) {
      this.deltaX = +1;
    }
    else if (this.currentKeys['ArrowLeft'] === true) {
      this.deltaX = -1;
    }
    else {
      this.deltaX = 0;
    }

    // spacebar -> jump
    if (this.currentKeys['Space'] === true) {
      //TODO
    } else {
      //TODO
    }

    // set x, y to new values
    this.x = this.x + this.deltaX * this.speed;

    // check for boundaries
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    }
    if (this.y + this.height / 2 > CONFIG.groundPosition) {
      this.y = CONFIG.groundPosition - this.height / 2;
    }

  }
}

export default Player;

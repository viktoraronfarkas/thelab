import CONFIG from './config.js';

class Background {
  constructor() {
    console.log('Background created!');
    this.width = document.getElementById('stage').offsetWidth;
    this.height = document.getElementById('stage').offsetHeight;
    this.background = new Image();
    this.currentLevel = 0;
    this.background.src = `assets/level${this.currentLevel}.png`;
  }

  render(context) {
    context.drawImage(this.background, 0, 0, this.width, this.height);
  }

  update() {

  }

  nextLevel() {
    this.currentLevel < CONFIG.level.numberOfLevels ? this.currentLevel++ : console.log('Already on last level, cannot call next one.');
    this.background.src = `assets/level${this.currentLevel}.png`;
  }
}

export default Background;

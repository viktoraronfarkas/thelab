import { CONFIG } from './config.js';

class Background {
  constructor() {
    console.log('Background created!');
    this.width = getElementById('stage').offsetWidth;
    this.height = getElementById('stage').offsetHeight;
    this.background = new Image();
    this.currentLevel = 0;
    this.background.src = `assets/level${this.currentLevel}.png`;
  }

  render() {
    context.drawImage(this.image, 0, 0, this.width, this.height);
  }

  update() {

  }

  nextLevel() {
    this.currentLevel < CONFIG.numberOfLevels ? this.currentLevel++ : console.log('Already on last level, cannot cll next one.');
    this.background.src = `assets/level${this.currentLevel}.png`;
  }
}

export default Background;

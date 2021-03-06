import Obstacle from './Obstacle.js';
import CONFIG from '../config.js';

class Wall extends Obstacle {
  constructor(obj) {
    super(obj);
    this.y = CONFIG.level.groundPosition - this.height;
  }
}

export default Wall;

import Obstacle from './Obstacle.js';
import CONFIG from '/js/config.js';

class Hole extends Obstacle {
  constructor(obj) {
    super(obj);
    this.y = CONFIG.level.groundPosition;
    this.height = CONFIG.level.holeHeight;
  }
}

export default Hole;

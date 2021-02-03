import Hole from './obstacles/Hole.js';
import Wall from './obstacles/Wall.js';
import CONFIG from './config.js';
import OBST_DATA from './obstacles/obstacle-data.js';

const renderText = (ctx) => {
  ctx.font = '35px "Press Start 2P"';
  ctx.fillStyle = 'white';
  ctx.fillText('PRESS ENTER TO START', CONFIG.startText.x, CONFIG.startText.y);
}

const setupCanvas = (cvs) => {
  // set width/height of the DOM element
  cvs.setAttribute('width', CONFIG.level.width);
  cvs.setAttribute('height', CONFIG.level.height);
  console.log('Dimensions of DOM element set!');

  cvs.style.width = CONFIG.level.width + 'px';
  cvs.style.height = CONFIG.level.height + 'px';
  console.log('Dimensions set in stylesheet!');
}

const setupObstacles = () => {
  let arr = [];
  let level1, level2, level3;
  level1 = level2 = level3 = {
    holes: [],
    walls: [],
  };

  level2.holes.push(new Hole(OBST_DATA.level2.holes.hole1));
  level3.walls.push(new Wall(OBST_DATA.level3.walls.wall1));

  arr.push(level1, level2, level3);

  return arr;
}

export {
  renderText,
  setupCanvas,
  setupObstacles,
}

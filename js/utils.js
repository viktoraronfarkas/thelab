import Player from './Player.js';
import Camera from './Camera.js';
import Background from './Background.js';
import CONFIG from './config.js';

const renderText = (ctx) => {
  ctx.font = '35px "Press Start 2P"';
  ctx.fillStyle = 'white';
  ctx.fillText('PRESS ENTER TO START', CONFIG.startText.x, CONFIG.startText.y);
}

const setupCanvas = (cvs) => {
  // set width/height of the DOM element
  cvs.setAttribute('width', CONFIG.levelWidth);
  cvs.setAttribute('height', CONFIG.levelHeight);
  console.log('Dimensions of DOM element set!');

  cvs.style.width = CONFIG.levelWidth + 'px';
  cvs.style.height = CONFIG.levelHeight + 'px';
  console.log('Dimensions set in stylesheet!');
}

export {
  renderText,
  setupCanvas,
}

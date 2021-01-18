import Player from './Player.js';
import Camera from './Camera.js';
import Background from './Background.js';
import CONFIG from './config.js';

let context;
let player;
let camera;
let background;

let init = () => {
  console.log('Hello World!');
  let canvas = document.getElementById('stage');
  context = canvas.getContext('2d');

  // set width/height of the DOM element
  canvas.setAttribute('width', CONFIG.levelWidth);
  canvas.setAttribute('height', CONFIG.levelHeight);
  console.log('Dimensions of DOM element set!');

  canvas.style.width = CONFIG.levelWidth + 'px';
  canvas.style.height = CONFIG.levelHeight + 'px';
  console.log('Dimensions set in stylesheet!');

  // start measuring time
  // TODO: implement time limit (??)
  background = new Background();
  player = new Player();

  // call the first iteration of the gameloop
  gameLoop();
}


window.addEventListener('load', function() {
  init();
});

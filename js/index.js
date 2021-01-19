import Player from './Player.js';
import Camera from './Camera.js';
import Background from './Background.js';
import CONFIG from './config.js';
import { renderText, setupCanvas } from './utils.js';

let context;
let textContext;
let player;
let camera;
let background;
let currentKeys = [];

let init = () => {
  console.log('Hello World!');

  let canvas = document.getElementById('stage');
  context = canvas.getContext('2d');
  let textCanvas = document.getElementById('text-stage');
  textContext = textCanvas.getContext('2d');

  setupCanvas(canvas);
  setupCanvas(textCanvas);

  // start measuring time
  // TODO: implement time limit (??)
  background = new Background();
  player = new Player();
  camera = new Camera();

  // listen for keydown events
  document.addEventListener('keydown', (event) => {
    currentKeys[event.code] = true;
  });

  // listen for keyup events
  document.addEventListener('keyup', (event) => {
    currentKeys[event.code] = false;
  });

  // call the first iteration of the gameloop if font has loaded
  document.fonts.load('35px "Press Start 2P"').then(gameLoop());
}

let gameLoop = () => {
  player.update();

  context.clearRect(0, 0, CONFIG.levelWidth, CONFIG.levelHeight); //clear canvas
  background.render(context); // render Background
  camera.render(context); // render Camera
  player.render(context); // render Player

  textContext.clearRect(0, 0, CONFIG.levelWidth, CONFIG.levelHeight);

  if (0 === background.currentLevel) {
    renderText(textContext);
  } else {
    textContext.clearRect(0, 0, CONFIG.width, CONFIG.height);
  }

  // Start game
  if (0 === background.currentLevel && true === currentKeys['Enter']) {
    background.nextLevel();
  }

  // Next level
  if (player.x + player.width / 2 > CONFIG.levelWidth) {
    background.nextLevel();
  }

  // call the next iteration of the gameloop
  requestAnimationFrame(gameLoop);
}


window.addEventListener('load', function() {
  init();
});

import Player from './Player.js';
import Camera from './Camera.js';
import Background from './Background.js';
import CONFIG from './config.js';
import { renderText, setupCanvas, setupObstacles } from './utils.js';

let context;
let textContext;
let playerContext;
let cameraContext;
let player;
let camera;
let background;
let currentKeys = [];
let obstacles = setupObstacles();

let init = () => {
  console.log('Hello World!');

  let canvas = document.getElementById('stage');
  context = canvas.getContext('2d');
  let textCanvas = document.getElementById('text-stage');
  textContext = textCanvas.getContext('2d');
  let playerCanvas = document.getElementById('player-stage');
  playerContext = playerCanvas.getContext('2d');
  let cameraCanvas = document.getElementById('camera-stage');
  cameraContext = cameraCanvas.getContext('2d');

  setupCanvas(canvas);
  setupCanvas(textCanvas);
  setupCanvas(playerCanvas);
  setupCanvas(cameraCanvas);

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

  context.clearRect(0, 0, CONFIG.level.width, CONFIG.level.height); //clear canvas
  playerContext.clearRect(0, 0, CONFIG.level.width, CONFIG.level.height);
  cameraContext.clearRect(0, 0, CONFIG.level.width, CONFIG.level.height);
  background.render(context); // render Background

  if (0 !== background.currentLevel && 8 !== background.currentLevel) {
    player.render(playerContext); // render Player
    camera.render(cameraContext); // render Camera
  }

  textContext.clearRect(0, 0, CONFIG.level.width, CONFIG.level.height);

  // render Start text only on level 0
  if (0 === background.currentLevel) {
    renderText(textContext);
  } else {
    textContext.clearRect(0, 0, CONFIG.level.width, CONFIG.level.height);
  }

  // Start game
  if (0 === background.currentLevel && true === currentKeys['Enter']) {
    background.nextLevel();
    player.y = 0;
  }

  // Next level
  if (player.x + player.width / 2 > CONFIG.level.width) {
    player.x = 0;
    background.nextLevel();
  }

  // Flip Camera
  if (player.x + player.width / 2 > CONFIG.level.width / 2) {
    camera.dir = 'right';
  }

  if (player.x + player.width / 2 < CONFIG.level.width / 2) {
    camera.dir = 'left';
  }

  checkForObstacles(background, player, obstacles);

  // call the next iteration of the gameloop
  requestAnimationFrame(gameLoop);
}

let checkForObstacles = (bg, player, obstacles) => {
  // first hole
  if (2 === bg.currentLevel && obstacles[1].holes[0].x < player.x && obstacles[1].holes[0].x + obstacles[1].holes[0].width > player.x && !player.isJumping) {
    player.isFalling = true;
    player.y++;
  }

  // first wall -> only go through when running
  if (3 === bg.currentLevel && obstacles[2].walls[0].x - player.width < player.x && obstacles[2].walls[0].x + obstacles[2].walls[0].width - player.width > player.x && !player.isRunning && !player.facingLeft) {
    player.x = obstacles[2].walls[0].x - player.width;
  }

  if (player.x + player.width / 2 > CONFIG.level.width / 2 && 4 === bg.currentLevel) {
    camera.dir = 'left';
  }

  if (player.x + player.width / 2 < CONFIG.level.width / 2 && 4 === bg.currentLevel) {
    camera.dir = 'right';
  }

  if (player.x + player.width / 2 < CONFIG.level.width / 2 && 4 < bg.currentLevel) {
    camera.dir = 'right';
  }

  if (5 === bg.currentLevel) {
    player.speed = 0.1;
  }

  if (5 === bg.currentLevel && 200 < player.x && 230 > player.x) {
    player.x = 350;
    player.y = 300;
  }

  if (5 === bg.currentLevel && 450 < player.x && 480 > player.x) {
    player.x = 750;
    player.y = 0;
  }

  if (6 === bg.currentLevel) {
    player.y = 0;
  }
}

window.addEventListener('load', function() {
  init();
});

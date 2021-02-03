import CONFIG from './config.js';

class Camera {
  constructor() {
    console.log('Camera created!');
    this.width = CONFIG.camera.width;
    this.height = CONFIG.camera.height;
    this.image = new Image();
    this.image.src = 'assets/camera.png';
    this.dir = 'left';
  }

  render(ctx) {
    ctx.translate(CONFIG.level.width / 2, 0);

    if ('right' === this.dir) {
      ctx.scale(-1, 1);
    }

    ctx.drawImage(this.image, -(this.width / 2), 0, this.width, this.height);
    ctx.resetTransform();
  }
}

export default Camera;

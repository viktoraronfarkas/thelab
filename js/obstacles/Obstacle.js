class Obstacle {
  constructor() {
    this.level = null;
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}

export default Obstacle;

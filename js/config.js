export default {
  level: {
    numberOfLevels: 8,
    width: 1200,
    height: 675,
    groundPosition: 577,
    holeHeight: 300,
  },
  player: {
    width: 129,
    height: 240,
    speed: 0.3,
  },
  camera: {
    width: 48,
    height: 45,
  },
  startText: {
    x: 265,
    y: 320,
  },
  sprite: {
    idle: {
      width: 129,
      height: 240,
      frames: 1,
      fpt: 1,
    },
    walking: {
      width: 516,
      height: 240,
      frames: 4,
      fpt: 0.2,
    },
    running: {
      width: 708,
      height: 240,
      frames: 4,
      fpt: 0.3,
    },
  }
}

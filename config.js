module.exports = {
  name: 'Flappy Bird',
  width: 288,
  height: 505,
  maxWidth: 864,
  maxHeight: 1515,
  parent: 'body',
  gravity: 1200,  // 1200
  flapVelocity: -400, // -400,
  pipes: {
    interval: 1.25, // seconds
    velocity: -200,
    gapSize: 120
  }
};

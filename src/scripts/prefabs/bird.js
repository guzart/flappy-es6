
var Phaser = global.Phaser;

export default class Bird extends Phaser.Sprite {

  constructor(game, x, y, frame) {
    super(game, x, y, 'bird', frame);

    this.anchor.setTo(0.5, 0.5);

    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    this.game.physics.arcade.enableBody(this);
  }

  update() {

  }
}

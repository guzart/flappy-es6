
import Phaser from 'phaser';

export default class Bird extends Phaser.Sprite {

  constructor(game, x, y, frame) {
    super(game, x, y, 'bird', frame);

    this.anchor.setTo(0.5, 0.5);

    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    this.game.physics.arcade.enableBody(this);
  }

  flap() {
    this.body.velocity.y = -400;
    this.game.add.tween(this).to({ angle: -40 }, 100).start();
  }

  update() {
    if (this.angle < 90) {
      this.angle += 2.5;
    }
  }
}

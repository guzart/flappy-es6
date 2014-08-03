
import Phaser from 'phaser';
import Bird from '../prefabs/bird';
import Ground from '../prefabs/ground';

export default class Play extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500; // px per sec

    this.background = this.game.add.sprite(0, 0, 'background');

    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);
  }

  update() {
    this.game.physics.arcade.collide(this.bird, this.ground);
  }

  switchBackToMenu() {
    this.state.start('menu');
  }
}

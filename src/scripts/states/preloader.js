
var Phaser = global.Phaser;

export default class Preloader extends Phaser.State {

  contructor() {
    super();
  }

  preload() {
    var progressBar = this.add.sprite(
      this.world.centerX, this.world.centerY, 'progressBar'
    );

    progressBar.anchor.set(0.5);
    this.load.setPreloadSprite(progressBar);
  }

  create() {
    this.game.state.start('menu');
  }
}

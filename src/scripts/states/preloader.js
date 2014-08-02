
var Phaser = global.Phaser;

export default class Preloader extends Phaser.State {

  contructor() {
    super();
  }

  preload() {
    this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'images/background.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('title', 'images/title.png');
    this.load.image('startButton', 'images/start-button.png');

    this.load.spritesheet('bird', 'images/bird.png', 34, 24, 3);
  }

  create() {
    this.asset.cropEnabled = false;
  }

  update() {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }
}

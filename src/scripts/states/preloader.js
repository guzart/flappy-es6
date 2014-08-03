
import Phaser from 'phaser';

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
    this.load.image('getReady', 'images/get-ready.png');
    this.load.image('scoreboard', 'images/scoreboard.png');
    this.load.image('gameover', 'images/game-over.png');
    this.load.image('particle', 'images/particle.png');

    this.load.bitmapFont(
      'flappyfont',
      'fonts/flappyfont/flappyfont.png',
      'fonts/flappyfont/flappyfont.fnt');

    this.load.audio('score', 'audio/score.wav');
    this.load.audio('flap', 'audio/flap.wav');
    this.load.audio('pipeHit', 'audio/pipe-hit.wav');
    this.load.audio('groundHit', 'audio/ground-hit.wav');

    this.load.spritesheet('medals', 'images/medals.png', 44, 46, 2);
    this.load.spritesheet('bird', 'images/bird.png', 34, 24, 3);
    this.load.spritesheet('pipe', 'images/pipes.png', 54, 320, 2);
  }

  create() {
    this.asset.cropEnabled = false;
  }

  update() {
    if (!!this.ready) {
      // this.game.state.start('menu');
      this.game.state.start('play');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }
}

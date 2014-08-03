
import Phaser from 'phaser';

export default class GameOver extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var centerX = this.game.width/2;

    this.titleText = this.game.add.text(centerX, 100, 'Game Over!', this.getTextStyle(32));
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(centerX, 200, 'You Lose!', this.getTextStyle(24));
    this.congratsText.anchor.setTo(0.5, 0.5);

    var instructionMsg = 'Click To Play Again';
    this.instructionText = this.game.add.text(centerX, 300, instructionMsg, this.getTextStyle(16));
    this.instructionText.anchor.setTo(0.5, 0.5);

    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    flapKey.onDown.add(this.startGame, this);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  getTextStyle(fontSize) {
    return {
      font: fontSize + 'px Arial',
      fill: '#ffffff',
      align: 'center'
    };
  }

  startGame() {
    this.game.state.start('play');
  }

  shutdown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
  }
}

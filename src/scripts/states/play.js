
var Phaser = global.Phaser;

export default class Play extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var style = {align: 'center', fill: '#ffffff', font: '15px Arial'};
    var text;

    if (this.game.device.desktop) {
      text = 'Click to go back to the menu';
    } else {
      text = 'Touch to go back to the menu';
    }

    this.add
      .text(this.world.centerX, 100, 'This is the game state', {fill: '#ffffff'})
      .anchor.set(0.5);

    this.add
      .text(this.world.centerX, this.world.height - 150, text, style)
      .anchor.set(0.5);

    this.input.onDown.add(this.switchBackToMenu, this);
  }

  update() {
    // Body...
  }

  switchBackToMenu() {
    this.state.start('menu');
  }
}

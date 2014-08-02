
var Phaser = global.Phaser;

export default class Boot extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.load.baseURL = './assets/';
  }

  create() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize();

    this.game.state.start('preloader');
  }
}

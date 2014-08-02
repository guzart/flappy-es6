
var Phaser = global.Phaser;

export default class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.baseURL = './assets/';
    this.load.image('preloader', 'images/preloader.gif');
  }

  create() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize();

    this.game.input.maxPointers = 1;
    this.game.state.start('preloader');
  }
}

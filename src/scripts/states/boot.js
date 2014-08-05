
import Phaser from 'phaser';
module config from '../../../config';

export default class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.baseURL = './assets/';
    this.load.image('preloader', 'images/preloader.gif');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = config.maxWidth;
    this.scale.maxHeight = config.maxHeight;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    this.game.input.maxPointers = 1;
    this.game.state.start('preloader');
  }
}

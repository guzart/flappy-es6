'use strict';

var Boot = module.exports = function () {
  Phaser.State.call(this);
};
Boot.prototype = Object.create(Phaser.State.prototype);
Boot.prototype.constructor = Boot;

Boot.prototype.preload = function () {
  this.load.baseURL = './assets/';
  // this.load.image('progressBar', 'progressBar.png');
};

Boot.prototype.create = function () {
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.setScreenSize();

  this.game.state.start('preloader');
};

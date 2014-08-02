
var Phaser = global.Phaser;

export default class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
    this.ground.autoScroll(-200, 0);

    this.title = this.game.add.sprite(0, 0, 'title');

    this.bird = this.game.add.sprite(200, 5, 'bird');
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    this.titleGroup = this.game.add.group();
    this.titleGroup.add(this.title);
    this.titleGroup.add(this.bird);
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    this.game.add
      .tween(this.titleGroup)
      .to({ y: 115 }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.startButton = this.game.add.button(
      this.game.width/2, 300, 'startButton', this.startGame, this);
    this.startButton.anchor.setTo(0.5, 0.5);
  }

  startGame() {
    this.state.start('play');
  }
}

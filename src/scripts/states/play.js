
import Phaser from 'phaser';
import Bird from '../prefabs/bird';
import Ground from '../prefabs/ground';
import PipeGroup from '../prefabs/pipe-group';

export default class Play extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200; // px per sec

    this.background = this.game.add.sprite(0, 0, 'background');

    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    this.pipes = this.game.add.group();

    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    flapKey.onDown.add(this.bird.flap, this.bird);
    flapKey.onDown.addOnce(this.startGame, this);

    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);

    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    this.getReady = this.game.add.sprite(this.game.width/2, 100, 'getReady');
    this.getReady.anchor.setTo(0.5, 0.5);
  }

  update() {
    this.game.physics.arcade.collide(this.bird, this.ground, this.deadHandler, null, this);
    this.pipes.forEach(function (pipeGroup) {
      this.game.physics.arcade.collide(this.bird, pipeGroup, this.deadHandler, null, this);
    }, this);
  }

  startGame() {
    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    var interval = Phaser.Timer.SECOND * 1.25;
    this.pipeGenerator = this.game.time.events.loop(interval, this.generatePipes, this);
    this.pipeGenerator.timer.start();

    this.getReady.destroy();
  }

  generatePipes() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if (!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  }

  deadHandler() {
    this.game.state.start('gameover');
  }

  switchBackToMenu() {
    this.state.start('menu');
  }

  shutdown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
  }
}


import Phaser from 'phaser';
import Bird from '../prefabs/bird';
import Ground from '../prefabs/ground';
import PipeGroup from '../prefabs/pipe-group';
import Scoreboard from '../prefabs/scoreboard';
module config from '../../../config';

export default class Play extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = config.gravity;

    this.background = this.game.add.sprite(0, 0, 'background');

    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    this.pipes = this.game.add.group();

    this.score = 0;
    this.scoreText = this.game.add.bitmapText(
      this.game.width/2, 10, 'flappyfont', this.score.toString(), 24);
    this.scoreText.visible = false;

    this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.addOnce(this.startGame, this);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);

    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    this.getReady = this.game.add.sprite(this.game.width/2, 100, 'getReady');
    this.getReady.anchor.setTo(0.5, 0.5);

    this.scoreSound = this.game.add.audio('score');
  }

  update() {
    this.game.physics.arcade.collide(this.bird, this.ground, this.deadHandler, null, this);
    this.pipes.forEach(function (pipeGroup) {
      this.checkScore(pipeGroup);
      this.game.physics.arcade.collide(this.bird, pipeGroup, this.deadHandler, null, this);
    }, this);
  }

  startGame() {
    if (!this.getReady.exists) { return; }

    this.scoreText.visible = true;

    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    var interval = Phaser.Timer.SECOND * config.pipes.interval;
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

  checkScore(pipeGroup) {
    if (pipeGroup.exists && !pipeGroup.hasScored &&
        pipeGroup.topPipe.world.x <= this.bird.world.x) {
      pipeGroup.hasScored = true;
      this.score += 1;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  }

  deadHandler() {
    if (!this.bird.alive) { return; }

    this.bird.alive = false;
    this.pipes.callAll('stop');
    this.pipeGenerator.timer.stop();
    this.ground.stopScroll();

    this.scoreboard = new Scoreboard(this.game);
    this.game.add.existing(this.scoreboard);
    this.flapKey.onDown.addOnce(this.scoreboard.startClick, this.scoreboard);
    this.scoreboard.show(this.score);
  }

  switchBackToMenu() {
    this.state.start('menu');
  }

  shutdown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  }
}
